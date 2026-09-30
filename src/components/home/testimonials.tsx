import { Reveal, SectionHeading } from "@/components/reveal";
import { testimonials } from "@/data/content";

export function Testimonials() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="What people say"
            title="Placeholders, on purpose."
            subtitle="Placeholder quotes until real endorsements arrive — none are claimed as genuine."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.06}>
              <figure className="flex h-full flex-col rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)]">
                <blockquote className="flex-1 text-[15px] leading-relaxed text-foreground">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-8 flex items-center gap-3">
                  <span className="flex size-10 items-center justify-center rounded-full border border-border bg-background font-display text-xs tracking-wide">
                    {t.initials}
                  </span>
                  <span>
                    <span className="block text-sm font-medium">{t.name}</span>
                    <span className="block text-xs text-muted-foreground">
                      {t.role} · {t.organization}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
