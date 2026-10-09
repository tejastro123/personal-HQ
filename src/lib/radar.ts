import { projects } from "@/data/projects";

export type TechRadarAxis = {
  id: string;
  label: string;
  count: number;
  /** 0–100 normalized for chart. */
  score: number;
  categories: { category: string; count: number }[];
};

const AXIS_DEFS: { id: string; label: string; match: (t: string) => boolean }[] = [
  { id: "quantum", label: "Quantum", match: (t) => /quantum|qiskit|qucpl|openqasm|ibm/i.test(t) },
  { id: "ai", label: "AI / LLM", match: (t) => /rag|llm|agent|gpt|ml|ai|ollama|nlp|transformer/i.test(t) },
  { id: "python", label: "Python", match: (t) => /python|pandas|numpy|fastapi|flask|django/i.test(t) },
  { id: "web", label: "Web", match: (t) => /react|typescript|javascript|tanstack|next|vite|html|css|node/i.test(t) },
  { id: "data", label: "Data", match: (t) => /data|sql|postgres|pgvector|mongo|redis|pandas|visualization|jupyter/i.test(t) },
  { id: "quant", label: "Quant", match: (t) => /stock|backtest|finance|monte|quant|yfinance|pandas/i.test(t) },
  { id: "3d", label: "3D / Sim", match: (t) => /three|rapier|webgl|simulation|physics|d3/i.test(t) },
  { id: "systems", label: "Systems", match: (t) => /api|docker|linux|cli|fastapi|express|node|postgres|cache/i.test(t) },
];

export function computeTechRadar(): TechRadarAxis[] {
  return AXIS_DEFS.map((axis) => {
    const byCat = new Map<string, number>();
    let count = 0;
    for (const p of projects) {
      const hits = p.technologies.filter((t) => axis.match(t));
      if (hits.length) {
        count += 1;
        byCat.set(p.category, (byCat.get(p.category) ?? 0) + 1);
      }
    }
    return {
      id: axis.id,
      label: axis.label,
      count,
      score: Math.round((count / Math.max(projects.length, 1)) * 100),
      categories: [...byCat.entries()]
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4)
        .map(([category, c]) => ({ category, count: c })),
    };
  }).sort((a, b) => b.count - a.count);
}

export function topTechnologies(limit = 16) {
  const counts = new Map<string, number>();
  for (const p of projects) {
    for (const t of p.technologies) {
      counts.set(t, (counts.get(t) ?? 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, limit)
    .map(([tech, count]) => ({ tech, count }));
}
