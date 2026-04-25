"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, Tag, Package } from "lucide-react";
import { format } from "date-fns";

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
  feedback: Record<string, unknown> | null;
  open: boolean;
  onClose: () => void;
  product?: Record<string, unknown>;
}

export default function FeedbackDetailModal({ feedback, open, onClose, product }: Props) {
  if (!feedback) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-foreground pr-6 leading-snug">
            {feedback.title as string}
          </DialogTitle>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {!!feedback.sentiment && (
              <span
                className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                  sentimentColors[feedback.sentiment as string] || ""
                }`}
              >
                {feedback.sentiment as string}
              </span>
            )}
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
        </DialogHeader>

        <div className="mt-2 pt-3 border-t border-border">
          <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
            {feedback.raw_text as string}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
