/** Chaos / nonlinear dynamics helpers for the Chaos Lab instrument. */

export type LogisticSample = { r: number; x: number };

/** Iterate logistic map x → r·x·(1−x), returning the tail after burn-in. */
export function logisticOrbit(r: number, x0: number, steps = 80, burn = 40): number[] {
  let x = x0;
  for (let i = 0; i < burn; i++) x = r * x * (1 - x);
  const out: number[] = [];
  for (let i = 0; i < steps; i++) {
    x = r * x * (1 - x);
    if (Number.isFinite(x)) out.push(x);
  }
  return out;
}

/** Dense bifurcation samples for r ∈ [rMin, rMax]. */
export function bifurcationSamples(
  rMin = 2.5,
  rMax = 4,
  rSteps = 480,
  xSteps = 48,
): LogisticSample[] {
  const samples: LogisticSample[] = [];
  for (let i = 0; i < rSteps; i++) {
    const r = rMin + ((rMax - rMin) * i) / (rSteps - 1);
    let x = 0.5;
    for (let k = 0; k < 40; k++) x = r * x * (1 - x);
    for (let k = 0; k < xSteps; k++) {
      x = r * x * (1 - x);
      if (x > 0 && x < 1) samples.push({ r, x });
    }
  }
  return samples;
}

export type LorenzState = { x: number; y: number; z: number };

export const LORENZ_PRESETS: {
  id: string;
  label: string;
  blurb: string;
  sigma: number;
  rho: number;
  beta: number;
}[] = [
  {
    id: "classic",
    label: "Classic",
    blurb: "σ=10 · ρ=28 · β=8/3 — the butterfly.",
    sigma: 10,
    rho: 28,
    beta: 8 / 3,
  },
  {
    id: "soft",
    label: "Soft spiral",
    blurb: "Lower ρ — calmer spiral before chaos sets in.",
    sigma: 10,
    rho: 16,
    beta: 8 / 3,
  },
  {
    id: "wild",
    label: "Wild",
    blurb: "Higher ρ — faster mixing, denser attractor.",
    sigma: 12,
    rho: 35,
    beta: 3,
  },
];

export function lorenzStep(
  s: LorenzState,
  sigma: number,
  rho: number,
  beta: number,
  dt = 0.005,
): LorenzState {
  const dx = sigma * (s.y - s.x);
  const dy = s.x * (rho - s.z) - s.y;
  const dz = s.x * s.y - beta * s.z;
  return {
    x: s.x + dx * dt,
    y: s.y + dy * dt,
    z: s.z + dz * dt,
  };
}

export function seedLorenz(): LorenzState {
  return { x: 0.1, y: 0, z: 0 };
}
