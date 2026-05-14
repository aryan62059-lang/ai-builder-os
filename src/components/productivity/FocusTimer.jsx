import { Pause, Play, Square } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";

export function FocusTimer({ dispatch }) {
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [label, setLabel] = useState("Deep work block");

  useEffect(() => {
    if (!running) return undefined;
    const interval = window.setInterval(() => {
      setSeconds((value) => Math.max(0, value - 1));
    }, 1000);
    return () => window.clearInterval(interval);
  }, [running]);

  useEffect(() => {
    if (seconds === 0 && running) setRunning(false);
  }, [running, seconds]);

  const display = useMemo(() => {
    const minutes = Math.floor(seconds / 60).toString().padStart(2, "0");
    const rest = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${rest}`;
  }, [seconds]);

  function endSession() {
    const completed = 25 - seconds / 60;
    if (completed > 0.5) {
      dispatch({ type: "ADD_SESSION", minutes: completed, label });
    }
    setSeconds(25 * 60);
    setRunning(false);
  }

  return (
    <Card>
      <CardHeader title="Daily Focus Mode" eyebrow="Time tracking">
        Run a focused block, then save it as XP and tracked minutes.
      </CardHeader>
      <input
        value={label}
        onChange={(event) => setLabel(event.target.value)}
        className="focus-ring mb-4 min-h-10 w-full rounded-[8px] border border-white/[0.1] bg-ink-950/60 px-3 text-sm text-white"
      />
      <div className="grid place-items-center rounded-[8px] border border-white/[0.08] bg-white/[0.04] py-8">
        <div className="text-6xl font-black tracking-tight text-white">{display}</div>
        <div className="mt-2 text-sm text-ink-300">25-minute builder sprint</div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="primary" onClick={() => setRunning((value) => !value)}>
          {running ? <Pause size={16} /> : <Play size={16} />}
          {running ? "Pause" : "Start"}
        </Button>
        <Button variant="secondary" onClick={() => setSeconds(25 * 60)}>
          Reset
        </Button>
        <Button variant="secondary" onClick={endSession}>
          <Square size={16} />
          Save
        </Button>
      </div>
    </Card>
  );
}
