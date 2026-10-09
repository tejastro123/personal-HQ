import { c as projects, n as getLens } from "./resume-lenses-DTkYOlQB.mjs";
import { m as site, u as getSocialLinks } from "./content-cache-DMv4KU76.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { C as useSearch, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as skillGroups } from "./content-CThzlbdn.mjs";
import { a as usePublicProjects, o as usePublicResumeLenses, s as usePublicSiteSettings } from "./use-public-content-By6XsNcY.mjs";
import { t as SiteShell } from "./site-shell-CN1Pbmlh.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-DfArz9NW.js
var import_jsx_runtime = require_jsx_runtime();
function ResumePage() {
	const { lens: lensId } = useSearch({ from: "/resume" });
	const lenses = usePublicResumeLenses();
	const projects$1 = usePublicProjects();
	const settings = usePublicSiteSettings();
	const lens = lenses.find((l) => l.id === lensId) ?? getLens(lensId) ?? lenses[0];
	const socialLinks = (() => {
		const links = [];
		const social = settings.social;
		if (social.github) links.push({
			id: "github",
			label: "GitHub",
			href: social.github
		});
		if (social.linkedin) links.push({
			id: "linkedin",
			label: "LinkedIn",
			href: social.linkedin
		});
		if (social.instagram) links.push({
			id: "instagram",
			label: "Instagram",
			href: social.instagram
		});
		if (social.x) links.push({
			id: "x",
			label: "X / Twitter",
			href: social.x
		});
		if (social.youtube) links.push({
			id: "youtube",
			label: "YouTube",
			href: social.youtube
		});
		return links.length ? links : getSocialLinks();
	})();
	const projectSource = projects$1.length ? projects$1 : projects;
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
						children: settings.name || site.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-muted-foreground",
						children: settings.shortBio || site.shortBio
					}),
					settings.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: `mailto:${settings.email}`,
						className: "mt-2 inline-block text-sm text-foreground underline-offset-4 hover:underline",
						children: settings.email
					}) : null
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => window.print(),
					children: "Print / Save PDF"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8",
				"data-testid": "resume-lenses",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Lenses"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Pick how you want to read this resume — same work, different emphasis."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: lenses.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/resume",
							search: { lens: l.id },
							className: l.id === lens.id ? "inline-flex h-9 items-center rounded-full border border-accent bg-accent-soft px-4 text-sm font-medium text-accent" : "inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm text-muted-foreground hover:text-foreground",
							children: l.label
						}, l.id))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-3 rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-medium text-foreground",
								children: [lens.label, ":"]
							}),
							" ",
							lens.blurb
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-8 text-sm leading-relaxed text-muted-foreground",
				children: settings.bio || site.bio
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Focus"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2",
						children: settings.home.availabilityDomains || site.availabilityDomains
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: lens.focus
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Selected work"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: lens.headline
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-3",
						children: projectSource.filter((p) => lens.projectIds.includes(p.id) || p.featured).slice(0, 8).map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
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
					})
				]
			}),
			socialLinks.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: "Links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm",
					children: socialLinks.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
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
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: "Skills"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"Emphasized for ",
							lens.label.toLowerCase(),
							":",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: lens.skillsEmphasis.join(" · ")
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
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
					})
				]
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
