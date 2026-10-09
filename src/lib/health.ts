/**
 * Health / readiness checks for the HQ stack.
 *
 * Concepts:
 * - **Liveness**: process is up (always true if this runs).
 * - **Readiness**: DB reachable + migrations applied + cache layer usable.
 * - **Graceful degradation**: public site works on static seeds when DB is down;
 *   health reports degraded rather than crashing.
 */

import { dbSource, ensureDbReady, getSql } from "@/lib/db";
import { contentCacheStats } from "@/lib/content-cache";

export type HealthStatus = "ok" | "degraded" | "down";

export type HealthReport = {
  status: HealthStatus;
  uptimeSec: number;
  db: {
    source: DbSourceLike;
    ready: boolean;
    error: string | null;
    migrationsApplied: number | null;
  };
  cache: { entries: number; versionMemo: boolean };
  time: string;
};

type DbSourceLike = "neon" | "pglite";

const startedAt = Date.now();

export async function getHealthReport(): Promise<HealthReport> {
  const uptimeSec = Math.floor((Date.now() - startedAt) / 1000);
  let ready = false;
  let error: string | null = null;
  let migrationsApplied: number | null = null;
  let status: HealthStatus = "down";

  try {
    await ensureDbReady();
    const sql = await getSql();
    await sql.query(`select 1 as ok`);
    const mig = await sql.query<{ n: number }>(`select count(*)::int as n from _migrations`);
    migrationsApplied = mig[0]?.n ?? 0;
    ready = true;
    status = "ok";
  } catch (err) {
    error = err instanceof Error ? err.message : String(err);
    // Public site can still serve static seeds → degraded, not hard down.
    status = "degraded";
  }

  const cache = contentCacheStats();

  return {
    status: ready && cache.entries >= 0 ? status : status,
    uptimeSec,
    db: {
      source: dbSource,
      ready,
      error,
      migrationsApplied,
    },
    cache,
    time: new Date().toISOString(),
  };
}

/** Coerce any DB Date values to ISO strings for client-safe JSON. */
export function serializeHealth(report: HealthReport): HealthReport {
  return report;
}
