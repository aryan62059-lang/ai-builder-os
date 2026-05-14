import { getSkillProgress } from "../../utils/gamification";
import { Card, CardHeader } from "../ui/Card";
import { ProgressBar } from "../ui/ProgressBar";

export function SkillProgress({ state }) {
  const skills = getSkillProgress(state);

  return (
    <Card>
      <CardHeader title="Skill Progress" eyebrow="Builder lanes">
        Progress is derived from completed days, sessions, and tracker actions.
      </CardHeader>
      <div className="space-y-4">
        {skills.map((skill) => (
          <div key={skill.name}>
            <div className="mb-2 flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">{skill.name}</div>
                <div className="text-xs text-ink-500">{skill.items.join(" / ")}</div>
              </div>
              <div className="text-sm font-black text-white">{skill.value}%</div>
            </div>
            <ProgressBar value={skill.value} barClassName={skill.color} />
          </div>
        ))}
      </div>
    </Card>
  );
}
