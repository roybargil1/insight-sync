import { useState } from 'react';
import { Bug, Sparkles, AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react';

const categoryStyle = {
  'Bug': { badge: 'bg-red-100 text-red-700', icon: Bug, iconColor: 'text-red-500' },
  'Feature Request': { badge: 'bg-blue-100 text-blue-700', icon: Sparkles, iconColor: 'text-blue-500' },
  'UI/UX': { badge: 'bg-violet-100 text-violet-700', icon: AlertTriangle, iconColor: 'text-violet-500' },
};

const severityLabel = (s) => {
  if (s >= 5) return { text: 'Critical', cls: 'bg-red-100 text-red-700' };
  if (s >= 4) return { text: 'High', cls: 'bg-orange-100 text-orange-700' };
  return { text: 'Medium', cls: 'bg-amber-100 text-amber-700' };
};

const DEFAULT_SHOW = 3;

export default function TopPriorityActions({ insights }) {
  const [expanded, setExpanded] = useState(false);

  const priority = [...insights]
    .filter(i => i.category !== 'Positive' && i.severity >= 3)
    .sort((a, b) => {
      const occDiff = (b.occurrence_count || 1) - (a.occurrence_count || 1);
      if (occDiff !== 0) return occDiff;
      return (b.severity || 0) - (a.severity || 0);
    })
    .slice(0, 6);

  const visible = expanded ? priority : priority.slice(0, DEFAULT_SHOW);

  if (priority.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-32 text-center text-muted-foreground gap-2">
        <AlertTriangle className="w-7 h-7 opacity-25" />
        <p className="text-sm">No critical or high priority actions.</p>
      </div>
    );
  }

  return (
    <div>
      <ol className="divide-y divide-border">
        {visible.map((insight, idx) => {
          const cfg = categoryStyle[insight.category] || categoryStyle['Feature Request'];
          const Icon = cfg.icon;
          const sev = severityLabel(insight.severity);
          return (
            <li key={insight.id} className="flex items-start gap-2.5 py-2 first:pt-0">
              <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold text-muted-foreground shrink-0 mt-0.5">
                {idx + 1}
              </span>
              <Icon className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${cfg.iconColor}`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground leading-snug">{insight.name}</p>
                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${cfg.badge}`}>{insight.category}</span>
                  <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${sev.cls}`}>{sev.text}</span>
                  {(insight.occurrence_count || 1) > 1 && (
                    <span className="text-xs px-1.5 py-0.5 rounded-full font-medium bg-purple-100 text-purple-700">
                      ×{insight.occurrence_count}
                    </span>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ol>

      {priority.length > DEFAULT_SHOW && (
        <button
          onClick={() => setExpanded(e => !e)}
          className="mt-2 flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors w-full justify-center py-1"
        >
          {expanded ? (
            <><ChevronUp className="w-3.5 h-3.5" /> Show less</>
          ) : (
            <><ChevronDown className="w-3.5 h-3.5" /> Show more ({priority.length - DEFAULT_SHOW} more)</>
          )}
        </button>
      )}
    </div>
  );
}