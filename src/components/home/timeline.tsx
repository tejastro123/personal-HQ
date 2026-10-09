import { SectionStage } from "@/components/ui/section-stage";
import { SectionHeading } from "@/components/reveal";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { timeline } from "@/data/content";

export function Timeline() {
  return (
    <SectionStage id="timeline">
      <DepthReveal rotate={6}>
        <div className="section-heading-hud">
          <SectionHeading eyebrow="Timeline" title="Learning in public, year by year." />
        </div>
      </DepthReveal>
      <ol className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {timeline.map((item, i) => (
          <DepthReveal key={item.year} delay={i * 0.06} rotate={7 - i} className="h-full">
            <li className="h-full">
              <TiltCard
                intensity={7}
                className="frame-panel glass-soft h-full rounded-xl border border-border/80 bg-card/70"
              >
                <div className="relative z-10 flex h-full flex-col p-5 sm:p-6">
                  <span className="absolute left-0 top-0 h-full w-[2px] rounded-l-xl bg-gradient-to-b from-accent via-accent-2 to-transparent opacity-70" />
                  <p className="mono font-mono text-xs tabular-nums tracking-widest text-accent">
                    {item.year}
                  </p>
                  <h3 className="mt-3 font-display text-xl tracking-tight sm:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                  <p className="mono mt-auto pt-4 text-[11px] text-subtle">
                    {item.technologies.join(" · ")}
                    {item.projects?.length ? ` · ${item.projects.join(", ")}` : ""}
                  </p>
                </div>
              </TiltCard>
            </li>
          </DepthReveal>
        ))}
      </ol>
    </SectionStage>
  );
}
