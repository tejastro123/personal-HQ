import { Link } from "@tanstack/react-router";
import { Cpu, Pause, Play, RotateCcw, Waves } from "lucide-react";
import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import {
  detectWebGpu,
  PARTICLE_PRESETS,
  spawnParticles,
  totalKinetic,
  type Particle,
  type ParticleConfig,
} from "@/lib/particles";

const ParticleScene = lazy(() => import("@/components/instruments/particle-scene"));

export function ParticleLabPage() {
  const [presetId, setPresetId] = useState(PARTICLE_PRESETS[0]!.id);
  const [config, setConfig] = useState<ParticleConfig>({ ...PARTICLE_PRESETS[0]!.config });
  const [running, setRunning] = useState(true);
  const [gpu, setGpu] = useState<"checking" | "yes" | "no">("checking");
  const [fps, setFps] = useState(0);
  const particlesRef = useRef<Particle[]>([]);
  const [, setEnergyTick] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    let cancelled = false;
    detectWebGpu().then((ok) => {
      if (!cancelled) setGpu(ok ? "yes" : "no");
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!mounted) return;
    particlesRef.current = spawnParticles(config);
  }, [config, mounted]);

  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => setEnergyTick((t) => (t + 1) % 1000), 400);
    return () => window.clearInterval(id);
  }, [running]);

  const energy = mounted ? totalKinetic(particlesRef.current) : 0;

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
              Compute · N-body
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">Particle Lab</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Central and pairwise gravity on a Three.js point cloud. CPU physics stays portable;
              WebGPU is detected and reported, never a hard dependency.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Cpu className="size-4" />
              Backend
            </span>
            <p className="mt-1 font-mono text-foreground">
              {gpu === "checking"
                ? "Detecting…"
                : gpu === "yes"
                  ? "WebGPU available · WebGL points"
                  : "CPU physics · WebGL points"}
            </p>
            {gpu === "yes" ? (
              <p className="mt-1 text-[10px] text-subtle">
                Compute path is opt-in; the point cloud renders on WebGL for reliability.
              </p>
            ) : null}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#08080b]">
              {mounted ? (
                <Suspense
                  fallback={
                    <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                      Loading renderer…
                    </div>
                  }
                >
                  <ParticleScene
                    particlesRef={particlesRef}
                    running={running}
                    config={config}
                    onFps={setFps}
                  />
                </Suspense>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                  Initializing…
                </div>
              )}
            </div>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {PARTICLE_PRESETS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  data-preset={p.id}
                  onClick={() => {
                    setPresetId(p.id);
                    setConfig({ ...p.config });
                  }}
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
            <p className="mt-2 text-[11px] text-muted-foreground">
              {PARTICLE_PRESETS.find((p) => p.id === presetId)?.blurb}
            </p>
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
                onClick={() => {
                  particlesRef.current = spawnParticles(config);
                }}
                className="inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
              >
                <RotateCcw className="size-3.5" />
                Respawn
              </button>
            </div>
          </div>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl tracking-tight">Controls</h2>
            <label className="mt-4 block text-xs text-muted-foreground">
              Mode
              <select
                value={config.mode}
                onChange={(e) =>
                  setConfig((c) => ({ ...c, mode: e.target.value as ParticleConfig["mode"] }))
                }
                className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
              >
                <option value="central">Central gravity</option>
                <option value="pairwise">Pairwise</option>
              </select>
            </label>
            <label className="mt-3 block text-xs text-muted-foreground">
              Particles {config.count}
              <input
                type="range"
                min={20}
                max={400}
                step={10}
                value={config.count}
                onChange={(e) => setConfig((c) => ({ ...c, count: Number(e.target.value) }))}
                className="mt-1 w-full accent-accent"
              />
            </label>
            <label className="mt-3 block text-xs text-muted-foreground">
              Gravity {config.gravity.toFixed(1)}
              <input
                type="range"
                min={1}
                max={120}
                step={1}
                value={config.gravity}
                onChange={(e) => setConfig((c) => ({ ...c, gravity: Number(e.target.value) }))}
                className="mt-1 w-full accent-accent"
              />
            </label>
            <label className="mt-3 block text-xs text-muted-foreground">
              Softening {config.soft.toFixed(2)}
              <input
                type="range"
                min={0.1}
                max={2}
                step={0.05}
                value={config.soft}
                onChange={(e) => setConfig((c) => ({ ...c, soft: Number(e.target.value) }))}
                className="mt-1 w-full accent-accent"
              />
            </label>
            <dl className="mt-5 space-y-2 font-mono text-xs tabular-nums">
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Particles</dt>
                <dd>{config.count}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">FPS</dt>
                <dd>{fps || "—"}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Σ KE (approx)</dt>
                <dd>{energy.toFixed(2)}</dd>
              </div>
              <div className="flex justify-between gap-3">
                <dt className="text-subtle">Backend</dt>
                <dd>
                  {gpu === "checking" ? "…" : gpu === "yes" ? "WebGPU ready" : "CPU"}
                </dd>
              </div>
            </dl>
            <p className="mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground">
              <Waves className="mt-0.5 size-4 shrink-0 text-accent-2" />
              Pairwise mode caps neighbor work so mobile stays interactive. Counts are clamped to
              400.
            </p>
          </aside>
        </div>
      </main>
    </SiteShell>
  );
}

export default ParticleLabPage;
