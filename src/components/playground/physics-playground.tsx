import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import { Physics, RigidBody, type RapierRigidBody } from "@react-three/rapier";
import { RigidBodyType } from "@dimforge/rapier3d-compat";
import { Link } from "@tanstack/react-router";
import {
  Box,
  Circle,
  Cylinder,
  Pause,
  Play,
  RotateCcw,
  Trash2,
} from "lucide-react";
import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import * as THREE from "three";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { site } from "@/data/site";
import {
  deleteExperiment,
  downloadExperimentCsv,
  loadExperiments,
  saveExperiment,
  type ExperimentSample,
  type SavedExperiment,
} from "@/data/experiments";

type Shape = "sphere" | "box" | "cylinder" | "capsule";

type BodySpec = {
  id: number;
  shape: Shape;
  position: [number, number, number];
};

type PresetId = "earth" | "zero-g" | "magnet" | "pendulum" | "custom";

const PRESETS: Record<
  PresetId,
  { label: string; gravity: number; restitution: number; blurb: string }
> = {
  earth: {
    label: "Earth",
    gravity: 9.81,
    restitution: 0.65,
    blurb: "Standard surface gravity — bouncy enough to read energy loss on impact.",
  },
  "zero-g": {
    label: "Zero-g",
    gravity: 0,
    restitution: 0.95,
    blurb: "No gravity. Bodies drift and keep almost all kinetic energy on hits.",
  },
  magnet: {
    label: "Magnet",
    gravity: 3.2,
    restitution: 0.12,
    blurb: "Heavy pull, dead collisions — sticky landings, quick settle.",
  },
  pendulum: {
    label: "Pendulum",
    gravity: 4.5,
    restitution: 0.04,
    blurb: "Soft gravity, inelastic floor — motion dies fast into a calm rest.",
  },
  custom: {
    label: "Custom",
    gravity: 9.81,
    restitution: 0.65,
    blurb: "You set g and restitution. URL keeps the experiment shareable.",
  },
};

const PRESET_ORDER: PresetId[] = ["earth", "zero-g", "magnet", "pendulum"];

function readPresetFromUrl(): PresetId {
  if (typeof window === "undefined") return "earth";
  const raw = new URLSearchParams(window.location.search).get("preset");
  return raw && raw in PRESETS && raw !== "custom" ? (raw as PresetId) : "earth";
}

function writePresetToUrl(preset: PresetId, gravity: number, restitution: number) {
  if (typeof window === "undefined") return;
  const params = new URLSearchParams(window.location.search);
  if (preset === "custom") {
    params.set("preset", "custom");
    params.set("g", gravity.toFixed(2));
    params.set("r", restitution.toFixed(2));
  } else if (PRESETS[preset]) {
    params.set("preset", preset);
    params.delete("g");
    params.delete("r");
  }
  const q = params.toString();
  window.history.replaceState(null, "", q ? `${window.location.pathname}?${q}` : window.location.pathname);
}

function readGravityFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("g");
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? Math.max(-12, Math.min(30, n)) : null;
}

function readRestitutionFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("r");
  const n = raw ? Number(raw) : NaN;
  return Number.isFinite(n) ? Math.max(0, Math.min(1, n)) : null;
}

let nextId = 1;

function randomBody(shape: Shape): BodySpec {
  return {
    id: nextId++,
    shape,
    position: [
      (Math.random() - 0.5) * 4,
      3.5 + Math.random() * 2.5,
      (Math.random() - 0.5) * 4,
    ],
  };
}

export default function PhysicsPlayground() {
  const [preset, setPreset] = useState<PresetId>(() => {
    if (typeof window === "undefined") return "earth";
    const fromUrl = readPresetFromUrl();
    const g = readGravityFromUrl();
    const r = readRestitutionFromUrl();
    if (fromUrl !== "earth" || g !== null || r !== null) return fromUrl === "earth" && g !== null ? "custom" : fromUrl;
    return "earth";
  });
  const [gravity, setGravity] = useState(() => {
    const g = readGravityFromUrl();
    if (g !== null) return g;
    const p = readPresetFromUrl();
    return PRESETS[p === "custom" ? "earth" : p].gravity;
  });
  const [restitution, setRestitution] = useState(() => {
    const r = readRestitutionFromUrl();
    if (r !== null) return r;
    const p = readPresetFromUrl();
    return PRESETS[p === "custom" ? "earth" : p].restitution;
  });
  const [paused, setPaused] = useState(false);
  const [bodies, setBodies] = useState<BodySpec[]>(() => [
    randomBody("sphere"),
    randomBody("box"),
    randomBody("cylinder"),
  ]);
  const [fps, setFps] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [journalOpen, setJournalOpen] = useState(false);
  const [experiments, setExperiments] = useState<SavedExperiment[]>([]);
  const samplesRef = useRef<ExperimentSample[]>([]);
  const startedAtRef = useRef<number>(0);
  const isMobile = useIsMobile();
  const cap = isMobile ? 24 : 48;

  useEffect(() => {
    setExperiments(loadExperiments());
  }, []);

  useEffect(() => {
    if (!startedAtRef.current) startedAtRef.current = performance.now();
    const id = window.setInterval(() => {
      if (paused) return;
      samplesRef.current.push({
        tMs: Math.round(performance.now() - startedAtRef.current),
        objects: bodies.length,
        fps,
        gravity,
        restitution,
        paused: 0,
      });
      if (samplesRef.current.length > 2000) samplesRef.current.shift();
    }, 250);
    return () => window.clearInterval(id);
  }, [paused, bodies.length, fps, gravity, restitution]);

  const saveExperimentNow = useCallback(() => {
    const samples = samplesRef.current.slice();
    if (!samples.length) return;
    const exp: SavedExperiment = {
      id: `exp-${Date.now()}`,
      name: `${preset}-${Math.round(gravity)}g-${samples.length}samp`,
      preset,
      gravity,
      restitution,
      createdAt: new Date().toISOString(),
      samples,
    };
    setExperiments(saveExperiment(exp));
    samplesRef.current = [];
    startedAtRef.current = performance.now();
  }, [preset, gravity, restitution]);

  useEffect(() => {
    writePresetToUrl(preset, gravity, restitution);
  }, [preset, gravity, restitution]);

  const applyPreset = useCallback((id: PresetId) => {
    const p = PRESETS[id];
    if (!p || id === "custom") return;
    setPreset(id);
    setGravity(p.gravity);
    setRestitution(p.restitution);
    setPaused(false);
    setBodies([randomBody("sphere"), randomBody("box"), randomBody("cylinder")]);
  }, []);

  const onGravity = useCallback((n: number) => {
    setGravity(n);
    setPreset("custom");
  }, []);

  const onRestitution = useCallback((n: number) => {
    setRestitution(n);
    setPreset("custom");
  }, []);

  const spawn = useCallback(
    (shape: Shape) => {
      setBodies((list) => (list.length >= cap ? list : [...list, randomBody(shape)]));
    },
    [cap],
  );

  const clear = useCallback(() => setBodies([]), []);
  const reset = useCallback(() => {
    nextId = 1;
    applyPreset("earth");
  }, [applyPreset]);

  return (
    <div className="relative h-dvh overflow-hidden bg-background text-foreground">
      <div className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between p-3 sm:p-4">
        <div className="pointer-events-auto flex items-center justify-between gap-3">
          <div>
            <Link to="/" className="font-display text-xs font-semibold tracking-[0.18em]">
              {site.name.toUpperCase()}
            </Link>
            <h1 className="mt-1 font-display text-xl tracking-tight sm:text-2xl">
              Physics Playground
            </h1>
            <p className="max-w-md text-xs text-muted-foreground sm:text-sm">
              Drop objects. Break things. Learn how the system behaves.
            </p>
          </div>
          <div className="pointer-events-auto flex items-center gap-1">
            <ThemeToggle />
            <Button
              size="sm"
              variant="outline"
              onClick={() => setJournalOpen((v) => !v)}
              data-testid="journal-toggle"
            >
              Journal
            </Button>
            <Button asChild size="sm" variant="outline">
              <Link to="/">Home</Link>
            </Button>
          </div>
        </div>

        <div className="pointer-events-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <Toolbar
            paused={paused}
            preset={preset}
            onPreset={applyPreset}
            onSpawn={spawn}
            onClear={clear}
            onReset={reset}
            onTogglePause={() => setPaused((p) => !p)}
            gravity={gravity}
            restitution={restitution}
            onGravity={onGravity}
            onRestitution={onRestitution}
          />
          <Stats
            objects={bodies.length}
            fps={fps}
            gravity={gravity}
            restitution={restitution}
            paused={paused}
            preset={preset}
          />
        </div>
        {journalOpen ? (
          <ExperimentJournal
            samples={samplesRef.current.length}
            experiments={experiments}
            onSave={saveExperimentNow}
            onDelete={(id) => setExperiments(deleteExperiment(id))}
            onExport={(exp) => downloadExperimentCsv(exp)}
            onClearSamples={() => {
              samplesRef.current = [];
              startedAtRef.current = performance.now();
            }}
          />
        ) : null}
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-10 hidden justify-between px-8 text-[10px] uppercase tracking-[0.18em] text-subtle md:flex">
        <span>Gravity</span>
        <span>Collision</span>
      </div>

      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? [1, 1.25] : [1, 1.75]}
        camera={{ position: [7.5, 6.5, 9], fov: 45 }}
        gl={{ antialias: !isMobile, powerPreference: "high-performance" }}
        onCreated={({ gl }) => {
          gl.shadowMap.type = THREE.PCFShadowMap;
        }}
      >
        <color attach="background" args={["#050505"]} />
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[8, 12, 6]}
          intensity={1.15}
          castShadow={!isMobile}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <Suspense fallback={null}>
          <Physics gravity={[0, -gravity, 0]} paused={paused} interpolate>
            <Ground restitution={restitution} />
            {bodies.map((b) => (
              <PlayBody
                key={b.id}
                spec={b}
                restitution={restitution}
                onDrag={setDragging}
              />
            ))}
          </Physics>
        </Suspense>
        <Grid
          args={[24, 24]}
          cellSize={1}
          cellThickness={0.6}
          sectionSize={4}
          sectionThickness={1}
          fadeDistance={28}
          cellColor="#2a2a32"
          sectionColor="#3a3a44"
          position={[0, 0.02, 0]}
        />
        <OrbitControls
          enabled={!dragging}
          makeDefault
          minDistance={4}
          maxDistance={28}
          maxPolarAngle={Math.PI / 2.05}
          enableDamping
        />
        <FpsReporter onFps={setFps} />
      </Canvas>
    </div>
  );
}

function Ground({ restitution }: { restitution: number }) {
  return (
    <RigidBody type="fixed" restitution={restitution} friction={0.9} colliders="cuboid">
      <mesh receiveShadow position={[0, -0.25, 0]}>
        <boxGeometry args={[40, 0.5, 40]} />
        <meshStandardMaterial color="#111114" roughness={0.92} metalness={0.05} />
      </mesh>
    </RigidBody>
  );
}

function PlayBody({
  spec,
  restitution,
  onDrag,
}: {
  spec: BodySpec;
  restitution: number;
  onDrag: (v: boolean) => void;
}) {
  const body = useRef<RapierRigidBody>(null);
  const dragging = useRef(false);
  const last = useRef(new THREE.Vector3());
  const vel = useRef(new THREE.Vector3());
  const { camera, gl } = useThree();
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 1, 0), 0), []);
  const raycaster = useMemo(() => new THREE.Raycaster(), []);
  const pointer = useMemo(() => new THREE.Vector2(), []);
  const hit = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragging.current || !body.current) return;
      const rect = gl.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      plane.constant = -last.current.y;
      if (raycaster.ray.intersectPlane(plane, hit)) {
        vel.current.copy(hit).sub(last.current);
        last.current.copy(hit);
        body.current.setNextKinematicTranslation({
          x: hit.x,
          y: Math.max(0.4, hit.y),
          z: hit.z,
        });
      }
    };
    const up = () => {
      if (!dragging.current || !body.current) return;
      dragging.current = false;
      onDrag(false);
      body.current.setBodyType(RigidBodyType.Dynamic, true);
      body.current.setLinvel(
        { x: vel.current.x * 28, y: vel.current.y * 28, z: vel.current.z * 28 },
        true,
      );
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [camera, gl, hit, onDrag, plane, pointer, raycaster]);

  const color =
    spec.shape === "sphere"
      ? "#4c8dff"
      : spec.shape === "box"
        ? "#d4d4d8"
        : spec.shape === "cylinder"
          ? "#7dd3fc"
          : "#f5f5f5";

  const collider =
    spec.shape === "sphere" ? "ball" : spec.shape === "box" ? "cuboid" : "hull";

  return (
    <RigidBody
      ref={body}
      position={spec.position}
      colliders={collider}
      restitution={restitution}
      friction={0.45}
      mass={1}
      linearDamping={0.15}
      angularDamping={0.15}
    >
      <mesh
        castShadow
        onPointerDown={(e) => {
          e.stopPropagation();
          if (!body.current) return;
          dragging.current = true;
          onDrag(true);
          const t = body.current.translation();
          last.current.set(t.x, t.y, t.z);
          plane.constant = -t.y;
          body.current.setBodyType(RigidBodyType.KinematicPositionBased, true);
        }}
      >
        {spec.shape === "sphere" ? <sphereGeometry args={[0.45, 24, 16]} /> : null}
        {spec.shape === "box" ? <boxGeometry args={[0.8, 0.8, 0.8]} /> : null}
        {spec.shape === "cylinder" ? (
          <cylinderGeometry args={[0.35, 0.35, 0.9, 20]} />
        ) : null}
        {spec.shape === "capsule" ? <capsuleGeometry args={[0.28, 0.7, 8, 16]} /> : null}
        <meshStandardMaterial color={color} roughness={0.35} metalness={0.12} />
      </mesh>
    </RigidBody>
  );
}

function FpsReporter({ onFps }: { onFps: (n: number) => void }) {
  const frames = useRef(0);
  const last = useRef(performance.now());
  useFrame(() => {
    frames.current += 1;
    const now = performance.now();
    if (now - last.current >= 500) {
      onFps(Math.round((frames.current * 1000) / (now - last.current)));
      frames.current = 0;
      last.current = now;
    }
  });
  return null;
}

function Toolbar({
  paused,
  preset,
  onPreset,
  onSpawn,
  onClear,
  onReset,
  onTogglePause,
  gravity,
  restitution,
  onGravity,
  onRestitution,
}: {
  paused: boolean;
  preset: PresetId;
  onPreset: (id: PresetId) => void;
  onSpawn: (s: Shape) => void;
  onClear: () => void;
  onReset: () => void;
  onTogglePause: () => void;
  gravity: number;
  restitution: number;
  onGravity: (n: number) => void;
  onRestitution: (n: number) => void;
}) {
  return (
    <div className="max-w-xl rounded-xl border border-border bg-card/90 p-3 shadow-[var(--shadow-lift)] backdrop-blur-md">
      <div className="flex flex-wrap items-center gap-1.5">
        <span className="mr-1 text-[10px] uppercase tracking-[0.16em] text-subtle">Presets</span>
        {PRESET_ORDER.map((id) => (
          <button
            key={id}
            type="button"
            data-preset={id}
            title={PRESETS[id].blurb}
            onClick={() => onPreset(id)}
            className={
              preset === id
                ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent"
                : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
            }
          >
            {PRESETS[id].label}
          </button>
        ))}
      </div>
      <p className="mt-2 max-w-md text-[11px] leading-relaxed text-muted-foreground">
        {PRESETS[preset]?.blurb}
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <Tool onClick={() => onSpawn("sphere")} icon={<Circle className="size-4" />} label="Sphere" />
        <Tool onClick={() => onSpawn("box")} icon={<Box className="size-4" />} label="Box" />
        <Tool
          onClick={() => onSpawn("cylinder")}
          icon={<Cylinder className="size-4" />}
          label="Cylinder"
        />
        <Tool onClick={() => onSpawn("capsule")} icon={<Circle className="size-4" />} label="Capsule" />
        <Tool onClick={onClear} icon={<Trash2 className="size-4" />} label="Clear" />
        <Tool onClick={onReset} icon={<RotateCcw className="size-4" />} label="Reset" />
        <Tool
          onClick={onTogglePause}
          icon={paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          label={paused ? "Play" : "Pause"}
        />
      </div>
      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <label className="block text-xs text-muted-foreground">
          Gravity {gravity.toFixed(2)} m/s²
          <input
            type="range"
            min={-12}
            max={30}
            step={0.01}
            value={gravity}
            onChange={(e) => onGravity(Number(e.target.value))}
            className="mt-1 w-full accent-accent"
          />
        </label>
        <label className="block text-xs text-muted-foreground">
          Restitution {restitution.toFixed(2)}
          <span className="ml-1 text-subtle">(0 none · 1 elastic)</span>
          <input
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={restitution}
            onChange={(e) => onRestitution(Number(e.target.value))}
            className="mt-1 w-full accent-accent"
          />
        </label>
      </div>
      <p className="mono mt-2 text-[10px] text-subtle">
        Share: /playground?preset={preset}
        {preset === "custom" ? `&g=${gravity.toFixed(2)}&r=${restitution.toFixed(2)}` : ""}
      </p>
    </div>
  );
}

function Tool({
  onClick,
  icon,
  label,
}: {
  onClick: () => void;
  icon: ReactNode;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-10 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
    >
      {icon}
      {label}
    </button>
  );
}

function Stats({
  objects,
  fps,
  gravity,
  restitution,
  paused,
  preset,
}: {
  objects: number;
  fps: number;
  gravity: number;
  restitution: number;
  paused: boolean;
  preset: PresetId;
}) {
  const energyClass = restitution >= 0.8 ? "text-[var(--status-active)]" : restitution >= 0.4 ? "text-accent" : "text-accent-warm";
  return (
    <dl className="grid min-w-[12rem] grid-cols-2 gap-x-4 gap-y-1 rounded-xl border border-border bg-card/90 px-4 py-3 font-mono text-[11px] tabular-nums shadow-[var(--shadow-lift)] backdrop-blur-md">
      <dt className="text-subtle">Objects</dt>
      <dd data-testid="object-count">{objects}</dd>
      <dt className="text-subtle">FPS</dt>
      <dd>{fps || "—"}</dd>
      <dt className="text-subtle">Gravity</dt>
      <dd data-testid="telemetry-gravity" className={gravity === 0 ? "text-accent-2" : "text-foreground"}>
        {gravity.toFixed(2)} m/s²
      </dd>
      <dt className="text-subtle">Restitution</dt>
      <dd data-testid="telemetry-restitution" className={energyClass}>
        {restitution.toFixed(2)}
        <span className="ml-1 text-subtle">
          {" "}
          {restitution >= 0.8 ? "elastic" : restitution >= 0.4 ? "mixed" : "dead"}
        </span>
      </dd>
      <dt className="text-subtle">Simulation</dt>
      <dd className={paused ? "text-accent-warm" : "text-[var(--status-active)]"}>
        {paused ? "Paused" : "Running"}
      </dd>
      <dt className="text-subtle">Preset</dt>
      <dd data-testid="preset-label">{PRESETS[preset] ? PRESETS[preset].label : "Custom"}</dd>
    </dl>
  );
}

function ExperimentJournal({
  samples,
  experiments,
  onSave,
  onDelete,
  onExport,
  onClearSamples,
}: {
  samples: number;
  experiments: SavedExperiment[];
  onSave: () => void;
  onDelete: (id: string) => void;
  onExport: (exp: SavedExperiment) => void;
  onClearSamples: () => void;
}) {
  return (
    <div
      data-testid="experiment-journal"
      className="pointer-events-auto max-w-xl rounded-xl border border-border bg-card/95 p-4 shadow-[var(--shadow-lift)] backdrop-blur-md"
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-display text-sm tracking-tight">Experiment Journal</h2>
        <span className="mono text-[11px] text-subtle">{samples} samples buffered</span>
      </div>
      <p className="mt-1 text-[11px] text-muted-foreground">
        Samples every 250ms while running — gravity, restitution, object count, FPS. Saved locally
        in this browser only.
      </p>
      <div className="mt-3 flex flex-wrap gap-1.5">
        <button
          type="button"
          onClick={onSave}
          data-testid="journal-save"
          className="inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent"
        >
          Save current run
        </button>
        <button
          type="button"
          onClick={onClearSamples}
          className="inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong"
        >
          Clear buffer
        </button>
      </div>
      <ul className="mt-3 max-h-40 space-y-1 overflow-auto">
        {experiments.length === 0 ? (
          <li className="text-xs text-subtle">No saved experiments yet.</li>
        ) : (
          experiments.map((exp) => (
            <li
              key={exp.id}
              className="flex flex-wrap items-center justify-between gap-2 rounded-md border border-border bg-background/40 px-2 py-1.5"
            >
              <span className="mono text-[11px] text-foreground">{exp.name}</span>
              <span className="mono text-[10px] text-subtle">
                {exp.samples.length} pts · g={exp.gravity.toFixed(2)}
              </span>
              <span className="flex gap-1">
                <button
                  type="button"
                  onClick={() => onExport(exp)}
                  className="rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:text-foreground"
                >
                  CSV
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(exp.id)}
                  className="rounded border border-border px-2 py-0.5 text-[10px] text-muted-foreground hover:text-status"
                >
                  Delete
                </button>
              </span>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

function useIsMobile() {
  const [m, setM] = useState(false);
  useEffect(() => {
    const q = window.matchMedia("(max-width: 768px)");
    const apply = () => setM(q.matches);
    apply();
    q.addEventListener("change", apply);
    return () => q.removeEventListener("change", apply);
  }, []);
  return m;
}
