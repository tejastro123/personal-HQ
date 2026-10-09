import { Link } from "@tanstack/react-router";
import { geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import {
  ArrowUpRight,
  Github,
  Minus,
  Plus,
  RotateCcw,
  Search,
  Sparkles,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/reveal";
import { SectionStage } from "@/components/ui/section-stage";
import { DepthReveal } from "@/components/ui/depth";
import {
  categories,
  getProjectsByCountryId,
  mapMetrics,
  projects,
  type Category,
  type MapMetric,
  type Project,
} from "@/data/projects";
import { githubSnapshot, repoForProject } from "@/data/github-snapshot";
import { cn } from "@/lib/utils";

type CountryFeat = GeoJSON.Feature<GeoJSON.Geometry, { name: string }>;

const MIN_K = 0.85;
const MAX_K = 8;

const ARCH_NODES = [
  { id: "US", lngLat: [-98, 39] as [number, number] },
  { id: "IN", lngLat: [78, 22] as [number, number] },
  { id: "EU", lngLat: [10, 50] as [number, number] },
  { id: "JP", lngLat: [138, 36] as [number, number] },
  { id: "BR", lngLat: [-52, -10] as [number, number] },
  { id: "UK", lngLat: [-2, 54] as [number, number] },
];

function arcPath(
  a: [number, number],
  b: [number, number],
  project: (lngLat: [number, number]) => [number, number] | null,
) {
  const pa = project(a);
  const pb = project(b);
  if (!pa || !pb) return null;
  const mx = (pa[0] + pb[0]) / 2;
  const my = (pa[1] + pb[1]) / 2;
  const dx = pb[0] - pa[0];
  const dy = pb[1] - pa[1];
  const lift = Math.min(80, Math.hypot(dx, dy) * 0.22);
  return `M${pa[0]},${pa[1]} Q${mx},${my - lift} ${pb[0]},${pb[1]}`;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function colorAt(t: number, light: boolean) {
  const u = Math.max(0, Math.min(1, t));
  const from = light ? [231, 228, 220] : [22, 22, 28];
  const to = light ? [33, 86, 214] : [76, 141, 255];
  const rgb = from.map((v, i) => Math.round(lerp(v, to[i]!, u)));
  return `rgb(${rgb.join(",")})`;
}

function repoName(p: Project) {
  const snap = repoForProject(p.github);
  return snap?.name ?? p.github?.split("/").filter(Boolean).pop() ?? p.title;
}

export function WorldMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 960, h: 520 });
  const [countries, setCountries] = useState<CountryFeat[]>([]);
  const [metric, setMetric] = useState<MapMetric>("innovationScore");
  const [category, setCategory] = useState<Category>("All");
  const [query, setQuery] = useState("");
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    title: string;
    subtitle?: string;
    project?: Project;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [light, setLight] = useState(false);
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null);
  const pointers = useRef<Map<number, { x: number; y: number }>>(new Map());
  const pinch = useRef<{ dist: number; k: number } | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.max(320, r.width), h: Math.max(380, Math.round(r.width * 0.52)) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    setLight(document.documentElement.classList.contains("light"));
    const obs = new MutationObserver(() => {
      setLight(document.documentElement.classList.contains("light"));
    });
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetch("/data/countries-110m.json")
      .then((r) => {
        if (!r.ok) throw new Error("Map data failed to load");
        return r.json();
      })
      .then((topo: Topology) => {
        if (cancelled) return;
        const obj = topo.objects.countries;
        const fc = feature(topo, obj) as unknown as GeoJSON.FeatureCollection<
          GeoJSON.Geometry,
          { name: string }
        >;
        setCountries(fc.features as CountryFeat[]);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Map failed");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const projection = useMemo(() => {
    const p = geoNaturalEarth1();
    if (!countries.length) {
      p.translate([size.w / 2, size.h / 2]).scale(Math.min(size.w, size.h) / 4.2);
      return p;
    }
    const collection: GeoJSON.FeatureCollection = {
      type: "FeatureCollection",
      features: countries,
    };
    p.fitExtent(
      [
        [16, 24],
        [size.w - 16, size.h - 16],
      ],
      collection,
    );
    return p;
  }, [countries, size.w, size.h]);

  const path = useMemo(() => geoPath(projection as GeoProjection), [projection]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return projects.filter((p) => {
      if (category !== "All" && p.category !== category) return false;
      if (!q) return true;
      const hay = [
        p.title,
        p.category,
        p.country,
        p.status,
        p.github ?? "",
        ...p.technologies,
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  /** Aggregate filtered projects by country for heat + badges. */
  const byCountry = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of filtered) {
      const key = String(p.countryId);
      const list = map.get(key) ?? [];
      list.push(p);
      map.set(key, list);
    }
    return map;
  }, [filtered]);

  const domain = useMemo(() => {
    const vals = filtered.map((p) => p.metrics[metric]);
    if (!vals.length) return [0, 1] as const;
    return [Math.min(...vals, 0), Math.max(...vals, 1)] as const;
  }, [filtered, metric]);

  const metricLabel = mapMetrics.find((m) => m.id === metric)?.label ?? metric;

  const markers = useMemo(() => {
    return filtered.map((p) => {
      const pt = projection(p.countryLngLat ?? [0, 0]);
      return { project: p, x: pt?.[0] ?? -999, y: pt?.[1] ?? -999 };
    });
  }, [filtered, projection]);

  /** Nudge overlapping same-country markers into a small ring. */
  const markerPositions = useMemo(() => {
    const groups = new Map<string, { project: Project; x: number; y: number }[]>();
    for (const m of markers) {
      if (m.x < 0) continue;
      const key = String(m.project.countryId);
      const list = groups.get(key) ?? [];
      list.push(m);
      groups.set(key, list);
    }
    const out = new Map<string, { project: Project; x: number; y: number }>();
    for (const [, list] of groups) {
      if (list.length === 1) {
        out.set(list[0]!.project.id, list[0]!);
        continue;
      }
      list.forEach((m, i) => {
        const a = (i / list.length) * Math.PI * 2;
        const r = 7 + (i % 3) * 2.5;
        out.set(m.project.id, {
          project: m.project,
          x: m.x + Math.cos(a) * r * 0.35,
          y: m.y + Math.sin(a) * r * 0.35,
        });
      });
    }
    return out;
  }, [markers]);

  const stats = useMemo(() => {
    const countriesCount = byCountry.size;
    const repos = filtered.filter((p) => p.github).length;
    const featured = filtered.filter((p) => p.featured).length;
    return { total: filtered.length, countriesCount, repos, featured };
  }, [filtered, byCountry]);

  const applyZoom = useCallback((nextK: number, cx: number, cy: number) => {
    setTransform((t) => {
      const k = Math.max(MIN_K, Math.min(MAX_K, nextK));
      const ratio = k / t.k;
      return {
        k,
        x: cx - (cx - t.x) * ratio,
        y: cy - (cy - t.y) * ratio,
      };
    });
  }, []);

  function onWheel(e: React.WheelEvent) {
    e.preventDefault();
    const rect = wrap.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const factor = Math.exp(-e.deltaY * 0.0015);
    applyZoom(transform.k * factor, cx, cy);
  }

  function onPointerDown(e: React.PointerEvent) {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 1) {
      drag.current = { x: e.clientX, y: e.clientY, tx: transform.x, ty: transform.y };
    } else if (pointers.current.size === 2) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0]!.x - pts[1]!.x, pts[0]!.y - pts[1]!.y);
      pinch.current = { dist, k: transform.k };
      drag.current = null;
    }
  }

  function onPointerMove(e: React.PointerEvent) {
    if (!pointers.current.has(e.pointerId)) return;
    pointers.current.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.current.size === 2 && pinch.current) {
      const pts = [...pointers.current.values()];
      const dist = Math.hypot(pts[0]!.x - pts[1]!.x, pts[0]!.y - pts[1]!.y);
      const rect = wrap.current?.getBoundingClientRect();
      const cx = rect ? (pts[0]!.x + pts[1]!.x) / 2 - rect.left : size.w / 2;
      const cy = rect ? (pts[0]!.y + pts[1]!.y) / 2 - rect.top : size.h / 2;
      applyZoom((pinch.current.k * dist) / pinch.current.dist, cx, cy);
      return;
    }
    if (drag.current && pointers.current.size === 1) {
      setTransform((t) => ({
        ...t,
        x: drag.current!.tx + (e.clientX - drag.current!.x),
        y: drag.current!.ty + (e.clientY - drag.current!.y),
      }));
    }
  }

  function onPointerUp(e: React.PointerEvent) {
    pointers.current.delete(e.pointerId);
    if (pointers.current.size < 2) pinch.current = null;
    if (pointers.current.size === 0) drag.current = null;
  }

  function selectCountry(countryId: string) {
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

  const countryProjects = selectedCountry
    ? filtered.filter((p) => String(p.countryId) === selectedCountry)
    : [];

  return (
    <SectionStage id="world" variant="cool">
      <DepthReveal rotate={5}>
        <div className="section-heading-hud flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Where my ideas live."
            title="Projects Around the World"
            subtitle="Every mapped GitHub repo — filter by category, search tech, click a country to open its project stack."
          />
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="accent">
              <Sparkles className="mr-1 size-3" />
              {githubSnapshot.user?.publicRepos ?? projects.length} public repos
            </Badge>
            <Badge>{stats.countriesCount} countries</Badge>
          </div>
        </div>
      </DepthReveal>

      {/* Toolbar */}
      <div className="mt-8 flex flex-col gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {mapMetrics.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setMetric(m.id)}
                className={cn(
                  "h-9 rounded-full border px-3.5 text-xs transition-colors duration-150 sm:text-sm",
                  metric === m.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-card text-muted-foreground hover:text-foreground",
                )}
              >
                {m.label}
              </button>
            ))}
          </div>
          <div className="relative w-full max-w-xs">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, tech, repos…"
              className="h-10 w-full rounded-full border border-border bg-card pl-9 pr-9 text-sm text-foreground shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-subtle hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="size-3.5" />
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3 py-1 text-xs transition-colors duration-150",
                category === c
                  ? "border-accent bg-accent-soft text-accent"
                  : "border-border bg-card/60 text-muted-foreground hover:text-foreground",
              )}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Stats strip */}
      <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {[
          { label: "Projects shown", value: stats.total },
          { label: "Countries", value: stats.countriesCount },
          { label: "With GitHub", value: stats.repos },
          { label: "Featured", value: stats.featured },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border/80 bg-card/50 px-3 py-2.5 backdrop-blur"
          >
            <p className="mono text-lg tabular-nums text-foreground">{s.value}</p>
            <p className="text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
              {s.label}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[1fr_20rem]">
        {/* Map */}
        <div className="relative">
          <div
            ref={wrap}
            className="relative overflow-hidden rounded-xl border border-border bg-background-secondary touch-none"
            style={{ height: size.h }}
            onWheel={onWheel}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            role="application"
            aria-label="Interactive world map of projects"
          >
            {error ? (
              <p className="p-6 text-sm text-status">{error}</p>
            ) : (
              <svg width={size.w} height={size.h} className="block h-full w-full">
                <defs>
                  <radialGradient id="mapGlow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
                  </radialGradient>
                </defs>
                <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
                  {countries.map((f, i) => {
                    const id = String(f.id ?? i);
                    const name = f.properties?.name ?? "Unknown";
                    const list = byCountry.get(id) ?? [];
                    const avg = list.length
                      ? list.reduce((s, p) => s + p.metrics[metric], 0) / list.length
                      : 0;
                    const t =
                      domain[1] === domain[0] ? 0 : (avg - domain[0]) / (domain[1] - domain[0]);
                    const d = path(f) ?? "";
                    const active = selectedCountry === id;
                    return (
                      <path
                        key={id}
                        d={d}
                        fill={
                          list.length
                            ? colorAt(list.length > 1 ? Math.min(1, 0.45 + t * 0.55) : t, light)
                            : colorAt(0.05, light)
                        }
                        stroke={
                          active
                            ? "var(--accent)"
                            : list.length
                              ? "color-mix(in oklab, var(--accent) 35%, var(--border))"
                              : "var(--background)"
                        }
                        strokeWidth={active ? 1.8 / transform.k : list.length ? 0.7 / transform.k : 0.4 / transform.k}
                        className="cursor-pointer"
                        onPointerEnter={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect) return;
                          setTip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            title: name,
                            subtitle: list.length
                              ? `${list.length} project${list.length === 1 ? "" : "s"} · ${metricLabel} ${Math.round(avg)}`
                              : "No projects mapped",
                          });
                        }}
                        onPointerMove={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect) return;
                          setTip((prev) =>
                            prev
                              ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }
                              : prev,
                          );
                        }}
                        onPointerLeave={() => setTip(null)}
                        onClick={() => list.length && selectCountry(id)}
                      />
                    );
                  })}
                  {(() => {
                    const project = (lngLat: [number, number]) => projection(lngLat);
                    const edges: [string, string][] = [
                      ["US", "IN"],
                      ["US", "EU"],
                      ["IN", "JP"],
                      ["EU", "JP"],
                      ["US", "BR"],
                      ["IN", "EU"],
                      ["UK", "IN"],
                      ["US", "UK"],
                    ];
                    return edges.map(([from, to]) => {
                      const a = ARCH_NODES.find((n) => n.id === from);
                      const b = ARCH_NODES.find((n) => n.id === to);
                      if (!a || !b) return null;
                      const d = arcPath(a.lngLat, b.lngLat, project);
                      if (!d) return null;
                      return (
                        <path
                          key={`${from}-${to}`}
                          d={d}
                          fill="none"
                          stroke="var(--accent)"
                          strokeWidth={1 / transform.k}
                          strokeLinecap="round"
                          className="map-arc"
                          opacity={0.4}
                        />
                      );
                    });
                  })()}
                  {[...markerPositions.values()].map(({ project: p, x, y }) => {
                    const active = selected?.id === p.id;
                    return (
                      <g
                        key={p.id}
                        transform={`translate(${x}, ${y})`}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelected(p);
                          setSelectedCountry(String(p.countryId));
                        }}
                        onPointerEnter={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect) return;
                          setTip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            title: p.title,
                            subtitle: `${repoName(p)} · ${p.country}`,
                            project: p,
                          });
                        }}
                        onPointerLeave={() => setTip(null)}
                      >
                        <circle r={10 / transform.k} fill="url(#mapGlow)" opacity={0.55} />
                        {active ? (
                          <circle
                            r={12 / transform.k}
                            fill="none"
                            stroke="var(--accent)"
                            strokeWidth={1.2 / transform.k}
                            className="map-ping"
                          />
                        ) : null}
                        <circle
                          r={(active ? 5.5 : 3.8) / transform.k}
                          fill={p.featured ? "var(--accent-warm)" : "var(--accent)"}
                          stroke="var(--background)"
                          strokeWidth={1.4 / transform.k}
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}

            {tip ? (
              <div
                className="pointer-events-none absolute z-10 w-60 rounded-md border border-border bg-card p-3 text-xs shadow-[var(--shadow-lift)] backdrop-blur"
                style={{
                  left: Math.min(tip.x + 14, size.w - 250),
                  top: Math.min(tip.y + 14, size.h - 140),
                }}
              >
                <p className="font-medium text-foreground">{tip.title}</p>
                {tip.subtitle ? (
                  <p className="mt-1 text-muted-foreground">{tip.subtitle}</p>
                ) : null}
                {tip.project ? (
                  <>
                    <p className="mt-1 line-clamp-2 text-muted-foreground">
                      {tip.project.description}
                    </p>
                    <p className="mt-1.5 text-accent">{metricLabel}: {tip.project.metrics[metric]}</p>
                  </>
                ) : null}
              </div>
            ) : null}

            <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Low — High · {metricLabel}
                </p>
                <div
                  className="mt-1 h-2 w-40 rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${colorAt(0, light)}, ${colorAt(1, light)})`,
                  }}
                />
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="subtle"
                  aria-label="Zoom in"
                  onClick={() => applyZoom(transform.k * 1.3, size.w / 2, size.h / 2)}
                >
                  <Plus />
                </Button>
                <Button
                  size="icon"
                  variant="subtle"
                  aria-label="Zoom out"
                  onClick={() => applyZoom(transform.k / 1.3, size.w / 2, size.h / 2)}
                >
                  <Minus />
                </Button>
                <Button
                  size="sm"
                  variant="subtle"
                  onClick={() => setTransform({ x: 0, y: 0, k: 1 })}
                >
                  <RotateCcw />
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Side rail: country stack + project list */}
        <aside className="flex flex-col gap-3">
          <div className="rounded-xl border border-border bg-card/70 p-4 shadow-[var(--shadow-border)] backdrop-blur">
            <div className="flex items-center justify-between gap-2">
              <h3 className="font-display text-lg tracking-tight">
                {selectedCountry
                  ? countryProjects[0]?.country ?? "Selected country"
                  : "All projects"}
              </h3>
              {selectedCountry ? (
                <button
                  type="button"
                  onClick={clearSelection}
                  className="text-xs text-muted-foreground hover:text-foreground"
                >
                  Clear
                </button>
              ) : null}
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {selectedCountry
                ? `${countryProjects.length} mapped project${countryProjects.length === 1 ? "" : "s"}`
                : `${filtered.length} in current filter · click a country or pin`}
            </p>

            {(selectedCountry ? countryProjects : filtered.slice(0, 8)).map((p) => (
              <button
                key={p.id}
                type="button"
                onClick={() => {
                  setSelected(p);
                  setSelectedCountry(String(p.countryId));
                }}
                className={cn(
                  "mt-2 w-full rounded-lg border px-3 py-2 text-left transition-colors",
                  selected?.id === p.id
                    ? "border-accent/50 bg-accent-soft"
                    : "border-border/70 bg-background/40 hover:border-border-strong",
                )}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-foreground">{p.title}</p>
                    <p className="truncate text-[11px] text-muted-foreground">
                      {repoName(p)} · {p.category}
                    </p>
                  </div>
                  {p.featured ? (
                    <span className="mono shrink-0 rounded-full bg-accent-warm/15 px-2 py-0.5 text-[10px] text-accent-warm">
                      ★
                    </span>
                  ) : null}
                </div>
              </button>
            ))}
            {!filtered.length ? (
              <p className="mt-3 text-sm text-muted-foreground">No projects match this filter.</p>
            ) : null}
            {filtered.length > 8 && !selectedCountry ? (
              <p className="mt-2 text-[11px] text-subtle">
                +{filtered.length - 8} more — refine search or click the map
              </p>
            ) : null}
          </div>

          {selected ? (
            <div className="rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-lift)]">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                    {selected.country}
                  </p>
                  <h4 className="mt-1 font-display text-xl tracking-tight">{selected.title}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="text-sm text-muted-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                <Badge>{selected.category}</Badge>
                <Badge>{selected.status}</Badge>
                <span className="text-xs tabular-nums text-subtle">{selected.year}</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {selected.description}
              </p>
              <p className="mt-2 text-xs text-subtle">{selected.technologies.join(" · ")}</p>
              <p className="mt-2 text-xs tabular-nums text-muted-foreground">
                {metricLabel}: {selected.metrics[metric]}
              </p>
              <div className="mt-4 flex flex-col gap-2">
                <Button asChild className="w-full">
                  <Link to="/projects/$id" params={{ id: selected.id }}>
                    View Project
                    <ArrowUpRight />
                  </Link>
                </Button>
                {selected.github ? (
                  <Button asChild variant="outline" className="w-full">
                    <a href={selected.github} target="_blank" rel="noreferrer">
                      <Github className="size-4" />
                      GitHub repo
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}
        </aside>
      </div>
    </SectionStage>
  );
}

export default WorldMap;
