import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { r as cn } from "./theme-toggle-BXztJUq1.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/badge-DFV1pwBc.js
var import_jsx_runtime = require_jsx_runtime();
var categoryVar = {
	All: "var(--cat-default)",
	Quantum: "var(--cat-quantum)",
	AI: "var(--cat-ai)",
	Physics: "var(--cat-physics)",
	Software: "var(--cat-software)",
	Data: "var(--cat-data)",
	Finance: "var(--cat-finance)",
	"Creative Tech": "var(--cat-creative)",
	Education: "var(--cat-education)",
	Sports: "var(--cat-sports)"
};
function categoryChipClass(category, active) {
	if (active) return cn("h-10 shrink-0 rounded-full border px-4 text-sm font-medium transition-colors duration-150", "text-background");
	return cn("h-10 shrink-0 rounded-full border px-4 text-sm transition-colors duration-150", "border-border bg-card text-muted-foreground hover:text-foreground");
}
function categoryActiveStyle(category) {
	const color = categoryVar[category] ?? "var(--cat-default)";
	return {
		backgroundColor: color,
		borderColor: color,
		color: "var(--background)"
	};
}
function categoryBadgeStyle(category) {
	const color = categoryVar[category] ?? "var(--cat-default)";
	return {
		color,
		backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
		borderColor: `color-mix(in oklab, ${color} 36%, transparent)`
	};
}
function categorySvgClass(category) {
	switch (category) {
		case "Quantum": return "text-[var(--cat-quantum)]";
		case "AI": return "text-[var(--cat-ai)]";
		case "Physics": return "text-[var(--cat-physics)]";
		case "Software": return "text-[var(--cat-software)]";
		case "Data": return "text-[var(--cat-data)]";
		case "Finance": return "text-[var(--cat-finance)]";
		case "Creative Tech": return "text-[var(--cat-creative)]";
		case "Education": return "text-[var(--cat-education)]";
		case "Sports": return "text-[var(--cat-sports)]";
		default: return "text-accent";
	}
}
var statusVar = {
	Active: "var(--status-active)",
	Research: "var(--status-research)",
	Prototype: "var(--status-prototype)",
	Lab: "var(--status-lab)",
	Archive: "var(--status-archive)"
};
function statusBadgeStyle(status) {
	const color = statusVar[status] ?? "var(--subtle)";
	return {
		color,
		backgroundColor: `color-mix(in oklab, ${color} 14%, transparent)`,
		borderColor: `color-mix(in oklab, ${color} 36%, transparent)`
	};
}
function statusDotClass(status) {
	switch (status) {
		case "Active": return "bg-[var(--status-active)]";
		case "Research": return "bg-[var(--status-research)]";
		case "Prototype": return "bg-[var(--status-prototype)]";
		case "Lab": return "bg-[var(--status-lab)]";
		case "Archive": return "bg-[var(--status-archive)]";
		default: return "bg-subtle";
	}
}
function statusTextClass(status) {
	switch (status) {
		case "Active": return "text-[var(--status-active)]";
		case "Research": return "text-[var(--status-research)]";
		case "Prototype": return "text-[var(--status-prototype)]";
		case "Lab": return "text-[var(--status-lab)]";
		case "Archive": return "text-[var(--status-archive)]";
		default: return "text-subtle";
	}
}
var FLAGSHIP_IDS = /* @__PURE__ */ new Set([
	"quickide",
	"personal-rag",
	"stock-signal-generator",
	"physics-playground",
	"my-qucpl",
	"agentic-rag-prod"
]);
function isFlagshipProject(id) {
	return FLAGSHIP_IDS.has(id);
}
var caseStudyNotes = {
	quickide: {
		highlights: [
			"Custom QuCPL language with GUI editing, circuit visualization, and step-through simulation",
			"Qiskit-backed execution path with IBM Quantum job submission",
			"Noise-model awareness so simulated results stay honest"
		],
		next: [
			"Amplitude visualization that beginners can read without linear-algebra background",
			"Algorithm templates: Grover, phase estimation",
			"Export path from QuCPL sketches into NumPy state-vector notebooks"
		],
		stackNotes: [
			"React",
			"Node/Express",
			"Flask/Qiskit",
			"MongoDB",
			"OpenQASM 3.0"
		]
	},
	"personal-rag": {
		highlights: [
			"Hybrid retrieval (vector + BM25) instead of pure embeddings",
			"Multi-tenant workspaces with document chat and citations",
			"Local-first defaults with optional Ollama models"
		],
		next: [
			"Eval harness for retrieval regressions",
			"Knowledge-graph layer for entity-aware answers",
			"Simpler onboarding path for first documents"
		],
		stackNotes: [
			"FastAPI",
			"PostgreSQL/pgvector",
			"Redis",
			"Ollama",
			"RAG"
		]
	},
	"stock-signal-generator": {
		highlights: [
			"CLI backtesting engine with fee/slippage models",
			"Nine strategies with walk-forward optimization",
			"149 tests — the system fails loudly when a signal drifts"
		],
		next: [
			"Richer portfolio-level metrics",
			"Web UI for strategy comparison",
			"Live data adapters beyond historical CSVs"
		],
		stackNotes: [
			"Python",
			"Backtesting",
			"Monte Carlo",
			"CLI"
		]
	},
	"physics-playground": {
		highlights: [
			"Rigid-body lab with gravity, restitution, drag, and throw",
			"Live parameter panel — simulation as an interface, not a video",
			"Mobile-aware rendering (shadows off on small screens)"
		],
		next: [
			"Preset scenes: zero-g, magnet, pendulum",
			"Shareable URL state for a given experiment",
			"Telemetry overlays that show what was actually measured"
		],
		stackNotes: [
			"Three.js",
			"R3F",
			"Rapier",
			"React"
		]
	},
	"my-qucpl": {
		highlights: ["Quantum programming language toolchain", "Compilation, simulation, visualization, OpenQASM interop"],
		next: ["Library of reusable gate patterns", "Stronger error messages for beginners"],
		stackNotes: [
			"Quantum",
			"OpenQASM",
			"Python"
		]
	},
	"agentic-rag-prod": {
		highlights: ["Production-shaped agentic retrieval", "Tool use, query reformulation, API-first delivery"],
		next: ["Cost/latency budgets per tool call", "Trace UI for failed plans"],
		stackNotes: [
			"Agents",
			"RAG",
			"APIs"
		]
	}
};
var badgeVariants = cva("inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide uppercase", {
	variants: { variant: {
		default: "border-border bg-card text-muted-foreground",
		accent: "border-transparent bg-accent-soft text-accent",
		solid: "border-transparent bg-foreground text-background"
	} },
	defaultVariants: { variant: "default" }
});
function Badge({ className, variant, category, status, ...props }) {
	const style = status && variant !== "solid" ? statusBadgeStyle(status) : category && variant !== "solid" ? categoryBadgeStyle(category) : void 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn(badgeVariants({ variant }), className),
		style,
		...props
	});
}
//#endregion
export { categorySvgClass as a, statusTextClass as c, categoryChipClass as i, caseStudyNotes as n, isFlagshipProject as o, categoryActiveStyle as r, statusDotClass as s, Badge as t };
