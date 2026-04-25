"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import InsightDetailModal from "@/components/dashboard/InsightDetailModal";

export default function WhatUsersLove({ insights }: { insights: Record<string, unknown>[] }) {
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);
  const positiveInsights = insights.filter((i) => i.category === "Positive");

  if (positiveInsights.length === 0) {
    return (
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-1">
          <Heart className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">What Users Love</h3>
          <span className="text-xs text-muted-foreground ml-1">â€” Retention Pillars</span>
        </div>
        <p className="text-sm text-muted-foreground mt-3 text-center py-3">
          No positive insights yet. Analyze feedback to surface what users love.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="bg-card border border-border rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-4 h-4 text-emerald-500" />
          <h3 className="text-sm font-semibold text-foreground">What Users Love</h3>
          <span className="text-xs text-muted-foreground ml-1">â€” Retention Pillars</span>
          <span className="ml-auto text-xs bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded-full font-medium">
            {positiveInsights.length} highlight{positiveInsights.length !== 1 ? "s" : ""}
          </span>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {positiveInsights.map((insight) => (
            <div
              key={insight.id as string}
              onClick={() => setSelected(insight)}
              className="bg-emerald-50 border border-emerald-100 rounded-lg p-3 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all"
            >
              <div className="flex items-start gap-2 mb-1">
                <span className="text-base mt-0.5">💚</span>
                <p
                  className="text-sm font-semibold text-emerald-900 leading-snug line-clamp-2"
                  style={{ wordBreak: "break-word" }}
                >
                  {insight.name as string}
                </p>
              </div>
              {!!insight.description && (
                <p className="text-xs text-emerald-700 leading-relaxed line-clamp-2">
                  {insight.description as string}
                </p>
              )}
              {!!insight.related_feedback_title && (
                <p className="text-xs text-emerald-600/70 mt-1.5 truncate">
                  via: {insight.related_feedback_title as string}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      <InsightDetailModal insight={selected} open={!!selected} onClose={() => setSelected(null)} />
    </>
  );
}

