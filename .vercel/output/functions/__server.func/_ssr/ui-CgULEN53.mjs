import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { S as useNavigate, p as useLocation, x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Info, G as CircleCheck, I as FolderKanban, L as FileText, M as House, N as Globe, O as LayoutDashboard, T as LogOut, U as Command, a as TriangleAlert, d as ScrollText, et as Activity, g as Plus, j as Inbox, l as ShieldCheck, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { n as adminDashboardStats, t as adminCheckAccess } from "./content-DZvTSqUl.mjs";
import { t as _e } from "../_libs/cmdk.mjs";
import { i as signOut } from "./client-IWHfIGH2.mjs";
import { t as useCurrentUserState } from "./use-current-user-BZr2emiP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ui-CgULEN53.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ADMIN_NEW_PROJECT_EVENT = "admin:new-project";
var ADMIN_NEW_POST_EVENT = "admin:new-post";
function AdminPalette({ open, onOpenChange }) {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
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
	const actions = [
		{
			id: "nav-dashboard",
			label: "Dashboard",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LayoutDashboard, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq" })
		},
		{
			id: "nav-home",
			label: "Home content",
			hint: "Hero, about, CTA, section copy",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/home" })
		},
		{
			id: "nav-projects",
			label: "Projects",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/projects" })
		},
		{
			id: "nav-blog",
			label: "Blog",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/blog" })
		},
		{
			id: "nav-site",
			label: "Site settings",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Globe, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/site" })
		},
		{
			id: "nav-messages",
			label: "Messages",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/messages" })
		},
		{
			id: "nav-resume",
			label: "Resume lenses",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollText, { className: "size-4" }),
			group: "Navigate",
			run: () => void navigate({ to: "/hq/resume" })
		},
		{
			id: "new-project",
			label: "New project",
			hint: "Open the project editor",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
			group: "Create",
			run: () => {
				navigate({ to: "/hq/projects" });
				window.setTimeout(() => {
					window.dispatchEvent(new CustomEvent(ADMIN_NEW_PROJECT_EVENT));
				}, 50);
			}
		},
		{
			id: "new-post",
			label: "New blog post",
			hint: "Open the post editor",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }),
			group: "Create",
			run: () => {
				navigate({ to: "/hq/blog" });
				window.setTimeout(() => {
					window.dispatchEvent(new CustomEvent(ADMIN_NEW_POST_EVENT));
				}, 50);
			}
		},
		{
			id: "public-home",
			label: "Open public site",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }),
			group: "Public",
			run: () => window.open("/", "_blank", "noopener,noreferrer")
		},
		{
			id: "public-projects",
			label: "Public projects",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }),
			group: "Public",
			run: () => window.open("/projects", "_blank", "noopener,noreferrer")
		},
		{
			id: "public-blog",
			label: "Public blog",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }),
			group: "Public",
			run: () => window.open("/blog", "_blank", "noopener,noreferrer")
		},
		{
			id: "sign-out",
			label: "Sign out",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }),
			group: "Session",
			run: () => void signOut("/login")
		}
	];
	const q = query.trim().toLowerCase();
	const filtered = q ? actions.filter((a) => a.label.toLowerCase().includes(q) || a.group.toLowerCase().includes(q) || (a.hint ?? "").toLowerCase().includes(q)) : actions;
	const groups = [...new Set(filtered.map((a) => a.group))];
	function run(fn) {
		fn();
		onOpenChange(false);
	}
	if (!open) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "fixed inset-0 z-[90]",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "absolute inset-0 bg-background/70 backdrop-blur-sm",
			"aria-label": "Close admin palette",
			onClick: () => onOpenChange(false)
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto mt-[12vh] w-[min(92vw,36rem)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e, {
				label: "Admin palette",
				className: "text-foreground",
				shouldFilter: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Input, {
					autoFocus: true,
					value: query,
					onValueChange: setQuery,
					placeholder: "Jump to a page, create content, open public site…",
					className: "h-14 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.List, {
					className: "max-h-[min(60vh,26rem)] overflow-auto p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Empty, {
						className: "px-3 py-6 text-sm text-muted-foreground",
						children: "No admin action matches that."
					}), groups.map((group) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(_e.Group, {
						heading: group,
						children: filtered.filter((a) => a.group === group).map((action) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(_e.Item, {
							value: `${action.group} ${action.label}`,
							"data-admin-action": action.id,
							onSelect: () => run(action.run),
							className: "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-foreground aria-selected:bg-muted",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: action.icon
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "min-w-0 flex-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate",
									children: action.label
								}), action.hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "block truncate text-xs text-subtle",
									children: action.hint
								}) : null]
							})]
						}, action.id))
					}, group))]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-subtle",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "mono rounded border border-border bg-muted px-1",
						children: "⌘K"
					}),
					" toggle ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "mono rounded border border-border bg-muted px-1",
						children: "↑↓"
					}),
					" move ·",
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
						className: "mono rounded border border-border bg-muted px-1",
						children: "↵"
					}),
					" run"
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Operator console" })]
			})]
		})]
	});
}
var NAV = [
	{
		to: "/hq",
		label: "Dashboard",
		icon: LayoutDashboard,
		end: true
	},
	{
		to: "/hq/home",
		label: "Home content",
		icon: House
	},
	{
		to: "/hq/projects",
		label: "Projects",
		icon: FolderKanban
	},
	{
		to: "/hq/blog",
		label: "Blog",
		icon: FileText
	},
	{
		to: "/hq/site",
		label: "Site settings",
		icon: Globe
	},
	{
		to: "/hq/messages",
		label: "Messages",
		icon: Inbox
	},
	{
		to: "/hq/resume",
		label: "Resume lenses",
		icon: ScrollText
	}
];
function AdminShell({ children }) {
	const { user, isPending } = useCurrentUserState();
	const [access, setAccess] = (0, import_react.useState)({ status: "pending" });
	const [paletteOpen, setPaletteOpen] = (0, import_react.useState)(false);
	const [unread, setUnread] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		if (isPending) return;
		if (!user) {
			setAccess({
				status: "denied",
				reason: "signed-out"
			});
			return;
		}
		adminCheckAccess().then((res) => {
			if (!cancelled) setAccess({
				status: "ok",
				email: res.email
			});
		}).catch((err) => {
			if (cancelled) return;
			const message = err instanceof Error ? err.message : String(err);
			setAccess({
				status: "denied",
				reason: /forbidden/i.test(message) ? "forbidden" : "error",
				message
			});
		});
		return () => {
			cancelled = true;
		};
	}, [user, isPending]);
	(0, import_react.useEffect)(() => {
		if (access.status !== "ok") return;
		let cancelled = false;
		adminDashboardStats().then((s) => {
			if (!cancelled) setUnread(s.unread ?? 0);
		}).catch(() => {});
		return () => {
			cancelled = true;
		};
	}, [access.status]);
	const refreshUnread = (0, import_react.useCallback)(() => {
		if (access.status !== "ok") return;
		adminDashboardStats().then((s) => setUnread(s.unread ?? 0)).catch(() => {});
	}, [access.status]);
	(0, import_react.useEffect)(() => {
		const handler = () => refreshUnread();
		window.addEventListener("admin:messages-changed", handler);
		return () => window.removeEventListener("admin:messages-changed", handler);
	}, [refreshUnread]);
	if (isPending || access.status === "pending") return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-xs uppercase tracking-[0.2em] text-muted-foreground",
			children: "Verifying operator access…"
		})
	});
	if (access.status === "denied") {
		const currentEmail = user?.primaryEmail ?? null;
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex min-h-dvh items-center justify-center bg-background px-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "mx-auto size-8 text-accent" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mt-4 font-display text-2xl tracking-tight",
						children: "Access denied"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: access.reason === "signed-out" ? "Sign in with an allowlisted admin email to open the console." : access.reason === "forbidden" ? "This account is signed in but not on the admin allowlist." : "Could not verify admin access. Try again or sign in again."
					}),
					access.reason === "forbidden" && currentEmail ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 space-y-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-left text-xs text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Signed in as",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-foreground",
									children: currentEmail
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Allowed:",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono text-foreground",
									children: "tejas.mellimpudi@gmail.com"
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-subtle",
								children: "In the Grok preview, sign-out is a no-op — the session is re-created automatically. Add the email above to the allowlist (or open the app outside the preview) to use the console."
							})
						]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: [access.reason === "forbidden" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => void signOut("/login?next=%2Fhq"),
							className: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90",
							children: "Sign out & switch account"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/login",
							search: { next: "/hq" },
							className: "inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90",
							children: "Go to sign-in"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm text-foreground hover:bg-muted",
							children: "Back to site"
						})]
					})
				]
			})
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPalette, {
			open: paletteOpen,
			onOpenChange: setPaletteOpen
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-7xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
				className: "hidden w-60 shrink-0 border-r border-border lg:block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "sticky top-0 flex h-dvh flex-col",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative overflow-hidden border-b border-border px-5 py-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "relative",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-accent" }), "Operator"]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 truncate font-display text-lg tracking-tight",
										children: "Admin console"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 truncate text-xs text-subtle",
										children: access.email
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										onClick: () => setPaletteOpen(true),
										className: "mt-3 flex w-full items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-3.5" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "flex-1 text-left",
												children: "Commands"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("kbd", {
												className: "mono rounded border border-border bg-muted px-1 text-[10px]",
												children: "⌘K"
											})
										]
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
							className: "flex-1 space-y-1 overflow-y-auto p-3",
							children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNavLink, {
								item,
								badge: item.to === "/hq/messages" ? unread : void 0
							}, item.to))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border p-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								onClick: () => void signOut("/"),
								className: "flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { className: "size-4" }), "Sign out"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/",
								className: "mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4" }), "View public site"]
							})]
						})
					]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur lg:hidden",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between px-4 py-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-display text-sm tracking-tight",
							children: "Admin console"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setPaletteOpen(true),
								className: "rounded-md border border-border px-2 py-1 text-xs text-muted-foreground",
								"aria-label": "Open command palette",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Command, { className: "size-3.5" })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => void signOut("/"),
								className: "rounded-md border border-border px-2 py-1 text-xs text-muted-foreground",
								children: "Sign out"
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex gap-1 overflow-x-auto px-3 pb-3",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminNavLink, {
							item,
							mobile: true,
							badge: item.to === "/hq/messages" ? unread : void 0
						}, item.to))
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10",
					children
				})]
			})]
		})]
	});
}
function AdminNavLink({ item, mobile = false, badge }) {
	const location = useLocation();
	const active = "end" in item && item.end ? location.pathname === item.to : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
	const Icon = item.icon;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: item.to,
		className: cn("admin-nav-link flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors", mobile ? "shrink-0 border border-border whitespace-nowrap" : "", active ? "is-active" : "text-muted-foreground hover:bg-muted/60 hover:text-foreground"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4 shrink-0" }),
			item.label,
			typeof badge === "number" && badge > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: cn("ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-medium tabular-nums", "bg-sky-500/20 text-sky-300"),
				children: badge > 99 ? "99+" : badge
			}) : null
		]
	});
}
function AdminPageHeader({ title, description, actions }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-wrap items-end justify-between gap-4 border-b border-border pb-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
					children: "Operator console"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-1 font-display text-3xl tracking-tight",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "gradient-text",
						children: title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 max-w-2xl text-sm text-muted-foreground",
					children: description
				})
			]
		}), actions ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-wrap items-center gap-2",
			children: actions
		}) : null]
	});
}
function AdminCard({ children, className, pad = true }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-xl border border-border bg-card shadow-[var(--shadow-border)] transition-[border-color,box-shadow] hover:border-border-strong hover:shadow-[var(--shadow-border-hover)]", pad && "p-5", className),
		children
	});
}
function StatusBanner({ kind, children }) {
	const Icon = kind === "success" ? CircleCheck : kind === "error" ? TriangleAlert : Info;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		role: "status",
		className: cn("flex items-start gap-2 rounded-lg border px-3 py-2 text-sm", kind === "success" && "border-emerald-500/30 bg-emerald-500/10 text-emerald-200", kind === "error" && "border-red-500/30 bg-red-500/10 text-red-300", kind === "info" && "border-sky-500/30 bg-sky-500/10 text-sky-200"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "mt-0.5 size-4 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "min-w-0 flex-1",
			children
		})]
	});
}
function Field({ label, hint, children, className }) {
	const id = (0, import_react.useId)();
	const child = import_react.Children.only(children);
	const control = (0, import_react.isValidElement)(child) ? (0, import_react.cloneElement)(child, {
		id,
		"aria-label": label
	}) : child;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: cn("block space-y-1.5", className),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
				htmlFor: id,
				className: "text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground",
				children: label
			}),
			control,
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-xs text-subtle",
				children: hint
			}) : null
		]
	});
}
function EmptyState({ title, body }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl border border-dashed border-border bg-card/40 px-6 py-12 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "font-display text-lg tracking-tight",
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mx-auto mt-2 max-w-md text-sm text-muted-foreground",
			children: body
		})]
	});
}
function FilterChips({ value, onChange, options }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex flex-wrap gap-1.5",
		children: options.map((opt) => {
			const active = opt.value === value;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onChange(opt.value),
				className: cn("inline-flex h-8 items-center gap-1.5 rounded-full border px-3 text-xs font-medium transition-colors", active ? "border-accent bg-accent-soft text-accent" : "border-border text-muted-foreground hover:bg-muted hover:text-foreground"),
				children: [opt.label, typeof opt.count === "number" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: cn("tabular-nums", active ? "text-accent/80" : "text-subtle"),
					children: opt.count
				}) : null]
			}, opt.value);
		})
	});
}
//#endregion
export { AdminShell as a, FilterChips as c, AdminPageHeader as i, StatusBanner as l, ADMIN_NEW_PROJECT_EVENT as n, EmptyState as o, AdminCard as r, Field as s, ADMIN_NEW_POST_EVENT as t };
