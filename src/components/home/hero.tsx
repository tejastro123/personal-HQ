import { Link } from "@tanstack/react-router";
import { ArrowRight, Boxes, Cpu, Sparkles, Zap } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { lazy, Suspense, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt";
import { metrics } from "@/data/content";
import { site } from "@/data/site";
import { usePublicSiteSettings } from "@/lib/use-public-content";
import { AnimatedMetric } from "@/components/home/metrics";
import { GradientHeadline } from "@/components/reveal";
import { cn } from "@/lib/utils";

const HeroScene = lazy(() => import("@/components/home/hero-scene"));

const orbitChips = [
  { icon: Cpu, label: "Systems" },
  { icon: Boxes, label: "Engineering" },
  { icon: Zap, label: "Research" },
];

export function Hero() {
  const reduce = useReducedMotion();
  const settings = usePublicSiteSettings();
  const home = settings.home;
  const stage = useRef<HTMLDivElement>(null);
  const webglRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = stage.current;
    const webgl = webglRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.setProperty("--tilt-x", `${(-py * 2.4).toFixed(2)}deg`);
      el.style.setProperty("--tilt-y", `${(px * 3.2).toFixed(2)}deg`);
      if (webgl && !reduce) {
        webgl.style.transform = `translate3d(${(px * 22).toFixed(1)}px, ${(py * 16).toFixed(1)}px, 0)`;
      }
    };
    const onLeave = () => {
      el.style.setProperty("--tilt-x", "0deg");
      el.style.setProperty("--tilt-y", "0deg");
      if (webgl && !reduce) webgl.style.transform = "translate3d(0,0,0)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [reduce]);

  return (
    <section
      id="home"
      ref={stage}
      className="relative isolate overflow-hidden scroll-mt-24 border-b border-border"
    >
      <div ref={webglRef} className="hero-webgl-layer pointer-events-none absolute inset-0">
        {!reduce ? (
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        ) : null}
      </div>

      <div className="hero-grid pointer-events-none absolute inset-0 opacity-55" />
      <div className="hero-soft-glow pointer-events-none absolute inset-0" />
      <div className="hero-beam pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-orb hero-orb-a pointer-events-none absolute" aria-hidden />
      <div className="hero-orb hero-orb-b pointer-events-none absolute" aria-hidden />
      <div className="hero-orb hero-orb-c pointer-events-none absolute" aria-hidden />
      <div className="noise absolute inset-0" />
      <div className="hero-vignette pointer-events-none absolute inset-0" />

      <div className="hero-stage relative mx-auto max-w-6xl px-4 pb-14 pt-16 sm:px-6 sm:pt-24 lg:pb-20 lg:pt-28">
        <div className="grid items-center gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-8">
          <div
            className={cn("hero-copy-3d transition-transform duration-300 ease-out")}
            style={
              reduce
                ? undefined
                : {
                    transform:
                      "perspective(1200px) rotateX(var(--tilt-x, 0deg)) rotateY(var(--tilt-y, 0deg)) translateZ(36px)",
                  }
            }
          >
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="inline-flex"
            >
              <span className="section-rail mono inline-flex items-center gap-2 rounded-full border border-border/80 bg-card/50 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.22em] text-muted-foreground backdrop-blur">
                <span className="size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" />
                {home.heroEyebrow || site.eyebrow}
              </span>
            </motion.div>

            <motion.h1
              initial={reduce ? false : { opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.75, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-3xl font-display text-[2.55rem] font-medium leading-[1.04] tracking-tight text-foreground sm:text-6xl lg:text-[4.9rem]"
            >
              <GradientHeadline
                text={home.heroHeadline || "Building ambitious ideas into real systems."}
              />
            </motion.h1>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {settings.bio || site.bio}
            </motion.p>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" className="btn-sheen pl-5 pr-4">
                <a href={home.heroCtaPrimaryHref || "#work"}>
                  {home.heroCtaPrimaryLabel || "Explore My Work"}
                  <ArrowRight />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline" className="btn-sheen">
                <a href={home.heroCtaSecondaryHref || "#contact"}>
                  {home.heroCtaSecondaryLabel || "Let's Connect"}
                </a>
              </Button>
            </motion.div>

            <motion.div
              initial={reduce ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.26 }}
              className="glass mt-7 inline-flex max-w-full flex-wrap items-center gap-3 rounded-full border border-border/80 px-4 py-2 text-sm text-muted-foreground shadow-[var(--shadow-border)] transition-transform duration-300 ease-out hover:-translate-y-0.5"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" />
                <span className="relative inline-flex size-2.5 rounded-full bg-status" />
              </span>
              <span className="text-foreground">{home.availability || site.availability}</span>
              <span className="hidden text-subtle sm:inline">/</span>
              <span className="hidden sm:inline">
                {home.availabilityDomains || site.availabilityDomains}
              </span>
            </motion.div>
          </div>

          <motion.aside
            initial={reduce ? false : { opacity: 0, x: 36, rotateY: 12 }}
            animate={{ opacity: 1, x: 0, rotateY: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="hero-hud relative mx-auto w-full max-w-md lg:mx-0"
          >
            <TiltCard intensity={7} className="hero-hud-card frame-panel">
              <div className="relative overflow-hidden rounded-[1.35rem] border border-border/70 bg-card/55 p-6 shadow-[var(--shadow-border)] backdrop-blur-xl sm:p-7">
                <div className="hero-hud-glow pointer-events-none absolute inset-0" />
                <div className="pointer-events-none absolute -right-16 -top-16 size-44 rounded-full bg-accent/20 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-20 left-0 size-40 rounded-full bg-accent-2/15 blur-3xl" />

                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p className="mono text-[10px] uppercase tracking-[0.22em] text-accent">
                      Studio console
                    </p>
                    <h2 className="mt-2 font-display text-xl tracking-tight text-foreground">
                      Live build surface
                    </h2>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      Research, systems, and interfaces — one orbit around the craft.
                    </p>
                  </div>
                  <div className="hero-orbit-glyph relative size-14 shrink-0">
                    <span className="hero-orbit-ring absolute inset-0 rounded-full border border-accent/40" />
                    <span className="hero-orbit-ring hero-orbit-ring-b absolute inset-1.5 rounded-full border border-accent-2/35" />
                    <span className="absolute inset-0 m-auto size-3 rounded-full bg-accent shadow-[0_0_16px_var(--accent)]" />
                  </div>
                </div>

                <div className="relative mt-6 grid grid-cols-3 gap-2">
                  {orbitChips.map((chip) => (
                    <div
                      key={chip.label}
                      className="flex flex-col items-center gap-2 rounded-xl border border-border/70 bg-background/40 px-2 py-3 text-center"
                    >
                      <chip.icon className="size-4 text-accent" />
                      <span className="mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                        {chip.label}
                      </span>
                    </div>
                  ))}
                </div>

                <dl className="relative mt-5 space-y-3">
                  {metrics.slice(0, 3).map((m) => (
                    <div key={m.label} className="flex items-center gap-3">
                      <dt className="w-28 shrink-0 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                        {m.label}
                      </dt>
                      <dd className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-border/80">
                        <motion.span
                          initial={reduce ? false : { width: 0 }}
                          animate={{ width: m.infinite ? "100%" : `${Math.min(100, m.value * 2.2)}%` }}
                          transition={{ duration: 1.1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
                          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-warm"
                        />
                      </dd>
                    </div>
                  ))}
                </dl>

                <div className="relative mt-6 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                  <span className="inline-flex items-center gap-2 text-xs text-subtle">
                    <Sparkles className="size-3.5 text-accent-2" />
                    Three.js depth field
                  </span>
                  <span className="mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    pointer-tracked
                  </span>
                </div>
              </div>
            </TiltCard>
          </motion.aside>
        </div>

        <motion.dl
          initial={reduce ? false : { opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="metrics-3d mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4"
        >
          {metrics.map((m, i) => (
            <TiltCard key={m.label} intensity={5} className="stat-tile frame-soft bg-card">
              <div className="relative z-10 px-5 py-5 sm:px-6 sm:py-6">
                <AnimatedMetric
                  value={m.value}
                  prefix={m.prefix}
                  infinite={m.infinite}
                  delay={i * 0.08}
                />
                <dt className="mono mt-1 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                  {m.label}
                </dt>
              </div>
            </TiltCard>
          ))}
        </motion.dl>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65, duration: 0.5 }}
          className="mt-8 flex flex-wrap items-center gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-2 text-xs text-subtle transition-colors hover:text-accent"
          >
            <span className="mono uppercase tracking-[0.18em]">Scroll to explore</span>
            <span className="flex size-6 items-center justify-center rounded-full border border-border transition-transform duration-300 group-hover:translate-y-0.5">
              <ArrowRight className="size-3 -rotate-90" />
            </span>
          </a>
          <span className="hidden items-center gap-2 text-xs text-subtle lg:inline-flex">
            <Sparkles className="size-3.5 text-accent-2" />
            Nebula field · orbiting core · energy rings
          </span>
        </motion.div>
      </div>

      <Link to="/links" className="sr-only">
        Link in bio
      </Link>
    </section>
  );
}
