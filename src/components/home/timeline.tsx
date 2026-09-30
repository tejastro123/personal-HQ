import { Reveal, SectionHeading } from "@/components/reveal";
import { timeline } from "@/data/content";

export function Timeline() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading eyebrow="Timeline" title="Learning in public, year by year." />
        </Reveal>
        <ol className="relative mt-14 border-l border-border pl-6 sm:pl-10">
          {timeline.map((item, i) => (
            <Reveal key={item.year} delay={i * 0.06}>
              <li className="relative pb-12 last:pb-0">
                <span className="absolute -left-[1.54rem] top-1.5 size-3 rounded-full border border-background bg-accent sm:-left-[2.54rem]" />
                <p className="font-mono text-xs tabular-nums tracking-widest text-accent">{item.year}</p>
                <h3 className="mt-2 font-display text-2xl tracking-tight">{item.title}</h3>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {item.description}
                </p>
                <p className="mt-3 text-xs text-subtle">
                  {item.technologies.join(" · ")}
                  {item.projects?.length ? ` · ${item.projects.join(", ")}` : ""}
                </p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
