import {
  BarChart3,
  BriefcaseBusiness,
  Flame,
  Gauge,
  Map,
  Timer,
  Trophy,
  Wrench,
} from "lucide-react";
import { cn } from "../../utils/cn";

const icons = {
  Dashboard: BarChart3,
  Roadmap: Map,
  Productivity: Timer,
  Tools: Wrench,
  Career: BriefcaseBusiness,
  "XP System": Trophy,
};

export function Sidebar({ navItems, activePage, setActivePage, level }) {
  return (
    <aside className="hidden min-h-screen w-72 shrink-0 border-r border-red-400/15 bg-black/74 px-4 py-5 backdrop-blur-xl lg:block">
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-11 w-11 place-items-center rounded-[8px] bg-red-600 text-white shadow-[0_0_30px_rgba(255,23,68,0.38)]">
          <Gauge size={22} />
        </div>
        <div>
          <div className="text-sm font-black uppercase tracking-[0.22em] text-white">Builder OS</div>
          <div className="text-xs text-ink-300">90-day progression</div>
        </div>
      </div>

      <nav className="mt-8 space-y-1">
        {navItems.map((item) => {
          const Icon = icons[item] ?? BarChart3;
          const isActive = activePage === item;

          return (
            <button
              key={item}
              onClick={() => setActivePage(item)}
              className={cn(
                "focus-ring flex w-full items-center gap-3 rounded-[8px] px-3 py-2.5 text-left text-sm font-semibold transition",
                isActive
                  ? "bg-red-600 text-white shadow-[0_0_28px_rgba(255,23,68,0.34)]"
                  : "text-ink-300 hover:bg-red-500/10 hover:text-white"
              )}
            >
              <Icon size={18} />
              {item}
            </button>
          );
        })}
      </nav>

      <div className="mt-8 rounded-[8px] border border-red-400/18 bg-red-500/[0.06] p-4">
        <div className="flex items-center gap-2 text-sm font-semibold text-white">
          <Flame size={16} className="text-red-300" />
          Current Rank
        </div>
        <div className="mt-3 text-2xl font-black" style={{ color: level.current.color }}>
          {level.current.name}
        </div>
        <div className="mt-1 text-xs text-ink-300">
          {level.next ? `${level.next.name} unlocks at ${level.next.min} XP` : "All ranks unlocked"}
        </div>
      </div>
    </aside>
  );
}
