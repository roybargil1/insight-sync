import { useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { INSIGHTS_QUERY_KEY } from '@/hooks/useInsights';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, MessageSquare, Upload, ArrowLeft, ScanSearch, Database, Wifi } from 'lucide-react';
import FeedbackCard from '@/components/feedback/FeedbackCard';
import AddFeedbackModal from '@/components/feedback/AddFeedbackModal';
import FeedbackFilterBar, { applyFeedbackFilters, defaultFilters } from '@/components/feedback/FeedbackFilterBar';
import { toast } from 'sonner';

function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) return [];
  const headers = lines[0].split(',').map(h => h.trim().replace(/^"|"$/g, '').toLowerCase());
  return lines.slice(1).map(line => {
    const values = [];
    let current = '';
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      if (line[i] === '"') { inQuotes = !inQuotes; }
      else if (line[i] === ',' && !inQuotes) { values.push(current.trim()); current = ''; }
      else { current += line[i]; }
    }
    values.push(current.trim());
    const row = {};
    headers.forEach((h, i) => { row[h] = values[i] || ''; });
    return row;
  });
}

export default function ProductFeedback() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('internal');
  const [showModal, setShowModal] = useState(false);
  const [analyzingId, setAnalyzingId] = useState(null);
  const [importing, setImporting] = useState(false);
  const [scanning, setScanning] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const csvInputRef = useRef(null);
  const qc = useQueryClient();

  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => base44.entities.Product.list().then(list => list.find(p => p.id === productId)),
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products'],
    queryFn: () => base44.entities.Product.list(),
  });

  const { data: feedbackList = [], isLoading } = useQuery({
    queryKey: ['feedback', productId],
    queryFn: () => base44.entities.Feedback.filter({ product_id: productId }, '-created_date'),
  });

  const createMutation = useMutation({
    mutationFn: (data) => base44.entities.Feedback.create({ ...data, product_id: productId }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feedback', productId] });
      setShowModal(false);
      toast.success('Feedback added!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Feedback.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['feedback', productId] });
      toast.success('Feedback deleted.');
    },
  });

  const handleCSVImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    e.target.value = '';
    setImporting(true);
    const text = await file.text();
    const rows = parseCSV(text);
    if (rows.length === 0) { toast.error('CSV appears empty or malformed.'); setImporting(false); return; }
    const VALID_SOURCES = ['Interview', 'Support Ticket', 'Review'];
    let saved = 0;
    for (const row of rows) {
      const title = row['title'] || row['Title'];
      const raw_text = row['content'] || row['Content'] || row['raw_text'];
      const rawSource = row['source'] || row['Source'] || '';
      const date = row['date'] || row['Date'] || '';
      if (!title || !raw_text) continue;
      const source = VALID_SOURCES.find(s => s.toLowerCase() === rawSource.toLowerCase()) || undefined;
      await base44.entities.Feedback.create({
        title, raw_text,
        ...(source ? { source } : {}),
        ...(date ? { date } : {}),
        analyzed: false,
        product_id: productId,
        source_type: 'Internal',
      });
      saved++;
    }
    qc.invalidateQueries({ queryKey: ['feedback', productId] });
    setImporting(false);
    toast.success(`Imported ${saved} feedback entr${saved === 1 ? 'y' : 'ies'}.`);
  };

  const handleAnalyze = async (feedback) => {
    setAnalyzingId(feedback.id);
    const user = await base44.auth.me();
    const existingInsights = await base44.entities.Insight.filter({ created_by: user.email });
    const existingSummary = existingInsights.length > 0
      ? existingInsights.map(i => `ID:${i.id} | "${i.name}" (${i.category})`).join('\n')
      : 'None';

    const result = await base44.integrations.Core.InvokeLLM({
      prompt: `You are a senior product analyst. Analyze the following user feedback.

Feedback title: "${feedback.title}"
Feedback text: "${feedback.raw_text}"

Existing insights already in the system:
${existingSummary}

Return a JSON object with:
- sentiment: one of "Positive", "Negative", "Neutral", "Mixed"
- insight_name: a concise insight title (max 8 words)
- insight_category: one of "Feature Request", "Bug", "UI/UX", "Positive"
- insight_severity: integer 1-5
- insight_description: 1-2 sentence summary
- matching_insight_id: if this feedback clearly relates to an existing insight above, return that insight's ID. Otherwise return null.`,
      response_json_schema: {
        type: 'object',
        properties: {
          sentiment: { type: 'string' },
          insight_name: { type: 'string' },
          insight_category: { type: 'string' },
          insight_severity: { type: 'number' },
          insight_description: { type: 'string' },
          matching_insight_id: { type: 'string' },
        },
      },
    });

    await base44.entities.Feedback.update(feedback.id, { sentiment: result.sentiment, analyzed: true });

    const matchedInsight = result.matching_insight_id
      ? existingInsights.find(i => i.id === result.matching_insight_id)
      : null;

    if (matchedInsight) {
      await base44.entities.Insight.update(matchedInsight.id, { occurrence_count: (matchedInsight.occurrence_count || 1) + 1 });
      toast.success('Insight updated — occurrence count incremented!');
    } else {
      await base44.entities.Insight.create({
        name: result.insight_name,
        category: result.insight_category,
        severity: result.insight_severity,
        description: result.insight_description,
        related_feedback_id: feedback.id,
        related_feedback_title: feedback.title,
        product_id: productId,
        occurrence_count: 1,
      });
      toast.success('Analysis complete! New insight created.');
    }

    qc.invalidateQueries({ queryKey: ['feedback', productId] });
    qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY });
    setAnalyzingId(null);
  };

  const handleScanProduct = async () => {
    if (!search.trim()) return;
    setScanning(true);
    await fetch('https://hook.us2.make.com/o05kfdky3pplti1s3ruwtk4fqfr0f342', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_name: search.trim(), product_id: productId }),
    });
    setScanning(false);
    toast.success(`Scan triggered for "${search.trim()}"`);
  };

  const internalFeedback = feedbackList.filter(f => f.source_type !== 'External');
  const externalFeedback = feedbackList.filter(f => f.source_type === 'External');

  const activeList = activeTab === 'internal' ? internalFeedback : externalFeedback;
  const searchFiltered = activeList.filter(f =>
    f.title?.toLowerCase().includes(search.toLowerCase()) ||
    f.raw_text?.toLowerCase().includes(search.toLowerCase())
  );
  const filtered = applyFeedbackFilters(searchFiltered, filters);

  const tabs = [
    { id: 'internal', label: 'Internal Data', icon: Database, count: internalFeedback.length, desc: 'Manual & CSV entries' },
    { id: 'external', label: 'External Pulse', icon: Wifi, count: externalFeedback.length, desc: 'AI & Scanned data' },
  ];

  return (
    <div className="p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-start gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate('/products')} className="mt-0.5 shrink-0">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h1 className="text-2xl font-bold text-foreground">
                {product?.name ?? 'Feedback Library'}
              </h1>
            </div>
            <p className="text-sm text-muted-foreground">
              {product?.company ? `${product.company} · ` : ''}Feedback for this product
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <input ref={csvInputRef} type="file" accept=".csv" className="hidden" onChange={handleCSVImport} />
          <Button variant="outline" className="gap-2" onClick={() => csvInputRef.current?.click()} disabled={importing}>
            <Upload className="w-4 h-4" />
            {importing ? 'Importing…' : 'Import CSV'}
          </Button>
          <Button onClick={() => setShowModal(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Feedback
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {tabs.map(({ id, label, icon: Icon, count, desc }) => (
          <button
            key={id}
            onClick={() => setActiveTab(id)}
            className={`flex items-center gap-3 px-5 py-3.5 rounded-xl border text-left transition-all flex-1 ${
              activeTab === id
                ? id === 'internal'
                  ? 'bg-blue-50 border-blue-200 shadow-sm'
                  : 'bg-violet-50 border-violet-200 shadow-sm'
                : 'bg-card border-border hover:border-primary/30'
            }`}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
              activeTab === id
                ? id === 'internal' ? 'bg-blue-100' : 'bg-violet-100'
                : 'bg-muted'
            }`}>
              <Icon className={`w-4 h-4 ${
                activeTab === id
                  ? id === 'internal' ? 'text-blue-600' : 'text-violet-600'
                  : 'text-muted-foreground'
              }`} />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className={`text-sm font-semibold ${activeTab === id ? 'text-foreground' : 'text-muted-foreground'}`}>
                  {label}
                </p>
                <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                  activeTab === id
                    ? id === 'internal' ? 'bg-blue-100 text-blue-700' : 'bg-violet-100 text-violet-700'
                    : 'bg-muted text-muted-foreground'
                }`}>{count}</span>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">{desc}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Search + Scan */}
      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            className="pl-9"
            placeholder={activeTab === 'external' ? 'Enter product name to scan…' : 'Search feedback…'}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>
        {activeTab === 'external' && (
          <Button
            variant="outline"
            className="gap-2 shrink-0 border-violet-200 text-violet-700 hover:bg-violet-50"
            disabled={scanning || !search.trim()}
            onClick={handleScanProduct}
          >
            <ScanSearch className="w-4 h-4" />
            {scanning ? 'Scanning…' : 'Scan Product'}
          </Button>
        )}
      </div>

      {/* Filter Bar */}
      <FeedbackFilterBar filters={filters} onChange={setFilters} />

      {/* Stats bar */}
      <div className="flex gap-4 mb-6">
        {[
          { label: 'Total', value: activeList.length },
          { label: 'Analyzed', value: activeList.filter(f => f.analyzed).length },
          { label: 'Pending', value: activeList.filter(f => !f.analyzed).length },
        ].map(({ label, value }) => (
          <div key={label} className="bg-card border border-border rounded-lg px-4 py-2.5 flex items-center gap-2.5">
            <span className="text-xl font-bold text-foreground">{value}</span>
            <span className="text-xs text-muted-foreground font-medium">{label}</span>
          </div>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2">
          {[...Array(3)].map((_, i) => <div key={i} className="h-44 bg-muted rounded-lg animate-pulse" />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground border border-dashed border-border rounded-xl">
          {activeTab === 'external'
            ? <Wifi className="w-10 h-10 mx-auto mb-3 opacity-30" />
            : <Database className="w-10 h-10 mx-auto mb-3 opacity-30" />
          }
          <p className="font-medium">No {activeTab === 'internal' ? 'internal' : 'external'} feedback yet</p>
          <p className="text-sm mt-1">
            {activeTab === 'internal'
              ? 'Add feedback manually or import a CSV file'
              : 'Use "Scan Product" to pull in external data'}
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map(fb => (
            <FeedbackCard
              key={fb.id}
              feedback={fb}
              onAnalyze={handleAnalyze}
              onDelete={(id) => deleteMutation.mutate(id)}
              analyzing={analyzingId === fb.id}
              products={products}
            />
          ))}
        </div>
      )}

      <AddFeedbackModal
        open={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={(data) => createMutation.mutateAsync({ ...data, source_type: 'Internal' })}
        productId={productId}
      />
    </div>
  );
}