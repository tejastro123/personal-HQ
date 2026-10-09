import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _ as Play, et as Activity, p as RotateCcw, y as Pause } from "../_libs/lucide-react.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/chaos-lab-CrVs_gTB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/** Iterate logistic map x → r·x·(1−x), returning the tail after burn-in. */
function logisticOrbit(r, x0, steps = 80, burn = 40) {
	let x = x0;
	for (let i = 0; i < burn; i++) x = r * x * (1 - x);
	const out = [];
	for (let i = 0; i < steps; i++) {
		x = r * x * (1 - x);
		if (Number.isFinite(x)) out.push(x);
	}
	return out;
}
/** Dense bifurcation samples for r ∈ [rMin, rMax]. */
function bifurcationSamples(rMin = 2.5, rMax = 4, rSteps = 480, xSteps = 48) {
	const samples = [];
	for (let i = 0; i < rSteps; i++) {
		const r = rMin + (rMax - rMin) * i / (rSteps - 1);
		let x = .5;
		for (let k = 0; k < 40; k++) x = r * x * (1 - x);
		for (let k = 0; k < xSteps; k++) {
			x = r * x * (1 - x);
			if (x > 0 && x < 1) samples.push({
				r,
				x
			});
		}
	}
	return samples;
}
var LORENZ_PRESETS = [
	{
		id: "classic",
		label: "Classic",
		blurb: "σ=10 · ρ=28 · β=8/3 — the butterfly.",
		sigma: 10,
		rho: 28,
		beta: 8 / 3
	},
	{
		id: "soft",
		label: "Soft spiral",
		blurb: "Lower ρ — calmer spiral before chaos sets in.",
		sigma: 10,
		rho: 16,
		beta: 8 / 3
	},
	{
		id: "wild",
		label: "Wild",
		blurb: "Higher ρ — faster mixing, denser attractor.",
		sigma: 12,
		rho: 35,
		beta: 3
	}
];
function lorenzStep(s, sigma, rho, beta, dt = .005) {
	const dx = sigma * (s.y - s.x);
	const dy = s.x * (rho - s.z) - s.y;
	const dz = s.x * s.y - beta * s.z;
	return {
		x: s.x + dx * dt,
		y: s.y + dy * dt,
		z: s.z + dz * dt
	};
}
function seedLorenz() {
	return {
		x: .1,
		y: 0,
		z: 0
	};
}
function ChaosLabPage() {
	const [view, setView] = (0, import_react.useState)("bifurcation");
	const [running, setRunning] = (0, import_react.useState)(true);
	const [r, setR] = (0, import_react.useState)(3.7);
	const [x0, setX0] = (0, import_react.useState)(.2);
	const [lorenzId, setLorenzId] = (0, import_react.useState)(LORENZ_PRESETS[0].id);
	const lorenz = LORENZ_PRESETS.find((p) => p.id === lorenzId) ?? LORENZ_PRESETS[0];
	const bifCanvasRef = (0, import_react.useRef)(null);
	const logisticCanvasRef = (0, import_react.useRef)(null);
	const lorenzCanvasRef = (0, import_react.useRef)(null);
	const lorenzStateRef = (0, import_react.useRef)(seedLorenz());
	const trailRef = (0, import_react.useRef)([]);
	const rafRef = (0, import_react.useRef)(0);
	const resetLorenz = (0, import_react.useCallback)(() => {
		lorenzStateRef.current = seedLorenz();
		trailRef.current = [];
	}, []);
	(0, import_react.useEffect)(() => {
		const canvas = bifCanvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const draw = () => {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = Math.max(280, Math.floor(w * .55));
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "#08080b";
			ctx.fillRect(0, 0, w, h);
			ctx.strokeStyle = "#1c1c22";
			ctx.lineWidth = 1;
			for (let i = 0; i <= 4; i++) {
				const y = h * i / 4;
				ctx.beginPath();
				ctx.moveTo(0, y);
				ctx.lineTo(w, y);
				ctx.stroke();
			}
			const samples = bifurcationSamples(2.5, 4, Math.floor(w), 40);
			const rMin = 2.5;
			for (const s of samples) {
				const px = (s.r - rMin) / 1.5 * w;
				const py = h - s.x * h;
				const alpha = .15 + .55 * Math.min(1, s.x);
				ctx.fillStyle = `rgba(76, 141, 255, ${alpha})`;
				ctx.fillRect(px, py, 1, 1);
			}
			const mx = (r - rMin) / 1.5 * w;
			ctx.strokeStyle = "#fbbf24";
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			ctx.moveTo(mx, 0);
			ctx.lineTo(mx, h);
			ctx.stroke();
		};
		draw();
		const ro = new ResizeObserver(draw);
		ro.observe(parent);
		return () => ro.disconnect();
	}, [r]);
	(0, import_react.useEffect)(() => {
		const canvas = logisticCanvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		const draw = () => {
			const dpr = Math.min(2, window.devicePixelRatio || 1);
			const w = parent.clientWidth;
			const h = Math.max(260, Math.floor(w * .7));
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
			ctx.fillStyle = "#08080b";
			ctx.fillRect(0, 0, w, h);
			const pad = 28;
			const plot = (v) => pad + v * (w - 56);
			const plotY = (v) => h - pad - v * (h - 56);
			ctx.strokeStyle = "#2a2a32";
			ctx.beginPath();
			ctx.moveTo(plot(0), plotY(0));
			ctx.lineTo(plot(1), plotY(1));
			ctx.stroke();
			ctx.strokeStyle = "#4c8dff";
			ctx.lineWidth = 1.5;
			ctx.beginPath();
			for (let i = 0; i <= 120; i++) {
				const x = i / 120;
				const y = r * x * (1 - x);
				const px = plot(x);
				const py = plotY(y);
				if (i === 0) ctx.moveTo(px, py);
				else ctx.lineTo(px, py);
			}
			ctx.stroke();
			let x = x0;
			ctx.strokeStyle = "rgba(251, 191, 36, 0.75)";
			ctx.lineWidth = 1;
			ctx.beginPath();
			ctx.moveTo(plot(x), plotY(0));
			for (let i = 0; i < 48; i++) {
				const y = r * x * (1 - x);
				ctx.lineTo(plot(x), plotY(y));
				ctx.lineTo(plot(y), plotY(y));
				x = y;
				if (!Number.isFinite(x)) break;
			}
			ctx.stroke();
			const orbit = logisticOrbit(r, x0, 40, 20);
			ctx.fillStyle = "#22d3ee";
			for (const o of orbit) {
				if (o <= 0 || o >= 1) continue;
				ctx.beginPath();
				ctx.arc(plot(o), plotY(o), 2.2, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.fillStyle = "#71717a";
			ctx.font = "11px ui-monospace, monospace";
			ctx.fillText("0", 24, h - 8);
			ctx.fillText("1", w - pad - 4, h - 8);
			ctx.fillText(`r=${r.toFixed(3)}`, pad, 16);
		};
		draw();
		const ro = new ResizeObserver(draw);
		ro.observe(parent);
		return () => ro.disconnect();
	}, [r, x0]);
	(0, import_react.useEffect)(() => {
		if (view !== "lorenz") {
			cancelAnimationFrame(rafRef.current);
			return;
		}
		const canvas = lorenzCanvasRef.current;
		if (!canvas) return;
		const parent = canvas.parentElement;
		if (!parent) return;
		const ctx = canvas.getContext("2d");
		if (!ctx) return;
		let w = 0;
		let h = 0;
		const dpr = Math.min(2, window.devicePixelRatio || 1);
		const resize = () => {
			w = parent.clientWidth;
			h = Math.max(300, Math.floor(w * .65));
			canvas.width = Math.floor(w * dpr);
			canvas.height = Math.floor(h * dpr);
			canvas.style.width = `${w}px`;
			canvas.style.height = `${h}px`;
			ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		};
		resize();
		const ro = new ResizeObserver(resize);
		ro.observe(parent);
		const { sigma, rho, beta } = lorenz;
		const step = () => {
			if (running) for (let i = 0; i < 4; i++) {
				lorenzStateRef.current = lorenzStep(lorenzStateRef.current, sigma, rho, beta, .006);
				const s = lorenzStateRef.current;
				if (!Number.isFinite(s.x) || Math.abs(s.x) > 1e6) {
					lorenzStateRef.current = seedLorenz();
					trailRef.current = [];
				} else {
					trailRef.current.push({ ...s });
					if (trailRef.current.length > 1800) trailRef.current.shift();
				}
			}
			ctx.fillStyle = "#08080b";
			ctx.fillRect(0, 0, w, h);
			const trail = trailRef.current;
			if (trail.length > 1) for (let i = 1; i < trail.length; i++) {
				const a = trail[i - 1];
				const b = trail[i];
				const px = (v) => (v + 30) * (w / 60);
				const py = (v) => h - v / 50 * h;
				const t = i / trail.length;
				ctx.strokeStyle = `rgba(${Math.floor(76 + t * 175)}, ${Math.floor(141 + t * 50)}, 255, ${.2 + t * .7})`;
				ctx.lineWidth = 1.1;
				ctx.beginPath();
				ctx.moveTo(px(a.x), py(a.z));
				ctx.lineTo(px(b.x), py(b.z));
				ctx.stroke();
			}
			const head = trail[trail.length - 1];
			if (head) {
				const px = (v) => (v + 30) * (w / 60);
				const py = (v) => h - v / 50 * h;
				ctx.fillStyle = "#fbbf24";
				ctx.beginPath();
				ctx.arc(px(head.x), py(head.z), 3, 0, Math.PI * 2);
				ctx.fill();
			}
			ctx.fillStyle = "#71717a";
			ctx.font = "11px ui-monospace, monospace";
			ctx.fillText("x ↔ z projection", 12, h - 12);
			ctx.fillText(`${trail.length} pts`, Math.max(12, w - 72), 18);
			rafRef.current = requestAnimationFrame(step);
		};
		rafRef.current = requestAnimationFrame(step);
		return () => {
			cancelAnimationFrame(rafRef.current);
			ro.disconnect();
		};
	}, [
		view,
		running,
		lorenz
	]);
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
						children: "Dynamics · chaos"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: "Chaos Lab"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 max-w-2xl text-muted-foreground",
						children: "Bifurcation, cobweb, and Lorenz attractor — deterministic rules that refuse to stay predictable. Pure canvas, no physics engine."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: [
						["bifurcation", "Bifurcation"],
						["logistic", "Logistic map"],
						["lorenz", "Lorenz"]
					].map(([id, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-view": id,
						onClick: () => setView(id),
						className: view === id ? "inline-flex h-9 items-center rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent" : "inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
						children: label
					}, id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-xl border border-border bg-card p-3",
					children: [
						view === "bifurcation" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative w-full overflow-hidden rounded-lg bg-[#08080b]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: bifCanvasRef,
								"data-testid": "chaos-bifurcation",
								className: "block w-full",
								"aria-label": "Logistic map bifurcation diagram"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: "Attracting values of x after burn-in, for r from 2.5 → 4. Yellow line marks the r you are inspecting in the logistic view."
						})] }) : null,
						view === "logistic" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative w-full overflow-hidden rounded-lg bg-[#08080b]",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
								ref: logisticCanvasRef,
								"data-testid": "chaos-logistic",
								className: "block w-full",
								"aria-label": "Logistic map cobweb plot"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-muted-foreground",
							children: "Cobweb construction: horizontal to f(x), vertical to the diagonal. Cyan dots are late orbit samples."
						})] }) : null,
						view === "lorenz" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "relative w-full overflow-hidden rounded-lg bg-[#08080b]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("canvas", {
									ref: lorenzCanvasRef,
									"data-testid": "chaos-lorenz",
									className: "block w-full",
									"aria-label": "Lorenz attractor"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-3 flex flex-wrap gap-1.5",
								children: LORENZ_PRESETS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									"data-preset": p.id,
									onClick: () => {
										setLorenzId(p.id);
										resetLorenz();
									},
									className: lorenzId === p.id ? "inline-flex h-8 items-center rounded-md border border-accent bg-accent-soft px-2.5 text-xs font-medium text-accent" : "inline-flex h-8 items-center rounded-md border border-border bg-background px-2.5 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
									children: p.label
								}, p.id))
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-[11px] text-muted-foreground",
								children: lorenz.blurb
							})
						] }) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 flex flex-wrap gap-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setRunning((v) => !v),
								className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
								children: [running ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, { className: "size-3.5" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, { className: "size-3.5" }), running ? "Pause" : "Run"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: resetLorenz,
								className: "inline-flex h-9 items-center gap-1.5 rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset trail"]
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
							children: [
								"Growth rate r = ",
								r.toFixed(3),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									"data-testid": "chaos-r",
									min: 2.5,
									max: 4,
									step: .001,
									value: r,
									onChange: (e) => setR(Number(e.target.value)),
									className: "mt-1 w-full accent-accent"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "mt-3 block text-xs text-muted-foreground",
							children: [
								"Seed x₀ = ",
								x0.toFixed(3),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "range",
									min: .01,
									max: .99,
									step: .01,
									value: x0,
									onChange: (e) => setX0(Number(e.target.value)),
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
										children: "Regime"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: r < 3 ? "fixed point" : r < 3.449 ? "period-2" : r < 3.544 ? "period-4" : r < 3.5699 ? "period-doubling" : r < 3.8 ? "chaos + windows" : "developed chaos" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Lorenz σ / ρ / β"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: view === "lorenz" ? `${lorenz.sigma} / ${lorenz.rho.toFixed(1)} / ${lorenz.beta.toFixed(2)}` : "—" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex justify-between gap-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
										className: "text-subtle",
										children: "Trail"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: view === "lorenz" ? trailRef.current.length : "—" })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 flex items-start gap-2 text-xs leading-relaxed text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "mt-0.5 size-4 shrink-0 text-accent-warm" }), "Same class of idea as walk-forward honesty in the stock tool: tiny rule changes, large consequences — measure the regime, don’t trust a single run."]
						})
					]
				})]
			})
		]
	}) });
}
//#endregion
export { ChaosLabPage, ChaosLabPage as default };
