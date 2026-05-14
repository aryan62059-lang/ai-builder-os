import { CheckCircle2, Circle, Sparkles } from "lucide-react";
import { habits, roadmapDays } from "../../data/roadmap";
import { todayKey } from "../../utils/gamification";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";

export function DailyQuests({ state, dispatch }) {
  const day = roadmapDays[state.currentDay - 1] ?? roadmapDays[0];
  const habitState = state.habitLog[todayKey()] ?? {};
  const quests = [
    { id: "main", label: `Complete Day ${day.day}: ${day.title}`, xp: day.xp, complete: Boolean(state.completedDays[day.day]) },
    ...habits.slice(0, 4).map((habit) => ({
      ...habit,
      complete: Boolean(habitState[habit.id]),
    })),
  ];

  return (
    <Card>
      <CardHeader title="Daily Quests" eyebrow="Streak rewards" />
      <div className="space-y-2">
        {quests.map((quest) => (
          <div key={quest.id} className="flex items-center justify-between gap-3 rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-3">
            <div className="flex items-center gap-3">
              {quest.complete ? <CheckCircle2 size={18} className="text-emerald-300" /> : <Circle size={18} className="text-ink-500" />}
              <div>
                <div className="text-sm font-semibold text-white">{quest.label}</div>
                <div className="text-xs text-ink-500">Reward +{quest.xp} XP</div>
              </div>
            </div>
            {quest.id !== "main" && !quest.complete ? (
              <Button
                variant="quiet"
                onClick={() => dispatch({ type: "TOGGLE_HABIT", id: quest.id, label: quest.label, xp: quest.xp })}
              >
                Claim
              </Button>
            ) : null}
          </div>
        ))}
      </div>
      <Button variant="primary" className="mt-4 w-full" onClick={() => dispatch({ type: "CLAIM_DAILY_REWARD" })}>
        <Sparkles size={16} />
        Claim streak reward
      </Button>
    </Card>
  );
}
