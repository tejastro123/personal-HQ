import { Reveal } from "@/components/reveal";
import { aboutBody, aboutStatement } from "@/data/content";

export function About() {
  return (
    <section id="about" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground">
            About
          </p>
          <h2 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl lg:text-6xl">
            {aboutStatement}
          </h2>
        </Reveal>
        <Reveal delay={0.08} className="lg:col-span-7 lg:pt-10">
          <div className="space-y-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
            {aboutBody.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
