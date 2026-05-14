import { AnimatePresence, motion } from "framer-motion";
import { Bot, CheckCircle2, Flame, Sparkles, Target, X } from "lucide-react";
import { roadmapDays } from "../../data/roadmap";
import { getMotivation, getSkillProgress, getWeeklyStats } from "../../utils/gamification";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function AiAssistantSidebar({ state, level, dispatch }) {
  const motivation = getMotivation(state);
  const weekly = getWeeklyStats(state);
  const currentDay = roadmapDays[state.currentDay - 1] ?? roadmapDays[0];
  const weakestSkill = [...getSkillProgress(state)].sort((a, b) => a.value - b.value)[0];

  const suggestions = [
    {
      icon: Target,
      title: "Next best action",
      body: `Finish Day ${currentDay.day}: ${currentDay.title}. The highest leverage move is one visible artifact.`,
    },
    {
      icon: Flame,
      title: "Momentum read",
      body: weekly.activeDays >= 5 ? "This week is strong. Protect the streak with a smaller task if energy dips." : "Your week needs more activity density. Log one task or one focus block today.",
    },
    {
      icon: Sparkles,
      title: "Skill focus",
      body: `${weakestSkill.name} is the lowest lane at ${weakestSkill.value}%. Put one quest there next.`,
    },
  ];

  return (
    <AnimatePresence>
      {state.settings?.assistantOpen ? (
        <motion.aside
          initial={{ x: 380, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 380, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 28 }}
          className="fixed bottom-3 right-3 top-20 z-30 hidden w-80 overflow-hidden rounded-[8px] border border-white/[0.12] bg-ink-950/86 shadow-neon backdrop-blur-xl xl:block"
        >
          <div className="border-b border-white/[0.08] p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-gradient-to-br from-sky-300 to-violet-400 text-ink-950">
                  <Bot size={21} />
                </div>
                <div>
                  <div className="text-sm font-black uppercase tracking-[0.2em] text-white">OS Assistant</div>
                  <div className="mt-1 text-xs text-ink-300">Tactical guidance engine</div>
                </div>
              </div>
              <Button variant="quiet" onClick={() => dispatch({ type: "TOGGLE_ASSISTANT" })} aria-label="Close assistant">
                <X size={16} />
              </Button>
            </div>
          </div>

          <div className="space-y-4 overflow-y-auto p-4">
            <div className="rounded-[8px] border border-sky-300/20 bg-sky-300/10 p-4">
              <Badge tone="sky">{level.current.rarity} Rank</Badge>
              <div className="mt-3 text-xl font-black" style={{ color: level.current.color }}>
                {level.current.name}
              </div>
              <p className="mt-2 text-sm leading-6 text-sky-50">{motivation.body}</p>
            </div>

            {suggestions.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
                  <div className="flex items-center gap-2 text-sm font-black text-white">
                    <Icon size={16} className="text-sky-300" />
                    {item.title}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-ink-300">{item.body}</p>
                </div>
              );
            })}

            <div className="rounded-[8px] border border-emerald-300/20 bg-emerald-300/10 p-4">
              <div className="flex items-center gap-2 text-sm font-black text-emerald-100">
                <CheckCircle2 size={16} />
                Today protocol
              </div>
              <div className="mt-3 space-y-2 text-sm text-emerald-50">
                {currentDay.tasks.slice(0, 3).map((task) => (
                  <div key={task}>- {task}</div>
                ))}
              </div>
            </div>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
