import { cn } from "../../utils/cn";

export function Badge({ children, tone = "sky", className = "" }) {
  const tones = {
    sky: "border-red-300/25 bg-red-500/10 text-red-100",
    violet: "border-red-300/25 bg-red-500/10 text-red-100",
    mint: "border-white/20 bg-white/10 text-white",
    amber: "border-red-300/30 bg-red-500/15 text-red-100",
    rose: "border-rose-300/20 bg-rose-300/10 text-rose-200",
    gray: "border-white/10 bg-white/[0.06] text-ink-300",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold",
        tones[tone],
        className
      )}
    >
      {children}
    </span>
  );
}
