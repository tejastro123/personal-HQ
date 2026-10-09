import { o as __toESM } from "../_runtime.mjs";
import { c as projects, t as categories } from "./resume-lenses-DTkYOlQB.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as GitBranch, G as CircleCheck, a as TriangleAlert, et as Activity, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import { a as metrics } from "./content-CThzlbdn.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
import { n as githubSnapshot, t as formatPushed } from "./github-snapshot-dB8SIaqj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/systems-page-BBGgOGgh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var AXIS_DEFS = [
	{
		id: "quantum",
		label: "Quantum",
		match: (t) => /quantum|qiskit|qucpl|openqasm|ibm/i.test(t)
	},
	{
		id: "ai",
		label: "AI / LLM",
		match: (t) => /rag|llm|agent|gpt|ml|ai|ollama|nlp|transformer/i.test(t)
	},
	{
		id: "python",
		label: "Python",
		match: (t) => /python|pandas|numpy|fastapi|flask|django/i.test(t)
	},
	{
		id: "web",
		label: "Web",
		match: (t) => /react|typescript|javascript|tanstack|next|vite|html|css|node/i.test(t)
	},
	{
		id: "data",
		label: "Data",
		match: (t) => /data|sql|postgres|pgvector|mongo|redis|pandas|visualization|jupyter/i.test(t)
	},
	{
		id: "quant",
		label: "Quant",
		match: (t) => /stock|backtest|finance|monte|quant|yfinance|pandas/i.test(t)
	},
	{
		id: "3d",
		label: "3D / Sim",
		match: (t) => /three|rapier|webgl|simulation|physics|d3/i.test(t)
	},
	{
		id: "systems",
		label: "Systems",
		match: (t) => /api|docker|linux|cli|fastapi|express|node|postgres|cache/i.test(t)
	}
];
function computeTechRadar() {
	return AXIS_DEFS.map((axis) => {
		const byCat = /* @__PURE__ */ new Map();
		let count = 0;
		for (const p of projects) if (p.technologies.filter((t) => axis.match(t)).length) {
			count += 1;
			byCat.set(p.category, (byCat.get(p.category) ?? 0) + 1);
		}
		return {
			id: axis.id,
			label: axis.label,
			count,
			score: Math.round(count / Math.max(projects.length, 1) * 100),
			categories: [...byCat.entries()].sort((a, b) => b[1] - a[1]).slice(0, 4).map(([category, c]) => ({
				category,
				count: c
			}))
		};
	}).sort((a, b) => b.count - a.count);
}
function topTechnologies(limit = 16) {
	const counts = /* @__PURE__ */ new Map();
	for (const p of projects) for (const t of p.technologies) counts.set(t, (counts.get(t) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0])).slice(0, limit).map(([tech, count]) => ({
		tech,
		count
	}));
}
var KNOWN_VISUALS = /* @__PURE__ */ new Set([
	"quantum",
	"os",
	"education",
	"sports",
	"quant",
	"solar",
	"gpt",
	"physics",
	"ai",
	"data",
	"creative",
	"software",
	"grid"
]);
var GH_URL = /^https:\/\/github\.com\/tejastro123\/[A-Za-z0-9._-]+$/;
function runIntegrityChecks() {
	const issues = [];
	const ids = new Set(projects.map((p) => p.id));
	const cats = new Set(categories);
	for (const p of projects) {
		for (const rid of p.related) if (!ids.has(rid)) issues.push({
			level: "error",
			code: "related-missing",
			message: `${p.id} → related "${rid}" does not resolve`
		});
		if (!cats.has(p.category)) issues.push({
			level: "error",
			code: "bad-category",
			message: `${p.id} category "${p.category}" is not in categories[]`
		});
		if (!KNOWN_VISUALS.has(p.visual)) issues.push({
			level: "warn",
			code: "unknown-visual",
			message: `${p.id} visual "${p.visual}" has no ProjectVisual case`
		});
		if (p.github && !GH_URL.test(p.github)) issues.push({
			level: "warn",
			code: "github-url",
			message: `${p.id} github URL looks malformed: ${p.github}`
		});
		for (const [k, v] of Object.entries(p.metrics)) if (typeof v !== "number" || v < 0 || v > 100) issues.push({
			level: "warn",
			code: "metric-range",
			message: `${p.id} metric ${k}=${v} outside 0–100`
		});
	}
	return issues;
}
function integritySummary(issues) {
	return {
		total: issues.length,
		errors: issues.filter((i) => i.level === "error").length,
		warnings: issues.filter((i) => i.level === "warn").length,
		ok: issues.filter((i) => i.level === "error").length === 0
	};
}
var empty = {
	lcpMs: null,
	cls: null,
	inpApproxMs: null,
	fcpMs: null,
	domContentLoadedMs: null,
	transferredKb: null
};
function usePerformanceVitals() {
	const [vitals, setVitals] = (0, import_react.useState)(empty);
	(0, import_react.useEffect)(() => {
		if (typeof window === "undefined" || !("PerformanceObserver" in window)) return;
		let lcp = 0;
		let cls = 0;
		let fcp = 0;
		let inp = 0;
		const update = () => {
			const nav = performance.getEntriesByType("navigation")[0];
			let transferred = null;
			try {
				const entries = performance.getEntriesByType("resource");
				const navEntry = nav;
				const sum = entries.reduce((acc, e) => acc + (e.transferSize || 0), 0) + (navEntry?.transferSize || 0);
				transferred = sum > 0 ? Math.round(sum / 1024) : null;
			} catch {
				transferred = null;
			}
			setVitals({
				lcpMs: lcp || null,
				cls: cls || null,
				inpApproxMs: inp || null,
				fcpMs: fcp || null,
				domContentLoadedMs: nav ? Math.round(nav.domContentLoadedEventEnd) : null,
				transferredKb: transferred
			});
		};
		try {
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) {
					const entry = e;
					if (entry.entryType === "largest-contentful-paint") lcp = Math.round(entry.startTime || 0);
					if (entry.entryType === "paint" && entry.name === "first-contentful-paint") fcp = Math.round(entry.startTime || 0);
					if (entry.entryType === "layout-shift" && !e.hadRecentInput) cls += entry.value || 0;
					if (entry.entryType === "event") {
						const ev = entry;
						if (ev.duration) inp = Math.max(inp, Math.round(ev.duration));
					}
				}
				update();
			}).observe({
				type: "largest-contentful-paint",
				buffered: true
			});
		} catch {}
		try {
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) {
					const entry = e;
					if (entry.name === "first-contentful-paint") fcp = Math.round(entry.startTime || 0);
				}
				update();
			}).observe({
				type: "paint",
				buffered: true
			});
		} catch {}
		try {
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) {
					const entry = e;
					if (!entry.hadRecentInput) cls += entry.value || 0;
				}
				update();
			}).observe({
				type: "layout-shift",
				buffered: true
			});
		} catch {}
		try {
			new PerformanceObserver((list) => {
				for (const e of list.getEntries()) {
					const entry = e;
					if (entry.duration) inp = Math.max(inp, Math.round(entry.duration));
				}
				update();
			}).observe({
				type: "event",
				buffered: true,
				durationThreshold: 16
			});
		} catch {}
		update();
		return () => {};
	}, []);
	return vitals;
}
var TOKEN_KEYS = [
	"--background",
	"--card",
	"--foreground",
	"--accent",
	"--accent-2",
	"--accent-warm",
	"--border",
	"--subtle",
	"--cat-quantum",
	"--cat-ai",
	"--cat-software",
	"--cat-data"
];
function SystemsPage() {
	const vitals = usePerformanceVitals();
	const issues = (0, import_react.useMemo)(() => runIntegrityChecks(), []);
	const summary = (0, import_react.useMemo)(() => integritySummary(issues), [issues]);
	const radar = (0, import_react.useMemo)(() => computeTechRadar(), []);
	const techs = (0, import_react.useMemo)(() => topTechnologies(12), []);
	const [liveTokens, setLiveTokens] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const style = getComputedStyle(document.documentElement);
		setLiveTokens(TOKEN_KEYS.map((key) => ({
			key,
			value: style.getPropertyValue(key).trim() || "—"
		})));
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
				children: "Systems"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight sm:text-5xl",
				children: "How this studio stays honest"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted-foreground",
				children: "Live vitals, data integrity, tech radar, design tokens, and repo pulse — the operations surface behind the portfolio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Projects indexed",
						value: String(projects.length)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Integrity",
						value: summary.ok ? "Pass" : `${summary.errors} errors`,
						tone: summary.ok ? "ok" : "warn"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Warnings",
						value: String(summary.warnings)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MetricCard, {
						label: "Repos (snapshot)",
						value: String(githubSnapshot.repos.length || githubSnapshot.user?.publicRepos || "—")
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-12 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-xl tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-5 text-accent" }), "Performance vitals"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "PerformanceObserver on this page · not a lab claim"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
							className: "mt-4 space-y-2 font-mono text-xs tabular-nums",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "LCP",
									value: vitals.lcpMs !== null ? `${vitals.lcpMs} ms` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "CLS",
									value: vitals.cls !== null ? vitals.cls.toFixed(4) : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "INP (approx)",
									value: vitals.inpApproxMs !== null ? `${vitals.inpApproxMs} ms` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "FCP",
									value: vitals.fcpMs !== null ? `${vitals.fcpMs} ms` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "DOM ready",
									value: vitals.domContentLoadedMs !== null ? `${vitals.domContentLoadedMs} ms` : "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VitalRow, {
									label: "Transferred",
									value: vitals.transferredKb !== null ? `${vitals.transferredKb} KB` : "—"
								})
							]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-xl tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-5 text-[var(--status-active)]" }), "Data integrity"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "related[] resolve · category validity · visual keys · metric ranges"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: issues.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex items-center gap-2 text-[var(--status-active)]",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-4" }), "All checks passed"]
							}) : issues.slice(0, 8).map((issue) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-2",
								children: [issue.level === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-status" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "mt-0.5 size-4 shrink-0 text-accent-warm" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-muted-foreground",
									children: issue.message
								})]
							}, `${issue.code}-${issue.message}`))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: [
								"Checks run in-browser from ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono",
									children: "src/lib/integrity.ts"
								}),
								"."
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 grid gap-6 lg:grid-cols-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: "Tech radar"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 text-xs text-muted-foreground",
							children: "Project frequency by technology axis · derived from the archive"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-3",
							children: radar.map((axis) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2 text-sm",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: axis.label }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-xs tabular-nums text-muted-foreground",
									children: [
										axis.count,
										" proj · ",
										axis.score,
										"%"
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-1 h-2 overflow-hidden rounded-full bg-muted",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "h-full rounded-full bg-accent",
									style: { width: `${Math.max(4, axis.score)}%` }
								})
							})] }, axis.id))
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: "Top technologies"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 flex flex-wrap gap-2",
							children: techs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "mono rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground",
								children: [t.tech, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-1 tabular-nums text-subtle",
									children: t.count
								})]
							}, t.tech))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 text-xs text-muted-foreground",
							children: [
								"Home metrics:",
								" ",
								metrics.map((m) => `${m.prefix}${m.value}${m.infinite ? "+" : ""} ${m.label}`).join(" · ")
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
							className: "flex items-center gap-2 font-display text-xl tracking-tight",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GitBranch, { className: "size-5 text-accent-2" }), "Repo pulse"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mono text-[11px] text-subtle",
							children: [
								"last synced ",
								formatPushed(githubSnapshot.syncedAt),
								" ·",
								" ",
								githubSnapshot.source === "live-api" ? "live API" : "project-derived"
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 max-w-2xl text-sm text-muted-foreground",
						children: [
							"Stars and forks stay at 0 until",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono",
								children: "npm run sync:github"
							}),
							" writes a real snapshot — no fabricated social proof. Matching is by repo name from each project's GitHub URL."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[36rem] border-collapse text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Repo"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Language"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Stars"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Pushed"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Source"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: projects.filter((p) => p.github).slice(0, 10).map((p) => {
								const name = p.github.split("/").filter(Boolean).pop() ?? p.id;
								const snap = githubSnapshot.repos.find((r) => r.name.toLowerCase() === name.toLowerCase());
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									className: "border-b border-border/50",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-4",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
												to: "/projects/$id",
												params: { id: p.id },
												className: "text-foreground hover:text-accent",
												children: name
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-4 text-muted-foreground",
											children: snap?.language ?? "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-4 tabular-nums text-muted-foreground",
											children: snap ? snap.stargazersCount : 0
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-4 tabular-nums text-muted-foreground",
											children: snap ? formatPushed(snap.pushedAt) : "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-subtle",
											children: snap && githubSnapshot.source === "live-api" ? "live" : "derived"
										})
									]
								}, p.id);
							}) })]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "Design tokens"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Read live from CSS custom properties — what the UI actually paints"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3",
						children: liveTokens.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center gap-3 rounded-lg border border-border bg-background/40 p-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-8 shrink-0 rounded-md border border-border",
									style: { backgroundColor: t.value },
									"aria-hidden": true
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-[11px] text-muted-foreground",
									children: t.key
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono ml-auto truncate text-[11px] text-foreground",
									children: t.value
								})
							]
						}, t.key))
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "Stack notes"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "mt-3 space-y-2 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Platform contract: TanStack Start + Vite + React 19 + Tailwind 4 + Motion + D3 + Three.js. Auth and database stay off — projects are static data." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Playground uses Rapier rigid bodies; instruments use pure TS/canvas/Three so they stay testable without GPU." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								"GitHub snapshot is build-time only —",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-foreground",
									children: "scripts/sync-github.mjs"
								}),
								"."
							] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/topology",
							className: "inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
							children: "Open topology"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/instruments",
							className: "inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong",
							children: "Instruments lab"
						})]
					})
				]
			})
		]
	}) });
}
function MetricCard({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-border bg-card p-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: tone === "warn" ? "mt-2 font-display text-3xl text-accent-warm" : tone === "ok" ? "mt-2 font-display text-3xl text-[var(--status-active)]" : "mt-2 font-display text-3xl",
			children: value
		})]
	});
}
function VitalRow({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex justify-between gap-3 border-b border-border/40 pb-1.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
			className: "text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
			className: "text-foreground",
			children: value
		})]
	});
}
//#endregion
export { SystemsPage, SystemsPage as default };
