import { Bot, BriefcaseBusiness, Code2, FileText, GitBranch, Rocket } from "lucide-react";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";

const metrics = [
  { key: "githubPushes", label: "GitHub pushes", icon: GitBranch, xp: 10 },
  { key: "jobApplications", label: "Applications", icon: BriefcaseBusiness, xp: 5 },
  { key: "contentPosts", label: "Content posts", icon: FileText, xp: 15 },
  { key: "aiToolsExplored", label: "AI tools", icon: Bot, xp: 15 },
  { key: "automationsBuilt", label: "Automations", icon: Code2, xp: 20 },
  { key: "projectsShipped", label: "Projects shipped", icon: Rocket, xp: 50 },
];

export function TrackerBoard({ state, dispatch }) {
  return (
    <Card>
      <CardHeader title="AI Builder Trackers" eyebrow="Output counters">
        Every counter is a proof signal for the 90-day transformation.
      </CardHeader>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div key={metric.key} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
              <div className="flex items-start justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-white/[0.06] text-sky-300">
                  <Icon size={18} />
                </div>
                <div className="text-2xl font-black text-white">{state.tracker[metric.key]}</div>
              </div>
              <div className="mt-3 text-sm font-semibold text-white">{metric.label}</div>
              <Button
                variant="secondary"
                className="mt-3 w-full"
                onClick={() =>
                  dispatch({
                    type: "INCREMENT_TRACKER",
                    key: metric.key,
                    xp: metric.xp,
                    label: metric.label,
                  })
                }
              >
                Add +{metric.xp} XP
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
