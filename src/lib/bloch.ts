/** Bloch-sphere projection helpers for QuCPL Lite (reduced single-qubit state). */

import type { Complex } from "@/lib/circuit";

export type BlochVector = { x: number; y: number; z: number; purity: number };

function mul(a: Complex, b: Complex): Complex {
  return { re: a.re * b.re - a.im * b.im, im: a.re * b.im + a.im * b.re };
}

function conj(a: Complex): Complex {
  return { re: a.re, im: -a.im };
}

function add(a: Complex, b: Complex): Complex {
  return { re: a.re + b.re, im: a.im + b.im };
}

/**
 * Reduced Bloch vector for qubit 0 of a 2-qubit pure state
 * ψ = [ψ00, ψ01, ψ10, ψ11] (little-endian qubit0 = LSB).
 */
export function blochFromState(state: Complex[]): BlochVector | null {
  if (state.length < 4) return null;
  const a = state[0]!;
  const b = state[1]!;
  const c = state[2]!;
  const d = state[3]!;

  // ρ00 = |a|²+|b|², ρ11 = |c|²+|d|²
  // ρ01 = a c* + b d*
  const rho00 = a.re * a.re + a.im * a.im + b.re * b.re + b.im * b.im;
  const rho11 = c.re * c.re + c.im * c.im + d.re * d.re + d.im * d.im;
  const rho01 = add(mul(a, conj(c)), mul(b, conj(d)));

  const x = 2 * rho01.re;
  const y = 2 * rho01.im;
  const z = rho00 - rho11;
  const purity = Math.min(1, Math.hypot(x, y, z));
  return { x, y, z, purity };
}

/** Isometric 2D projection of a Bloch vector onto the canvas. */
export function projectBloch(
  v: BlochVector,
  cx: number,
  cy: number,
  radius: number,
  yaw = 0.7,
  pitch = 0.45,
): { x: number; y: number; depth: number } {
  // Rotate around Y then X
  const cosY = Math.cos(yaw);
  const sinY = Math.sin(yaw);
  const cosX = Math.cos(pitch);
  const sinX = Math.sin(pitch);

  const x1 = v.x * cosY + v.z * sinY;
  const z1 = -v.x * sinY + v.z * cosY;
  const y1 = v.y * cosX - z1 * sinX;
  const z2 = v.y * sinX + z1 * cosX;

  return {
    x: cx + x1 * radius,
    y: cy - y1 * radius,
    depth: z2,
  };
}
