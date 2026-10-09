import { SectionStage } from "@/components/ui/section-stage";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { aboutBody, aboutStatement } from "@/data/content";
import { usePublicSiteSettings } from "@/lib/use-public-content";

export function About() {
  const settings = usePublicSiteSettings();
  const statement = settings.home.aboutStatement || aboutStatement;
  const paragraphs = settings.home.aboutBody
    ? settings.home.aboutBody
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean)
    : aboutBody;
  return (
    <SectionStage id="about" variant="cool">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
        <DepthReveal className="lg:col-span-5" rotate={8}>
          <div className="section-heading-hud">
            <p className="mono section-rail text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
              About
            </p>
            <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
              {statement}
            </h2>
          </div>
        </DepthReveal>
        <DepthReveal delay={0.1} className="lg:col-span-7 lg:pt-4" rotate={5}>
          <TiltCard
            intensity={4}
            glare={false}
            className="frame-panel glass-soft rounded-2xl border border-border/80 p-6 sm:p-8"
          >
            <div className="relative z-10 space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </TiltCard>
        </DepthReveal>
      </div>
    </SectionStage>
  );
}
