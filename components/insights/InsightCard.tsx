"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Link2 } from "lucide-react";
import SourceTypeBadge, { getSourceType } from "@/components/shared/SourceTypeBadge";

const categoryColors: Record<string, string> = {
  "Feature Request": "bg-blue-50 text-blue-700 border-blue-200",
  Bug: "bg-red-50 text-red-700 border-red-200",
  "UI/UX": "bg-violet-50 text-violet-700 border-violet-200",
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
};

const severityColor = (s: number) => {
  if (s >= 5) return "bg-red-500";
  if (s >= 4) return "bg-orange-400";
  if (s >= 3) return "bg-amber-400";
  if (s >= 2) return "bg-blue-400";
  return "bg-slate-300";
};

interface Props {
  insight: Record<string, unknown>;
  onDelete?: (id: string) => void;
  selectable?: boolean;
  selected?: boolean;
  onToggle?: (insight: Record<string, unknown>) => void;
}

export default function InsightCard({ insight, onDelete, selectable, selected, onToggle }: Props) {
  return (
    <Card
      onClick={selectable ? () => onToggle?.(insight) : undefined}
      className={`p-4 transition-all duration-150 border-2 flex flex-col ${selectable ? "cursor-pointer" : ""} ${
        selected
          ? "border-primary bg-accent/40"
          : "border-border hover:border-primary/30 hover:shadow-md"
      }`}
    >
      <div className="flex items-start gap-2 mb-2 min-w-0">
        <h3
          className="font-semibold text-sm text-foreground flex-1 min-w-0"
          style={{ wordBreak: "break-word", overflowWrap: "break-word" }}
        >
          {insight.name as string}
        </h3>
        <span
          className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 whitespace-nowrap ${
            categoryColors[insight.category as string] || "bg-muted text-muted-foreground border-border"
          }`}
        >
          {insight.category as string}
        </span>
      </div>

      {!!insight.description && (
        <p
          className="text-xs text-muted-foreground mb-3 leading-relaxed"
          style={{
            wordBreak: "break-word",
            overflowWrap: "break-word",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          } as React.CSSProperties}
        >
          {insight.description as string}
        </p>
      )}

      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <SourceTypeBadge sourceType={getSourceType(insight as { source_type?: string })} />
        {((insight.occurrence_count as number) || 1) > 0 && (
          <span className="text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
            x{(insight.occurrence_count as number) || 1} users
          </span>
        )}
      </div>

      <div className="mt-auto flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground font-medium">Sev</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((n) => (
              <div
                key={n}
                className={`w-2.5 h-2.5 rounded-sm ${
                  n <= (insight.severity as number)
                    ? severityColor(insight.severity as number)
                    : "bg-border"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-semibold text-foreground">{insight.severity as number}/5</span>
        </div>

        <div className="flex items-center gap-1 min-w-0">
          {!!insight.related_feedback_title && (
            <span
              className="inline-flex items-center gap-1 text-xs text-muted-foreground min-w-0"
              style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "120px" }}
              title={insight.related_feedback_title as string}
            >
              <Link2 className="w-3 h-3 shrink-0" />
              <span className="truncate">{insight.related_feedback_title as string}</span>
            </span>
          )}
          {!selectable && onDelete && (
            <Button
              size="sm"
              variant="ghost"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(insight.id as string);
              }}
              className="text-muted-foreground hover:text-destructive h-6 w-6 p-0 ml-1 shrink-0"
            >
              <Trash2 className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>

      {selectable && selected && (
        <div className="mt-3 pt-2 border-t border-primary/20">
          <span className="text-xs font-semibold text-primary">Selected for PRD</span>
        </div>
      )}
    </Card>
  );
}
