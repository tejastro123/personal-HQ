import { o as __toESM } from "../_runtime.mjs";
import { a as getProjectsByCountryId, c as projects, o as mapMetrics, t as categories } from "./resume-lenses-DTkYOlQB.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as Github, Z as ArrowUpRight, c as Sparkles, g as Plus, p as RotateCcw, r as X, u as Search, x as Minus } from "../_libs/lucide-react.mjs";
import { t as Badge } from "./badge-muruo82f.mjs";
import { i as SectionStage, r as SectionHeading, t as DepthReveal } from "./tilt-DhzCXJUk.mjs";
import { n as githubSnapshot, r as repoForProject } from "./github-snapshot-dB8SIaqj.mjs";
import { n as path_default, t as naturalEarth1_default } from "../_libs/d3-geo.mjs";
import { t as feature_default } from "../_libs/topojson-client.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/world-map-BvaqwRq5.js
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
	},
	{
		id: "UK",
		lngLat: [-2, 54]
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
function repoName(p) {
	return repoForProject(p.github)?.name ?? p.github?.split("/").filter(Boolean).pop() ?? p.title;
}
function WorldMap() {
	const wrap = (0, import_react.useRef)(null);
	const [size, setSize] = (0, import_react.useState)({
		w: 960,
		h: 520
	});
	const [countries, setCountries] = (0, import_react.useState)([]);
	const [metric, setMetric] = (0, import_react.useState)("innovationScore");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [query, setQuery] = (0, import_react.useState)("");
	const [transform, setTransform] = (0, import_react.useState)({
		x: 0,
		y: 0,
		k: 1
	});
	const [selectedCountry, setSelectedCountry] = (0, import_react.useState)(null);
	const [selected, setSelected] = (0, import_react.useState)(null);
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
				h: Math.max(380, Math.round(r.width * .52))
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
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return projects.filter((p) => {
			if (category !== "All" && p.category !== category) return false;
			if (!q) return true;
			return [
				p.title,
				p.category,
				p.country,
				p.status,
				p.github ?? "",
				...p.technologies
			].join(" ").toLowerCase().includes(q);
		});
	}, [category, query]);
	/** Aggregate filtered projects by country for heat + badges. */
	const byCountry = (0, import_react.useMemo)(() => {
		const map = /* @__PURE__ */ new Map();
		for (const p of filtered) {
			const key = String(p.countryId);
			const list = map.get(key) ?? [];
			list.push(p);
			map.set(key, list);
		}
		return map;
	}, [filtered]);
	const domain = (0, import_react.useMemo)(() => {
		const vals = filtered.map((p) => p.metrics[metric]);
		if (!vals.length) return [0, 1];
		return [Math.min(...vals, 0), Math.max(...vals, 1)];
	}, [filtered, metric]);
	const metricLabel = mapMetrics.find((m) => m.id === metric)?.label ?? metric;
	const markers = (0, import_react.useMemo)(() => {
		return filtered.map((p) => {
			const pt = projection(p.countryLngLat ?? [0, 0]);
			return {
				project: p,
				x: pt?.[0] ?? -999,
				y: pt?.[1] ?? -999
			};
		});
	}, [filtered, projection]);
	/** Nudge overlapping same-country markers into a small ring. */
	const markerPositions = (0, import_react.useMemo)(() => {
		const groups = /* @__PURE__ */ new Map();
		for (const m of markers) {
			if (m.x < 0) continue;
			const key = String(m.project.countryId);
			const list = groups.get(key) ?? [];
			list.push(m);
			groups.set(key, list);
		}
		const out = /* @__PURE__ */ new Map();
		for (const [, list] of groups) {
			if (list.length === 1) {
				out.set(list[0].project.id, list[0]);
				continue;
			}
			list.forEach((m, i) => {
				const a = i / list.length * Math.PI * 2;
				const r = 7 + i % 3 * 2.5;
				out.set(m.project.id, {
					project: m.project,
					x: m.x + Math.cos(a) * r * .35,
					y: m.y + Math.sin(a) * r * .35
				});
			});
		}
		return out;
	}, [markers]);
	const stats = (0, import_react.useMemo)(() => {
		const countriesCount = byCountry.size;
		const repos = filtered.filter((p) => p.github).length;
		const featured = filtered.filter((p) => p.featured).length;
		return {
			total: filtered.length,
			countriesCount,
			repos,
			featured
		};
	}, [filtered, byCountry]);
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
	function selectCountry(countryId) {
		setSelectedCountry(countryId);
		const list = getProjectsByCountryId(countryId).filter((p) => {
			if (category !== "All" && p.category !== category) return false;
			if (!query.trim()) return true;
			return filtered.some((f) => f.id === p.id);
		});
		setSelected(list[0] ?? null);
	}
	function clearSelection() {
		setSelectedCountry(null);
		setSelected(null);
	}
	const countryProjects = selectedCountry ? filtered.filter((p) => String(p.countryId) === selectedCountry) : [];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionStage, {
		id: "world",
		variant: "cool",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				rotate: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "section-heading-hud flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: "Where my ideas live.",
						title: "Projects Around the World",
						subtitle: "Every mapped GitHub repo — filter by category, search tech, click a country to open its project stack."
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
							variant: "accent",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "mr-1 size-3" }),
								githubSnapshot.user?.publicRepos ?? projects.length,
								" public repos"
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [stats.countriesCount, " countries"] })]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-8 flex flex-col gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex flex-wrap gap-2",
						children: mapMetrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setMetric(m.id),
							className: cn("h-9 rounded-full border px-3.5 text-xs transition-colors duration-150 sm:text-sm", metric === m.id ? "border-foreground bg-foreground text-background" : "border-border bg-card text-muted-foreground hover:text-foreground"),
							children: m.label
						}, m.id))
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "relative w-full max-w-xs",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								value: query,
								onChange: (e) => setQuery(e.target.value),
								placeholder: "Search projects, tech, repos…",
								className: "h-10 w-full rounded-full border border-border bg-card pl-9 pr-9 text-sm text-foreground shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
							}),
							query ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setQuery(""),
								className: "absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-subtle hover:text-foreground",
								"aria-label": "Clear search",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-3.5" })
							}) : null
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "flex flex-wrap gap-1.5",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setCategory(c),
						className: cn("rounded-full border px-3 py-1 text-xs transition-colors duration-150", category === c ? "border-accent bg-accent-soft text-accent" : "border-border bg-card/60 text-muted-foreground hover:text-foreground"),
						children: c
					}, c))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4",
				children: [
					{
						label: "Projects shown",
						value: stats.total
					},
					{
						label: "Countries",
						value: stats.countriesCount
					},
					{
						label: "With GitHub",
						value: stats.repos
					},
					{
						label: "Featured",
						value: stats.featured
					}
				].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border/80 bg-card/50 px-3 py-2.5 backdrop-blur",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mono text-lg tabular-nums text-foreground",
						children: s.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[10px] uppercase tracking-[0.14em] text-muted-foreground",
						children: s.label
					})]
				}, s.label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 grid gap-4 xl:grid-cols-[1fr_20rem]",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "relative",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						ref: wrap,
						className: "relative overflow-hidden rounded-xl border border-border bg-background-secondary touch-none",
						style: { height: size.h },
						onWheel,
						onPointerDown,
						onPointerMove,
						onPointerUp,
						onPointerCancel: onPointerUp,
						role: "application",
						"aria-label": "Interactive world map of projects",
						children: [
							error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "p-6 text-sm text-status",
								children: error
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
								width: size.w,
								height: size.h,
								className: "block h-full w-full",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
									id: "mapGlow",
									cx: "50%",
									cy: "50%",
									r: "50%",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "0%",
										stopColor: "var(--accent)",
										stopOpacity: "0.9"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
										offset: "100%",
										stopColor: "var(--accent)",
										stopOpacity: "0"
									})]
								}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
									transform: `translate(${transform.x} ${transform.y}) scale(${transform.k})`,
									children: [
										countries.map((f, i) => {
											const id = String(f.id ?? i);
											const name = f.properties?.name ?? "Unknown";
											const list = byCountry.get(id) ?? [];
											const avg = list.length ? list.reduce((s, p) => s + p.metrics[metric], 0) / list.length : 0;
											const t = domain[1] === domain[0] ? 0 : (avg - domain[0]) / (domain[1] - domain[0]);
											const d = path(f) ?? "";
											const active = selectedCountry === id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
												d,
												fill: list.length ? colorAt(list.length > 1 ? Math.min(1, .45 + t * .55) : t, light) : colorAt(.05, light),
												stroke: active ? "var(--accent)" : list.length ? "color-mix(in oklab, var(--accent) 35%, var(--border))" : "var(--background)",
												strokeWidth: active ? 1.8 / transform.k : list.length ? .7 / transform.k : .4 / transform.k,
												className: "cursor-pointer",
												onPointerEnter: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect) return;
													setTip({
														x: e.clientX - rect.left,
														y: e.clientY - rect.top,
														title: name,
														subtitle: list.length ? `${list.length} project${list.length === 1 ? "" : "s"} · ${metricLabel} ${Math.round(avg)}` : "No projects mapped"
													});
												},
												onPointerMove: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect) return;
													setTip((prev) => prev ? {
														...prev,
														x: e.clientX - rect.left,
														y: e.clientY - rect.top
													} : prev);
												},
												onPointerLeave: () => setTip(null),
												onClick: () => list.length && selectCountry(id)
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
												["IN", "EU"],
												["UK", "IN"],
												["US", "UK"]
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
													strokeWidth: 1 / transform.k,
													strokeLinecap: "round",
													className: "map-arc",
													opacity: .4
												}, `${from}-${to}`);
											});
										})(),
										[...markerPositions.values()].map(({ project: p, x, y }) => {
											const active = selected?.id === p.id;
											return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
												transform: `translate(${x}, ${y})`,
												className: "cursor-pointer",
												onClick: () => {
													setSelected(p);
													setSelectedCountry(String(p.countryId));
												},
												onPointerEnter: (e) => {
													const rect = wrap.current?.getBoundingClientRect();
													if (!rect) return;
													setTip({
														x: e.clientX - rect.left,
														y: e.clientY - rect.top,
														title: p.title,
														subtitle: `${repoName(p)} · ${p.country}`,
														project: p
													});
												},
												onPointerLeave: () => setTip(null),
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														r: 10 / transform.k,
														fill: "url(#mapGlow)",
														opacity: .55
													}),
													active ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														r: 12 / transform.k,
														fill: "none",
														stroke: "var(--accent)",
														strokeWidth: 1.2 / transform.k,
														className: "map-ping"
													}) : null,
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
														r: (active ? 5.5 : 3.8) / transform.k,
														fill: p.featured ? "var(--accent-warm)" : "var(--accent)",
														stroke: "var(--background)",
														strokeWidth: 1.4 / transform.k
													})
												]
											}, p.id);
										})
									]
								})]
							}),
							tip ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "pointer-events-none absolute z-10 w-60 rounded-md border border-border bg-card p-3 text-xs shadow-[var(--shadow-lift)] backdrop-blur",
								style: {
									left: Math.min(tip.x + 14, size.w - 250),
									top: Math.min(tip.y + 14, size.h - 140)
								},
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "font-medium text-foreground",
										children: tip.title
									}),
									tip.subtitle ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 text-muted-foreground",
										children: tip.subtitle
									}) : null,
									tip.project ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 line-clamp-2 text-muted-foreground",
										children: tip.project.description
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-1.5 text-accent",
										children: [
											metricLabel,
											": ",
											tip.project.metrics[metric]
										]
									})] }) : null
								]
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "absolute bottom-3 left-3 right-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-[10px] uppercase tracking-[0.16em] text-muted-foreground",
										children: ["Low — High · ", metricLabel]
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
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "flex flex-col gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card/70 p-4 shadow-[var(--shadow-border)] backdrop-blur",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "font-display text-lg tracking-tight",
									children: selectedCountry ? countryProjects[0]?.country ?? "Selected country" : "All projects"
								}), selectedCountry ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: clearSelection,
									className: "text-xs text-muted-foreground hover:text-foreground",
									children: "Clear"
								}) : null]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-xs text-muted-foreground",
								children: selectedCountry ? `${countryProjects.length} mapped project${countryProjects.length === 1 ? "" : "s"}` : `${filtered.length} in current filter · click a country or pin`
							}),
							(selectedCountry ? countryProjects : filtered.slice(0, 8)).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => {
									setSelected(p);
									setSelectedCountry(String(p.countryId));
								},
								className: cn("mt-2 w-full rounded-lg border px-3 py-2 text-left transition-colors", selected?.id === p.id ? "border-accent/50 bg-accent-soft" : "border-border/70 bg-background/40 hover:border-border-strong"),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "min-w-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "truncate text-sm font-medium text-foreground",
											children: p.title
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "truncate text-[11px] text-muted-foreground",
											children: [
												repoName(p),
												" · ",
												p.category
											]
										})]
									}), p.featured ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono shrink-0 rounded-full bg-accent-warm/15 px-2 py-0.5 text-[10px] text-accent-warm",
										children: "★"
									}) : null]
								})
							}, p.id)),
							!filtered.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 text-sm text-muted-foreground",
								children: "No projects match this filter."
							}) : null,
							filtered.length > 8 && !selectedCountry ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-[11px] text-subtle",
								children: [
									"+",
									filtered.length - 8,
									" more — refine search or click the map"
								]
							}) : null
						]
					}), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-lift)]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-start justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.14em] text-muted-foreground",
									children: selected.country
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "mt-1 font-display text-xl tracking-tight",
									children: selected.title
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => setSelected(null),
									className: "text-sm text-muted-foreground",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" })
								})]
							}),
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
								className: "mt-3 text-sm leading-relaxed text-muted-foreground",
								children: selected.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-xs text-subtle",
								children: selected.technologies.join(" · ")
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mt-2 text-xs tabular-nums text-muted-foreground",
								children: [
									metricLabel,
									": ",
									selected.metrics[metric]
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-col gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
										to: "/projects/$id",
										params: { id: selected.id },
										children: ["View Project", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
									})
								}), selected.github ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									asChild: true,
									variant: "outline",
									className: "w-full",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: selected.github,
										target: "_blank",
										rel: "noreferrer",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, { className: "size-4" }), "GitHub repo"]
									})
								}) : null]
							})
						]
					}) : null]
				})]
			})
		]
	});
}
//#endregion
export { WorldMap, WorldMap as default };
