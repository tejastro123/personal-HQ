/**
 * Local email/password sign-in (this app's Better Auth DB — not the broker).
 *
 * Enabled for the secret admin console at `/hq`. Only emails on the admin
 * allowlist (`src/lib/admin.ts`) can use admin mutations — sign-up alone is
 * not enough.
 */
export const emailAndPasswordEnabled = true;
