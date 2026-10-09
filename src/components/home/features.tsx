import { Compass, Cpu, FlaskConical, Layers } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { TiltCard } from "@/components/ui/tilt";
import { features } from "@/data/content";

const icons = [FlaskConical, Layers, Cpu, Compass];

export function Features() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="From idea → system." title="How the work actually happens." />
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <Reveal key={f.title} delay={i * 0.06} className="h-full">
                <TiltCard
                  intensity={7}
                  className="frame-panel h-full rounded-xl border border-border/80 bg-card/80 p-6 sm:p-7"
                >
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-center justify-between">
                      <span className="mono font-mono text-xs tabular-nums text-subtle">
                        {f.number}
                      </span>
                      <span className="flex size-9 items-center justify-center rounded-lg border border-accent/20 bg-accent/8 text-accent">
                        <Icon className="size-4" strokeWidth={1.6} />
                      </span>
                    </div>
                    <h3 className="mt-8 font-display text-2xl tracking-tight">{f.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {f.description}
                    </p>
                    <div className="mt-8 h-px w-10 rounded bg-gradient-to-r from-accent to-transparent" />
                  </div>
                </TiltCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
