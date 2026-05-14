import { BarChart3, BriefcaseBusiness, Map, Timer, Trophy, Wrench } from "lucide-react";
import { cn } from "../../utils/cn";

const iconMap = {
  Dashboard: BarChart3,
  Roadmap: Map,
  Productivity: Timer,
  Tools: Wrench,
  Career: BriefcaseBusiness,
  "XP System": Trophy,
};

export function MobileNav({ navItems, activePage, setActivePage }) {
  return (
    <div className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-6 gap-1 rounded-[8px] border border-white/[0.12] bg-ink-950/95 p-1 shadow-glow backdrop-blur lg:hidden">
      {navItems.map((item) => {
        const Icon = iconMap[item] ?? BarChart3;
        const active = activePage === item;

        return (
          <button
            key={item}
            onClick={() => setActivePage(item)}
            className={cn(
              "focus-ring grid min-h-11 place-items-center rounded-[8px] transition",
              active ? "bg-white text-ink-950" : "text-ink-300"
            )}
            aria-label={item}
          >
            <Icon size={18} />
          </button>
        );
      })}
    </div>
  );
}
