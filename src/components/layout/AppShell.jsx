import { Sidebar } from "./Sidebar";
import { TopBar } from "./TopBar";
import { MobileNav } from "./MobileNav";
import { FloatingParticles } from "../system/FloatingParticles";

export function AppShell({ children, navItems, activePage, setActivePage, level, state, dispatch, onOpenCommand }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-dashboard-radial">
      <div className="cyber-grid pointer-events-none fixed inset-0 opacity-35" />
      <FloatingParticles />
      <div className="scanline pointer-events-none fixed inset-x-0 top-0 opacity-40" />
      <div className="pointer-events-none fixed left-1/4 top-0 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
      <div className="pointer-events-none fixed bottom-0 right-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
      <div className="relative flex min-h-screen">
        <Sidebar navItems={navItems} activePage={activePage} setActivePage={setActivePage} level={level} />
        <main className="min-w-0 flex-1 pb-24 lg:pb-0 xl:pr-80">
          <TopBar activePage={activePage} state={state} dispatch={dispatch} onOpenCommand={onOpenCommand} />
          <div className="mx-auto max-w-7xl px-4 py-5 lg:px-8 lg:py-8">{children}</div>
        </main>
      </div>
      <MobileNav navItems={navItems} activePage={activePage} setActivePage={setActivePage} />
    </div>
  );
}
