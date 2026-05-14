import { cn } from "../../utils/cn";

const variants = {
  primary:
    "bg-gradient-to-r from-red-600 via-blood-500 to-red-500 text-white hover:brightness-125 border-red-300/20 shadow-[0_0_28px_rgba(255,23,68,0.35)]",
  secondary:
    "border-white/10 bg-white/[0.07] text-white hover:border-red-400/40 hover:bg-red-500/[0.12] hover:shadow-[0_0_28px_rgba(255,23,68,0.22)]",
  quiet:
    "border-transparent bg-transparent text-ink-300 hover:bg-white/[0.06] hover:text-white",
  danger:
    "border-red-400/40 bg-red-500/10 text-red-100 hover:bg-red-500/20",
};

export function Button({ variant = "secondary", className = "", children, ...props }) {
  return (
    <button
      className={cn(
        "focus-ring inline-flex min-h-9 items-center justify-center gap-2 rounded-[8px] border px-3 text-sm font-semibold transition duration-200 disabled:cursor-not-allowed disabled:opacity-45",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
