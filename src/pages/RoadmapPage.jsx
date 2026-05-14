import { useMemo, useState } from "react";
import { phases, roadmapDays } from "../data/roadmap";
import { DayCard } from "../components/roadmap/DayCard";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getPhaseProgress } from "../utils/gamification";

const filters = ["All", "Current week", "Foundation", "Momentum", "Launch"];

export function RoadmapPage({ state, dispatch }) {
  const [filter, setFilter] = useState("Current week");

  const visibleDays = useMemo(() => {
    if (filter === "All") return roadmapDays;
    if (filter === "Foundation") return roadmapDays.filter((day) => day.day <= 30);
    if (filter === "Momentum") return roadmapDays.filter((day) => day.day > 30 && day.day <= 60);
    if (filter === "Launch") return roadmapDays.filter((day) => day.day > 60);
    const start = Math.max(1, state.currentDay - ((state.currentDay - 1) % 7));
    return roadmapDays.filter((day) => day.day >= start && day.day < start + 7);
  }, [filter, state.currentDay]);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="90-Day Roadmap System" eyebrow="Locked progression">
          Complete days to unlock the next stretch. First week keeps the original detailed plan, then expands into scalable daily execution.
        </CardHeader>
        <div className="grid gap-3 lg:grid-cols-3">
          {phases.map((phase) => (
            <div key={phase.id} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone="gray">Days {phase.days}</Badge>
                  <div className="mt-3 text-lg font-black text-white">{phase.title}</div>
                </div>
                <div className="text-2xl font-black" style={{ color: phase.accent }}>
                  {getPhaseProgress(state, phase.id)}%
                </div>
              </div>
              <p className="mt-2 text-sm text-ink-300">{phase.subtitle}</p>
              <ProgressBar value={getPhaseProgress(state, phase.id)} className="mt-4" />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {filters.map((item) => (
          <Button key={item} variant={filter === item ? "primary" : "secondary"} onClick={() => setFilter(item)}>
            {item}
          </Button>
        ))}
      </div>

      <div className="space-y-3">
        {visibleDays.map((day) => (
          <DayCard key={day.day} day={day} state={state} dispatch={dispatch} />
        ))}
      </div>
    </div>
  );
}
