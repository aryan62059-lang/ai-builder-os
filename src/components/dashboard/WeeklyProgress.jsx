import { Activity, Clock, Flame } from "lucide-react";
import { getWeeklyStats } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";

export function WeeklyProgress({ state }) {
  const weekly = getWeeklyStats(state);

  return (
    <Card>
      <CardHeader title="Weekly Pulse" eyebrow="This week" />
      <div className="grid grid-cols-3 gap-2">
        <Metric icon={Activity} value={weekly.xp} label="XP" />
        <Metric icon={Clock} value={`${Math.round(weekly.minutes / 60)}h`} label="Focus" />
        <Metric icon={Flame} value={weekly.activeDays} label="Active" />
      </div>
      <div className="mt-4 grid grid-cols-7 gap-2">
        {weekly.days.map((day) => {
          const height = Math.max(14, Math.min(80, (day.activity.xp || 0) + (day.activity.minutes || 0) / 4));
          return (
            <div key={day.key} className="flex h-28 flex-col items-center justify-end gap-2">
              <div className="w-full rounded-[6px] bg-sky-400/70" style={{ height }} />
              <span className="text-xs text-ink-500">{day.label}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function Metric({ icon: Icon, value, label }) {
  return (
    <div className="rounded-[8px] bg-white/[0.05] p-3">
      <Icon size={15} className="mb-2 text-sky-300" />
      <div className="text-lg font-black text-white">{value}</div>
      <div className="text-xs text-ink-300">{label}</div>
    </div>
  );
}
