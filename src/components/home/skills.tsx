import { SectionStage } from "@/components/ui/section-stage";
import { SectionHeading } from "@/components/reveal";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { skillGroups } from "@/data/content";
import { usePublicSiteSettings } from "@/lib/use-public-content";

export function Skills() {
  const settings = usePublicSiteSettings();
  const home = settings.home;
  return (
    <SectionStage id="skills" variant="cool">
      <DepthReveal rotate={5}>
        <div className="section-heading-hud">
          <SectionHeading
            eyebrow="Capabilities"
            title={home.skillsTitle || "A working stack, not a scoreboard."}
            subtitle={
              home.skillsSubtitle ||
              "No fake proficiency bars. These are the languages and ideas in active use."
            }
          />
        </div>
      </DepthReveal>
      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skillGroups.map((group, i) => (
          <DepthReveal key={group.title} delay={i * 0.05} rotate={6} className="h-full">
            <TiltCard intensity={7} className="h-full">
              <article className="skill-card frame-panel h-full rounded-xl border border-border/80 bg-card p-6 shadow-[var(--shadow-border)]">
                <div className="relative z-10 flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl tracking-tight">{group.title}</h3>
                  <span className="mono rounded-full border border-border bg-background px-2 py-0.5 text-[10px] tabular-nums text-subtle">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>
                <ul className="relative z-10 mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="chip-glow rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground transition-transform duration-300 ease-out hover:-translate-y-0.5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </TiltCard>
          </DepthReveal>
        ))}
      </div>
      <DepthReveal delay={0.1}>
        <div className="mt-10 overflow-hidden rounded-xl border border-border bg-card/60 py-3">
          <div className="marquee-track mono text-[11px] uppercase tracking-[0.18em] text-subtle">
            {[...skillGroups.flatMap((g) => g.items), ...skillGroups.flatMap((g) => g.items)].map(
              (item, idx) => (
                <span key={`${item}-${idx}`} className="whitespace-nowrap">
                  {item}
                  <span className="ml-10 text-accent/50">◆</span>
                </span>
              ),
            )}
          </div>
        </div>
      </DepthReveal>
    </SectionStage>
  );
}
