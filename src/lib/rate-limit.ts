/**
 * In-process sliding-window rate limiter.
 *
 * System-design notes:
 * - Per-process memory is correct for this single-instance preview/deploy.
 * - Keys are namespaced (`contact:ip`, `auth:email`) so budgets don't collide.
 * - Fail-open on overflow protection is NOT used: contact/auth stay strict.
 * - Public health endpoint never rate-limits.
 */

type Bucket = { hits: number[] };

const g = globalThis as typeof globalThis & {
  __rateLimitBuckets__?: Map<string, Bucket>;
};

function store(): Map<string, Bucket> {
  g.__rateLimitBuckets__ ??= new Map();
  return g.__rateLimitBuckets__;
}

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  retryAfterSec: number;
};

export function checkRateLimit(
  bucket: string,
  key: string,
  limit: number,
  windowMs: number,
  now = Date.now(),
): RateLimitResult {
  const map = store();
  const id = `${bucket}:${key}`;
  const bucketRow = map.get(id) ?? { hits: [] };
  const cutoff = now - windowMs;
  bucketRow.hits = bucketRow.hits.filter((t) => t > cutoff);

  if (bucketRow.hits.length >= limit) {
    const oldest = bucketRow.hits[0] ?? now;
    const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1000));
    map.set(id, bucketRow);
    return { ok: false, remaining: 0, retryAfterSec };
  }

  bucketRow.hits.push(now);
  map.set(id, bucketRow);
  return { ok: true, remaining: limit - bucketRow.hits.length, retryAfterSec: 0 };
}

/** Contact form: 5 / 10 min / IP-ish key. */
export const CONTACT_RATE = { limit: 5, windowMs: 10 * 60 * 1000 } as const;

/** Auth/login style: 10 / 15 min / email. */
export const AUTH_RATE = { limit: 10, windowMs: 15 * 60 * 1000 } as const;

export function clientIp(headers: Headers): string {
  const fwd = headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim() || "unknown";
  return headers.get("x-real-ip") || "unknown";
}
