import { Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { categoryDot } from "@/lib/categories";
import { projects, type Project } from "@/data/projects";

type Node = {
  id: string;
  title: string;
  category: string;
  featured: boolean;
  degree: number;
};

type SimNode = Node & { x: number; y: number; vx: number; vy: number };

const MAX_NODES = 48;
const VIEW_W = 640;
const VIEW_H = 360;

function buildGraph() {
  const featured = projects.filter((p) => p.featured || p.related.length > 0);
  const list = featured.slice(0, MAX_NODES);
  const idSet = new Set(list.map((p) => p.id));
  const nodes: SimNode[] = list.map((p, i) => {
    const angle = (i / list.length) * Math.PI * 2;
    return {
      id: p.id,
      title: p.title,
      category: p.category,
      featured: p.featured,
      degree: p.related.filter((r) => idSet.has(r)).length,
      x: Math.cos(angle) * 180 + 200,
      y: Math.sin(angle) * 140 + 160,
      vx: 0,
      vy: 0,
    };
  });
  const index = new Map(nodes.map((n) => [n.id, n]));
  const edges: { source: string; target: string }[] = [];
  for (const p of list) {
    for (const r of p.related) {
      if (!index.has(r)) continue;
      if (p.id === r) continue;
      edges.push({ source: p.id, target: r });
    }
  }
  return { nodes, edges, byId: index };
}

function categoryFill(category: string) {
  return categoryDot(category).backgroundColor;
}

export function TopologyPage() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [, setTick] = useState(0);
  const simRef = useRef(buildGraph());
  const nodesRef = useRef<SimNode[]>(simRef.current.nodes);
  const [hover, setHover] = useState<string | null>(null);
  const [view, setView] = useState({ x: 0, y: 0, k: 1 });
  const dragRef = useRef<{ x: number; y: number; vx: number; vy: number } | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return simRef.current.nodes;
    return simRef.current.nodes.filter(
      (n) => n.title.toLowerCase().includes(q) || n.category.toLowerCase().includes(q),
    );
  }, [query]);

  const categories = useMemo(() => {
    const set = new Set(simRef.current.nodes.map((n) => n.category));
    return [...set].sort();
  }, []);

  const projectById = useCallback((id: string): Project | undefined => {
    return projects.find((p) => p.id === id);
  }, []);

  useEffect(() => {
    let raf = 0;
    const step = () => {
      const nodes = nodesRef.current;
      const { edges } = simRef.current;
      const w = VIEW_W;
      const h = VIEW_H;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]!;
          const b = nodes[j]!;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const dist2 = dx * dx + dy * dy + 0.01;
          const dist = Math.sqrt(dist2);
          const rep = 900 / dist2;
          const fx = (dx / dist) * rep;
          const fy = (dy / dist) * rep;
          a.vx -= fx * 0.02;
          a.vy -= fy * 0.02;
          b.vx += fx * 0.02;
          b.vy += fy * 0.02;
        }
        const a = nodes[i]!;
        a.vx += (w / 2 - a.x) * 0.0008;
        a.vy += (h / 2 - a.y) * 0.0008;
        a.vx *= 0.86;
        a.vy *= 0.86;
        a.x += a.vx;
        a.y += a.vy;
        a.x = Math.max(24, Math.min(w - 24, a.x));
        a.y = Math.max(24, Math.min(h - 24, a.y));
      }
      for (const e of edges) {
        const a = nodes.find((n) => n.id === e.source);
        const b = nodes.find((n) => n.id === e.target);
        if (!a || !b) continue;
        const dx = b.x - a.x;
        const dy = b.y - a.y;
        const dist = Math.hypot(dx, dy) + 0.01;
        const target = 70;
        const f = (dist - target) * 0.01;
        const fx = (dx / dist) * f;
        const fy = (dy / dist) * f;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
      if (dragRef.current) {
        const d = dragRef.current;
        d.x = (d.x + d.vx) as number;
        d.y = (d.y + d.vy) as number;
      }
      setTick((t) => (t + 1) % 100000);
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    setView((v) => {
      const k = Math.min(2.5, Math.max(0.5, v.k * (e.deltaY > 0 ? 0.92 : 1.08)));
      return { ...v, k };
    });
  }, []);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<SVGSVGElement>) => {
      const svg = svgRef.current;
      if (!svg) return;
      svg.setPointerCapture(e.pointerId);
      dragRef.current = { x: view.x, y: view.y, vx: 0, vy: 0 };
      const start = { x: e.clientX, y: e.clientY, vx: view.x, vy: view.y };
      const move = (ev: PointerEvent) => {
        if (!dragRef.current) return;
        dragRef.current.vx = start.vx + (ev.clientX - start.x);
        dragRef.current.vy = start.vy + (ev.clientY - start.y);
        setView((v) => ({
          ...v,
          x: start.vx + (ev.clientX - start.x),
          y: start.vy + (ev.clientY - start.y),
        }));
      };
      const up = () => {
        dragRef.current = null;
        window.removeEventListener("pointermove", move);
        window.removeEventListener("pointerup", up);
      };
      window.addEventListener("pointermove", move);
      window.addEventListener("pointerup", up);
    },
    [view.x, view.y],
  );

  const resetView = useCallback(() => setView({ x: 0, y: 0, k: 1 }), []);

  const selectedProject = selected ? projectById(selected) : undefined;

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Graph</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight">Project topology</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Force-directed view of related work. Drag to pan, scroll to zoom, click a node for detail —
          the graph is a lens, not the only interface.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
          <div className="min-w-0 rounded-xl border border-border bg-card p-3">
            <div className="flex flex-wrap items-center gap-2">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search title or category…"
                className="h-9 min-w-[12rem] flex-1 rounded-md border border-border bg-background px-3 text-sm outline-none placeholder:text-subtle"
                aria-label="Filter projects"
              />
              <span className="mono text-[11px] text-subtle">{filtered.length} nodes</span>
              <button
                type="button"
                onClick={resetView}
                className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-muted-foreground hover:border-border-strong hover:text-foreground"
              >
                Reset view
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {categories.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2 py-0.5 text-[10px] text-muted-foreground"
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: categoryFill(c) }}
                  />
                  {c}
                </span>
              ))}
            </div>
            <svg
              ref={svgRef}
              viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
              className="mt-3 aspect-[16/9] w-full touch-none rounded-lg bg-[#08080b]"
              role="img"
              aria-label="Project relationship graph"
              onWheel={onWheel}
              onPointerDown={onPointerDown}
              style={{ cursor: dragRef.current ? "grabbing" : "grab" }}
            >
              <g transform={`translate(${view.x},${view.y}) scale(${view.k})`}>
                {simRef.current.edges.map((e) => {
                  const a = nodesRef.current.find((n) => n.id === e.source);
                  const b = nodesRef.current.find((n) => n.id === e.target);
                  if (!a || !b) return null;
                  const active =
                    hover === e.source ||
                    hover === e.target ||
                    selected === e.source ||
                    selected === e.target;
                  return (
                    <line
                      key={`${e.source}-${e.target}`}
                      x1={a.x}
                      y1={a.y}
                      x2={b.x}
                      y2={b.y}
                      stroke={active ? "rgba(76,141,255,0.55)" : "#2a2a32"}
                      strokeWidth={active ? 1.5 : 1}
                    />
                  );
                })}
                {nodesRef.current.map((n) => {
                  const active = hover === n.id || selected === n.id;
                  const match = filtered.some((f) => f.id === n.id);
                  const fill = categoryFill(n.category);
                  return (
                    <g
                      key={n.id}
                      transform={`translate(${n.x},${n.y})`}
                      opacity={match ? 1 : 0.15}
                      onMouseEnter={() => setHover(n.id)}
                      onMouseLeave={() => setHover(null)}
                      onClick={() => setSelected(n.id)}
                      style={{ cursor: "pointer" }}
                    >
                      {active ? (
                        <circle r={16} fill={fill} opacity={0.18} />
                      ) : null}
                      <circle
                        r={active ? 11 : n.featured ? 8 : 5.5}
                        fill={fill}
                        fillOpacity={active ? 0.95 : n.featured ? 0.75 : 0.55}
                        stroke={active ? "#fbbf24" : fill}
                        strokeWidth={active ? 2 : 1.5}
                      />
                      {(active || n.featured) && (
                        <text
                          y={-16}
                          textAnchor="middle"
                          className="fill-foreground"
                          fontSize={10}
                          fontFamily="ui-monospace, monospace"
                        >
                          {n.title}
                        </text>
                      )}
                    </g>
                  );
                })}
              </g>
            </svg>
            <p className="mt-2 text-[11px] text-subtle">
              Force layout in React · wheel zoom · drag pan · category colors match the rest of the
              site.
            </p>
          </div>

          <aside className="rounded-xl border border-border bg-card p-5">
            <h2 className="font-display text-xl tracking-tight">
              {selectedProject ? selectedProject.title : "Node detail"}
            </h2>
            {selectedProject ? (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  {selectedProject.description}
                </p>
                <p className="mono mt-3 flex items-center gap-2 text-xs text-subtle">
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: categoryFill(selectedProject.category) }}
                  />
                  {selectedProject.category}
                </p>
                <Link
                  to="/projects/$id"
                  params={{ id: selectedProject.id }}
                  className="mt-4 inline-flex h-9 items-center rounded-md border border-accent bg-accent-soft px-3 text-xs font-medium text-accent"
                >
                  Open case study
                </Link>
              </>
            ) : (
              <p className="mt-2 text-sm text-muted-foreground">
                Hover or click a node. Selected project details appear here.
              </p>
            )}
            <h3 className="mt-6 text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Featured nodes
            </h3>
            <ul className="mt-3 max-h-64 space-y-1 overflow-auto">
              {simRef.current.nodes.map((n) => (
                <li key={n.id}>
                  <button
                    type="button"
                    onClick={() => setSelected(n.id)}
                    className={
                      selected === n.id
                        ? "flex w-full items-center gap-2 rounded-md border border-accent bg-accent-soft px-2 py-1.5 text-left text-xs text-accent"
                        : "flex w-full items-center gap-2 rounded-md border border-transparent px-2 py-1.5 text-left text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                    }
                  >
                    <span
                      className="size-2 shrink-0 rounded-full"
                      style={{ backgroundColor: categoryFill(n.category) }}
                    />
                    <span className="truncate">{n.title}</span>
                    <span className="ml-auto shrink-0 text-subtle">{n.category}</span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl tracking-tight">Accessible list</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Same graph as a navigable table — required for screen readers and low-power devices.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Project</th>
                  <th className="py-2 pr-4 font-medium">Category</th>
                  <th className="py-2 pr-4 font-medium">Degree</th>
                  <th className="py-2 font-medium">Related</th>
                </tr>
              </thead>
              <tbody>
                {simRef.current.nodes.map((n) => (
                  <tr key={n.id} className="border-b border-border/50">
                    <td className="py-2 pr-4">
                      <Link
                        to="/projects/$id"
                        params={{ id: n.id }}
                        className="inline-flex items-center gap-2 text-foreground hover:text-accent"
                      >
                        <span
                          className="size-2 rounded-full"
                          style={{ backgroundColor: categoryFill(n.category) }}
                        />
                        {n.title}
                      </Link>
                    </td>
                    <td className="py-2 pr-4 text-muted-foreground">{n.category}</td>
                    <td className="py-2 pr-4 tabular-nums text-muted-foreground">{n.degree}</td>
                    <td className="py-2 text-subtle">
                      {projectById(n.id)?.related.join(", ") || "—"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

export default TopologyPage;
