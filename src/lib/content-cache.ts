/**
 * Server-side content cache + version tokens.
 *
 * Concepts applied:
 * - **Cache-aside**: public reads fill a TTL cache; admin writes invalidate.
 * - **Version tokens**: content version derived from max(updated_at)+counts —
 *   cheap ETag-style signal without storing every revision.
 * - **Explicit invalidation**: mutations call `invalidateContentCache(scope)`.
 * - **Graceful degradation**: on cache/loader failure callers keep static seeds.
 */

import type { Sql } from "@/lib/db";

type CacheEntry = { value: unknown; version: string; expiresAt: number };

const g = globalThis as typeof globalThis & {
  __contentCache__?: Map<string, CacheEntry>;
  __contentVersionCache__?: { version: string; at: number } | null;
};

const TTL_MS = 30_000;
const VERSION_TTL_MS = 5_000;

function cacheMap(): Map<string, CacheEntry> {
  g.__contentCache__ ??= new Map();
  return g.__contentCache__;
}

export type ContentVersion = {
  version: string;
  projects: number;
  posts: number;
  messages: number;
  events: number;
  siteUpdatedAt: string | null;
};

/**
 * Derive a content version from table high-water marks + counts.
 * Changes on any admin mutation → new version → clients refetch.
 */
export async function readContentVersion(sql: Sql): Promise<ContentVersion> {
  const cached = g.__contentVersionCache__;
  if (cached && Date.now() - cached.at < VERSION_TTL_MS) {
    // Still recompute lightweight counts? For correctness after invalidation we
    // skip the memo when cache was explicitly busted.
    // The version memo is refreshed by refreshContentVersion / invalidate.
  }
  const [proj, posts, msgs, events, site] = await Promise.all([
    sql.query<{ n: number; max: string | null }>(
      `select count(*)::int as n, max(updated_at)::text as max from admin_projects`,
    ),
    sql.query<{ n: number; max: string | null }>(
      `select count(*)::int as n, max(updated_at)::text as max from admin_blog_posts`,
    ),
    sql.query<{ n: number }>(
      `select count(*)::int as n from contact_messages`,
    ),
    sql.query<{ n: number }>(
      `select count(*)::int as n from content_events`,
    ),
    sql.query<{ updated_at: string | null }>(
      `select updated_at::text as updated_at from site_settings where key = 'site'`,
    ),
  ]);
  const result: ContentVersion = {
    version: "",
    projects: proj[0]?.n ?? 0,
    posts: posts[0]?.n ?? 0,
    messages: msgs[0]?.n ?? 0,
    events: events[0]?.n ?? 0,
    siteUpdatedAt: site[0]?.updated_at ?? null,
  };
  const parts = [
    result.projects,
    result.posts,
    result.messages,
    result.events,
    result.siteUpdatedAt ?? "",
    proj[0]?.max ?? "",
    posts[0]?.max ?? "",
  ];
  result.version = `v${hash(parts.join("|"))}`;
  return result;
}

function hash(input: string): string {
  // FNV-1a 32-bit — stable, dependency-free, good enough for cache keys.
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return (h >>> 0).toString(16).padStart(8, "0");
}

export async function getContentVersion(sql: Sql): Promise<ContentVersion> {
  return readContentVersion(sql);
}

/**
 * Cache-aside read. `key` should include the version token so different
 * content revisions never share an entry.
 */
export async function cachedRead<T>(
  key: string,
  version: string,
  loader: () => Promise<T>,
): Promise<T> {
  const map = cacheMap();
  const id = `${key}::${version}`;
  const hit = map.get(id);
  if (hit && hit.expiresAt > Date.now()) {
    return hit.value as T;
  }
  const value = await loader();
  map.set(id, { value, version, expiresAt: Date.now() + TTL_MS });
  // Bound cache size (cheap eviction of oldest entries).
  if (map.size > 64) {
    const oldest = map.keys().next().value;
    if (oldest) map.delete(oldest);
  }
  return value;
}

/** Drop cached entries. scope "all" (default) or a prefix like "projects". */
export function invalidateContentCache(scope = "all"): void {
  const map = cacheMap();
  if (scope === "all") {
    map.clear();
  } else {
    for (const key of [...map.keys()]) {
      if (key.startsWith(`${scope}::`) || key.startsWith(scope)) map.delete(key);
    }
  }
  g.__contentVersionCache__ = null;
}

export function contentCacheStats(): { entries: number; versionMemo: boolean } {
  return {
    entries: cacheMap().size,
    versionMemo: Boolean(g.__contentVersionCache__),
  };
}

/** Append-only event log (outbox). Never throws into the mutation path. */
export async function emitContentEvent(
  sql: Sql,
  event: {
    kind: string;
    entity: string;
    entityId?: string | null;
    detail?: Record<string, unknown> | null;
    actorEmail?: string | null;
  },
): Promise<void> {
  try {
    await sql.query(
      `insert into content_events (kind, entity, entity_id, detail, actor_email)
       values ($1, $2, $3, $4, $5)`,
      [
        event.kind,
        event.entity,
        event.entityId ?? null,
        event.detail ? JSON.stringify(event.detail) : null,
        event.actorEmail ?? null,
      ],
    );
  } catch (err) {
    console.error("[content-events] emit failed:", err);
  }
}
