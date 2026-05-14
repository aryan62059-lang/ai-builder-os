import { Crown, Trophy } from "lucide-react";
import { achievements, rules, xpActions, xpLevels } from "../data/roadmap";
import { getAchievementStatus } from "../utils/gamification";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { RingProgress } from "../components/ui/RingProgress";

export function XpSystemPage({ state, dispatch, level }) {
  const achievementStatus = getAchievementStatus(state);
  const unlocked = achievementStatus.filter((item) => item.unlocked).length;

  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
        <Card>
          <CardHeader title="Current Level" eyebrow="Rank system" />
          <div className="flex items-center gap-5">
            <RingProgress value={level.progress} color={level.current.color} label="rank" />
            <div>
              <div className="text-4xl font-black" style={{ color: level.current.color }}>
                {state.totalXP} XP
              </div>
              <div className="mt-1 text-xl font-black text-white">{level.current.name}</div>
              <div className="mt-2 text-sm text-ink-300">
                {level.next ? `${level.next.min - state.totalXP} XP until ${level.next.name}` : "All levels unlocked"}
              </div>
            </div>
          </div>
          <Button variant="primary" className="mt-5 w-full" onClick={() => dispatch({ type: "CLAIM_DAILY_REWARD" })}>
            <Crown size={16} />
            Claim daily reward
          </Button>
        </Card>

        <Card>
          <CardHeader title="Level Roadmap" eyebrow="Progression" />
          <div className="space-y-3">
            {xpLevels.map((item) => {
              const active = state.totalXP >= item.min;
              return (
                <div key={item.name} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-3">
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="h-3 w-3 rounded-full" style={{ background: active ? item.color : "rgba(255,255,255,0.16)" }} />
                      <div className={active ? "font-black text-white" : "font-semibold text-ink-500"}>{item.name}</div>
                    </div>
                    <Badge tone={active ? "mint" : "gray"}>{item.min}-{item.max === 10000 ? "max" : item.max} XP</Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader title="XP Point Values" eyebrow="Rewards" />
          <div className="divide-y divide-white/[0.08]">
            {xpActions.map((action) => (
              <div key={action.id} className="flex items-center justify-between py-3">
                <span className="text-sm text-ink-300">{action.label}</span>
                <span className="rounded-[8px] bg-sky-300/10 px-3 py-1 text-sm font-black text-sky-200">+{action.xp} XP</span>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Achievement Completion" eyebrow="Badges" />
          <div className="mb-5 flex items-center gap-4">
            <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-amber-300 text-ink-950">
              <Trophy size={26} />
            </div>
            <div>
              <div className="text-3xl font-black text-white">{unlocked}/{achievements.length}</div>
              <div className="text-sm text-ink-300">badges unlocked</div>
            </div>
          </div>
          <ProgressBar value={(unlocked / achievements.length) * 100} barClassName="bg-amber-300" />
        </Card>
      </div>

      <Card>
        <CardHeader title="Rules to Live By" eyebrow="Operating principles" />
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {rules.map(([rule, detail]) => (
            <div key={rule} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
              <div className="font-black text-white">{rule}</div>
              <div className="mt-2 text-sm leading-6 text-ink-300">{detail}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
