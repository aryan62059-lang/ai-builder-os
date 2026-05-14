import { Activity, CalendarDays, Flame, Timer, Trophy, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { phases, roadmapDays } from "../data/roadmap";
import { getMotivation, getPhaseProgress, getTodaysActivity, getWeeklyStats } from "../utils/gamification";
import { Achievements } from "../components/dashboard/Achievements";
import { AnalyticsCharts } from "../components/dashboard/AnalyticsCharts";
import { BuilderProfileCard } from "../components/dashboard/BuilderProfileCard";
import { BossChallenge } from "../components/dashboard/BossChallenge";
import { DailyQuests } from "../components/dashboard/DailyQuests";
import { Heatmap } from "../components/dashboard/Heatmap";
import { HeroPanel } from "../components/dashboard/HeroPanel";
import { SkillTree } from "../components/dashboard/SkillTree";
import { SkillProgress } from "../components/dashboard/SkillProgress";
import { TodaysMission } from "../components/dashboard/TodaysMission";
import { WeeklyProgress } from "../components/dashboard/WeeklyProgress";
import { WeeklyLeaderboard } from "../components/dashboard/WeeklyLeaderboard";
import { XPLogger } from "../components/dashboard/XPLogger";
import { Card, CardHeader } from "../components/ui/Card";
import { ProgressBar } from "../components/ui/ProgressBar";
import { StatCard } from "../components/ui/StatCard";

export function DashboardPage({ state, dispatch, level }) {
  const today = roadmapDays[state.currentDay - 1] ?? roadmapDays[0];
  const todayActivity = getTodaysActivity(state);
  const weekly = getWeeklyStats(state);
  const motivation = getMotivation(state);

  return (
    <div className="space-y-5">
      <HeroPanel state={state} level={level} />

      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <BuilderProfileCard state={state} level={level} />
        <DailyQuests state={state} dispatch={dispatch} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_0.9fr]">
        <BossChallenge state={state} dispatch={dispatch} />
        <WeeklyLeaderboard state={state} />
      </div>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={Zap} label="Total XP" value={state.totalXP} helper={`${level.progress}% through ${level.current.name}`} />
        <StatCard icon={Flame} label="Daily streak" value={state.streak} helper="Claim daily reward to extend." tone="text-amber-300" />
        <StatCard icon={CalendarDays} label="Roadmap day" value={`${state.currentDay}/90`} helper="Locked days unlock as you progress." tone="text-emerald-300" />
        <StatCard icon={Timer} label="Week focus" value={`${Math.round(weekly.minutes / 60)}h`} helper={`${todayActivity.xp} XP logged today.`} tone="text-rose-300" />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <TodaysMission day={today} state={state} dispatch={dispatch} />
        <div className="space-y-5">
          <Card>
            <CardHeader title={motivation.title} eyebrow="Motivation engine" />
            <p className="text-sm leading-6 text-ink-300">{motivation.body}</p>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {phases.map((phase) => (
                <div key={phase.id} className="rounded-[8px] bg-white/[0.05] p-3">
                  <div className="text-xs font-semibold text-ink-300">Phase {phase.num}</div>
                  <div className="mt-1 text-lg font-black text-white">{getPhaseProgress(state, phase.id)}%</div>
                </div>
              ))}
            </div>
          </Card>
          <WeeklyProgress state={state} />
        </div>
      </div>

      <XPLogger dispatch={dispatch} />

      <div className="grid gap-5 xl:grid-cols-[0.9fr_1.1fr]">
        <SkillProgress state={state} />
        <Heatmap state={state} />
      </div>

      <div className="grid gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <SkillTree state={state} />
        <AnalyticsCharts state={state} />
      </div>

      <Card>
        <CardHeader title="90-Day Phase Progress" eyebrow="Roadmap system" />
        <div className="grid gap-3 lg:grid-cols-3">
          {phases.map((phase) => (
            <motion.div
              key={phase.id}
              whileHover={{ y: -3 }}
              className="rounded-[8px] border border-white/[0.08] bg-white/[0.04] p-4"
            >
              <div className="text-xs font-bold uppercase tracking-[0.18em]" style={{ color: phase.accent }}>
                Phase {phase.num} / Days {phase.days}
              </div>
              <div className="mt-2 text-lg font-black text-white">{phase.title}</div>
              <p className="mt-1 min-h-10 text-sm text-ink-300">{phase.subtitle}</p>
              <ProgressBar value={getPhaseProgress(state, phase.id)} className="mt-4" />
              <div className="mt-4 space-y-2">
                {phase.goals.slice(0, 3).map((goal) => (
                  <div key={goal} className="flex items-start gap-2 text-sm text-ink-300">
                    <Activity size={14} className="mt-0.5 shrink-0 text-sky-300" />
                    {goal}
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Card>

      <Achievements state={state} />
    </div>
  );
}
