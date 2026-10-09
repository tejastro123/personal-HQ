import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Atom, Compass, Sparkles, Waves } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";

const INSTRUMENTS = [
  {
    id: "qucpl",
    to: "/instruments/qucpl",
    title: "QuCPL Lite",
    blurb:
      "Pure-TS statevector sandbox for ≤4 qubits. Gates, circuit scrub, amplitude/phase, and a live Bloch sphere for qubit 0.",
    icon: Atom,
    tag: "Quantum",
  },
  {
    id: "orbit",
    to: "/instruments/orbit",
    title: "Orbit Lab",
    blurb:
      "Two-body RK4 integrator with circular, eccentric, escape, and tight presets. Energy + eccentricity telemetry.",
    icon: Compass,
    tag: "Physics",
  },
  {
    id: "particles",
    to: "/instruments/particles",
    title: "Particle Lab",
    blurb:
      "Central and pairwise gravity on a Three.js point cloud. CPU physics, WebGPU detection, additive glow.",
    icon: Sparkles,
    tag: "Compute",
  },
  {
    id: "chaos",
    to: "/instruments/chaos",
    title: "Chaos Lab",
    blurb:
      "Bifurcation diagrams, logistic cobweb, and the Lorenz attractor — deterministic rules that refuse to settle.",
    icon: Waves,
    tag: "Dynamics",
  },
];

export function InstrumentsPage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Instruments
        </p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          Lab bench, not just demos
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Runnable instruments that show how the systems work — quantum statevectors, orbital
          mechanics, particle fields, and nonlinear dynamics. Each one links back to the
          production project it grew from.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {INSTRUMENTS.map((inst) => (
            <Link
              key={inst.id}
              to={inst.to}
              className="group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-strong"
            >
              <div className="flex items-center justify-between">
                <inst.icon className="size-6 text-accent" aria-hidden />
                <span className="mono text-[10px] uppercase tracking-[0.16em] text-subtle">
                  {inst.tag}
                </span>
              </div>
              <h2 className="mt-4 font-display text-xl tracking-tight">{inst.title}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {inst.blurb}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-accent">
                Open instrument
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16 rounded-xl border border-border bg-card p-6 sm:p-8">
          <h2 className="font-display text-2xl tracking-tight">Also in the lab</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            <li>
              <Link to="/playground" className="block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong">
                <p className="text-[11px] text-muted-foreground">Physics</p>
                <p className="mt-1 font-display text-lg">Physics Playground</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Rigid-body lab with presets, drag-throw, and the Experiment Journal.
                </p>
              </Link>
            </li>
            <li>
              <Link to="/topology" className="block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong">
                <p className="text-[11px] text-muted-foreground">Graph</p>
                <p className="mt-1 font-display text-lg">Project Topology</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Force graph of related projects, category clusters, and search.
                </p>
              </Link>
            </li>
            <li>
              <Link to="/systems" className="block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong">
                <p className="text-[11px] text-muted-foreground">Ops</p>
                <p className="mt-1 font-display text-lg">Systems</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Live vitals, data integrity, tech radar, and repo pulse.
                </p>
              </Link>
            </li>
            <li>
              <Link to="/projects/$id" params={{ id: "quickide" }} className="block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong">
                <p className="text-[11px] text-muted-foreground">Source project</p>
                <p className="mt-1 font-display text-lg">QUICKIDE</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  The full quantum IDE that QuCPL Lite deliberately does not replace.
                </p>
              </Link>
            </li>
          </ul>
        </section>
      </main>
    </SiteShell>
  );
}

export default InstrumentsPage;
