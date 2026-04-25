import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sparkles, Trash2, Calendar, Tag, Package } from 'lucide-react';
import { format } from 'date-fns';
import SourceTypeBadge, { getSourceType } from '@/components/shared/SourceTypeBadge';

const sentimentColors = {
  Positive: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  Negative: 'bg-red-50 text-red-700 border-red-200',
  Neutral: 'bg-slate-50 text-slate-600 border-slate-200',
  Mixed: 'bg-amber-50 text-amber-700 border-amber-200',
};

const sourceColors = {
  'Internal': 'bg-slate-50 text-slate-600 border-slate-200',
  'Reddit': 'bg-orange-50 text-orange-700 border-orange-200',
  'App Store': 'bg-blue-50 text-blue-700 border-blue-200',
  'Customer Interview': 'bg-purple-50 text-purple-700 border-purple-200',
  // legacy
  'Interview': 'bg-purple-50 text-purple-700 border-purple-200',
  'Support Ticket': 'bg-slate-50 text-slate-600 border-slate-200',
  'Review': 'bg-orange-50 text-orange-700 border-orange-200',
};

export default function FeedbackCard({ feedback, onAnalyze, onDelete, analyzing, products = [], onCardClick }) {
  const product = products.find(p => p.id === feedback.product_id);
  const sourceType = getSourceType(feedback);

  return (
    <Card
      className="p-5 transition-all duration-200 border border-slate-200 cursor-pointer flex flex-col h-full hover:shadow-xl"
      style={{ borderRadius: '12px', boxShadow: '0 2px 16px 0 rgba(30,41,59,0.07)' }}
      onClick={() => onCardClick?.(feedback)}
    >
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5 flex-wrap">
            <h3 className="font-semibold text-foreground text-sm truncate">{feedback.title}</h3>
            <SourceTypeBadge sourceType={sourceType} />
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {feedback.source && (
              <span className={`inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium ${sourceColors[feedback.source] || 'bg-muted text-muted-foreground border-border'}`}>
                <Tag className="w-3 h-3" />
                {feedback.source}
              </span>
            )}
            {feedback.date && (
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3 h-3" />
                {format(new Date(feedback.date), 'MMM d, yyyy')}
              </span>
            )}
            {product && (
              <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full border font-medium bg-slate-50 text-slate-600 border-slate-200">
                <Package className="w-3 h-3" />
                {product.name}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          {feedback.sentiment && (
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${sentimentColors[feedback.sentiment] || ''}`}>
              {feedback.sentiment}
            </span>
          )}
        </div>
      </div>

      {/* Fixed height text area for grid uniformity */}
      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 flex-1">
        {feedback.raw_text}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-border mt-auto">
        <Button
          size="sm"
          variant={feedback.analyzed ? 'outline' : 'default'}
          onClick={(e) => { e.stopPropagation(); onAnalyze(feedback); }}
          disabled={analyzing}
          className={`gap-1.5 text-xs transition-opacity duration-150 ${feedback.analyzed ? 'opacity-40 hover:opacity-100' : ''}`}
          style={!feedback.analyzed ? { background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', border: 'none' } : {}}
        >
          <Sparkles className="w-3.5 h-3.5" />
          {analyzing ? 'Analyzing…' : feedback.analyzed ? 'Re-Analyze' : 'Analyze Feedback'}
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={(e) => { e.stopPropagation(); onDelete(feedback.id); }}
          className="opacity-30 hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity duration-150"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </Button>
      </div>
    </Card>
  );
}