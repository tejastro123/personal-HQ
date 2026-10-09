import { t as __exportAll } from "./rolldown-runtime-D7D4PA-g.mjs";
import { a as dbSource, d as getSql, r as contentCacheStats, s as ensureDbReady } from "./content-cache-DMv4KU76.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/health-CYIXwZg8.js
/**
* Health / readiness checks for the HQ stack.
*
* Concepts:
* - **Liveness**: process is up (always true if this runs).
* - **Readiness**: DB reachable + migrations applied + cache layer usable.
* - **Graceful degradation**: public site works on static seeds when DB is down;
*   health reports degraded rather than crashing.
*/
var health_exports = /* @__PURE__ */ __exportAll({ getHealthReport: () => getHealthReport });
var startedAt = Date.now();
async function getHealthReport() {
	const uptimeSec = Math.floor((Date.now() - startedAt) / 1e3);
	let ready = false;
	let error = null;
	let migrationsApplied = null;
	let status = "down";
	try {
		await ensureDbReady();
		const sql = await getSql();
		await sql.query(`select 1 as ok`);
		migrationsApplied = (await sql.query(`select count(*)::int as n from _migrations`))[0]?.n ?? 0;
		ready = true;
		status = "ok";
	} catch (err) {
		error = err instanceof Error ? err.message : String(err);
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
			migrationsApplied
		},
		cache,
		time: (/* @__PURE__ */ new Date()).toISOString()
	};
}
//#endregion
export { health_exports as n, getHealthReport as t };
