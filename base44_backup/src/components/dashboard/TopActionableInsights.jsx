import { AlertTriangle, Bug, Sparkles, Layers } from 'lucide-react';

const categoryConfig = {
  'Bug': { color: 'bg-red-50 text-red-700 border-red-200', icon: Bug, dot: 'bg-red-500' },
  'Feature Request': { color: 'bg-blue-50 text-blue-700 border-blue-200', icon: Sparkles, dot: 'bg-blue-500' },
  'UI/UX': { color: 'bg-violet-50 text-violet-700 border-violet-200', icon: Layers, dot: 'bg-violet-500' },
  'Positive': { color: 'bg-emerald-50 text-emerald-700 border-emerald-200', icon: Sparkles, dot: 'bg-emerald-500' },
};

const severityLabel = (s) => {
  if (s >= 5) return { text: 'Critical', cls: 'bg-red-100 text-red-700' };
  if (s >= 4) return { text: 'High', cls: 'bg-orange-100 text-orange-700' };
  if (s >= 3) return { text: 'Medium', cls: 'bg-amber-100 text-amber-700' };
  return { text: 'Low', cls: 'bg-slate-100 text-slate-600' };
};

export default function TopActionableInsights({ insights }) {
  const top5 = [...insights]
    .filter(i => i.category !== 'Positive')
    .sort((a, b) => (b.severity || 0) - (a.severity || 0))
    .slice(0, 5);

  if (top5.length === 0) {
    return <p className="text-sm text-muted-foreground py-6 text-center">No actionable insights yet.</p>;
  }

  return (
    <ol className="space-y-3">
      {top5.map((insight, idx) => {
        const cfg = categoryConfig[insight.category] || categoryConfig['Feature Request'];
        const sev = severityLabel(insight.severity);
        return (
          <li key={insight.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
            <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 pt-0.5">{idx + 1}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-foreground leading-snug" style={{ wordBreak: 'break-word' }}>
                {insight.name}
              </p>
              {insight.description && (
                <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{insight.description}</p>
              )}
              <div className="flex items-center gap-2 mt-1.5">
                <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cfg.color}`}>
                  {insight.category}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${sev.cls}`}>
                  {sev.text}
                </span>
              </div>
            </div>
          </li>
        );
      })}
    </ol>
  );
}