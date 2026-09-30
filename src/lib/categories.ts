import type { ProjectCategory, ProjectStatus } from "@/data/projects";
import { cn } from "@/lib/utils";

export const categoryVar: Record<ProjectCategory | "All", string> = {
  All: "var(--cat-default)",
  Quantum: "var(--cat-quantum)",
  AI: "var(--cat-ai)",
  Physics: "var(--cat-physics)",
  Software: "var(--cat-software)",
  Data: "var(--cat-data)",
  Finance: "var(--cat-finance)",
  "Creative Tech": "var(--cat-creative)",
  Education: "var(--cat-education)",
  Sports: "var(--cat-sports)",
};

export function categoryDot(category: string) {
  const color = categoryVar[category as keyof typeof categoryVar] ?? "var(--cat-default)";
  return { backgroundColor: color };
}

export function categoryChipClass(category: string, active: boolean) {
  if (active) {
    return cn(
      "h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-150",
      "text-background",
    );
  }
  return cn(
    "h-10 shrink-0 rounded-full border px-4 text-sm transition-colors duration-150",
    "border-border bg-card text-muted-foreground hover:text-foreground",
  );
}

export function categoryActiveStyle(category: string) {
  const color = categoryVar[category as keyof typeof categoryVar] ?? "var(--cat-default)";
  return {
    backgroundColor: color,
    borderColor: color,
    color: "var(--background)",
  } as const;
}

export function categoryBadgeStyle(category: string) {
  const color = categoryVar[category as keyof typeof categoryVar] ?? "var(--cat-default)";
  return {
    color,
    backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 36%, transparent)`,
  } as const;
}

export function categorySoftStyle(category: string) {
  const color = categoryVar[category as keyof typeof categoryVar] ?? "var(--cat-default)";
  return {
    color,
    backgroundColor: `color-mix(in oklab, ${color} 10%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 28%, transparent)`,
  } as const;
}

export function categorySvgClass(category: string) {
  switch (category) {
    case "Quantum":
      return "text-[var(--cat-quantum)]";
    case "AI":
      return "text-[var(--cat-ai)]";
    case "Physics":
      return "text-[var(--cat-physics)]";
    case "Software":
      return "text-[var(--cat-software)]";
    case "Data":
      return "text-[var(--cat-data)]";
    case "Finance":
      return "text-[var(--cat-finance)]";
    case "Creative Tech":
      return "text-[var(--cat-creative)]";
    case "Education":
      return "text-[var(--cat-education)]";
    case "Sports":
      return "text-[var(--cat-sports)]";
    default:
      return "text-accent";
  }
}

export const statusVar: Record<ProjectStatus, string> = {
  Active: "var(--status-active)",
  Research: "var(--status-research)",
  Prototype: "var(--status-prototype)",
  Lab: "var(--status-lab)",
  Archive: "var(--status-archive)",
};

export function statusBadgeStyle(status: string) {
  const color = statusVar[status as ProjectStatus] ?? "var(--subtle)";
  return {
    color,
    backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
    borderColor: `color-mix(in oklab, ${color} 36%, transparent)`,
  } as const;
}

export function statusDotClass(status: string) {
  switch (status) {
    case "Active":
      return "bg-[var(--status-active)]";
    case "Research":
      return "bg-[var(--status-research)]";
    case "Prototype":
      return "bg-[var(--status-prototype)]";
    case "Lab":
      return "bg-[var(--status-lab)]";
    case "Archive":
      return "bg-[var(--status-archive)]";
    default:
      return "bg-subtle";
  }
}

export function statusTextClass(status: string) {
  switch (status) {
    case "Active":
      return "text-[var(--status-active)]";
    case "Research":
      return "text-[var(--status-research)]";
    case "Prototype":
      return "text-[var(--status-prototype)]";
    case "Lab":
      return "text-[var(--status-lab)]";
    case "Archive":
      return "text-[var(--status-archive)]";
    default:
      return "text-subtle";
  }
}

const FLAGSHIP_IDS = new Set([
  "quickide",
  "personal-rag",
  "stock-signal-generator",
  "physics-playground",
  "my-qucpl",
  "agentic-rag-prod",
]);

export function isFlagshipProject(id: string) {
  return FLAGSHIP_IDS.has(id);
}

export const caseStudyNotes: Record<
  string,
  { highlights: string[]; next: string[]; stackNotes?: string[] }
> = {
  quickide: {
    highlights: [
      "Custom QuCPL language with GUI editing, circuit visualization, and step-through simulation",
      "Qiskit-backed execution path with IBM Quantum job submission",
      "Noise-model awareness so simulated results stay honest",
    ],
    next: [
      "Amplitude visualization that beginners can read without linear-algebra background",
      "Algorithm templates: Grover, phase estimation",
      "Export path from QuCPL sketches into NumPy state-vector notebooks",
    ],
    stackNotes: ["React", "Node/Express", "Flask/Qiskit", "MongoDB", "OpenQASM 3.0"],
  },
  "personal-rag": {
    highlights: [
      "Hybrid retrieval (vector + BM25) instead of pure embeddings",
      "Multi-tenant workspaces with document chat and citations",
      "Local-first defaults with optional Ollama models",
    ],
    next: [
      "Eval harness for retrieval regressions",
      "Knowledge-graph layer for entity-aware answers",
      "Simpler onboarding path for first documents",
    ],
    stackNotes: ["FastAPI", "PostgreSQL/pgvector", "Redis", "Ollama", "RAG"],
  },
  "stock-signal-generator": {
    highlights: [
      "CLI backtesting engine with fee/slippage models",
      "Nine strategies with walk-forward optimization",
      "149 tests — the system fails loudly when a signal drifts",
    ],
    next: [
      "Richer portfolio-level metrics",
      "Web UI for strategy comparison",
      "Live data adapters beyond historical CSVs",
    ],
    stackNotes: ["Python", "Backtesting", "Monte Carlo", "CLI"],
  },
  "physics-playground": {
    highlights: [
      "Rigid-body lab with gravity, restitution, drag, and throw",
      "Live parameter panel — simulation as an interface, not a video",
      "Mobile-aware rendering (shadows off on small screens)",
    ],
    next: [
      "Preset scenes: zero-g, magnet, pendulum",
      "Shareable URL state for a given experiment",
      "Telemetry overlays that show what was actually measured",
    ],
    stackNotes: ["Three.js", "R3F", "Rapier", "React"],
  },
  "my-qucpl": {
    highlights: [
      "Quantum programming language toolchain",
      "Compilation, simulation, visualization, OpenQASM interop",
    ],
    next: ["Library of reusable gate patterns", "Stronger error messages for beginners"],
    stackNotes: ["Quantum", "OpenQASM", "Python"],
  },
  "agentic-rag-prod": {
    highlights: [
      "Production-shaped agentic retrieval",
      "Tool use, query reformulation, API-first delivery",
    ],
    next: ["Cost/latency budgets per tool call", "Trace UI for failed plans"],
    stackNotes: ["Agents", "RAG", "APIs"],
  },
};
