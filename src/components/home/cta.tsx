import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { SectionStage } from "@/components/ui/section-stage";
import { usePublicSiteSettings } from "@/lib/use-public-content";

export function Cta() {
  const settings = usePublicSiteSettings();
  const home = settings.home;
  return (
    <SectionStage
      id="cta"
      variant="warm"
      pad={false}
      className="py-24 sm:py-32"
      containerClassName="relative"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <DepthReveal rotate={8} y={36}>
        <TiltCard
          intensity={5}
          className="glass frame-panel max-w-3xl rounded-2xl border border-border/80 shadow-[var(--shadow-lift)]"
        >
          <div className="relative z-10 p-6 sm:p-10">
            <p className="mono section-rail text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              {home.ctaEyebrow || "Next"}
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl">
              {home.ctaTitle || "Have an ambitious idea?"}
              <span className="gradient-text-warm">.</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {home.ctaBody || "Let's turn it into something real."}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" variant="warm" className="btn-sheen">
                <a href={home.ctaPrimaryHref || "#contact"}>
                  {home.ctaPrimaryLabel || "Let's work together"}
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-sheen">
                <a href={home.ctaSecondaryHref || "#work"}>
                  {home.ctaSecondaryLabel || "View My Work"}
                </a>
              </Button>
            </div>
          </div>
        </TiltCard>
      </DepthReveal>
    </SectionStage>
  );
}
