import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Clock, ExternalLink, ShieldAlert, Terminal, Wand2, X, Zap } from "lucide-react";
import { getMissionGuide } from "../../data/roadmap";
import { cn } from "../../utils/cn";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";
import { ProgressBar } from "../ui/ProgressBar";

export function MissionBriefing({ day, taskIndex, open, onClose, state, dispatch }) {
  const task = taskIndex == null ? null : day.tasks[taskIndex];
  const guide = task ? getMissionGuide(task, day) : null;
  const missionKey = `${day.day}-${taskIndex}`;
  const stepState = state.missionProgress?.[missionKey] ?? {};
  const completedSteps = guide ? guide.steps.filter((_, index) => stepState[index]).length : 0;
  const progress = guide ? Math.round((completedSteps / guide.steps.length) * 100) : 0;
  const taskDone = Boolean(state.completedTasks?.[String(day.day)]?.[taskIndex]);
  const readyToComplete = guide && completedSteps === guide.steps.length;

  function completeMission() {
    if (!guide) return;
    if (!taskDone) {
      dispatch({ type: "COMPLETE_TASK", day: day.day, taskIndex, xp: guide.xp });
    }
  }

  return (
    <AnimatePresence>
      {open && guide ? (
        <motion.div
          className="fixed inset-0 z-[60] overflow-y-auto bg-black/78 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.section
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto my-8 max-w-5xl overflow-hidden rounded-[8px] border border-red-400/25 bg-zinc-950/94 shadow-[0_0_80px_rgba(255,23,68,0.28)]"
          >
            <div className="relative border-b border-red-400/20 p-5">
              <div className="absolute inset-x-0 top-0 h-1 bg-neon-line" />
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <Badge tone="rose">Mission Briefing</Badge>
                    <Badge tone="gray">Day {day.day}</Badge>
                    <Badge tone="amber">{guide.difficulty}</Badge>
                  </div>
                  <h2 className="neon-text text-2xl font-black tracking-tight text-white sm:text-3xl">{guide.title}</h2>
                  <p className="mt-2 max-w-3xl text-sm leading-6 text-zinc-300">{guide.objective}</p>
                </div>
                <Button variant="quiet" onClick={onClose} aria-label="Close mission briefing">
                  <X size={18} />
                </Button>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <HudMetric icon={Clock} label="Estimated Time" value={guide.estimatedTime} />
                <HudMetric icon={Zap} label="Reward" value={`+${guide.xp} XP`} />
                <HudMetric icon={CheckCircle2} label="Progress" value={`${completedSteps}/${guide.steps.length}`} />
              </div>
              <ProgressBar value={progress} className="mt-4 h-2.5" barClassName="bg-gradient-to-r from-red-700 via-red-500 to-white" />
            </div>

            <div className="grid gap-5 p-5 xl:grid-cols-[1.25fr_0.75fr]">
              <div className="space-y-5">
                <Panel title="Mission Objective" icon={Zap}>
                  <p className="text-sm leading-6 text-zinc-300">{guide.objective}</p>
                </Panel>

                <Panel title="Why This Matters" icon={Wand2}>
                  <p className="text-sm leading-6 text-zinc-300">{guide.why}</p>
                </Panel>

                <Panel title="Execution Checklist" icon={CheckCircle2}>
                  <div className="space-y-2">
                    {guide.steps.map((step, index) => {
                      const checked = Boolean(stepState[index]);
                      return (
                        <button
                          key={step}
                          onClick={() => dispatch({ type: "TOGGLE_MISSION_STEP", day: day.day, taskIndex, stepIndex: index })}
                          className={cn(
                            "focus-ring flex w-full items-start gap-3 rounded-[8px] border p-3 text-left text-sm transition",
                            checked
                              ? "border-red-400/35 bg-red-500/12 text-white shadow-[0_0_24px_rgba(255,23,68,0.16)]"
                              : "border-white/[0.08] bg-white/[0.035] text-zinc-300 hover:border-red-400/25 hover:bg-red-500/8"
                          )}
                        >
                          {checked ? (
                            <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-red-300" />
                          ) : (
                            <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full border border-zinc-600 text-[10px] text-zinc-400">
                              {index + 1}
                            </span>
                          )}
                          {step}
                        </button>
                      );
                    })}
                  </div>
                </Panel>

                <Panel title="Commands To Run" icon={Terminal}>
                  {guide.commands.length ? (
                    <div className="space-y-2">
                      {guide.commands.map((command) => (
                        <code key={command} className="block rounded-[8px] border border-red-400/15 bg-black/55 px-3 py-2 text-sm text-red-100">
                          {command}
                        </code>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-400">No terminal commands required for this mission.</p>
                  )}
                </Panel>
              </div>

              <div className="space-y-5">
                <Panel title="Required Websites / Tools" icon={ExternalLink}>
                  <div className="grid gap-2">
                    {guide.tools.map((tool) => (
                      <a
                        key={tool.url}
                        href={tool.url}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring flex items-center justify-between rounded-[8px] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-sm font-semibold text-white transition hover:border-red-400/40 hover:bg-red-500/12"
                      >
                        {tool.label}
                        <ExternalLink size={14} className="text-red-300" />
                      </a>
                    ))}
                  </div>
                </Panel>

                <Panel title="AI Guidance / Tips" icon={Wand2}>
                  <ul className="space-y-2 text-sm leading-6 text-zinc-300">
                    {guide.tips.map((tip) => (
                      <li key={tip}>- {tip}</li>
                    ))}
                  </ul>
                </Panel>

                <Panel title="Common Mistakes" icon={ShieldAlert}>
                  <ul className="space-y-2 text-sm leading-6 text-zinc-300">
                    {guide.mistakes.map((mistake) => (
                      <li key={mistake}>- {mistake}</li>
                    ))}
                  </ul>
                </Panel>

                <div className="rounded-[8px] border border-red-400/25 bg-red-500/10 p-4">
                  <Button
                    variant="primary"
                    disabled={!readyToComplete || taskDone}
                    onClick={completeMission}
                    className="w-full"
                  >
                    <CheckCircle2 size={16} />
                    {taskDone ? "Mission Complete" : readyToComplete ? "Complete Mission" : "Finish Checklist First"}
                  </Button>
                  <AnimatePresence>
                    {taskDone ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="mt-4 rounded-[8px] border border-white/15 bg-white/10 p-4 text-center"
                      >
                        <div className="text-lg font-black text-white">MISSION CLEARED</div>
                        <div className="mt-1 text-sm text-red-100">XP secured. Proof added to your builder record.</div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.section>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function HudMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.045] p-3">
      <Icon size={15} className="mb-2 text-red-300" />
      <div className="text-lg font-black text-white">{value}</div>
      <div className="text-xs uppercase tracking-[0.14em] text-zinc-500">{label}</div>
    </div>
  );
}

function Panel({ title, icon: Icon, children }) {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.035] p-4">
      <div className="mb-3 flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-red-200">
        <Icon size={15} />
        {title}
      </div>
      {children}
    </div>
  );
}
