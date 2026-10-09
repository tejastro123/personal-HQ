import { o as __toESM } from "../_runtime.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { M as House, R as Eye, c as Sparkles, f as Save } from "../_libs/lucide-react.mjs";
import { m as adminSaveSiteSettings, o as adminGetSiteSettings } from "./content-DZvTSqUl.mjs";
import { t as broadcastContentUpdated } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as AdminShell, i as AdminPageHeader, l as StatusBanner, r as AdminCard, s as Field } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/home-DEwxRo1s.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function HomeAdminPage() {
	const [settings, setSettings] = (0, import_react.useState)(null);
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
			setSettings(next);
			baselineRef.current = JSON.stringify(next);
			setDirty(false);
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load home content");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	function patchHome(key, value) {
		setSettings((prev) => {
			if (!prev) return prev;
			const next = {
				...prev,
				home: {
					...prev.home,
					[key]: value
				}
			};
			setDirty(JSON.stringify(next) !== baselineRef.current);
			return next;
		});
	}
	async function save() {
		if (!settings) return;
		setSaving(true);
		setError(null);
		setNotice(null);
		try {
			await adminSaveSiteSettings({ data: settings });
			baselineRef.current = JSON.stringify(settings);
			setDirty(false);
			setNotice("Main-site home content saved. Public pages pick this up on next load.");
			broadcastContentUpdated();
		} catch (err) {
			setError(err instanceof Error ? err.message : "Save failed");
		} finally {
			setSaving(false);
		}
	}
	if (loading && !settings) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "space-y-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
			title: "Home content",
			description: "Loading main-site controls…"
		})
	});
	const home = settings?.home;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Home content",
				description: "Control the main website hero, about, CTA, skills, contact, and projects section copy. Values overlay static seeds; empty social/CTA fields fall back gracefully.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					dirty ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "inline-flex items-center gap-1.5 text-xs text-accent-warm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "size-1.5 rounded-full bg-accent-warm" }), "Unsaved changes"]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: "/",
						target: "_blank",
						rel: "noopener noreferrer",
						className: "inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { className: "size-4" }), "Preview site"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
						type: "button",
						onClick: () => void save(),
						disabled: saving || !settings || !dirty,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Save, { className: "size-4" }), saving ? "Saving…" : "Save home content"]
					})
				] })
			}),
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: error
			}) : null,
			notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "success",
				children: notice
			}) : null,
			home && settings ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5 text-accent" }), "Hero"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mt-2 text-sm text-muted-foreground",
						children: [
							"First screen on ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mono text-xs",
								children: "/"
							}),
							" — eyebrow, headline, CTAs, availability pulse."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4 md:grid-cols-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Eyebrow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.heroEyebrow,
									onChange: (e) => patchHome("heroEyebrow", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Availability line",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.availability,
									onChange: (e) => patchHome("availability", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Availability domains",
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.availabilityDomains,
									onChange: (e) => patchHome("availabilityDomains", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Headline",
								className: "md:col-span-2",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
									rows: 2,
									value: home.heroHeadline,
									onChange: (e) => patchHome("heroHeadline", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Primary CTA label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.heroCtaPrimaryLabel,
									onChange: (e) => patchHome("heroCtaPrimaryLabel", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Primary CTA href",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.heroCtaPrimaryHref,
									onChange: (e) => patchHome("heroCtaPrimaryHref", e.target.value),
									placeholder: "#work or /projects"
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Secondary CTA label",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.heroCtaSecondaryLabel,
									onChange: (e) => patchHome("heroCtaSecondaryLabel", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Secondary CTA href",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.heroCtaSecondaryHref,
									onChange: (e) => patchHome("heroCtaSecondaryHref", e.target.value)
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "preview-frame mt-5 overflow-hidden rounded-xl border border-border p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }),
								"Live hero preview",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ml-auto rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground",
									children: "drafts as you type"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-3 rounded-lg border border-border bg-background/70 p-4 sm:p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
									children: home.heroEyebrow || "eyebrow"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl leading-tight tracking-tight sm:text-3xl",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "gradient-text",
										children: home.heroHeadline || "Headline preview"
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 line-clamp-2 text-sm text-muted-foreground",
									children: settings.shortBio || settings.bio || "Bio text appears here."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 flex flex-wrap gap-2 text-xs",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md bg-accent px-2.5 py-1 text-accent-foreground",
										children: home.heroCtaPrimaryLabel || "Primary"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "rounded-md border border-border px-2.5 py-1 text-muted-foreground",
										children: home.heroCtaSecondaryLabel || "Secondary"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] text-muted-foreground",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "relative flex size-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "relative inline-flex size-2 rounded-full bg-status" })]
									}), home.availability || "Availability"]
								})
							]
						})]
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5 text-accent-2" }), "About"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 space-y-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Statement",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 2,
								value: home.aboutStatement,
								onChange: (e) => patchHome("aboutStatement", e.target.value)
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Body",
							hint: "Blank line = new paragraph",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 6,
								value: home.aboutBody,
								onChange: (e) => patchHome("aboutBody", e.target.value)
							})
						})]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-warm" }), "Bottom CTA"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-4 grid gap-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Eyebrow",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.ctaEyebrow,
									onChange: (e) => patchHome("ctaEyebrow", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Title",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.ctaTitle,
									onChange: (e) => patchHome("ctaTitle", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Body",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									value: home.ctaBody,
									onChange: (e) => patchHome("ctaBody", e.target.value)
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Primary label",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: home.ctaPrimaryLabel,
											onChange: (e) => patchHome("ctaPrimaryLabel", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Primary href",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: home.ctaPrimaryHref,
											onChange: (e) => patchHome("ctaPrimaryHref", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Secondary label",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: home.ctaSecondaryLabel,
											onChange: (e) => patchHome("ctaSecondaryLabel", e.target.value)
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
										label: "Secondary href",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											value: home.ctaSecondaryHref,
											onChange: (e) => patchHome("ctaSecondaryHref", e.target.value)
										})
									})
								]
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, { className: "size-3.5 text-sky-300" }), "Section headings"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Skills title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.skillsTitle,
								onChange: (e) => patchHome("skillsTitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Skills subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.skillsSubtitle,
								onChange: (e) => patchHome("skillsSubtitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Projects title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.projectsTitle,
								onChange: (e) => patchHome("projectsTitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Projects subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.projectsSubtitle,
								onChange: (e) => patchHome("projectsSubtitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Contact title",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.contactTitle,
								onChange: (e) => patchHome("contactTitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Contact subtitle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.contactSubtitle,
								onChange: (e) => patchHome("contactSubtitle", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nav CTA label",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.navCtaLabel,
								onChange: (e) => patchHome("navCtaLabel", e.target.value)
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Nav CTA href",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								value: home.navCtaHref,
								onChange: (e) => patchHome("navCtaHref", e.target.value)
							})
						})
					]
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminCard, {
					className: "border-accent/30 bg-accent-soft/30",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted-foreground",
						children: [
							"Identity fields (name, tagline, bio, social, email) stay on",
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "/hq/site",
								className: "text-foreground underline-offset-4 hover:underline",
								children: "Site settings"
							}),
							". About body paragraphs split on blank lines. CTAs accept hashes (#work) or paths (/projects)."
						]
					})
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBanner, {
				kind: "error",
				children: "Could not load home content."
			})
		]
	});
}
function HqHomePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HomeAdminPage, {}) });
}
//#endregion
export { HqHomePage as component };
