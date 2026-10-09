import { o as __toESM } from "../_runtime.mjs";
import { m as site } from "./content-cache-DMv4KU76.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { t as GROK_PROVIDERS } from "./server-2uRdTPmu.mjs";
import { C as useSearch, S as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as ArrowLeft, C as Mail, E as Lock } from "../_libs/lucide-react.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { r as signIn, t as authClient } from "./client-IWHfIGH2.mjs";
import { t as useCurrentUserState } from "./use-current-user-BZr2emiP.mjs";
import { t as Label } from "./label-DV3xcyOn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-DoAjnSpa.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function LoginPage() {
	const { next } = useSearch({ from: "/login" });
	const navigate = useNavigate();
	const { user, isPending } = useCurrentUserState();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [status, setStatus] = (0, import_react.useState)("idle");
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!isPending && user) navigate({
			to: next,
			replace: true
		});
	}, [
		user,
		isPending,
		navigate,
		next
	]);
	async function onSubmit(e) {
		e.preventDefault();
		setStatus("loading");
		setError(null);
		try {
			if (mode === "signup") {
				const { error: signError } = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0] || "Operator"
				});
				if (signError) throw new Error(signError.message ?? "Sign-up failed");
			} else {
				const { error: signError } = await authClient.signIn.email({
					email,
					password
				});
				if (signError) throw new Error(signError.message ?? "Sign-in failed");
			}
			await authClient.getSession();
			await navigate({
				to: next,
				replace: true
			});
		} catch (err) {
			setStatus("error");
			setError(err instanceof Error ? err.message : "Authentication failed");
		}
	}
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-dvh items-center justify-center bg-background text-muted-foreground",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "mono text-xs uppercase tracking-[0.2em]",
			children: "Resolving session…"
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "relative min-h-dvh overflow-hidden bg-background",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			"aria-hidden": true,
			className: "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.08),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(167,139,250,0.08),transparent_50%)]"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mx-auto flex min-h-dvh max-w-md flex-col justify-center px-4 py-12",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
					href: "/",
					className: "mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }),
						site.name,
						" · studio"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-2xl border border-border bg-card/80 p-8 shadow-[var(--shadow-border)] backdrop-blur",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, { className: "size-3.5 text-accent" }), "Operator console"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "mt-3 font-display text-3xl tracking-tight",
							children: mode === "signin" ? "Sign in" : "Create account"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2 text-sm text-muted-foreground",
							children: "Admin access is email-allowlisted. Sign up with an allowlisted address to manage projects, posts, site settings, and messages."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							onSubmit,
							className: "mt-8 space-y-4",
							children: [
								mode === "signup" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "name",
										children: "Name"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "name",
										value: name,
										onChange: (e) => setName(e.target.value),
										placeholder: "Optional",
										autoComplete: "name"
									})]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "email",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "relative",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { className: "pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
											id: "email",
											type: "email",
											required: true,
											value: email,
											onChange: (e) => setEmail(e.target.value),
											placeholder: "you@example.com",
											autoComplete: "email",
											className: "pl-9"
										})]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "space-y-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label, {
										htmlFor: "password",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
										id: "password",
										type: "password",
										required: true,
										minLength: 8,
										value: password,
										onChange: (e) => setPassword(e.target.value),
										placeholder: "At least 8 characters",
										autoComplete: mode === "signin" ? "current-password" : "new-password"
									})]
								}),
								error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									role: "alert",
									className: "rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-300",
									children: error
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: status === "loading",
									children: status === "loading" ? "Working…" : mode === "signin" ? "Sign in" : "Create account"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-6 flex items-center justify-between text-sm",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "text-muted-foreground underline-offset-4 hover:text-foreground hover:underline",
								onClick: () => {
									setMode(mode === "signin" ? "signup" : "signin");
									setError(null);
								},
								children: mode === "signin" ? "Need an account? Sign up" : "Have an account? Sign in"
							})
						}),
						GROK_PROVIDERS.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-3 text-[11px] uppercase tracking-[0.18em] text-subtle",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								"or",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-2",
							children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								type: "button",
								variant: "outline",
								className: "w-full",
								onClick: () => void signIn(p.providerId, { callbackURL: next }),
								children: ["Continue with ", p.label]
							}, p.providerId))
						})] }) : null
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-6 text-center text-xs text-subtle",
					children: "Signed in as a non-allowlisted email? You can browse the studio, but admin mutations stay locked."
				})
			]
		})]
	});
}
//#endregion
export { LoginPage as component };
