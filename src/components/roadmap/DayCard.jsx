import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, ChevronDown, Circle, Lock, Radar } from "lucide-react";
import { useState } from "react";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { cn } from "../../utils/cn";
import { MissionBriefing } from "../missions/MissionBriefing";

export function DayCard({ day, state, dispatch }) {
  const [expanded, setExpanded] = useState(day.day === state.currentDay);
  const [activeMission, setActiveMission] = useState(null);
  const locked = day.day > state.currentDay;
  const complete = Boolean(state.completedDays[day.day]);
  const taskState = state.completedTasks[String(day.day)] ?? {};
  const doneCount = day.tasks.filter((_, index) => taskState[index]).length;

  return (
    <motion.article
      layout
      className={cn(
        "overflow-hidden rounded-[8px] border bg-ink-900/72",
        complete
          ? "border-emerald-300/25"
          : day.day === state.currentDay
            ? "border-sky-300/30"
            : "border-white/[0.08]",
        locked && "opacity-60"
      )}
    >
      <button
        onClick={() => setExpanded((value) => !value)}
        className="focus-ring flex w-full items-center justify-between gap-4 p-4 text-left"
      >
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={cn(
              "grid h-11 w-11 shrink-0 place-items-center rounded-[8px] font-black",
              complete
                ? "bg-emerald-300 text-ink-950"
                : day.day === state.currentDay
                  ? "bg-sky-300 text-ink-950"
                  : "bg-white/[0.06] text-white"
            )}
          >
            {locked ? <Lock size={17} /> : day.day}
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-semibold text-white">{day.title}</h3>
              <Badge tone="gray">{day.track}</Badge>
            </div>
            <p className="mt-1 line-clamp-1 text-sm text-ink-300">{day.mission}</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div className="hidden text-right sm:block">
            <div className="font-black text-sky-300">+{day.xp} XP</div>
            <div className="text-xs text-ink-500">{doneCount}/{day.tasks.length} tasks</div>
          </div>
          <ChevronDown className={cn("text-ink-500 transition", expanded && "rotate-180")} size={18} />
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="border-t border-white/[0.08] p-4">
              <div className="grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-2">
                  {day.tasks.map((task, index) => {
                    const checked = Boolean(taskState[index]);
                    return (
                      <button
                        key={task}
                        disabled={locked}
                        onClick={() => setActiveMission(index)}
                        className="focus-ring flex w-full items-start gap-3 rounded-[8px] bg-white/[0.04] p-3 text-left text-sm transition hover:border-red-400/35 hover:bg-red-500/10 disabled:cursor-not-allowed"
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

                <div className="space-y-3">
                  <div className="rounded-[8px] border border-sky-300/15 bg-sky-300/10 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-sky-200">Tool focus</div>
                    <div className="mt-2 text-sm text-sky-50">{day.tool}</div>
                  </div>
                  <div className="rounded-[8px] border border-amber-300/15 bg-amber-300/10 p-3">
                    <div className="text-xs font-bold uppercase tracking-[0.16em] text-amber-200">Mini challenge</div>
                    <div className="mt-2 text-sm text-amber-50">{day.challenge}</div>
                  </div>
                  <Button
                    variant={complete ? "secondary" : "primary"}
                    disabled={locked || complete}
                    onClick={() => dispatch({ type: "COMPLETE_DAY", day: day.day })}
                    className="w-full"
                  >
                    {complete ? "Day complete" : "Complete day"}
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <MissionBriefing
        day={day}
        taskIndex={activeMission}
        open={activeMission !== null}
        onClose={() => setActiveMission(null)}
        state={state}
        dispatch={dispatch}
      />
    </motion.article>
  );
}
