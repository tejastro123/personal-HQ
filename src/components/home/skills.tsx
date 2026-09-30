import { Reveal, SectionHeading } from "@/components/reveal";
import { skillGroups } from "@/data/content";

export function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Capabilities"
            title="A working stack, not a scoreboard."
            subtitle="No fake proficiency bars. These are the languages and ideas in active use."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => (
            <Reveal key={group.title} delay={i * 0.04}>
              <article className="h-full rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
                <h3 className="font-display text-xl tracking-tight">{group.title}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-background px-3 py-1 text-sm text-muted-foreground"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
