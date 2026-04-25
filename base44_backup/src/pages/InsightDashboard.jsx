import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { useProduct } from '@/lib/ProductContext';
import NoProductSelected from '@/components/layout/NoProductSelected';
import { useInsights, INSIGHTS_QUERY_KEY } from '@/hooks/useInsights';
import { BarChart3, Zap, MessageSquare, Smile, ShieldAlert, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import InsightFilterBar, { defaultInsightFilters, applyInsightFilters } from '@/components/insights/InsightFilterBar';
import WhatUsersLove from '@/components/dashboard/WhatUsersLove';
import TopPriorityActions from '@/components/dashboard/TopPriorityActions';
import NewestFeatureRequests from '@/components/dashboard/NewestFeatureRequests';

export default function InsightDashboard() {
  const { selectedProductId } = useProduct();
  const [insightFilters, setInsightFilters] = useState(defaultInsightFilters);
  const [sourceMode, setSourceMode] = useState('combined'); // 'internal' | 'external' | 'combined'
  const qc = useQueryClient();

  const { data: insights = [], isLoading: insightsLoading } = useInsights();

  const { data: feedback = [] } = useQuery({
    queryKey: ['feedback', selectedProductId],
    queryFn: () => selectedProductId
      ? base44.entities.Feedback.filter({ product_id: selectedProductId }, '-created_date')
      : [],
    enabled: !!selectedProductId,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.Insight.delete(id),
    onMutate: (id) => {
      qc.setQueryData(INSIGHTS_QUERY_KEY, (old = []) => old.filter(i => i.id !== id));
    },
    onSuccess: () => { qc.invalidateQueries({ queryKey: INSIGHTS_QUERY_KEY }); },
  });

  // Filter by product, source mode, then apply insight filters
  const productInsights = insights.filter(i => !selectedProductId || i.product_id === selectedProductId);
  const sourceModeInsights = productInsights.filter(i => {
    if (sourceMode === 'combined') return true;
    const st = i.source_type || 'Internal';
    if (sourceMode === 'internal') return st === 'Internal';
    if (sourceMode === 'external') return st === 'External';
    return true;
  });
  const filteredInsights = applyInsightFilters(sourceModeInsights, insightFilters);
  const filteredFeedback = feedback;

  // KPI calculations
  const totalAnalyzed = filteredFeedback.filter(f => f.analyzed).length;
  const positiveCount = filteredFeedback.filter(f => f.sentiment === 'Positive').length;
  const sentimentScore = filteredFeedback.length > 0 ? Math.round((positiveCount / filteredFeedback.length) * 100) : 0;
  const criticalIssues = filteredInsights.filter(i => i.severity >= 5 && i.category !== 'Positive').length;

  const sentimentCardBg = sentimentScore >= 70 ? '#D1FAE5' : sentimentScore >= 40 ? '#FEF3C7' : '#FEE2E2';

  // Trend indicators: compare last 7 days vs previous 7 days
  const now = new Date();
  const d7 = new Date(now - 7 * 86400000);
  const d14 = new Date(now - 14 * 86400000);

  const recentFb = filteredFeedback.filter(f => f.analyzed && new Date(f.created_date) >= d7);
  const prevFb = filteredFeedback.filter(f => f.analyzed && new Date(f.created_date) >= d14 && new Date(f.created_date) < d7);

  const recentSentiment = recentFb.length > 0 ? Math.round((recentFb.filter(f => f.sentiment === 'Positive').length / recentFb.length) * 100) : null;
  const prevSentiment = prevFb.length > 0 ? Math.round((prevFb.filter(f => f.sentiment === 'Positive').length / prevFb.length) * 100) : null;
  const sentimentDelta = recentSentiment !== null && prevSentiment !== null ? recentSentiment - prevSentiment : null;

  const recentCritical = filteredInsights.filter(i => i.severity >= 5 && i.category !== 'Positive' && new Date(i.created_date) >= d7).length;
  const prevCritical = filteredInsights.filter(i => i.severity >= 5 && i.category !== 'Positive' && new Date(i.created_date) >= d14 && new Date(i.created_date) < d7).length;
  const criticalDelta = prevCritical !== null ? recentCritical - prevCritical : null;

  const TrendBadge = ({ delta, invert = false }) => {
    if (delta === null || delta === 0) return <span className="flex items-center gap-0.5 text-xs text-muted-foreground font-medium"><Minus className="w-3 h-3" /> No change</span>;
    const isPositive = invert ? delta < 0 : delta > 0;
    const Icon = delta > 0 ? TrendingUp : TrendingDown;
    return (
      <span className={`flex items-center gap-0.5 text-xs font-semibold ${isPositive ? 'text-emerald-600' : 'text-red-500'}`}>
        <Icon className="w-3.5 h-3.5" />
        {delta > 0 ? '+' : ''}{delta}{typeof delta === 'number' && Math.abs(delta) <= 100 && '%'}
      </span>
    );
  };

  const kpis = [
    {
      label: 'Total Feedback Analyzed',
      value: totalAnalyzed,
      sub: `of ${filteredFeedback.length} entries`,
      icon: MessageSquare,
      iconBg: 'bg-blue-50',
      iconColor: 'text-blue-500',
      valueColor: 'text-foreground',
      trend: null,
    },
    {
      label: 'Global Sentiment Score',
      value: `${sentimentScore}%`,
      sub: 'positive responses',
      icon: Smile,
      iconBg: sentimentScore >= 70 ? 'bg-emerald-100' : sentimentScore >= 40 ? 'bg-amber-100' : 'bg-red-100',
      iconColor: sentimentScore >= 70 ? 'text-emerald-600' : sentimentScore >= 40 ? 'text-amber-600' : 'text-red-600',
      valueColor: sentimentScore >= 70 ? 'text-emerald-700' : sentimentScore >= 40 ? 'text-amber-700' : 'text-red-600',
      cardStyle: {
        borderLeft: `4px solid ${sentimentScore >= 70 ? '#10b981' : sentimentScore >= 40 ? '#f59e0b' : '#ef4444'}`,
      },
      trend: <TrendBadge delta={sentimentDelta} />,
    },
    {
      label: 'Critical Active Issues',
      value: criticalIssues,
      sub: 'severity 5 bugs & issues',
      icon: ShieldAlert,
      iconBg: criticalIssues > 0 ? 'bg-red-50' : 'bg-emerald-50',
      iconColor: criticalIssues > 0 ? 'text-red-500' : 'text-emerald-500',
      valueColor: criticalIssues > 0 ? 'text-red-600' : 'text-emerald-600',
      trend: <TrendBadge delta={criticalDelta} invert />,
    },
  ];

  if (!selectedProductId) {
    return (
      <div className="p-8 max-w-6xl mx-auto">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Insight Dashboard</h1>
        </div>
        <p className="text-sm text-muted-foreground mb-8">AI-extracted insights from your user feedback</p>
        <NoProductSelected page="insights" />
      </div>
    );
  }

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-5">

      {/* ── HEADER ── */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-5 h-5 text-primary" />
          <h1 className="text-2xl font-bold text-foreground">Insight Dashboard</h1>
        </div>
        <p className="text-sm text-muted-foreground">AI-extracted insights from your user feedback</p>
      </div>

      {/* ── SOURCE MODE TOGGLE ── */}
      <div className="flex items-center gap-1 p-1 bg-muted/60 rounded-xl w-fit">
        {[
          { key: 'combined', label: 'Combined' },
          { key: 'internal', label: 'Internal Data' },
          { key: 'external', label: 'External Pulse' },
        ].map(mode => (
          <button
            key={mode.key}
            onClick={() => setSourceMode(mode.key)}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
              sourceMode === mode.key
                ? mode.key === 'internal'
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : mode.key === 'external'
                  ? 'bg-teal-600 text-white shadow-sm'
                  : 'bg-white text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {mode.label}
          </button>
        ))}
      </div>

      {/* ── FILTER BAR ── */}
      <InsightFilterBar filters={insightFilters} onChange={setInsightFilters} />

      {/* ── KPI STRIP ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, iconBg, iconColor, valueColor, cardStyle, trend }) => (
          <div key={label} className="bg-card border border-border rounded-xl p-5 flex items-start gap-4 overflow-hidden" style={{ borderRadius: '12px', boxShadow: '0 2px 16px 0 rgba(30,41,59,0.07)', ...cardStyle }}>
            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
              <Icon className={`w-5 h-5 ${iconColor}`} />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-1">{label}</p>
              <p className={`text-3xl font-bold leading-none ${valueColor}`}>{value}</p>
              <div className="flex items-center gap-2 mt-1">
                <p className="text-xs text-muted-foreground">{sub}</p>
                {trend}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ── MIDDLE GRID ── */}
      {insightsLoading ? (
        <div className="grid md:grid-cols-2 gap-6">
          {[0, 1].map(i => <div key={i} className="h-72 bg-muted rounded-xl animate-pulse" />)}
        </div>
      ) : filteredInsights.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground bg-card border border-border rounded-xl">
          <Zap className="w-10 h-10 mx-auto mb-3 opacity-30" />
          <p className="font-medium">No insights match your filters</p>
          <p className="text-sm mt-1">Try adjusting the filters above or run "Analyze Feedback"</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Top Priority Actions</h3>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">by severity</span>
            </div>
            <TopPriorityActions insights={filteredInsights} />
          </div>
          <div className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-foreground">Newest Feature Requests</h3>
              <span className="text-xs text-muted-foreground bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full font-medium">
                {filteredInsights.filter(i => i.category === 'Feature Request').length} total
              </span>
            </div>
            <NewestFeatureRequests insights={filteredInsights} />
          </div>
        </div>
      )}

      {/* ── RETENTION PILLARS ── */}
      <WhatUsersLove insights={filteredInsights} />
    </div>
  );
}
