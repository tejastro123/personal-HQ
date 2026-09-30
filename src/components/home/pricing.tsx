import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";
import { services } from "@/data/content";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section className="border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <SectionHeading
            eyebrow="Ways we can work together"
            title="Not a subscription. A conversation."
            subtitle="Three shapes of collaboration — from an intro to a research-grade systems engagement."
          />
        </Reveal>
        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          {services.map((s, i) => (
            <Reveal key={s.id} delay={i * 0.06}>
              <article
                className={cn(
                  "flex h-full flex-col rounded-xl border p-6 shadow-[var(--shadow-border)]",
                  s.featured
                    ? "border-foreground bg-card"
                    : "border-border bg-card",
                )}
              >
                <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {s.name}
                </p>
                <p className="mt-3 font-display text-3xl tracking-tight">{s.price}</p>
                <p className="mt-2 text-sm text-muted-foreground">{s.description}</p>
                <ul className="mt-6 flex-1 space-y-2.5">
                  {s.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {item}
                    </li>
                  ))}
                </ul>
                <Button asChild className="mt-8 w-full" variant={s.featured ? "default" : "outline"}>
                  <a href="#contact">{s.cta}</a>
                </Button>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
