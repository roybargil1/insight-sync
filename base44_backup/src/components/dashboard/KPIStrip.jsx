export default function KPIStrip({ insights, feedback }) {
  const total = feedback.length;
  const positiveCount = feedback.filter(f => f.sentiment === 'Positive').length;
  const sentimentScore = total > 0 ? Math.round((positiveCount / total) * 100) : 0;
  const criticalIssues = insights.filter(i => i.severity >= 5 && i.category !== 'Positive').length;

  const cards = [
    {
      label: 'Total Feedback',
      value: total,
      sub: 'entries collected',
      color: 'text-primary',
      bg: 'bg-blue-50 border-blue-100',
      icon: '📋',
    },
    {
      label: 'Sentiment Score',
      value: `${sentimentScore}%`,
      sub: 'positive responses',
      color: sentimentScore >= 60 ? 'text-emerald-600' : sentimentScore >= 40 ? 'text-amber-600' : 'text-red-500',
      bg: sentimentScore >= 60 ? 'bg-emerald-50 border-emerald-100' : sentimentScore >= 40 ? 'bg-amber-50 border-amber-100' : 'bg-red-50 border-red-100',
      icon: '😊',
    },
    {
      label: 'Active Critical Issues',
      value: criticalIssues,
      sub: 'severity 5 bugs/issues',
      color: criticalIssues > 0 ? 'text-red-500' : 'text-emerald-600',
      bg: criticalIssues > 0 ? 'bg-red-50 border-red-100' : 'bg-emerald-50 border-emerald-100',
      icon: '🔥',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
      {cards.map(({ label, value, sub, color, bg, icon }) => (
        <div key={label} className={`rounded-xl border p-5 ${bg}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">{label}</span>
            <span className="text-lg">{icon}</span>
          </div>
          <p className={`text-3xl font-bold ${color}`}>{value}</p>
          <p className="text-xs text-muted-foreground mt-1">{sub}</p>
        </div>
      ))}
    </div>
  );
}