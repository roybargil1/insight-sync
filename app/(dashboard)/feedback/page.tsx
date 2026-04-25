"use client";

import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Feedback, Insights } from "@/lib/db";
import { useProduct } from "@/lib/ProductContext";
import { INSIGHTS_QUERY_KEY } from "@/hooks/useInsights";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Plus,
  Search,
  MessageSquare,
  Upload,
  RefreshCw,
  CheckSquare,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import FeedbackCard from "@/components/feedback/FeedbackCard";
import AddFeedbackModal from "@/components/feedback/AddFeedbackModal";
import FeedbackFilterBar, {
  applyFeedbackFilters,
  defaultFilters,
} from "@/components/feedback/FeedbackFilterBar";
import NoProductSelected from "@/components/layout/NoProductSelected";
import ConfirmDeleteModal from "@/components/feedback/ConfirmDeleteModal";
import FeedbackDetailModal from "@/components/feedback/FeedbackDetailModal";
import { getSourceType } from "@/components/shared/SourceTypeBadge";
import { toast } from "sonner";

function parseCSV(text: string) {
  const lines = text.trim().split("\n");
  if (lines.length < 2) return [];
  const headers = lines[0].split(",").map((h) => h.trim().replace(/^"|"$/g, "").toLowerCase());
  return lines.slice(1).map((line) => {
    const values: string[] = [];
    let current = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') {
        inQuotes = !inQuotes;
      } else if (line[i] === "," && !inQuotes) {
        values.push(current.trim());
        current = "";
      } else {
        current += line[i];
      }
    }
    values.push(current.trim());
    const row: Record<string, string> = {};
    headers.forEach((h, i) => {
      row[h] = values[i] || "";
    });
    return row;
  });
}

export default function FeedbackLibraryPage() {
  const { selectedProductId } = useProduct();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [analyzingId, setAnalyzingId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [deletingAll, setDeletingAll] = useState(false);
  const [confirmModal, setConfirmModal] = useState<{
    type: "selected" | "all" | "single";
    id?: string;
  } | null>(null);
  const [detailFeedback, setDetailFeedback] = useState<Record<string, unknown> | null>(null);
  const [activeTab, setActiveTab] = useState<"all" | "internal" | "external">("all");
  const csvInputRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => import("@/lib/db").then((m) => m.Products.list()),
  });

  const { data: feedbackList = [], isLoading } = useQuery({
    queryKey: ["feedback", selectedProductId],
    queryFn: () => Feedback.list(selectedProductId),
    enabled: !!selectedProductId,
  });

  const createMutation = useMutation({
    mutationFn: (data: Record<string, string>) =>
      Feedback.create({ ...data, product_id: selectedProductId, analyzed: false, source_type: "Internal" }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["feedback"] });
      setShowModal(false);
      toast.success("Feedback added!");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => Feedback.delete(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["feedback"] }),
  });

  const handleCSVImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = "";
    setImporting(true);
    const text = await file.text();
    const rows = parseCSV(text);
    if (rows.length === 0) {
      toast.error("CSV appears empty or malformed.");
      setImporting(false);
      return;
    }
    const VALID_SOURCES = ["Interview", "Support Ticket", "Review"];
    let saved = 0;
    for (const row of rows) {
      const title = row["title"] || row["Title"];
      const raw_text = row["content"] || row["Content"] || row["raw_text"];
      const rawSource = row["source"] || row["Source"] || "";
      const date = row["date"] || row["Date"] || "";
      if (!title || !raw_text) continue;
      const source = VALID_SOURCES.find((s) => s.toLowerCase() === rawSource.toLowerCase());
      await Feedback.create({
        title,
        raw_text,
        ...(source ? { source } : {}),
        ...(date ? { date } : {}),
        analyzed: false,
        product_id: selectedProductId,
        source_type: "Internal",
      });
      saved++;
    }
    qc.invalidateQueries({ queryKey: ["feedback"] });
    setImporting(false);
    toast.success(`Imported ${saved} feedback entr${saved === 1 ? "y" : "ies"}.`);
  };

  const handleAnalyze = async (feedback: Record<string, unknown>) => {
    setAnalyzingId(feedback.id as string);
    try {
      const existingInsights = await Insights.list();
      const productInsights = existingInsights.filter(
        (i) => i.product_id === feedback.product_id
      );
      const existingSummary =
        productInsights.length > 0
          ? productInsights.map((i) => `ID:${i.id} | "${i.name}" (${i.category})`).join("\n")
          : "None";

      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: feedback.title,
          raw_text: feedback.raw_text,
          existingSummary,
        }),
      });
      const result = await res.json();

      await Feedback.update(feedback.id as string, {
        sentiment: result.sentiment,
        analyzed: true,
      });

      const matchedInsight = result.matching_insight_id
        ? productInsights.find((i) => i.id === result.matching_insight_id)
        : null;

      if (matchedInsight) {
        await Insights.update(matchedInsight.id, {
          occurrence_count: ((matchedInsight.occurrence_count as number) || 1) + 1,
        });
        toast.success("Insight updated — occurrence count incremented!");
      } else {
        await Insights.create({
          name: result.insight_name,
          category: result.insight_category,
          severity: result.insight_severity,
          description: result.insight_description,
          related_feedback_id: feedback.id,
          related_feedback_title: feedback.title,
          product_id: feedback.product_id,
          occurrence_count: 1,
        });
        toast.success("Analysis complete! New insight created.");
      }

      qc.invalidateQueries({ queryKey: ["feedback"] });
      qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
    } catch {
      toast.error("Analysis failed. Check your API key.");
    }
    setAnalyzingId(null);
  };

  const handleSyncExternalPulse = async () => {
    console.log("Sending request to API...");
    setSyncing(true);
    const toastId = toast.loading("Syncing External Pulse…");
    try {
      let res: Response;
      try {
        res = await fetch("/api/agent/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId: selectedProductId }),
        });
      } catch {
        throw new Error("Could not reach the server. Is the dev server running?");
      }
      let data: Record<string, unknown>;
      try {
        data = await res.json();
      } catch {
        throw new Error(`Server returned an unexpected response (status ${res.status})`);
      }
      if (!res.ok) {
        throw new Error((data.error as string) ?? `Server error ${res.status}`);
      }
      qc.invalidateQueries({ queryKey: ["feedback"] });
      const saved = data.totalSaved as number;
      const processed = data.productsProcessed as number;
      toast.success(`Synced ${saved} new item${saved !== 1 ? "s" : ""}`, { id: toastId });
    } catch (err) {
      toast.error("Sync failed", { id: toastId });
    } finally {
      setSyncing(false);
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const handleDeleteSelected = async () => {
    const ids = Array.from(selectedIds);
    await Promise.all(ids.map((id) => Feedback.delete(id)));
    qc.invalidateQueries({ queryKey: ["feedback"] });
    qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
    setSelectedIds(new Set());
    setSelectionMode(false);
    setConfirmModal(null);
    toast.success(`Deleted ${ids.length} feedback entr${ids.length === 1 ? "y" : "ies"}.`);
  };

  const handleDeleteAll = async () => {
    setDeletingAll(true);
    await Promise.all(feedbackList.map((f) => Feedback.delete(f.id)));
    qc.invalidateQueries({ queryKey: ["feedback"] });
    qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
    setDeletingAll(false);
    setSelectionMode(false);
    setSelectedIds(new Set());
    setConfirmModal(null);
    toast.success("All feedback deleted for this product.");
  };

  const searchFiltered = feedbackList.filter(
    (f) =>
      (f.title as string)?.toLowerCase().includes(search.toLowerCase()) ||
      (f.raw_text as string)?.toLowerCase().includes(search.toLowerCase())
  );
  const tabFiltered = searchFiltered.filter((f) => {
    if (activeTab === "all") return true;
    const st = getSourceType(f as { source_type?: string });
    if (activeTab === "internal") return st === "Internal";
    if (activeTab === "external") return st === "External";
    return true;
  });
  const filtered = applyFeedbackFilters(
    tabFiltered as Record<string, unknown>[],
    filters
  );
  const internalCount = feedbackList.filter(
    (f) => getSourceType(f as { source_type?: string }) === "Internal"
  ).length;
  const externalCount = feedbackList.filter(
    (f) => getSourceType(f as { source_type?: string }) === "External"
  ).length;

  if (!selectedProductId) {
    return (
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <MessageSquare className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Feedback Library</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Collect and analyze raw user feedback</p>
        <NoProductSelected page="feedback" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <MessageSquare className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold text-foreground">Feedback Library</h1>
          </div>
          <p className="text-sm text-muted-foreground">Collect and analyze raw user feedback</p>
        </div>
        <div className="flex items-center gap-2">
          <input
            ref={csvInputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCSVImport}
          />
          <Button
            variant={selectionMode ? "secondary" : "outline"}
            className="gap-2"
            onClick={() => {
              setSelectionMode((s) => !s);
              setSelectedIds(new Set());
            }}
          >
            <CheckSquare className="w-4 h-4" />
            {selectionMode ? "Cancel" : "Select"}
          </Button>
          <div className="w-px h-6 bg-border" />
          <Button
            variant="outline"
            className="gap-2 border-primary text-primary hover:bg-primary/5"
            onClick={() => csvInputRef.current?.click()}
            disabled={importing}
          >
            <Upload className="w-4 h-4" />
            {importing ? "Importing…" : "Import CSV"}
          </Button>
          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Feedback
          </Button>
          <Button
            variant="outline"
            className="gap-2 border-teal-500 text-teal-600 hover:bg-teal-50"
            disabled={syncing}
            onClick={handleSyncExternalPulse}
          >
            <RefreshCw className={`w-4 h-4 ${syncing ? "animate-spin" : ""}`} />
            {syncing ? "Syncing…" : "Sync External Pulse"}
          </Button>
        </div>
      </div>

      {/* Selection mode bar */}
      {selectionMode && (
        <div className="flex items-center gap-3 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
          <CheckSquare className="w-4 h-4 text-amber-600 shrink-0" />
          <span className="text-sm text-amber-800 font-medium flex-1">
            {selectedIds.size} of {filtered.length} selected
          </span>
          <Button
            size="sm"
            variant="outline"
            className="gap-1.5 border-amber-300 text-amber-700 hover:bg-amber-100"
            onClick={() => setSelectedIds(new Set(filtered.map((f) => f.id as string)))}
          >
            Select All
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="gap-1.5"
            disabled={selectedIds.size === 0}
            onClick={() => setConfirmModal({ type: "selected" })}
          >
            <Trash2 className="w-3.5 h-3.5" />
            Delete Selected ({selectedIds.size})
          </Button>
          <Button
            size="sm"
            variant="destructive"
            className="gap-1.5 opacity-90"
            disabled={deletingAll || feedbackList.length === 0}
            onClick={() => setConfirmModal({ type: "all" })}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            Clear All
          </Button>
        </div>
      )}

      {/* Source Type Tabs */}
      <div className="flex items-center gap-1 mb-5 p-1 bg-muted/60 rounded-xl w-fit">
        {[
          { key: "all" as const, label: "All Feedbacks", count: feedbackList.length, color: "" },
          { key: "internal" as const, label: "Internal Data", count: internalCount, color: "indigo" },
          { key: "external" as const, label: "External Pulse", count: externalCount, color: "teal" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              activeTab === tab.key
                ? tab.color === "indigo"
                  ? "bg-indigo-600 text-white shadow-sm"
                  : tab.color === "teal"
                  ? "bg-teal-600 text-white shadow-sm"
                  : "bg-white text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.label}
            <span
              className={`text-xs px-1.5 py-0.5 rounded-full font-semibold ${
                activeTab === tab.key
                  ? "bg-white/20 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Search feedback…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <FeedbackFilterBar filters={filters} onChange={setFilters} />

      {/* Stats */}
      <div className="flex gap-4 mb-6">
        {[
          { label: "Total", value: feedbackList.length },
          { label: "Analyzed", value: feedbackList.filter((f) => f.analyzed).length },
          { label: "Pending", value: feedbackList.filter((f) => !f.analyzed).length },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-2.5"
          >
            <span className="text-xl font-bold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-44 bg-muted rounded-lg animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No feedback found</p>
          <p className="text-sm mt-1">Try adjusting your filters or add new feedback</p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((fb) => (
            <div
              key={fb.id as string}
              className={`relative ${selectionMode ? "cursor-pointer" : ""}`}
              onClick={() => selectionMode && toggleSelect(fb.id as string)}
            >
              {selectionMode && (
                <div
                  className="absolute top-3 left-3 z-10"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSelect(fb.id as string);
                  }}
                >
                  <div
                    className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all shadow-sm ${
                      selectedIds.has(fb.id as string)
                        ? "bg-primary border-primary"
                        : "bg-white border-muted-foreground/50 hover:border-primary"
                    }`}
                  >
                    {selectedIds.has(fb.id as string) && (
                      <svg className="w-3 h-3 text-white" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6l3 3 5-5"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                </div>
              )}
              <div
                className={
                  selectionMode && selectedIds.has(fb.id as string)
                    ? "ring-2 ring-primary ring-offset-1 rounded-lg"
                    : ""
                }
              >
                <FeedbackCard
                  feedback={fb as Record<string, unknown>}
                  onAnalyze={handleAnalyze}
                  onDelete={(id) => setConfirmModal({ type: "single", id })}
                  analyzing={analyzingId === fb.id}
                  products={products as Record<string, unknown>[]}
                  onCardClick={setDetailFeedback}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <FeedbackDetailModal
        feedback={detailFeedback}
        open={!!detailFeedback}
        onClose={() => setDetailFeedback(null)}
        product={
          products.find((p) => p.id === detailFeedback?.product_id) as
            | Record<string, unknown>
            | undefined
        }
      />

      <AddFeedbackModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => createMutation.mutateAsync(data)}
      />

      <ConfirmDeleteModal
        open={!!confirmModal}
        onClose={() => setConfirmModal(null)}
        loading={deletingAll}
        title={
          confirmModal?.type === "all"
            ? `Clear all ${feedbackList.length} feedback entries?`
            : confirmModal?.type === "selected"
            ? `Delete ${selectedIds.size} selected entr${selectedIds.size === 1 ? "y" : "ies"}?`
            : "Delete this feedback?"
        }
        description={
          confirmModal?.type === "all"
            ? "This will permanently delete every feedback entry for this product."
            : confirmModal?.type === "selected"
            ? "The selected entries will be permanently deleted."
            : "This feedback entry will be permanently deleted and cannot be recovered."
        }
        confirmLabel={confirmModal?.type === "all" ? "Clear All" : "Delete"}
        onConfirm={() => {
          if (confirmModal?.type === "all") return handleDeleteAll();
          if (confirmModal?.type === "selected") return handleDeleteSelected();
          if (confirmModal?.type === "single" && confirmModal.id) {
            deleteMutation.mutate(confirmModal.id);
            toast.success("Feedback deleted.");
            setConfirmModal(null);
          }
        }}
      />
    </div>
  );
}
