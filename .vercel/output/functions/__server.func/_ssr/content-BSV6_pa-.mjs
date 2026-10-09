import { c as projects, d as resumeLenses, s as posts } from "./resume-lenses-DTkYOlQB.mjs";
import { c as getContentVersion, d as getSql, f as invalidateContentCache, m as site, o as emitContentEvent, t as cachedRead } from "./content-cache-DMv4KU76.mjs";
import { Bt as string, It as number, Lt as object, Mt as boolean, Vt as tuple, jt as array, kt as _enum, zt as record } from "../_libs/@better-auth/core+[...].mjs";
import { n as number$1 } from "../_libs/zod.mjs";
import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { t as adminMiddleware } from "./admin-middleware-DdzUoy8A.mjs";
import { n as aboutStatement, t as aboutBody } from "./content-CThzlbdn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/content-BSV6_pa-.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
var g = globalThis;
function store() {
	g.__rateLimitBuckets__ ??= /* @__PURE__ */ new Map();
	return g.__rateLimitBuckets__;
}
function checkRateLimit(bucket, key, limit, windowMs, now = Date.now()) {
	const map = store();
	const id = `${bucket}:${key}`;
	const bucketRow = map.get(id) ?? { hits: [] };
	const cutoff = now - windowMs;
	bucketRow.hits = bucketRow.hits.filter((t) => t > cutoff);
	if (bucketRow.hits.length >= limit) {
		const oldest = bucketRow.hits[0] ?? now;
		const retryAfterSec = Math.max(1, Math.ceil((oldest + windowMs - now) / 1e3));
		map.set(id, bucketRow);
		return {
			ok: false,
			remaining: 0,
			retryAfterSec
		};
	}
	bucketRow.hits.push(now);
	map.set(id, bucketRow);
	return {
		ok: true,
		remaining: limit - bucketRow.hits.length,
		retryAfterSec: 0
	};
}
/** Contact form: 5 / 10 min / IP-ish key. */
var CONTACT_RATE = {
	limit: 5,
	windowMs: 6e5
};
/**
* Overlay admin DB rows onto the static catalog.
*
* - Published rows replace a static item of the same id/slug, or append new ones.
* - Unpublished rows hide a static item of the same id/slug (and drop DB-only rows).
* - When the DB has no rows, the static catalog is returned unchanged.
*/
function mergeProjects(rows) {
	if (!rows.length) return projects;
	const map = new Map(projects.map((p) => [p.id, p]));
	for (const row of rows) {
		if (!row.is_published) {
			map.delete(row.id);
			continue;
		}
		map.set(row.id, {
			...row.data,
			id: row.id
		});
	}
	return [...map.values()];
}
function mergeBlogPosts(rows) {
	if (!rows.length) return posts;
	const map = new Map(posts.map((p) => [p.slug, p]));
	for (const row of rows) {
		if (!row.is_published) {
			map.delete(row.slug);
			continue;
		}
		map.set(row.slug, {
			...row.data,
			slug: row.slug
		});
	}
	return [...map.values()];
}
var defaultSiteSettings = () => ({
	name: site.name,
	title: site.title,
	description: site.description,
	tagline: site.tagline,
	bio: site.bio,
	shortBio: site.shortBio,
	footer: site.footer,
	email: site.email,
	formspreeId: site.formspreeId,
	social: { ...site.social },
	home: {
		heroEyebrow: site.eyebrow,
		heroHeadline: "Building ambitious ideas into real systems.",
		heroCtaPrimaryLabel: "Explore My Work",
		heroCtaPrimaryHref: "#work",
		heroCtaSecondaryLabel: "Let's Connect",
		heroCtaSecondaryHref: "#contact",
		availability: site.availability,
		availabilityDomains: site.availabilityDomains,
		aboutStatement,
		aboutBody: aboutBody.join("\n\n"),
		ctaEyebrow: "Next",
		ctaTitle: "Have an ambitious idea?",
		ctaBody: "Let's turn it into something real.",
		ctaPrimaryLabel: "Let's work together",
		ctaPrimaryHref: "#contact",
		ctaSecondaryLabel: "View My Work",
		ctaSecondaryHref: "#work",
		skillsTitle: "A working stack, not a scoreboard.",
		skillsSubtitle: "No fake proficiency bars. These are the languages and ideas in active use.",
		contactTitle: "Start a conversation.",
		contactSubtitle: "This form sends straight to my inbox. Prefer email? The address below always works.",
		navCtaLabel: "Let's Work Together",
		navCtaHref: "#contact",
		projectsTitle: "A collection of experiments, systems, research projects and products.",
		projectsSubtitle: "Real GitHub projects and this site's physics playground. Filter without leaving the page."
	}
});
var projectSchema = object({
	id: string().min(1),
	title: string().min(1),
	category: string().min(1),
	description: string().default(""),
	longDescription: string().default(""),
	problem: string().default(""),
	approach: string().default(""),
	architecture: string().default(""),
	results: string().default(""),
	lessons: string().default(""),
	technologies: array(string()).default([]),
	year: number$1().int(),
	status: string().default("Active"),
	github: string().optional().default(""),
	demo: string().optional().default(""),
	country: string().default("Remote"),
	countryId: string().default("remote"),
	countryLngLat: tuple([number(), number()]).optional(),
	visual: string().default("grid"),
	featured: boolean().default(false),
	related: array(string()).default([]),
	metrics: record(string(), number()).default({}),
	is_published: boolean().default(true)
});
var blogSchema = object({
	slug: string().min(1),
	title: string().min(1),
	date: string().min(1),
	excerpt: string().default(""),
	tags: array(string()).default([]),
	body: array(string()).default([]),
	figures: array(object({
		id: string(),
		kind: _enum([
			"line",
			"pipeline",
			"bars"
		]),
		title: string(),
		caption: string(),
		series: array(object({
			label: string(),
			points: array(tuple([number(), number()]))
		})).optional(),
		stages: array(string()).optional(),
		bars: array(object({
			label: string(),
			value: number()
		})).optional()
	})).optional(),
	is_published: boolean().default(true)
});
var siteSettingsSchema = object({
	name: string().min(1),
	title: string().default(""),
	description: string().default(""),
	tagline: string().default(""),
	bio: string().default(""),
	shortBio: string().default(""),
	footer: string().default(""),
	email: string().default(""),
	formspreeId: string().default(""),
	social: object({
		github: string().default(""),
		linkedin: string().default(""),
		instagram: string().default(""),
		youtube: string().default(""),
		x: string().default("")
	}),
	home: object({
		heroEyebrow: string().default(""),
		heroHeadline: string().default(""),
		heroCtaPrimaryLabel: string().default(""),
		heroCtaPrimaryHref: string().default(""),
		heroCtaSecondaryLabel: string().default(""),
		heroCtaSecondaryHref: string().default(""),
		availability: string().default(""),
		availabilityDomains: string().default(""),
		aboutStatement: string().default(""),
		aboutBody: string().default(""),
		ctaEyebrow: string().default(""),
		ctaTitle: string().default(""),
		ctaBody: string().default(""),
		ctaPrimaryLabel: string().default(""),
		ctaPrimaryHref: string().default(""),
		ctaSecondaryLabel: string().default(""),
		ctaSecondaryHref: string().default(""),
		skillsTitle: string().default(""),
		skillsSubtitle: string().default(""),
		contactTitle: string().default(""),
		contactSubtitle: string().default(""),
		navCtaLabel: string().default(""),
		navCtaHref: string().default(""),
		projectsTitle: string().default(""),
		projectsSubtitle: string().default("")
	}).default({
		heroEyebrow: "",
		heroHeadline: "",
		heroCtaPrimaryLabel: "",
		heroCtaPrimaryHref: "",
		heroCtaSecondaryLabel: "",
		heroCtaSecondaryHref: "",
		availability: "",
		availabilityDomains: "",
		aboutStatement: "",
		aboutBody: "",
		ctaEyebrow: "",
		ctaTitle: "",
		ctaBody: "",
		ctaPrimaryLabel: "",
		ctaPrimaryHref: "",
		ctaSecondaryLabel: "",
		ctaSecondaryHref: "",
		skillsTitle: "",
		skillsSubtitle: "",
		contactTitle: "",
		contactSubtitle: "",
		navCtaLabel: "",
		navCtaHref: "",
		projectsTitle: "",
		projectsSubtitle: ""
	})
});
var contactSchema = object({
	name: string().min(2).max(120),
	email: string().email().max(200),
	subject: string().max(200).optional().default(""),
	message: string().min(12).max(4e3),
	idempotencyKey: string().max(120).optional()
});
var lensSchema = object({
	id: string().min(1),
	label: string().min(1),
	blurb: string().default(""),
	focus: string().default(""),
	projectIds: array(string()).default([]),
	skillsEmphasis: array(string()).default([]),
	headline: string().default("")
});
async function audit(sql, ctx, action, entity, entityId, detail) {
	await sql.query(`insert into admin_audit_log (admin_user_id, admin_email, action, entity, entity_id, detail)
     values ($1, $2, $3, $4, $5, $6)`, [
		ctx.userId,
		ctx.email,
		action,
		entity,
		entityId,
		detail ? JSON.stringify(detail) : null
	]);
}
async function loadSiteSettings(sql) {
	const rows = await sql.query(`select value from site_settings where key = 'site'`);
	if (!rows[0]?.value) return defaultSiteSettings();
	const base = defaultSiteSettings();
	const value = rows[0].value;
	return {
		...base,
		...value,
		social: {
			...base.social,
			...value.social
		},
		home: {
			...base.home,
			...value.home
		}
	};
}
/** Bump version path: invalidate caches + emit outbox event. */
async function afterMutation(sql, event, scope = "public") {
	invalidateContentCache(scope);
	await emitContentEvent(sql, event);
}
function asIso(value) {
	if (value == null) return "";
	if (value instanceof Date) return value.toISOString();
	return String(value);
}
var getPublicContent_createServerFn_handler = createServerRpc({
	id: "df2ac8c14520276e433ed71cff7abbd4caeb79b783be40a399e55e2c14970fa4",
	name: "getPublicContent",
	filename: "src/lib/content.ts"
}, (opts) => getPublicContent.__executeServer(opts));
var getPublicContent = createServerFn({ method: "GET" }).handler(getPublicContent_createServerFn_handler, async () => {
	const sql = await getSql();
	const meta = await getContentVersion(sql);
	return {
		...await cachedRead("public:content", meta.version, async () => {
			const projectRows = await sql.query(`select id, data, is_published from admin_projects`);
			const blogRows = await sql.query(`select slug, data, is_published from admin_blog_posts`);
			const site = await loadSiteSettings(sql);
			const lensRows = await sql.query(`select lens_id, data from admin_resume_lenses`);
			const lenses = resumeLenses.map((l) => {
				const row = lensRows.find((r) => r.lens_id === l.id);
				return row?.data ? {
					...l,
					...row.data,
					id: l.id
				} : l;
			});
			return {
				projects: mergeProjects(projectRows),
				posts: mergeBlogPosts(blogRows),
				site,
				lenses
			};
		}),
		version: meta.version
	};
});
var listPublicProjects_createServerFn_handler = createServerRpc({
	id: "ec4f845f2f9856bd74947e920bcbe0c89e18ee768994adf24d41853291112697",
	name: "listPublicProjects",
	filename: "src/lib/content.ts"
}, (opts) => listPublicProjects.__executeServer(opts));
var listPublicProjects = createServerFn({ method: "GET" }).handler(listPublicProjects_createServerFn_handler, async () => {
	const sql = await getSql();
	const meta = await getContentVersion(sql);
	return cachedRead("public:projects", meta.version, async () => {
		return mergeProjects(await sql.query(`select id, data, is_published from admin_projects`));
	});
});
var listPublicPosts_createServerFn_handler = createServerRpc({
	id: "e170c38dcd5ee82280d2832a66afa94eacf5b2d60a86c4651ab5693ec4cfb0b4",
	name: "listPublicPosts",
	filename: "src/lib/content.ts"
}, (opts) => listPublicPosts.__executeServer(opts));
var listPublicPosts = createServerFn({ method: "GET" }).handler(listPublicPosts_createServerFn_handler, async () => {
	const sql = await getSql();
	const meta = await getContentVersion(sql);
	return cachedRead("public:posts", meta.version, async () => {
		return mergeBlogPosts(await sql.query(`select slug, data, is_published from admin_blog_posts`));
	});
});
var getPublicSiteSettings_createServerFn_handler = createServerRpc({
	id: "31de50ada3b8e44ff79d78c85a4c2ad19667d99d86db09b0f4037f7220c67182",
	name: "getPublicSiteSettings",
	filename: "src/lib/content.ts"
}, (opts) => getPublicSiteSettings.__executeServer(opts));
var getPublicSiteSettings = createServerFn({ method: "GET" }).handler(getPublicSiteSettings_createServerFn_handler, async () => {
	const sql = await getSql();
	const meta = await getContentVersion(sql);
	return cachedRead("public:site", meta.version, () => loadSiteSettings(sql));
});
var getPublicContentVersion_createServerFn_handler = createServerRpc({
	id: "570b3656cdf3d9d3488651f585a7b38587c9f8205f6d8a4faa4c3abbd2c309f4",
	name: "getPublicContentVersion",
	filename: "src/lib/content.ts"
}, (opts) => getPublicContentVersion.__executeServer(opts));
var getPublicContentVersion = createServerFn({ method: "GET" }).handler(getPublicContentVersion_createServerFn_handler, async () => {
	const sql = await getSql();
	return getContentVersion(sql);
});
var submitContactMessage_createServerFn_handler = createServerRpc({
	id: "70cdb851acc9a3d1d73659e8301438554d4e53ec290216f59a5e0ed333966f94",
	name: "submitContactMessage",
	filename: "src/lib/content.ts"
}, (opts) => submitContactMessage.__executeServer(opts));
var submitContactMessage = createServerFn({ method: "POST" }).validator((input) => contactSchema.parse(input)).handler(submitContactMessage_createServerFn_handler, async ({ data }) => {
	const rl = checkRateLimit("contact", data.email.toLowerCase(), CONTACT_RATE.limit, CONTACT_RATE.windowMs);
	if (!rl.ok) throw new Error(`Rate limit exceeded — try again in ${rl.retryAfterSec}s.`);
	const sql = await getSql();
	const idempotencyKey = data.idempotencyKey?.trim() || `auto:${data.email}:${data.message.slice(0, 80)}`;
	if ((await sql.query(`select email from contact_idempotency where key = $1`, [idempotencyKey]))[0]) return {
		ok: true,
		duplicate: true
	};
	await sql.query(`insert into contact_messages (name, email, subject, message)
       values ($1, $2, $3, $4)`, [
		data.name,
		data.email,
		data.subject || null,
		data.message
	]);
	await sql.query(`insert into contact_idempotency (key, email, message) values ($1, $2, $3)
       on conflict (key) do nothing`, [
		idempotencyKey,
		data.email,
		data.message
	]);
	invalidateContentCache("public");
	await emitContentEvent(sql, {
		kind: "contact.create",
		entity: "contact_message",
		entityId: data.email,
		detail: { subject: data.subject ?? "" },
		actorEmail: null
	});
	return {
		ok: true,
		duplicate: false
	};
});
var adminCheckAccess_createServerFn_handler = createServerRpc({
	id: "27d034f3e52add01f74eeae93382a62eeaf4aa02f723ebbaa65ee37e7d3eca46",
	name: "adminCheckAccess",
	filename: "src/lib/content.ts"
}, (opts) => adminCheckAccess.__executeServer(opts));
var adminCheckAccess = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminCheckAccess_createServerFn_handler, async ({ context }) => {
	return {
		ok: true,
		email: context.email,
		userId: context.userId
	};
});
var adminListProjects_createServerFn_handler = createServerRpc({
	id: "82de4227d56a5f65424873e2995a3531de210387d22578f09866747ca3dbef9b",
	name: "adminListProjects",
	filename: "src/lib/content.ts"
}, (opts) => adminListProjects.__executeServer(opts));
var adminListProjects = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminListProjects_createServerFn_handler, async () => {
	const rows = await (await getSql()).query(`select id, data, is_published, created_at, updated_at from admin_projects order by id`);
	const merged = mergeProjects(rows.map((r) => ({
		id: r.id,
		data: r.data,
		is_published: r.is_published
	})));
	const dbById = new Map(rows.map((r) => [r.id, r]));
	return merged.map((p) => {
		const db = dbById.get(p.id);
		return {
			id: p.id,
			title: p.title,
			category: p.category,
			status: p.status,
			featured: Boolean(p.featured),
			is_published: db ? db.is_published : true,
			year: p.year,
			updatedAt: db ? asIso(db.updated_at) : "",
			is_override: Boolean(db),
			data: p
		};
	});
});
var adminListPosts_createServerFn_handler = createServerRpc({
	id: "53bd0ff6b42e8d90d96d32409e9765fc92392614e68c63da48910c8b5fc98c3e",
	name: "adminListPosts",
	filename: "src/lib/content.ts"
}, (opts) => adminListPosts.__executeServer(opts));
var adminListPosts = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminListPosts_createServerFn_handler, async () => {
	const rows = await (await getSql()).query(`select slug, data, is_published, created_at, updated_at from admin_blog_posts order by slug`);
	const merged = mergeBlogPosts(rows.map((r) => ({
		slug: r.slug,
		data: r.data,
		is_published: r.is_published
	})));
	const dbBySlug = new Map(rows.map((r) => [r.slug, r]));
	return merged.map((p) => {
		const db = dbBySlug.get(p.slug);
		return {
			slug: p.slug,
			title: p.title,
			date: p.date,
			tags: p.tags,
			is_published: db ? db.is_published : true,
			updatedAt: db ? asIso(db.updated_at) : "",
			is_override: Boolean(db),
			data: p
		};
	});
});
var adminGetSiteSettings_createServerFn_handler = createServerRpc({
	id: "8cece2d2a5b546ca3b0c011a04e3e0601179de600dae7d99219a6c1a7c812e64",
	name: "adminGetSiteSettings",
	filename: "src/lib/content.ts"
}, (opts) => adminGetSiteSettings.__executeServer(opts));
var adminGetSiteSettings = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminGetSiteSettings_createServerFn_handler, async () => {
	return loadSiteSettings(await getSql());
});
var adminListMessages_createServerFn_handler = createServerRpc({
	id: "881ada45d3dc1a33678e08acb9d453f3177da790ffd804501e06423811048a53",
	name: "adminListMessages",
	filename: "src/lib/content.ts"
}, (opts) => adminListMessages.__executeServer(opts));
var adminListMessages = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminListMessages_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select id, name, email, subject, message, is_read, created_at
       from contact_messages order by created_at desc limit 200`)).map((r) => ({
		id: Number(r.id),
		name: String(r.name ?? ""),
		email: String(r.email ?? ""),
		subject: r.subject == null ? null : String(r.subject),
		message: String(r.message ?? ""),
		is_read: Boolean(r.is_read),
		created_at: asIso(r.created_at)
	}));
});
var adminListAudit_createServerFn_handler = createServerRpc({
	id: "5ac852dc47a98edfc955b5feaa5a58af9542c7d178329cdb02a25405d0ceb515",
	name: "adminListAudit",
	filename: "src/lib/content.ts"
}, (opts) => adminListAudit.__executeServer(opts));
var adminListAudit = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminListAudit_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select id, admin_user_id, admin_email, action, entity, entity_id, detail, created_at
       from admin_audit_log order by created_at desc limit 50`)).map((r) => ({
		id: Number(r.id),
		admin_user_id: String(r.admin_user_id ?? ""),
		admin_email: String(r.admin_email ?? ""),
		action: String(r.action ?? ""),
		entity: String(r.entity ?? ""),
		entity_id: r.entity_id == null ? null : String(r.entity_id),
		detail: r.detail == null ? null : typeof r.detail === "string" ? r.detail : JSON.stringify(r.detail),
		created_at: asIso(r.created_at)
	}));
});
var adminListEvents_createServerFn_handler = createServerRpc({
	id: "882a861ff311dbeab57f51bebb332f067b62bd96b828a75cbfdc730c0eac32d8",
	name: "adminListEvents",
	filename: "src/lib/content.ts"
}, (opts) => adminListEvents.__executeServer(opts));
var adminListEvents = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminListEvents_createServerFn_handler, async () => {
	return (await (await getSql()).query(`select id, kind, entity, entity_id, detail, actor_email, created_at
       from content_events order by created_at desc limit 50`)).map((r) => {
		let detail = null;
		if (r.detail != null) try {
			const parsed = typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
			detail = parsed && typeof parsed === "object" ? Object.fromEntries(Object.entries(parsed).map(([k, v]) => [k, v == null ? "" : String(v)])) : null;
		} catch {
			detail = null;
		}
		return {
			id: Number(r.id),
			kind: String(r.kind ?? ""),
			entity: String(r.entity ?? ""),
			entity_id: r.entity_id == null ? null : String(r.entity_id),
			detail,
			actor_email: r.actor_email == null ? null : String(r.actor_email),
			created_at: asIso(r.created_at)
		};
	});
});
var adminSystemStatus_createServerFn_handler = createServerRpc({
	id: "fd053b019ffc191986a4a4c59aa18884d38150f5a5906adab845b38547c8e084",
	name: "adminSystemStatus",
	filename: "src/lib/content.ts"
}, (opts) => adminSystemStatus.__executeServer(opts));
var adminSystemStatus = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminSystemStatus_createServerFn_handler, async () => {
	const { getHealthReport } = await import("./health-CYIXwZg8.mjs").then((n) => n.n);
	const { contentCacheStats } = await import("./content-cache-DMv4KU76.mjs").then((n) => n.i).then((n) => n.r);
	const { dbSource } = await import("./content-cache-DMv4KU76.mjs").then((n) => n.i).then((n) => n.c);
	const sql = await getSql();
	const version = await getContentVersion(sql);
	const health = await getHealthReport();
	return {
		dbSource,
		contentVersion: version,
		cache: contentCacheStats(),
		health,
		recentEvents: await (async () => {
			return (await sql.query(`select id, kind, entity, entity_id, created_at
           from content_events order by created_at desc limit 8`)).map((r) => ({
				id: Number(r.id),
				kind: String(r.kind ?? ""),
				entity: String(r.entity ?? ""),
				entity_id: r.entity_id == null ? null : String(r.entity_id),
				created_at: asIso(r.created_at)
			}));
		})()
	};
});
var adminDashboardStats_createServerFn_handler = createServerRpc({
	id: "8e11cbc6cd24cf484c4488bcbde988213cd1761e32b08f2ca547820e217291ab",
	name: "adminDashboardStats",
	filename: "src/lib/content.ts"
}, (opts) => adminDashboardStats.__executeServer(opts));
var adminDashboardStats = createServerFn({ method: "GET" }).middleware([adminMiddleware]).handler(adminDashboardStats_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	const [projects$1, posts$1, messages, unread, audit, events, unpublishedProjects, unpublishedPosts] = await Promise.all([
		sql.query(`select count(*)::int as count from admin_projects`),
		sql.query(`select count(*)::int as count from admin_blog_posts`),
		sql.query(`select count(*)::int as count from contact_messages`),
		sql.query(`select count(*)::int as count from contact_messages where is_read = false`),
		sql.query(`select count(*)::int as count from admin_audit_log`),
		sql.query(`select count(*)::int as count from content_events`),
		sql.query(`select count(*)::int as count from admin_projects where is_published = false`),
		sql.query(`select count(*)::int as count from admin_blog_posts where is_published = false`)
	]);
	const version = await getContentVersion(sql);
	return {
		projects: projects$1[0]?.count ?? 0,
		posts: posts$1[0]?.count ?? 0,
		messages: messages[0]?.count ?? 0,
		unread: unread[0]?.count ?? 0,
		audit: audit[0]?.count ?? 0,
		events: events[0]?.count ?? 0,
		unpublishedProjects: unpublishedProjects[0]?.count ?? 0,
		unpublishedPosts: unpublishedPosts[0]?.count ?? 0,
		contentVersion: version.version,
		adminEmail: context.email,
		staticProjectCount: projects.length,
		staticPostCount: posts.length
	};
});
var adminUpsertProject_createServerFn_handler = createServerRpc({
	id: "b1bdaaa597a99b3806ab648127bd06c3fb79d9942590f6e4b7448f18c6ced086",
	name: "adminUpsertProject",
	filename: "src/lib/content.ts"
}, (opts) => adminUpsertProject.__executeServer(opts));
var adminUpsertProject = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => projectSchema.parse(input)).handler(adminUpsertProject_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	const { is_published: isPublished, id, ...rest } = data;
	const payload = {
		...rest,
		id,
		category: rest.category,
		status: rest.status,
		github: rest.github || void 0,
		demo: rest.demo || void 0,
		metrics: rest.metrics
	};
	await sql.query(`insert into admin_projects (id, data, is_published, updated_at)
       values ($1, $2, $3, now())
       on conflict (id) do update
         set data = excluded.data,
             is_published = excluded.is_published,
             updated_at = now()`, [
		id,
		JSON.stringify(payload),
		isPublished
	]);
	await audit(sql, context, "upsert", "project", id, { title: payload.title });
	await afterMutation(sql, {
		kind: "project.upsert",
		entity: "project",
		entityId: id,
		detail: {
			title: payload.title,
			is_published: isPublished
		},
		actorEmail: context.email
	});
	return {
		ok: true,
		id
	};
});
var adminDeleteProject_createServerFn_handler = createServerRpc({
	id: "6bd021dedd7c4a64afea056d6b8bbf886cde4ab9c103d910c1c69a53cbbf7170",
	name: "adminDeleteProject",
	filename: "src/lib/content.ts"
}, (opts) => adminDeleteProject.__executeServer(opts));
var adminDeleteProject = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: string().min(1) }).parse(input)).handler(adminDeleteProject_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`delete from admin_projects where id = $1`, [data.id]);
	await audit(sql, context, "delete", "project", data.id);
	await afterMutation(sql, {
		kind: "project.delete",
		entity: "project",
		entityId: data.id,
		actorEmail: context.email
	});
	return { ok: true };
});
var adminUpsertPost_createServerFn_handler = createServerRpc({
	id: "fdec85d65cab7969d5ab8e4995153000ece1ccd5fdefb5c4254f621d928af775",
	name: "adminUpsertPost",
	filename: "src/lib/content.ts"
}, (opts) => adminUpsertPost.__executeServer(opts));
var adminUpsertPost = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => blogSchema.parse(input)).handler(adminUpsertPost_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	const { is_published: isPublished, slug, ...rest } = data;
	const payload = {
		...rest,
		slug
	};
	await sql.query(`insert into admin_blog_posts (slug, data, is_published, updated_at)
       values ($1, $2, $3, now())
       on conflict (slug) do update
         set data = excluded.data,
             is_published = excluded.is_published,
             updated_at = now()`, [
		slug,
		JSON.stringify(payload),
		isPublished
	]);
	await audit(sql, context, "upsert", "blog", slug, { title: payload.title });
	await afterMutation(sql, {
		kind: "blog.upsert",
		entity: "blog",
		entityId: slug,
		detail: {
			title: payload.title,
			is_published: isPublished
		},
		actorEmail: context.email
	});
	return {
		ok: true,
		slug
	};
});
var adminDeletePost_createServerFn_handler = createServerRpc({
	id: "9e5cd65c218e67da597dd734c8f0aa41fee9a217294d6d7d7be1111a2048e2aa",
	name: "adminDeletePost",
	filename: "src/lib/content.ts"
}, (opts) => adminDeletePost.__executeServer(opts));
var adminDeletePost = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ slug: string().min(1) }).parse(input)).handler(adminDeletePost_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`delete from admin_blog_posts where slug = $1`, [data.slug]);
	await audit(sql, context, "delete", "blog", data.slug);
	await afterMutation(sql, {
		kind: "blog.delete",
		entity: "blog",
		entityId: data.slug,
		actorEmail: context.email
	});
	return { ok: true };
});
var adminSaveSiteSettings_createServerFn_handler = createServerRpc({
	id: "408adc3659e506124f6654aba4914d070bae4b6b60f339ab9cc605b1b07ef615",
	name: "adminSaveSiteSettings",
	filename: "src/lib/content.ts"
}, (opts) => adminSaveSiteSettings.__executeServer(opts));
var adminSaveSiteSettings = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => siteSettingsSchema.parse(input)).handler(adminSaveSiteSettings_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`insert into site_settings (key, value, updated_at)
       values ('site', $1, now())
       on conflict (key) do update
         set value = excluded.value,
             updated_at = now()`, [JSON.stringify(data)]);
	await audit(sql, context, "save", "site_settings", "site", { name: data.name });
	await afterMutation(sql, {
		kind: "site.save",
		entity: "site_settings",
		entityId: "site",
		detail: { name: data.name },
		actorEmail: context.email
	});
	return { ok: true };
});
var adminMarkMessageRead_createServerFn_handler = createServerRpc({
	id: "bd26d7ac2eab0c7113759ea185d7bf6e9f913be615f0d869967edd68cac952c5",
	name: "adminMarkMessageRead",
	filename: "src/lib/content.ts"
}, (opts) => adminMarkMessageRead.__executeServer(opts));
var adminMarkMessageRead = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: number().int() }).parse(input)).handler(adminMarkMessageRead_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`update contact_messages set is_read = true where id = $1`, [data.id]);
	await audit(sql, context, "mark_read", "message", String(data.id));
	return { ok: true };
});
var adminDeleteMessage_createServerFn_handler = createServerRpc({
	id: "c957fb0fa0768ed10ba369cb6cf024b0db78c7e94d991ace2c413d4020cf302f",
	name: "adminDeleteMessage",
	filename: "src/lib/content.ts"
}, (opts) => adminDeleteMessage.__executeServer(opts));
var adminDeleteMessage = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: number().int() }).parse(input)).handler(adminDeleteMessage_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`delete from contact_messages where id = $1`, [data.id]);
	await audit(sql, context, "delete", "message", String(data.id));
	return { ok: true };
});
var adminSaveLens_createServerFn_handler = createServerRpc({
	id: "d192f7948c538933f16a65dfcb212f52405b4374fdad86d4fb4d459503a8bbda",
	name: "adminSaveLens",
	filename: "src/lib/content.ts"
}, (opts) => adminSaveLens.__executeServer(opts));
var adminSaveLens = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => lensSchema.parse(input)).handler(adminSaveLens_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	const { id, ...rest } = data;
	await sql.query(`insert into admin_resume_lenses (lens_id, data, updated_at)
       values ($1, $2, now())
       on conflict (lens_id) do update
         set data = excluded.data,
             updated_at = now()`, [id, JSON.stringify({
		...rest,
		id
	})]);
	await audit(sql, context, "save", "resume_lens", id);
	await afterMutation(sql, {
		kind: "lens.save",
		entity: "resume_lens",
		entityId: id,
		actorEmail: context.email
	});
	return {
		ok: true,
		id
	};
});
var adminResetLens_createServerFn_handler = createServerRpc({
	id: "92d97f230b510ef312bae1124564e2aca40773358905aac56bb015b8a2538fd5",
	name: "adminResetLens",
	filename: "src/lib/content.ts"
}, (opts) => adminResetLens.__executeServer(opts));
var adminResetLens = createServerFn({ method: "POST" }).middleware([adminMiddleware]).validator((input) => object({ id: string().min(1) }).parse(input)).handler(adminResetLens_createServerFn_handler, async ({ data, context }) => {
	const sql = await getSql();
	await sql.query(`delete from admin_resume_lenses where lens_id = $1`, [data.id]);
	await audit(sql, context, "reset", "resume_lens", data.id);
	await afterMutation(sql, {
		kind: "lens.reset",
		entity: "resume_lens",
		entityId: data.id,
		actorEmail: context.email
	});
	return { ok: true };
});
//#endregion
export { adminCheckAccess_createServerFn_handler, adminDashboardStats_createServerFn_handler, adminDeleteMessage_createServerFn_handler, adminDeletePost_createServerFn_handler, adminDeleteProject_createServerFn_handler, adminGetSiteSettings_createServerFn_handler, adminListAudit_createServerFn_handler, adminListEvents_createServerFn_handler, adminListMessages_createServerFn_handler, adminListPosts_createServerFn_handler, adminListProjects_createServerFn_handler, adminMarkMessageRead_createServerFn_handler, adminResetLens_createServerFn_handler, adminSaveLens_createServerFn_handler, adminSaveSiteSettings_createServerFn_handler, adminSystemStatus_createServerFn_handler, adminUpsertPost_createServerFn_handler, adminUpsertProject_createServerFn_handler, getPublicContentVersion_createServerFn_handler, getPublicContent_createServerFn_handler, getPublicSiteSettings_createServerFn_handler, listPublicPosts_createServerFn_handler, listPublicProjects_createServerFn_handler, submitContactMessage_createServerFn_handler };
