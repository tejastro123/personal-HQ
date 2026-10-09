import { o as __toESM } from "../_runtime.mjs";
import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { V as Cpu, _ as Play, i as Waves, p as RotateCcw, y as Pause } from "../_libs/lucide-react.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/particle-lab-Gr_zhTyR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PARTICLE_PRESETS = [
	{
		id: "orbit-swarm",
		label: "Orbit swarm",
		blurb: "Central gravity — disk of orbiting points.",
		config: {
			count: 180,
			mode: "central",
			gravity: 80,
			soft: .4,
			damping: 0,
			dt: .016,
			pairwiseCap: 0
		}
	},
	{
		id: "cluster",
		label: "Cluster",
		blurb: "Pairwise gravity — clumping with softening.",
		config: {
			count: 80,
			mode: "pairwise",
			gravity: 12,
			soft: .6,
			damping: .001,
			dt: .016,
			pairwiseCap: 80
		}
	},
	{
		id: "drift",
		label: "Drift field",
		blurb: "Weak central field + damping — calm instrument view.",
		config: {
			count: 220,
			mode: "central",
			gravity: 25,
			soft: .8,
			damping: .002,
			dt: .016,
			pairwiseCap: 0
		}
	}
];
function spawnParticles(config) {
	const n = Math.max(1, Math.min(400, config.count));
	const particles = [];
	for (let i = 0; i < n; i++) {
		const angle = i / n * Math.PI * 2 + Math.random() * .2;
		const radius = 4 + Math.random() * 10;
		const speed = Math.sqrt(config.gravity * 20 / Math.max(radius, .5)) * .55;
		particles.push({
			x: Math.cos(angle) * radius,
			y: (Math.random() - .5) * 2,
			z: Math.sin(angle) * radius,
			vx: -Math.sin(angle) * speed,
			vy: (Math.random() - .5) * .1,
			vz: Math.cos(angle) * speed,
			mass: 1 + Math.random()
		});
	}
	return particles;
}
function stepParticles(particles, config) {
	const { gravity, soft, damping, dt, mode, pairwiseCap } = config;
	const n = particles.length;
	if (mode === "central") {
		for (let i = 0; i < n; i++) {
			const p = particles[i];
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
		const p = particles[i];
		let ax = 0;
		let ay = 0;
		let az = 0;
		for (let j = 0; j < cap; j++) {
			if (i === j) continue;
			const q = particles[j];
			const dx = q.x - p.x;
			const dy = q.y - p.y;
			const dz = q.z - p.z;
			const r2 = dx * dx + dy * dy + dz * dz + soft * soft;
			const r = Math.sqrt(r2);
			const k = gravity * q.mass / (r2 * r);
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
function totalKinetic(particles) {
	let e = 0;
	for (const p of particles) e += .5 * p.mass * (p.vx * p.vx + p.vy * p.vy + p.vz * p.vz);
	return e;
}
async function detectWebGpu() {
	if (typeof navigator === "undefined" || !("gpu" in navigator)) return false;
	try {
		const gpu = navigator.gpu;
		if (!gpu) return false;
		const adapter = await gpu.requestAdapter();
		return Boolean(adapter);
	} catch {
		return false;
	}
}
var particle_lab_exports = /* @__PURE__ */ __exportAll({
	ParticleLabPage: () => ParticleLabPage,
	default: () => ParticleLabPage
});
var ParticleScene = (0, import_react.lazy)(() => import("./particle-scene-CSV4Y599.mjs"));
function ParticleLabPage() {
	const [presetId, setPresetId] = (0, import_react.useState)(PARTICLE_PRESETS[0].id);
	const [config, setConfig] = (0, import_react.useState)({ ...PARTICLE_PRESETS[0].config });
	const [running, setRunning] = (0, import_react.useState)(true);
	const [gpu, setGpu] = (0, import_react.useState)("checking");
	const [fps, setFps] = (0, import_react.useState)(0);
	const particlesRef = (0, import_react.useRef)([]);
	const [, setEnergyTick] = (0, import_react.useState)(0);
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setMounted(true);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		detectWebGpu().then((ok) => {
			if (!cancelled) setGpu(ok ? "yes" : "no");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		if (!mounted) return;
		particlesRef.current = spawnParticles(config);
	}, [config, mounted]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		const id = window.setInterval(() => setEnergyTick((t) => (t + 1) % 1e3), 400);
		return () => window.clearInterval(id);
	}, [running]);
	const energy = mounted ? totalKinetic(particlesRef.current) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/instruments",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: "Instruments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap items-start justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Compute · N-body"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Particle Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Central and pairwise gravity on a Three.js point cloud. CPU physics stays portable; WebGPU is detected and reported, never a hard dependency."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-lg border border-border bg-card px-3 py-2 text-xs",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "flex items-center gap-2 text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cpu, { className: "size-4" }), "Backend"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-mono text-foreground",
							children: gpu === "checking" ? "Detecting…" : gpu === "yes" ? "WebGPU available · WebGL points" : "CPU physics · WebGL points"
						}),
						gpu === "yes" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-[10px] text-subtle",
							children: "Compute path is opt-in; the point cloud renders on WebGL for reliability."
						}) : null
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-xl border border-border bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "aspect-[16/10] w-full overflow-hidden rounded-lg bg-[#08080b]",
							children: mounted ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
								fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "flex h-full items-center justify-center text-xs text-muted-foreground",
									children: "Loading renderer…"
								}),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ParticleScene, {
									particlesRef,
									running,
									config,
									onFps: setFps
								})
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex h-full items-center justify-center text-xs text-muted-foreground",
								children: "Initializing…"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: PARTICLE_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-preset": p.id,
								onClick: () => {
									setPresetId(p.id);
									setConfig({ ...p.config });
								},
								className: presetId === p.id ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent" : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
								children: p.label
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: PARTICLE_PRESETS.find((p) => p.id === presetId)?.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRunning((r) => !r),
								className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
								children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), running ? "Pause" : "Run"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => {
									particlesRef.current = spawnParticles(config);
								},
								className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Respawn"]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: "Controls"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-4 block text-xs text-muted-foreground",
							children: ["Mode", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: config.mode,
								onChange: (e) => setConfig((c) => ({
									...c,
									mode: e.target.value
								})),
								className: "mt-1 w-full rounded-md border border-border bg-background px-2 py-1.5 text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "central",
									children: "Central gravity"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "pairwise",
									children: "Pairwise"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-muted-foreground",
							children: [
								"Particles ",
								config.count,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 20,
									max: 400,
									step: 10,
									value: config.count,
									onChange: (e) => setConfig((c) => ({
										...c,
										count: Number(e.target.value)
									})),
									className: "mt-1 w-full accent-accent"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-muted-foreground",
							children: [
								"Gravity ",
								config.gravity.toFixed(1),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: 1,
									max: 120,
									step: 1,
									value: config.gravity,
									onChange: (e) => setConfig((c) => ({
										...c,
										gravity: Number(e.target.value)
									})),
									className: "mt-1 w-full accent-accent"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-muted-foreground",
							children: [
								"Softening ",
								config.soft.toFixed(2),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: .1,
									max: 2,
									step: .05,
									value: config.soft,
									onChange: (e) => setConfig((c) => ({
										...c,
										soft: Number(e.target.value)
									})),
									className: "mt-1 w-full accent-accent"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-5 space-y-2 font-mono text-xs tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Particles"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: config.count })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "FPS"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: fps || "—" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Σ KE (approx)"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: energy.toFixed(2) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Backend"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: gpu === "checking" ? "…" : gpu === "yes" ? "WebGPU ready" : "CPU" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Waves, { className: "mt-0.5 size-4 shrink-0 text-accent-2" }), "Pairwise mode caps neighbor work so mobile stays interactive. Counts are clamped to 400."]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { stepParticles as n, particle_lab_exports as t };
