import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowUpRight, O as ArrowLeft, x as ExternalLink, y as Github } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-C6XbOyFA.mjs";
import { t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { a as getProject, l as projects, t as SiteShell } from "./site-shell-D60Mg0ll.mjs";
import { n as caseStudyNotes, o as isFlagshipProject, t as Badge } from "./badge-DFV1pwBc.mjs";
import { t as ProjectVisual } from "./project-visual-CzcSYPp6.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects._id-PiNI7MpJ.js
var import_jsx_runtime = require_jsx_runtime();
function ProjectPage() {
	const { id } = Route.useParams();
	const project = getProject(id);
	if (!project) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Project not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/projects",
				children: "Back to work"
			})
		})]
	}) });
	const related = project.related.map((rid) => projects.find((p) => p.id === rid)).filter(Boolean);
	const notes = caseStudyNotes[project.id];
	const flagship = isFlagshipProject(project.id);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-start lg:gap-12",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "min-w-0 flex-1",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/projects",
					className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Work"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap items-center gap-2",
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
							children: "Case study"
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mono text-xs tabular-nums text-subtle",
							children: project.year
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-subtle",
							children: project.country
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-4 font-display text-4xl tracking-tight sm:text-5xl",
					children: project.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-lg text-muted-foreground",
					children: project.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-10 overflow-hidden rounded-xl border border-border",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectVisual, {
						visual: project.visual,
						category: project.category,
						className: "aspect-[16/8]"
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Stack"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [.../* @__PURE__ */ new Set([...notes?.stackNotes ?? [], ...project.technologies])].map((tech) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: `https://www.google.com/search?q=${encodeURIComponent(tech)}`,
							target: "_blank",
							rel: "noreferrer",
							className: "mono inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground",
							children: tech
						}) }, tech))
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-12 grid gap-10",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Overview",
							body: project.longDescription
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Problem",
							body: project.problem
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Approach",
							body: project.approach
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Architecture",
							body: project.architecture
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Results",
							body: project.results
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Block, {
							title: "Lessons",
							body: project.lessons
						})
					]
				}),
				notes ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-12 rounded-xl border border-border bg-card p-6 sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
							children: "Case study notes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-2 font-display text-2xl tracking-tight",
							children: "What shipped"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: notes.highlights.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm leading-relaxed text-foreground/90",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent" }), h]
							}, h))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-8 font-display text-xl tracking-tight",
							children: "What I'd do next"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-3 space-y-2",
							children: notes.next.map((h) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: "flex gap-3 text-sm leading-relaxed text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" }), h]
							}, h))
						})
					]
				}) : null,
				related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mt-16 border-t border-border pt-10",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl tracking-tight",
						children: "Related"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 grid gap-3 sm:grid-cols-2",
						children: related.map((p) => p ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/projects/$id",
							params: { id: p.id },
							className: "block rounded-lg border border-border bg-card p-4 hover:border-border-strong",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: p.category
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 font-display text-lg",
								children: p.title
							})]
						}) }, p.id) : null)
					})]
				}) : null
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
			className: "w-full shrink-0 lg:sticky lg:top-24 lg:w-64",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Jump"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [
							project.demo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								className: "w-full",
								children: project.demo === "/playground" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/playground",
									children: ["Live demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: project.demo,
									rel: "noreferrer",
									children: ["Live demo", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, {})]
								})
							}) : null,
							project.github ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "outline",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: project.github,
									rel: "noreferrer",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Github, {}),
										"GitHub",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})
									]
								})
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								className: "w-full",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/projects",
									children: ["More work", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mono mt-5 space-y-2 border-t border-border pt-4 text-[11px]",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Status"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: project.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Category"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: project.category
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Year"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground tabular-nums",
									children: project.year
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex justify-between gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
									className: "text-subtle",
									children: "Location"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
									className: "text-foreground",
									children: project.country
								})]
							})
						]
					})
				]
			})
		})]
	}) });
}
function Block({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
		children: title
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: "mt-2 text-base leading-relaxed text-foreground/90",
		children: body
	})] });
}
//#endregion
export { ProjectPage as component };
