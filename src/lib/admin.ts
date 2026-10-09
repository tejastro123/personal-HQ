/**
 * Admin allowlist for the secret console at `/hq`.
 *
 * Only these emails pass `adminMiddleware` on every admin server function.
 * Matching is case-insensitive. Expand this list if you add another operator.
 *
 * Gate sessions (Grok preview) may store the address without a TLD or with a
 * viewer fallback — those variants are also accepted for this operator.
 */
export const ADMIN_EMAILS: readonly string[] = [
  "tejas.mellimpudi@gmail.com",
  "tejas.mellimpudi@gmail",
];

export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const normalized = email.trim().toLowerCase();
  if (ADMIN_EMAILS.includes(normalized)) return true;
  // Tolerate missing ".com" and trailing dots from gate/viewer identities.
  const bare = normalized.replace(/\.$/, "");
  return ADMIN_EMAILS.includes(bare) || ADMIN_EMAILS.includes(`${bare}.com`);
}
