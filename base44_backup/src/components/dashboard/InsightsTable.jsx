import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';

const categoryStyle = {
  'Bug': 'bg-red-50 text-red-700 border-red-200',
  'Feature Request': 'bg-blue-50 text-blue-700 border-blue-200',
  'UI/UX': 'bg-violet-50 text-violet-700 border-violet-200',
  'Positive': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const severityDot = (s) => {
  if (s >= 5) return 'bg-red-500';
  if (s >= 4) return 'bg-orange-400';
  if (s >= 3) return 'bg-amber-400';
  if (s >= 2) return 'bg-blue-400';
  return 'bg-slate-300';
};

export default function InsightsTable({ insights, onDelete, products = [] }) {
  const productName = (id) => products.find(p => p.id === id)?.name || '—';
  if (insights.length === 0) return null;

  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden">
      <div className="px-5 py-4 border-b border-border">
        <h3 className="text-sm font-semibold text-foreground">All Insights</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 text-xs text-muted-foreground font-semibold uppercase tracking-wide">
              <th className="text-left px-5 py-3">Insight</th>
              <th className="text-left px-4 py-3">Category</th>
              <th className="text-left px-4 py-3">Product</th>
              <th className="text-left px-4 py-3">Severity</th>
              <th className="text-left px-4 py-3">Source Feedback</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {insights.map((insight) => (
              <tr key={insight.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-5 py-3 max-w-xs">
                  <p className="font-medium text-foreground leading-snug" style={{ wordBreak: 'break-word' }}>
                    {insight.name}
                  </p>
                  {insight.description && (
                    <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{insight.description}</p>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${categoryStyle[insight.category] || 'bg-muted text-muted-foreground border-border'}`}>
                    {insight.category}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {productName(insight.product_id)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2.5 h-2.5 rounded-full ${severityDot(insight.severity)}`} />
                    <span className="text-xs font-semibold text-foreground">{insight.severity || '—'}/5</span>
                  </div>
                </td>
                <td className="px-4 py-3 max-w-[160px]">
                  <span className="text-xs text-muted-foreground truncate block" title={insight.related_feedback_title}>
                    {insight.related_feedback_title || '—'}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => onDelete(insight.id)}
                    className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}