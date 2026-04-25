import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useProduct } from '@/lib/ProductContext';
import NoProductSelected from '@/components/layout/NoProductSelected';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FileText, Wand2 } from 'lucide-react';
import InsightCard from '@/components/insights/InsightCard';
import PRDCard from '@/components/prd/PRDCard';
import PRDViewModal from '@/components/prd/PRDViewModal';
import PRDFilterBar, { defaultPRDFilters, applyPRDFilters, sortPRDs } from '@/components/prd/PRDFilterBar';
import { toast } from 'sonner';
import { useInsights, INSIGHTS_QUERY_KEY } from '@/hooks/useInsights';

export default function PRDFactory() {
  const { selectedProductId } = useProduct();
  const [selectedInsights, setSelectedInsights] = useState([]);
  const [prdForm, setPrdForm] = useState({ product_name: '', goal: '', target_audience: '' });
  const [generating, setGenerating] = useState(false);
  const [viewPRD, setViewPRD] = useState(null);
  const [prdFilters, setPrdFilters] = useState(defaultPRDFilters);
  const qc = useQueryClient();

  const { data: allInsights = [], isLoading: insightsLoading } = useInsights();
  const insights = selectedProductId
    ? allInsights.filter(i => i.product_id === selectedProductId)
    : allInsights;

  // Apply PRD insight type filter to the selector
  const displayedInsights = applyPRDFilters(insights, prdFilters);

  const { data: prds = [] } = useQuery({
    queryKey: ['prds'],
    queryFn: () => base44.entities.PRD.list('-created_date'),
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: 'always',
  });

  const sortedPRDs = sortPRDs(prds, prdFilters.sortBy);

  const deletePRD = useMutation({
    mutationFn: (id) => base44.entities.PRD.delete(id),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['prds'] }); toast.success('PRD deleted.'); },
  });

  // Auto-archive PRDs whose referenced insights have all been deleted
  useEffect(() => {
    if (!prds.length || insightsLoading) return;
    const insightIds = new Set(insights.map(i => i.id));
    let didArchive = false;
    prds.forEach(prd => {
      if (prd.status === 'Archived') return;
      if (!prd.selected_insight_ids) return;
      const ids = prd.selected_insight_ids.split(',').map(s => s.trim()).filter(Boolean);
      const allDeleted = ids.length > 0 && ids.every(id => !insightIds.has(id));
      if (allDeleted) {
        didArchive = true;
        base44.entities.PRD.update(prd.id, { status: 'Archived' });
      }
    });
    if (didArchive) qc.invalidateQueries({ queryKey: ['prds'] });
  }, [insights, prds, insightsLoading]);

  // Remove selected insights that no longer exist
  useEffect(() => {
    if (!insights.length) return;
    const insightIds = new Set(insights.map(i => i.id));
    setSelectedInsights(prev => prev.filter(i => insightIds.has(i.id)));
  }, [insights]);

  const toggleInsight = (insight) => {
    setSelectedInsights(prev =>
      prev.find(i => i.id === insight.id)
        ? prev.filter(i => i.id !== insight.id)
        : [...prev, insight]
    );
  };

  const handleGeneratePRD = async () => {
    if (!prdForm.product_name) { toast.error('Please enter a product name.'); return; }
    if (selectedInsights.length === 0) { toast.error('Select at least one insight.'); return; }
    setGenerating(true);
    const insightsSummary = selectedInsights.map(i =>
      `- [${i.category} | Sev ${i.severity}] ${i.name}: ${i.description || ''}`
    ).join('\n');
    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior Product Manager. Generate a comprehensive PRD for the following product based on user insights.\n\nProduct: ${prdForm.product_name}\nGoal: ${prdForm.goal || 'Not specified'}\nTarget Audience: ${prdForm.target_audience || 'Not specified'}\n\nUser Insights:\n${insightsSummary}\n\nReturn a JSON object with these fields:\n- executive_summary: 2-3 sentence high-level summary\n- problem_statement: clear articulation of the problem (2-3 sentences)\n- proposed_solution: detailed proposed solution (3-4 sentences)\n- user_stories: 3-5 user stories in format "As a [user], I want to [action], so that [benefit]." — each on a new line\n- success_metrics: 4-5 measurable KPIs, each on a new line starting with "•"\n\nWrite in a professional, concise PM style.`,
      response_json_schema: {
        type: 'object',
        properties: {
          executive_summary: { type: 'string' },
          problem_statement: { type: 'string' },
          proposed_solution: { type: 'string' },
          user_stories: { type: 'string' },
          success_metrics: { type: 'string' },
        },
      },
    });
    const saved = await base44.entities.PRD.create({
      ...prdForm, ...result, status: 'Draft',
      selected_insight_ids: selectedInsights.map(i => i.id).join(','),
    });
    qc.invalidateQueries({ queryKey: ['prds'] });
    setGenerating(false);
    setSelectedInsights([]);
    setPrdForm({ product_name: '', goal: '', target_audience: '' });
    setViewPRD(saved);
    toast.success('PRD generated!');
  };

  if (!selectedProductId) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PRD Factory</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">Select insights and generate a structured PRD with AI</p>
        <NoProductSelected page="PRDs" />
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">PRD Factory</h1>
        </div>
        <p className="text-sm text-muted-foreground">Select insights and generate a structured PRD with AI</p>
      </div>

      {/* Filter Bar */}
      <PRDFilterBar filters={prdFilters} onChange={setPrdFilters} />

      <div className="grid lg:grid-cols-5 gap-8 mt-2">
        {/* Left: Configuration */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card border border-border rounded-xl p-5">
            <h3 className="text-sm font-semibold text-foreground mb-4">PRD Settings</h3>
            <div className="space-y-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Product Name *</Label>
                <Input placeholder="e.g. ShopEasy Checkout 2.0" value={prdForm.product_name} onChange={e => setPrdForm(f => ({ ...f, product_name: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Goal</Label>
                <Textarea placeholder="What is the primary objective?" rows={2} value={prdForm.goal} onChange={e => setPrdForm(f => ({ ...f, goal: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Target Audience</Label>
                <Input placeholder="e.g. Mobile shoppers aged 25-40" value={prdForm.target_audience} onChange={e => setPrdForm(f => ({ ...f, target_audience: e.target.value }))} />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">
                {selectedInsights.length} insight{selectedInsights.length !== 1 ? 's' : ''} selected
              </p>
              <Button className="w-full gap-2" onClick={handleGeneratePRD} disabled={generating}>
                <Wand2 className="w-4 h-4" />
                {generating ? 'Generating PRD…' : 'Generate PRD Draft'}
              </Button>
            </div>
          </div>
        </div>

        {/* Right: Insights selector */}
        <div className="lg:col-span-3">
          <h3 className="text-sm font-semibold text-foreground mb-3">
            Select Insights
            {displayedInsights.length > 0 && (
              <span className="ml-2 text-xs font-normal text-muted-foreground">
                ({displayedInsights.length} of {insights.length} shown)
              </span>
            )}
          </h3>
          {insightsLoading ? (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground">
              <div className="w-7 h-7 border-4 border-border border-t-primary rounded-full animate-spin" />
              <p className="text-sm">Loading insights…</p>
            </div>
          ) : displayedInsights.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground border border-dashed border-border rounded-xl">
              <p className="text-sm">No insights match the current filter. Adjust or clear filters above.</p>
            </div>
          ) : (
            <div
              className="grid gap-3 sm:grid-cols-2 overflow-y-auto pr-2"
              style={{ maxHeight: '420px', scrollbarGutter: 'stable' }}
            >
              {displayedInsights.map(insight => (
                <InsightCard
                  key={insight.id}
                  insight={insight}
                  selectable
                  selected={!!selectedInsights.find(i => i.id === insight.id)}
                  onToggle={toggleInsight}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Existing PRDs */}
      {sortedPRDs.length > 0 && (
        <div className="mt-12">
          <h2 className="text-base font-semibold text-foreground mb-4">Generated PRDs</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {sortedPRDs.map(prd => (
              <PRDCard key={prd.id} prd={prd} onView={setViewPRD} onDelete={(id) => deletePRD.mutate(id)} />
            ))}
          </div>
        </div>
      )}

      <PRDViewModal prd={viewPRD} open={!!viewPRD} onClose={() => setViewPRD(null)} />
    </div>
  );
}
