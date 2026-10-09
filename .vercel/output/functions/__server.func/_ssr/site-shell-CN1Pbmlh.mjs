import { o as __toESM } from "../_runtime.mjs";
import { c as projects, f as searchProjects, s as posts } from "./resume-lenses-DTkYOlQB.mjs";
import { m as site, p as navItems, u as getSocialLinks } from "./content-cache-DMv4KU76.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { S as useNavigate, m as useRouterState, p as useLocation, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as Menu, U as Command, Z as ArrowUpRight, r as X } from "../_libs/lucide-react.mjs";
import { i as useTheme } from "./router-BgIwLYpK.mjs";
import { t as ThemeToggle } from "./theme-toggle-C5LxTlcm.mjs";
import { s as usePublicSiteSettings } from "./use-public-content-By6XsNcY.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-shell-CN1Pbmlh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CommandPalette({ open, onOpenChange }) {
	const navigate = useNavigate();
	const { toggleTheme } = useTheme();
	const [query, setQuery] = (0, import_react.useState)("");
	const socials = getSocialLinks();
	(0, import_react.useEffect)(() => {
		const onKey = (e) => {
			if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
				e.preventDefault();
				onOpenChange(!open);
			}
			if (e.key === "Escape") onOpenChange(false);
		};
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [open, onOpenChange]);
	(0, import_react.useEffect)(() => {
		if (!open) setQuery("");
	}, [open]);
	const found = (0, import_react.useMemo)(() => searchProjects(query).slice(0, 6), [query]);
	function run(fn) {
		fn();
		onOpenChange(false);
	}
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[80]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
			"aria-label": "Close search",
			onClick: () => onOpenChange(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "relative mx-auto mt-[12vh] w-[min(92vw,40rem)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Command palette",
				className: "text-foreground",
				shouldFilter: false,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					autoFocus: true,
					value: query,
					onValueChange: setQuery,
					placeholder: "Search projects, jump, or run a command…",
					className: "h-14 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-[min(60vh,28rem)] overflow-auto p-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
							className: "px-3 py-6 text-sm text-muted-foreground",
							children: "Nothing matches. Try a technology or country."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							heading: "Navigate",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/" })),
									children: "Go Home"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/",
										hash: "work"
									})),
									children: "View Projects"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/",
										hash: "about"
									})),
									children: "About"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/",
										hash: "skills"
									})),
									children: "Skills"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/",
										hash: "world"
									})),
									children: "World Map"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/playground" })),
									children: "Physics Playground"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/instruments" })),
									children: "Instruments Lab"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/instruments/qucpl" })),
									children: "QuCPL Lite"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/instruments/chaos" })),
									children: "Chaos Lab"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/systems" })),
									children: "Systems"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/topology" })),
									children: "Project Topology"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({ to: "/blog" })),
									children: "Blog"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/",
										hash: "contact"
									})),
									children: "Contact"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Group, {
							heading: "Actions",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => toggleTheme()),
									children: "Toggle Theme"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => void navigate({
										to: "/resume",
										search: { lens: "engineering" }
									})),
									children: "Download Resume"
								}),
								socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
									onSelect: () => run(() => window.open(s.href, "_blank", "noopener")),
									children: ["Open ", s.label]
								}, s.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item, {
									onSelect: () => run(() => onOpenChange(false)),
									children: "Close"
								})
							]
						}),
						found.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Group, {
							heading: "Projects",
							children: found.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Item, {
								onSelect: () => run(() => void navigate({
									to: "/projects/$id",
									params: { id: p.id }
								})),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: p.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto text-xs text-muted-foreground",
									children: p.category
								})]
							}, p.id))
						}) : null,
						!query ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-subtle",
							children: [projects.length, " indexed · ⌘K / Ctrl K"]
						}) : null
					]
				})]
			})
		})]
	});
}
function Group({ heading, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
		heading,
		className: "[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-muted-foreground",
		children
	});
}
function Item({ children, onSelect }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Item, {
		onSelect,
		className: cn("flex min-h-10 cursor-pointer items-center rounded-md px-3 text-sm text-foreground", "data-[selected=true]:bg-muted"),
		children
	});
}
var explore = [
	{
		label: "Work",
		to: "/",
		hash: "work"
	},
	{
		label: "Instruments",
		to: "/instruments"
	},
	{
		label: "Systems",
		to: "/systems"
	},
	{
		label: "Topology",
		to: "/topology"
	},
	{
		label: "Playground",
		to: "/playground"
	}
];
var resources = [
	{
		label: "Resume",
		to: "/resume"
	},
	{
		label: "Projects",
		to: "/projects"
	},
	{
		label: "Blog",
		to: "/blog"
	},
	{
		label: "Links",
		to: "/links"
	},
	{
		label: "Contact",
		to: "/contact"
	}
];
var categoryIndex = (() => {
	const counts = /* @__PURE__ */ new Map();
	for (const p of projects) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
	return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([category, count]) => ({
		category,
		count
	}));
})();
var latestPost = posts[0];
function Footer() {
	const settings = usePublicSiteSettings();
	const fromSettings = [
		settings.social.github && {
			id: "github",
			label: "GitHub",
			href: settings.social.github
		},
		settings.social.linkedin && {
			id: "linkedin",
			label: "LinkedIn",
			href: settings.social.linkedin
		},
		settings.social.x && {
			id: "x",
			label: "X / Twitter",
			href: settings.social.x
		},
		settings.social.instagram && {
			id: "instagram",
			label: "Instagram",
			href: settings.social.instagram
		},
		settings.social.youtube && {
			id: "youtube",
			label: "YouTube",
			href: settings.social.youtube
		}
	].filter(Boolean);
	const socials = fromSettings.length ? fromSettings : getSocialLinks();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative overflow-hidden border-t border-border bg-background-secondary",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-orb footer-orb-a pointer-events-none absolute -left-20 top-0 size-72 rounded-full bg-accent/10 blur-3xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-orb footer-orb-b pointer-events-none absolute -right-16 bottom-0 size-64 rounded-full bg-accent-2/8 blur-3xl",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "footer-grid pointer-events-none absolute inset-0 opacity-40",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "md:col-span-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.18em]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent shadow-[0_0_10px_var(--accent)]" }), (settings.name || site.name).toUpperCase()]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground",
							children: settings.footer || site.footer
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "glass-soft frame-panel mt-6 rounded-xl border border-border/80 p-4 transition-transform duration-300 hover:-translate-y-0.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
								children: "Index"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
								className: "mono mt-3 space-y-1.5 text-xs",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-3 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums text-foreground",
											children: projects.length
										})]
									}),
									categoryIndex.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "flex justify-between gap-3 text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: c.category }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "tabular-nums text-foreground",
											children: String(c.count).padStart(2, "0")
										})]
									}, c.category)),
									latestPost ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
										className: "border-t border-border pt-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[10px] uppercase tracking-[0.16em] text-subtle",
											children: "Latest post"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/blog/$slug",
											params: { slug: latestPost.slug },
											className: "mt-1 line-clamp-2 text-foreground transition-colors hover:text-accent",
											children: latestPost.title
										})]
									}) : null
								]
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
							children: "Explore"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: explore.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								hash: "hash" in item ? item.hash : void 0,
								className: "footer-link group inline-flex items-center gap-1 text-sm text-foreground/90 transition-colors hover:text-foreground",
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" })]
							}) }, item.label))
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
							children: "Connect"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "mt-4 space-y-2 text-sm",
							children: [
								settings.email || site.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: `mailto:${settings.email || site.email}`,
									className: "footer-link group inline-flex items-center gap-1 text-foreground/90 transition-colors hover:text-foreground",
									children: ["Email", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" })]
								}) }) : null,
								socials.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: s.href,
									target: "_blank",
									rel: "noreferrer",
									className: "footer-link group inline-flex items-center gap-1 text-foreground/90 transition-colors hover:text-foreground",
									children: [s.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" })]
								}) }, s.id)),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/contact",
									className: "footer-link text-foreground hover:text-accent",
									children: "Contact form"
								}) })
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground",
							children: "Resources"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-4 space-y-2",
							children: resources.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: "footer-link group inline-flex items-center gap-1 text-sm text-foreground/90 transition-colors hover:text-foreground",
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3 opacity-0 transition-all duration-300 group-hover:translate-x-0.5 group-hover:opacity-100" })]
							}) }, item.label))
						})] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							"© 2026 ",
							site.name,
							". Built with curiosity + code."
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/contact",
							className: "btn-sheen inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs text-muted-foreground transition-colors duration-300 hover:bg-accent-soft hover:text-foreground",
							children: ["Start a conversation", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-3.5" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {})]
					})]
				})
			})
		]
	});
}
var SECTION_IDS = [
	"home",
	"work",
	"about",
	"skills",
	"world",
	"contact"
];
var PATH_NAV = /* @__PURE__ */ new Set([
	"/",
	"/playground",
	"/blog",
	"/instruments",
	"/systems",
	"/topology"
]);
function Navbar({ onSearch }) {
	const [scrolled, setScrolled] = (0, import_react.useState)(false);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)("home");
	const location = useLocation();
	const navigate = useNavigate();
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const settings = usePublicSiteSettings();
	const navCtaLabel = settings.home.navCtaLabel || "Let's Work Together";
	const navCtaHref = settings.home.navCtaHref || "#contact";
	(0, import_react.useEffect)(() => {
		const onScroll = () => {
			setScrolled(window.scrollY > 12);
			const doc = document.documentElement;
			const max = doc.scrollHeight - doc.clientHeight;
			const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
			doc.style.setProperty("--scroll-progress", String(ratio));
		};
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	(0, import_react.useEffect)(() => {
		setOpen(false);
	}, [location.pathname, location.hash]);
	(0, import_react.useEffect)(() => {
		if (!PATH_NAV.has(pathname)) return;
		if (pathname !== "/") {
			setActive("");
			return;
		}
		const els = SECTION_IDS.map((id) => document.getElementById(id)).filter((el) => !!el);
		if (!els.length) return;
		const observer = new IntersectionObserver((entries) => {
			const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
			if (visible?.target.id) setActive(visible.target.id);
		}, {
			rootMargin: "-40% 0px -50% 0px",
			threshold: [
				.1,
				.25,
				.5
			]
		});
		els.forEach((el) => observer.observe(el));
		return () => observer.disconnect();
	}, [pathname]);
	function go(to, hash) {
		setOpen(false);
		if (to !== "/") {
			navigate({ to });
			return;
		}
		if (pathname === "/" && hash) {
			document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
			window.history.replaceState(null, "", `/#${hash}`);
			setActive(hash);
			return;
		}
		navigate({
			to: "/",
			hash
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: cn("sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300", scrolled ? "border-border/80 bg-background/70 shadow-[0_8px_30px_-20px_color-mix(in_oklab,var(--accent)_40%,transparent)] backdrop-blur-xl" : "border-transparent bg-transparent"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/",
						className: "group inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.18em] text-foreground",
						onClick: () => {
							if (pathname === "/") window.scrollTo({
								top: 0,
								behavior: "smooth"
							});
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "relative size-1.5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] transition-transform duration-300 group-hover:scale-125" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 animate-ping rounded-full bg-accent opacity-40" })]
						}), (settings.name || site.name).toUpperCase()]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "hidden items-center gap-1 lg:flex",
						"aria-label": "Primary",
						children: navItems.map((item) => {
							const isActive = item.hash === void 0 ? item.to === pathname || item.to === "/instruments" && pathname.startsWith("/instruments") || item.to === "/systems" && pathname.startsWith("/systems") : pathname === "/" && active === item.hash;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => go(item.to, item.hash),
								className: cn("nav-link relative rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground", isActive && "nav-link-active text-foreground"),
								children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									className: cn("nav-link-underline absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-transparent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0")
								})]
							}, item.label);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-1.5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "hidden sm:inline-flex",
								onClick: onSearch,
								"aria-label": "Open command palette",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeToggle, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								asChild: true,
								variant: "ghost",
								size: "sm",
								className: "hidden md:inline-flex",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/resume",
									search: { lens: "engineering" },
									children: "Resume"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								size: "sm",
								variant: "warm",
								className: "btn-sheen hidden pl-4 pr-3.5 sm:inline-flex",
								onClick: () => {
									if (navCtaHref.startsWith("#")) go("/", navCtaHref.slice(1));
									else navigate({ to: navCtaHref });
								},
								children: [navCtaLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								type: "button",
								variant: "ghost",
								size: "icon",
								className: "lg:hidden",
								onClick: () => setOpen((v) => !v),
								"aria-label": open ? "Close menu" : "Open menu",
								"aria-expanded": open,
								children: open ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "scroll-progress",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]", open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0 border-transparent"),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
					className: "flex flex-col px-4 py-4",
					"aria-label": "Mobile",
					children: [navItems.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => go(item.to, item.hash),
						className: "group flex min-h-12 items-center justify-between border-b border-border text-left text-lg text-foreground transition-colors last:border-0 hover:text-accent",
						style: { transitionDelay: open ? `${i * 30}ms` : "0ms" },
						children: [item.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, { className: "size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" })]
					}, item.label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 flex flex-col gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "warm",
							className: "btn-sheen",
							onClick: () => {
								if (navCtaHref.startsWith("#")) go("/", navCtaHref.slice(1));
								else navigate({ to: navCtaHref });
								setOpen(false);
							},
							children: [navCtaLabel, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUpRight, {})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/resume",
								search: { lens: "engineering" },
								children: "Resume"
							})
						})]
					})]
				})
			})
		]
	});
}
function SiteShell({ children, footer = true }) {
	const [searchOpen, setSearchOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar, { onSearch: () => setSearchOpen(true) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommandPalette, {
				open: searchOpen,
				onOpenChange: setSearchOpen
			}),
			children,
			footer ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}) : null
		]
	});
}
//#endregion
export { SiteShell as t };
