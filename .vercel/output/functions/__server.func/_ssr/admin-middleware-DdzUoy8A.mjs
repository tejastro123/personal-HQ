import { n as createMiddleware } from "./ssr.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-middleware-DdzUoy8A.js
/**
* Admin allowlist for the secret console at `/hq`.
*
* Only these emails pass `adminMiddleware` on every admin server function.
* Matching is case-insensitive. Expand this list if you add another operator.
*
* Gate sessions (Grok preview) may store the address without a TLD or with a
* viewer fallback — those variants are also accepted for this operator.
*/
var ADMIN_EMAILS = ["tejas.mellimpudi@gmail.com", "tejas.mellimpudi@gmail"];
function isAdminEmail(email) {
	if (!email) return false;
	const normalized = email.trim().toLowerCase();
	if (ADMIN_EMAILS.includes(normalized)) return true;
	const bare = normalized.replace(/\.$/, "");
	return ADMIN_EMAILS.includes(bare) || ADMIN_EMAILS.includes(`${bare}.com`);
}
/**
* Auth middleware for server functions — the standard way to get the caller's
* verified user id. When deployed the session cookie is same-origin and rides
* along automatically. In the live preview the client also forwards the bearer
* token (partitioned cookies) via the `.client` hook below — call sites do not
* thread it themselves.
*
*   import { createServerFn } from "@tanstack/react-start";
*   import { getSql } from "@/lib/db";
*   import { authMiddleware } from "@/lib/auth/middleware";
*
*   export const listTodos = createServerFn({ method: "GET" })
*     .middleware([authMiddleware])
*     .handler(async ({ context }) => {
*       const sql = await getSql();
*       return sql`select * from todos where user_id = ${context.userId}`;
*     });
*
* Signed out with auth on (live preview included) -> throws `UnauthorizedError`
* (see `verify.server.ts`). With auth disabled (`VITE_AUTH_ENABLED=false`, the
* shipped default) it resolves the shared dev user — but throws instead when a
* `DATABASE_URL` is also set, so an app without sign-in must not use this at
* all. On the auth-on path, use it on every server function that touches
* per-user data and scope every query by `context.userId`.
*/
var authMiddleware = createMiddleware({ type: "function" }).client(async ({ next }) => {
	const { getBearerToken } = await import("./client-IWHfIGH2.mjs").then((n) => n.n).then((n) => n.n);
	return next({ sendContext: { bearerToken: getBearerToken() ?? void 0 } });
}).server(async ({ next, context }) => {
	const { assertSameSiteRequest } = await import("./isolation.server-CGNg1r0B.mjs");
	const { getSessionUser, requireUserId } = await import("./verify.server-D9QZrxdb.mjs");
	assertSameSiteRequest();
	const sessionUser = await getSessionUser(context.bearerToken).catch(() => null);
	return next({ context: {
		userId: sessionUser?.id ?? await requireUserId(context.bearerToken),
		email: sessionUser?.email ?? null
	} });
});
/**
* Admin gate for `/hq` server functions.
*
* Chains the prewired `authMiddleware` (verified `context.userId` + session
* email), then checks the signed-in email against `ADMIN_EMAILS`. Throws when
* the session is missing or the email is not allowlisted — fail closed.
*
* Email comes from the Better Auth session (via authMiddleware), NOT a DB
* re-query: cookie-cached sessions can outlive a PGLite restart, and a missing
* user row would wrongly 403 an otherwise valid admin.
*/
var adminMiddleware = createMiddleware({ type: "function" }).middleware([authMiddleware]).server(async ({ next, context }) => {
	let email = context.email ?? null;
	if (!email && context.userId) {
		const { getSql } = await import("./content-cache-DMv4KU76.mjs").then((n) => n.i).then((n) => n.c);
		email = (await (await getSql()).query(`select email from "user" where id = $1`, [context.userId]))[0]?.email ?? null;
	}
	if (!isAdminEmail(email)) throw new Error("Forbidden");
	return next({ context: {
		userId: context.userId,
		email: (email ?? "").toLowerCase()
	} });
});
//#endregion
export { adminMiddleware as t };
