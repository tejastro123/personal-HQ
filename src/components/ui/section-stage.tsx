import { useReducedMotion } from "motion/react";
import type { ReactNode } from "react";
import { FloatingOrbs } from "@/components/ui/depth";
import { cn } from "@/lib/utils";

/** Shared cinematic atmosphere for home sections — grid, beams, orbs, vignette. */
export function SectionAtmosphere({
  variant = "default",
  beams = true,
  grid = true,
  className,
}: {
  variant?: "default" | "warm" | "cool";
  beams?: boolean;
  grid?: boolean;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {grid ? <div className="section-grid absolute inset-0 opacity-70" /> : null}
      {beams && !reduce ? <div className="section-beam absolute inset-0" /> : null}
      {!reduce ? <FloatingOrbs variant={variant} /> : null}
      <div className="section-vignette absolute inset-0" />
    </div>
  );
}

/** Section wrapper with shared cinematic shell + content container. */
export function SectionStage({
  children,
  className,
  containerClassName,
  id,
  atmosphere = true,
  variant = "default",
  beams = true,
  grid = true,
  pad = true,
}: {
  children: ReactNode;
  className?: string;
  containerClassName?: string;
  id?: string;
  atmosphere?: boolean;
  variant?: "default" | "warm" | "cool";
  beams?: boolean;
  grid?: boolean;
  pad?: boolean;
}) {
  return (
    <section
      id={id}
      className={cn(
        "section-stage relative isolate scroll-mt-24 overflow-hidden border-t border-border",
        pad && "py-20 sm:py-28",
        className,
      )}
    >
      {atmosphere ? <SectionAtmosphere variant={variant} beams={beams} grid={grid} /> : null}
      <div className={cn("relative mx-auto max-w-6xl px-4 sm:px-6", containerClassName)}>
        {children}
      </div>
    </section>
  );
}
