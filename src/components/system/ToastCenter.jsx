import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, Trophy, Zap } from "lucide-react";

const iconByType = {
  xp: Zap,
  achievement: Trophy,
  streak: Sparkles,
};

export function ToastCenter({ toasts }) {
  return (
    <div className="pointer-events-none fixed right-4 top-20 z-50 flex w-[min(360px,calc(100vw-2rem))] flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => {
          const Icon = iconByType[toast.type] ?? Sparkles;
          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 26, scale: 0.96 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 18, scale: 0.96 }}
              className="rounded-[8px] border border-white/[0.12] bg-ink-950/88 p-4 shadow-neon backdrop-blur-xl"
            >
              <div className="flex gap-3">
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[8px] bg-sky-300 text-ink-950">
                  <Icon size={18} />
                </div>
                <div>
                  <div className="font-black text-white">{toast.title}</div>
                  <div className="mt-1 text-sm text-ink-300">{toast.body}</div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
