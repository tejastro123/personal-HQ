import { createMiddleware } from "@tanstack/react-start";
import { isAdminEmail } from "@/lib/admin";
import { authMiddleware } from "@/lib/auth/middleware";

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
export const adminMiddleware = createMiddleware({ type: "function" })
  .middleware([authMiddleware])
  .server(async ({ next, context }) => {
    let email = context.email ?? null;
    if (!email && context.userId) {
      // Session email missing (older middleware / edge) — one DB fallback.
      const { getSql } = await import("@/lib/db");
      const sql = await getSql();
      const rows = await sql.query<{ email: string | null }>(
        `select email from "user" where id = $1`,
        [context.userId],
      );
      email = rows[0]?.email ?? null;
    }
    if (!isAdminEmail(email)) {
      throw new Error("Forbidden");
    }
    return next({
      context: { userId: context.userId, email: (email ?? "").toLowerCase() },
    });
  });
