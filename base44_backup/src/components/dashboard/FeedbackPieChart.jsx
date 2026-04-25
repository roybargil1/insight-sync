import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const COLORS = {
  'Feature Request': '#3b82f6',
  'Bug': '#ef4444',
  'UI/UX': '#8b5cf6',
  'Positive': '#10b981',
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-md text-xs">
        <p className="font-semibold text-foreground">{payload[0].name}</p>
        <p className="text-muted-foreground">{payload[0].value} insight{payload[0].value !== 1 ? 's' : ''}</p>
      </div>
    );
  }
  return null;
};

export default function FeedbackPieChart({ insights }) {
  const data = Object.entries(
    insights.reduce((acc, ins) => {
      acc[ins.category] = (acc[ins.category] || 0) + 1;
      return acc;
    }, {})
  ).map(([name, value]) => ({ name, value }));

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-muted-foreground text-sm">
        No data yet
      </div>
    );
  }

  return (
    <div>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            paddingAngle={3}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={COLORS[entry.name] || '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap gap-3 justify-center mt-1">
        {data.map(({ name, value }) => (
          <div key={name} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: COLORS[name] || '#94a3b8' }} />
            <span className="text-xs text-muted-foreground">{name} ({value})</span>
          </div>
        ))}
      </div>
    </div>
  );
}