import { motion } from "framer-motion";
import { Crown, Swords } from "lucide-react";
import { weeklyLeaderboard } from "../../data/roadmap";
import { Card, CardHeader } from "../ui/Card";

export function WeeklyLeaderboard({ state }) {
  const board = weeklyLeaderboard
    .map((item) => (item.name === "You" ? { ...item, score: Math.max(item.score, state.totalXP) } : item))
    .sort((a, b) => b.score - a.score);

  return (
    <Card>
      <CardHeader title="Weekly Leaderboard" eyebrow="Squad ranking" />
      <div className="space-y-2">
        {board.map((item, index) => (
          <motion.div
            key={item.name}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="flex items-center gap-3 rounded-[8px] border border-white/[0.08] bg-white/[0.035] p-3"
          >
            <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-red-500/12 text-red-100">
              {index === 0 ? <Crown size={17} /> : <Swords size={16} />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="font-black text-white">{item.name}</div>
              <div className="text-xs text-zinc-500">{item.title}</div>
            </div>
            <div className="text-right">
              <div className="font-black text-red-200">{item.score}</div>
              <div className="text-xs text-zinc-500">XP</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}
