"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { PRDs, Insights } from "@/lib/db";
import { useProduct } from "@/lib/ProductContext";
import NoProductSelected from "@/components/layout/NoProductSelected";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Wand2 } from "lucide-react";
import InsightCard from "@/components/insights/InsightCard";
import PRDCard from "@/components/prd/PRDCard";
import PRDViewModal from "@/components/prd/PRDViewModal";
import PRDFilterBar, {
  defaultPRDFilters,
  applyPRDFilters,
  sortPRDs,
} from "@/components/prd/PRDFilterBar";
import { toast } from "sonner";
import { useInsights, INSIGHTS_QUERY_KEY } from "@/hooks/useInsights";

export default function PRDFactoryPage() {
  const { selectedProductId } = useProduct();
  const [selectedInsights, setSelectedInsights] = useState<Record<string, unknown>[]>([]);
  const [prdForm, setPrdForm] = useState({ product_name: "", goal: "", target_audience: "" });
  const [generating, setGenerating] = useState(false);
  const [viewPRD, setViewPRD] = useState<Record<string, unknown> | null>(null);
  const [prdFilters, setPrdFilters] = useState(defaultPRDFilters);
  const qc = useQueryClient();

  const { data: allInsights = [], isLoading: insightsLoading } = useInsights();
  const insights = useMemo(
    () =>
      selectedProductId
        ? allInsights.filter((i) => i.product_id === selectedProductId)
        : allInsights,
    [allInsights, selectedProductId]
  );

  const displayedInsights = useMemo(
    () => applyPRDFilters(insights as Record<string, unknown>[], prdFilters),
    [insights, prdFilters]
  );

  const { data: prds = [] } = useQuery({
    queryKey: ["prds"],
    queryFn: () => PRDs.list(),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always" as const,
  });

  const sortedPRDs = sortPRDs(prds as Record<string, unknown>[], prdFilters.sortBy);

  const deletePRD = useMutation({
    mutationFn: (id: string) => PRDs.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["prds"] });
      toast.success("PRD deleted.");
    },
  });

  useEffect(() => {
    if (!prds.length || insightsLoading) return;
    const insightIds = new Set(insights.map((i) => i.id));
    let didArchive = false;
    prds.forEach((prd) => {
      if (prd.status === "Archived") return;
      if (!prd.selected_insight_ids) return;
      const ids = (prd.selected_insight_ids as string).split(",").map((s) => s.trim()).filter(Boolean);
      const allDeleted = ids.length > 0 && ids.every((id) => !insightIds.has(id));
      if (allDeleted) {
        didArchive = true;
        PRDs.update(prd.id as string, { status: "Archived" });
      }
    });
    if (didArchive) qc.invalidateQueries({ queryKey: ["prds"] });
  }, [insights, prds, insightsLoading]);

  useEffect(() => {
    if (!insights.length) return;
    const insightIds = new Set(insights.map((i) => i.id));
    setSelectedInsights((prev) => {
      const next = prev.filter((i) => insightIds.has(i.id));
      return next.length === prev.length ? prev : next;
    });
  }, [insights]);

  const toggleInsight = (insight: Record<string, unknown>) => {
    setSelectedInsights((prev) =>
      prev.find((i) => i.id === insight.id)
        ? prev.filter((i) => i.id !== insight.id)
        : [...prev, insight]
    );
  };

  const handleGeneratePRD = async () => {
    if (!prdForm.product_name) {
      toast.error("Please enter a product name.");
      return;
    }
    if (selectedInsights.length === 0) {
      toast.error("Select at least one insight.");
      return;
    }
    setGenerating(true);
    try {
      const insightsSummary = selectedInsights
        .map((i) => `- [${i.category} | Sev ${i.severity}] ${i.name}: ${i.description || ""}`)
        .join("\n");

      const res = await fetch("/api/generate-prd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...prdForm, insightsSummary }),
      });
      const result = await res.json();

      const saved = await PRDs.create({
        ...prdForm,
        ...result,
        status: "Draft",
        selected_insight_ids: selectedInsights.map((i) => i.id).join(","),
      });
      qc.invalidateQueries({ queryKey: ["prds"] });
      setSelectedInsights([]);
      setPrdForm({ product_name: "", goal: "", target_audience: "" });
      setViewPRD(saved as Record<string, unknown>);
      toast.success("PRD generated!");
    } catch {
      toast.error("PRD generation failed. Check your API key.");
    }
    setGenerating(false);
  };

  if (!selectedProductId) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PRD Factory</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">
          Select insights and generate a structured PRD with AI
        </p>
        <NoProductSelected page="PRDs" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PRD Factory</h1>
        </div>
        <p className="text-sm text-muted-foreground">
          Select insights and generate a structured PRD with AI
        </p>
      </div>

      <PRDFilterBar filters={prdFilters} onChange={setPrdFilters} />

      <div className="grid lg:grid-cols-5 gap-8 mt-2">
        {/* Left: Config */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">PRD Settings</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Product Name *</Label>
                <Input
                  placeholder="e.g. ShopEasy Checkout 2.0"
                  value={prdForm.product_name}
                  onChange={(e) => setPrdForm((f) => ({ ...f, product_name: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Goal</Label>
                <Textarea
                  placeholder="What is the primary objective?"
                  rows={2}
                  value={prdForm.goal}
                  onChange={(e) => setPrdForm((f) => ({ ...f, goal: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Target Audience</Label>
                <Input
                  placeholder="e.g. Mobile shoppers aged 25-40"
                  value={prdForm.target_audience}
                  onChange={(e) =>
                    setPrdForm((f) => ({ ...f, target_audience: e.target.value }))
                  }
                />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                {selectedInsights.length} insight{selectedInsights.length !== 1 ? "s" : ""} selected
              </p>
              <Button className="w-full gap-2" onClick={handleGeneratePRD} disabled={generating}>
                <Wand2 className="w-4 h-4" />
                {generating ? "Generating PRD…" : "Generate PRD Draft"}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Insights selector */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Select Insights
            {displayedInsights.length > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({displayedInsights.length} of {insights.length} shown)
              </span>
            )}
          </h3>
          {insightsLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
              <div className="w-7 h-7 border-4 border-border border-t-primary rounded-full animate-spin" />
              <p className="text-sm">Loading insights…</p>
            </div>
          ) : displayedInsights.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
              <p className="text-sm">
                No insights match the current filter. Adjust or clear filters above.
              </p>
            </div>
          ) : (
            <div
              className="grid gap-3 sm:grid-cols-2 overflow-y-auto pr-2"
              style={{ maxHeight: "420px", scrollbarGutter: "stable" }}
            >
              {displayedInsights.map((insight) => (
                <InsightCard
                  key={insight.id as string}
                  insight={insight}
                  selectable
                  selected={!!selectedInsights.find((i) => i.id === insight.id)}
                  onToggle={toggleInsight}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Generated PRDs */}
      {sortedPRDs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-base font-semibold text-foreground mb-4">Generated PRDs</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPRDs.map((prd) => (
              <PRDCard
                key={prd.id as string}
                prd={prd}
                onView={setViewPRD}
                onDelete={(id) => deletePRD.mutate(id)}
              />
            ))}
          </div>
        </div>
      )}

      <PRDViewModal prd={viewPRD} open={!!viewPRD} onClose={() => setViewPRD(null)} />
    </div>
  );
}
