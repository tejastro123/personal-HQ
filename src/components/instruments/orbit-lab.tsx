import { Link } from "@tanstack/react-router";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  downloadCsv,
  eccentricity,
  ORBIT_PRESETS,
  orbitalEnergy,
  semiMajor,
  stepOrbit,
  type OrbitState,
} from "@/lib/orbit";

type PresetId = (typeof ORBIT_PRESETS)[number]["id"];

export function OrbitLabPage() {
  const [presetId, setPresetId] = useState<PresetId>("circular");
  const preset = ORBIT_PRESETS.find((p) => p.id === presetId) ?? ORBIT_PRESETS[0]!;
  const [running, setRunning] = useState(true);
  const [trail, setTrail] = useState<{ x: number; y: number }[]>([]);
  const stateRef = useRef<OrbitState>({ ...preset.init });
  const [readout, setReadout] = useState(() => ({
    x: preset.init.x,
    y: preset.init.y,
    energy: orbitalEnergy(preset.init, preset.params.mu ?? 100),
    ecc: eccentricity(preset.init, preset.params.mu ?? 100),
    a: semiMajor(preset.init, preset.params.mu ?? 100),
  }));
  const csvRef = useRef<(string | number)[][]>([]);

  const reset = useCallback(() => {
    const p = ORBIT_PRESETS.find((x) => x.id === presetId) ?? ORBIT_PRESETS[0]!;
    stateRef.current = { ...p.init };
    setTrail([]);
    csvRef.current = [["t", "x", "y", "vx", "vy"]];
  }, [presetId]);

  useEffect(() => {
    reset();
  }, [reset]);

  useEffect(() => {
    if (!running) return;
    let raf = 0;
    let last = performance.now();
    let acc = 0;
    const loop = (now: number) => {
      const dtReal = Math.min(40, now - last);
      last = now;
      acc += dtReal;
      const steps = Math.floor(acc / 16);
      acc -= steps * 16;
      const p = ORBIT_PRESETS.find((x) => x.id === presetId) ?? ORBIT_PRESETS[0]!;
      const mu = p.params.mu ?? 100;
      const dt = p.params.dt ?? 0.02;
      for (let i = 0; i < Math.max(1, steps); i++) {
        stateRef.current = stepOrbit(stateRef.current, {
          mu,
          dt,
          soft: p.params.soft ?? 0.35,
        });
        const s = stateRef.current;
        if (csvRef.current.length < 4000) {
          csvRef.current.push([
            (csvRef.current.length * dt).toFixed(4),
            s.x.toFixed(6),
            s.y.toFixed(6),
            s.vx.toFixed(6),
            s.vy.toFixed(6),
          ]);
        }
      }
      const s = stateRef.current;
      setReadout({
        x: s.x,
        y: s.y,
        energy: orbitalEnergy(s, mu),
        ecc: eccentricity(s, mu),
        a: semiMajor(s, mu),
      });
      setTrail((prev) => {
        const next = [...prev, { x: s.x, y: s.y }];
        return next.length > 400 ? next.slice(next.length - 400) : next;
      });
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [running, presetId]);

  const view = 36;
  const toPx = (v: number) => ((v + view) / (view * 2)) * 100;

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/instruments"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          Instruments
        </Link>
        <div className="mt-4">
          <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Physics · RK4
          </p>
          <h1 className="mt-2 font-display text-4xl tracking-tight">Orbit Lab</h1>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Two-body integrator with energy and eccentricity readouts. Same class of physics that
            keeps the world-map and space projects honest.
          </p>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-[#08080b]">
              <div
                className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm"
                title="Primary mass"
              />
              {trail.map((t, i) => (
                <span
                  key={i}
                  className="absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  style={{
                    left: `${toPx(t.x)}%`,
                    top: `${toPx(t.y)}%`,
                    opacity: 0.25 + 0.75 * (i / Math.max(1, trail.length - 1)),
                  }}
                />
              ))}
              <span
                className="absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_12px_rgba(76,141,255,0.8)]"
                style={{ left: `${toPx(readout.x)}%`, top: `${toPx(readout.y)}%` }}
              />
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {ORBIT_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  data-preset={p.id}
                  onClick={() => setPresetId(p.id)}
                  className={
                    presetId === p.id
                      ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent"
                      : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
                  }
                >
                  {p.label}
                </button>
              ))}
            </div>
            <p className="mt-2 text-[11px] text-muted-foreground">{preset.blurb}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              <button
                type="button"
                onClick={() => setRunning((r) => !r)}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                {running ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
                {running ? "Pause" : "Run"}
              </button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                <RotateCcw className="size-3.5" />
                Reset
              </button>
              <button
                type="button"
                onClick={() =>
                  downloadCsv(`orbit-${presetId}.csv`, [
                    ["t", "x", "y", "vx", "vy"],
                    ...csvRef.current.slice(1),
                  ])
                }
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                Export CSV
              </button>
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl tracking-tight">Telemetry</h2>
            <dl className="mt-4 space-y-2 font-mono text-xs tabular-nums">
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">x</dt>
                <dd>{readout.x.toFixed(3)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">y</dt>
                <dd>{readout.y.toFixed(3)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Energy E</dt>
                <dd className={readout.energy >= 0 ? "text-accent-warm" : "text-foreground"}>
                  {readout.energy.toFixed(4)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Eccentricity e</dt>
                <dd
                  className={
                    readout.ecc < 0.1
                      ? "text-[var(--status-active)]"
                      : readout.ecc < 1
                        ? "text-accent"
                        : "text-accent-warm"
                  }
                >
                  {readout.ecc.toFixed(4)}
                </dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Semi-major a</dt>
                <dd>
                  {Number.isFinite(readout.a) ? readout.a.toFixed(3) : "∞ (escape)"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              E &lt; 0 → bound orbit · e &lt; 0.1 nearly circular · E ≥ 0 → escape trajectory.
            </p>
            <p className="mt-3 text-xs text-muted-foreground">
              Related:{" "}
              <Link to="/projects/$id" params={{ id: "time-astro" }} className="text-accent underline-offset-4 hover:underline">
                TimeAstro
              </Link>
            </p>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

export default OrbitLabPage;
