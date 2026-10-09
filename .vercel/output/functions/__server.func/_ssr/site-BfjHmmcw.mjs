import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { f as Save } from "../_libs/lucide-react.mjs";
import { m as adminSaveSiteSettings, o as adminGetSiteSettings } from "./content-DZvTSqUl.mjs";
import { t as broadcastContentUpdated } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as AdminShell, i as AdminPageHeader, l as StatusBanner, r as AdminCard, s as Field } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/site-BfjHmmcw.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SiteAdminPage() {
	const [form, setForm] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [saving, setSaving] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [dirty, setDirty] = (0, import_react.useState)(false);
	const baselineRef = (0, import_react.useRef)("");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const next = await adminGetSiteSettings();
			setForm(next);
			baselineRef.current = JSON.stringify(next);
			setDirty(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load site settings");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	async function save() {
		if (!form) return;
		setSaving(true);
		setError(null);
		setNotice(null);
		try {
			await adminSaveSiteSettings({ data: form });
			baselineRef.current = JSON.stringify(form);
			setDirty(false);
			setNotice("Site settings saved. Contact/social surfaces read these values via the content layer.");
			broadcastContentUpdated();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Save failed");
		} finally {
			setSaving(false);
		}
	}
	function patch(key, value) {
		setForm((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				[key]: value
			};
			setDirty(JSON.stringify(next) !== baselineRef.current);
			return next;
		});
	}
	if (loading && !form) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Site settings",
			description: "Loading…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Site settings",
				description: "Identity, contact, and social links. Values overlay the static site.ts defaults; empty social URLs stay hidden on the public site.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-xs text-accent-warm",
					children: "Unsaved changes"
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					onClick: () => void save(),
					disabled: saving || !form || !dirty,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saving ? "Saving…" : "Save settings"]
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
			form ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-tight",
					children: "Identity"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.name,
								onChange: (e) => patch("name", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Page title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.title,
								onChange: (e) => patch("title", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Tagline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.tagline,
								onChange: (e) => patch("tagline", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Short bio",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.shortBio,
								onChange: (e) => patch("shortBio", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Footer line",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.footer,
								onChange: (e) => patch("footer", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								value: form.email,
								onChange: (e) => patch("email", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Meta description",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 3,
								value: form.description,
								onChange: (e) => patch("description", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Bio",
							className: "md:col-span-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 4,
								value: form.bio,
								onChange: (e) => patch("bio", e.target.value)
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-lg tracking-tight",
						children: "Contact delivery"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: "Formspree ID is optional. When empty, the public contact form saves to the admin inbox and opens a mailto draft."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Formspree form ID",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: form.formspreeId,
								onChange: (e) => patch("formspreeId", e.target.value),
								placeholder: "xyzabcd"
							})
						})
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display text-lg tracking-tight",
					children: "Social links"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: [
						"github",
						"linkedin",
						"instagram",
						"youtube",
						"x"
					].map((key) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: key,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: form.social[key],
							onChange: (e) => patch("social", {
								...form.social,
								[key]: e.target.value
							}),
							placeholder: "https://…"
						})
					}, key))
				})] })
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: "Could not load site settings."
			})
		]
	});
}
function HqSitePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteAdminPage, {}) });
}
//#endregion
export { HqSitePage as component };
