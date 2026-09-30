import { i as __toESM } from "../_runtime.mjs";
import { n as useForm, r as require_react, t as u } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as string, i as object, t as email } from "../_libs/zod.mjs";
import { i as contactEndpoint, s as site } from "./router-C6XbOyFA.mjs";
import { r as cn, t as Button } from "./theme-toggle-BXztJUq1.mjs";
import { n as SectionHeading, t as Reveal } from "./reveal-VloQCJ-f.mjs";
import { o as projectTypes, r as budgetScopes } from "./content-CThzlbdn.mjs";
import { t as Root } from "../_libs/radix-ui__react-label.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/contact-BPKtAMbF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Input = import_react.forwardRef(({ className, type, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
	type,
	className: cn("flex h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[border-color,box-shadow] duration-150 placeholder:text-subtle hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Input.displayName = "Input";
var Label = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Root, {
	ref,
	className: cn("text-xs font-medium tracking-wide text-muted-foreground", className),
	...props
}));
Label.displayName = Root.displayName;
var Textarea = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
	className: cn("flex min-h-32 w-full rounded-lg border border-border bg-card px-3 py-3 text-sm text-foreground shadow-[var(--shadow-border)] transition-[border-color,box-shadow] duration-150 placeholder:text-subtle hover:border-border-strong focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
	ref,
	...props
}));
Textarea.displayName = "Textarea";
var schema = object({
	name: string().min(2, "Please enter your name"),
	email: email("Enter a valid email"),
	projectType: string().min(1, "Select a project type"),
	budget: string().min(1, "Select a scope"),
	message: string().min(12, "Tell me a little more about the idea")
});
function Contact({ standalone = false }) {
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [delivery, setDelivery] = (0, import_react.useState)("email");
	const endpoint = contactEndpoint();
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
	async function onSubmit(values) {
		setStatus("loading");
		try {
			if (endpoint) {
				const res = await fetch(endpoint, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Accept: "application/json"
					},
					body: JSON.stringify(values)
				});
				if (!res.ok) throw new Error(`Formspree ${res.status}`);
				setDelivery("formspree");
				setStatus("success");
				form.reset();
				return;
			}
			const subject = encodeURIComponent(`[${values.projectType}] Message from ${values.name}`);
			const body = encodeURIComponent(`Name: ${values.name}\nEmail: ${values.email}\nProject type: ${values.projectType}\nScope: ${values.budget}\n\n${values.message}`);
			window.location.href = `mailto:${site.email}?subject=${subject}&body=${body}`;
			const key = "tejas-contact-drafts";
			const prev = JSON.parse(localStorage.getItem(key) || "[]");
			localStorage.setItem(key, JSON.stringify([{
				...values,
				at: (/* @__PURE__ */ new Date()).toISOString()
			}, ...prev].slice(0, 20)));
			setDelivery("email");
			setStatus("success");
			form.reset();
		} catch {
			setStatus("error");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		id: "contact",
		className: cn("scroll-mt-24 border-t border-border py-20 sm:py-28", standalone && "border-t-0"),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-12",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Reveal, {
				className: "lg:col-span-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHeading, {
					eyebrow: "Contact",
					title: "Start a conversation.",
					subtitle: endpoint ? "This form sends straight to my inbox. Prefer email? The address below always works." : "Submit to open a prefilled email in your mail app — no account, no server required. You can also write me directly."
				}), site.email ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: `mailto:${site.email}`,
					className: "mt-4 inline-flex items-center gap-2 text-sm text-foreground underline-offset-4 hover:underline",
					children: site.email
				}) : null]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Reveal, {
				delay: .08,
				className: "lg:col-span-7",
				children: status === "success" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-xl border border-border bg-card p-8 shadow-[var(--shadow-border)]",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
							className: "font-display text-2xl tracking-tight",
							children: delivery === "formspree" ? "Message sent." : "Your email client should be open."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm text-muted-foreground",
							children: delivery === "formspree" ? "Thanks — I'll get back to you as soon as I can." : `If nothing opened, email me directly at ${site.email}. Your message is also saved as a local draft on this device.`
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "mt-6",
							onClick: () => setStatus("idle"),
							children: "Send another"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: form.handleSubmit(onSubmit),
					className: "space-y-4 rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)] sm:p-7",
					noValidate: true,
					children: [
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
										children: "Select…"
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
										children: "Select…"
									}), budgetScopes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: t,
										children: t
									}, t))]
								})
							})]
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
							children: "Something went wrong. Try again, or email me directly."
						}) : null,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							type: "submit",
							size: "lg",
							variant: "warm",
							disabled: status === "loading",
							children: status === "loading" ? "Sending…" : endpoint ? "Send Message →" : "Open Email →"
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
