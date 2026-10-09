import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { I as FolderKanban, L as FileText, c as Sparkles, et as Activity, h as Radio, j as Inbox, l as ShieldCheck, t as Zap, z as ExternalLink } from "../_libs/lucide-react.mjs";
import { h as adminSystemStatus, n as adminDashboardStats, o as adminGetSiteSettings, s as adminListAudit } from "./content-DZvTSqUl.mjs";
import { a as AdminShell, c as FilterChips, i as AdminPageHeader, l as StatusBanner, r as AdminCard } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hq-B9HURP-D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var HOME_FIELDS = [
	"heroEyebrow",
	"heroHeadline",
	"heroCtaPrimaryLabel",
	"heroCtaPrimaryHref",
	"heroCtaSecondaryLabel",
	"heroCtaSecondaryHref",
	"availability",
	"availabilityDomains",
	"aboutStatement",
	"aboutBody",
	"ctaEyebrow",
	"ctaTitle",
	"ctaBody",
	"ctaPrimaryLabel",
	"ctaPrimaryHref",
	"ctaSecondaryLabel",
	"ctaSecondaryHref",
	"skillsTitle",
	"skillsSubtitle",
	"contactTitle",
	"contactSubtitle",
	"navCtaLabel",
	"navCtaHref",
	"projectsTitle",
	"projectsSubtitle"
];
function homeHealth(home) {
	if (!home) return {
		filled: 0,
		total: HOME_FIELDS.length,
		pct: 0
	};
	const filled = HOME_FIELDS.filter((key) => String(home[key] ?? "").trim()).length;
	return {
		filled,
		total: HOME_FIELDS.length,
		pct: Math.round(filled / HOME_FIELDS.length * 100)
	};
}
function DashboardPage() {
	const [stats, setStats] = (0, import_react.useState)(null);
	const [audit, setAudit] = (0, import_react.useState)([]);
	const [system, setSystem] = (0, import_react.useState)(null);
	const [settings, setSettings] = (0, import_react.useState)(null);
	const [error, setError] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [auditFilter, setAuditFilter] = (0, import_react.useState)("all");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const [s, a, sys, siteSettings] = await Promise.all([
				adminDashboardStats(),
				adminListAudit(),
				adminSystemStatus().catch(() => null),
				adminGetSiteSettings().catch(() => null)
			]);
			setStats(s);
			setAudit(a);
			setSystem(sys);
			setSettings(siteSettings);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load dashboard");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const filteredAudit = (0, import_react.useMemo)(() => {
		if (auditFilter === "all") return audit;
		return audit.filter((row) => {
			const entity = (row.entity ?? "").toLowerCase();
			if (auditFilter === "project") return entity.includes("project");
			if (auditFilter === "post") return entity.includes("post") || entity.includes("blog");
			if (auditFilter === "site") return entity.includes("site");
			if (auditFilter === "message") return entity.includes("message");
			if (auditFilter === "lens") return entity.includes("lens") || entity.includes("resume");
			return true;
		});
	}, [audit, auditFilter]);
	const health = homeHealth(settings?.home);
	const systemOk = system?.health?.status === "ok";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Dashboard",
				description: "Secret operator console for personal-HQ. CRUD projects, blog posts, site settings, resume lenses, and the contact inbox. Mutations are allowlist-gated and audited.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-4" }), "Public site"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => void load(),
					className: "inline-flex h-9 items-center rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted",
					children: "Refresh"
				})] })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: error
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 sm:grid-cols-2 xl:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "DB projects",
						value: stats ? String(stats.projects) : "—",
						sub: `${stats?.staticProjectCount ?? 0} static · ${stats?.unpublishedProjects ?? 0} draft`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FolderKanban, { className: "size-4 text-sky-300" }),
						to: "/hq/projects"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "DB posts",
						value: stats ? String(stats.posts) : "—",
						sub: `${stats?.staticPostCount ?? 0} static · ${stats?.unpublishedPosts ?? 0} draft`,
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, { className: "size-4 text-violet-300" }),
						to: "/hq/blog"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Messages",
						value: stats ? String(stats.messages) : "—",
						sub: stats ? `${stats.unread} unread` : "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Inbox, { className: "size-4 text-emerald-300" }),
						to: "/hq/messages"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatCard, {
						label: "Audit events",
						value: stats ? String(stats.audit) : "—",
						sub: stats?.adminEmail ?? "—",
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, { className: "size-4 text-amber-300" })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
					className: "lg:col-span-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Zap, { className: "size-3.5 text-accent-warm" }), "Content health"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 grid gap-4 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-baseline justify-between gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
											className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
											children: "Home copy"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mono text-sm tabular-nums text-foreground",
											children: [health.pct, "%"]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "health-bar mt-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${health.pct}%` } })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "mt-2 text-xs text-muted-foreground",
										children: [
											health.filled,
											"/",
											health.total,
											" fields filled"
										]
									})
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
										children: "Drafts"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mono text-sm tabular-nums text-foreground",
										children: (stats?.unpublishedProjects ?? 0) + (stats?.unpublishedPosts ?? 0)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: [
										stats?.unpublishedProjects ?? 0,
										" projects · ",
										stats?.unpublishedPosts ?? 0,
										" posts unpublished"
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-baseline justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
										children: "Outbox"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mono text-sm tabular-nums text-foreground",
										children: stats?.events ?? system?.contentVersion?.events ?? 0
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-xs text-muted-foreground",
									children: system?.recentEvents?.[0]?.kind ?? "no events yet"
								})] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-2 border-t border-border pt-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hq/home",
								className: "inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-muted",
								children: "Edit home content"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/hq/projects",
								className: "inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-muted",
								children: "Review drafts"
							})]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, { className: "size-3.5 text-sky-300" }), "System status"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-3",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								ok: systemOk,
								label: "API",
								value: system?.health?.status ?? "unknown"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusPill, {
								ok: system?.dbSource != null,
								label: "Database",
								value: system?.dbSource ?? "—"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
									children: "Content version"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-mono text-sm",
									children: system?.contentVersion?.version ?? stats?.contentVersion ?? "—"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										"v",
										system?.contentVersion?.projects ?? 0,
										" projects · v",
										system?.contentVersion?.posts ?? 0,
										" posts · ",
										system?.contentVersion?.events ?? 0,
										" ",
										"events"
									]
								})
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
									children: "Cache"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 font-display text-xl",
									children: system?.cache?.entries ?? 0
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: "TTL entries (30s)"
								})
							] })
						]
					}),
					system?.recentEvents?.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground",
						children: system.recentEvents.slice(0, 4).map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono",
								children: String(e.kind)
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								String(e.entity),
								e.entity_id ? `:${String(e.entity_id)}` : "",
								" ·",
								" ",
								new Date(String(e.created_at)).toLocaleString()
							] })]
						}, e.id))
					}) : null
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-accent" }), "Open public surfaces"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					{
						to: "/",
						label: "Home"
					},
					{
						to: "/projects",
						label: "Projects"
					},
					{
						to: "/blog",
						label: "Blog"
					},
					{
						to: "/resume",
						label: "Resume"
					},
					{
						to: "/instruments",
						label: "Instruments"
					}
				].map((link) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: link.to,
					target: "_blank",
					rel: "noopener noreferrer",
					className: "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted",
					children: [link.label, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ExternalLink, { className: "size-3.5 text-subtle" })]
				}, link.to))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid gap-4 lg:grid-cols-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
					className: "lg:col-span-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center justify-between gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Recent admin activity"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
							value: auditFilter,
							onChange: setAuditFilter,
							options: [
								{
									value: "all",
									label: "All",
									count: audit.length
								},
								{
									value: "project",
									label: "Projects",
									count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("project")).length
								},
								{
									value: "post",
									label: "Posts",
									count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("post") || (r.entity ?? "").toLowerCase().includes("blog")).length
								},
								{
									value: "message",
									label: "Messages",
									count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("message")).length
								},
								{
									value: "site",
									label: "Site",
									count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("site")).length
								}
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 overflow-x-auto",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
							className: "w-full text-left text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
								className: "text-xs uppercase tracking-[0.12em] text-subtle",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 pr-3 font-medium",
										children: "When"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 pr-3 font-medium",
										children: "Action"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 pr-3 font-medium",
										children: "Entity"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
										className: "pb-2 font-medium",
										children: "By"
									})
								] })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
								className: "divide-y divide-border/60",
								children: filteredAudit.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									colSpan: 4,
									className: "py-6 text-center text-muted-foreground",
									children: loading ? "Loading…" : audit.length === 0 ? "No mutations yet. Your first save will show up here." : "No audit rows match this filter."
								}) }) : filteredAudit.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
									"data-audit-row": true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3 tabular-nums text-subtle",
											children: new Date(row.created_at).toLocaleString()
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 pr-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "mono rounded bg-muted px-1.5 py-0.5 text-xs",
												children: row.action
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
											className: "py-2 pr-3 text-muted-foreground",
											children: [row.entity, row.entity_id ? ` · ${row.entity_id}` : ""]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
											className: "py-2 text-subtle",
											children: row.admin_email
										})
									]
								}, row.id))
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-accent" }), "Console notes"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "mt-4 space-y-3 text-sm text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Press ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-xs text-foreground",
								children: "⌘K"
							}),
							" for the admin command palette — jump pages, create content, open the public site."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"This route is ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-foreground",
								children: "not"
							}),
							" in the public nav or command palette."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							"Admin email allowlist lives in ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-xs",
								children: "src/lib/admin.ts"
							}),
							"."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "DB rows overlay the static catalog — unpublished rows hide a seed of the same id." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-foreground underline-offset-4 hover:underline",
								children: "Open the public site"
							}),
							" ",
							"to verify what visitors see after a save."
						] })
					]
				})] })]
			})
		]
	});
}
function StatusPill({ ok, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-3 py-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-[11px] uppercase tracking-[0.14em] text-subtle",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "flex items-center gap-2 text-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full " + (ok ? "bg-emerald-400 shadow-[0_0_8px_emerald-400]" : "bg-amber-400") }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-foreground",
				children: value
			})]
		})]
	});
}
function StatCard({ label, value, sub, icon, to }) {
	const body = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
		className: "stat-tile h-full",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative z-10 flex items-start justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs uppercase tracking-[0.14em] text-muted-foreground",
					children: label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 font-display text-3xl tracking-tight tabular-nums",
					children: value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-xs text-subtle",
					children: sub
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "rounded-lg border border-border bg-background/60 p-2",
				children: icon
			})]
		})
	});
	if (!to) return body;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to,
		children: body
	});
}
function HqIndexPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardPage, {}) });
}
//#endregion
export { HqIndexPage as component };
