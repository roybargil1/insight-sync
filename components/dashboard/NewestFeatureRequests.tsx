"use client";

import { useState } from "react";
import { Sparkles, Inbox, ChevronDown, ChevronUp } from "lucide-react";
import InsightDetailModal from "@/components/dashboard/InsightDetailModal";

const DEFAULT_SHOW = 2;

export default function NewestFeatureRequests({ insights }: { insights: Record<string, unknown>[] }) {
  const [expanded, setExpanded] = useState(false);
  const [selected, setSelected] = useState<Record<string, unknown> | null>(null);

  const grouped = Object.values(
    insights
      .filter((i) => i.category === "Feature Request")
      .reduce<Record<string, Record<string, unknown>>>((acc, i) => {
        const key = (i.name as string).toLowerCase().trim();
        if (!acc[key]) {
          acc[key] = { ...i, mentionCount: (i.occurrence_count as number) || 1 };
        } else {
          (acc[key].mentionCount as number) + ((i.occurrence_count as number) || 1);
          acc[key] = {
            ...acc[key],
            mentionCount: (acc[key].mentionCount as number) + ((i.occurrence_count as number) || 1),
          };
          if (new Date(i.created_at as string) > new Date(acc[key].created_at as string)) {
            acc[key] = { ...i, mentionCount: acc[key].mentionCount };
          }
        }
        return acc;
      }, {})
  ).sort(
    (a, b) =>
      (b.mentionCount as number) - (a.mentionCount as number) ||
      new Date(b.created_at as string).getTime() - new Date(a.created_at as string).getTime()
  );

  const visible = expanded ? grouped : grouped.slice(0, DEFAULT_SHOW);

  if (grouped.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground gap-2">
        <Inbox className="w-7 h-7 opacity-25" />
        <p className="text-sm">No feature requests yet.</p>
      </div>
    );
  }

  return (
    <>
      <ol className="divide-y divide-border">
        {visible.map((insight) => (
          <li
            key={insight.id as string}
            className="flex items-start gap-2.5 py-2 first:pt-0 cursor-pointer hover:bg-muted/50 -mx-1 px-1 rounded-md transition-colors"
            onClick={() => setSelected(insight)}
          >
            <div className="w-6 h-6 rounded-md bg-blue-50 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="w-3 h-3 text-blue-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium text-foreground leading-snug truncate">{insight.name as string}</p>
                {(insight.mentionCount as number) > 1 && (
                  <span className="shrink-0 text-xs font-semibold bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full">
                    ×{insight.mentionCount as number}
                  </span>
                )}
              </div>
              {!!insight.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{insight.description as string}</p>
              )}
            </div>
          </li>
        ))}
      </ol>

      {grouped.length > DEFAULT_SHOW && (
        <button
          onClick={() => setExpanded((e) => !e)}
          className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-1"
        >
          {expanded ? (
            <>
              <ChevronUp className="w-3.5 h-3.5" /> Show less
            </>
          ) : (
            <>
              <ChevronDown className="w-3.5 h-3.5" /> Show more ({grouped.length - DEFAULT_SHOW} more)
            </>
          )}
        </button>
      )}

      <InsightDetailModal insight={selected} open={!!selected} onClose={() => setSelected(null)} />
    </>
  );
}

