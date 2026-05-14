import { motion } from "framer-motion";
import { Crown, Shield, Sparkles } from "lucide-react";
import { Badge } from "../ui/Badge";
import { Card } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";

export function BuilderProfileCard({ state, level }) {
  const completed = Object.keys(state.completedDays).length;
  const nextLabel = level.next ? `${level.next.name} at ${level.next.min} XP` : "All ranks unlocked";

  return (
    <Card className="relative h-full p-0">
      <div className="absolute inset-x-0 top-0 h-1 bg-neon-line" />
      <div className="p-5">
        <div className="flex items-start gap-4">
          <motion.div
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="relative grid h-20 w-20 shrink-0 place-items-center rounded-[8px] border border-sky-300/30 bg-gradient-to-br from-sky-300/25 via-violet-400/20 to-emerald-300/20 shadow-neon"
          >
            <Shield size={32} className="text-sky-100" />
            <span className="absolute -right-2 -top-2 grid h-8 w-8 place-items-center rounded-full bg-amber-300 text-ink-950">
              <Crown size={16} />
            </span>
          </motion.div>
          <div className="min-w-0">
            <Badge tone="violet">{level.current.rarity}</Badge>
            <h2 className="mt-3 text-2xl font-black tracking-tight text-white">Aryan Builder</h2>
            <p className="mt-1 text-sm text-ink-300">AI Operator in training / 90-day OS</p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-3 gap-2">
          <Metric value={state.totalXP} label="XP" />
          <Metric value={completed} label="Days" />
          <Metric value={state.streak} label="Streak" />
        </div>

        <div className="mt-5">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-semibold text-white">{level.current.name}</span>
            <span className="text-ink-300">{nextLabel}</span>
          </div>
          <ProgressBar value={level.progress} barClassName="bg-gradient-to-r from-sky-300 via-violet-300 to-emerald-300" />
        </div>

        <div className="mt-5 rounded-[8px] border border-emerald-300/20 bg-emerald-300/10 p-3">
          <div className="flex items-center gap-2 text-sm font-black text-emerald-100">
            <Sparkles size={16} />
            Active perk
          </div>
          <div className="mt-1 text-sm text-emerald-50">{level.current.perk}</div>
        </div>
      </div>
    </Card>
  );
}

function Metric({ value, label }) {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.05] p-3 text-center">
      <div className="text-xl font-black text-white">{value}</div>
      <div className="text-xs text-ink-300">{label}</div>
    </div>
  );
}
