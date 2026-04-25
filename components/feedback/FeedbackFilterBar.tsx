"use client";

import { Smile, Tag, ArrowUpDown, X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const SENTIMENTS = ["Positive", "Negative", "Neutral", "Mixed"];
const SOURCES = [
  { value: "Manual/CSV", label: "Manual / CSV" },
  { value: "Reddit", label: "Reddit" },
  { value: "App Store", label: "App Store / Play Store" },
];
const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "oldest", label: "Oldest" },
  { value: "critical", label: "Most Critical" },
  { value: "analyzed", label: "Analyzed First" },
];

export interface FeedbackFilters {
  sentiment: string;
  source: string;
  sortBy: string;
}

export const defaultFilters: FeedbackFilters = {
  sentiment: "all",
  source: "all",
  sortBy: "newest",
};

export function applyFeedbackFilters(list: Record<string, unknown>[], filters: FeedbackFilters) {
  let result = [...list];
  if (filters.sentiment !== "all") result = result.filter((f) => f.sentiment === filters.sentiment);
  if (filters.source !== "all") result = result.filter((f) => f.source === filters.source);

  if (filters.sortBy === "newest") {
    result.sort((a, b) => new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime());
  } else if (filters.sortBy === "oldest") {
    result.sort((a, b) => new Date(a.created_at as string).getTime() - new Date(b.created_at as string).getTime());
  } else if (filters.sortBy === "analyzed") {
    result.sort((a, b) => (b.analyzed ? 1 : 0) - (a.analyzed ? 1 : 0));
  } else if (filters.sortBy === "critical") {
    result.sort((a, b) => {
      const score = (s: unknown) => (s === "Negative" ? 2 : s === "Mixed" ? 1 : 0);
      return score(b.sentiment) - score(a.sentiment);
    });
  }
  return result;
}

interface Props {
  filters: FeedbackFilters;
  onChange: (filters: FeedbackFilters) => void;
}

export default function FeedbackFilterBar({ filters, onChange }: Props) {
  const hasActiveFilters =
    filters.sentiment !== "all" || filters.source !== "all" || filters.sortBy !== "newest";

  const reset = () => onChange(defaultFilters);
  const set = (key: keyof FeedbackFilters, value: string) =>
    onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-2 mb-5 p-3 bg-card border border-border rounded-xl">
      <div className="flex items-center gap-1.5">
        <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.source} onValueChange={(v) => set("source", v)}>
          <SelectTrigger className="h-8 text-xs w-40 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sources</SelectItem>
            {SOURCES.map((s) => (
              <SelectItem key={s.value} value={s.value}>
                {s.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-px h-5 bg-border" />

      <div className="flex items-center gap-1.5">
        <Smile className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.sentiment} onValueChange={(v) => set("sentiment", v)}>
          <SelectTrigger className="h-8 text-xs w-36 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Sentiment" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Sentiments</SelectItem>
            {SENTIMENTS.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="w-px h-5 bg-border" />

      <div className="flex items-center gap-1.5">
        <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.sortBy} onValueChange={(v) => set("sortBy", v)}>
          <SelectTrigger className="h-8 text-xs w-36 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((o) => (
              <SelectItem key={o.value} value={o.value}>
                {o.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <>
          <div className="w-px h-5 bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </Button>
          <span className="ml-auto text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Filtered
          </span>
        </>
      )}
    </div>
  );
}
