import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { g as Plus, m as RefreshCw, o as Trash2, u as Search, v as Pencil } from "../_libs/lucide-react.mjs";
import { g as adminUpsertPost, i as adminDeletePost, l as adminListPosts } from "./content-DZvTSqUl.mjs";
import { t as broadcastContentUpdated } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as AdminShell, c as FilterChips, i as AdminPageHeader, l as StatusBanner, o as EmptyState, r as AdminCard, s as Field, t as ADMIN_NEW_POST_EVENT } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/blog-ZqytKv1K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var emptyDraft = () => ({
	slug: "",
	title: "",
	date: (/* @__PURE__ */ new Date()).toISOString().slice(0, 10),
	excerpt: "",
	tags: "",
	body: "",
	is_published: true
});
function toDraft(row) {
	return {
		slug: row.slug,
		title: row.data?.title ?? row.title,
		date: row.data?.date ?? row.date,
		excerpt: row.data?.excerpt ?? "",
		tags: (row.data?.tags ?? row.tags ?? []).join(", "),
		body: (row.data?.body ?? []).join("\n\n"),
		is_published: row.is_published
	};
}
function BlogAdminPage() {
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
			setRows(await adminListPosts());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load posts");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	(0, import_react.useEffect)(() => {
		const onNew = () => setEditing(emptyDraft());
		window.addEventListener(ADMIN_NEW_POST_EVENT, onNew);
		return () => window.removeEventListener(ADMIN_NEW_POST_EVENT, onNew);
	}, []);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return rows.filter((r) => {
			if (filter === "published" && !r.is_published) return false;
			if (filter === "draft" && r.is_published) return false;
			if (filter === "override" && !r.is_override) return false;
			if (!q) return true;
			return r.slug.toLowerCase().includes(q) || r.title.toLowerCase().includes(q) || r.tags.some((t) => t.toLowerCase().includes(q));
		});
	}, [
		rows,
		query,
		filter
	]);
	async function save() {
		if (!editing) return;
		if (!editing.slug.trim() || !editing.title.trim()) {
			setError("slug and title are required");
			return;
		}
		setSaving(true);
		setError(null);
		setNotice(null);
		try {
			const body = editing.body.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
			const tags = editing.tags.split(",").map((t) => t.trim()).filter(Boolean);
			await adminUpsertPost({ data: {
				slug: editing.slug.trim(),
				title: editing.title.trim(),
				date: editing.date,
				excerpt: editing.excerpt,
				tags,
				body,
				is_published: editing.is_published
			} });
			setNotice(`Saved post “${editing.slug}”. Public blog overlays on next load.`);
			broadcastContentUpdated();
			setEditing(null);
			await load();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Save failed");
		} finally {
			setSaving(false);
		}
	}
	async function remove(slug) {
		if (!window.confirm(`Delete admin override for “${slug}”? Static seed remains if present.`)) return;
		setError(null);
		try {
			await adminDeletePost({ data: { slug } });
			setNotice(`Deleted override for “${slug}”.`);
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
				title: "Blog",
				description: "Write posts or override the static lab notes. Blank lines split paragraphs. Published rows appear on /blog; unpublished rows hide the same slug.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", loading && "animate-spin") }), "Reload"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => setEditing(emptyDraft()),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { className: "size-4" }), "New post"]
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
						placeholder: "Search slug, title, tags…",
						className: "pl-9",
						"aria-label": "Search posts"
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
						}
					]
				})]
			}),
			editing ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-xl tracking-tight",
						children: editing.slug ? `Edit ${editing.slug}` : "New post"
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
							label: "Slug",
							hint: "URL segment — /blog/your-slug",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.slug,
								disabled: Boolean(editing.slug && rows.some((r) => r.slug === editing.slug)),
								onChange: (e) => setEditing({
									...editing,
									slug: e.target.value
								}),
								placeholder: "my-post"
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
							label: "Date",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: editing.date,
								onChange: (e) => setEditing({
									...editing,
									date: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tags",
							hint: "Comma-separated",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: editing.tags,
								onChange: (e) => setEditing({
									...editing,
									tags: e.target.value
								}),
								placeholder: "Quantum, Tools"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Excerpt",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: editing.excerpt,
								onChange: (e) => setEditing({
									...editing,
									excerpt: e.target.value
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Body",
							hint: "Blank line = new paragraph. Keep it plain text — figures stay on seeded posts.",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 12,
								value: editing.body,
								onChange: (e) => setEditing({
									...editing,
									body: e.target.value
								})
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex items-center gap-2 text-sm text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: editing.is_published,
							onChange: (e) => setEditing({
								...editing,
								is_published: e.target.checked
							})
						}), "Published (visible on public blog)"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "button",
						onClick: () => void save(),
						disabled: saving,
						children: saving ? "Saving…" : "Save post"
					})]
				})
			] }) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: query,
					onChange: (e) => setQuery(e.target.value),
					placeholder: "Filter by slug, title, tag…",
					className: "max-w-md",
					"data-filter": "blog"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-xs text-subtle",
					children: [filtered.length, " rows"]
				})]
			}),
			loading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Loading posts…",
				body: "Fetching admin blog rows from the database."
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "No admin blog rows yet",
				body: "Static posts still power /blog. New posts and overrides you save here appear once published."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "overflow-x-auto rounded-xl border border-border bg-card",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full min-w-[720px] text-left text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
						className: "border-b border-border text-xs uppercase tracking-[0.12em] text-subtle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Slug"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Title"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Date"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Tags"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
								className: "px-4 py-3 font-medium",
								children: "Published"
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
							"data-blog-row": row.slug,
							className: "hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "mono px-4 py-3 text-xs",
									children: row.slug
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: row.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 tabular-nums text-muted-foreground",
									children: row.date
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3 text-xs text-subtle",
									children: row.tags.join(" · ")
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
									className: "px-4 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: cn("inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium", row.is_published ? "bg-emerald-500/15 text-emerald-200" : "bg-muted text-muted-foreground"),
										children: row.is_published ? "Live" : "Hidden"
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
											onClick: () => void remove(row.slug),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
										})]
									})
								})
							]
						}, row.slug))
					})]
				})
			})
		]
	});
}
function HqBlogPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BlogAdminPage, {}) });
}
//#endregion
export { HqBlogPage as component };
