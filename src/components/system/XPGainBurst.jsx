import { AnimatePresence, motion } from "framer-motion";

export function XPGainBurst({ event }) {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      <AnimatePresence>
        {event?.type === "xp" && event.xp > 0 ? (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 18, scale: 0.8 }}
            animate={{ opacity: [0, 1, 1, 0], y: [18, -10, -28, -62], scale: [0.8, 1.08, 1, 0.96] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.25, ease: "easeOut" }}
            className="absolute left-1/2 top-24 -translate-x-1/2 rounded-full border border-sky-300/30 bg-sky-300/15 px-6 py-3 text-2xl font-black text-sky-100 shadow-neon backdrop-blur-xl"
          >
            +{event.xp} XP
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
