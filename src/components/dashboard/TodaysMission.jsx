import { CheckCircle2, Circle, Lock, Radar } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";
import { Badge } from "../ui/Badge";
import { MissionBriefing } from "../missions/MissionBriefing";

export function TodaysMission({ day, state, dispatch }) {
  const [activeMission, setActiveMission] = useState(null);
  const taskState = state.completedTasks[String(day.day)] ?? {};
  const doneCount = day.tasks.filter((_, index) => taskState[index]).length;
  const isComplete = Boolean(state.completedDays[day.day]);
  const isLocked = day.day > state.currentDay;

  return (
    <Card className="h-full">
      <CardHeader
        eyebrow="Today's mission"
        title={`Day ${day.day}: ${day.title}`}
        action={<Badge tone={day.priority === "High" ? "amber" : "gray"}>{day.priority}</Badge>}
      >
        {day.mission}
      </CardHeader>

      <div className="mb-4 grid gap-3 sm:grid-cols-3">
        <div className="rounded-[8px] bg-white/[0.05] p-3">
          <div className="text-xl font-black text-white">+{day.xp}</div>
          <div className="text-xs text-ink-300">Completion XP</div>
        </div>
        <div className="rounded-[8px] bg-white/[0.05] p-3">
          <div className="text-xl font-black text-white">{day.hours}h</div>
          <div className="text-xs text-ink-300">Time budget</div>
        </div>
        <div className="rounded-[8px] bg-white/[0.05] p-3">
          <div className="text-xl font-black text-white">{doneCount}/{day.tasks.length}</div>
          <div className="text-xs text-ink-300">Tasks done</div>
        </div>
      </div>

      <div className="space-y-2">
        {day.tasks.map((task, index) => {
          const checked = Boolean(taskState[index]);
          return (
            <button
              key={task}
              disabled={isLocked}
              onClick={() => setActiveMission(index)}
              className="focus-ring flex w-full items-start gap-3 rounded-[8px] border border-white/[0.08] bg-white/[0.03] p-3 text-left text-sm transition hover:border-red-400/35 hover:bg-red-500/10 disabled:opacity-50"
            >
              {checked ? (
                <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-300" />
              ) : (
                <Circle size={18} className="mt-0.5 shrink-0 text-ink-500" />
              )}
              <span className={checked ? "text-white" : "text-ink-300"}>{task}</span>
              <Radar size={16} className="ml-auto shrink-0 text-red-300" />
            </button>
          );
        })}
      </div>

      <div className="mt-4 rounded-[8px] border border-sky-300/15 bg-sky-300/10 p-3 text-sm text-sky-100">
        <span className="font-semibold">Challenge:</span> {day.challenge}
      </div>

      <motion.div className="mt-4" whileTap={{ scale: 0.98 }}>
        <Button
          variant={isComplete ? "secondary" : "primary"}
          disabled={isLocked || isComplete}
          onClick={() => dispatch({ type: "COMPLETE_DAY", day: day.day })}
          className="w-full"
        >
          {isLocked ? <Lock size={16} /> : <CheckCircle2 size={16} />}
          {isLocked ? "Locked until you reach this day" : isComplete ? "Day complete" : "Complete day and claim XP"}
        </Button>
      </motion.div>
      <MissionBriefing
        day={day}
        taskIndex={activeMission}
        open={activeMission !== null}
        onClose={() => setActiveMission(null)}
        state={state}
        dispatch={dispatch}
      />
    </Card>
  );
}
