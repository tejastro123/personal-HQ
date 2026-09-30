import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as getSocialLinks, s as site } from "./router-C6XbOyFA.mjs";
import { t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { l as projects, t as SiteShell } from "./site-shell-D60Mg0ll.mjs";
import { s as skillGroups } from "./content-CThzlbdn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-BgoXZAxS.js
var import_jsx_runtime = require_jsx_runtime();
function ResumePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mx-auto max-w-3xl px-4 py-14 sm:px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-end justify-between gap-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] uppercase tracking-[0.22em] text-muted-foreground",
						children: "Resume"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-2 font-display text-4xl tracking-tight",
						children: site.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: site.shortBio
					}),
					site.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${site.email}`,
						className: "mt-2 inline-block text-sm text-foreground underline-offset-4 hover:underline",
						children: site.email
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => window.print(),
					children: "Print / Save PDF"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm leading-relaxed text-muted-foreground",
				children: site.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Focus"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2",
					children: site.availabilityDomains
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Selected work"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-3",
					children: projects.filter((p) => p.featured).slice(0, 8).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "font-medium",
						children: [
							p.title,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-subtle",
								children: ["· ", p.year]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: p.description
					})] }, p.id))
				})]
			}),
			getSocialLinks().length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm",
					children: getSocialLinks().map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: s.href,
						target: "_blank",
						rel: "noreferrer",
						className: "underline-offset-4 hover:underline",
						children: s.label
					}) }, s.id))
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Skills"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 space-y-2",
					children: skillGroups.map((g) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium",
								children: [g.title, ":"]
							}),
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: g.items.join(", ")
							})
						]
					}, g.title))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-12 text-xs text-subtle",
				children: "Live site data — print this page or save as PDF from your browser."
			})
		]
	}) });
}
//#endregion
export { ResumePage as component };
