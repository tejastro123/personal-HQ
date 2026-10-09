import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { f as Save, p as RotateCcw } from "../_libs/lucide-react.mjs";
import { f as adminResetLens, p as adminSaveLens, v as getPublicContent } from "./content-DZvTSqUl.mjs";
import { t as broadcastContentUpdated } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as AdminShell, i as AdminPageHeader, l as StatusBanner, r as AdminCard, s as Field } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/resume-D3HLf1u6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ResumeAdminPage() {
	const [lenses, setLenses] = (0, import_react.useState)([]);
	const [activeId, setActiveId] = (0, import_react.useState)("engineering");
	const [draft, setDraft] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const content = await getPublicContent();
			setLenses(content.lenses);
			const active = content.lenses.find((l) => l.id === activeId) ?? content.lenses[0];
			if (active) {
				setActiveId(active.id);
				setDraft({ ...active });
			}
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load lenses");
		} finally {
			setLoading(false);
		}
	}, [activeId]);
	(0, import_react.useEffect)(() => {
		load();
	}, []);
	function selectLens(id) {
		const lens = lenses.find((l) => l.id === id);
		if (!lens) return;
		setActiveId(id);
		setDraft({ ...lens });
		setNotice(null);
		setError(null);
	}
	async function save() {
		if (!draft) return;
		setSaving(true);
		setError(null);
		setNotice(null);
		try {
			await adminSaveLens({ data: draft });
			setNotice(`Saved resume lens “${draft.label}”. /resume picks this up on next load.`);
			broadcastContentUpdated();
			await load();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Save failed");
		} finally {
			setSaving(false);
		}
	}
	async function resetToSeed() {
		if (!draft || !window.confirm(`Reset “${draft.label}” to the static seed?`)) return;
		setError(null);
		try {
			await adminResetLens({ data: { id: draft.id } });
			setNotice(`Reset “${draft.id}” to seed values.`);
			broadcastContentUpdated();
			await load();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Reset failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Resume lenses",
				description: "Edit the engineering / research / founder narratives on /resume. Saved rows overlay the static seed for that lens id.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => void save(),
					disabled: saving || !draft,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saving ? "Saving…" : "Save lens"]
				})
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: error
			}) : null,
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "success",
				children: notice
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: lenses.map((lens) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => selectLens(lens.id),
					className: cn("rounded-full border px-3 py-1.5 text-sm transition-colors", activeId === lens.id ? "border-accent bg-accent/10 text-foreground" : "border-border text-muted-foreground hover:bg-muted"),
					children: lens.label
				}, lens.id))
			}),
			loading && !draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, { children: "Loading lenses…" }) : draft ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-xl tracking-tight",
					children: draft.label
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					size: "sm",
					onClick: () => void resetToSeed(),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RotateCcw, { className: "size-3.5" }), "Reset to seed"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid gap-4 md:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Label",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.label,
							onChange: (e) => setDraft({
								...draft,
								label: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Headline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.headline,
							onChange: (e) => setDraft({
								...draft,
								headline: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Blurb",
						className: "md:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: draft.blurb,
							onChange: (e) => setDraft({
								...draft,
								blurb: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Focus",
						className: "md:col-span-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							rows: 2,
							value: draft.focus,
							onChange: (e) => setDraft({
								...draft,
								focus: e.target.value
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Project IDs",
						hint: "Comma-separated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.projectIds.join(", "),
							onChange: (e) => setDraft({
								...draft,
								projectIds: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Skills emphasis",
						hint: "Comma-separated",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: draft.skillsEmphasis.join(", "),
							onChange: (e) => setDraft({
								...draft,
								skillsEmphasis: e.target.value.split(",").map((s) => s.trim()).filter(Boolean)
							})
						})
					})
				]
			})] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: "Could not load resume lenses."
			})
		]
	});
}
function HqResumePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResumeAdminPage, {}) });
}
//#endregion
export { HqResumePage as component };
