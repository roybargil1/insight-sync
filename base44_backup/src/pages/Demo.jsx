import { useState } from 'react';
import {
  BarChart3, FileText, Bug, Sparkles, AlertTriangle, Heart,
  Zap, MessageSquare, Smile, ShieldAlert, Eye, TrendingUp,
} from 'lucide-react';

// ── Static Spotify demo data ──────────────────────────────────────────────────
const DEMO_INSIGHTS = [
  { id: 'd1', name: 'Shuffle algorithm feels non-random', category: 'Bug', severity: 5, description: 'Users report the same songs keep repeating even with shuffle enabled, suggesting the randomisation algorithm is flawed.', related_feedback_title: 'Spotify shuffle is broken', occurrence_count: 14 },
  { id: 'd2', name: 'Collaborative playlist editing', category: 'Feature Request', severity: 4, description: 'Users want the ability to co-edit playlists in real time with friends, similar to a shared Google Doc.', related_feedback_title: 'Collab playlist feature request', occurrence_count: 9 },
  { id: 'd3', name: 'Podcast & music queue conflicts', category: 'Bug', severity: 4, description: 'Resuming a podcast after music playback clears the music queue, causing frustration for multi-content listeners.', related_feedback_title: 'Queue disappears after podcast', occurrence_count: 7 },
  { id: 'd4', name: 'Lyrics sync delayed on slow connections', category: 'UI/UX', severity: 3, description: 'The synced lyrics panel lags behind the song by 2–3 seconds on mobile data, breaking the experience.', related_feedback_title: 'Lyrics out of sync on 4G', occurrence_count: 5 },
  { id: 'd5', name: 'Offline downloads management UI', category: 'UI/UX', severity: 3, description: 'Users struggle to find and delete downloaded tracks; the management screen is buried 4 levels deep.', related_feedback_title: "Can't find my downloads", occurrence_count: 11 },
  { id: 'd6', name: 'AI-powered mood-based radio', category: 'Feature Request', severity: 4, description: 'Users want a "mood radio" that generates a playlist based on their current emotional state.', related_feedback_title: 'Smart mood playlists idea', occurrence_count: 6 },
  { id: 'd7', name: 'Discover Weekly is highly accurate', category: 'Positive', severity: 5, description: 'Many users praise Discover Weekly as the best personalisation feature; it consistently surfaces tracks they love.', related_feedback_title: 'Love Discover Weekly!', occurrence_count: 22 },
  { id: 'd8', name: 'Cross-device playback handoff is seamless', category: 'Positive', severity: 4, description: 'Users love switching playback from phone to desktop to smart speaker without interruption.', related_feedback_title: 'Spotify Connect is amazing', occurrence_count: 18 },
  { id: 'd9', name: 'Social listening / friend activity feed', category: 'Feature Request', severity: 3, description: 'Users want a revamped social feed showing what friends are listening to right now.', related_feedback_title: 'Bring back friend activity', occurrence_count: 8 },
  { id: 'd10', name: 'Sleep timer missing on Android', category: 'Bug', severity: 3, description: 'The sleep timer is available on iOS but absent on Android, causing a feature parity complaint.', related_feedback_title: 'Where is the sleep timer?', occurrence_count: 4 },
];

const DEMO_PRD = {
  product_name: 'Spotify Shuffle & Queue Overhaul',
  status: 'Draft',
  executive_summary: "This initiative addresses the top two pain points in Spotify's playback experience: a broken shuffle algorithm and unreliable queue management. Fixing these will directly reduce churn among daily active listeners and improve session length metrics.",
  problem_statement: "Over 14 users have independently reported that Spotify's shuffle algorithm repeatedly plays the same tracks, undermining the core value proposition of music discovery. Additionally, 7 users lose their carefully curated music queues when switching to podcast content, creating a fragmented listening experience.",
  proposed_solution: 'Re-implement the shuffle algorithm using a true randomisation strategy with a "recently played" exclusion window. Introduce separate, persistent queues for music and podcasts that are independently maintained and restored upon switching. Add a visual queue lock icon so users can freeze their queue before starting a podcast.',
  user_stories: "As a daily listener, I want shuffle to never repeat a song within the same session, so that I discover new music every time.\nAs a podcast fan, I want my music queue to be saved when I start a podcast, so that I can return to exactly where I left off.\nAs a power user, I want to lock my queue, so that accidental content changes don't wipe my carefully ordered playlist.\nAs a mobile user, I want a one-tap \"resume music queue\" button after a podcast ends, so that I don't have to rebuild my queue manually.",
  success_metrics: '• Shuffle satisfaction CSAT score ≥ 4.2 / 5 within 60 days of release\n• Queue-loss bug reports reduced by ≥ 80% post-launch\n• Average session length increases by ≥ 5% for users who use both music and podcast queues\n• Feature adoption: ≥ 30% of daily active users use queue lock within 90 days',
};

// ── Helpers ───────────────────────────────────────────────────────────────────
const truncateWords = (text, n = 10) => {
  if (!text) return '';
  const words = text.split(' ');
  return words.length <= n ? text : words.slice(0, n).join(' ') + '…';
};

const severityDot = (s) => {
  if (s >= 5) return 'bg-red-500';
  if (s >= 4) return 'bg-orange-400';
  if (s >= 3) return 'bg-amber-400';
  return 'bg-slate-300';
};

const severityTooltip = (s) => {
  if (s >= 5) return 'Critical';
  if (s >= 4) return 'High';
  if (s >= 3) return 'Medium';
  return 'Low';
};

// ── Mini Insight Card ─────────────────────────────────────────────────────────
function MiniCard({ insight, accent }) {
  return (
    <div
      className="bg-white rounded-2xl p-5 flex flex-col gap-3 border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Top row: dot + title + impact badge */}
      <div className="flex items-start gap-2.5">
        <span
          className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${severityDot(insight.severity)}`}
          title={severityTooltip(insight.severity)}
        />
        <p className="font-semibold text-[13px] leading-snug text-gray-900 flex-1">
          {insight.name}
        </p>
        {insight.occurrence_count > 1 && (
          <span className="shrink-0 text-[11px] font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full whitespace-nowrap">
            👥 {insight.occurrence_count}
          </span>
        )}
      </div>

      {/* Truncated description */}
      <p className="text-[12px] text-gray-500 leading-relaxed">
        {truncateWords(insight.description, 10)}
      </p>

      {/* Bottom: severity label */}
      <div className="flex items-center gap-1.5">
        <span
          className={`text-[10px] font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full border ${
            accent === 'red'   ? 'bg-red-50 text-red-600 border-red-100' :
            accent === 'blue'  ? 'bg-blue-50 text-blue-600 border-blue-100' :
            accent === 'violet'? 'bg-violet-50 text-violet-600 border-violet-100' :
                                 'bg-gray-50 text-gray-500 border-gray-100'
          }`}
        >
          {severityTooltip(insight.severity)}
        </span>
        <span className="text-[10px] text-gray-400">Sev {insight.severity}/5</span>
      </div>
    </div>
  );
}

// ── Dashboard Content ─────────────────────────────────────────────────────────
function InsightDashboardContent() {
  const bugs        = DEMO_INSIGHTS.filter(i => i.category === 'Bug');
  const requests    = DEMO_INSIGHTS.filter(i => i.category === 'Feature Request' || i.category === 'UI/UX');
  const positives   = DEMO_INSIGHTS.filter(i => i.category === 'Positive');
  const totalFeedback = 28;
  const sentimentScore = 64;
  const criticalIssues = DEMO_INSIGHTS.filter(i => i.severity >= 5 && i.category !== 'Positive').length;

  const kpis = [
    { label: 'Feedback Analyzed', value: totalFeedback, sub: 'total entries', icon: MessageSquare, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Sentiment Score', value: `${sentimentScore}%`, sub: 'positive', icon: Smile, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Critical Issues', value: criticalIssues, sub: 'severity 5', icon: ShieldAlert, color: 'text-red-500', bg: 'bg-red-50' },
    { label: 'Total Insights', value: DEMO_INSIGHTS.length, sub: 'extracted by AI', icon: TrendingUp, color: 'text-violet-500', bg: 'bg-violet-50' },
  ];

  return (
    <div className="space-y-10" style={{ fontFamily: 'Inter, sans-serif' }}>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map(({ label, value, sub, icon: Icon, color, bg }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 hover:shadow-sm transition-shadow">
            <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon className={`w-4.5 h-4.5 ${color}`} />
            </div>
            <p className="text-2xl font-bold text-gray-900 leading-none">{value}</p>
            <p className="text-[11px] font-semibold text-gray-400 uppercase tracking-wide mt-1">{label}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">{sub}</p>
          </div>
        ))}
      </div>

      {/* 3-col grid: Bugs | Requests | Love */}
      <div>
        <h2 className="text-[13px] font-semibold text-gray-400 uppercase tracking-widest mb-4">Issues & Requests</h2>
        <div className="grid lg:grid-cols-3 gap-6">

          {/* Critical Bugs */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Bug className="w-4 h-4 text-red-500" />
              <h3 className="text-[14px] font-bold text-gray-800">Critical Bugs</h3>
              <span className="ml-auto text-[11px] font-semibold bg-red-50 text-red-500 border border-red-100 px-2 py-0.5 rounded-full">{bugs.length}</span>
            </div>
            <div className="space-y-3">
              {bugs.map(i => <MiniCard key={i.id} insight={i} accent="red" />)}
            </div>
          </div>

          {/* Top Requests */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <h3 className="text-[14px] font-bold text-gray-800">Top Requests</h3>
              <span className="ml-auto text-[11px] font-semibold bg-blue-50 text-blue-500 border border-blue-100 px-2 py-0.5 rounded-full">{requests.length}</span>
            </div>
            <div className="space-y-3">
              {requests.sort((a,b) => b.occurrence_count - a.occurrence_count).map(i => (
                <MiniCard key={i.id} insight={i} accent={i.category === 'UI/UX' ? 'violet' : 'blue'} />
              ))}
            </div>
          </div>

          {/* User Love */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Heart className="w-4 h-4 text-emerald-500" />
              <h3 className="text-[14px] font-bold text-gray-800">User Love</h3>
              <span className="ml-auto text-[11px] font-semibold bg-emerald-50 text-emerald-600 border border-emerald-100 px-2 py-0.5 rounded-full">{positives.length}</span>
            </div>
            <div className="space-y-3">
              {positives.map(i => (
                <div
                  key={i.id}
                  className="rounded-2xl p-5 flex flex-col gap-2 border border-emerald-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
                  style={{ backgroundColor: '#F0FDF4' }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-base shrink-0">💚</span>
                    <p className="font-semibold text-[13px] leading-snug text-emerald-900 flex-1">{i.name}</p>
                    {i.occurrence_count > 1 && (
                      <span className="shrink-0 text-[11px] font-semibold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                        👥 {i.occurrence_count}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-emerald-700 leading-relaxed">{truncateWords(i.description, 10)}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Retention Pillars section */}
      <div
        className="rounded-3xl p-8 border border-emerald-100"
        style={{ backgroundColor: '#F0FDF4' }}
      >
        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-8 h-8 rounded-xl bg-emerald-100 flex items-center justify-center">
            <Heart className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h2 className="text-[15px] font-bold text-emerald-900">Retention Pillars</h2>
            <p className="text-[12px] text-emerald-600">What keeps users coming back — don't break these</p>
          </div>
          <span className="ml-auto text-xs font-semibold bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
            {positives.length} strengths identified
          </span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {positives.map(insight => (
            <div key={insight.id} className="bg-white rounded-2xl p-5 border border-emerald-100">
              <div className="flex items-start justify-between gap-2 mb-2">
                <p className="font-bold text-[14px] text-gray-900 leading-snug">{insight.name}</p>
                <span className="text-[11px] font-semibold text-purple-600 bg-purple-50 border border-purple-100 px-2 py-0.5 rounded-full shrink-0 whitespace-nowrap">
                  👥 {insight.occurrence_count}
                </span>
              </div>
              <p className="text-[12px] text-gray-500 leading-relaxed">{insight.description}</p>
              <p className="text-[11px] text-gray-400 mt-2">via "{insight.related_feedback_title}"</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

// ── PRD Content ───────────────────────────────────────────────────────────────
function PRDFactoryContent() {
  return (
    <div className="space-y-6 max-w-3xl" style={{ fontFamily: 'Inter, sans-serif' }}>
      <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
        {/* PRD Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{DEMO_PRD.product_name}</h2>
            <p className="text-[12px] text-gray-400 mt-1">
              Generated from {DEMO_INSIGHTS.filter(i => i.category !== 'Positive').length} insights · Spotify UX Analysis
            </p>
          </div>
          <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-600 border border-blue-100 shrink-0">
            {DEMO_PRD.status}
          </span>
        </div>

        {/* PRD Body */}
        <div className="px-8 py-6 space-y-7">
          {[
            { label: 'Executive Summary', content: DEMO_PRD.executive_summary },
            { label: 'Problem Statement', content: DEMO_PRD.problem_statement },
            { label: 'Proposed Solution', content: DEMO_PRD.proposed_solution },
          ].map(({ label, content }) => (
            <div key={label}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">{label}</p>
              <p className="text-[14px] text-gray-700 leading-relaxed">{content}</p>
            </div>
          ))}

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">User Stories</p>
            <ul className="space-y-2.5">
              {DEMO_PRD.user_stories.split('\n').filter(Boolean).map((story, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-primary font-bold text-sm shrink-0 mt-0.5">→</span>
                  <span className="text-[14px] text-gray-700 leading-relaxed">{story}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-3">Success Metrics</p>
            <ul className="space-y-2">
              {DEMO_PRD.success_metrics.split('\n').filter(Boolean).map((metric, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-emerald-500 font-bold text-sm shrink-0">✓</span>
                  <span className="text-[14px] text-gray-700 leading-relaxed">{metric.replace(/^•\s*/, '')}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-br from-primary/5 to-blue-50 border border-primary/15 rounded-3xl p-8 text-center">
        <p className="text-[16px] font-bold text-gray-900 mb-1">Generate PRDs from your own insights</p>
        <p className="text-[13px] text-gray-500 mb-5">Connect real user feedback and let AI write your PRD in seconds.</p>
        <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl text-[14px] font-semibold hover:bg-primary/90 transition-colors shadow-sm">
          Get Started Free →
        </a>
      </div>
    </div>
  );
}

// ── Sidebar nav items ─────────────────────────────────────────────────────────
const navItems = [
  { id: 'insights', label: 'Insight Dashboard', icon: BarChart3 },
  { id: 'prd',      label: 'PRD Factory',       icon: FileText  },
];

// ── Main Demo Page ─────────────────────────────────────────────────────────────
export default function Demo() {
  const [activeTab, setActiveTab] = useState('insights');
  const current = navItems.find(n => n.id === activeTab);

  return (
    <div className="flex h-screen overflow-hidden" style={{ fontFamily: 'Inter, sans-serif', backgroundColor: '#F9FAFB' }}>

      {/* ── Sidebar ── */}
      <aside className="w-60 min-h-screen bg-sidebar flex flex-col shrink-0 z-10">
        {/* Logo */}
        <div className="px-5 py-6 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shrink-0">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-[13px] leading-tight">InsightSync</p>
              <p className="text-primary text-[11px] font-semibold">AI Platform</p>
            </div>
            <span className="text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 px-1.5 py-0.5 rounded uppercase tracking-wide">Demo</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-5 space-y-0.5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/25 px-3 mb-3">Workspace</p>
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-150 text-left ${
                activeTab === id
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'text-white/50 hover:bg-white/8 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom CTA */}
        <div className="px-4 py-5 border-t border-white/10 space-y-2">
          <a
            href="/"
            className="flex items-center justify-center w-full px-3 py-2.5 rounded-xl text-[13px] font-bold bg-primary text-white hover:bg-primary/90 transition-colors"
          >
            Get Started Free →
          </a>
          <p className="text-center text-[11px] text-white/25">Read-only demo</p>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Read-only banner */}
        <div className="bg-primary text-white text-center py-2 px-4 text-[12px] font-medium flex items-center justify-center gap-2 shrink-0">
          <Eye className="w-3.5 h-3.5 shrink-0" />
          <span>Live read-only demo · Spotify UX Analysis dataset</span>
          <a href="/" className="underline underline-offset-2 font-bold ml-2 hover:opacity-80">Use your own data →</a>
        </div>

        {/* Page header */}
        <div className="bg-white border-b border-gray-100 px-8 py-5 shrink-0">
          <div className="flex items-center gap-3">
            {current && <current.icon className="w-5 h-5 text-primary shrink-0" />}
            <h1 className="text-[18px] font-bold text-gray-900">{current?.label}</h1>
            <span className="text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full font-medium ml-1">Spotify</span>
          </div>
          <p className="text-[12px] text-gray-400 mt-0.5 ml-8">
            {activeTab === 'insights'
              ? 'AI-extracted insights from user feedback · read-only view'
              : 'AI-generated PRD based on collected insights · read-only view'}
          </p>
        </div>

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {activeTab === 'insights' ? <InsightDashboardContent /> : <PRDFactoryContent />}
        </div>

      </div>
    </div>
  );
}