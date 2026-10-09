import { o as __toESM } from "../_runtime.mjs";
import { t as cn } from "./utils-C_uf36nf.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { t as Button } from "./button-CPCoI3-S.mjs";
import { K as Check, m as RefreshCw, o as Trash2, u as Search, w as MailOpen } from "../_libs/lucide-react.mjs";
import { c as adminListMessages, d as adminMarkMessageRead, r as adminDeleteMessage } from "./content-DZvTSqUl.mjs";
import { t as Input } from "./input-eGXWszwR.mjs";
import { a as AdminShell, c as FilterChips, i as AdminPageHeader, l as StatusBanner, o as EmptyState, r as AdminCard } from "./ui-CgULEN53.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/messages-C4kWvGKC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function MessagesAdminPage() {
	const [rows, setRows] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)(null);
	const [openId, setOpenId] = (0, import_react.useState)(null);
	const [query, setQuery] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("all");
	const load = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			setRows(await adminListMessages());
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to load messages");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		load();
	}, [load]);
	const unreadCount = (0, import_react.useMemo)(() => rows.filter((m) => !m.is_read).length, [rows]);
	const filtered = (0, import_react.useMemo)(() => {
		const q = query.trim().toLowerCase();
		return rows.filter((m) => {
			if (filter === "unread" && m.is_read) return false;
			if (filter === "read" && !m.is_read) return false;
			if (!q) return true;
			return m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q) || (m.subject ?? "").toLowerCase().includes(q) || m.message.toLowerCase().includes(q);
		});
	}, [
		rows,
		query,
		filter
	]);
	async function markRead(id) {
		try {
			await adminMarkMessageRead({ data: { id } });
			setRows((prev) => prev.map((m) => m.id === id ? {
				...m,
				is_read: true
			} : m));
			window.dispatchEvent(new CustomEvent("admin:messages-changed"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to mark read");
		}
	}
	async function markAllRead() {
		const unreadIds = rows.filter((m) => !m.is_read).map((m) => m.id);
		if (unreadIds.length === 0) return;
		try {
			for (const id of unreadIds) await adminMarkMessageRead({ data: { id } });
			setRows((prev) => prev.map((m) => ({
				...m,
				is_read: true
			})));
			setNotice(`Marked ${unreadIds.length} message(s) read.`);
			window.dispatchEvent(new CustomEvent("admin:messages-changed"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Failed to mark all read");
		}
	}
	async function remove(id) {
		if (!window.confirm("Delete this message permanently?")) return;
		try {
			await adminDeleteMessage({ data: { id } });
			setNotice("Message deleted.");
			setRows((prev) => prev.filter((m) => m.id !== id));
			window.dispatchEvent(new CustomEvent("admin:messages-changed"));
		} catch (err) {
			setError(err instanceof Error ? err.message : "Delete failed");
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-8",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminPageHeader, {
				title: "Messages",
				description: "Contact form submissions saved to the database. Search the inbox, filter unread, and reply by email.",
				actions: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [unreadCount > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void markAllRead(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-4" }),
						"Mark all read (",
						unreadCount,
						")"
					]
				}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					type: "button",
					variant: "outline",
					onClick: () => void load(),
					disabled: loading,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RefreshCw, { className: cn("size-4", loading && "animate-spin") }), "Reload"]
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
						placeholder: "Search name, email, subject, body…",
						className: "pl-9",
						"aria-label": "Search messages"
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
							value: "unread",
							label: "Unread",
							count: unreadCount
						},
						{
							value: "read",
							label: "Read",
							count: rows.length - unreadCount
						}
					]
				})]
			}),
			loading && rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: "Loading inbox…",
				body: "Fetching contact messages."
			}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, {
				title: rows.length === 0 ? "Inbox is empty" : "No matches",
				body: rows.length === 0 ? "Messages submitted from the public contact form will land here." : "Try a different search or filter."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "space-y-3",
				children: filtered.map((msg) => {
					const open = openId === msg.id;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminCard, {
						pad: false,
						className: cn("overflow-hidden", !msg.is_read && "border-sky-500/30"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							"data-message-row": msg.id,
							onClick: () => setOpenId(open ? null : msg.id),
							className: "flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left hover:bg-muted/40",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-2 shrink-0 rounded-full", msg.is_read ? "bg-border" : "bg-sky-400") }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "font-medium",
									children: msg.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "text-sm text-muted-foreground",
									children: msg.email
								}),
								msg.subject ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "truncate text-sm text-subtle",
									children: ["· ", msg.subject]
								}) : null,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "mono ml-auto text-xs tabular-nums text-subtle",
									children: new Date(msg.created_at).toLocaleString()
								})
							]
						}), open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "border-t border-border px-4 py-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "whitespace-pre-wrap text-sm leading-relaxed text-foreground",
								children: msg.message
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mt-4 flex flex-wrap gap-2",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
										href: `mailto:${msg.email}?subject=${encodeURIComponent(msg.subject ? `Re: ${msg.subject}` : "Re: your message")}&body=${encodeURIComponent(`\n\n---\nReplying to ${msg.name} <${msg.email}>:\n${msg.message}`)}`,
										className: "inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MailOpen, { className: "size-4" }), "Reply by email"]
									}),
									!msg.is_read ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => void markRead(msg.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-3.5" }), "Mark read"]
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										type: "button",
										size: "sm",
										variant: "outline",
										onClick: () => void remove(msg.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { className: "size-3.5" }), "Delete"]
									})
								]
							})]
						}) : null]
					}, msg.id);
				})
			})
		]
	});
}
function HqMessagesPage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessagesAdminPage, {}) });
}
//#endregion
export { HqMessagesPage as component };
