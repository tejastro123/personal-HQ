import { _ as Outlet, m as useRouterState, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { E as ArrowUpRight } from "../_libs/lucide-react.mjs";
import { s as site } from "./router-C6XbOyFA.mjs";
import { t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { c as posts, t as SiteShell, u as readingMinutes } from "./site-shell-D60Mg0ll.mjs";
import { t as Badge } from "./badge-DFV1pwBc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-DNMVARK1.js
var import_jsx_runtime = require_jsx_runtime();
function BlogRoute() {
	if (useRouterState({ select: (s) => s.matches }).some((m) => m.routeId === "/blog/$slug" || m.id?.endsWith("/blog/$slug"))) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
				children: "Blog"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-3 font-display text-4xl tracking-tight sm:text-5xl",
				children: "Notes from the lab and the studio."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 max-w-2xl text-lg text-muted-foreground",
				children: "Writing on quantum tooling, RAG systems, physics, and building this site — grounded in real projects, not content-farm filler."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-12 space-y-8",
				children: posts.map((post) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)] sm:p-8",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center gap-2",
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
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
							className: "mt-4 font-display text-2xl tracking-tight sm:text-3xl",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/blog/$slug",
								params: { slug: post.slug },
								className: "hover:underline underline-offset-4",
								children: post.title
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base",
							children: post.excerpt
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "ghost",
							className: "mt-4 px-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/blog/$slug",
								params: { slug: post.slug },
								children: ["Read post", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							})
						})
					]
				}, post.slug))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-14 rounded-xl border border-border bg-background-secondary p-6 sm:p-8",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: "More places to read"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Source code and longer-form experiment notes live on GitHub."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
								href: site.social.github,
								target: "_blank",
								rel: "noreferrer",
								children: ["GitHub profile", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							size: "sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/projects",
								children: "Project index"
							})
						})]
					})
				]
			})
		]
	}) });
}
//#endregion
export { BlogRoute as component };
