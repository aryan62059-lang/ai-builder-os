import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Card } from "./Card";

export function StatCard({ icon: Icon, label, value, helper, tone = "text-sky-300" }) {
  const display = useAnimatedValue(value);

  return (
    <motion.div whileHover={{ y: -3 }} transition={{ duration: 0.18 }}>
      <Card className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div className={`grid h-10 w-10 place-items-center rounded-[8px] bg-red-500/10 text-red-200 ${tone}`}>
            <Icon size={18} />
          </div>
          <ArrowUpRight size={16} className="text-ink-500" />
        </div>
        <div className="mt-4 text-2xl font-black text-white">{display}</div>
        <div className="mt-1 text-sm font-medium text-ink-300">{label}</div>
        {helper ? <div className="mt-2 text-xs text-ink-500">{helper}</div> : null}
      </Card>
    </motion.div>
  );
}

function useAnimatedValue(value) {
  const numeric = typeof value === "number" ? value : Number.parseFloat(String(value));
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!Number.isFinite(numeric) || String(value).includes("/")) {
      setDisplay(value);
      return undefined;
    }

    let frame;
    const start = performance.now();
    const from = 0;
    const suffix = String(value).replace(String(numeric), "");

    function tick(now) {
      const progress = Math.min(1, (now - start) / 700);
      setDisplay(`${Math.round(from + (numeric - from) * progress)}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
      return undefined;
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [numeric, value]);

  return display;
}
