import { AnimatePresence, motion } from "framer-motion";
import { Bot, CalendarDays, Command, Gauge, Search, Sparkles, Volume2, X, Zap } from "lucide-react";
import { useMemo, useState } from "react";
import { xpActions } from "../../data/roadmap";
import { Button } from "../ui/Button";

export function CommandPalette({ open, onClose, navItems, setActivePage, dispatch, soundEnabled }) {
  const [query, setQuery] = useState("");

  const actions = useMemo(
    () => [
      ...navItems.map((item) => ({
        id: `page-${item}`,
        label: `Go to ${item}`,
        group: "Navigation",
        icon: Gauge,
        run: () => setActivePage(item),
      })),
      {
        id: "daily-reward",
        label: "Claim daily streak reward",
        group: "Gamification",
        icon: Sparkles,
        run: () => dispatch({ type: "CLAIM_DAILY_REWARD" }),
      },
      {
        id: "next-day",
        label: "Advance to next roadmap day",
        group: "Roadmap",
        icon: CalendarDays,
        run: () => dispatch({ type: "NEXT_DAY" }),
      },
      {
        id: "assistant",
        label: "Toggle AI assistant sidebar",
        group: "AI OS",
        icon: Bot,
        run: () => dispatch({ type: "TOGGLE_ASSISTANT" }),
      },
      {
        id: "sound",
        label: `${soundEnabled ? "Disable" : "Enable"} sound hooks`,
        group: "System",
        icon: Volume2,
        run: () => dispatch({ type: "TOGGLE_SOUND" }),
      },
      ...xpActions.slice(0, 6).map((action) => ({
        id: `xp-${action.id}`,
        label: `Log ${action.label} (+${action.xp} XP)`,
        group: "XP Quick Log",
        icon: Zap,
        run: () => dispatch({ type: "LOG_XP", xp: action.xp, label: action.label, tracker: action.tracker }),
      })),
    ],
    [dispatch, navItems, setActivePage, soundEnabled]
  );

  const filtered = actions.filter((action) => action.label.toLowerCase().includes(query.toLowerCase()));

  function run(action) {
    action.run();
    setQuery("");
    onClose();
  }

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 bg-ink-950/70 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.18 }}
            onMouseDown={(event) => event.stopPropagation()}
            className="mx-auto mt-16 max-w-2xl overflow-hidden rounded-[8px] border border-white/[0.12] bg-ink-950/92 shadow-neon"
          >
            <div className="flex items-center gap-3 border-b border-white/[0.08] px-4 py-3">
              <Search size={18} className="text-sky-300" />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search commands, XP actions, pages..."
                className="h-10 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-ink-500"
              />
              <Button variant="quiet" onClick={onClose} aria-label="Close command palette">
                <X size={17} />
              </Button>
            </div>

            <div className="max-h-[60vh] overflow-y-auto p-2">
              {filtered.map((action) => {
                const Icon = action.icon ?? Command;
                return (
                  <button
                    key={action.id}
                    onClick={() => run(action)}
                    className="focus-ring flex w-full items-center gap-3 rounded-[8px] px-3 py-3 text-left transition hover:bg-white/[0.07]"
                  >
                    <div className="grid h-9 w-9 place-items-center rounded-[8px] bg-white/[0.07] text-sky-300">
                      <Icon size={17} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="truncate text-sm font-semibold text-white">{action.label}</div>
                      <div className="text-xs text-ink-500">{action.group}</div>
                    </div>
                    <kbd className="rounded border border-white/[0.1] bg-white/[0.05] px-2 py-1 text-[11px] text-ink-300">
                      Enter
                    </kbd>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
