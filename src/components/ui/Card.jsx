import { cn } from "../../utils/cn";

export function Card({ className = "", children }) {
  return (
    <section className={cn("glass-panel overflow-hidden rounded-[8px] p-5 transition duration-300 hover:-translate-y-0.5 hover:shadow-neon", className)}>
      {children}
    </section>
  );
}

export function CardHeader({ eyebrow, title, action, children }) {
  return (
    <div className="mb-4 flex items-start justify-between gap-3">
      <div>
        {eyebrow ? (
          <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-base font-semibold text-white">{title}</h2>
        {children ? <p className="mt-1 text-sm text-ink-300">{children}</p> : null}
      </div>
      {action}
    </div>
  );
}
