import { useEffect, useRef } from "react";
import { blochFromState, projectBloch, type BlochVector } from "@/lib/bloch";
import type { Complex } from "@/lib/circuit";

function drawSphere(
  canvas: HTMLCanvasElement,
  vector: BlochVector | null,
  yaw: number,
) {
  const parent = canvas.parentElement;
  if (!parent) return;
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const size = Math.max(200, Math.min(280, parent.clientWidth));
  canvas.width = Math.floor(size * dpr);
  canvas.height = Math.floor(size * dpr);
  canvas.style.width = `${size}px`;
  canvas.style.height = `${size}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.clearRect(0, 0, size, size);

  const cx = size / 2;
  const cy = size / 2;
  const R = size * 0.34;

  // outer glow
  const glow = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R * 1.35);
  glow.addColorStop(0, "rgba(76,141,255,0.12)");
  glow.addColorStop(1, "rgba(76,141,255,0)");
  ctx.fillStyle = glow;
  ctx.beginPath();
  ctx.arc(cx, cy, R * 1.35, 0, Math.PI * 2);
  ctx.fill();

  // sphere outline
  ctx.strokeStyle = "rgba(76,141,255,0.45)";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(cx, cy, R, 0, Math.PI * 2);
  ctx.stroke();

  // equator (ellipse under pitch)
  const pitch = 0.45;
  ctx.strokeStyle = "rgba(34,211,238,0.35)";
  ctx.beginPath();
  ctx.ellipse(cx, cy, R, R * Math.sin(pitch), 0, 0, Math.PI * 2);
  ctx.stroke();

  // meridian
  ctx.strokeStyle = "rgba(251,191,36,0.28)";
  ctx.beginPath();
  ctx.ellipse(cx, cy, R * Math.sin(yaw) * 0.35 + R * 0.08, R, 0, 0, Math.PI * 2);
  ctx.stroke();

  // axes
  const poles = [
    projectBloch({ x: 0, y: 1, z: 0, purity: 1 }, cx, cy, R, yaw, pitch),
    projectBloch({ x: 0, y: -1, z: 0, purity: 1 }, cx, cy, R, yaw, pitch),
    projectBloch({ x: 1, y: 0, z: 0, purity: 1 }, cx, cy, R, yaw, pitch),
    projectBloch({ x: 0, y: 0, z: 1, purity: 1 }, cx, cy, R, yaw, pitch),
  ];
  ctx.strokeStyle = "rgba(113,113,122,0.55)";
  ctx.beginPath();
  ctx.moveTo(poles[0]!.x, poles[0]!.y);
  ctx.lineTo(poles[1]!.x, poles[1]!.y);
  ctx.moveTo(poles[2]!.x, poles[2]!.y);
  ctx.lineTo(poles[3]!.x, poles[3]!.y);
  ctx.stroke();

  ctx.fillStyle = "#71717a";
  ctx.font = "11px ui-monospace, monospace";
  ctx.fillText("|0⟩", poles[0]!.x - 6, poles[0]!.y - 6);
  ctx.fillText("|1⟩", poles[1]!.x - 6, poles[1]!.y + 14);
  ctx.fillText("X", poles[2]!.x + 6, poles[2]!.y + 4);
  ctx.fillText("Z", poles[3]!.x + 6, poles[3]!.y + 4);

  if (!vector) {
    ctx.fillStyle = "#71717a";
    ctx.font = "12px ui-monospace, monospace";
    ctx.textAlign = "center";
    ctx.fillText("no 2-qubit state", cx, cy + R + 28);
    ctx.textAlign = "left";
    return;
  }

  // state vector
  const tip = projectBloch(vector, cx, cy, R, yaw, pitch);
  const origin = { x: cx, y: cy };
  const grad = ctx.createLinearGradient(origin.x, origin.y, tip.x, tip.y);
  grad.addColorStop(0, "rgba(76,141,255,0.2)");
  grad.addColorStop(1, "#4c8dff");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(origin.x, origin.y);
  ctx.lineTo(tip.x, tip.y);
  ctx.stroke();

  ctx.fillStyle = "#fbbf24";
  ctx.beginPath();
  ctx.arc(tip.x, tip.y, 5, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e5e7eb";
  ctx.font = "11px ui-monospace, monospace";
  ctx.fillText(
    `x=${vector.x.toFixed(2)} y=${vector.y.toFixed(2)} z=${vector.z.toFixed(2)}`,
    10,
    size - 12,
  );
  ctx.fillStyle = vector.purity > 0.95 ? "#4ade80" : "#fbbf24";
  ctx.fillText(
    vector.purity > 0.95 ? "pure (Bloch surface)" : `mixed · purity ${vector.purity.toFixed(2)}`,
    10,
    size - 28,
  );
}

export function BlochSphere({ state }: { state: Complex[] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const yawRef = useRef(0.7);
  const rafRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const vector = blochFromState(state);
    let last = performance.now();

    const loop = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      yawRef.current += dt * 0.35;
      drawSphere(canvas, vector, yawRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [state]);

  return (
    <div className="relative flex justify-center rounded-lg border border-border bg-[#08080b]/60 p-2">
      <canvas
        ref={canvasRef}
        data-testid="bloch-sphere"
        className="max-w-full"
        aria-label="Bloch sphere for qubit 0"
      />
    </div>
  );
}

export default BlochSphere;
