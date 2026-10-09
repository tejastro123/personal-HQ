import { i as getProject, l as readingMinutes, r as getPost, s as posts, u as relatedProjectIds } from "./resume-lenses-DTkYOlQB.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ArrowLeft, Z as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { r as Route$13 } from "./router-BgIwLYpK.mjs";
import { i as usePublicPosts } from "./use-public-content-By6XsNcY.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
import { t as Badge } from "./badge-muruo82f.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-DUrM6OwW.js
var import_jsx_runtime = require_jsx_runtime();
function BlogFigureView({ figure }) {
	if (figure.kind === "pipeline" && figure.stages?.length) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
		className: "my-8 rounded-xl border border-border bg-card p-5",
		"data-figure": figure.id,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg tracking-tight",
				children: figure.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-4 flex flex-wrap items-center gap-2",
				children: figure.stages.map((stage, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mono inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-foreground",
						children: stage
					}), i < figure.stages.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "text-subtle",
						"aria-hidden": true,
						children: "→"
					}) : null]
				}, stage))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
				className: "mt-3 text-sm text-muted-foreground",
				children: figure.caption
			})
		]
	});
	if (figure.kind === "line" && figure.series?.length) {
		const w = 560;
		const h = 200;
		const pad = 28;
		const all = figure.series.flatMap((s) => s.points);
		const xs = all.map((p) => p[0]);
		const ys = all.map((p) => p[1]);
		const minX = Math.min(...xs);
		const maxX = Math.max(...xs);
		const minY = Math.min(...ys);
		const maxY = Math.max(...ys);
		const sx = (x) => pad + (x - minX) / Math.max(1, maxX - minX) * 504;
		const sy = (y) => 172 - (y - minY) / Math.max(1, maxY - minY) * 144;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("figure", {
			className: "my-8 rounded-xl border border-border bg-card p-5",
			"data-figure": figure.id,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-tight",
					children: figure.title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: `0 0 ${w} ${h}`,
					className: "mt-4 w-full",
					role: "img",
					"aria-label": figure.title,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
						width: w,
						height: h,
						className: "fill-background-secondary"
					}), figure.series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("polyline", {
						fill: "none",
						stroke: s.label === "In-sample" ? "#fbbf24" : "#4c8dff",
						strokeWidth: 2,
						points: s.points.map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ")
					}), s.points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: sx(p[0]),
						cy: sy(p[1]),
						r: 3,
						fill: s.label === "In-sample" ? "#fbbf24" : "#4c8dff"
					}, i))] }, s.label))]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground",
					children: figure.series.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "size-2.5 rounded-full",
							style: { backgroundColor: s.label === "In-sample" ? "#fbbf24" : "#4c8dff" }
						}), s.label]
					}, s.label))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("figcaption", {
					className: "mt-2 text-sm text-muted-foreground",
					children: figure.caption
				})
			]
		});
	}
	return null;
}
function BlogPostPage() {
	const { slug } = Route$13.useParams();
	const livePosts = usePublicPosts();
	const post = livePosts.find((p) => p.slug === slug) ?? getPost(slug);
	const relatedPool = livePosts.length ? livePosts : posts;
	if (!post) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-24",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-3xl",
			children: "Post not found"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			asChild: true,
			className: "mt-6",
			variant: "outline",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/blog",
				children: "Back to blog"
			})
		})]
	}) });
	const related = relatedPool.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
	const relatedProjects = relatedProjectIds(post).map((id) => getProject(id)).filter(Boolean);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: "/blog",
				className: "inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Blog"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 flex flex-wrap gap-2",
				children: [
					post.tags.map((tag) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: tag }, tag)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mono ml-auto text-xs tabular-nums text-subtle",
						children: [readingMinutes(post), " min read"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", {
						dateTime: post.date,
						className: "mono text-xs tabular-nums text-subtle",
						children: post.date
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-4xl tracking-tight sm:text-5xl",
				children: post.title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-lg text-muted-foreground",
				children: post.excerpt
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 space-y-5",
				children: [post.body.map((para, idx) => {
					const isLink = para.startsWith("Repo:") || para.startsWith("Profiles:") || para.startsWith("Source:");
					const figure = post.figures?.[idx];
					if (isLink) {
						const url = para.split(": ").slice(1).join(": ");
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-muted-foreground",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: url,
								target: "_blank",
								rel: "noreferrer",
								className: "mono inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline",
								children: [url, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
							})
						}, para.slice(0, 40));
					}
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed text-foreground/90",
						children: para
					}), figure ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogFigureView, { figure }) : null] }, para.slice(0, 40));
				}), post.figures && post.figures.length > post.body.length ? post.figures.slice(post.body.length).map((figure) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogFigureView, { figure }, figure.id)) : null]
			}),
			relatedProjects.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-12 rounded-xl border border-border bg-card p-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "Related projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 grid gap-3 sm:grid-cols-3",
					children: relatedProjects.map((p) => p ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/projects/$id",
						params: { id: p.id },
						className: "block rounded-lg border border-border bg-background-secondary p-3 hover:border-border-strong",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] text-muted-foreground",
							children: p.category
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-1 font-display text-sm tracking-tight",
							children: p.title
						})]
					}) }, p.id) : null)
				})]
			}) : null,
			related.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-10 border-t border-border pt-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
					children: "Related posts"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-4 space-y-3",
					children: related.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/blog/$slug",
						params: { slug: p.slug },
						className: "text-sm text-foreground underline-offset-4 hover:underline",
						children: p.title
					}) }, p.slug))
				})]
			}) : null
		]
	}) });
}
//#endregion
export { BlogPostPage as component };
