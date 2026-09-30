import { useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

export function AnimatedMetric({
  value,
  prefix,
  infinite,
  delay = 0,
}: {
  value: number;
  prefix: string;
  infinite?: boolean;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();
  const [shown, setShown] = useState(reduce || infinite ? value : 0);

  useEffect(() => {
    if (!inView || infinite || reduce) return;
    const start = performance.now();
    const duration = 900;
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start - delay * 1000) / duration);
      if (t < 0) {
        raf = requestAnimationFrame(tick);
        return;
      }
      const eased = 1 - Math.pow(1 - t, 3);
      setShown(Math.round(value * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, delay, infinite, reduce]);

  return (
    <dd ref={ref} className="mono font-display text-3xl tabular-nums tracking-tight sm:text-4xl">
      {infinite ? "∞" : `${prefix}${String(shown).padStart(prefix === "0" ? 2 : 0, "0")}`}
    </dd>
  );
}
