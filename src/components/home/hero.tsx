import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { metrics } from "@/data/content";
import { site } from "@/data/site";
import { AnimatedMetric } from "@/components/home/metrics";

const HeroWebGL = lazy(() => import("@/components/home/hero-webgl"));

const labels = ["Qubits", "Tensors", "Fields", "Systems", "Signals", "Models"];

type Star = { x: number; y: number; r: number; a: number; vx: number; vy: number };

function useHeroWebGL(reduce: boolean) {
  const [enabled, setEnabled] = useState(false);
  useEffect(() => {
    if (reduce) return;
    const mq = window.matchMedia("(min-width: 900px) and (prefers-reduced-motion: no-preference)");
    const apply = () => setEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [reduce]);
  return enabled;
}

export function Hero() {
  const reduce = useReducedMotion();
  const stage = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const webgl = useHeroWebGL(!!reduce);

  useEffect(() => {
    const el = stage.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - r.left}px`);
      el.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    el.addEventListener("pointermove", onMove);
    return () => el.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reduce) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((width * height) / 18000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.3,
        a: Math.random() * 0.5 + 0.15,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const s of stars) {
        s.x += s.vx;
        s.y += s.vy;
        if (s.x < 0) s.x = width;
        if (s.x > width) s.x = 0;
        if (s.y < 0) s.y = height;
        if (s.y > height) s.y = 0;
        ctx.beginPath();
        ctx.fillStyle = `rgba(148, 197, 255, ${s.a})`;
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fill();
      }
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const a = stars[i];
          const b = stars[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist > 110) continue;
          ctx.strokeStyle = `rgba(76, 141, 255, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, [reduce]);

  return (
    <section id="home" ref={stage} className="relative isolate overflow-hidden scroll-mt-24">
      <div className="hero-grid hero-grid-strong pointer-events-none absolute inset-0" />
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="noise absolute inset-0" />
      {webgl ? (
        <Suspense fallback={null}>
          <HeroWebGL />
        </Suspense>
      ) : null}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full opacity-55" />
      {!reduce
        ? labels.map((label, i) => (
            <span
              key={label}
              className="mono pointer-events-none absolute hidden text-[11px] tracking-[0.18em] text-subtle uppercase md:block"
              style={{
                top: `${18 + (i % 3) * 22}%`,
                left: i % 2 === 0 ? "8%" : "auto",
                right: i % 2 === 1 ? "7%" : "auto",
                animation: `floaty ${8 + i}s ease-in-out ${i * 0.4}s infinite`,
              }}
            >
              {label}
            </span>
          ))
        : null}
      <div className="relative mx-auto max-w-6xl px-4 pb-16 pt-16 sm:px-6 sm:pt-24 lg:pb-24 lg:pt-28">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mono text-[11px] font-medium uppercase tracking-[0.26em] text-muted-foreground"
        >
          {site.eyebrow}
        </motion.p>
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 16, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-4xl font-display text-[2.4rem] font-medium leading-[1.05] tracking-tight text-foreground sm:text-6xl lg:text-[5.1rem]"
        >
          Building ambitious ideas into real systems.
        </motion.h1>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.12 }}
          className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {site.bio}
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.18 }}
          className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Button asChild size="lg" className="pl-5 pr-4">
            <a href="#work">
              Explore My Work
              <ArrowRight />
            </a>
          </Button>
          <Button asChild size="lg" variant="outline">
            <a href="#contact">Let's Connect</a>
          </Button>
        </motion.div>
        <div className="mt-8 flex items-center gap-3 text-sm text-muted-foreground">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" />
            <span className="relative inline-flex size-2.5 rounded-full bg-status" />
          </span>
          <span>{site.availability}</span>
          <span className="hidden text-subtle sm:inline">/</span>
          <span className="hidden sm:inline">{site.availabilityDomains}</span>
        </div>
        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-4">
          {metrics.map((m, i) => (
            <div key={m.label} className="bg-card px-5 py-5 sm:px-6 sm:py-6">
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
          ))}
        </dl>
      </div>
      <style>{`
        @keyframes floaty {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-10px); opacity: 0.7; }
        }
      `}</style>
      <Link to="/links" className="sr-only">
        Link in bio
      </Link>
    </section>
  );
}
