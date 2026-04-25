"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Trash2, Calendar, Tag, Package } from "lucide-react";
import { format } from "date-fns";
import SourceTypeBadge, { getSourceType } from "@/components/shared/SourceTypeBadge";

const sentimentColors: Record<string, string> = {
  Positive: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Negative: "bg-red-50 text-red-700 border-red-200",
  Neutral: "bg-slate-50 text-slate-600 border-slate-200",
  Mixed: "bg-amber-50 text-amber-700 border-amber-200",
};

const sourceColors: Record<string, string> = {
  Internal: "bg-slate-50 text-slate-600 border-slate-200",
  Reddit: "bg-orange-50 text-orange-700 border-orange-200",
  "App Store": "bg-blue-50 text-blue-700 border-blue-200",
  "Customer Interview": "bg-purple-50 text-purple-700 border-purple-200",
  Interview: "bg-purple-50 text-purple-700 border-purple-200",
  "Support Ticket": "bg-slate-50 text-slate-600 border-slate-200",
  Review: "bg-orange-50 text-orange-700 border-orange-200",
};

interface Props {
  feedback: Record<string, unknown>;
  onAnalyze: (fb: Record<string, unknown>) => void;
  onDelete: (id: string) => void;
  analyzing: boolean;
  products?: Record<string, unknown>[];
  onCardClick?: (fb: Record<string, unknown>) => void;
}

export default function FeedbackCard({ feedback, onAnalyze, onDelete, analyzing, products = [], onCardClick }: Props) {
  const product = products.find((p) => p.id === feedback.product_id);
  const sourceType = getSourceType(feedback as { source_type?: string });

  return (
    <Card
      className="p-5 transition-all duration-200 border border-slate-200 cursor-pointer flex flex-col h-full hover:shadow-xl"
      style={{ borderRadius: "12px", boxShadow: "0 2px 16px 0 rgba(30,41,59,0.07)" }}
      onClick={() => onCardClick?.(feedback)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-semibold text-foreground text-sm truncate">{feedback.title as string}</h3>
            <SourceTypeBadge sourceType={sourceType} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {!!feedback.source && (
              <span
                className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${
                  sourceColors[feedback.source as string] || "bg-muted text-muted-foreground border-border"
                }`}
              >
                <Tag className="w-3 h-3" />
                {feedback.source as string}
              </span>
            )}
            {!!feedback.date && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(new Date(feedback.date as string), "MMM d, yyyy")}
              </span>
            )}
            {!!product && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium bg-slate-50 text-slate-600 border-slate-200">
                <Package className="w-3 h-3" />
                {product.name as string}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {!!feedback.sentiment && (
            <span
              className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                sentimentColors[feedback.sentiment as string] || ""
              }`}
            >
              {feedback.sentiment as string}
            </span>
          )}
        </div>
      </div>

      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
        {feedback.raw_text as string}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <Button
          size="sm"
          variant={feedback.analyzed ? "outline" : "default"}
          onClick={(e) => {
            e.stopPropagation();
            onAnalyze(feedback);
          }}
          disabled={analyzing}
          className={`gap-1.5 text-xs transition-opacity duration-150 ${feedback.analyzed ? "opacity-40 hover:opacity-100" : ""}`}
          style={
            !feedback.analyzed
              ? { background: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)", border: "none" }
              : {}
          }
        >
          <Sparkles className="w-3.5 h-3.5" />
          {analyzing ? "Analyzing…" : feedback.analyzed ? "Re-Analyze" : "Analyze Feedback"}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => {
            e.stopPropagation();
            onDelete(feedback.id as string);
          }}
          className="opacity-30 hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity duration-150"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
}
