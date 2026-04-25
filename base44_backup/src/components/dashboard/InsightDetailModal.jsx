import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Sparkles, Bug, AlertTriangle, Heart } from 'lucide-react';

const categoryConfig = {
  'Feature Request': { icon: Sparkles, badge: 'bg-blue-100 text-blue-700', iconColor: 'text-blue-500' },
  'Bug':             { icon: Bug,      badge: 'bg-red-100 text-red-700',    iconColor: 'text-red-500' },
  'UI/UX':           { icon: AlertTriangle, badge: 'bg-violet-100 text-violet-700', iconColor: 'text-violet-500' },
  'Positive':        { icon: Heart,    badge: 'bg-emerald-100 text-emerald-700', iconColor: 'text-emerald-500' },
};

export default function InsightDetailModal({ insight, open, onClose }) {
  if (!insight) return null;
  const cfg = categoryConfig[insight.category] || categoryConfig['Feature Request'];
  const Icon = cfg.icon;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-1">
            <div className={`w-7 h-7 rounded-lg flex items-center justify-center bg-primary/10`}>
              <Icon className={`w-4 h-4 ${cfg.iconColor}`} />
            </div>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${cfg.badge}`}>
              {insight.category}
            </span>
            {(insight.occurrence_count || insight.mentionCount) > 1 && (
              <span className="text-xs font-semibold bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                ×{insight.mentionCount || insight.occurrence_count} mentions
              </span>
            )}
          </div>
          <DialogTitle className="text-base font-semibold text-foreground leading-snug">
            {insight.name}
          </DialogTitle>
        </DialogHeader>

        {insight.description && (
          <p className="text-sm text-muted-foreground leading-relaxed mt-1">
            {insight.description}
          </p>
        )}

        {insight.related_feedback_title && (
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">Source feedback:</span>{' '}
              {insight.related_feedback_title}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}