import { BriefcaseBusiness, Send } from "lucide-react";
import { jobs } from "../data/roadmap";
import { Button } from "../components/ui/Button";
import { Card, CardHeader } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";

export function CareerPage({ state, dispatch }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader title="Best-Fit Roles" eyebrow="Job strategy">
            Aim for hybrid roles where operations, communication, AI tools, and web skills overlap.
          </CardHeader>
          <div className="space-y-3">
            {jobs.map((job) => (
              <div key={job.role} className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="font-black text-white">{job.role}</div>
                    <div className="mt-1 text-sm text-ink-300">{job.note}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-emerald-300">{job.match}%</div>
                    <div className="text-xs text-ink-500">{job.where}</div>
                  </div>
                </div>
                <ProgressBar value={job.match} className="mt-3" barClassName="bg-emerald-400" />
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <CardHeader title="Application Pipeline" eyebrow="Weekly target" />
          <div className="grid gap-3">
            <Metric label="Applications sent" value={state.tracker.jobApplications} />
            <Metric label="Content posts" value={state.tracker.contentPosts} />
            <Metric label="Projects shipped" value={state.tracker.projectsShipped} />
          </div>
          <Button
            variant="primary"
            className="mt-4 w-full"
            onClick={() =>
              dispatch({
                type: "INCREMENT_TRACKER",
                key: "jobApplications",
                xp: 5,
                label: "Job application",
              })
            }
          >
            <BriefcaseBusiness size={16} />
            Log application
          </Button>
        </Card>
      </div>

      <Card>
        <CardHeader title="Cold Outreach Template" eyebrow="Reusable script" />
        <div className="rounded-[8px] border border-sky-300/15 bg-sky-300/10 p-4 font-mono text-sm leading-7 text-sky-50">
          Hi [Name],
          <br />
          I noticed [Company] is doing interesting work in [area]. I am building practical web and AI automation projects over a 90-day sprint, and I also have remote operations experience.
          <br />
          <br />
          I would love to connect, learn more about your team, and share a relevant project if useful.
          <br />
          <br />
          [Your Name]
        </div>
        <Button variant="secondary" className="mt-4">
          <Send size={16} />
          Use template
        </Button>
      </Card>
    </div>
  );
}

function Metric({ label, value }) {
  return (
    <div className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4">
      <div className="text-3xl font-black text-white">{value}</div>
      <div className="mt-1 text-sm text-ink-300">{label}</div>
    </div>
  );
}
