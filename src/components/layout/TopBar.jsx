import { Bot, CalendarDays, Command, RotateCcw, Sparkles, Volume2, VolumeX } from "lucide-react";
import { Button } from "../ui/Button";
import { Badge } from "../ui/Badge";

export function TopBar({ activePage, state, dispatch, onOpenCommand }) {
  const SoundIcon = state.settings?.soundEnabled ? Volume2 : VolumeX;

  return (
    <header className="sticky top-0 z-20 border-b border-red-400/15 bg-black/66 px-4 py-3 backdrop-blur-2xl lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <Badge tone="sky">Day {state.currentDay}</Badge>
            <Badge tone="amber">{state.streak} streak</Badge>
            <Badge tone="violet">{state.totalXP} XP</Badge>
          </div>
          <h1 className="neon-text mt-2 text-xl font-black tracking-tight text-white sm:text-2xl">{activePage}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="secondary" className="hidden md:inline-flex" onClick={onOpenCommand}>
            <Command size={16} />
            Ctrl K
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "TOGGLE_ASSISTANT" })} aria-label="Toggle AI assistant">
            <Bot size={16} />
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "TOGGLE_SOUND" })} aria-label="Toggle sound hooks">
            <SoundIcon size={16} />
          </Button>
          <Button
            variant="secondary"
            className="hidden sm:inline-flex"
            onClick={() => dispatch({ type: "CLAIM_DAILY_REWARD" })}
          >
            <Sparkles size={16} />
            Daily reward
          </Button>
          <Button variant="secondary" onClick={() => dispatch({ type: "NEXT_DAY" })}>
            <CalendarDays size={16} />
            <span className="hidden sm:inline">Next day</span>
          </Button>
          <Button variant="danger" onClick={() => dispatch({ type: "RESET_PROGRESS" })} aria-label="Reset progress">
            <RotateCcw size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
}
