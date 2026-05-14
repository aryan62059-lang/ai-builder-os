import { motion } from "framer-motion";
import { Zap } from "lucide-react";
import { getTodaysActivity } from "../../utils/gamification";
import { Badge } from "../ui/Badge";
import { ProgressBar } from "../ui/ProgressBar";

export function HeroPanel({ state, level }) {
  const today = getTodaysActivity(state);

  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-[8px] border border-red-400/20 bg-[linear-gradient(135deg,rgba(255,23,68,0.18),rgba(255,255,255,0.06)_45%,rgba(0,0,0,0.2))] p-5 shadow-[0_0_80px_rgba(255,23,68,0.2)] backdrop-blur-xl sm:p-6 lg:p-7"
    >
      <div className="absolute inset-x-0 top-0 h-px bg-neon-line" />
      <motion.div
        aria-hidden="true"
        animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.08, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-red-500/20 blur-3xl"
      />
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr] lg:items-end">
        <div className="relative">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <Badge tone="sky">AI Builder OS</Badge>
            <Badge tone="mint">Beginner to Creator</Badge>
          </div>
          <h2 className="neon-text max-w-3xl text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            AI Builder Operating System.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-ink-300 sm:text-base">
            Track XP, daily execution, proof-of-work, tools explored, job applications, and the builder habits that turn practice into leverage.
          </p>
        </div>

        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative rounded-[8px] border border-white/[0.12] bg-ink-950/56 p-4 shadow-card backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm text-ink-300">Current rank</p>
              <p className="mt-1 text-3xl font-black" style={{ color: level.current.color }}>
                {level.current.name}
              </p>
            </div>
            <div className="grid h-12 w-12 place-items-center rounded-[8px] bg-white/[0.08] text-amber-300">
              <Zap size={24} />
            </div>
          </div>
          <div className="mt-5 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">{state.totalXP} XP</span>
            <span className="text-ink-300">
              {level.next ? `${level.next.min} XP for ${level.next.name}` : "Max rank"}
            </span>
          </div>
          <ProgressBar value={level.progress} className="mt-2" barClassName="bg-gradient-to-r from-red-700 via-red-500 to-white" />
          <div className="mt-4 grid grid-cols-3 gap-2 text-center">
            <div className="rounded-[8px] bg-white/[0.06] p-3">
              <div className="text-lg font-black text-white">{state.currentDay}</div>
              <div className="text-xs text-ink-300">Day</div>
            </div>
            <div className="rounded-[8px] bg-white/[0.06] p-3">
              <div className="text-lg font-black text-white">{state.streak}</div>
              <div className="text-xs text-ink-300">Streak</div>
            </div>
            <div className="rounded-[8px] bg-white/[0.06] p-3">
              <div className="text-lg font-black text-white">{today.xp}</div>
              <div className="text-xs text-ink-300">Today XP</div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
