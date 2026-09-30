import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/reveal";

export function Cta() {
  return (
    <section className="relative isolate overflow-hidden border-t border-border">
      <div className="hero-grid hero-grid-strong pointer-events-none absolute inset-0 opacity-90" />
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="noise absolute inset-0" />
      <div className="relative mx-auto max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
        <Reveal>
          <p className="mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Next</p>
          <h2 className="mt-4 max-w-3xl font-display text-4xl tracking-tight sm:text-6xl lg:text-7xl">
            Have an ambitious idea?
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">Let's turn it into something real.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" variant="warm">
              <a href="#contact">
                Let's work together
                <ArrowRight />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline">
              <a href="#work">View My Work</a>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
