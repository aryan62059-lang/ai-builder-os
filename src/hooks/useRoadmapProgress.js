import { roadmapDays } from "../data/roadmap";
import { todayKey } from "../utils/gamification";
import { usePersistentReducer } from "./usePersistentReducer";

const STORAGE_KEY = "ai-builder-roadmap-state-v2";

const initialState = {
  totalXP: 0,
  streak: 0,
  currentDay: 1,
  completedTasks: {},
  missionProgress: {},
  completedDays: {},
  habitLog: {},
  activity: {},
  sessions: [],
  claimedRewards: {},
  lastEvent: null,
  settings: {
    soundEnabled: false,
    assistantOpen: true,
  },
  tracker: {
    githubPushes: 0,
    jobApplications: 0,
    contentPosts: 0,
    aiToolsExplored: 0,
    automationsBuilt: 0,
    projectsShipped: 0,
    studyMinutes: 0,
  },
};

function addActivity(state, xp, label, minutes = 0) {
  const key = todayKey();
  const existing = state.activity[key] ?? { xp: 0, labels: [], minutes: 0 };
  const event =
    xp > 0
      ? {
          id: `${Date.now()}-${Math.random()}`,
          type: "xp",
          xp,
          label,
          createdAt: Date.now(),
        }
      : null;

  return {
    ...state,
    totalXP: Math.max(0, state.totalXP + xp),
    lastEvent: event ?? state.lastEvent,
    activity: {
      ...state.activity,
      [key]: {
        xp: Math.max(0, (existing.xp || 0) + xp),
        labels: label ? [...(existing.labels || []), label].slice(-12) : existing.labels || [],
        minutes: (existing.minutes || 0) + minutes,
      },
    },
  };
}

function reducer(state, action) {
  switch (action.type) {
    case "LOG_XP": {
      const next = addActivity(state, action.xp, action.label);
      const trackerKey = action.tracker;

      if (!trackerKey) return next;

      return {
        ...next,
        tracker: {
          ...next.tracker,
          [trackerKey]: (next.tracker[trackerKey] || 0) + 1,
        },
      };
    }

    case "COMPLETE_TASK": {
      const dayKey = String(action.day);
      const current = state.completedTasks[dayKey] ?? {};
      const alreadyDone = Boolean(current[action.taskIndex]);
      const next = {
        ...state,
        completedTasks: {
          ...state.completedTasks,
          [dayKey]: {
            ...current,
            [action.taskIndex]: !alreadyDone,
          },
        },
      };

      return alreadyDone ? next : addActivity(next, action.xp ?? 5, `Day ${action.day} task`);
    }

    case "TOGGLE_MISSION_STEP": {
      const missionKey = `${action.day}-${action.taskIndex}`;
      const current = state.missionProgress[missionKey] ?? {};

      return {
        ...state,
        missionProgress: {
          ...state.missionProgress,
          [missionKey]: {
            ...current,
            [action.stepIndex]: !current[action.stepIndex],
          },
        },
      };
    }

    case "COMPLETE_DAY": {
      if (state.completedDays[action.day]) return state;

      const day = roadmapDays.find((item) => item.day === action.day);
      const next = {
        ...state,
        completedDays: {
          ...state.completedDays,
          [action.day]: true,
        },
        currentDay: Math.min(90, Math.max(state.currentDay, action.day + 1)),
      };

      return addActivity(next, day?.xp ?? 50, `Day ${action.day} complete`);
    }

    case "NEXT_DAY":
      return {
        ...state,
        currentDay: Math.min(90, state.currentDay + 1),
        streak: state.streak + 1,
        lastEvent: {
          id: `${Date.now()}-${Math.random()}`,
          type: "streak",
          xp: 0,
          label: "Day advanced",
          createdAt: Date.now(),
        },
      };

    case "CLAIM_DAILY_REWARD": {
      const key = todayKey();
      if (state.claimedRewards[key]) return state;

      const next = {
        ...state,
        streak: state.streak + 1,
        claimedRewards: {
          ...state.claimedRewards,
          [key]: true,
        },
      };

      return addActivity(next, 25, "Daily reward");
    }

    case "TOGGLE_HABIT": {
      const key = todayKey();
      const current = state.habitLog[key] ?? {};
      const wasActive = Boolean(current[action.id]);
      const next = {
        ...state,
        habitLog: {
          ...state.habitLog,
          [key]: {
            ...current,
            [action.id]: !wasActive,
          },
        },
      };

      return wasActive ? next : addActivity(next, action.xp ?? 5, action.label);
    }

    case "ADD_SESSION": {
      const minutes = Math.max(1, Math.round(action.minutes));
      const xp = Math.max(5, Math.round(minutes / 15) * 5);
      const next = {
        ...state,
        sessions: [
          {
            id: `${Date.now()}-${Math.random()}`,
            label: action.label || "Focus session",
            minutes,
            createdAt: new Date().toISOString(),
          },
          
          ...state.sessions,
        ].slice(0, 20),
        tracker: {
          ...state.tracker,
          studyMinutes: state.tracker.studyMinutes + minutes,
        },
      };

      return addActivity(next, xp, "Focus session", minutes);
    }

    case "INCREMENT_TRACKER": {
      const next = {
        ...state,
        tracker: {
          ...state.tracker,
          [action.key]: (state.tracker[action.key] || 0) + 1,
        },
      };

      return action.xp ? addActivity(next, action.xp, action.label) : next;
    }

    case "RESET_PROGRESS":
      return initialState;

    case "TOGGLE_ASSISTANT":
      return {
        ...state,
        settings: {
          ...state.settings,
          assistantOpen: !state.settings.assistantOpen,
        },
      };

    case "TOGGLE_SOUND":
      return {
        ...state,
        settings: {
          ...state.settings,
          soundEnabled: !state.settings.soundEnabled,
        },
      };

    default:
      return state;
  }
}

export function useRoadmapProgress() {
  return usePersistentReducer(reducer, initialState, STORAGE_KEY);
}
