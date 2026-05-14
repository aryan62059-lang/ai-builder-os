import { FocusTimer } from "../components/productivity/FocusTimer";
import { HabitTracker } from "../components/productivity/HabitTracker";
import { TrackerBoard } from "../components/productivity/TrackerBoard";
import { Card, CardHeader } from "../components/ui/Card";

export function ProductivityPage({ state, dispatch }) {
  return (
    <div className="space-y-5">
      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <FocusTimer dispatch={dispatch} />
        <HabitTracker state={state} dispatch={dispatch} />
      </div>

      <TrackerBoard state={state} dispatch={dispatch} />

      <Card>
        <CardHeader title="Recent Sessions" eyebrow="Time log">
          Saved focus sessions are stored in localStorage and feed your weekly pulse.
        </CardHeader>
        {state.sessions.length === 0 ? (
          <div className="rounded-[8px] border border-dashed border-white/[0.12] p-6 text-center text-sm text-ink-300">
            No sessions logged yet. Start a focus block and save it here.
          </div>
        ) : (
          <div className="divide-y divide-white/[0.08]">
            {state.sessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <div className="font-semibold text-white">{session.label}</div>
                  <div className="text-xs text-ink-500">{new Date(session.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm font-black text-sky-300">{session.minutes} min</div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
