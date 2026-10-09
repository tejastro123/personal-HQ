export type ResumeLensId = "engineering" | "research" | "founder";

export type ResumeLens = {
  id: ResumeLensId;
  label: string;
  blurb: string;
  focus: string;
  projectIds: string[];
  skillsEmphasis: string[];
  headline: string;
};

export const resumeLenses: ResumeLens[] = [
  {
    id: "engineering",
    label: "Engineering",
    blurb: "Systems, APIs, production-shaped software, and instrumented UIs.",
    focus: "Ships reliable systems — RAG APIs, IDEs, data pipelines, and this studio.",
    projectIds: ["personal-hq", "quickide", "personal-rag", "agentic-rag-prod", "prod-api-rag", "physics-playground"],
    skillsEmphasis: ["TypeScript", "React", "Python", "FastAPI", "APIs", "PostgreSQL", "Three.js", "Testing"],
    headline: "Builds production-minded systems and instruments people can run.",
  },
  {
    id: "research",
    label: "Research",
    blurb: "Quantum information, physics lab discipline, and experimental tooling.",
    focus: "Research-shaped products: quantum languages, simulation, measurement honesty.",
    projectIds: ["quickide", "my-qucpl", "stock-signal-generator", "physics-playground", "quantum-projects", "time-astro"],
    skillsEmphasis: ["Quantum", "Qiskit", "Simulation", "Statistics", "Physics Lab", "OpenQASM", "Monte Carlo"],
    headline: "Treats research and product as one craft — measure, model, ship.",
  },
  {
    id: "founder",
    label: "Founder",
    blurb: "Product sense, market-facing demos, and multi-surface portfolios.",
    focus: "Turns ambiguous ideas into demoable products with clear narrative and UX.",
    projectIds: ["personal-hq", "physics-playground", "livemart", "stock-signal-generator", "personal-rag", "airdraw"],
    skillsEmphasis: ["Product", "UX", "React", "Full-stack", "Data Viz", "Storytelling", "Prototyping"],
    headline: "Founder-shaped builder: product, interface, and technical depth in one.",
  },
];

export function getLens(id: ResumeLensId): ResumeLens {
  return resumeLenses.find((l) => l.id === id) ?? resumeLenses[0]!;
}
