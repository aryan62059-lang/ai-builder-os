import { Flame, Skull, Trophy } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";

export function BossChallenge({ state, dispatch }) {
  const objectives = [
    { label: "Complete today's mission chain", done: Boolean(state.completedDays[state.currentDay]) },
    { label: "Log one GitHub push", done: state.tracker.githubPushes > 0 },
    { label: "Ship one visible proof asset", done: state.tracker.contentPosts > 0 || state.tracker.projectsShipped > 0 },
  ];
  const done = objectives.filter((item) => item.done).length;
  const progress = Math.round((done / objectives.length) * 100);

  return (
    <Card className="border-red-400/20">
      <CardHeader title="Boss Challenge" eyebrow="Cinematic mission">
        Defeat the weekly blocker by shipping proof, not just planning.
      </CardHeader>
      <div className="rounded-[8px] border border-red-400/25 bg-[linear-gradient(135deg,rgba(255,23,68,0.18),rgba(0,0,0,0.32))] p-4">
        <div className="flex items-center gap-3">
          <div className="grid h-14 w-14 place-items-center rounded-[8px] bg-red-600 text-white shadow-[0_0_34px_rgba(255,23,68,0.42)]">
            <Skull size={26} />
          </div>
          <div>
            <div className="text-xl font-black text-white">The Procrastination Engine</div>
            <div className="text-sm text-zinc-300">Weakness: proof-of-work streaks</div>
          </div>
        </div>
        <ProgressBar value={progress} className="mt-4 h-3" barClassName="bg-gradient-to-r from-red-700 via-red-500 to-white" />
        <div className="mt-4 space-y-2">
          {objectives.map((objective) => (
            <div key={objective.label} className="flex items-center gap-2 text-sm text-zinc-300">
              {objective.done ? <Trophy size={15} className="text-red-200" /> : <Flame size={15} className="text-zinc-600" />}
              {objective.label}
            </div>
          ))}
        </div>
        <Button
          variant="primary"
          className="mt-4 w-full"
          disabled={progress < 100}
          onClick={() => dispatch({ type: "LOG_XP", xp: 75, label: "Boss challenge cleared" })}
        >
          Claim Boss Reward +75 XP
        </Button>
      </div>
    </Card>
  );
}
