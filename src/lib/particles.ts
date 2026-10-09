/** Particle / N-body helpers for the instruments particle lab. */

export type ParticleMode = "central" | "pairwise";

export type Particle = {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  mass: number;
};

export type ParticleConfig = {
  count: number;
  mode: ParticleMode;
  gravity: number;
  soft: number;
  damping: number;
  dt: number;
  pairwiseCap: number;
};

export const PARTICLE_PRESETS: {
  id: string;
  label: string;
  blurb: string;
  config: ParticleConfig;
}[] = [
  {
    id: "orbit-swarm",
    label: "Orbit swarm",
    blurb: "Central gravity — disk of orbiting points.",
    config: {
      count: 180,
      mode: "central",
      gravity: 80,
      soft: 0.4,
      damping: 0,
      dt: 0.016,
      pairwiseCap: 0,
    },
  },
  {
    id: "cluster",
    label: "Cluster",
    blurb: "Pairwise gravity — clumping with softening.",
    config: {
      count: 80,
      mode: "pairwise",
      gravity: 12,
      soft: 0.6,
      damping: 0.001,
      dt: 0.016,
      pairwiseCap: 80,
    },
  },
  {
    id: "drift",
    label: "Drift field",
    blurb: "Weak central field + damping — calm instrument view.",
    config: {
      count: 220,
      mode: "central",
      gravity: 25,
      soft: 0.8,
      damping: 0.002,
      dt: 0.016,
      pairwiseCap: 0,
    },
  },
];

export function spawnParticles(config: ParticleConfig): Particle[] {
  const n = Math.max(1, Math.min(400, config.count));
  const particles: Particle[] = [];
  for (let i = 0; i < n; i++) {
    const angle = (i / n) * Math.PI * 2 + Math.random() * 0.2;
    const radius = 4 + Math.random() * 10;
    const speed = Math.sqrt((config.gravity * 20) / Math.max(radius, 0.5)) * 0.55;
    particles.push({
      x: Math.cos(angle) * radius,
      y: (Math.random() - 0.5) * 2,
      z: Math.sin(angle) * radius,
      vx: -Math.sin(angle) * speed,
      vy: (Math.random() - 0.5) * 0.1,
      vz: Math.cos(angle) * speed,
      mass: 1 + Math.random(),
    });
  }
  return particles;
}

export function stepParticles(particles: Particle[], config: ParticleConfig) {
  const { gravity, soft, damping, dt, mode, pairwiseCap } = config;
  const n = particles.length;

  if (mode === "central") {
    for (let i = 0; i < n; i++) {
      const p = particles[i]!;
      const r2 = p.x * p.x + p.y * p.y + p.z * p.z + soft * soft;
      const r = Math.sqrt(r2);
      const k = -gravity / (r2 * r);
      p.vx += k * p.x * dt;
      p.vy += k * p.y * dt;
      p.vz += k * p.z * dt;
      const damp = 1 - damping;
      p.vx *= damp;
      p.vy *= damp;
      p.vz *= damp;
      p.x += p.vx * dt * 60;
      p.y += p.vy * dt * 60;
      p.z += p.vz * dt * 60;
    }
    return;
  }

  const cap = Math.min(n, pairwiseCap || n, 120);
  for (let i = 0; i < n; i++) {
    const p = particles[i]!;
    let ax = 0;
    let ay = 0;
    let az = 0;
    for (let j = 0; j < cap; j++) {
      if (i === j) continue;
      const q = particles[j]!;
      const dx = q.x - p.x;
      const dy = q.y - p.y;
      const dz = q.z - p.z;
      const r2 = dx * dx + dy * dy + dz * dz + soft * soft;
      const r = Math.sqrt(r2);
      const k = (gravity * q.mass) / (r2 * r);
      ax += k * dx;
      ay += k * dy;
      az += k * dz;
    }
    const damp = 1 - damping;
    p.vx = (p.vx + ax * dt) * damp;
    p.vy = (p.vy + ay * dt) * damp;
    p.vz = (p.vz + az * dt) * damp;
    p.x += p.vx * dt * 60;
    p.y += p.vy * dt * 60;
    p.z += p.vz * dt * 60;
  }
}

export function totalKinetic(particles: Particle[]) {
  let e = 0;
  for (const p of particles) {
    e += 0.5 * p.mass * (p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
  }
  return e;
}

export async function detectWebGpu(): Promise<boolean> {
  if (typeof navigator === "undefined" || !("gpu" in navigator)) return false;
  try {
    const gpu = (navigator as Navigator & { gpu?: { requestAdapter(): Promise<unknown> } }).gpu;
    if (!gpu) return false;
    const adapter = await gpu.requestAdapter();
    return Boolean(adapter);
  } catch {
    return false;
  }
}
