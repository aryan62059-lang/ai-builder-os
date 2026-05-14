import { motion } from "framer-motion";

const particles = Array.from({ length: 22 }, (_, index) => ({
  id: index,
  left: `${(index * 37) % 100}%`,
  delay: (index % 7) * 0.55,
  duration: 8 + (index % 5),
  size: 2 + (index % 4),
}));

export function FloatingParticles() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.span
          key={particle.id}
          className="absolute rounded-full bg-red-400/70 shadow-[0_0_18px_rgba(255,23,68,0.9)]"
          style={{
            left: particle.left,
            bottom: -20,
            width: particle.size,
            height: particle.size,
          }}
          animate={{ y: [0, -1100], opacity: [0, 0.8, 0], x: [0, particle.id % 2 ? 34 : -28] }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
