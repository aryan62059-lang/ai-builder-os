import { CheckCircle2, Circle } from "lucide-react";
import { habits } from "../../data/roadmap";
import { todayKey } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";

export function HabitTracker({ state, dispatch }) {
  const today = state.habitLog[todayKey()] ?? {};

  return (
    <Card>
      <CardHeader title="Habit Stack" eyebrow="Daily system">
        Small daily actions that keep the progression loop alive.
      </CardHeader>
      <div className="space-y-2">
        {habits.map((habit) => {
          const checked = Boolean(today[habit.id]);

          return (
            <button
              key={habit.id}
              onClick={() =>
                dispatch({
                  type: "TOGGLE_HABIT",
                  id: habit.id,
                  label: habit.label,
                  xp: habit.xp,
                })
              }
              className="focus-ring flex w-full items-center justify-between rounded-[8px] border border-white/[0.08] bg-white/[0.04] px-3 py-3 text-left transition hover:bg-white/[0.07]"
            >
              <span className="flex items-center gap-3 text-sm font-semibold text-white">
                {checked ? <CheckCircle2 size={18} className="text-emerald-300" /> : <Circle size={18} className="text-ink-500" />}
                {habit.label}
              </span>
              <span className="text-sm font-black text-sky-300">+{habit.xp}</span>
            </button>
          );
        })}
      </div>
    </Card>
  );
}
