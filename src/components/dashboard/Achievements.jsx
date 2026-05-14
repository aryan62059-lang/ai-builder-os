import { Lock, Medal } from "lucide-react";
import { getAchievementStatus } from "../../utils/gamification";
import { rarityStyles } from "../../data/roadmap";
import { Card, CardHeader } from "../ui/Card";
import { cn } from "../../utils/cn";

export function Achievements({ state }) {
  const achievements = getAchievementStatus(state);

  return (
    <Card>
      <CardHeader title="Achievement Badges" eyebrow="Unlocks">
        Visible milestones for momentum, proof, and output.
      </CardHeader>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={cn(
              "rounded-[8px] border p-3 transition",
              achievement.unlocked
                ? "border-amber-300/30 bg-amber-300/10"
                : "border-white/[0.08] bg-white/[0.03]"
            )}
            style={{
              boxShadow: achievement.unlocked
                ? `0 0 34px ${rarityStyles[achievement.rarity]?.glow}`
                : undefined,
            }}
          >
            <div className="mb-3 flex items-center justify-between">
              <div
                className={cn(
                  "grid h-9 w-9 place-items-center rounded-[8px]",
                  achievement.unlocked ? "bg-amber-300 text-ink-950" : "bg-white/[0.06] text-ink-500"
                )}
              >
                {achievement.unlocked ? <Medal size={18} /> : <Lock size={16} />}
              </div>
              <span className={cn("text-xs font-bold", achievement.unlocked ? "text-amber-200" : "text-ink-500")}>
                {achievement.unlocked ? achievement.rarity : "LOCKED"}
              </span>
            </div>
            <div className="font-semibold text-white">{achievement.title}</div>
            <div className="mt-1 text-xs leading-5 text-ink-300">{achievement.desc}</div>
          </div>
        ))}
      </div>
    </Card>
  );
}
