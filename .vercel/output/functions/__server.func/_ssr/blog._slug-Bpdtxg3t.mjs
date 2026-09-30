import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowUpRight, O as ArrowLeft } from "../_libs/lucide-react.mjs";
import { r as Route$1 } from "./router-C6XbOyFA.mjs";
import { t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { a as getProject, c as posts, d as relatedProjectIds, i as getPost, t as SiteShell, u as readingMinutes } from "./site-shell-D60Mg0ll.mjs";
import { t as Badge } from "./badge-DFV1pwBc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog._slug-Bpdtxg3t.js
var import_jsx_runtime = require_jsx_runtime();
function BlogPostPage() {
	const { slug } = Route$1.useParams();
	const post = getPost(slug);
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
	const related = posts.filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t))).slice(0, 3);
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
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-10 space-y-5",
				children: post.body.map((para) => {
					if (para.startsWith("Repo:") || para.startsWith("Profiles:") || para.startsWith("Source:")) {
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
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "leading-relaxed text-foreground/90",
						children: para
					}, para.slice(0, 40));
				})
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
