import { m as site, u as getSocialLinks } from "./content-cache-DMv4KU76.mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as Mail, D as Linkedin, L as FileText, M as House, N as Globe, P as Github, Z as ArrowUpRight, _ as Play, k as Instagram, n as Youtube } from "../_libs/lucide-react.mjs";
import { t as ThemeToggle } from "./theme-toggle-C5LxTlcm.mjs";
import { i as linkButtons } from "./content-CThzlbdn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/links-BGj6PdVe.js
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	home: House,
	work: Globe,
	play: Play,
	globe: Globe,
	file: FileText,
	mail: Mail,
	github: Github,
	linkedin: Linkedin,
	instagram: Instagram,
	youtube: Youtube
};
var socialIcon = {
	github: "github",
	linkedin: "linkedin",
	instagram: "instagram",
	youtube: "youtube",
	x: "work"
};
function LinksPage() {
	const socialButtons = getSocialLinks().map((s) => ({
		id: s.id,
		label: s.label,
		href: s.href,
		icon: socialIcon[s.id]
	}));
	const research = {
		id: "research",
		label: "Research",
		href: "/projects",
		icon: "globe"
	};
	const emailButton = site.email ? [{
		id: "email",
		label: site.email,
		href: `mailto:${site.email}`,
		icon: "mail"
	}] : [];
	const allButtons = [
		linkButtons[0],
		linkButtons[1],
		...socialButtons,
		...emailButton,
		research,
		...linkButtons.slice(2)
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "relative isolate mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden px-5 py-10",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-grid pointer-events-none absolute inset-0 opacity-60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "hero-glow pointer-events-none absolute inset-0 opacity-70" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "noise absolute inset-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative flex flex-1 flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex justify-end",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, { labeled: true })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 flex flex-col items-center text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "flex size-24 items-center justify-center rounded-full border border-border bg-card font-display text-3xl tracking-tight shadow-[var(--shadow-border)]",
								children: "T"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "mt-5 font-display text-3xl tracking-[0.18em]",
								children: site.name.toUpperCase()
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mono mt-2 text-[11px] uppercase tracking-[0.18em] text-subtle",
								children: "Personal HQ · Links"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm text-muted-foreground",
								children: site.shortBio
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-10 flex flex-col gap-3",
						children: allButtons.map((b) => {
							const Icon = icons[b.icon] ?? Globe;
							const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex size-10 items-center justify-center rounded-md bg-background",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "flex-1 text-left font-medium",
									children: b.label
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" })
							] });
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinkButton, {
								href: b.href,
								children: inner
							}) }, b.id);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-auto pt-10 text-center text-xs text-subtle",
						children: ["© 2026 ", site.name]
					})
				]
			})
		]
	});
}
function LinkButton({ href, children }) {
	const cls = "group flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card/80 px-3 shadow-[var(--shadow-border)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-border-hover)]";
	if (href === "/") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/",
		className: cls,
		children
	});
	if (href === "/projects") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/projects",
		className: cls,
		children
	});
	if (href === "/playground") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/playground",
		className: cls,
		children
	});
	if (href === "/resume") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/resume",
		search: { lens: "engineering" },
		className: cls,
		children
	});
	if (href === "/contact") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/contact",
		className: cls,
		children
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
		href,
		className: cls,
		children
	});
}
function LinksRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LinksPage, {});
}
//#endregion
export { LinksRoute as component };
