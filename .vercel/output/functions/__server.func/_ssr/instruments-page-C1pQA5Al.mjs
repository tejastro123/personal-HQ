import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { H as Compass, X as Atom, Z as ArrowUpRight, c as Sparkles, i as Waves } from "../_libs/lucide-react.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/instruments-page-C1pQA5Al.js
var import_jsx_runtime = require_jsx_runtime();
var INSTRUMENTS = [
	{
		id: "qucpl",
		to: "/instruments/qucpl",
		title: "QuCPL Lite",
		blurb: "Pure-TS statevector sandbox for ≤4 qubits. Gates, circuit scrub, amplitude/phase, and a live Bloch sphere for qubit 0.",
		icon: Atom,
		tag: "Quantum"
	},
	{
		id: "orbit",
		to: "/instruments/orbit",
		title: "Orbit Lab",
		blurb: "Two-body RK4 integrator with circular, eccentric, escape, and tight presets. Energy + eccentricity telemetry.",
		icon: Compass,
		tag: "Physics"
	},
	{
		id: "particles",
		to: "/instruments/particles",
		title: "Particle Lab",
		blurb: "Central and pairwise gravity on a Three.js point cloud. CPU physics, WebGPU detection, additive glow.",
		icon: Sparkles,
		tag: "Compute"
	},
	{
		id: "chaos",
		to: "/instruments/chaos",
		title: "Chaos Lab",
		blurb: "Bifurcation diagrams, logistic cobweb, and the Lorenz attractor — deterministic rules that refuse to settle.",
		icon: Waves,
		tag: "Dynamics"
	}
];
function InstrumentsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
				children: "Instruments"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Lab bench, not just demos"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted-foreground",
				children: "Runnable instruments that show how the systems work — quantum statevectors, orbital mechanics, particle fields, and nonlinear dynamics. Each one links back to the production project it grew from."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: INSTRUMENTS.map((inst) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: inst.to,
					className: "group flex flex-col rounded-xl border border-border bg-card p-6 transition-colors hover:border-border-strong",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(inst.icon, {
								className: "size-6 text-accent",
								"aria-hidden": true
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-[10px] uppercase tracking-[0.16em] text-subtle",
								children: inst.tag
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-xl tracking-tight",
							children: inst.title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 flex-1 text-sm leading-relaxed text-muted-foreground",
							children: inst.blurb
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mt-4 inline-flex items-center gap-1 text-sm text-accent",
							children: ["Open instrument", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })]
						})
					]
				}, inst.id))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-16 rounded-xl border border-border bg-card p-6 sm:p-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-2xl tracking-tight",
					children: "Also in the lab"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 grid gap-3 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/playground",
							className: "block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Physics"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg",
									children: "Physics Playground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Rigid-body lab with presets, drag-throw, and the Experiment Journal."
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/topology",
							className: "block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Graph"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg",
									children: "Project Topology"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Force graph of related projects, category clusters, and search."
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/systems",
							className: "block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Ops"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg",
									children: "Systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "Live vitals, data integrity, tech radar, and repo pulse."
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects/$id",
							params: { id: "quickide" },
							className: "block rounded-lg border border-border bg-background-secondary p-4 hover:border-border-strong",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] text-muted-foreground",
									children: "Source project"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-lg",
									children: "QUICKIDE"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-sm text-muted-foreground",
									children: "The full quantum IDE that QuCPL Lite deliberately does not replace."
								})
							]
						}) })
					]
				})]
			})
		]
	}) });
}
//#endregion
export { InstrumentsPage, InstrumentsPage as default };
