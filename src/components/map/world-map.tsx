import { Link } from "@tanstack/react-router";
import { geoNaturalEarth1, geoPath, type GeoProjection } from "d3-geo";
import { ArrowUpRight, Minus, Plus, RotateCcw } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { feature } from "topojson-client";
import type { Topology } from "topojson-specification";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal, SectionHeading } from "@/components/reveal";
import {
  getProjectByCountryId,
  mapMetrics,
  projects,
  type MapMetric,
  type Project,
} from "@/data/projects";
import { cn } from "@/lib/utils";

type CountryFeat = GeoJSON.Feature<GeoJSON.Geometry, { name: string }>;

type TooltipState = {
  x: number;
  y: number;
  name: string;
  project?: Project;
  metricLabel: string;
  metricValue: number;
};

const MIN_K = 0.85;
const MAX_K = 8;

const ARCH_NODES = [
  { id: "US", lngLat: [-98, 39] as [number, number] },
  { id: "IN", lngLat: [78, 22] as [number, number] },
  { id: "EU", lngLat: [10, 50] as [number, number] },
  { id: "JP", lngLat: [138, 36] as [number, number] },
  { id: "BR", lngLat: [-52, -10] as [number, number] },
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

function metricValue(project: Project | undefined, metric: MapMetric) {
  if (!project) return 0;
  return project.metrics[metric];
}

export function WorldMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 960, h: 520 });
  const [countries, setCountries] = useState<CountryFeat[]>([]);
  const [metric, setMetric] = useState<MapMetric>("innovationScore");
  const [transform, setTransform] = useState({ x: 0, y: 0, k: 1 });
  const [selected, setSelected] = useState<Project | null>(null);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [tip, setTip] = useState<TooltipState | null>(null);
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
      setSize({ w: Math.max(320, r.width), h: Math.max(360, Math.round(r.width * 0.55)) });
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

  const domain = useMemo(() => {
    const vals = projects.map((p) => p.metrics[metric]);
    return [Math.min(...vals, 0), Math.max(...vals, 1)] as const;
  }, [metric]);

  const metricLabel = mapMetrics.find((m) => m.id === metric)?.label ?? metric;

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

  function selectCountry(f: CountryFeat, name: string) {
    const id = String(f.id ?? "");
    const project = getProjectByCountryId(id);
    setSelected(project ?? null);
    setSelectedName(name);
  }

  const markers = projects.filter((p) => p.countryLngLat);

  return (
    <section id="world" className="scroll-mt-24 border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Where my ideas live."
              title="Projects Around the World"
              subtitle="Explore the projects, technologies, and research behind my work — mapped from real GitHub repos on this site."
            />
            <Badge variant="accent">Real project</Badge>
          </div>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2">
          {mapMetrics.map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMetric(m.id)}
              className={cn(
                "h-10 rounded-full border px-4 text-sm transition-colors duration-150",
                metric === m.id
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-card text-muted-foreground hover:text-foreground",
              )}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="relative mt-6">
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
            aria-label="Interactive world map"
          >
            {error ? (
              <p className="p-6 text-sm text-status">{error}</p>
            ) : (
              <svg width={size.w} height={size.h} className="block h-full w-full">
                <g transform={`translate(${transform.x} ${transform.y}) scale(${transform.k})`}>
                  {countries.map((f, i) => {
                    const id = String(f.id ?? i);
                    const name = f.properties?.name ?? "Unknown";
                    const project = getProjectByCountryId(id);
                    const v = metricValue(project, metric);
                    const t =
                      domain[1] === domain[0] ? 0 : (v - domain[0]) / (domain[1] - domain[0]);
                    const d = path(f) ?? "";
                    const active = selectedName === name;
                    return (
                      <path
                        key={id}
                        d={d}
                        fill={project ? colorAt(t, light) : colorAt(0.06, light)}
                        stroke={active ? "var(--foreground)" : "var(--background)"}
                        strokeWidth={active ? 1.6 / transform.k : 0.4 / transform.k}
                        className="cursor-pointer"
                        onPointerEnter={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect) return;
                          setTip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            name,
                            project,
                            metricLabel,
                            metricValue: v,
                          });
                        }}
                        onPointerMove={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect || !tip) return;
                          setTip((prev) =>
                            prev
                              ? { ...prev, x: e.clientX - rect.left, y: e.clientY - rect.top }
                              : prev,
                          );
                        }}
                        onPointerLeave={() => setTip(null)}
                        onClick={() => selectCountry(f, name)}
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
                          strokeWidth={1.1 / transform.k}
                          strokeLinecap="round"
                          className="map-arc"
                          opacity={0.55}
                        />
                      );
                    });
                  })()}
                  {markers.map((p) => {
                    const pt = projection(p.countryLngLat!);
                    if (!pt) return null;
                    const active = selected?.id === p.id;
                    return (
                      <g
                        key={p.id}
                        transform={`translate(${pt[0]}, ${pt[1]})`}
                        className="cursor-pointer"
                        onClick={() => {
                          setSelected(p);
                          setSelectedName(p.country);
                        }}
                        onPointerEnter={(e) => {
                          const rect = wrap.current?.getBoundingClientRect();
                          if (!rect) return;
                          setTip({
                            x: e.clientX - rect.left,
                            y: e.clientY - rect.top,
                            name: p.country,
                            project: p,
                            metricLabel,
                            metricValue: p.metrics[metric],
                          });
                        }}
                        onPointerLeave={() => setTip(null)}
                      >
                        <circle
                          r={active ? 7 / transform.k : 5 / transform.k}
                          fill="var(--accent)"
                          stroke="var(--background)"
                          strokeWidth={1.5 / transform.k}
                        />
                      </g>
                    );
                  })}
                </g>
              </svg>
            )}

            {tip ? (
              <div
                className="pointer-events-none absolute z-10 w-56 rounded-md border border-border bg-card p-3 text-xs shadow-[var(--shadow-lift)]"
                style={{
                  left: Math.min(tip.x + 14, size.w - 230),
                  top: Math.min(tip.y + 14, size.h - 120),
                }}
              >
                <p className="font-medium text-foreground">{tip.name}</p>
                <p className="mt-1 text-muted-foreground">
                  {tip.project ? tip.project.title : "No project mapped"}
                </p>
                {tip.project ? (
                  <>
                    <p className="mt-1 text-subtle">{tip.project.category}</p>
                    <p className="mt-1 tabular-nums text-foreground">
                      {tip.metricLabel}: {tip.metricValue}
                    </p>
                    <p className="mt-1 line-clamp-2 text-muted-foreground">
                      {tip.project.description}
                    </p>
                  </>
                ) : null}
              </div>
            ) : null}

            <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div className="rounded-md border border-border bg-card/90 px-3 py-2 backdrop-blur">
                <p className="text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Low — High
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

          {selectedName ? (
            <aside
              className={cn(
                "z-20 border border-border bg-card shadow-[var(--shadow-lift)]",
                "fixed inset-x-0 bottom-0 max-h-[70dvh] overflow-auto rounded-t-xl p-5",
                "md:absolute md:inset-y-3 md:right-3 md:bottom-auto md:left-auto md:max-h-[calc(100%-24px)] md:w-[22rem] md:rounded-xl",
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
                    {selectedName}
                  </p>
                  <h3 className="mt-1 font-display text-2xl tracking-tight">
                    {selected?.title ?? "No project mapped"}
                  </h3>
                </div>
                <button
                  type="button"
                  className="text-sm text-muted-foreground"
                  onClick={() => {
                    setSelected(null);
                    setSelectedName(null);
                  }}
                >
                  Close
                </button>
              </div>
              {selected ? (
                <>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Badge>{selected.category}</Badge>
                    <Badge>{selected.status}</Badge>
                    <span className="text-xs tabular-nums text-subtle">{selected.year}</span>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {selected.description}
                  </p>
                  <p className="mt-3 text-xs text-subtle">{selected.technologies.join(" · ")}</p>
                  <p className="mt-3 text-xs tabular-nums text-muted-foreground">
                    {metricLabel}: {selected.metrics[metric]}
                  </p>
                  <Button asChild className="mt-6 w-full">
                    <Link to="/projects/$id" params={{ id: selected.id }}>
                      View Project
                      <ArrowUpRight />
                    </Link>
                  </Button>
                </>
              ) : (
                <p className="mt-4 text-sm text-muted-foreground">
                  This country has no project mapped yet.
                </p>
              )}
            </aside>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export default WorldMap;
