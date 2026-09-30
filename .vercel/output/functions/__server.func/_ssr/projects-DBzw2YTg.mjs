import { i as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowUpRight, o as Sparkles } from "../_libs/lucide-react.mjs";
import { r as cn, t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { l as projects, n as categories, r as filterProjects } from "./site-shell-D60Mg0ll.mjs";
import { c as statusTextClass, i as categoryChipClass, o as isFlagshipProject, r as categoryActiveStyle, s as statusDotClass, t as Badge } from "./badge-DFV1pwBc.mjs";
import { i as AnimatePresence, n as useReducedMotion } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { n as SectionHeading, t as Reveal } from "./reveal-VloQCJ-f.mjs";
import { t as ProjectVisual } from "./project-visual-CzcSYPp6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-DBzw2YTg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var CASE_STUDY_IDS = [
	"quickide",
	"personal-rag",
	"stock-signal-generator"
];
function Projects({ archive = false }) {
	const [cat, setCat] = (0, import_react.useState)("All");
	const reduce = useReducedMotion();
	const list = (0, import_react.useMemo)(() => {
		const all = filterProjects(cat);
		return archive ? all : all.filter((p) => p.featured).slice(0, 9);
	}, [cat, archive]);
	const caseStudies = (0, import_react.useMemo)(() => CASE_STUDY_IDS.map((id) => projects.find((p) => p.id === id)).filter((p) => Boolean(p)), []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "work",
		className: "scroll-mt-24 border-t border-border py-20 sm:py-28",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl px-4 sm:px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: archive ? "Archive" : "Selected Work",
					title: "A collection of experiments, systems, research projects and products.",
					subtitle: "Real GitHub projects and this site's physics playground. Filter without leaving the page."
				}) }),
				!archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Case studies"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-3",
						children: caseStudies.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudyCard, { project }, project.id))
					})]
				}) }) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
					children: categories.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						"data-filter": c,
						onClick: () => setCat(c),
						style: cat === c ? categoryActiveStyle(c) : void 0,
						className: categoryChipClass(c, cat === c),
						children: c
					}, c))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
					layout: true,
					className: cn("mt-8 grid gap-3", archive ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
						mode: "popLayout",
						children: list.map((project, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
							layout: true,
							initial: reduce ? false : {
								opacity: 0,
								y: 12
							},
							animate: {
								opacity: 1,
								y: 0
							},
							exit: {
								opacity: 0,
								y: -8
							},
							transition: {
								duration: .28,
								delay: reduce ? 0 : Math.min(i * .03, .3)
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectCard, {
								project,
								dense: archive
							})
						}, project.id))
					})
				}),
				!archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects",
							children: ["View the full archive", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
						})
					})
				}) : null
			]
		})
	});
}
function CaseStudyCard({ project }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/projects/$id",
		params: { id: project.id },
		className: "group card-featured flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300 hover:-translate-y-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
				visual: project.visual,
				category: project.category,
				className: "aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.04]"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-3 top-3 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						category: project.category,
						children: project.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						status: project.status,
						children: project.status
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						children: "Case study"
					})
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-xs text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: project.year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("inline-flex items-center gap-1.5", statusTextClass(project.status)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", statusDotClass(project.status)) }), project.status]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-2 font-display text-xl tracking-tight",
					children: project.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground",
					children: project.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mono mt-4 text-[11px] text-subtle",
					children: project.technologies.slice(0, 5).join(" · ")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "mt-auto inline-flex items-center gap-1 pt-4 text-sm text-foreground",
					children: ["Read the case study", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
				})
			]
		})]
	});
}
function ProjectCard({ project, dense = false }) {
	const flagship = isFlagshipProject(project.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/projects/$id",
		params: { id: project.id },
		className: cn("group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-1", flagship ? "card-featured" : "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
				visual: project.visual,
				category: project.category,
				className: cn("transition-transform duration-500 group-hover:scale-[1.04]", dense ? "aspect-[16/9]" : "aspect-[16/10]")
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "absolute left-2.5 top-2.5 flex flex-wrap gap-1.5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						category: project.category,
						children: project.category
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						status: project.status,
						children: project.status
					}),
					flagship ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						variant: "accent",
						children: "Featured"
					}) : null
				]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-1 flex-col px-3.5 pb-3.5 pt-3.5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] text-subtle",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono",
							children: project.year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "·" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: cn("inline-flex items-center gap-1.5", statusTextClass(project.status)),
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", statusDotClass(project.status)) }), project.status]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: cn("mt-1.5 font-display tracking-tight", dense ? "text-base" : "text-lg"),
					children: project.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: cn("mt-1.5 overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[max-height,opacity,margin] duration-300", dense ? "line-clamp-2" : "max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100 max-md:mt-2 max-md:max-h-20 max-md:opacity-100"),
					children: project.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mono mt-auto pt-2.5 text-[10px] uppercase tracking-wide text-subtle",
					children: project.technologies.slice(0, dense ? 3 : 4).join(" · ")
				})
			]
		})]
	});
}
//#endregion
export { Projects as t };
