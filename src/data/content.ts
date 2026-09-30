export const metrics = [
  { value: 58, prefix: "", label: "Repositories", infinite: false },
  { value: 9, prefix: "0", label: "Domains", infinite: false },
  { value: 4, prefix: "0", label: "Research Areas", infinite: false },
  { value: 0, prefix: "", label: "Ideas", infinite: true },
] as const;

export const features = [
  {
    number: "01",
    title: "Research",
    description:
      "Turn complex questions into experiments, models, and publishable work.",
  },
  {
    number: "02",
    title: "Engineering",
    description:
      "Build reliable software systems rather than isolated prototypes.",
  },
  {
    number: "03",
    title: "Intelligence",
    description:
      "Use AI, data, and computation to uncover patterns and automate workflows.",
  },
  {
    number: "04",
    title: "Exploration",
    description:
      "Experiment with physics, simulation, visualization, and emerging technology.",
  },
] as const;

export const aboutStatement =
  "Curious about everything. Serious about building.";

export const aboutBody = [
  "I'm Tejas Mellimpudi — a Space & Rocketry enthusiast and software developer at BITS Pilani Hyderabad. I work across Python, C++, C, DSA, web development, data science, ML/AI, and quantum computing. The through-line is simple: explore the cosmos through code.",
  "That usually looks like quantum program tooling on one desk, RAG and agentic systems on another, and sports-data or productivity apps that have to actually run. Physics lab work (including advanced experimental physics) keeps the models honest.",
  "This site is the studio: real GitHub projects, an interactive world map, a physics playground, and a blog. Gallery cards deep-link to the live repos as the work matures.",
];

export const timeline = [
  {
    year: "2024",
    title: "Foundations & first systems",
    description:
      "Started serious computational work — C/C++, DSA, Python, and the first web and data projects. Began sharing physics through Animated Physics on YouTube.",
    technologies: ["C", "C++", "Python", "DSA"],
    projects: ["CPP / CPP-DSA", "Animated Physics"],
  },
  {
    year: "2025",
    title: "Data, AI & the web",
    description:
      "Expanded into data science, ML, web apps, and RAG systems. Built stock analysis tools, travel/expense apps, and college-focused retrieval systems.",
    technologies: ["Python", "Pandas", "ML", "RAG", "React"],
    projects: ["stock-analyst", "PersonalRAG", "college-rag"],
  },
  {
    year: "2026",
    title: "Quantum, agents & this studio",
    description:
      "Quantum program tooling (QUICKIDE / QuCPL), agentic RAG pipelines, F1 race analytics, and this personal-HQ portfolio — research-shaped products that ship.",
    technologies: ["Quantum", "TypeScript", "Agents", "Three.js"],
    projects: ["QUICKIDE", "Agentic-RAG-PROD", "personal-HQ"],
  },
  {
    year: "Future",
    title: "Research + technology + building",
    description:
      "Keep the lab and the product in the same room: quantum and space-tech research that ships, software that stays technically honest.",
    technologies: ["Quantum", "Space Tech", "Systems"],
    projects: ["Open"],
  },
] as const;

export const skillGroups = [
  {
    title: "Physics",
    items: [
      "Quantum Mechanics",
      "Electromagnetism",
      "Statistical Mechanics",
      "Nuclear Physics",
      "Quantum Information",
    ],
  },
  {
    title: "Quantum Computing",
    items: [
      "Quantum Circuits",
      "QuCPL / Quantum Languages",
      "Quantum Algorithms",
      "Simulation",
      "QUICKIDE",
    ],
  },
  {
    title: "AI / ML",
    items: [
      "Python",
      "NumPy",
      "Pandas",
      "ML / Data Science",
      "RAG Systems",
      "LLMs",
      "Agentic AI",
    ],
  },
  {
    title: "Software",
    items: ["C", "C++", "Python", "JavaScript", "TypeScript", "React", "Git", "APIs"],
  },
  {
    title: "Data / Quant",
    items: [
      "Statistics",
      "Stock Analysis",
      "Risk / Signals",
      "Data Visualization",
      "Jupyter",
    ],
  },
  {
    title: "Tools",
    items: ["GitHub", "Linux", "VS Code", "Jupyter", "Firebase", "Docker"],
  },
] as const;

export const testimonials = [
  {
    quote:
      "Sample testimonial — replace with a real endorsement. Tejas treats research and product as the same craft.",
    name: "A. Rivera",
    role: "Research collaborator",
    organization: "Sample Lab",
    initials: "AR",
  },
  {
    quote:
      "Sample testimonial — replace with a real endorsement. Rare to find someone who can hold the physics and the interface in one hand.",
    name: "M. Chen",
    role: "Engineering mentor",
    organization: "Sample Studio",
    initials: "MC",
  },
  {
    quote:
      "Sample testimonial — replace with a real endorsement. The systems are ambitious, but the communication stays precise.",
    name: "S. Okonkwo",
    role: "Program advisor",
    organization: "Sample Institute",
    initials: "SO",
  },
];

export const services = [
  {
    id: "explore",
    name: "Explore",
    price: "Free / Intro",
    description: "For students and early-stage ideas.",
    includes: [
      "Project consultation",
      "Technical brainstorming",
      "Architecture discussion",
    ],
    cta: "Start a Conversation",
    featured: false,
  },
  {
    id: "build",
    name: "Build",
    price: "Let's Talk",
    description: "For serious projects.",
    includes: [
      "Technical architecture",
      "Prototype development",
      "Data / AI integration",
      "Interactive visualization",
      "Custom implementation",
    ],
    cta: "Discuss a Project",
    featured: true,
  },
  {
    id: "research",
    name: "Research / Systems",
    price: "Custom",
    description: "For advanced technical collaborations.",
    includes: [
      "Research exploration",
      "Simulation",
      "AI systems",
      "Quantum computing",
      "Data systems",
      "Custom technical development",
    ],
    cta: "Start a Conversation",
    featured: false,
  },
] as const;

export const linkButtons = [
  { id: "portfolio", label: "Portfolio", href: "/", icon: "home" },
  { id: "projects", label: "Projects", href: "/projects", icon: "work" },
  { id: "blog", label: "Blog", href: "/blog", icon: "file" },
  { id: "playground", label: "Physics Playground", href: "/playground", icon: "play" },
  { id: "world", label: "World Map", href: "/#world", icon: "globe" },
  { id: "resume", label: "Resume", href: "/resume", icon: "file" },
  { id: "contact", label: "Contact", href: "/contact", icon: "mail" },
] as const;

export const projectTypes = [
  "Quantum",
  "AI / ML",
  "Software",
  "Data / Finance",
  "Physics",
  "Education",
  "Sports",
  "Creative Tech",
  "Research",
  "Other",
] as const;

export const budgetScopes = [
  "Intro / explore",
  "Prototype",
  "Full build",
  "Research collaboration",
  "Not sure yet",
] as const;
