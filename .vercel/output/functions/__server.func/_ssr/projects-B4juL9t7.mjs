import { o as __toESM } from "../_runtime.mjs";
import { t as categories } from "./resume-lenses-DTkYOlQB.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Z as ArrowUpRight, c as Sparkles } from "../_libs/lucide-react.mjs";
import { a as usePublicProjects, s as usePublicSiteSettings } from "./use-public-content-By6XsNcY.mjs";
import { i as categoryChipClass, l as statusDotClass, n as categoryActiveStyle, s as isFlagshipProject, u as statusTextClass } from "./categories-Cczj3smL.mjs";
import { t as Badge } from "./badge-muruo82f.mjs";
import { n as useReducedMotion, o as AnimatePresence } from "../_libs/framer-motion+[...].mjs";
import { t as motion } from "../_libs/motion.mjs";
import { a as TiltCard, i as SectionStage, r as SectionHeading, t as DepthReveal } from "./tilt-DhzCXJUk.mjs";
import { t as ProjectVisual } from "./project-visual-CqLWXSI6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-B4juL9t7.js
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
	const allProjects = usePublicProjects();
	const home = usePublicSiteSettings().home;
	const list = (0, import_react.useMemo)(() => {
		const filtered = cat === "All" ? allProjects : allProjects.filter((p) => p.category === cat);
		return archive ? filtered : filtered.filter((p) => p.featured).slice(0, 9);
	}, [
		cat,
		archive,
		allProjects
	]);
	const caseStudies = (0, import_react.useMemo)(() => CASE_STUDY_IDS.map((id) => allProjects.find((p) => p.id === id)).filter((p) => Boolean(p)), [allProjects]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SectionStage, {
		id: "work",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				rotate: 5,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "section-heading-hud",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
						eyebrow: archive ? "Archive" : "Selected Work",
						title: archive ? "A collection of experiments, systems, research projects and products." : home.projectsTitle || "A collection of experiments, systems, research projects and products.",
						subtitle: home.projectsSubtitle || "Real GitHub projects and this site's physics playground. Filter without leaving the page."
					})
				})
			}),
			!archive ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				delay: .08,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Case studies"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-4 lg:grid-cols-3",
						children: caseStudies.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseStudyCard, { project }, project.id))
					})]
				})
			}) : null,
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
	});
}
function CaseStudyCard({ project }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
		intensity: 6,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/projects/$id",
			params: { id: project.id },
			className: "group card-featured frame-panel flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300",
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
		})
	});
}
function ProjectCard({ project, dense = false }) {
	const flagship = isFlagshipProject(project.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
		intensity: 8,
		className: "h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/projects/$id",
			params: { id: project.id },
			className: cn("group frame-panel relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out", flagship ? "card-featured" : "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": true,
					className: "pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
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
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative z-10 flex flex-1 flex-col px-3.5 pb-3.5 pt-3.5",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-auto flex flex-wrap gap-1 pt-2.5",
							children: project.technologies.slice(0, dense ? 3 : 4).map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono rounded-full border border-border bg-background px-2 py-0.5 text-[10px] uppercase tracking-wide text-subtle",
								children: tech
							}, tech))
						})
					]
				})
			]
		})
	});
}
//#endregion
export { Projects as t };
