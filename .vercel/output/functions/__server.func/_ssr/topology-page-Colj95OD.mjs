import { o as __toESM } from "../_runtime.mjs";
import { c as projects } from "./resume-lenses-DTkYOlQB.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
import { a as categoryDot } from "./categories-Cczj3smL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/topology-page-Colj95OD.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MAX_NODES = 48;
var VIEW_W = 640;
var VIEW_H = 360;
function buildGraph() {
	const list = projects.filter((p) => p.featured || p.related.length > 0).slice(0, MAX_NODES);
	const idSet = new Set(list.map((p) => p.id));
	const nodes = list.map((p, i) => {
		const angle = i / list.length * Math.PI * 2;
		return {
			id: p.id,
			title: p.title,
			category: p.category,
			featured: p.featured,
			degree: p.related.filter((r) => idSet.has(r)).length,
			x: Math.cos(angle) * 180 + 200,
			y: Math.sin(angle) * 140 + 160,
			vx: 0,
			vy: 0
		};
	});
	const index = new Map(nodes.map((n) => [n.id, n]));
	const edges = [];
	for (const p of list) for (const r of p.related) {
		if (!index.has(r)) continue;
		if (p.id === r) continue;
		edges.push({
			source: p.id,
			target: r
		});
	}
	return {
		nodes,
		edges,
		byId: index
	};
}
function categoryFill(category) {
	return categoryDot(category).backgroundColor;
}
function TopologyPage() {
	const svgRef = (0, import_react.useRef)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [, setTick] = (0, import_react.useState)(0);
	const simRef = (0, import_react.useRef)(buildGraph());
	const nodesRef = (0, import_react.useRef)(simRef.current.nodes);
	const [hover, setHover] = (0, import_react.useState)(null);
	const [view, setView] = (0, import_react.useState)({
		x: 0,
		y: 0,
		k: 1
	});
	const dragRef = (0, import_react.useRef)(null);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		if (!q) return simRef.current.nodes;
		return simRef.current.nodes.filter((n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q));
	}, [query]);
	const categories = (0, import_react.useMemo)(() => {
		return [...new Set(simRef.current.nodes.map((n) => n.category))].sort();
	}, []);
	const projectById = (0, import_react.useCallback)((id) => {
		return projects.find((p) => p.id === id);
	}, []);
	(0, import_react.useEffect)(() => {
		let raf = 0;
		const step = () => {
			const nodes = nodesRef.current;
			const { edges } = simRef.current;
			const w = VIEW_W;
			const h = VIEW_H;
			for (let i = 0; i < nodes.length; i++) {
				for (let j = i + 1; j < nodes.length; j++) {
					const a = nodes[i];
					const b = nodes[j];
					const dx = b.x - a.x;
					const dy = b.y - a.y;
					const dist2 = dx * dx + dy * dy + .01;
					const dist = Math.sqrt(dist2);
					const rep = 900 / dist2;
					const fx = dx / dist * rep;
					const fy = dy / dist * rep;
					a.vx -= fx * .02;
					a.vy -= fy * .02;
					b.vx += fx * .02;
					b.vy += fy * .02;
				}
				const a = nodes[i];
				a.vx += (w / 2 - a.x) * 8e-4;
				a.vy += (h / 2 - a.y) * 8e-4;
				a.vx *= .86;
				a.vy *= .86;
				a.x += a.vx;
				a.y += a.vy;
				a.x = Math.max(24, Math.min(616, a.x));
				a.y = Math.max(24, Math.min(336, a.y));
			}
			for (const e of edges) {
				const a = nodes.find((n) => n.id === e.source);
				const b = nodes.find((n) => n.id === e.target);
				if (!a || !b) continue;
				const dx = b.x - a.x;
				const dy = b.y - a.y;
				const dist = Math.hypot(dx, dy) + .01;
				const f = (dist - 70) * .01;
				const fx = dx / dist * f;
				const fy = dy / dist * f;
				a.vx += fx;
				a.vy += fy;
				b.vx -= fx;
				b.vy -= fy;
			}
			if (dragRef.current) {
				const d = dragRef.current;
				d.x = d.x + d.vx;
				d.y = d.y + d.vy;
			}
			setTick((t) => (t + 1) % 1e5);
			raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, []);
	const onWheel = (0, import_react.useCallback)((e) => {
		e.preventDefault();
		setView((v) => {
			const k = Math.min(2.5, Math.max(.5, v.k * (e.deltaY > 0 ? .92 : 1.08)));
			return {
				...v,
				k
			};
		});
	}, []);
	const onPointerDown = (0, import_react.useCallback)((e) => {
		const svg = svgRef.current;
		if (!svg) return;
		svg.setPointerCapture(e.pointerId);
		dragRef.current = {
			x: view.x,
			y: view.y,
			vx: 0,
			vy: 0
		};
		const start = {
			x: e.clientX,
			y: e.clientY,
			vx: view.x,
			vy: view.y
		};
		const move = (ev) => {
			if (!dragRef.current) return;
			dragRef.current.vx = start.vx + (ev.clientX - start.x);
			dragRef.current.vy = start.vy + (ev.clientY - start.y);
			setView((v) => ({
				...v,
				x: start.vx + (ev.clientX - start.x),
				y: start.vy + (ev.clientY - start.y)
			}));
		};
		const up = () => {
			dragRef.current = null;
			window.removeEventListener("pointermove", move);
			window.removeEventListener("pointerup", up);
		};
		window.addEventListener("pointermove", move);
		window.addEventListener("pointerup", up);
	}, [view.x, view.y]);
	const resetView = (0, import_react.useCallback)(() => setView({
		x: 0,
		y: 0,
		k: 1
	}), []);
	const selectedProject = selected ? projectById(selected) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
				children: "Graph"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-2 font-display text-4xl tracking-tight",
				children: "Project topology"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 max-w-2xl text-muted-foreground",
				children: "Force-directed view of related work. Drag to pan, scroll to zoom, click a node for detail — the graph is a lens, not the only interface."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "min-w-0 rounded-xl border border-border bg-card p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: query,
									onChange: (e) => setQuery(e.target.value),
									placeholder: "Search title or category…",
									className: "h-9 min-w-[12rem] flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-subtle",
									"aria-label": "Filter projects"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mono text-[11px] text-subtle",
									children: [filtered.length, " nodes"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: resetView,
									className: "inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground",
									children: "Reset view"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2 flex flex-wrap gap-2",
							children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { backgroundColor: categoryFill(c) }
								}), c]
							}, c))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
							ref: svgRef,
							viewBox: `0 0 ${VIEW_W} ${VIEW_H}`,
							className: "mt-3 aspect-[16/9] w-full touch-none rounded-lg bg-[#08080b]",
							role: "img",
							"aria-label": "Project relationship graph",
							onWheel,
							onPointerDown,
							style: { cursor: dragRef.current ? "grabbing" : "grab" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
								transform: `translate(${view.x},${view.y}) scale(${view.k})`,
								children: [simRef.current.edges.map((e) => {
									const a = nodesRef.current.find((n) => n.id === e.source);
									const b = nodesRef.current.find((n) => n.id === e.target);
									if (!a || !b) return null;
									const active = hover === e.source || hover === e.target || selected === e.source || selected === e.target;
									return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
										x1: a.x,
										y1: a.y,
										x2: b.x,
										y2: b.y,
										stroke: active ? "rgba(76,141,255,0.55)" : "#2a2a32",
										strokeWidth: active ? 1.5 : 1
									}, `${e.source}-${e.target}`);
								}), nodesRef.current.map((n) => {
									const active = hover === n.id || selected === n.id;
									const match = filtered.some((f) => f.id === n.id);
									const fill = categoryFill(n.category);
									return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
										transform: `translate(${n.x},${n.y})`,
										opacity: match ? 1 : .15,
										onMouseEnter: () => setHover(n.id),
										onMouseLeave: () => setHover(null),
										onClick: () => setSelected(n.id),
										style: { cursor: "pointer" },
										children: [
											active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												r: 16,
												fill,
												opacity: .18
											}) : null,
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
												r: active ? 11 : n.featured ? 8 : 5.5,
												fill,
												fillOpacity: active ? .95 : n.featured ? .75 : .55,
												stroke: active ? "#fbbf24" : fill,
												strokeWidth: active ? 2 : 1.5
											}),
											(active || n.featured) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
												y: -16,
												textAnchor: "middle",
												className: "fill-foreground",
												fontSize: 10,
												fontFamily: "ui-monospace, monospace",
												children: n.title
											})
										]
									}, n.id);
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-[11px] text-subtle",
							children: "Force layout in React · wheel zoom · drag pan · category colors match the rest of the site."
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "rounded-xl border border-border bg-card p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "font-display text-xl tracking-tight",
							children: selectedProject ? selectedProject.title : "Node detail"
						}),
						selectedProject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: selectedProject.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mono mt-3 flex items-center gap-2 text-xs text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "size-2 rounded-full",
									style: { backgroundColor: categoryFill(selectedProject.category) }
								}), selectedProject.category]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/projects/$id",
								params: { id: selectedProject.id },
								className: "mt-4 inline-flex h-9 items-center rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent",
								children: "Open case study"
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Hover or click a node. Selected project details appear here."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
							children: "Featured nodes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 max-h-64 space-y-1 overflow-auto",
							children: simRef.current.nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => setSelected(n.id),
								className: selected === n.id ? "flex w-full items-center gap-2 rounded-md border border-accent bg-accent-soft px-2 py-1.5 text-left text-xs text-accent" : "flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "size-2 shrink-0 rounded-full",
										style: { backgroundColor: categoryFill(n.category) }
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate",
										children: n.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ml-auto shrink-0 text-subtle",
										children: n.category
									})
								]
							}) }, n.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10 rounded-xl border border-border bg-card p-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "Accessible list"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Same graph as a navigable table — required for screen readers and low-power devices."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full min-w-[32rem] border-collapse text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Project"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 pr-4 font-medium",
										children: "Degree"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "py-2 font-medium",
										children: "Related"
									})
								]
							}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: simRef.current.nodes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-border/50",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-4",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
											to: "/projects/$id",
											params: { id: n.id },
											className: "inline-flex items-center gap-2 text-foreground hover:text-accent",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "size-2 rounded-full",
												style: { backgroundColor: categoryFill(n.category) }
											}), n.title]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-4 text-muted-foreground",
										children: n.category
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 pr-4 tabular-nums text-muted-foreground",
										children: n.degree
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "py-2 text-subtle",
										children: projectById(n.id)?.related.join(", ") || "—"
									})
								]
							}, n.id)) })]
						})
					})
				]
			})
		]
	}) });
}
//#endregion
export { TopologyPage, TopologyPage as default };
