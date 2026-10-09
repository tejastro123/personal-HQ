import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Play, p as RotateCcw, y as Pause } from "../_libs/lucide-react.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/orbit-lab-DtQq8cJ1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ORBIT_PRESETS = [
	{
		id: "circular",
		label: "Circular",
		blurb: "Near-circular orbit — energy stays almost flat.",
		params: {
			mu: 100,
			dt: .02
		},
		init: {
			x: 20,
			y: 0,
			vx: 0,
			vy: Math.sqrt(5)
		}
	},
	{
		id: "eccentric",
		label: "Eccentric",
		blurb: "High e — fast periapsis, slow apoapsis.",
		params: {
			mu: 100,
			dt: .015
		},
		init: {
			x: 28,
			y: 0,
			vx: 0,
			vy: Math.sqrt(100 / 28 * .55)
		}
	},
	{
		id: "escape",
		label: "Escape",
		blurb: "v > v_escape — hyperbolic flyby.",
		params: {
			mu: 100,
			dt: .015
		},
		init: {
			x: 18,
			y: 0,
			vx: 0,
			vy: Math.sqrt(7.5)
		}
	},
	{
		id: "tight",
		label: "Tight",
		blurb: "Small a, short period — watch the trail braid.",
		params: {
			mu: 100,
			dt: .012
		},
		init: {
			x: 10,
			y: 0,
			vx: 0,
			vy: Math.sqrt(10)
		}
	}
];
function stepOrbit(state, p) {
	const { mu, dt, soft } = p;
	const accel = (s) => {
		const r2 = s.x * s.x + s.y * s.y + soft * soft;
		const r = Math.sqrt(r2);
		const k = -mu / (r2 * r);
		return {
			ax: k * s.x,
			ay: k * s.y
		};
	};
	const a0 = accel(state);
	({ ...state }), a0.ax, a0.ay;
	const mid1 = {
		x: state.x + state.vx * dt / 2,
		y: state.y + state.vy * dt / 2,
		vx: state.vx + a0.ax * dt / 2,
		vy: state.vy + a0.ay * dt / 2
	};
	const a1 = accel(mid1);
	const k2 = {
		...mid1,
		ax: a1.ax,
		ay: a1.ay
	};
	const mid2 = {
		x: state.x + k2.vx * dt / 2,
		y: state.y + k2.vy * dt / 2,
		vx: state.vx + a1.ax * dt / 2,
		vy: state.vy + a1.ay * dt / 2
	};
	const a2 = accel(mid2);
	const k3 = {
		...mid2,
		ax: a2.ax,
		ay: a2.ay
	};
	return {
		x: state.x + k3.vx * dt,
		y: state.y + k3.vy * dt,
		vx: state.vx + a2.ax * dt,
		vy: state.vy + a2.ay * dt
	};
}
function orbitalEnergy(s, mu) {
	const r = Math.hypot(s.x, s.y) || 1e-9;
	return (s.vx * s.vx + s.vy * s.vy) / 2 - mu / r;
}
function eccentricity(s, mu) {
	const r = Math.hypot(s.x, s.y) || 1e-9;
	const v2 = s.vx * s.vx + s.vy * s.vy;
	const rx = s.x;
	const ry = s.y;
	0 - s.vy * 0;
	rx * s.vy - ry * s.vx;
	const evecx = ((v2 - mu / r) * rx - (rx * s.vx + ry * s.vy) * s.vx) / mu;
	const evecy = ((v2 - mu / r) * ry - (rx * s.vx + ry * s.vy) * s.vy) / mu;
	return Math.hypot(evecx, evecy);
}
function semiMajor(s, mu) {
	const r = Math.hypot(s.x, s.y) || 1e-9;
	const energy = (s.vx * s.vx + s.vy * s.vy) / 2 - mu / r;
	if (energy >= 0) return Infinity;
	return -mu / (2 * energy);
}
function downloadCsv(filename, rows) {
	const csv = rows.map((r) => r.map((c) => typeof c === "number" ? c.toFixed(6) : c).join(",")).join("\n");
	const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = filename;
	a.click();
	URL.revokeObjectURL(url);
}
function OrbitLabPage() {
	const [presetId, setPresetId] = (0, import_react.useState)("circular");
	const preset = ORBIT_PRESETS.find((p) => p.id === presetId) ?? ORBIT_PRESETS[0];
	const [running, setRunning] = (0, import_react.useState)(true);
	const [trail, setTrail] = (0, import_react.useState)([]);
	const stateRef = (0, import_react.useRef)({ ...preset.init });
	const [readout, setReadout] = (0, import_react.useState)(() => ({
		x: preset.init.x,
		y: preset.init.y,
		energy: orbitalEnergy(preset.init, preset.params.mu ?? 100),
		ecc: eccentricity(preset.init, preset.params.mu ?? 100),
		a: semiMajor(preset.init, preset.params.mu ?? 100)
	}));
	const csvRef = (0, import_react.useRef)([]);
	const reset = (0, import_react.useCallback)(() => {
		const p = ORBIT_PRESETS.find((x) => x.id === presetId) ?? ORBIT_PRESETS[0];
		stateRef.current = { ...p.init };
		setTrail([]);
		csvRef.current = [[
			"t",
			"x",
			"y",
			"vx",
			"vy"
		]];
	}, [presetId]);
	(0, import_react.useEffect)(() => {
		reset();
	}, [reset]);
	(0, import_react.useEffect)(() => {
		if (!running) return;
		let raf = 0;
		let last = performance.now();
		let acc = 0;
		const loop = (now) => {
			const dtReal = Math.min(40, now - last);
			last = now;
			acc += dtReal;
			const steps = Math.floor(acc / 16);
			acc -= steps * 16;
			const p = ORBIT_PRESETS.find((x) => x.id === presetId) ?? ORBIT_PRESETS[0];
			const mu = p.params.mu ?? 100;
			const dt = p.params.dt ?? .02;
			for (let i = 0; i < Math.max(1, steps); i++) {
				stateRef.current = stepOrbit(stateRef.current, {
					mu,
					dt,
					soft: p.params.soft ?? .35
				});
				const s = stateRef.current;
				if (csvRef.current.length < 4e3) csvRef.current.push([
					(csvRef.current.length * dt).toFixed(4),
					s.x.toFixed(6),
					s.y.toFixed(6),
					s.vx.toFixed(6),
					s.vy.toFixed(6)
				]);
			}
			const s = stateRef.current;
			setReadout({
				x: s.x,
				y: s.y,
				energy: orbitalEnergy(s, mu),
				ecc: eccentricity(s, mu),
				a: semiMajor(s, mu)
			});
			setTrail((prev) => {
				const next = [...prev, {
					x: s.x,
					y: s.y
				}];
				return next.length > 400 ? next.slice(next.length - 400) : next;
			});
			raf = requestAnimationFrame(loop);
		};
		raf = requestAnimationFrame(loop);
		return () => cancelAnimationFrame(raf);
	}, [running, presetId]);
	const view = 36;
	const toPx = (v) => (v + view) / 72 * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/instruments",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: "Instruments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Physics · RK4"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Orbit Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Two-body integrator with energy and eccentricity readouts. Same class of physics that keeps the world-map and space projects honest."
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-xl border border-border bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative aspect-square w-full overflow-hidden rounded-lg bg-[#08080b]",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-warm",
									title: "Primary mass"
								}),
								trail.map((t, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute size-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent",
									style: {
										left: `${toPx(t.x)}%`,
										top: `${toPx(t.y)}%`,
										opacity: .25 + .75 * (i / Math.max(1, trail.length - 1))
									}
								}, i)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "absolute size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground shadow-[0_0_12px_rgba(76,141,255,0.8)]",
									style: {
										left: `${toPx(readout.x)}%`,
										top: `${toPx(readout.y)}%`
									}
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: ORBIT_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"data-preset": p.id,
								onClick: () => setPresetId(p.id),
								className: presetId === p.id ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent" : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
								children: p.label
							}, p.id))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: preset.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: () => setRunning((r) => !r),
									className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
									children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), running ? "Pause" : "Run"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									onClick: reset,
									className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => downloadCsv(`orbit-${presetId}.csv`, [[
										"t",
										"x",
										"y",
										"vx",
										"vy"
									], ...csvRef.current.slice(1)]),
									className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
									children: "Export CSV"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: "Telemetry"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 font-mono text-xs tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "x"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: readout.x.toFixed(3) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "y"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: readout.y.toFixed(3) })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Energy E"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: readout.energy >= 0 ? "text-accent-warm" : "text-foreground",
										children: readout.energy.toFixed(4)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Eccentricity e"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
										className: readout.ecc < .1 ? "text-[var(--status-active)]" : readout.ecc < 1 ? "text-accent" : "text-accent-warm",
										children: readout.ecc.toFixed(4)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Semi-major a"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: Number.isFinite(readout.a) ? readout.a.toFixed(3) : "∞ (escape)" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-xs leading-relaxed text-muted-foreground",
							children: "E < 0 → bound orbit · e < 0.1 nearly circular · E ≥ 0 → escape trajectory."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-3 text-xs text-muted-foreground",
							children: [
								"Related:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/projects/$id",
									params: { id: "time-astro" },
									className: "text-accent underline-offset-4 hover:underline",
									children: "TimeAstro"
								})
							]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { OrbitLabPage, OrbitLabPage as default };
