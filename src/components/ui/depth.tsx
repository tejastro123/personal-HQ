import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Scroll-linked 3D depth wrapper for section blocks.
 * Rotates slightly on X as it enters the viewport for a "card lifting off the page" feel.
 */
export function DepthReveal({
  children,
  className,
  delay = 0,
  rotate = 6,
  y = 28,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  rotate?: number;
  y?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.35"],
  });
  const rotateX = useTransform(scrollYProgress, [0, 1], [rotate, 0]);
  const translateY = useTransform(scrollYProgress, [0, 1], [y, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.65], [0.15, 1]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.97, 1]);

  if (reduce) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: y * 0.4 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
      style={{
        rotateX,
        y: translateY,
        opacity,
        scale,
        transformPerspective: 1000,
        transformStyle: "preserve-3d",
      }}
      className={cn("depth-reveal", className)}
    >
      {children}
    </motion.div>
  );
}

/** Decorative floating 3D orbs for section backgrounds. */
export function FloatingOrbs({
  variant = "default",
  className,
}: {
  variant?: "default" | "warm" | "cool";
  className?: string;
}) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  const tones =
    variant === "warm"
      ? ["from-accent-warm/25", "from-accent/18"]
      : variant === "cool"
        ? ["from-accent-2/22", "from-accent/16"]
        : ["from-accent/18", "from-accent-2/14"];

  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div
        className={cn(
          "section-orb section-orb-a absolute -right-10 top-10 size-56 rounded-full bg-gradient-to-br to-transparent blur-3xl sm:size-72",
          tones[0],
        )}
      />
      <div
        className={cn(
          "section-orb section-orb-b absolute -left-12 bottom-8 size-48 rounded-full bg-gradient-to-tr to-transparent blur-3xl sm:size-64",
          tones[1],
        )}
      />
      <div
        className={cn(
          "section-orb section-orb-c absolute right-1/4 bottom-16 size-32 rounded-full bg-gradient-to-b to-transparent blur-3xl sm:size-40",
          variant === "warm"
            ? "from-accent-warm/14"
            : variant === "cool"
              ? "from-accent-2/12"
              : "from-violet-400/10",
        )}
      />
    </div>
  );
}
