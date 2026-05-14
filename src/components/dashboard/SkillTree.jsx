import { motion } from "framer-motion";
import { Lock, Network, Sparkles } from "lucide-react";
import { getSkillProgress } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";

const tree = [
  { id: "web", name: "Web Core", skill: "Web Dev", x: "10%", y: "18%" },
  { id: "ai", name: "AI Tools", skill: "AI + Automation", x: "50%", y: "8%" },
  { id: "projects", name: "Ship Loop", skill: "Projects", x: "82%", y: "28%" },
  { id: "career", name: "Opportunity", skill: "Career", x: "26%", y: "70%" },
  { id: "content", name: "Proof Media", skill: "Content", x: "66%", y: "72%" },
];

export function SkillTree({ state }) {
  const skills = getSkillProgress(state);

  return (
    <Card className="min-h-[360px]">
      <CardHeader title="Skill Tree" eyebrow="Unlock map">
        Nodes brighten as the related builder lane gains progress.
      </CardHeader>
      <div className="relative h-72 rounded-[8px] border border-white/[0.08] bg-ink-950/40">
        <div className="absolute left-[14%] top-[28%] h-px w-[37%] rotate-[-9deg] bg-neon-line opacity-50" />
        <div className="absolute left-[52%] top-[28%] h-px w-[30%] rotate-[16deg] bg-neon-line opacity-50" />
        <div className="absolute left-[28%] top-[48%] h-px w-[24%] rotate-[48deg] bg-neon-line opacity-40" />
        <div className="absolute left-[52%] top-[47%] h-px w-[24%] rotate-[132deg] bg-neon-line opacity-40" />
        {tree.map((node, index) => {
          const progress = skills.find((skill) => skill.name === node.skill)?.value ?? 0;
          const unlocked = progress >= 20 || index === 0;
          return (
            <motion.div
              key={node.id}
              initial={{ opacity: 0, scale: 0.84 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.06 }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: node.x, top: node.y }}
            >
              <div
                className="grid h-20 w-20 place-items-center rounded-[8px] border text-center shadow-neon"
                style={{
                  borderColor: unlocked ? "rgba(56,189,248,0.45)" : "rgba(255,255,255,0.08)",
                  background: unlocked
                    ? "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(168,85,247,0.14))"
                    : "rgba(255,255,255,0.04)",
                }}
              >
                {unlocked ? <Network size={18} className="text-sky-200" /> : <Lock size={17} className="text-ink-500" />}
                <div className="px-1 text-[11px] font-black text-white">{node.name}</div>
                <div className="text-[10px] text-ink-300">{progress}%</div>
              </div>
            </motion.div>
          );
        })}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs text-ink-300">
          <Sparkles size={14} className="text-sky-300" />
          Rank nodes unlock at 20% lane progress
        </div>
      </div>
    </Card>
  );
}
