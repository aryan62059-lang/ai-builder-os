import { AnimatePresence, motion } from "framer-motion";
import { Crown, Shield } from "lucide-react";

export function LevelUpOverlay({ levelUp, onDone }) {
  return (
    <AnimatePresence>
      {levelUp ? (
        <motion.div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/86 p-4 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onAnimationComplete={() => {
            window.setTimeout(onDone, 1800);
          }}
        >
          <motion.div
            initial={{ scale: 0.78, y: 30, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 18 }}
            className="relative w-full max-w-xl overflow-hidden rounded-[8px] border border-red-400/35 bg-zinc-950 p-8 text-center shadow-[0_0_120px_rgba(255,23,68,0.42)]"
          >
            <div className="absolute inset-x-0 top-0 h-1 bg-neon-line" />
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              className="mx-auto grid h-28 w-28 place-items-center rounded-full border border-red-400/30 bg-red-500/15"
            >
              <Shield size={44} className="text-red-200" />
            </motion.div>
            <div className="mt-6 text-xs font-black uppercase tracking-[0.32em] text-red-200">Level Up</div>
            <h2 className="neon-text mt-3 text-4xl font-black text-white">{levelUp.current.name}</h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-300">{levelUp.current.perk}</p>
            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-black text-white">
              <Crown size={16} className="text-red-300" />
              {levelUp.current.rarity} rank unlocked
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
