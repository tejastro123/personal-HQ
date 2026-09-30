export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "exploring-the-cosmos-through-code",
    title: "Exploring the Cosmos Through Code",
    date: "2026-09-12",
    excerpt:
      "Why space, rocketry, and physics keep pulling me back to terminals, notebooks, and simulations.",
    tags: ["Physics", "Space", "Motivation"],
    body: [
      "I describe myself as a Space & Rocketry enthusiast who happens to write software. That is not a branding line — it is how the projects actually cluster.",
      "Orbital mechanics, telemetry, and instrument data are just structured problems with consequences. When you model a trajectory or process a sensor stream, you are doing physics and engineering at the same time. Code is the lab notebook.",
      "Animated Physics exists for the same reason: if a idea can be drawn, simulated, or animated, it becomes easier to argue with — and argue with is how understanding improves.",
      "The goal for the next year is simple: keep building tools that make celestial and quantum ideas tactile, then ship them where other students can poke at them.",
    ],
  },
  {
    slug: "quickide-and-the-qucpl-language",
    title: "QUICKIDE and writing quantum programs in QuCPL",
    date: "2026-07-06",
    excerpt:
      "A lightweight GUI IDE for writing, visualizing, and simulating quantum programs with a custom language.",
    tags: ["Quantum", "QUICKIDE", "Tools"],
    body: [
      "QUICKIDE started as a complaint: most quantum learning material is either a wall of linear algebra or a black-box cloud notebook. Neither teaches you to *write* a program.",
      "QuCPL is a small custom language for describing quantum circuits and experiments. QUICKIDE wraps it in a GUI so you can type a program, watch the circuit, and step through simulation without leaving the window.",
      "The hard part is not the syntax highlighter. It is keeping the mental model tight: gates as operations, state as data, measurement as a first-class event. If the IDE leaks abstraction too early, beginners drown.",
      "Next steps: better visualization of amplitudes, algorithm templates (Grover, phase estimation), and a cleaner bridge from QuCPL sketches into NumPy state-vector experiments.",
      "Repo: https://github.com/tejastro123/QUICKIDE",
    ],
  },
  {
    slug: "rag-from-tutorials-to-production-shaped-systems",
    title: "RAG: from first tutorial to production-shaped systems",
    date: "2026-07-18",
    excerpt:
      "What changed when I moved from a first retrieval-augmented demo to agentic, API-first RAG pipelines.",
    tags: ["AI", "RAG", "Systems"],
    body: [
      "My first RAG apps were classic: chunk a PDF, embed it, retrieve top-k, stuff a prompt. Useful for learning, fragile for everything else.",
      "The jump came from treating retrieval as a product surface. That meant better chunking strategies, hybrid search where keyword signals still matter, evaluation harnesses that catch silent regressions, and clear failure modes when the corpus is empty or stale.",
      "Agentic RAG — where the system can reformulate queries, call tools, and iterate — is powerful but easy to over-engineer. Start with a single well-instrumented pipeline. Add agency only when a fixed chain provably fails.",
      "Repos worth reading if you are starting: first-rag → rag-tut → PersonalRAG → college-rag → Agentic-RAG-PROD / Prod-API-RAG. Each step is a deliberate complexity increase, not a rewrite for its own sake.",
      "Profiles: https://github.com/tejastro123",
    ],
  },
  {
    slug: "building-personal-hq",
    title: "Building personal-HQ: one coherent studio, not five templates",
    date: "2026-09-30",
    excerpt:
      "Design notes on the portfolio you are reading — map, playground, projects, and why data lives in one place.",
    tags: ["Engineering", "Design", "personal-HQ"],
    body: [
      "Most portfolios feel like disconnected demos glued together. personal-HQ is intentionally one design system: SaaS-style conversion structure, editorial portfolio voice, interactive data (world map), and an experimental playground.",
      "Architecture rule that mattered most: projects are data, not components. The same project object feeds the grid, the archive, the detail page, search, and the choropleth map. If it is not in src/data/projects.ts, it does not exist.",
      "The physics playground (Three.js + Rapier) is not decoration. It is a lab bench — gravity, restitution, drag, throw — and a reminder that simulation is a first-class way of thinking.",
      "Stack note: this workspace runs on TanStack Start + Vite because that is the platform contract. The product goals (React, TypeScript, Tailwind, Motion, D3, Three.js) are what matter for the work itself.",
      "Source: https://github.com/tejastro123/personal-HQ",
    ],
  },
  {
    slug: "physics-lab-and-the-habit-of-measurement",
    title: "Physics lab and the habit of measurement",
    date: "2026-08-20",
    excerpt:
      "Advanced physics lab work keeps software honest: units, error bars, and knowing what you actually measured.",
    tags: ["Physics", "Lab", "Research"],
    body: [
      "Coursework in advanced experimental physics (including PHY F344) is a useful counterweight to shipping software fast. In the lab, a number without units and an error estimate is not a result.",
      "That habit transfers. When I build a stock signal tool or a solar performance model, I ask the same questions: What is the baseline? What is noise? What would falsify this?",
      "Quantum information is especially unforgiving here. Simulation output looks precise; physical systems are not. Keeping those layers distinct is part of building trustworthy tools.",
      "If you only remember one thing from my lab notes: measure twice, model once, and label demo data as demo data.",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}

export function readingMinutes(post: BlogPost) {
  const words = post.body.join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

const TAG_PROJECTS: Record<string, string[]> = {
  Quantum: ["quickide", "my-qucpl"],
  QUICKIDE: ["quickide"],
  AI: ["personal-rag", "agentic-rag-prod"],
  RAG: ["personal-rag", "college-rag"],
  Physics: ["physics-playground"],
  Space: ["time-astro"],
  Engineering: ["personal-hq"],
  Design: ["personal-hq"],
  "personal-HQ": ["personal-hq"],
  Research: ["stock-signal-generator"],
};

export function relatedProjectIds(post: BlogPost) {
  const ids = new Set<string>();
  for (const tag of post.tags) {
    for (const id of TAG_PROJECTS[tag] ?? []) ids.add(id);
  }
  return [...ids].slice(0, 3);
}
