import { CalendarDays, Users, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';

export const defaultInsightFilters = {
  category: 'all',
  dateRange: 'all',
  minFrequency: 1,
};

const DATE_RANGES = [
  { value: 'all', label: 'All Time' },
  { value: '7', label: 'Last 7 days' },
  { value: '30', label: 'Last 30 days' },
  { value: '90', label: 'Last 90 days' },
];

export function applyInsightFilters(list, filters) {
  let result = [...list];

  if (filters.category !== 'all') {
    result = result.filter(i => i.category === filters.category);
  }

  if (filters.dateRange !== 'all') {
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - parseInt(filters.dateRange));
    result = result.filter(i => new Date(i.created_date) >= cutoff);
  }

  if (filters.minFrequency > 1) {
    result = result.filter(i => (i.occurrence_count || 1) >= filters.minFrequency);
  }

  return result;
}

export default function InsightFilterBar({ filters, onChange }) {
  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.dateRange !== 'all' ||
    filters.minFrequency > 1;

  const reset = () => onChange(defaultInsightFilters);
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-3 mb-6 p-3 bg-card border border-border rounded-xl">
      {/* Category */}
      <Select value={filters.category} onValueChange={v => set('category', v)}>
        <SelectTrigger className="h-8 text-xs w-40 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
          <SelectValue placeholder="All Categories" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Categories</SelectItem>
          <SelectItem value="Bug">Bug</SelectItem>
          <SelectItem value="Feature Request">Feature Request</SelectItem>
          <SelectItem value="UI/UX">UI/UX</SelectItem>
          <SelectItem value="Positive">Positive</SelectItem>
        </SelectContent>
      </Select>

      <div className="w-px h-5 bg-border" />

      {/* Date Range */}
      <div className="flex items-center gap-1.5">
        <CalendarDays className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.dateRange} onValueChange={v => set('dateRange', v)}>
          <SelectTrigger className="h-8 text-xs w-36 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Date Range" />
          </SelectTrigger>
          <SelectContent>
            {DATE_RANGES.map(d => <SelectItem key={d.value} value={d.value}>{d.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      <div className="w-px h-5 bg-border" />

      {/* Frequency Threshold */}
      <div className="flex items-center gap-2 min-w-0">
        <Users className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">Min mentions:</span>
        <div className="w-24">
          <Slider
            min={1}
            max={10}
            step={1}
            value={[filters.minFrequency]}
            onValueChange={([v]) => set('minFrequency', v)}
            className="cursor-pointer"
          />
        </div>
        <span className="text-xs font-semibold text-foreground w-4 text-center">{filters.minFrequency}</span>
      </div>

      {hasActiveFilters && (
        <>
          <div className="w-px h-5 bg-border" />
          <Button
            variant="ghost"
            size="sm"
            onClick={reset}
            className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive gap-1"
          >
            <X className="w-3 h-3" /> Clear
          </Button>
          <span className="ml-auto text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
            Filtered
          </span>
        </>
      )}
    </div>
  );
}