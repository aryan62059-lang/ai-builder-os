import { buildHeatmap } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";
import { cn } from "../../utils/cn";

const intensityClass = [
  "bg-white/[0.05]",
  "bg-sky-400/25",
  "bg-sky-400/45",
  "bg-emerald-400/60",
  "bg-amber-300/80",
];

export function Heatmap({ state }) {
  const days = buildHeatmap(state);

  return (
    <Card>
      <CardHeader title="Consistency Heatmap" eyebrow="Last 42 days">
        Activity intensity combines XP and focused minutes.
      </CardHeader>
      <div className="grid grid-cols-7 gap-2">
        {days.map((day) => (
          <div
            key={day.key}
            title={`${day.label}: ${day.xp} XP, ${day.minutes} min`}
            className={cn(
              "aspect-square rounded-[6px] border border-white/[0.06]",
              intensityClass[day.intensity]
            )}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-ink-500">
        <span>Less</span>
        <div className="flex gap-1">
          {intensityClass.map((klass) => (
            <span key={klass} className={cn("h-3 w-3 rounded-[4px]", klass)} />
          ))}
        </div>
        <span>More</span>
      </div>
    </Card>
  );
}
