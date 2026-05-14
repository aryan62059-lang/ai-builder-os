import { achievements, learningTracks, roadmapDays, xpLevels } from "../data/roadmap";

export function todayKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function getLevel(totalXP) {
  let current = xpLevels[0];
  for (const level of xpLevels) {
    if (totalXP >= level.min) current = level;
  }

  const index = xpLevels.findIndex((level) => level.name === current.name);
  const next = xpLevels[index + 1] ?? null;
  const progress = next
    ? Math.min(100, Math.round(((totalXP - current.min) / (next.min - current.min)) * 100))
    : 100;

  return { current, next, progress };
}

export function getPhaseProgress(state, phaseId) {
  const days = roadmapDays.filter((day) => {
    if (phaseId === "foundation") return day.day <= 30;
    if (phaseId === "momentum") return day.day > 30 && day.day <= 60;
    return day.day > 60;
  });

  const completed = days.filter((day) => state.completedDays[day.day]).length;
  return Math.round((completed / days.length) * 100);
}

export function getTodaysActivity(state) {
  return state.activity[todayKey()] ?? { xp: 0, labels: [], minutes: 0 };
}

export function getWeeklyStats(state) {
  const now = new Date();
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (6 - index));
    const key = todayKey(date);
    return {
      key,
      label: date.toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1),
      activity: state.activity[key] ?? { xp: 0, labels: [], minutes: 0 },
    };
  });

  const xp = days.reduce((sum, day) => sum + (day.activity.xp || 0), 0);
  const minutes = days.reduce((sum, day) => sum + (day.activity.minutes || 0), 0);
  const activeDays = days.filter((day) => (day.activity.xp || 0) > 0 || (day.activity.minutes || 0) > 0).length;

  return { days, xp, minutes, activeDays };
}

export function buildHeatmap(state, count = 42) {
  const now = new Date();
  return Array.from({ length: count }, (_, index) => {
    const date = new Date(now);
    date.setDate(now.getDate() - (count - 1 - index));
    const key = todayKey(date);
    const activity = state.activity[key] ?? { xp: 0, minutes: 0 };
    const intensity = Math.min(4, Math.floor(((activity.xp || 0) + (activity.minutes || 0) / 3) / 20));

    return {
      key,
      label: date.toLocaleDateString(undefined, { month: "short", day: "numeric" }),
      intensity,
      xp: activity.xp || 0,
      minutes: activity.minutes || 0,
    };
  });
}

export function getSkillProgress(state) {
  const completedDays = Object.keys(state.completedDays).length;
  const tracker = state.tracker;

  return learningTracks.map((track) => {
    const valueByTrack = {
      "Web Dev": completedDays * 1.2,
      "AI + Automation": tracker.aiToolsExplored * 14 + tracker.automationsBuilt * 18,
      Projects: tracker.projectsShipped * 22 + completedDays * 0.8,
      Career: tracker.jobApplications * 7,
      Content: tracker.contentPosts * 12,
    };

    return {
      ...track,
      value: Math.min(100, Math.round(valueByTrack[track.name] ?? 0)),
    };
  });
}

export function getAchievementStatus(state) {
  return achievements.map((achievement) => ({
    ...achievement,
    unlocked: achievement.test(state),
  }));
}

export function getMotivation(state) {
  const { current } = getLevel(state.totalXP);
  const completedCount = Object.keys(state.completedDays).length;

  if (state.streak >= 7) {
    return {
      title: "Momentum is working",
      body: "You are stacking proof now. Keep the next action small and visible.",
    };
  }

  if (completedCount === 0) {
    return {
      title: "Start the chain",
      body: "One checked task is enough to turn the dashboard from plan into evidence.",
    };
  }

  if (current.name === "Beginner") {
    return {
      title: "Builder rank is close",
      body: "The first 300 XP is not about mastery. It is about becoming consistent.",
    };
  }

  return {
    title: `${current.name} mode active`,
    body: "Keep shipping, logging, and packaging proof. That loop is the product.",
  };
}
