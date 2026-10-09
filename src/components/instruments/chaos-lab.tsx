import { Link } from "@tanstack/react-router";
import { Activity, Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  bifurcationSamples,
  LORENZ_PRESETS,
  lorenzStep,
  logisticOrbit,
  seedLorenz,
  type LorenzState,
} from "@/lib/chaos";

type View = "bifurcation" | "lorenz" | "logistic";

export function ChaosLabPage() {
  const [view, setView] = useState<View>("bifurcation");
  const [running, setRunning] = useState(true);
  const [r, setR] = useState(3.7);
  const [x0, setX0] = useState(0.2);
  const [lorenzId, setLorenzId] = useState(LORENZ_PRESETS[0]!.id);
  const lorenz = LORENZ_PRESETS.find((p) => p.id === lorenzId) ?? LORENZ_PRESETS[0]!;

  const bifCanvasRef = useRef<HTMLCanvasElement>(null);
  const logisticCanvasRef = useRef<HTMLCanvasElement>(null);
  const lorenzCanvasRef = useRef<HTMLCanvasElement>(null);
  const lorenzStateRef = useRef<LorenzState>(seedLorenz());
  const trailRef = useRef<{ x: number; y: number; z: number }[]>([]);
  const rafRef = useRef(0);

  const resetLorenz = useCallback(() => {
    lorenzStateRef.current = seedLorenz();
    trailRef.current = [];
  }, []);

  // Bifurcation — redraw when r-range view changes (static dense plot)
  useEffect(() => {
    const canvas = bifCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = Math.max(280, Math.floor(w * 0.55));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#08080b";
      ctx.fillRect(0, 0, w, h);

      // grid
      ctx.strokeStyle = "#1c1c22";
      ctx.lineWidth = 1;
      for (let i = 0; i <= 4; i++) {
        const y = (h * i) / 4;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      const samples = bifurcationSamples(2.5, 4, Math.floor(w), 40);
      const rMin = 2.5;
      const rMax = 4;
      for (const s of samples) {
        const px = ((s.r - rMin) / (rMax - rMin)) * w;
        const py = h - s.x * h;
        const alpha = 0.15 + 0.55 * Math.min(1, s.x);
        ctx.fillStyle = `rgba(76, 141, 255, ${alpha})`;
        ctx.fillRect(px, py, 1, 1);
      }

      // current r marker
      const mx = ((r - rMin) / (rMax - rMin)) * w;
      ctx.strokeStyle = "#fbbf24";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(mx, 0);
      ctx.lineTo(mx, h);
      ctx.stroke();
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [r]);

  // Logistic orbit + cobweb
  useEffect(() => {
    const canvas = logisticCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = parent.clientWidth;
      const h = Math.max(260, Math.floor(w * 0.7));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = "#08080b";
      ctx.fillRect(0, 0, w, h);

      const pad = 28;
      const plot = (v: number) => pad + v * (w - pad * 2);
      const plotY = (v: number) => h - pad - v * (h - pad * 2);

      // diagonal
      ctx.strokeStyle = "#2a2a32";
      ctx.beginPath();
      ctx.moveTo(plot(0), plotY(0));
      ctx.lineTo(plot(1), plotY(1));
      ctx.stroke();

      // f(x) = r x (1-x)
      ctx.strokeStyle = "#4c8dff";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      for (let i = 0; i <= 120; i++) {
        const x = i / 120;
        const y = r * x * (1 - x);
        const px = plot(x);
        const py = plotY(y);
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();

      // cobweb
      let x = x0;
      ctx.strokeStyle = "rgba(251, 191, 36, 0.75)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plot(x), plotY(0));
      for (let i = 0; i < 48; i++) {
        const y = r * x * (1 - x);
        ctx.lineTo(plot(x), plotY(y));
        ctx.lineTo(plot(y), plotY(y));
        x = y;
        if (!Number.isFinite(x)) break;
      }
      ctx.stroke();

      // orbit points
      const orbit = logisticOrbit(r, x0, 40, 20);
      ctx.fillStyle = "#22d3ee";
      for (const o of orbit) {
        if (o <= 0 || o >= 1) continue;
        ctx.beginPath();
        ctx.arc(plot(o), plotY(o), 2.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // axes labels
      ctx.fillStyle = "#71717a";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("0", pad - 4, h - 8);
      ctx.fillText("1", w - pad - 4, h - 8);
      ctx.fillText(`r=${r.toFixed(3)}`, pad, 16);
    };

    draw();
    const ro = new ResizeObserver(draw);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [r, x0]);

  // Lorenz animation
  useEffect(() => {
    if (view !== "lorenz") {
      cancelAnimationFrame(rafRef.current);
      return;
    }
    const canvas = lorenzCanvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const resize = () => {
      w = parent.clientWidth;
      h = Math.max(300, Math.floor(w * 0.65));
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const { sigma, rho, beta } = lorenz;
    const step = () => {
      if (running) {
        for (let i = 0; i < 4; i++) {
          lorenzStateRef.current = lorenzStep(lorenzStateRef.current, sigma, rho, beta, 0.006);
          const s = lorenzStateRef.current;
          if (!Number.isFinite(s.x) || Math.abs(s.x) > 1e6) {
            lorenzStateRef.current = seedLorenz();
            trailRef.current = [];
          } else {
            trailRef.current.push({ ...s });
            if (trailRef.current.length > 1800) trailRef.current.shift();
          }
        }
      }

      // Full clear each frame — a fade fill would ghost the axis labels.
      ctx.fillStyle = "#08080b";
      ctx.fillRect(0, 0, w, h);

      const trail = trailRef.current;
      if (trail.length > 1) {
        for (let i = 1; i < trail.length; i++) {
          const a = trail[i - 1]!;
          const b = trail[i]!;
          const px = (v: number) => (v + 30) * (w / 60);
          const py = (v: number) => h - (v / 50) * h;
          const t = i / trail.length;
          ctx.strokeStyle = `rgba(${Math.floor(76 + t * 175)}, ${Math.floor(141 + t * 50)}, 255, ${0.2 + t * 0.7})`;
          ctx.lineWidth = 1.1;
          ctx.beginPath();
          ctx.moveTo(px(a.x), py(a.z));
          ctx.lineTo(px(b.x), py(b.z));
          ctx.stroke();
        }
      }

      const head = trail[trail.length - 1];
      if (head) {
        const px = (v: number) => (v + 30) * (w / 60);
        const py = (v: number) => h - (v / 50) * h;
        ctx.fillStyle = "#fbbf24";
        ctx.beginPath();
        ctx.arc(px(head.x), py(head.z), 3, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.fillStyle = "#71717a";
      ctx.font = "11px ui-monospace, monospace";
      ctx.fillText("x ↔ z projection", 12, h - 12);
      ctx.fillText(`${trail.length} pts`, Math.max(12, w - 72), 18);

      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [view, running, lorenz]);

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/instruments"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Instruments
        </Link>
        <div className="mt-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Dynamics · chaos
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">Chaos Lab</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Bifurcation, cobweb, and Lorenz attractor — deterministic rules that refuse to stay
              predictable. Pure canvas, no physics engine.
            </p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {(
              [
                ["bifurcation", "Bifurcation"],
                ["logistic", "Logistic map"],
                ["lorenz", "Lorenz"],
              ] as const
            ).map(([id, label]) => (
              <button
                key={id}
                type="button"
                data-view={id}
                onClick={() => setView(id)}
                className={
                  view === id
                    ? "inline-flex h-9 items-center rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent"
                    : "inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
                }
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            {view === "bifurcation" ? (
              <>
                <div className="relative w-full overflow-hidden rounded-lg bg-[#08080b]">
                  <canvas
                    ref={bifCanvasRef}
                    data-testid="chaos-bifurcation"
                    className="block w-full"
                    aria-label="Logistic map bifurcation diagram"
                  />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Attracting values of x after burn-in, for r from 2.5 → 4. Yellow line marks the
                  r you are inspecting in the logistic view.
                </p>
              </>
            ) : null}

            {view === "logistic" ? (
              <>
                <div className="relative w-full overflow-hidden rounded-lg bg-[#08080b]">
                  <canvas
                    ref={logisticCanvasRef}
                    data-testid="chaos-logistic"
                    className="block w-full"
                    aria-label="Logistic map cobweb plot"
                  />
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Cobweb construction: horizontal to f(x), vertical to the diagonal. Cyan dots are
                  late orbit samples.
                </p>
              </>
            ) : null}

            {view === "lorenz" ? (
              <>
                <div className="relative w-full overflow-hidden rounded-lg bg-[#08080b]">
                  <canvas
                    ref={lorenzCanvasRef}
                    data-testid="chaos-lorenz"
                    className="block w-full"
                    aria-label="Lorenz attractor"
                  />
                </div>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {LORENZ_PRESETS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      data-preset={p.id}
                      onClick={() => {
                        setLorenzId(p.id);
                        resetLorenz();
                      }}
                      className={
                        lorenzId === p.id
                          ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent"
                          : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
                      }
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-muted-foreground">{lorenz.blurb}</p>
              </>
            ) : null}

            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setRunning((v) => !v)}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                {running ? "Pause" : "Run"}
              </button>
              <button
                type="button"
                onClick={resetLorenz}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                <RotateCcw className="size-3.5" />
                Reset trail
              </button>
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl tracking-tight">Controls</h2>
            <label className="mt-4 block text-xs text-muted-foreground">
              Growth rate r = {r.toFixed(3)}
              <input
                type="range"
                data-testid="chaos-r"
                min={2.5}
                max={4}
                step={0.001}
                value={r}
                onChange={(e) => setR(Number(e.target.value))}
                className="mt-1 w-full accent-accent"
              />
            </label>
            <label className="mt-3 block text-xs text-muted-foreground">
              Seed x₀ = {x0.toFixed(3)}
              <input
                type="range"
                min={0.01}
                max={0.99}
                step={0.01}
                value={x0}
                onChange={(e) => setX0(Number(e.target.value))}
                className="mt-1 w-full accent-accent"
              />
            </label>

            <dl className="mt-5 space-y-2 font-mono text-xs tabular-nums">
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Regime</dt>
                <dd>
                  {r < 3
                    ? "fixed point"
                    : r < 3.449
                      ? "period-2"
                      : r < 3.544
                        ? "period-4"
                        : r < 3.5699
                          ? "period-doubling"
                          : r < 3.8
                            ? "chaos + windows"
                            : "developed chaos"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Lorenz σ / ρ / β</dt>
                <dd>
                  {view === "lorenz"
                    ? `${lorenz.sigma} / ${lorenz.rho.toFixed(1)} / ${lorenz.beta.toFixed(2)}`
                    : "—"}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Trail</dt>
                <dd>{view === "lorenz" ? trailRef.current.length : "—"}</dd>
              </div>
            </dl>

            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Activity className="mt-0.5 size-4 shrink-0 text-accent-warm" />
              Same class of idea as walk-forward honesty in the stock tool: tiny rule changes, large
              consequences — measure the regime, don’t trust a single run.
            </p>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

export default ChaosLabPage;
