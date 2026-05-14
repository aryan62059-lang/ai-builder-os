import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getSkillProgress, getWeeklyStats } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";

const tooltipStyle = {
  background: "rgba(8,10,18,0.94)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#edf2ff",
};

export function AnalyticsCharts({ state }) {
  const weekly = getWeeklyStats(state);
  const weeklyData = weekly.days.map((day) => ({
    name: day.label,
    xp: day.activity.xp || 0,
    focus: Math.round((day.activity.minutes || 0) / 10),
  }));
  const skillData = getSkillProgress(state).map((skill) => ({
    name: skill.name.replace(" + ", " "),
    progress: skill.value,
  }));

  return (
    <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
      <Card>
        <CardHeader title="Productivity Analytics" eyebrow="Animated charts">
          Weekly XP and focus minutes rendered through Recharts.
        </CardHeader>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={weeklyData} margin={{ left: -18, right: 8, top: 12, bottom: 0 }}>
              <defs>
                <linearGradient id="xpGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.65} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" stroke="#66708b" tickLine={false} axisLine={false} />
              <YAxis stroke="#66708b" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="xp" stroke="#38bdf8" strokeWidth={3} fill="url(#xpGradient)" />
              <Area type="monotone" dataKey="focus" stroke="#a78bfa" strokeWidth={2} fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <CardHeader title="Skill Lane Output" eyebrow="Progress chart" />
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={skillData} layout="vertical" margin={{ left: 22, right: 8, top: 10, bottom: 0 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" stroke="#66708b" tickLine={false} axisLine={false} domain={[0, 100]} />
              <YAxis type="category" dataKey="name" width={92} stroke="#b7c0d6" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="progress" radius={[0, 8, 8, 0]} fill="#34d399" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
