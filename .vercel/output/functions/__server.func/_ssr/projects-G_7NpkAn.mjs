import { o as __toESM } from "../_runtime.mjs";
import { t as categories } from "./resume-lenses-DTkYOlQB.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { g as Plus, m as RefreshCw, o as Trash2, u as Search, v as Pencil } from "../_libs/lucide-react.mjs";
import { _ as adminUpsertProject, a as adminDeleteProject, u as adminListProjects } from "./content-DZvTSqUl.mjs";
import { t as broadcastContentUpdated } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as AdminShell, c as FilterChips, i as AdminPageHeader, l as StatusBanner, n as ADMIN_NEW_PROJECT_EVENT, o as EmptyState, r as AdminCard, s as Field } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/projects-G_7NpkAn.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyDraft = () => ({
	id: "",
	title: "",
	category: "Software",
	status: "Active",
	year: String((/* @__PURE__ */ new Date()).getFullYear()),
	description: "",
	longDescription: "",
	technologies: "",
	github: "",
	demo: "",
	featured: false,
	is_published: true
});
function toDraft(row) {
	const p = row.data;
	return {
		id: row.id,
		title: p.title ?? row.title,
		category: p.category ?? "Software",
		status: p.status ?? "Active",
		year: String(p.year ?? (/* @__PURE__ */ new Date()).getFullYear()),
		description: p.description ?? "",
		longDescription: p.longDescription ?? "",
		technologies: (p.technologies ?? []).join(", "),
		github: p.github ?? "",
		demo: p.demo ?? "",
		featured: Boolean(p.featured),
		is_published: row.is_published
	};
}
function ProjectsAdminPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			setRows(await adminListProjects());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load projects");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	(0, import_react.useEffect)(() => {
		const onNew = () => setEditing(emptyDraft());
		window.addEventListener(ADMIN_NEW_PROJECT_EVENT, onNew);
		return () => window.removeEventListener(ADMIN_NEW_PROJECT_EVENT, onNew);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return rows.filter((r) => {
			if (filter === "published" && !r.is_published) return false;
			if (filter === "draft" && r.is_published) return false;
			if (filter === "override" && !r.is_override) return false;
			if (filter === "featured" && !r.data?.featured && !r.featured) return false;
			if (!q) return true;
			return r.id.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.category.toLowerCase().includes(q);
		});
	}, [
		rows,
		query,
		filter
	]);
	async function save() {
		if (!editing) return;
		if (!editing.id.trim() || !editing.title.trim()) {
			setError("id and title are required");
			return;
		}
		setSaving(true);
		setError(null);
		setNotice(null);
		try {
			const technologies = editing.technologies.split(",").map((t) => t.trim()).filter(Boolean);
			await adminUpsertProject({ data: {
				id: editing.id.trim(),
				title: editing.title.trim(),
				category: editing.category,
				description: editing.description,
				longDescription: editing.longDescription,
				problem: "",
				approach: "",
				architecture: "",
				results: "",
				lessons: "",
				technologies,
				year: Number(editing.year) || (/* @__PURE__ */ new Date()).getFullYear(),
				status: editing.status,
				github: editing.github || void 0,
				demo: editing.demo || void 0,
				country: "Remote",
				countryId: "remote",
				visual: "grid",
				featured: editing.featured,
				related: [],
				metrics: {},
				is_published: editing.is_published
			} });
			setNotice(`Saved project “${editing.id}”. Public catalog overlays on next load.`);
			broadcastContentUpdated();
			setEditing(null);
			await load();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Save failed");
		} finally {
			setSaving(false);
		}
	}
	async function remove(id) {
		if (!window.confirm(`Delete admin override for “${id}”? Static seed remains if present.`)) return;
		setError(null);
		try {
			await adminDeleteProject({ data: { id } });
			setNotice(`Deleted override for “${id}”.`);
			broadcastContentUpdated();
			await load();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Delete failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Projects",
				description: "Create new projects or override static seeds. Published rows appear on /work; unpublished rows hide the same id from the public catalog.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", loading && "animate-spin") }), "Reload"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => setEditing(emptyDraft()),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New project"]
				})] })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: error
			}) : null,
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "success",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative min-w-[14rem] flex-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						value: query,
						onChange: (e) => setQuery(e.target.value),
						placeholder: "Search id, title, category…",
						className: "pl-9",
						"aria-label": "Search projects"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterChips, {
					value: filter,
					onChange: setFilter,
					options: [
						{
							value: "all",
							label: "All",
							count: rows.length
						},
						{
							value: "published",
							label: "Published",
							count: rows.filter((r) => r.is_published).length
						},
						{
							value: "draft",
							label: "Draft",
							count: rows.filter((r) => !r.is_published).length
						},
						{
							value: "override",
							label: "Overrides",
							count: rows.filter((r) => r.is_override).length
						},
						{
							value: "featured",
							label: "Featured",
							count: rows.filter((r) => r.data?.featured || r.featured).length
						}
					]
				})]
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: editing.id ? `Edit ${editing.id}` : "New project"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "text-sm text-muted-foreground hover:text-foreground",
						onClick: () => setEditing(null),
						children: "Cancel"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "ID (slug)",
							hint: "Stable id — changes here create a new catalog entry",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.id,
								disabled: Boolean(editing.id && rows.some((r) => r.id === editing.id)),
								onChange: (e) => setEditing({
									...editing,
									id: e.target.value
								}),
								placeholder: "my-project"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.title,
								onChange: (e) => setEditing({
									...editing,
									title: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Category",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground",
								value: editing.category,
								onChange: (e) => setEditing({
									...editing,
									category: e.target.value
								}),
								children: categories.filter((c) => c !== "All").map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: c,
									children: c
								}, c))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Status",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
								className: "h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground",
								value: editing.status,
								onChange: (e) => setEditing({
									...editing,
									status: e.target.value
								}),
								children: [
									"Active",
									"Research",
									"Prototype",
									"Lab",
									"Archive"
								].map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: s,
									children: s
								}, s))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Year",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								value: editing.year,
								onChange: (e) => setEditing({
									...editing,
									year: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Technologies",
							hint: "Comma-separated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.technologies,
								onChange: (e) => setEditing({
									...editing,
									technologies: e.target.value
								}),
								placeholder: "React, TypeScript, Python"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "GitHub URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.github,
								onChange: (e) => setEditing({
									...editing,
									github: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Demo URL",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.demo,
								onChange: (e) => setEditing({
									...editing,
									demo: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Short description",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: editing.description,
								onChange: (e) => setEditing({
									...editing,
									description: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Long description",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 6,
								value: editing.longDescription,
								onChange: (e) => setEditing({
									...editing,
									longDescription: e.target.value
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: editing.featured,
								onChange: (e) => setEditing({
									...editing,
									featured: e.target.checked
								})
							}), "Featured"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "flex items-center gap-2 text-sm text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "checkbox",
								checked: editing.is_published,
								onChange: (e) => setEditing({
									...editing,
									is_published: e.target.checked
								})
							}), "Published (visible on public site)"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "button",
							onClick: () => void save(),
							disabled: saving,
							children: saving ? "Saving…" : "Save project"
						})
					]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Filter by id, title, category…",
					className: "max-w-md",
					"data-filter": "projects"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-subtle",
					children: [filtered.length, " rows"]
				})]
			}),
			loading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Loading projects…",
				body: "Fetching admin project rows from the database."
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No admin project rows yet",
				body: "Static seeds still power the public site. Use New project to add or override entries — those rows win the catalog."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border text-xs uppercase tracking-[0.12em] text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Category"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Status"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Published"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Featured"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Source"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 text-right font-medium",
								children: "Actions"
							})
						] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", {
						className: "divide-y divide-border/60",
						children: filtered.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							"data-project-row": row.id,
							className: "hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono px-4 py-3 text-xs",
									children: row.id
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: row.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: row.category
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-muted-foreground",
									children: row.status
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										on: row.is_published,
										children: row.is_published ? "Live" : "Hidden"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
										on: row.featured,
										children: row.featured ? "Featured" : "—"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium", row.is_override ? "bg-violet-500/15 text-violet-200" : "bg-muted text-muted-foreground"),
										children: row.is_override ? "Override" : "Seed"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex justify-end gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => setEditing(toDraft(row)),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { className: "size-3.5" }), "Edit"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
											type: "button",
											size: "sm",
											variant: "outline",
											onClick: () => void remove(row.id),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
										})]
									})
								})
							]
						}, row.id))
					})]
				})
			})
		]
	});
}
function Badge({ on, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium", on ? "bg-emerald-500/15 text-emerald-200" : "bg-muted text-muted-foreground"),
		children
	});
}
function HqProjectsPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProjectsAdminPage, {}) });
}
//#endregion
export { HqProjectsPage as component };
