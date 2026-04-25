import { Tag, ArrowUpDown, X } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';

export const defaultPRDFilters = {
  insightType: 'all',
  sortBy: 'newest',
};

const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest First' },
  { value: 'oldest', label: 'Oldest First' },
];

export function applyPRDFilters(insightsList, filters) {
  let result = [...insightsList];

  if (filters.insightType !== 'all') {
    result = result.filter(i =>
      filters.insightType === 'Bug' ? i.category === 'Bug' : i.category !== 'Bug'
    );
  }

  return result;
}

export function sortPRDs(prdList, sortBy) {
  const result = [...prdList];
  if (sortBy === 'newest') {
    result.sort((a, b) => new Date(b.created_date) - new Date(a.created_date));
  } else {
    result.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
  }
  return result;
}

export default function PRDFilterBar({ filters, onChange }) {
  const hasActiveFilters = filters.insightType !== 'all' || filters.sortBy !== 'newest';
  const reset = () => onChange(defaultPRDFilters);
  const set = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="flex flex-wrap items-center gap-2 mb-4 p-3 bg-card border border-border rounded-xl">
      {/* Insight Type */}
      <div className="flex items-center gap-1.5">
        <Tag className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.insightType} onValueChange={v => set('insightType', v)}>
          <SelectTrigger className="h-8 text-xs w-40 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Insight Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Insight Types</SelectItem>
            <SelectItem value="Bug">Bugs Only</SelectItem>
            <SelectItem value="Feature">Features & UI/UX</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="w-px h-5 bg-border" />

      {/* Sort PRDs */}
      <div className="flex items-center gap-1.5">
        <ArrowUpDown className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
        <Select value={filters.sortBy} onValueChange={v => set('sortBy', v)}>
          <SelectTrigger className="h-8 text-xs w-36 border-0 bg-muted/60 hover:bg-muted focus:ring-0">
            <SelectValue placeholder="Sort PRDs" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
          </SelectContent>
        </Select>
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