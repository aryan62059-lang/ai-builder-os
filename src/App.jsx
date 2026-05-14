import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { AppShell } from "./components/layout/AppShell";
import { AiAssistantSidebar } from "./components/system/AiAssistantSidebar";
import { CommandPalette } from "./components/system/CommandPalette";
import { ToastCenter } from "./components/system/ToastCenter";
import { XPGainBurst } from "./components/system/XPGainBurst";
import { LevelUpOverlay } from "./components/system/LevelUpOverlay";
import { useRoadmapProgress } from "./hooks/useRoadmapProgress";
import { DashboardPage } from "./pages/DashboardPage";
import { RoadmapPage } from "./pages/RoadmapPage";
import { ProductivityPage } from "./pages/ProductivityPage";
import { ToolsPage } from "./pages/ToolsPage";
import { CareerPage } from "./pages/CareerPage";
import { XpSystemPage } from "./pages/XpSystemPage";
import { getAchievementStatus, getLevel } from "./utils/gamification";
import { soundBus } from "./utils/soundBus";

const navItems = ["Dashboard", "Roadmap", "Productivity", "Tools", "Career", "XP System"];

export default function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [commandOpen, setCommandOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const [levelUp, setLevelUp] = useState(null);
  const [state, dispatch] = useRoadmapProgress();
  const level = useMemo(() => getLevel(state.totalXP), [state.totalXP]);
  const lastEventId = useRef(null);
  const unlockedIds = useRef(new Set());
  const achievementsInitialized = useRef(false);
  const previousLevelName = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      const isCommand = event.key.toLowerCase() === "k" && (event.ctrlKey || event.metaKey);
      if (!isCommand) return;
      event.preventDefault();
      setCommandOpen((value) => !value);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!state.lastEvent || state.lastEvent.id === lastEventId.current) return;
    lastEventId.current = state.lastEvent.id;

    if (state.lastEvent.type === "xp") {
      setToasts((items) =>
        [
          {
            id: state.lastEvent.id,
            type: "xp",
            title: `+${state.lastEvent.xp} XP gained`,
            body: state.lastEvent.label || "Builder progress logged.",
          },
          ...items,
        ].slice(0, 4)
      );
      soundBus.play("xp", state.settings?.soundEnabled);
    }

    if (state.lastEvent.type === "streak") {
      setToasts((items) =>
        [
          {
            id: state.lastEvent.id,
            type: "streak",
            title: "Streak advanced",
            body: "Momentum preserved. Your next quest is unlocked.",
          },
          ...items,
        ].slice(0, 4)
      );
      soundBus.play("streak", state.settings?.soundEnabled);
    }
  }, [state.lastEvent, state.settings?.soundEnabled]);

  useEffect(() => {
    if (!previousLevelName.current) {
      previousLevelName.current = level.current.name;
      return;
    }

    if (previousLevelName.current !== level.current.name) {
      previousLevelName.current = level.current.name;
      setLevelUp(level);
      soundBus.play("level-up", state.settings?.soundEnabled);
    }
  }, [level, state.settings?.soundEnabled]);

  useEffect(() => {
    const unlocked = getAchievementStatus(state).filter((achievement) => achievement.unlocked);
    if (!achievementsInitialized.current) {
      unlockedIds.current = new Set(unlocked.map((achievement) => achievement.id));
      achievementsInitialized.current = true;
      return;
    }

    for (const achievement of unlocked) {
      if (unlockedIds.current.has(achievement.id)) continue;
      unlockedIds.current.add(achievement.id);
      setToasts((items) =>
        [
          {
            id: `achievement-${achievement.id}-${Date.now()}`,
            type: "achievement",
            title: `${achievement.rarity} badge unlocked`,
            body: achievement.title,
          },
          ...items,
        ].slice(0, 4)
      );
      soundBus.play("achievement", state.settings?.soundEnabled);
    }
  }, [state, state.settings?.soundEnabled]);

  useEffect(() => {
    if (toasts.length === 0) return undefined;
    const timeout = window.setTimeout(() => {
      setToasts((items) => items.slice(0, -1));
    }, 3600);
    return () => window.clearTimeout(timeout);
  }, [toasts]);

  const pages = {
    Dashboard: <DashboardPage state={state} dispatch={dispatch} level={level} />,
    Roadmap: <RoadmapPage state={state} dispatch={dispatch} level={level} />,
    Productivity: <ProductivityPage state={state} dispatch={dispatch} level={level} />,
    Tools: <ToolsPage state={state} dispatch={dispatch} level={level} />,
    Career: <CareerPage state={state} dispatch={dispatch} level={level} />,
    "XP System": <XpSystemPage state={state} dispatch={dispatch} level={level} />,
  };

  return (
    <AppShell
      navItems={navItems}
      activePage={activePage}
      setActivePage={setActivePage}
      level={level}
      state={state}
      dispatch={dispatch}
      onOpenCommand={() => setCommandOpen(true)}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.18 }}
        >
          {pages[activePage]}
        </motion.div>
      </AnimatePresence>
      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        navItems={navItems}
        setActivePage={setActivePage}
        dispatch={dispatch}
        soundEnabled={Boolean(state.settings?.soundEnabled)}
      />
      <AiAssistantSidebar state={state} level={level} dispatch={dispatch} />
      <ToastCenter toasts={toasts} />
      <XPGainBurst event={state.lastEvent} />
      <LevelUpOverlay levelUp={levelUp} onDone={() => setLevelUp(null)} />
    </AppShell>
  );
}
