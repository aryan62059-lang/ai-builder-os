import { Plus } from "lucide-react";
import { useState } from "react";
import { xpActions } from "../../data/roadmap";
import { Button } from "../ui/Button";
import { Card, CardHeader } from "../ui/Card";

export function XPLogger({ dispatch }) {
  const [customXP, setCustomXP] = useState("");

  function addCustom() {
    const xp = Number(customXP);
    if (!Number.isFinite(xp) || xp === 0) return;
    dispatch({ type: "LOG_XP", xp, label: "Custom XP" });
    setCustomXP("");
  }

  return (
    <Card>
      <CardHeader title="Log Today's XP" eyebrow="Progress input">
        Quick actions update XP, activity heatmap, and related builder trackers.
      </CardHeader>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {xpActions.map((action) => (
          <button
            key={action.id}
            onClick={() =>
              dispatch({
                type: "LOG_XP",
                xp: action.xp,
                label: action.label,
                tracker: action.tracker,
              })
            }
            className="focus-ring flex items-center justify-between rounded-[8px] border border-white/[0.08] bg-white/[0.04] px-3 py-2 text-left text-sm text-ink-300 transition hover:bg-white/[0.08] hover:text-white"
          >
            <span>{action.label}</span>
            <span className="font-black text-sky-300">+{action.xp}</span>
          </button>
        ))}
      </div>

      <div className="mt-4 flex flex-col gap-2 sm:flex-row">
        <input
          value={customXP}
          onChange={(event) => setCustomXP(event.target.value)}
          type="number"
          placeholder="Custom XP"
          className="focus-ring min-h-10 flex-1 rounded-[8px] border border-white/[0.1] bg-ink-950/60 px-3 text-sm text-white placeholder:text-ink-500"
        />
        <Button variant="primary" onClick={addCustom}>
          <Plus size={16} />
          Add XP
        </Button>
      </div>
    </Card>
  );
}
