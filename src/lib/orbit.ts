/** Two-body orbital mechanics integrator (RK4) for the orbit lab. */

export type OrbitState = {
  /** Position in simulation units. */
  x: number;
  y: number;
  /** Velocity in units per time-step. */
  vx: number;
  vy: number;
};

export type OrbitParams = {
  /** Gravitational parameter μ = GM. */
  mu: number;
  /** Integration step size. */
  dt: number;
  /** Softening to avoid singularities. */
  soft: number;
};

export const ORBIT_PRESETS: {
  id: string;
  label: string;
  blurb: string;
  params: Partial<OrbitParams>;
  init: OrbitState;
}[] = [
  {
    id: "circular",
    label: "Circular",
    blurb: "Near-circular orbit — energy stays almost flat.",
    params: { mu: 100, dt: 0.02 },
    init: { x: 20, y: 0, vx: 0, vy: Math.sqrt(100 / 20) },
  },
  {
    id: "eccentric",
    label: "Eccentric",
    blurb: "High e — fast periapsis, slow apoapsis.",
    params: { mu: 100, dt: 0.015 },
    init: { x: 28, y: 0, vx: 0, vy: Math.sqrt((100 / 28) * 0.55) },
  },
  {
    id: "escape",
    label: "Escape",
    blurb: "v > v_escape — hyperbolic flyby.",
    params: { mu: 100, dt: 0.015 },
    init: { x: 18, y: 0, vx: 0, vy: Math.sqrt((100 / 18) * 1.35) },
  },
  {
    id: "tight",
    label: "Tight",
    blurb: "Small a, short period — watch the trail braid.",
    params: { mu: 100, dt: 0.012 },
    init: { x: 10, y: 0, vx: 0, vy: Math.sqrt(100 / 10) },
  },
];

export function stepOrbit(state: OrbitState, p: OrbitParams): OrbitState {
  const { mu, dt, soft } = p;
  const accel = (s: OrbitState) => {
    const r2 = s.x * s.x + s.y * s.y + soft * soft;
    const r = Math.sqrt(r2);
    const k = -mu / (r2 * r);
    return { ax: k * s.x, ay: k * s.y };
  };

  const a0 = accel(state);
  const k1 = { ...state, ax: a0.ax, ay: a0.ay };

  const mid1: OrbitState = {
    x: state.x + (state.vx * dt) / 2,
    y: state.y + (state.vy * dt) / 2,
    vx: state.vx + (a0.ax * dt) / 2,
    vy: state.vy + (a0.ay * dt) / 2,
  };
  const a1 = accel(mid1);
  const k2 = { ...mid1, ax: a1.ax, ay: a1.ay };

  const mid2: OrbitState = {
    x: state.x + (k2.vx * dt) / 2,
    y: state.y + (k2.vy * dt) / 2,
    vx: state.vx + (a1.ax * dt) / 2,
    vy: state.vy + (a1.ay * dt) / 2,
  };
  const a2 = accel(mid2);
  const k3 = { ...mid2, ax: a2.ax, ay: a2.ay };

  const end: OrbitState = {
    x: state.x + k3.vx * dt,
    y: state.y + k3.vy * dt,
    vx: state.vx + a2.ax * dt,
    vy: state.vy + a2.ay * dt,
  };
  void k1;
  return end;
}

export function orbitalEnergy(s: OrbitState, mu: number) {
  const r = Math.hypot(s.x, s.y) || 1e-9;
  const v2 = s.vx * s.vx + s.vy * s.vy;
  return v2 / 2 - mu / r;
}

export function eccentricity(s: OrbitState, mu: number) {
  const r = Math.hypot(s.x, s.y) || 1e-9;
  const v2 = s.vx * s.vx + s.vy * s.vy;
  const rx = s.x;
  const ry = s.y;
  const hx = 0 * 0 - s.vy * 0; // placeholder overwritten below
  const h = rx * s.vy - ry * s.vx;
  const evecx = ((v2 - mu / r) * rx - (rx * s.vx + ry * s.vy) * s.vx) / mu;
  const evecy = ((v2 - mu / r) * ry - (rx * s.vx + ry * s.vy) * s.vy) / mu;
  void hx;
  void h;
  return Math.hypot(evecx, evecy);
}

export function semiMajor(s: OrbitState, mu: number) {
  const r = Math.hypot(s.x, s.y) || 1e-9;
  const v2 = s.vx * s.vx + s.vy * s.vy;
  const energy = v2 / 2 - mu / r;
  if (energy >= 0) return Infinity;
  return -mu / (2 * energy);
}

export function downloadCsv(filename: string, rows: (string | number)[][]) {
  const csv = rows.map((r) => r.map((c) => (typeof c === "number" ? c.toFixed(6) : c)).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
