import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Binary,
  Github,
  Minus,
  Plus,
  RotateCcw,
  Trash2,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { BlochSphere } from "@/components/instruments/bloch-sphere";
import { site } from "@/data/site";
import {
  amplitudes,
  DEMO_CIRCUITS,
  formatBasis,
  GATE_META,
  nextOpId,
  probabilities,
  runCircuit,
  type CircuitOp,
  type GateId,
} from "@/lib/circuit";

const N_QUBITS = 2;
const GATES: GateId[] = ["H", "X", "Y", "Z", "S", "T", "CNOT", "CZ", "RX", "RY", "RZ"];

export function QuCplLitePage() {
  const [ops, setOps] = useState<CircuitOp[]>(() => DEMO_CIRCUITS[0]!.build());
  const [selectedGate, setSelectedGate] = useState<GateId>("H");
  const [angleDeg, setAngleDeg] = useState(90);
  const [control, setControl] = useState(0);
  const [target, setTarget] = useState(1);
  const [stepIndex, setStepIndex] = useState<number | null>(null);

  const partialOps = useMemo(
    () => (stepIndex === null ? ops : ops.slice(0, stepIndex)),
    [ops, stepIndex],
  );
  const state = useMemo(() => runCircuit(partialOps, N_QUBITS), [partialOps]);
  const probs = useMemo(() => probabilities(state), [state]);
  const amps = useMemo(() => amplitudes(state), [state]);

  const addGate = useCallback(() => {
    const meta = GATE_META[selectedGate];
    const angle = (angleDeg * Math.PI) / 180;
    let t = target;
    const c = control;
    if (meta.kind === "control") {
      if (c === t) t = t === 0 ? 1 : 0;
    } else if (t > N_QUBITS - 1) {
      t = 0;
    }
    setOps((prev) => [
      ...prev,
      {
        id: nextOpId(),
        gate: selectedGate,
        target: t,
        control: meta.kind === "control" ? c : undefined,
        angle: meta.needsAngle ? angle : undefined,
      },
    ]);
    setStepIndex(null);
  }, [selectedGate, angleDeg, control, target]);

  const clear = useCallback(() => {
    setOps([]);
    setStepIndex(null);
  }, []);

  const undo = useCallback(() => {
    setOps((prev) => prev.slice(0, -1));
    setStepIndex(null);
  }, []);

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
              Quantum · sandbox
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">QuCPL Lite</h1>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Statevector simulator for ≤2 qubits in the UI (library supports 5). Not a second
              QUICKIDE — a readable sandbox that links out to the full toolchain.
            </p>
          </div>
          <a
            href="https://github.com/tejastro123/QUICKIDE"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm hover:border-border-strong"
          >
            <Github className="size-4" />
            QUICKIDE repo
            <ArrowUpRight className="size-3.5" />
          </a>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="min-w-0 rounded-xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-display text-xl tracking-tight">Circuit</h2>
              <div className="flex flex-wrap gap-1.5">
                {DEMO_CIRCUITS.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    title={d.hint}
                    onClick={() => {
                      setOps(d.build());
                      setStepIndex(null);
                    }}
                    className="inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5">
              {GATES.map((g) => (
                <button
                  key={g}
                  type="button"
                  onClick={() => setSelectedGate(g)}
                  className={
                    selectedGate === g
                      ? "inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-accent bg-accent-soft px-2 text-xs font-medium text-accent"
                      : "inline-flex h-9 min-w-10 items-center justify-center rounded-md border border-border bg-background px-2 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
                  }
                  title={GATE_META[g].desc}
                >
                  {GATE_META[g].label}
                </button>
              ))}
            </div>

            <div className="mt-3 grid gap-3 sm:grid-cols-3">
              {GATE_META[selectedGate].needsAngle ? (
                <label className="block text-xs text-muted-foreground">
                  Angle {angleDeg}°
                  <input
                    type="range"
                    min={0}
                    max={360}
                    step={1}
                    value={angleDeg}
                    onChange={(e) => setAngleDeg(Number(e.target.value))}
                    className="mt-1 w-full accent-accent"
                  />
                </label>
              ) : null}
              {GATE_META[selectedGate].kind === "control" ? (
                <label className="block text-xs text-muted-foreground">
                  Control q{control}
                  <select
                    value={control}
                    onChange={(e) => setControl(Number(e.target.value))}
                    className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
                  >
                    <option value={0}>q0</option>
                    <option value={1}>q1</option>
                  </select>
                </label>
              ) : null}
              <label className="block text-xs text-muted-foreground">
                Target q{target}
                <select
                  value={target}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground"
                >
                  <option value={0}>q0</option>
                  <option value={1}>q1</option>
                </select>
              </label>
              <div className="flex items-end gap-1.5">
                <button
                  type="button"
                  onClick={addGate}
                  className="inline-flex h-9 items-center gap-1 rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent"
                >
                  <Plus className="size-3.5" />
                  Add gate
                </button>
                <button
                  type="button"
                  onClick={undo}
                  className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong"
                >
                  <Minus className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={clear}
                  className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong"
                >
                  <Trash2 className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOps(DEMO_CIRCUITS[0]!.build());
                    setStepIndex(null);
                  }}
                  className="inline-flex h-9 items-center gap-1 rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong"
                >
                  <RotateCcw className="size-3.5" />
                </button>
              </div>
            </div>

            <p className="mt-3 text-xs text-muted-foreground">{GATE_META[selectedGate].desc}</p>

            <div className="mt-6 overflow-x-auto rounded-lg border border-border bg-background/50 p-4">
              <div className="flex min-w-[28rem] flex-col gap-3">
                {[0, 1].map((q) => (
                  <div key={q} className="flex items-center gap-3">
                    <span className="mono w-8 text-xs text-subtle">q{q}</span>
                    <div className="flex flex-1 flex-wrap items-center gap-2">
                      {ops.map((op, i) => {
                        const touches =
                          op.target === q || (op.control !== undefined && op.control === q);
                        const dim = stepIndex !== null && i >= stepIndex;
                        return (
                          <button
                            key={op.id}
                            type="button"
                            onClick={() => setStepIndex(i + 1)}
                            className={
                              touches
                                ? dim
                                  ? "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-border bg-background px-2 text-xs text-subtle"
                                  : "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-accent bg-accent-soft px-2 text-xs font-medium text-accent"
                                : "inline-flex h-10 min-w-12 items-center justify-center rounded-md border border-dashed border-border/60 bg-transparent px-2 text-xs text-subtle/50"
                            }
                            title={
                              op.gate === "CNOT" || op.gate === "CZ"
                                ? `${op.gate} c${op.control} → t${op.target}`
                                : op.gate
                            }
                          >
                            {op.gate}
                          </button>
                        );
                      })}
                      {!ops.length ? (
                        <span className="text-xs text-subtle">Add gates or load a demo</span>
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              <Binary className="size-4 text-accent" />
              <span>
                {stepIndex === null
                  ? `Full circuit · ${ops.length} op${ops.length === 1 ? "" : "s"}`
                  : `Showing first ${stepIndex} op${stepIndex === 1 ? "" : "s"} — click a gate to scrub`}
              </span>
              {stepIndex !== null ? (
                <button
                  type="button"
                  onClick={() => setStepIndex(null)}
                  className="text-accent underline-offset-4 hover:underline"
                >
                  Show full
                </button>
              ) : null}
            </div>
          </section>

          <section className="min-w-0 rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl tracking-tight">Statevector</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Computational basis · |ψ|² probability · phase in radians
            </p>
            <ul className="mt-4 space-y-2">
              {state.map((c, i) => {
                const p = probs[i] ?? 0;
                const a = amps[i]!;
                return (
                  <li key={i} className="rounded-lg border border-border bg-background/40 p-3">
                    <div className="flex items-center justify-between gap-2">
                      <span className="mono text-sm">
                        |{formatBasis(i, N_QUBITS)}⟩
                      </span>
                      <span className="mono text-xs tabular-nums text-muted-foreground">
                        {(p * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-muted">
                      <div
                        className="h-full rounded-full bg-accent transition-[width] duration-300"
                        style={{ width: `${Math.min(100, p * 100).toFixed(1)}%` }}
                      />
                    </div>
                    <p className="mono mt-2 text-[11px] text-subtle">
                      |a|={a.mag.toFixed(4)} · φ={a.phase.toFixed(3)} rad
                      <span className="ml-2">
                        ({c.re.toFixed(4)}
                        {c.im < 0 ? " − " : " + "}
                        {Math.abs(c.im).toFixed(4)}i)
                      </span>
                    </p>
                  </li>
                );
              })}
            </ul>
            <div className="mt-6">
              <div className="flex items-baseline justify-between gap-2">
                <h3 className="font-display text-lg tracking-tight">Bloch sphere · qubit 0</h3>
                <span className="mono text-[10px] uppercase tracking-[0.14em] text-subtle">
                  reduced state
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Trace out qubit 1 — entanglement shows up as a mixed interior point, not a surface
                vector.
              </p>
              <div className="mt-3">
                <BlochSphere state={state} />
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Measurement gates dephase amplitudes so the viz stays honest without collapsing to a
              single shot. Full QUICKIDE owns noisy simulation and IBM Quantum submission.
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              Identity reference:{" "}
              <span className="mono text-foreground">{site.social.github}</span>
            </p>
          </section>
        </div>
      </main>
    </SiteShell>
  );
}

export default QuCplLitePage;
