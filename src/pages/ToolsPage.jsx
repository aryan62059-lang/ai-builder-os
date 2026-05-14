import { Bot, Code2, Paintbrush, Rocket, Workflow } from "lucide-react";
import { learningTracks, tools } from "../data/roadmap";
import { Card, CardHeader } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { ProgressBar } from "../components/ui/ProgressBar";
import { getSkillProgress } from "../utils/gamification";

const iconByCategory = {
  Code: Code2,
  Proof: Rocket,
  AI: Bot,
  Automation: Workflow,
  Research: Bot,
  Deploy: Rocket,
  Design: Paintbrush,
  Content: Paintbrush,
  Video: Paintbrush,
  Visuals: Paintbrush,
};

export function ToolsPage({ state }) {
  const progress = getSkillProgress(state);

  return (
    <div className="space-y-5">
      <Card>
        <CardHeader title="AI Builder Toolkit" eyebrow="Operating stack">
          Tools are grouped around code, AI, automation, content, deployment, and career proof.
        </CardHeader>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => {
            const Icon = iconByCategory[tool.category] ?? Bot;
            return (
              <div key={tool.name} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4 transition hover:-translate-y-0.5 hover:bg-white/[0.07]">
                <div className="mb-4 flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-[8px] bg-white/[0.07] text-sky-300">
                    <Icon size={19} />
                  </div>
                  <Badge tone="gray">{tool.category}</Badge>
                </div>
                <div className="font-black text-white">{tool.name}</div>
                <div className="mt-2 text-sm leading-5 text-ink-300">{tool.desc}</div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card>
        <CardHeader title="Learning Tracks" eyebrow="System map" />
        <div className="grid gap-3 lg:grid-cols-5">
          {learningTracks.map((track) => {
            const current = progress.find((item) => item.name === track.name)?.value ?? 0;
            return (
              <div key={track.name} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
                <div className="font-black text-white">{track.name}</div>
                <ProgressBar value={current} barClassName={track.color} className="mt-3" />
                <div className="mt-3 space-y-1">
                  {track.items.map((item) => (
                    <div key={item} className="text-sm text-ink-300">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
