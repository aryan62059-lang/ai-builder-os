import { motion } from "framer-motion";
import { cn } from "../../utils/cn";

export function ProgressBar({ value, className = "", barClassName = "bg-red-500" }) {
  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-white/[0.08]", className)}>
      <motion.div
        className={cn("h-full rounded-full", barClassName)}
        initial={{ width: 0 }}
        animate={{ width: `${Math.min(100, Math.max(0, value))}%` }}
        transition={{ duration: 0.75, ease: "easeOut" }}
      />
    </div>
  );
}
