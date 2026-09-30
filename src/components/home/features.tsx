import { Compass, Cpu, FlaskConical, Layers } from "lucide-react";
import { Reveal, SectionHeading } from "@/components/reveal";
import { features } from "@/data/content";

const icons = [FlaskConical, Layers, Cpu, Compass];

export function Features() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="From idea → system." title="How the work actually happens." />
        </Reveal>
        <div className="mt-12 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = icons[i] ?? Layers;
            return (
              <Reveal key={f.title} delay={i * 0.06} className="bg-card p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tabular-nums text-subtle">{f.number}</span>
                  <Icon className="size-4 text-accent" strokeWidth={1.6} />
                </div>
                <h3 className="mt-8 font-display text-2xl tracking-tight">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.description}</p>
                <div className="mt-8 h-px w-10 bg-accent" />
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
