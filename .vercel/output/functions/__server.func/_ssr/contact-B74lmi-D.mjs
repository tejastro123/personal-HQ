import { o as __toESM } from "../_runtime.mjs";
import { m as site, n as contactEndpoint } from "./content-cache-DMv4KU76.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { Bt as string, Lt as object, Nt as email } from "../_libs/@better-auth/core+[...].mjs";
import { C as Mail, G as CircleCheck, Q as ArrowRight, c as Sparkles, l as ShieldCheck } from "../_libs/lucide-react.mjs";
import { o as projectTypes, r as budgetScopes } from "./content-CThzlbdn.mjs";
import { n as persistContactMessage, s as usePublicSiteSettings } from "./use-public-content-By6XsNcY.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { t as Textarea } from "./textarea-DgGbhxfi.mjs";
import { a as TiltCard, i as SectionStage, r as SectionHeading, t as DepthReveal } from "./tilt-DhzCXJUk.mjs";
import { t as Label } from "./label-DV3xcyOn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-B74lmi-D.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var schema = object({
	name: string().min(2, "Please enter your name"),
	email: email("Enter a valid email"),
	projectType: string().min(1, "Select a project type"),
	budget: string().min(1, "Select a scope"),
	message: string().min(12, "Tell me a little more about the idea")
});
var PROCESS_STEPS = [
	{
		title: "Read",
		body: "I review the brief and reply with questions if anything is unclear."
	},
	{
		title: "Scope",
		body: "We align on stack, timeline, and what â€œdoneâ€ actually means."
	},
	{
		title: "Build",
		body: "Shipping in public where possible â€” demos, repos, and honest progress."
	}
];
function Contact({ standalone = false }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [delivery, setDelivery] = (0, import_react.useState)("email");
	const [persistError, setPersistError] = (0, import_react.useState)(null);
	const settings = usePublicSiteSettings();
	const endpoint = settings.formspreeId ? `https://formspree.io/f/${settings.formspreeId}` : contactEndpoint();
	const form = useForm({
		resolver: u(schema),
		defaultValues: {
			name: "",
			email: "",
			projectType: "",
			budget: "",
			message: ""
		}
	});
	const projectType = form.watch("projectType");
	async function onSubmit(values) {
		setStatus("loading");
		setPersistError(null);
		const subject = `[${values.projectType}] Message from ${values.name}`;
		const body = `Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\nScope: ${values.budget}\n\n${values.message}`;
		try {
			const persisted = await persistContactMessage({
				name: values.name,
				email: values.email,
				subject,
				message: body
			});
			if (!persisted.ok) {
				setPersistError(persisted.error);
				setStatus("error");
				return;
			}
			if (endpoint) {
				const res = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify(values)
				});
				if (!res.ok) {
					if (persisted.ok) {
						setDelivery("inbox");
						setStatus("success");
						form.reset();
						return;
					}
					let detail = `Formspree ${res.status}`;
					try {
						const data = await res.json();
						if (data?.error) detail = `${detail}: ${data.error}`;
					} catch {}
					throw new Error(detail);
				}
				setDelivery("formspree");
				setStatus("success");
				form.reset();
				return;
			}
			window.location.href = `mailto:${settings.email || site.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
			const key = "tejas-contact-drafts";
			const prev = JSON.parse(localStorage.getItem(key) || "[]");
			localStorage.setItem(key, JSON.stringify([{
				...values,
				at: (/* @__PURE__ */ new Date()).toISOString()
			}, ...prev].slice(0, 20)));
			setDelivery(persisted.ok ? "inbox" : "email");
			setStatus("success");
			form.reset();
		} catch {
			setStatus("error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionStage, {
		id: "contact",
		variant: "warm",
		className: standalone ? "border-t-0" : void 0,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "grid gap-12 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DepthReveal, {
				className: "lg:col-span-5",
				rotate: 6,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "section-heading-hud",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
							eyebrow: "Contact",
							title: settings.home.contactTitle || "Start a conversation.",
							subtitle: settings.home.contactSubtitle || (endpoint ? "This form sends straight to my inbox. Prefer email? The address below always works." : "Submit to save a note in the studio inbox and open a prefilled email — no account required. You can also write me directly.")
						})
					}),
					settings.email || site.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
						href: `mailto:${settings.email || site.email}`,
						className: "mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1.5 text-sm text-foreground shadow-[var(--shadow-border)] underline-offset-4 transition-transform duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-accent-soft hover:no-underline",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "size-3.5 text-accent" }), settings.email || site.email]
					}) : null,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-8 space-y-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mono text-[11px] uppercase tracking-[0.18em] text-subtle",
							children: "What happens next"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: PROCESS_STEPS.map((step, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TiltCard, {
								intensity: 5,
								glare: false,
								className: "frame-panel rounded-xl border border-border/80 bg-card/70 shadow-[var(--shadow-border)]",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "relative z-10 flex gap-3 p-3.5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "mono mt-0.5 text-[11px] text-accent",
										children: String(i + 1).padStart(2, "0")
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium text-foreground",
										children: step.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-0.5 text-sm text-muted-foreground",
										children: step.body
									})] })]
								})
							}) }, step.title))
						})]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DepthReveal, {
				delay: .1,
				className: "lg:col-span-7",
				rotate: 4,
				children: status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "glass rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "size-8 text-emerald-300" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "mt-4 font-display text-2xl tracking-tight",
							children: delivery === "formspree" ? "Message sent." : delivery === "inbox" ? "Message received." : "Your email client should be open."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: delivery === "formspree" ? "Thanks â€” I'll get back to you as soon as I can." : delivery === "inbox" ? "Your note is in the studio inbox. You can also email directly if it's urgent." : `If nothing opened, email me directly at ${settings.email || site.email}. Your message is also saved as a local draft on this device.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							onClick: () => setStatus("idle"),
							children: "Send another"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(onSubmit),
					className: "glass space-y-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)] sm:p-7",
					noValidate: true,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-wrap items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.16em] text-muted-foreground",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "size-3.5 text-accent-2" }), "Project brief"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "flex items-center gap-1.5 text-xs text-subtle",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { className: "size-3.5 text-emerald-300" }), "Stored in studio inbox"]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Name",
							error: form.formState.errors.name?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								autoComplete: "name",
								...form.register("name")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Email",
							error: form.formState.errors.email?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "email",
								autoComplete: "email",
								...form.register("email")
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-4 sm:grid-cols-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Project Type",
								error: form.formState.errors.projectType?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectNative, {
									...form.register("projectType"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Selectâ€¦"
									}), projectTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))]
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
								label: "Budget / Scope",
								error: form.formState.errors.budget?.message,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectNative, {
									...form.register("budget"),
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Selectâ€¦"
									}), budgetScopes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))]
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "flex flex-wrap gap-1.5",
							children: projectTypes.slice(0, 8).map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => form.setValue("projectType", t, { shouldDirty: true }),
								className: cn("chip-glow rounded-full border px-3 py-1 text-xs", projectType === t ? "border-accent bg-accent-soft text-accent" : "border-border bg-background text-muted-foreground"),
								children: t
							}, t))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Message",
							error: form.formState.errors.message?.message,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
								rows: 6,
								...form.register("message")
							})
						}),
						status === "error" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-sm text-status",
							role: "alert",
							children: persistError ? persistError : endpoint ? "Delivery failed â€” try again, or email me directly at " + (settings.email || site.email) + "." : "Could not open your mail app. Email me directly at " + (settings.email || site.email) + "."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "submit",
							size: "lg",
							variant: "warm",
							disabled: status === "loading",
							children: [status === "loading" ? "Sendingâ€¦" : endpoint ? "Send Message" : "Send to inbox", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					]
				})
			})]
		})
	});
}
function Field({ label, error, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
		className: "block space-y-1.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, { children: label }),
			children,
			error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-status",
				role: "alert",
				children: error
			}) : null
		]
	});
}
function SelectNative(props) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
		...props,
		className: "flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-border)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
	});
}
//#endregion
export { Contact as t };
