import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowUpRight, c as Plus, f as Minus, s as RotateCcw } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { l as projects, o as getProjectByCountryId, s as mapMetrics } from "./site-shell-D60Mg0ll.mjs";
import { t as Badge } from "./badge-DFV1pwBc.mjs";
import { n as SectionHeading, t as Reveal } from "./reveal-VloQCJ-f.mjs";
import { n as path_default, t as naturalEarth1_default } from "../_libs/d3-geo.mjs";
import { t as feature_default } from "../_libs/topojson-client.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/world-map-ClrM0H9c.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MIN_K = .85;
var MAX_K = 8;
var ARCH_NODES = [
	{
		id: "US",
		lngLat: [-98, 39]
	},
	{
		id: "IN",
		lngLat: [78, 22]
	},
	{
		id: "EU",
		lngLat: [10, 50]
	},
	{
		id: "JP",
		lngLat: [138, 36]
	},
	{
		id: "BR",
		lngLat: [-52, -10]
	}
];
function arcPath(a, b, project) {
	const pa = project(a);
	const pb = project(b);
	if (!pa || !pb) return null;
	const mx = (pa[0] + pb[0]) / 2;
	const my = (pa[1] + pb[1]) / 2;
	const dx = pb[0] - pa[0];
	const dy = pb[1] - pa[1];
	const lift = Math.min(80, Math.hypot(dx, dy) * .22);
	return `M${pa[0]},${pa[1]} Q${mx},${my - lift} ${pb[0]},${pb[1]}`;
}
function lerp(a, b, t) {
	return a + (b - a) * t;
}
function colorAt(t, light) {
	const u = Math.max(0, Math.min(1, t));
	const from = light ? [
		231,
		228,
		220
	] : [
		22,
		22,
		28
	];
	const to = light ? [
		33,
		86,
		214
	] : [
		76,
		141,
		255
	];
	return `rgb(${from.map((v, i) => Math.round(lerp(v, to[i], u))).join(",")})`;
}
function metricValue(project, metric) {
	if (!project) return 0;
	return project.metrics[metric];
}
function WorldMap() {
	const wrap = (0, import_react.useRef)(null);
	const [size, setSize] = (0, import_react.useState)({
		w: 960,
		h: 520
	});
	const [countries, setCountries] = (0, import_react.useState)([]);
	const [metric, setMetric] = (0, import_react.useState)("innovationScore");
	const [transform, setTransform] = (0, import_react.useState)({
		x: 0,
		y: 0,
		k: 1
	});
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [selectedName, setSelectedName] = (0, import_react.useState)(null);
	const [tip, setTip] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [light, setLight] = (0, import_react.useState)(false);
	const drag = (0, import_react.useRef)(null);
	const pointers = (0, import_react.useRef)(/* @__PURE__ */ new Map());
	const pinch = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		const el = wrap.current;
		if (!el) return;
		const ro = new ResizeObserver(() => {
			const r = el.getBoundingClientRect();
			setSize({
				w: Math.max(320, r.width),
				h: Math.max(360, Math.round(r.width * .55))
			});
		});
		ro.observe(el);
		return () => ro.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		setLight(document.documentElement.classList.contains("light"));
		const obs = new MutationObserver(() => {
			setLight(document.documentElement.classList.contains("light"));
		});
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["class"]
		});
		return () => obs.disconnect();
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		fetch("/data/countries-110m.json").then((r) => {
			if (!r.ok) throw new Error("Map data failed to load");
			return r.json();
		}).then((topo) => {
			if (cancelled) return;
			const obj = topo.objects.countries;
			const fc = feature_default(topo, obj);
			setCountries(fc.features);
		}).catch((e) => {
			if (!cancelled) setError(e instanceof Error ? e.message : "Map failed");
		});
		return () => {
			cancelled = true;
		};
	}, []);
	const projection = (0, import_react.useMemo)(() => {
		const p = naturalEarth1_default();
		if (!countries.length) {
			p.translate([size.w / 2, size.h / 2]).scale(Math.min(size.w, size.h) / 4.2);
			return p;
		}
		const collection = {
			type: "FeatureCollection",
			features: countries
		};
		p.fitExtent([[16, 24], [size.w - 16, size.h - 16]], collection);
		return p;
	}, [
		countries,
		size.w,
		size.h
	]);
	const path = (0, import_react.useMemo)(() => path_default(projection), [projection]);
	const domain = (0, import_react.useMemo)(() => {
		const vals = projects.map((p) => p.metrics[metric]);
		return [Math.min(...vals, 0), Math.max(...vals, 1)];
	}, [metric]);
	const metricLabel = mapMetrics.find((m) => m.id === metric)?.label ?? metric;
	const applyZoom = (0, import_react.useCallback)((nextK, cx, cy) => {
		setTransform((t) => {
			const k = Math.max(MIN_K, Math.min(MAX_K, nextK));
			const ratio = k / t.k;
			return {
				k,
				x: cx - (cx - t.x) * ratio,
				y: cy - (cy - t.y) * ratio
			};
		});
	}, []);
	function onWheel(e) {
		e.preventDefault();
		const rect = wrap.current?.getBoundingClientRect();
		if (!rect) return;
		const cx = e.clientX - rect.left;
		const cy = e.clientY - rect.top;
		const factor = Math.exp(-e.deltaY * .0015);
		applyZoom(transform.k * factor, cx, cy);
	}
	function onPointerDown(e) {
		e.currentTarget.setPointerCapture(e.pointerId);
		pointers.current.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		if (pointers.current.size === 1) drag.current = {
			x: e.clientX,
			y: e.clientY,
			tx: transform.x,
			ty: transform.y
		};
		else if (pointers.current.size === 2) {
			const pts = [...pointers.current.values()];
			const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			pinch.current = {
				dist,
				k: transform.k
			};
			drag.current = null;
		}
	}
	function onPointerMove(e) {
		if (!pointers.current.has(e.pointerId)) return;
		pointers.current.set(e.pointerId, {
			x: e.clientX,
			y: e.clientY
		});
		if (pointers.current.size === 2 && pinch.current) {
			const pts = [...pointers.current.values()];
			const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
			const rect = wrap.current?.getBoundingClientRect();
			const cx = rect ? (pts[0].x + pts[1].x) / 2 - rect.left : size.w / 2;
			const cy = rect ? (pts[0].y + pts[1].y) / 2 - rect.top : size.h / 2;
			applyZoom(pinch.current.k * dist / pinch.current.dist, cx, cy);
			return;
		}
		if (drag.current && pointers.current.size === 1) setTransform((t) => ({
			...t,
			x: drag.current.tx + (e.clientX - drag.current.x),
			y: drag.current.ty + (e.clientY - drag.current.y)
		}));
	}
	function onPointerUp(e) {
		pointers.current.delete(e.pointerId);
		if (pointers.current.size < 2) pinch.current = null;
		if (pointers.current.size === 0) drag.current = null;
	}
	function selectCountry(f, name) {
		const id = String(f.id ?? "");
		const project = getProjectByCountryId(id);
		setSelected(project ?? null);
		setSelectedName(name);
	}
	const markers = projects.filter((p) => p.countryLngLat);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "world",
		className: "scroll-mt-24 border-t border-border py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Where my ideas live.",
						title: "Projects Around the World",
						subtitle: "Explore the projects, technologies, and research behind my work — mapped from real GitHub repos on this site."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						children: "Real project"
					})]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-8 flex flex-wrap gap-2",
					children: mapMetrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setMetric(m.id),
						className: cn("h-10 rounded-full border px-4 text-sm transition-colors duration-150", metric === m.id ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"),
						children: m.label
					}, m.id))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative mt-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: wrap,
						className: "relative overflow-hidden rounded-xl border border-border bg-background-secondary touch-none",
						style: { height: size.h },
						onWheel,
						onPointerDown,
						onPointerMove,
						onPointerUp,
						onPointerCancel: onPointerUp,
						role: "application",
						"aria-label": "Interactive world map",
						children: [
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-6 text-sm text-status",
								children: error
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
								width: size.w,
								height: size.h,
								className: "block h-full w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									transform: `translate(${transform.x} ${transform.y}) scale(${transform.k})`,
									children: [
										countries.map((f, i) => {
											const id = String(f.id ?? i);
											const name = f.properties?.name ?? "Unknown";
											const project = getProjectByCountryId(id);
											const v = metricValue(project, metric);
											const t = domain[1] === domain[0] ? 0 : (v - domain[0]) / (domain[1] - domain[0]);
											const d = path(f) ?? "";
											const active = selectedName === name;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d,
												fill: project ? colorAt(t, light) : colorAt(.06, light),
												stroke: active ? "var(--foreground)" : "var(--background)",
												strokeWidth: active ? 1.6 / transform.k : .4 / transform.k,
												className: "cursor-pointer",
												onPointerEnter: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect) return;
													setTip({
														x: e.clientX - rect.left,
														y: e.clientY - rect.top,
														name,
														project,
														metricLabel,
														metricValue: v
													});
												},
												onPointerMove: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect || !tip) return;
													setTip((prev) => prev ? {
														...prev,
														x: e.clientX - rect.left,
														y: e.clientY - rect.top
													} : prev);
												},
												onPointerLeave: () => setTip(null),
												onClick: () => selectCountry(f, name)
											}, id);
										}),
										(() => {
											const project = (lngLat) => projection(lngLat);
											return [
												["US", "IN"],
												["US", "EU"],
												["IN", "JP"],
												["EU", "JP"],
												["US", "BR"],
												["IN", "EU"]
											].map(([from, to]) => {
												const a = ARCH_NODES.find((n) => n.id === from);
												const b = ARCH_NODES.find((n) => n.id === to);
												if (!a || !b) return null;
												const d = arcPath(a.lngLat, b.lngLat, project);
												if (!d) return null;
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
													d,
													fill: "none",
													stroke: "var(--accent)",
													strokeWidth: 1.1 / transform.k,
													strokeLinecap: "round",
													className: "map-arc",
													opacity: .55
												}, `${from}-${to}`);
											});
										})(),
										markers.map((p) => {
											const pt = projection(p.countryLngLat);
											if (!pt) return null;
											const active = selected?.id === p.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("g", {
												transform: `translate(${pt[0]}, ${pt[1]})`,
												className: "cursor-pointer",
												onClick: () => {
													setSelected(p);
													setSelectedName(p.country);
												},
												onPointerEnter: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect) return;
													setTip({
														x: e.clientX - rect.left,
														y: e.clientY - rect.top,
														name: p.country,
														project: p,
														metricLabel,
														metricValue: p.metrics[metric]
													});
												},
												onPointerLeave: () => setTip(null),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
													r: active ? 7 / transform.k : 5 / transform.k,
													fill: "var(--accent)",
													stroke: "var(--background)",
													strokeWidth: 1.5 / transform.k
												})
											}, p.id);
										})
									]
								})
							}),
							tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none absolute z-10 w-56 rounded-md border border-border bg-card p-3 text-xs shadow-[var(--shadow-lift)]",
								style: {
									left: Math.min(tip.x + 14, size.w - 230),
									top: Math.min(tip.y + 14, size.h - 120)
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: tip.name
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground",
										children: tip.project ? tip.project.title : "No project mapped"
									}),
									tip.project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 text-subtle",
											children: tip.project.category
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mt-1 tabular-nums text-foreground",
											children: [
												tip.metricLabel,
												": ",
												tip.metricValue
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "mt-1 line-clamp-2 text-muted-foreground",
											children: tip.project.description
										})
									] }) : null
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-3 left-3 right-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
										children: "Low — High"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "mt-1 h-2 w-40 rounded-full",
										style: { background: `linear-gradient(90deg, ${colorAt(0, light)}, ${colorAt(1, light)})` }
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex gap-1",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "subtle",
											"aria-label": "Zoom in",
											onClick: () => applyZoom(transform.k * 1.3, size.w / 2, size.h / 2),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
											size: "icon",
											variant: "subtle",
											"aria-label": "Zoom out",
											onClick: () => applyZoom(transform.k / 1.3, size.w / 2, size.h / 2),
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Minus, {})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											size: "sm",
											variant: "subtle",
											onClick: () => setTransform({
												x: 0,
												y: 0,
												k: 1
											}),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, {}), "Reset"]
										})
									]
								})]
							})
						]
					}), selectedName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: cn("z-20 border border-border bg-card shadow-[var(--shadow-lift)]", "fixed inset-x-0 bottom-0 max-h-[70dvh] overflow-auto rounded-t-xl p-5", "md:absolute md:inset-y-3 md:right-3 md:bottom-auto md:left-auto md:max-h-[calc(100%-24px)] md:w-[22rem] md:rounded-xl"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
								children: selectedName
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mt-1 font-display text-2xl tracking-tight",
								children: selected?.title ?? "No project mapped"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-sm text-muted-foreground",
								onClick: () => {
									setSelected(null);
									setSelectedName(null);
								},
								children: "Close"
							})]
						}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-3 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: selected.category }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: selected.status }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-xs tabular-nums text-subtle",
										children: selected.year
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 text-sm leading-relaxed text-muted-foreground",
								children: selected.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-xs text-subtle",
								children: selected.technologies.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-3 text-xs tabular-nums text-muted-foreground",
								children: [
									metricLabel,
									": ",
									selected.metrics[metric]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "mt-6 w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/projects/$id",
									params: { id: selected.id },
									children: ["View Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								})
							})
						] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 text-sm text-muted-foreground",
							children: "This country has no project mapped yet."
						})]
					}) : null]
				})
			]
		})
	});
}
//#endregion
export { WorldMap, WorldMap as default };
