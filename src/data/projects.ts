export const categories = [
  "All",
  "AI",
  "Quantum",
  "Physics",
  "Software",
  "Data",
  "Finance",
  "Creative Tech",
  "Education",
  "Sports",
] as const;

export type Category = (typeof categories)[number];
export type ProjectCategory = Exclude<Category, "All">;
export type ProjectStatus = "Active" | "Research" | "Prototype" | "Lab" | "Archive";

export type MapMetric =
  | "projectCount"
  | "researchActivity"
  | "technologyDensity"
  | "innovationScore"
  | "projectComplexity";

export const mapMetrics: { id: MapMetric; label: string }[] = [
  { id: "projectCount", label: "Project Count" },
  { id: "researchActivity", label: "Research Activity" },
  { id: "technologyDensity", label: "Technology Density" },
  { id: "innovationScore", label: "Innovation Score" },
  { id: "projectComplexity", label: "Project Complexity" },
];

export type Project = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  lessons: string;
  technologies: string[];
  year: number;
  status: ProjectStatus;
  github?: string;
  demo?: string;
  country: string;
  countryId: string;
  countryLngLat?: [number, number];
  visual: string;
  featured: boolean;
  related: string[];
  metrics: Record<MapMetric, number>;
};

type Seed = {
  id: string;
  title: string;
  category: ProjectCategory;
  description: string;
  longDescription: string;
  problem: string;
  approach: string;
  architecture: string;
  results: string;
  lessons: string;
  technologies: string[];
  year: number;
  status: ProjectStatus;
  repo?: string;
  demo?: string;
  country?: string;
  countryId?: string;
  visual?: string;
  featured?: boolean;
  related?: string[];
  metrics?: Partial<Record<MapMetric, number>>;
};

const GH = "https://github.com/tejastro123/";

function project(seed: Seed): Project {
  return {
    id: seed.id,
    title: seed.title,
    category: seed.category,
    description: seed.description,
    longDescription: seed.longDescription,
    problem: seed.problem,
    approach: seed.approach,
    architecture: seed.architecture,
    results: seed.results,
    lessons: seed.lessons,
    technologies: seed.technologies,
    year: seed.year,
    status: seed.status,
    github: seed.repo ? `${GH}${seed.repo}` : undefined,
    demo: seed.demo,
    country: seed.country ?? "India",
    countryId: seed.countryId ?? "356",
    visual: seed.visual ?? "software",
    featured: seed.featured ?? false,
    related: seed.related ?? [],
    metrics: {
      projectCount: seed.metrics?.projectCount ?? 1,
      researchActivity: seed.metrics?.researchActivity ?? 55,
      technologyDensity: seed.metrics?.technologyDensity ?? 60,
      innovationScore: seed.metrics?.innovationScore ?? 60,
      projectComplexity: seed.metrics?.projectComplexity ?? 55,
    },
  };
}

const seeds: Seed[] = [
  // ── Quantum ──────────────────────────────────────────────────────────
  {
    id: "quickide",
    title: "QUICKIDE",
    category: "Quantum",
    description:
      "Advanced quantum circuit IDE — write in QuCPL, debug gate-by-gate, simulate with Qiskit, and submit jobs to IBM Quantum.",
    longDescription:
      "QUICKIDE 2.0 is a fullstack quantum platform: React IDE with Monaco + QuCPL syntax, Node/Express API, Flask/Qiskit simulation core, MongoDB persistence, and IBM Quantum cloud submission. Includes OpenQASM 3.0 transpilation, hardware noise models, and a gate-level debugger that inspects statevectors at every instruction.",
    problem:
      "Quantum learning material is either dense linear algebra or a black-box notebook. Neither teaches you to write, debug, and run a program end-to-end.",
    approach:
      "Define QuCPL as a high-level language, compile to OpenQASM, simulate with Qiskit (ideal + noisy), visualize circuits and amplitudes, and wire IBM API tokens for real hardware jobs.",
    architecture:
      "client (React) → server (Node/Express, JWT, MongoDB) → compiler_api (Flask + Qiskit) → IBM Quantum / local simulator.",
    results:
      "Working IDE + language + simulator + cloud path. Useful for Bell states, Grover sketches, and small multi-qubit experiments.",
    lessons:
      "Keep the mental model tight: gates as operations, state as data, measurement as a first-class event. Debugger UX matters as much as the math.",
    technologies: ["React", "Node.js", "Python", "Qiskit", "MongoDB", "OpenQASM"],
    year: 2026,
    status: "Active",
    repo: "QUICKIDE",
    featured: true,
    visual: "quantum",
    country: "India",
    related: ["my-qucpl", "personal-rag", "physics-playground"],
    metrics: { researchActivity: 94, technologyDensity: 88, innovationScore: 93, projectComplexity: 92 },
  },
  {
    id: "my-qucpl",
    title: "MY-QUCPL",
    category: "Quantum",
    description:
      "Custom quantum programming language and toolchain — compilation, simulation, visualization, and OpenQASM interoperability.",
    longDescription:
      "MY-QUCPL is the language research behind QUICKIDE: a purpose-built quantum language with a toolchain that compiles, simulates, visualizes, and interoperates with OpenQASM. Jupyter notebooks document the grammar and experiments.",
    problem:
      "Existing quantum languages either hide too much or force linear-algebra boilerplate. A compact DSL makes algorithms readable.",
    approach:
      "Design a small gate-centric syntax, implement a compiler path to OpenQASM, and keep simulation + visualization in the loop.",
    architecture:
      "Language spec → parser/compiler → simulator core → visualization notebooks.",
    results:
      "Language + toolchain experiments feeding the QUICKIDE IDE.",
    lessons:
      "Language design is systems design: every syntax choice is a claim about how humans should think about qubits.",
    technologies: ["Python", "Quantum", "OpenQASM", "Jupyter"],
    year: 2025,
    status: "Research",
    repo: "MY-QUCPL",
    featured: true,
    visual: "quantum",
    related: ["quickide", "quantum-projects", "qiskit-tutorials"],
    metrics: { researchActivity: 90, technologyDensity: 78, innovationScore: 90, projectComplexity: 86 },
  },
  {
    id: "quantum-ibm-basics",
    title: "Quantum IBM Basics",
    category: "Quantum",
    description:
      "Hands-on notebooks exploring IBM Quantum fundamentals — circuits, jobs, and the cloud toolchain.",
    longDescription:
      "A learning lab for IBM Quantum: build circuits, run jobs, read results, and get comfortable with the cloud stack before building larger systems.",
    problem:
      "Cloud quantum platforms are easy to open and hard to trust until you have run the same experiment three different ways.",
    approach:
      "Progressive notebooks from single-gate demos to multi-qubit circuits and job polling.",
    architecture: "Jupyter notebooks + IBM Quantum runtime examples.",
    results: "Working notebook set for IBM Quantum fundamentals.",
    lessons: "Job queues and calibration drift are part of the physics — design for them.",
    technologies: ["Python", "Qiskit", "IBM Quantum", "Jupyter"],
    year: 2026,
    status: "Research",
    repo: "Quantum-ibm-basics",
    visual: "quantum",
    related: ["quickide", "qiskit-tutorials", "quantum-computing-resources"],
    metrics: { researchActivity: 78, technologyDensity: 65, innovationScore: 68, projectComplexity: 60 },
  },
  {
    id: "quantum-computing-resources",
    title: "Quantum Computing Resources",
    category: "Quantum",
    description:
      "Curated MIT-licensed collection of quantum computing learning materials and notebooks.",
    longDescription:
      "A structured resource hub for quantum computing — papers, tutorials, and notebook walkthroughs organized for fast review.",
    problem:
      "Quantum material is scattered across blogs, arXiv, and vendor docs with no single map.",
    approach: "Curate, annotate, and index resources by topic and difficulty.",
    architecture: "Markdown + Jupyter resource tree.",
    results: "Reusable personal knowledge base for quantum study.",
    lessons: "Curation is a skill. A short annotated list beats a giant bookmark dump.",
    technologies: ["Python", "Quantum", "Jupyter", "Docs"],
    year: 2026,
    status: "Archive",
    repo: "Quantum-Computing-Resources",
    visual: "quantum",
    related: ["quantum-ibm-basics", "qiskit-tutorials", "quantum-projects"],
    metrics: { researchActivity: 70, technologyDensity: 50, innovationScore: 55, projectComplexity: 40 },
  },
  {
    id: "quantum-projects",
    title: "Quantum Projects",
    category: "Quantum",
    description:
      "Collection of quantum algorithm and circuit projects in notebook form.",
    longDescription:
      "A portfolio of quantum experiments — algorithm sketches, circuit studies, and simulation notebooks.",
    problem: "Quantum ideas need somewhere to live besides paper.",
    approach: "One notebook (or small set) per idea, with results and caveats written down.",
    architecture: "Jupyter project collection.",
    results: "Working quantum project archive.",
    lessons: "Reproducible notebooks are half the research value.",
    technologies: ["Python", "Quantum", "Jupyter", "Qiskit"],
    year: 2025,
    status: "Research",
    repo: "Quantum-Projects",
    visual: "quantum",
    related: ["quickide", "my-qucpl", "quantum-ibm-basics"],
    metrics: { researchActivity: 80, technologyDensity: 60, innovationScore: 70, projectComplexity: 65 },
  },
  {
    id: "qiskit-tutorials",
    title: "Qiskit Tutorials",
    category: "Quantum",
    description:
      "Apache-licensed Qiskit tutorial notebooks covering core SDK patterns and algorithms.",
    longDescription:
      "Structured Qiskit tutorials for building circuits, running simulators, and understanding the SDK surface used in QUICKIDE and other quantum work.",
    problem: "Qiskit's API surface is large; tutorials should reduce it to patterns you actually reuse.",
    approach: "Small, runnable notebooks organized by concept.",
    architecture: "Notebook collection.",
    results: "Reusable Qiskit pattern library.",
    lessons: "Learn the SDK by writing the tutorial you wish existed.",
    technologies: ["Python", "Qiskit", "Jupyter"],
    year: 2025,
    status: "Archive",
    repo: "qiskit-tutorials",
    visual: "quantum",
    related: ["quantum-ibm-basics", "my-qucpl", "quantum-projects"],
    metrics: { researchActivity: 68, technologyDensity: 58, innovationScore: 52, projectComplexity: 45 },
  },

  // ── AI / RAG ─────────────────────────────────────────────────────────
  {
    id: "personal-rag",
    title: "PersonalRAG",
    category: "AI",
    description:
      "Production-grade personal AI assistant — local-first, multi-tenant, hybrid retrieval (vector + BM25), knowledge-graph foundations.",
    longDescription:
      "PersonalRAG is a FastAPI + PostgreSQL/pgvector system with an orchestrator, hybrid RAG core, memory layer, and optional Ollama local models. Designed as a serious personal assistant platform rather than a chat demo.",
    problem:
      "Generic chat assistants hallucinate when the answer lives in your own documents, and most RAG demos are single-user toys.",
    approach:
      "Ingest → chunk → embed → hybrid retrieve → orchestrate with planning → chat with citations. Keep local-first defaults.",
    architecture:
      "FastAPI gateway → orchestrator → hybrid RAG (vector + BM25) + memory + knowledge graph → PostgreSQL/pgvector, Redis, MinIO.",
    results:
      "End-to-end personal RAG service with auth, workspaces, and document chat.",
    lessons:
      "Retrieval quality dominates model quality. Memory and multi-tenancy are what separate a demo from a product.",
    technologies: ["Python", "FastAPI", "pgvector", "Ollama", "RAG", "Hybrid Search"],
    year: 2026,
    status: "Active",
    repo: "PersonalRAG",
    featured: true,
    visual: "ai",
    related: ["agentic-rag-prod", "prod-api-rag", "college-rag", "gpt-from-scratch"],
    metrics: { researchActivity: 92, technologyDensity: 90, innovationScore: 88, projectComplexity: 94 },
  },
  {
    id: "agentic-rag-prod",
    title: "Agentic RAG (Prod)",
    category: "AI",
    description:
      "Production-shaped agentic retrieval system with tool use, query reformulation, and API-first delivery.",
    longDescription:
      "Agentic-RAG-PROD adds an agent loop on top of a solid retrieval core: reformulate queries, call tools, validate outputs, and ship behind a clean API.",
    problem:
      "Single-shot RAG fails when the first query is vague, the corpus is multi-hop, or the product needs structured responses.",
    approach:
      "Instrument a fixed chain first; add agency only when it provably fails. Strict tool schemas and timeouts.",
    architecture: "API gateway → agent planner → retriever/tools → validator → response formatter.",
    results: "API-first agentic RAG service suitable for product integration.",
    lessons: "Agency is a product decision, not a vibe. Measure before you add nodes.",
    technologies: ["TypeScript", "Python", "Agents", "RAG", "APIs", "LLMs"],
    year: 2026,
    status: "Active",
    repo: "Agentic-RAG-PROD",
    featured: true,
    visual: "gpt",
    related: ["prod-api-rag", "personal-rag", "agentic-ai-lynq", "gpt-from-scratch"],
    metrics: { researchActivity: 90, technologyDensity: 92, innovationScore: 88, projectComplexity: 91 },
  },
  {
    id: "prod-api-rag",
    title: "Prod API RAG",
    category: "AI",
    description:
      "TypeScript API layer for retrieval-augmented generation — clean endpoints, grounded answers, production routing.",
    longDescription:
      "Prod-API-RAG is the TypeScript service surface around RAG: request validation, retrieval orchestration, and response contracts designed for apps that need citations, not chat bubbles.",
    problem:
      "Notebook RAG does not translate to product APIs without contracts, errors, and observability.",
    approach: "Define API contracts first; wire retrieval and generation behind them.",
    architecture: "HTTP API → retrieval service → LLM → response schema.",
    results: "API-ready RAG endpoints.",
    lessons: "The API is the product. Retrieval is an implementation detail behind a contract.",
    technologies: ["TypeScript", "APIs", "RAG", "Node.js"],
    year: 2026,
    status: "Active",
    repo: "Prod-API-RAG",
    featured: true,
    visual: "ai",
    related: ["agentic-rag-prod", "personal-rag", "rag-web"],
    metrics: { researchActivity: 82, technologyDensity: 85, innovationScore: 78, projectComplexity: 80 },
  },
  {
    id: "college-rag",
    title: "College RAG",
    category: "AI",
    description:
      "Retrieval-augmented assistant for college coursework — grounded answers from course materials.",
    longDescription:
      "College RAG targets a concrete student workflow: load course documents, retrieve relevant passages, and answer questions with citations instead of invention.",
    problem:
      "Coursework Q&A without grounding turns into confident nonsense.",
    approach: "Document ingest → embeddings → retrieval → LLM answer with source constraints.",
    architecture: "Ingest pipeline → vector store → chat API / notebook UI.",
    results: "Course-material Q&A prototype.",
    lessons: "Domain scoping (what is in-corpus) is the most important prompt you write.",
    technologies: ["Python", "RAG", "LLMs", "Embeddings"],
    year: 2026,
    status: "Active",
    repo: "college-rag",
    visual: "ai",
    related: ["study-mate", "first-rag", "rag-tut", "personal-rag"],
    metrics: { researchActivity: 78, technologyDensity: 72, innovationScore: 74, projectComplexity: 70 },
  },
  {
    id: "rag-web",
    title: "RAG Web",
    category: "AI",
    description:
      "Web-facing RAG application — upload documents, ask questions, get grounded answers in the browser.",
    longDescription:
      "RAG-WEB brings retrieval-augmented generation to a web UI: document upload, chat, and source-aware answers for non-technical users.",
    problem:
      "RAG stuck in notebooks never reaches the people who need it.",
    approach: "Wrap a retrieval pipeline in a simple web client with clear source panels.",
    architecture: "Web client → API → ingest + retrieve + generate.",
    results: "Browser-accessible RAG demo.",
    lessons: "UI clarity (show the sources) builds more trust than a bigger model.",
    technologies: ["Python", "Web", "RAG", "LLMs"],
    year: 2026,
    status: "Active",
    repo: "RAG-WEB",
    visual: "ai",
    related: ["personal-rag", "prod-api-rag", "first-rag"],
    metrics: { researchActivity: 74, technologyDensity: 70, innovationScore: 72, projectComplexity: 68 },
  },
  {
    id: "rag-tut",
    title: "RAG Tutorial",
    category: "AI",
    description:
      "Step-by-step RAG tutorial repo — from first embed to a working retrieval pipeline.",
    longDescription:
      "rag-tut is the learning path: minimal code that shows chunking, embedding, retrieval, and generation without enterprise scaffolding.",
    problem:
      "RAG tutorials either oversimplify or bury the first working example under infrastructure.",
    approach: "One concept per step, runnable end-to-end at every stage.",
    architecture: "Tutorial notebooks / scripts.",
    results: "Clear RAG learning path.",
    lessons: "Teach the failure modes (empty corpus, bad chunking) alongside the happy path.",
    technologies: ["Python", "RAG", "Embeddings", "LLMs"],
    year: 2026,
    status: "Archive",
    repo: "rag-tut",
    visual: "ai",
    related: ["first-rag", "college-rag", "personal-rag"],
    metrics: { researchActivity: 70, technologyDensity: 58, innovationScore: 60, projectComplexity: 50 },
  },
  {
    id: "first-rag",
    title: "First RAG",
    category: "AI",
    description:
      "The first retrieval-augmented generation build — classic chunk → embed → retrieve → generate loop.",
    longDescription:
      "first-rag is the starting point of the RAG series: a compact implementation that makes the pipeline legible before hybrid search and agents entered the picture.",
    problem: "You cannot improve a system you cannot see.",
    approach: "Implement the canonical RAG chain with clear stages and visible intermediate data.",
    architecture: "Loader → chunker → embedder → retriever → LLM.",
    results: "Working baseline RAG system.",
    lessons: "Baseline first. Every later optimization is only meaningful against this.",
    technologies: ["Python", "RAG", "LLMs", "Embeddings"],
    year: 2025,
    status: "Archive",
    repo: "first-rag",
    visual: "ai",
    related: ["rag-tut", "personal-rag", "gpt-from-scratch"],
    metrics: { researchActivity: 68, technologyDensity: 55, innovationScore: 58, projectComplexity: 48 },
  },
  {
    id: "agentic-ai-lynq",
    title: "Agentic AI Lynq",
    category: "AI",
    description:
      "MIT-licensed Python project exploring agentic AI patterns — chained tools, planning, and multi-step workflows.",
    longDescription:
      "Agentic-AI-Lynq is an exploration of agent design: how to plan, call tools, and keep multi-step workflows coherent without turning into spaghetti prompts.",
    problem: "Agents fail in boring ways — bad tool schemas, no timeouts, no evaluation.",
    approach: "Small, readable agent loops with explicit tool contracts.",
    architecture: "Planner → tool executor → memory/state.",
    results: "Agent pattern playground.",
    lessons: "Agents are distributed systems. Design for failure at every hop.",
    technologies: ["Python", "Agents", "LLMs", "Tool Use"],
    year: 2025,
    status: "Research",
    repo: "Agentic-AI-Lynq",
    featured: true,
    visual: "ai",
    related: ["agentic-rag-prod", "gpt-from-scratch", "ai"],
    metrics: { researchActivity: 84, technologyDensity: 76, innovationScore: 82, projectComplexity: 78 },
  },
  {
    id: "gpt-from-scratch",
    title: "GPT From Scratch",
    category: "AI",
    description:
      "Decoder-only Transformer implementation exploring attention, residuals, and generation — the architecture behind GPT-style models.",
    longDescription:
      "A from-first-principles decoder-only Transformer written to understand attention maps, residual streams, and sampling — not a production LLM. Lives in the ML notebook repo.",
    problem: "Calling an API hides the machine. The only way to respect the architecture is to implement it.",
    approach: "Tokenize a small corpus, train a decoder-only stack, and inspect attention while sampling.",
    architecture: "Embedding → stacked self-attention + MLP blocks → tied unembedding.",
    results: "Demo models. Small models overfit charmingly; the value is the instrumentation.",
    lessons: "Shape errors teach more than papers. Residual streams want to be first-class objects.",
    technologies: ["Python", "PyTorch", "Transformers", "LLMs", "Jupyter"],
    year: 2025,
    status: "Research",
    repo: "ML",
    featured: true,
    visual: "gpt",
    related: ["personal-rag", "agentic-rag-prod", "dsmlai-projects", "ai"],
    metrics: { researchActivity: 91, technologyDensity: 88, innovationScore: 86, projectComplexity: 84 },
  },
  {
    id: "ai",
    title: "AI Experiments",
    category: "AI",
    description:
      "Open AI experiment repo — model notes, scripts, and exploratory work across ML and LLMs.",
    longDescription:
      "A general AI workspace for experiments that do not yet deserve their own product repo: prompt tests, model comparisons, and scratch research.",
    problem: "Experiments decay into untitled folders.",
    approach: "Keep a single AI scratch repo with dated notes and runnable snippets.",
    architecture: "Scripts + notebooks + notes.",
    results: "AI experiment log.",
    lessons: "Name things by hypothesis, not by date alone.",
    technologies: ["Python", "AI", "LLMs", "Jupyter"],
    year: 2026,
    status: "Research",
    repo: "AI",
    visual: "ai",
    related: ["gpt-from-scratch", "agentic-ai-lynq", "dsmlai-projects"],
    metrics: { researchActivity: 80, technologyDensity: 70, innovationScore: 74, projectComplexity: 65 },
  },
  {
    id: "dsmlai-projects",
    title: "DS / ML / AI Projects",
    category: "AI",
    description:
      "Jupyter collection of data science, machine learning, and AI projects.",
    longDescription:
      "A structured notebook portfolio covering preprocessing, modeling, evaluation, and exploratory AI work — the practical middle ground between tutorials and production systems.",
    problem: "Kaggle-style notebooks rarely connect into a coherent skill story.",
    approach: "One project per notebook with a clear question and a written conclusion.",
    architecture: "Notebook portfolio.",
    results: "Hands-on DS/ML/AI project archive.",
    lessons: "The write-up is the experiment. Plots without a claim are decoration.",
    technologies: ["Python", "Pandas", "Scikit-learn", "Jupyter", "ML"],
    year: 2026,
    status: "Active",
    repo: "DSMLAI-Projects",
    visual: "data",
    related: ["gpt-from-scratch", "data-science", "ds-course", "ai"],
    metrics: { researchActivity: 76, technologyDensity: 72, innovationScore: 70, projectComplexity: 70 },
  },
  {
    id: "study-mate",
    title: "StudyMate",
    category: "AI",
    description:
      "RAG study assistant for course materials — grounded Q&A and learning support.",
    longDescription:
      "StudyMate is a study-focused RAG build: load textbook and lecture materials, then ask questions that stay inside the source set.",
    problem: "Students need answers they can trust against the actual course text.",
    approach: "Document-scoped retrieval with strict grounding.",
    architecture: "Ingest → retrieve → generate with citations.",
    results: "Study assistant prototype.",
    lessons: "Scoped corpora beat open-web models for coursework.",
    technologies: ["Python", "RAG", "LLMs", "Education"],
    year: 2026,
    status: "Active",
    repo: "StudyMate",
    visual: "ai",
    related: ["college-rag", "rag-web", "personal-rag"],
    metrics: { researchActivity: 74, technologyDensity: 68, innovationScore: 72, projectComplexity: 66 },
  },

  // ── Finance / Data ───────────────────────────────────────────────────
  {
    id: "stock-signal-generator",
    title: "Stock Signal Generator",
    category: "Finance",
    description:
      "CLI quantitative backtesting engine — 9 strategies, fees/slippage models, Monte Carlo, walk-forward optimization, 149 tests.",
    longDescription:
      "A production-minded quant lab: Yahoo Finance data, technical indicators, multi-asset portfolio simulation, parameter grid search, bootstrap Monte Carlo, and multi-format reports. Explicitly a research tool, not investment advice.",
    problem:
      "Spreadsheet indicator notes do not scale and hide path-dependent risk, fees, and slippage.",
    approach:
      "Compute indicators → generate signals → simulate portfolio with realistic costs → export reports. Optimize only with walk-forward discipline.",
    architecture:
      "CLI → data provider + cache → indicator engine → strategy factory → backtest + transaction models → metrics + reports.",
    results:
      "Reproducible backtests with Sharpe/Sortino/drawdown and multi-strategy comparison.",
    lessons:
      "A signal without costs and an audit trail is a rumor. Walk-forward beats in-sample grid search.",
    technologies: ["Python", "Pandas", "NumPy", "yfinance", "Backtesting", "CLI"],
    year: 2026,
    status: "Active",
    repo: "Stock-Signal-Generator",
    featured: true,
    visual: "quant",
    related: ["stock-analyst", "stock-price-predictor", "california-housing-predictor"],
    metrics: { researchActivity: 86, technologyDensity: 80, innovationScore: 80, projectComplexity: 88 },
  },
  {
    id: "stock-analyst",
    title: "Stock Analyst",
    category: "Finance",
    description:
      "Interactive equity analytics for returns, volatility, and portfolio-style exploration on market data.",
    longDescription:
      "A notebook-grade analytics surface for exploring risk language — returns, drawdown, correlation — without claiming a live track record.",
    problem: "Path-dependent risk disappears when you only look at averages.",
    approach: "Compute return series and risk metrics, then bind every number to an interactive chart.",
    architecture: "Typed analytics functions → visualization layer.",
    results: "Analytics on sample market data for learning and research.",
    lessons: "Pair every return figure with drawdown context.",
    technologies: ["JavaScript", "Python", "Pandas", "Visualization"],
    year: 2026,
    status: "Prototype",
    repo: "stock-analyst",
    visual: "data",
    related: ["stock-signal-generator", "stock-price-predictor", "data-intelligence-platform"],
    metrics: { researchActivity: 72, technologyDensity: 70, innovationScore: 68, projectComplexity: 74 },
  },
  {
    id: "stock-price-predictor",
    title: "Stock Price Predictor",
    category: "Finance",
    description:
      "Apache-licensed notebook project exploring stock price prediction with classical ML on historical series.",
    longDescription:
      "A careful look at a classic (and humbling) ML task: feature engineering, model baselines, and honest evaluation on price series.",
    problem: "Price prediction demos often overfit and under-report uncertainty.",
    approach: "Strong baselines first, walk-forward evaluation, explicit uncertainty language.",
    architecture: "Notebook pipeline: data → features → models → evaluation.",
    results: "Research notebook with baselines and caveats.",
    lessons: "The baseline is the result. Anything that cannot beat buy-and-hold out-of-sample is not a signal.",
    technologies: ["Python", "Scikit-learn", "Pandas", "Jupyter"],
    year: 2026,
    status: "Research",
    repo: "Stock-price-predictor",
    visual: "quant",
    related: ["stock-signal-generator", "stock-analyst", "california-housing-predictor"],
    metrics: { researchActivity: 78, technologyDensity: 72, innovationScore: 66, projectComplexity: 72 },
  },
  {
    id: "california-housing-predictor",
    title: "California Housing Predictor",
    category: "Data",
    description:
      "Housing price prediction project — preprocessing, regression models, and evaluation on the classic California dataset.",
    longDescription:
      "A full regression study: clean the California housing data, engineer features, compare models, and evaluate honestly. A standard but valuable data-science workout.",
    problem: "Housing models fail when leakage and distribution shift are ignored.",
    approach: "EDA → features → multiple regressors → error analysis.",
    architecture: "Notebook ML pipeline.",
    results: "Working prediction pipeline with evaluation report.",
    lessons: "Error analysis is where the model actually gets better.",
    technologies: ["Python", "Scikit-learn", "Pandas", "HTML"],
    year: 2026,
    status: "Prototype",
    repo: "California-Housing-Predictor",
    visual: "data",
    related: ["dsmlai-projects", "data-science", "stock-price-predictor"],
    metrics: { researchActivity: 70, technologyDensity: 68, innovationScore: 62, projectComplexity: 64 },
  },
  {
    id: "data-science",
    title: "DATA-SCIENCE",
    category: "Data",
    description:
      "Hands-on data science projects — preprocessing, EDA, visualization, and model evaluation.",
    longDescription:
      "A collection of practical data science exercises that form the foundation under the quant and ML work: clean data, visualize it, and evaluate models without theater.",
    problem: "Data skills atrophy without deliberate practice.",
    approach: "Small projects with explicit questions and written findings.",
    architecture: "Notebook collection.",
    results: "Data science practice portfolio.",
    lessons: "EDA is not busywork — it is where most modeling mistakes become visible.",
    technologies: ["Python", "Pandas", "Matplotlib", "EDA"],
    year: 2025,
    status: "Archive",
    repo: "DATA-SCIENCE",
    visual: "data",
    related: ["dsmlai-projects", "ds-course", "california-housing-predictor"],
    metrics: { researchActivity: 65, technologyDensity: 60, innovationScore: 58, projectComplexity: 55 },
  },
  {
    id: "ds-course",
    title: "DS Course",
    category: "Data",
    description:
      "Data science course notebooks — structured learning across statistics, visualization, and modeling.",
    longDescription:
      "Course-aligned data science notebooks tracking systematic learning in pandas, visualization, statistics, and introductory ML.",
    problem: "Scattered tutorials do not add up to a skill without structure.",
    approach: "Follow a course spine; implement every exercise; keep notes on what broke.",
    architecture: "Notebook course archive.",
    results: "Completed course notebook set.",
    lessons: "Finish the exercises. Skimming notebooks trains nothing.",
    technologies: ["Python", "Pandas", "Jupyter", "Statistics"],
    year: 2026,
    status: "Active",
    repo: "DS-course",
    visual: "data",
    related: ["data-science", "dsmlai-projects", "python"],
    metrics: { researchActivity: 68, technologyDensity: 62, innovationScore: 55, projectComplexity: 58 },
  },
  {
    id: "data-intelligence-platform",
    title: "Data Intelligence Platform",
    category: "Data",
    description:
      "Editorial data workbench for exploring datasets, visualizing structure, and turning tables into questions.",
    longDescription:
      "A lab-style data platform focused on exploration over dashboard theater: profile a table, chart the interesting columns, write the finding.",
    problem: "Most dashboards start from widgets. They should start from a question.",
    approach: "Lead with a query and a sentence, then the chart.",
    architecture: "Typed tabular layer + visualization primitives.",
    results: "Exploratory analytics workbench for course and research datasets.",
    lessons: "Aggregation hides the row that would have changed your mind.",
    technologies: ["Python", "Pandas", "SQL", "Visualization"],
    year: 2026,
    status: "Prototype",
    visual: "data",
    related: ["stock-analyst", "dsmlai-projects", "f1-analytics"],
    metrics: { researchActivity: 72, technologyDensity: 69, innovationScore: 70, projectComplexity: 64 },
  },

  // ── Sports ───────────────────────────────────────────────────────────
  {
    id: "f1-analytics",
    title: "F1 Race Analytics",
    category: "Sports",
    description:
      "Motorsport data tools for race telemetry, pit strategy context, and season-level performance exploration.",
    longDescription:
      "F1-focused analytics covering race data, pit-wall style views, and season exploration. Built for people who want to interrogate the data, not just watch the race.",
    problem: "Race outcomes look simple on a leaderboard and messy in the underlying telemetry.",
    approach: "Ingest timing data, structure sessions, and surface strategy-relevant views.",
    architecture: "Data ingest → session models → analytics views → optional live feeds.",
    results: "Working analytics and visualization tools for F1 seasons and races.",
    lessons: "Motorsport data is time-series first. Align clocks before you trust any comparison.",
    technologies: ["JavaScript", "Python", "Pandas", "Visualization"],
    year: 2026,
    status: "Active",
    repo: "F1",
    featured: true,
    visual: "data",
    related: ["pit-wall-pro", "ipl-live", "stock-analyst"],
    metrics: { researchActivity: 70, technologyDensity: 76, innovationScore: 74, projectComplexity: 72 },
  },
  {
    id: "pit-wall-pro",
    title: "PIT-WALL-PRO",
    category: "Sports",
    description:
      "TypeScript pit-wall style interface for F1 race operations — timing, strategy, and session views.",
    longDescription:
      "PIT-WALL-PRO is a product-shaped motorsport dashboard: TypeScript UI for race timing, strategy context, and the operational views a pit wall would actually care about.",
    problem: "Race fans and analysts need more than a leaderboard; they need session structure.",
    approach: "Model sessions, surface timing deltas, and keep strategy context visible.",
    architecture: "TypeScript client → timing/data services → dashboard views.",
    results: "Working F1 pit-wall interface prototype.",
    lessons: "Operational UIs die when every number has equal weight. Hierarchy is the feature.",
    technologies: ["TypeScript", "React", "Sports Data", "Visualization"],
    year: 2026,
    status: "Active",
    repo: "PIT-WALL-PRO",
    featured: true,
    visual: "software",
    related: ["f1-analytics", "ipl-live", "livemart"],
    metrics: { researchActivity: 68, technologyDensity: 80, innovationScore: 76, projectComplexity: 74 },
  },
  {
    id: "ipl-live",
    title: "IPL Live",
    category: "Sports",
    description:
      "Live IPL cricket score and match tracking application.",
    longDescription:
      "IPL Live is a sports product build: score updates, match state, and the UI loop that makes live cricket data usable on a phone.",
    problem: "Live sports data is useless if refresh, state, and layout fight the user.",
    approach: "Optimize the update loop and keep the scoreboard hierarchy ruthless.",
    architecture: "Client → live data feed → match state store → views.",
    results: "Working live score application.",
    lessons: "Live apps are latency products. Design the empty and loading states first.",
    technologies: ["JavaScript", "Sports Data", "Real-time", "Web"],
    year: 2026,
    status: "Active",
    repo: "IPL-live",
    visual: "data",
    related: ["f1-analytics", "pit-wall-pro", "ipl"],
    metrics: { researchActivity: 60, technologyDensity: 70, innovationScore: 66, projectComplexity: 62 },
  },
  {
    id: "ipl",
    title: "IPL Analytics",
    category: "Sports",
    description:
      "IPL cricket data and analytics experiments — seasons, players, and match patterns.",
    longDescription:
      "Analytical companion to IPL Live: explore season data, player patterns, and match-level statistics.",
    problem: "Cricket stats are rich but poorly structured for casual exploration.",
    approach: "Clean season data, define metrics, and visualize the patterns worth arguing about.",
    architecture: "Data notebooks + visualization.",
    results: "IPL analytics experiments.",
    lessons: "Domain vocabulary (powerplay, death overs) is part of the data model.",
    technologies: ["Python", "Pandas", "Sports Data", "Visualization"],
    year: 2026,
    status: "Prototype",
    repo: "IPL",
    visual: "data",
    related: ["ipl-live", "f1-analytics", "stock-analyst"],
    metrics: { researchActivity: 64, technologyDensity: 62, innovationScore: 60, projectComplexity: 58 },
  },
  {
    id: "artemis-tracker",
    title: "Artemis Tracker",
    category: "Software",
    description:
      "JavaScript tracker for NASA Artemis missions — launches, milestones, and mission status.",
    longDescription:
      "Artemis Tracker turns space-program news into structured mission state: launches, milestones, and a UI that makes a multi-year program legible.",
    problem: "Space missions span years; dashboards that only show 'next launch' waste most of the story.",
    approach: "Model mission phases and milestones; keep the timeline first-class.",
    architecture: "Data layer → mission state → timeline UI.",
    results: "Working Artemis mission tracker.",
    lessons: "Time-series products need phase models, not just events.",
    technologies: ["JavaScript", "Space", "Data Visualization", "Web"],
    year: 2026,
    status: "Active",
    repo: "Artemis-Tracker",
    featured: true,
    visual: "software",
    related: ["time-astro", "personal-hq", "farmer-friend-bot"],
    metrics: { researchActivity: 66, technologyDensity: 72, innovationScore: 74, projectComplexity: 68 },
  },
  {
    id: "time-astro",
    title: "TIME_ASTRO",
    category: "Software",
    description:
      "TypeScript astronomy timing tool — celestial events, schedules, and space-tech timekeeping.",
    longDescription:
      "TIME_ASTRO is a TypeScript product around astronomy timing: events, windows, and the kind of schedule UI that space enthusiasts actually check daily.",
    problem: "Astronomy tools often bury the one number you opened them for.",
    approach: "Lead with the next relevant time; keep deeper context one tap away.",
    architecture: "TypeScript client → ephemeris/event services → schedule UI.",
    results: "Working astronomy timing application.",
    lessons: "Timezone and 'now' handling are the real product surface.",
    technologies: ["TypeScript", "Astronomy", "React", "Time"],
    year: 2026,
    status: "Active",
    repo: "TIME_ASTRO",
    featured: true,
    visual: "software",
    related: ["artemis-tracker", "personal-hq", "quantum-ibm-basics"],
    metrics: { researchActivity: 68, technologyDensity: 74, innovationScore: 76, projectComplexity: 70 },
  },
  {
    id: "farmer-friend-bot",
    title: "Farmer Friend Bot",
    category: "Software",
    description:
      "MIT-licensed JavaScript bot helping farmers — practical information delivery in a simple interface.",
    longDescription:
      "Farmer Friend Bot is a service-minded build: give farmers clear, actionable information without enterprise complexity. MIT licensed so others can extend it.",
    problem: "Useful information fails when the interface assumes broadband, English, and patience.",
    approach: "Design for low-friction access and plain-language output.",
    architecture: "Bot logic → information services → simple client.",
    results: "Working farmer assistant bot.",
    lessons: "Accessibility is a product requirement, not a polish pass.",
    technologies: ["JavaScript", "Bot", "Service Design", "MIT"],
    year: 2026,
    status: "Active",
    repo: "Farmer-Friend-Bot",
    featured: true,
    visual: "software",
    related: ["livemart", "time-astro", "fitos"],
    metrics: { researchActivity: 62, technologyDensity: 68, innovationScore: 72, projectComplexity: 64 },
  },
  {
    id: "livemart",
    title: "LIVEMART",
    category: "Software",
    description:
      "MIT-licensed JavaScript marketplace application — listings, discovery, and commerce flows.",
    longDescription:
      "LIVEMART is a full marketplace product: listings, search, and the transaction-adjacent UI patterns that make commerce apps feel real.",
    problem: "Marketplaces fail on trust and information architecture long before payments.",
    approach: "Model listings cleanly; make discovery fast; keep seller/buyer paths obvious.",
    architecture: "Client → listing/search services → account flows.",
    results: "Working marketplace application.",
    lessons: "Empty states and search quality decide whether a marketplace lives or dies.",
    technologies: ["JavaScript", "Marketplace", "Product", "Web"],
    year: 2026,
    status: "Active",
    repo: "LIVEMART",
    featured: true,
    visual: "software",
    related: ["fitos", "travel-planner", "farmer-friend-bot"],
    metrics: { researchActivity: 58, technologyDensity: 72, innovationScore: 64, projectComplexity: 68 },
  },

  // ── Software / products ──────────────────────────────────────────────
  {
    id: "physics-playground",
    title: "Physics Playground",
    category: "Physics",
    description:
      "Interactive 3D physics environment — rigid-body dynamics with gravity, restitution, drag, and throw.",
    longDescription:
      "The signature playground on this site: a live Three.js + Rapier sandbox where you can spawn bodies, tune physics parameters, and throw objects around a real-feeling world.",
    problem: "Equations of motion feel abstract until you throw a box and watch energy bounce around the room.",
    approach: "Expose gravity, restitution, and shape primitives; let people drag, throw, and reset the world.",
    architecture: "Three.js scene, Rapier rigid bodies, React overlay. Live route: /playground.",
    results: "This website. The playground is the artifact.",
    lessons: "Constraints and sleep thresholds matter more than mesh beauty. Mobile GPUs need object caps.",
    technologies: ["Three.js", "Rapier", "React", "WebGL"],
    year: 2026,
    status: "Active",
    demo: "/playground",
    featured: true,
    visual: "physics",
    related: ["quickide", "airdraw", "personal-hq"],
    metrics: { researchActivity: 58, technologyDensity: 77, innovationScore: 83, projectComplexity: 73 },
  },
  {
    id: "personal-hq",
    title: "personal-HQ",
    category: "Creative Tech",
    description:
      "This portfolio platform — SaaS-style landing, project archive, world map, blog, physics playground, and resume.",
    longDescription:
      "personal-HQ is the studio itself: one coherent design system across landing, work archive, interactive map, blog, playground, and contact. Projects are data, not components — the same objects feed the grid, detail pages, search, and the map.",
    problem:
      "Most portfolios feel like disconnected demos glued together. A studio needs one design language and one data source.",
    approach: "SaaS conversion structure + editorial portfolio voice + interactive data + experimental lab bench.",
    architecture:
      "TanStack Start + React 19 + Tailwind 4 + Motion + D3 + Three.js/Rapier. Content in src/data/, platform PWA chrome preserved.",
    results: "The site you are reading — live on this domain.",
    lessons: "If it is not in the data file, it does not exist. Design tokens beat one-off styling.",
    technologies: ["TypeScript", "React", "TanStack", "Tailwind", "Three.js", "D3"],
    year: 2026,
    status: "Active",
    demo: "/",
    featured: true,
    visual: "os",
    related: ["quickide", "physics-playground", "time-astro"],
    metrics: { researchActivity: 70, technologyDensity: 88, innovationScore: 80, projectComplexity: 82 },
  },
  {
    id: "airdraw",
    title: "AirDraw",
    category: "Creative Tech",
    description:
      "Neon Air Draw — dual-hand AI spatial interface. Draw with one hand; move, scale, and rotate strokes with the other.",
    longDescription:
      "AirDraw is a real-time hand-tracking canvas: MediaPipe hands, dual-hand gestures, non-destructive transforms, WebGL rendering, and a glassmorphism HUD. Minority Report energy with production-minded performance.",
    problem: "Mouse and stylus interfaces are precise but not always natural for spatial ideas.",
    approach: "Track hands, map gestures to canvas ops, keep transforms non-destructive, and hold 60fps.",
    architecture: "Camera → MediaPipe → gesture mapper → WebGL canvas → React UI.",
    results: "Hands-free drawing and spatial manipulation prototype.",
    lessons: "Latency kills expressiveness. Smoothing without lag is the whole craft.",
    technologies: ["React", "Vite", "MediaPipe", "WebGL", "Framer Motion"],
    year: 2026,
    status: "Active",
    repo: "AirDraw",
    featured: true,
    visual: "creative",
    related: ["personal-hq", "quickide", "webrtc"],
    metrics: { researchActivity: 70, technologyDensity: 82, innovationScore: 86, projectComplexity: 76 },
  },
  {
    id: "webrtc",
    title: "WebRTC",
    category: "Software",
    description:
      "JavaScript WebRTC experiments — real-time peer connections, media, and data channels.",
    longDescription:
      "Hands-on WebRTC work: peer connections, signaling patterns, and the real-time primitives that power calls, collab tools, and live experiences.",
    problem: "Real-time feels magical until you hit NAT, codecs, and reconnect logic.",
    approach: "Build small demos that isolate one real-time concern at a time.",
    architecture: "Signaling → RTCPeerConnection → media/data channel.",
    results: "WebRTC experiment set.",
    lessons: "Signaling is half the system. Design reconnect before you design features.",
    technologies: ["JavaScript", "WebRTC", "Real-time", "Web"],
    year: 2025,
    status: "Prototype",
    repo: "webrtc",
    visual: "software",
    related: ["airdraw", "text-app", "tejas3806"],
    metrics: { researchActivity: 68, technologyDensity: 74, innovationScore: 70, projectComplexity: 72 },
  },
  {
    id: "tejas3806",
    title: "tejas3806",
    category: "Software",
    description:
      "TypeScript personal project workspace — experiments and product sketches in the open.",
    longDescription:
      "tejas3806 is a TypeScript scratch-and-build repo for product ideas that are becoming real systems — useful as a bridge between prototypes and dedicated project repos.",
    problem: "Ideas die in private branches.",
    approach: "Keep TypeScript experiments public and iterate in the open.",
    architecture: "TS project collection.",
    results: "Open TypeScript workspace.",
    lessons: "A messy public repo beats a perfect private one that never ships.",
    technologies: ["TypeScript", "React", "Node.js"],
    year: 2026,
    status: "Active",
    repo: "tejas3806",
    visual: "software",
    related: ["personal-hq", "pit-wall-pro", "claude-code"],
    metrics: { researchActivity: 60, technologyDensity: 70, innovationScore: 62, projectComplexity: 58 },
  },
  {
    id: "claude-code",
    title: "claude-code",
    category: "Software",
    description:
      "TypeScript repo exploring Claude Code workflows — agent-assisted development patterns.",
    longDescription:
      "A TypeScript workspace for experimenting with AI-assisted coding workflows: prompts, tool loops, and the patterns that make agent coding actually productive.",
    problem: "Agent coding demos rarely transfer into maintainable workflows.",
    approach: "Document what works; keep the repo as a living pattern library.",
    architecture: "TS configs + agent workflow experiments.",
    results: "Agent-assisted dev pattern set.",
    lessons: "The bottleneck moves to review and specification. Design for that.",
    technologies: ["TypeScript", "AI", "Agents", "DevTools"],
    year: 2026,
    status: "Research",
    repo: "claude-code",
    visual: "ai",
    related: ["agentic-ai-lynq", "agentic-rag-prod", "tejas3806"],
    metrics: { researchActivity: 78, technologyDensity: 80, innovationScore: 76, projectComplexity: 70 },
  },
  {
    id: "fitos",
    title: "FITOS",
    category: "Software",
    description:
      "Fitness tracking application — workouts, progress, and routine management in a clean mobile-first interface.",
    longDescription:
      "FITOS is a practical product build: workout logging, progress views, and routine workflows. Less lab experiment, more shippable app.",
    problem: "Fitness data scatters across notes and screenshots; progress becomes invisible.",
    approach: "Centralize logging, surface trends, and keep the interaction loop short.",
    architecture: "Client UI → local/remote store → analytics summaries.",
    results: "Functional fitness tracking app.",
    lessons: "Consumer apps live and die on the logging loop. Friction is the enemy.",
    technologies: ["JavaScript", "React", "Mobile", "Product"],
    year: 2026,
    status: "Active",
    repo: "FITOS",
    featured: true,
    visual: "software",
    related: ["livemart", "travel-planner", "expense-tracker"],
    metrics: { researchActivity: 55, technologyDensity: 70, innovationScore: 64, projectComplexity: 66 },
  },
  {
    id: "travel-planner",
    title: "Travel Planner",
    category: "Software",
    description:
      "Trip planning application for itineraries, destinations, and day-by-day organization.",
    longDescription:
      "Travel Planner structures the messy middle of trip design — destinations, days, and notes — into a single planning surface.",
    problem: "Itineraries live in chats, tabs, and half-remembered bookmarks.",
    approach: "Model trips as structured days and activities, then make reordering and editing cheap.",
    architecture: "Planner UI → itinerary store → share/export views.",
    results: "Working itinerary planner prototype.",
    lessons: "Planning tools succeed when editing a day is faster than opening a spreadsheet.",
    technologies: ["JavaScript", "React", "Product", "Data"],
    year: 2026,
    status: "Prototype",
    repo: "travel-planner",
    visual: "software",
    related: ["fitos", "livemart", "expense-tracker"],
    metrics: { researchActivity: 52, technologyDensity: 64, innovationScore: 60, projectComplexity: 60 },
  },
  {
    id: "expense-tracker",
    title: "EXPENSE-TRACKER",
    category: "Software",
    description:
      "Python expense tracking application — record spend, categorize, and see where money goes.",
    longDescription:
      "A focused personal finance tool: log expenses, categorize them, and surface the patterns that spreadsheet apps bury.",
    problem: "Expense tracking fails when entry is tedious and reporting is vague.",
    approach: "Fast entry, clear categories, and reports that answer real questions.",
    architecture: "CLI/app → storage → reports.",
    results: "Working expense tracker.",
    lessons: "Personal finance tools are habit tools. Reduce friction to near zero.",
    technologies: ["Python", "Finance", "CLI", "Data"],
    year: 2026,
    status: "Active",
    repo: "EXPENSE-TRACKER",
    visual: "software",
    related: ["fitos", "travel-planner", "valut"],
    metrics: { researchActivity: 50, technologyDensity: 58, innovationScore: 54, projectComplexity: 52 },
  },
  {
    id: "valut",
    title: "valut",
    category: "Software",
    description:
      "Personal vault / utility project — experiments in storage, notes, or secure personal data patterns.",
    longDescription:
      "valut is a personal utility experiment around storing and organizing sensitive personal data — a lab for vault-style product patterns.",
    problem: "Personal data tools need to be trustworthy before they are feature-rich.",
    approach: "Start with storage and access patterns; add features only when the core is solid.",
    architecture: "Utility app experiments.",
    results: "Vault/utility prototype work.",
    lessons: "Trust is a UX feature. Encryption without clarity is just fear.",
    technologies: ["Software", "Security", "Product"],
    year: 2026,
    status: "Prototype",
    repo: "valut",
    visual: "software",
    related: ["expense-tracker", "personal-hq", "fitos"],
    metrics: { researchActivity: 55, technologyDensity: 60, innovationScore: 58, projectComplexity: 56 },
  },
  {
    id: "sudoku",
    title: "Sudoku",
    category: "Creative Tech",
    description:
      "HTML Sudoku game — clean board UI, solver-friendly structure, and playful interaction.",
    longDescription:
      "A Sudoku build focused on board clarity and interaction quality: generation, validation, and the small details that make a puzzle game feel finished.",
    problem: "Puzzle UIs fail when board state and user input fight each other.",
    approach: "Model the board cleanly; make validation instant; keep the visual hierarchy calm.",
    architecture: "HTML/CSS/JS board + solver logic.",
    results: "Playable Sudoku web game.",
    lessons: "Game feel is 80% feedback timing and 20% rules.",
    technologies: ["HTML", "JavaScript", "Game", "Logic"],
    year: 2026,
    status: "Active",
    repo: "sudoku",
    visual: "creative",
    related: ["web-dev-basics", "airdraw", "text-app"],
    metrics: { researchActivity: 48, technologyDensity: 55, innovationScore: 58, projectComplexity: 48 },
  },
  {
    id: "text-app",
    title: "text-app",
    category: "Software",
    description:
      "JavaScript text application — editing, organizing, and working with text content in the browser.",
    longDescription:
      "A focused text app experiment: browser-based editing and organization without bolting on a full IDE.",
    problem: "Text tools bloat quickly; the core loop is write, find, reorganize.",
    approach: "Keep the editor core small; add organization only when the loop is solid.",
    architecture: "JS client → local persistence.",
    results: "Working text application prototype.",
    lessons: "Feature requests should pass the 'does this serve the write loop?' test.",
    technologies: ["JavaScript", "Web", "Product"],
    year: 2025,
    status: "Prototype",
    repo: "text-app",
    visual: "software",
    related: ["my-react", "web-dev-pjt", "sudoku"],
    metrics: { researchActivity: 48, technologyDensity: 58, innovationScore: 52, projectComplexity: 50 },
  },
  {
    id: "my-react",
    title: "MY-REACT",
    category: "Software",
    description:
      "React practice and component experiments — hooks, state patterns, and UI building blocks.",
    longDescription:
      "A React learning and experimentation repo: component patterns, hooks, and the UI primitives that later product work is built from.",
    problem: "React knowledge sticks only when you rebuild the same idea three ways.",
    approach: "Small component studies with clear constraints.",
    architecture: "React component experiments.",
    results: "React pattern library.",
    lessons: "Learn hooks by building the state machines they replace.",
    technologies: ["JavaScript", "React", "UI"],
    year: 2025,
    status: "Archive",
    repo: "MY-REACT",
    visual: "software",
    related: ["web-dev-pjt", "text-app", "personal-hq"],
    metrics: { researchActivity: 50, technologyDensity: 58, innovationScore: 48, projectComplexity: 45 },
  },
  {
    id: "web-dev-pjt",
    title: "web-dev-pjt",
    category: "Software",
    description:
      "JavaScript web development project — full frontend build practice across layout, state, and interaction.",
    longDescription:
      "A complete web-dev project: HTML/CSS/JS application work that practices the fundamentals later products depend on.",
    problem: "Tutorials do not build muscle; shipping a small full project does.",
    approach: "Build the whole thing: layout, interaction, and polish.",
    architecture: "Static/JS web app.",
    results: "Working web development project.",
    lessons: "Finish the polish pass. Half-built projects teach half-skills.",
    technologies: ["JavaScript", "HTML", "CSS", "Web"],
    year: 2026,
    status: "Archive",
    repo: "web-dev-pjt",
    visual: "software",
    related: ["web-dev-basics", "my-react", "text-app"],
    metrics: { researchActivity: 48, technologyDensity: 55, innovationScore: 48, projectComplexity: 48 },
  },
  {
    id: "dbms-pjt2",
    title: "dbms-pjt2",
    category: "Software",
    description:
      "Python DBMS project — schema design, queries, and database-backed application logic.",
    longDescription:
      "A database systems project: model entities, write the queries, and wire a Python application on top. Practical schema work rather than theory-only exercises.",
    problem: "DBMS knowledge fails in apps when schema and query design were never practiced together.",
    approach: "Design the schema first; implement queries against real relationships.",
    architecture: "Python app → relational DB → query layer.",
    results: "Working DB-backed Python project.",
    lessons: "Indexes and constraints are product decisions, not afterthoughts.",
    technologies: ["Python", "SQL", "DBMS", "Database"],
    year: 2026,
    status: "Active",
    repo: "dbms-pjt2",
    visual: "software",
    related: ["django", "personal-rag", "ds-course"],
    metrics: { researchActivity: 60, technologyDensity: 62, innovationScore: 55, projectComplexity: 60 },
  },
  {
    id: "django",
    title: "Django",
    category: "Software",
    description:
      "Django web applications — backend APIs, admin dashboards, and dynamic pages.",
    longDescription:
      "A repository of Django apps covering backend APIs, admin surfaces, and server-rendered pages — practical full-stack Python web work.",
    problem: "Backend frameworks click when you ship an admin and an API, not when you read the tutorial.",
    approach: "Build small Django apps end-to-end: models, views, templates, admin.",
    architecture: "Django project collection.",
    results: "Working Django applications.",
    lessons: "The admin is a product. Design it like one.",
    technologies: ["Python", "Django", "HTML", "CSS", "JavaScript"],
    year: 2025,
    status: "Archive",
    repo: "Django",
    visual: "software",
    related: ["dbms-pjt2", "web-dev-basics", "python"],
    metrics: { researchActivity: 55, technologyDensity: 60, innovationScore: 50, projectComplexity: 55 },
  },
  {
    id: "dbms-project-2",
    title: "DBMS Project",
    category: "Software",
    description:
      "Database management system project work — modeling, normalization, and application integration.",
    longDescription:
      "Course-aligned DBMS project work covering entity modeling, normalization, and connecting applications to relational stores.",
    problem: "Database courses often stop at ER diagrams before the application layer.",
    approach: "Model, implement, and integrate — all three.",
    architecture: "DB schema + application queries.",
    results: "DBMS project deliverables.",
    lessons: "Normalization is only useful if the queries still feel natural.",
    technologies: ["SQL", "DBMS", "Python"],
    year: 2026,
    status: "Prototype",
    visual: "software",
    related: ["dbms-pjt2", "django", "ds-course"],
    metrics: { researchActivity: 58, technologyDensity: 58, innovationScore: 50, projectComplexity: 56 },
  },
  {
    id: "python",
    title: "PYTHON",
    category: "Education",
    description:
      "Jupyter notebook collection for Python practice — language fundamentals through applied exercises.",
    longDescription:
      "A structured Python notebook archive covering the language core that every other project here depends on.",
    problem: "Python 'knowledge' is uneven until the fundamentals are drilled.",
    approach: "Notebook-per-concept with runnable examples.",
    architecture: "Notebook collection.",
    results: "Python fundamentals archive.",
    lessons: "Drill the basics until they are boring. That is when they are solid.",
    technologies: ["Python", "Jupyter", "Education"],
    year: 2026,
    status: "Active",
    repo: "PYTHON",
    visual: "data",
    related: ["python-basic", "100-days-of-python", "ds-course"],
    metrics: { researchActivity: 55, technologyDensity: 50, innovationScore: 45, projectComplexity: 40 },
  },
  {
    id: "python-basic",
    title: "Python Basic",
    category: "Education",
    description:
      "Python fundamentals repository — syntax, data structures, and core language patterns.",
    longDescription:
      "Clean fundamentals: variables, control flow, functions, and data structures — the substrate under every Python project in this archive.",
    problem: "Advanced projects fail on basic language misunderstandings.",
    approach: "Small, focused examples for each core concept.",
    architecture: "Python example collection.",
    results: "Fundamentals reference.",
    lessons: "Re-read your fundamentals repo before blaming the framework.",
    technologies: ["Python", "Education"],
    year: 2025,
    status: "Archive",
    repo: "Python-basic",
    visual: "data",
    related: ["python", "100-days-of-python", "python-dsa"],
    metrics: { researchActivity: 48, technologyDensity: 45, innovationScore: 40, projectComplexity: 35 },
  },
  {
    id: "100-days-of-python",
    title: "100 Days of Python",
    category: "Education",
    description:
      "Structured 100-day Python challenge — daily exercises building fluency across the language and libraries.",
    longDescription:
      "A commitment device: 100 days of Python practice spanning language core, libraries, and small applied projects.",
    problem: "Spaced, daily practice beats weekend marathons for language fluency.",
    approach: "One focused exercise per day; keep the streak public.",
    architecture: "Daily exercise archive.",
    results: "100-day practice log.",
    lessons: "Consistency compounds. Miss a day, do two.",
    technologies: ["Python", "Education", "Practice"],
    year: 2025,
    status: "Archive",
    repo: "100-days-of-Python",
    visual: "data",
    related: ["python-basic", "python", "cpp"],
    metrics: { researchActivity: 52, technologyDensity: 48, innovationScore: 42, projectComplexity: 40 },
  },
  {
    id: "cpp",
    title: "CPP DSA Collection",
    category: "Education",
    description:
      "Well-organized C++/Python DSA problem collection — arrays, trees, graphs, DP, and system design concepts.",
    longDescription:
      "A curated DSA library in C++ and Python: problems, solutions, and system-design notes organized by topic for interview and fundamentals prep.",
    problem: "DSA prep fails without structure — random LeetCode does not build a mental map.",
    approach: "Organize by topic; write solutions you would explain out loud.",
    architecture: "Topic-organized problem + solution tree.",
    results: "C++/Python DSA reference collection.",
    lessons: "Explain the pattern, not just the solution. If you cannot teach it, you do not own it.",
    technologies: ["C++", "Python", "DSA", "System Design"],
    year: 2026,
    status: "Active",
    repo: "CPP",
    featured: true,
    visual: "data",
    related: ["cpp-dsa", "python-dsa", "java-dsa", "datastructures-algorithms"],
    metrics: { researchActivity: 60, technologyDensity: 58, innovationScore: 48, projectComplexity: 62 },
  },
  {
    id: "cpp-dsa",
    title: "CPP-DSA",
    category: "Education",
    description:
      "C++ data structures and algorithms practice repository.",
    longDescription:
      "Focused C++ DSA practice — implementations and problem solutions for core structures and algorithms.",
    problem: "C++ fluency for DSA requires deliberate implementation practice, not just reading solutions.",
    approach: "Implement, test, and annotate each structure and algorithm.",
    architecture: "C++ practice tree.",
    results: "C++ DSA practice set.",
    lessons: "Pointers and ownership in C++ are part of the algorithm.",
    technologies: ["C++", "DSA"],
    year: 2026,
    status: "Active",
    repo: "CPP-DSA",
    visual: "data",
    related: ["cpp", "python-dsa", "datastructures-algorithms"],
    metrics: { researchActivity: 55, technologyDensity: 55, innovationScore: 42, projectComplexity: 55 },
  },
  {
    id: "python-dsa",
    title: "Python-DSA",
    category: "Education",
    description:
      "Python data structures and algorithms practice — clean implementations and problem solutions.",
    longDescription:
      "Python DSA practice for interviews and fundamentals: structures, algorithms, and the Pythonic way to implement them.",
    problem: "Python DSA needs both the algorithm and the idiomatic implementation.",
    approach: "Implement in Python with clarity and complexity notes.",
    architecture: "Python practice tree.",
    results: "Python DSA practice set.",
    lessons: "Python hides cost until it does not. Know your complexity.",
    technologies: ["Python", "DSA"],
    year: 2025,
    status: "Active",
    repo: "Python-DSA",
    visual: "data",
    related: ["cpp-dsa", "java-dsa", "cpp"],
    metrics: { researchActivity: 54, technologyDensity: 52, innovationScore: 40, projectComplexity: 50 },
  },
  {
    id: "java-dsa",
    title: "JAVA_DSA",
    category: "Education",
    description:
      "Java data structures and algorithms practice repository.",
    longDescription:
      "Java DSA practice covering core structures and algorithms — useful for interviews and for systems thinking in a statically typed language.",
    problem: "Java DSA practice builds a different mental model than Python or C++.",
    approach: "Implement structures and algorithms in Java with clear complexity notes.",
    architecture: "Java practice tree.",
    results: "Java DSA practice set.",
    lessons: "Static types catch a class of mistakes early. Use them.",
    technologies: ["Java", "DSA"],
    year: 2025,
    status: "Active",
    repo: "JAVA_DSA",
    visual: "data",
    related: ["java-tutorial", "cpp", "python-dsa"],
    metrics: { researchActivity: 52, technologyDensity: 50, innovationScore: 38, projectComplexity: 48 },
  },
  {
    id: "datastructures-algorithms",
    title: "DataStructures-Algorithms",
    category: "Education",
    description:
      "MIT-licensed DSA resource collection — theory links, interview problems, and solutions from GFG/LeetCode.",
    longDescription:
      "A forked-and-maintained DSA resource hub: links, theory notes, and curated problem solutions for interview prep across C++ and related tracks.",
    problem: "Interview prep needs a map, not a pile of bookmarks.",
    approach: "Curate by topic and keep the resource list current.",
    architecture: "Markdown resource tree.",
    results: "DSA resource index.",
    lessons: "Fork with intent — keep only what you still use.",
    technologies: ["C++", "DSA", "Interview Prep"],
    year: 2025,
    status: "Archive",
    repo: "DataStructures-Algorithms",
    visual: "data",
    related: ["cpp", "cpp-dsa", "java-dsa"],
    metrics: { researchActivity: 45, technologyDensity: 40, innovationScore: 35, projectComplexity: 35 },
  },
  {
    id: "java-tutorial",
    title: "JAVA_tutorial",
    category: "Education",
    description:
      "Java tutorial repository — language fundamentals and core concepts in structured lessons.",
    longDescription:
      "Java learning notes and tutorial code covering syntax, OOP, and the language features that show up in DSA and backend work.",
    problem: "Java is verbose; tutorials should show why the verbosity earns its keep.",
    approach: "Lesson-style examples with clear comments and runnable code.",
    architecture: "Tutorial source tree.",
    results: "Java tutorial set.",
    lessons: "Learn the type system; it is Java's actual product.",
    technologies: ["Java", "Education"],
    year: 2025,
    status: "Archive",
    repo: "JAVA_tutorial",
    visual: "software",
    related: ["java-dsa", "django", "python-basic"],
    metrics: { researchActivity: 48, technologyDensity: 45, innovationScore: 35, projectComplexity: 38 },
  },
  {
    id: "web-dev-basics",
    title: "WEB-DEV-basics",
    category: "Education",
    description:
      "HTML, CSS, and JavaScript fundamentals — the base layer under every web product in this archive.",
    longDescription:
      "WEB-DEV-basics is the foundation: semantic HTML, modern CSS, and vanilla JS patterns that later React/TypeScript work builds on.",
    problem: "Framework knowledge without fundamentals is fragile.",
    approach: "Practice layout, interaction, and the DOM until they are automatic.",
    architecture: "HTML/CSS/JS examples.",
    results: "Web fundamentals archive.",
    lessons: "Learn the platform before the framework. It always pays back.",
    technologies: ["HTML", "CSS", "JavaScript", "Education"],
    year: 2025,
    status: "Archive",
    repo: "WEB-DEV-basics",
    visual: "software",
    related: ["web-dev-pjt", "my-react", "sudoku"],
    metrics: { researchActivity: 48, technologyDensity: 48, innovationScore: 40, projectComplexity: 40 },
  },
];

export const projects: Project[] = seeds.map((seed) => {
  const p = project(seed);
  if (p.category === "Education" && (p.visual === "data" || p.visual === "software")) {
    p.visual = "education";
  }
  if (p.category === "Sports" && (p.visual === "data" || p.visual === "software")) {
    p.visual = "sports";
  }
  return p;
});

const byId = new Map(projects.map((p) => [p.id, p]));
const byCountryId = new Map(projects.map((p) => [p.countryId, p]));

export function getProject(id: string) {
  return byId.get(id);
}

export function getProjectByCountryId(countryId: string) {
  return byCountryId.get(String(countryId));
}

export function searchProjects(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return projects;
  return projects.filter((p) => {
    const hay = [
      p.title,
      p.category,
      p.description,
      p.country,
      p.status,
      ...p.technologies,
    ]
      .join(" ")
      .toLowerCase();
    return hay.includes(q);
  });
}

export function filterProjects(category: Category) {
  if (category === "All") return projects;
  return projects.filter((p) => p.category === category);
}
