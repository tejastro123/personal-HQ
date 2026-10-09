import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { adminMiddleware } from "@/lib/auth/admin-middleware";
import { getSql } from "@/lib/db";
import {
  cachedRead,
  emitContentEvent,
  getContentVersion,
  invalidateContentCache,
} from "@/lib/content-cache";
import {
  CONTACT_RATE,
  checkRateLimit,
} from "@/lib/rate-limit";
import {
  mergeBlogPosts,
  mergeProjects,
  type BlogPostRow,
  type ProjectRow,
} from "@/lib/content-merge";
import { posts as staticPosts, type BlogPost } from "@/data/blog";
import { projects as staticProjects, type Project } from "@/data/projects";
import { site as staticSite } from "@/data/site";
import { resumeLenses as staticLenses, type ResumeLens } from "@/data/resume-lenses";
import { aboutBody as staticAboutBody, aboutStatement as staticAboutStatement } from "@/data/content";

// ── Types ────────────────────────────────────────────────────────────────────

export type SiteSettings = {
  name: string;
  title: string;
  description: string;
  tagline: string;
  bio: string;
  shortBio: string;
  footer: string;
  email: string;
  formspreeId: string;
  social: {
    github: string;
    linkedin: string;
    instagram: string;
    youtube: string;
    x: string;
  };
  home: {
    heroEyebrow: string;
    heroHeadline: string;
    heroCtaPrimaryLabel: string;
    heroCtaPrimaryHref: string;
    heroCtaSecondaryLabel: string;
    heroCtaSecondaryHref: string;
    availability: string;
    availabilityDomains: string;
    aboutStatement: string;
    aboutBody: string;
    ctaEyebrow: string;
    ctaTitle: string;
    ctaBody: string;
    ctaPrimaryLabel: string;
    ctaPrimaryHref: string;
    ctaSecondaryLabel: string;
    ctaSecondaryHref: string;
    skillsTitle: string;
    skillsSubtitle: string;
    contactTitle: string;
    contactSubtitle: string;
    navCtaLabel: string;
    navCtaHref: string;
    projectsTitle: string;
    projectsSubtitle: string;
  };
};

export type ContactMessage = {
  id: number;
  name: string;
  email: string;
  subject: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
};

export type AdminAuditEntry = {
  id: number;
  admin_user_id: string;
  admin_email: string;
  action: string;
  entity: string;
  entity_id: string | null;
  detail: string | null;
  created_at: string;
};

export type PublicContentPayload = {
  projects: Project[];
  posts: BlogPost[];
  site: SiteSettings;
  lenses: ResumeLens[];
  /** Cache-busting content version — clients refetch when this changes. */
  version?: string;
};

const defaultSiteSettings = (): SiteSettings => ({
  name: staticSite.name,
  title: staticSite.title,
  description: staticSite.description,
  tagline: staticSite.tagline,
  bio: staticSite.bio,
  shortBio: staticSite.shortBio,
  footer: staticSite.footer,
  email: staticSite.email,
  formspreeId: staticSite.formspreeId,
  social: { ...staticSite.social },
  home: {
    heroEyebrow: staticSite.eyebrow,
    heroHeadline: "Building ambitious ideas into real systems.",
    heroCtaPrimaryLabel: "Explore My Work",
    heroCtaPrimaryHref: "#work",
    heroCtaSecondaryLabel: "Let's Connect",
    heroCtaSecondaryHref: "#contact",
    availability: staticSite.availability,
    availabilityDomains: staticSite.availabilityDomains,
    aboutStatement: staticAboutStatement,
    aboutBody: staticAboutBody.join("\n\n"),
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
    contactSubtitle:
      "This form sends straight to my inbox. Prefer email? The address below always works.",
    navCtaLabel: "Let's Work Together",
    navCtaHref: "#contact",
    projectsTitle: "A collection of experiments, systems, research projects and products.",
    projectsSubtitle:
      "Real GitHub projects and this site's physics playground. Filter without leaving the page.",
  },
});

const projectSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.string().min(1),
  description: z.string().default(""),
  longDescription: z.string().default(""),
  problem: z.string().default(""),
  approach: z.string().default(""),
  architecture: z.string().default(""),
  results: z.string().default(""),
  lessons: z.string().default(""),
  technologies: z.array(z.string()).default([]),
  year: z.coerce.number().int(),
  status: z.string().default("Active"),
  github: z.string().optional().default(""),
  demo: z.string().optional().default(""),
  country: z.string().default("Remote"),
  countryId: z.string().default("remote"),
  countryLngLat: z.tuple([z.number(), z.number()]).optional(),
  visual: z.string().default("grid"),
  featured: z.boolean().default(false),
  related: z.array(z.string()).default([]),
  metrics: z.record(z.string(), z.number()).default({}),
  is_published: z.boolean().default(true),
});

const blogSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  date: z.string().min(1),
  excerpt: z.string().default(""),
  tags: z.array(z.string()).default([]),
  body: z.array(z.string()).default([]),
  figures: z
    .array(
      z.object({
        id: z.string(),
        kind: z.enum(["line", "pipeline", "bars"]),
        title: z.string(),
        caption: z.string(),
        series: z
          .array(
            z.object({
              label: z.string(),
              points: z.array(z.tuple([z.number(), z.number()])),
            }),
          )
          .optional(),
        stages: z.array(z.string()).optional(),
        bars: z.array(z.object({ label: z.string(), value: z.number() })).optional(),
      }),
    )
    .optional(),
  is_published: z.boolean().default(true),
});

const siteSettingsSchema = z.object({
  name: z.string().min(1),
  title: z.string().default(""),
  description: z.string().default(""),
  tagline: z.string().default(""),
  bio: z.string().default(""),
  shortBio: z.string().default(""),
  footer: z.string().default(""),
  email: z.string().default(""),
  formspreeId: z.string().default(""),
  social: z.object({
    github: z.string().default(""),
    linkedin: z.string().default(""),
    instagram: z.string().default(""),
    youtube: z.string().default(""),
    x: z.string().default(""),
  }),
  home: z
    .object({
      heroEyebrow: z.string().default(""),
      heroHeadline: z.string().default(""),
      heroCtaPrimaryLabel: z.string().default(""),
      heroCtaPrimaryHref: z.string().default(""),
      heroCtaSecondaryLabel: z.string().default(""),
      heroCtaSecondaryHref: z.string().default(""),
      availability: z.string().default(""),
      availabilityDomains: z.string().default(""),
      aboutStatement: z.string().default(""),
      aboutBody: z.string().default(""),
      ctaEyebrow: z.string().default(""),
      ctaTitle: z.string().default(""),
      ctaBody: z.string().default(""),
      ctaPrimaryLabel: z.string().default(""),
      ctaPrimaryHref: z.string().default(""),
      ctaSecondaryLabel: z.string().default(""),
      ctaSecondaryHref: z.string().default(""),
      skillsTitle: z.string().default(""),
      skillsSubtitle: z.string().default(""),
      contactTitle: z.string().default(""),
      contactSubtitle: z.string().default(""),
      navCtaLabel: z.string().default(""),
      navCtaHref: z.string().default(""),
      projectsTitle: z.string().default(""),
      projectsSubtitle: z.string().default(""),
    })
    .default({
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
      projectsSubtitle: "",
    }),
});

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(200),
  subject: z.string().max(200).optional().default(""),
  message: z.string().min(12).max(4000),
  idempotencyKey: z.string().max(120).optional(),
});

const lensSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  blurb: z.string().default(""),
  focus: z.string().default(""),
  projectIds: z.array(z.string()).default([]),
  skillsEmphasis: z.array(z.string()).default([]),
  headline: z.string().default(""),
});

// ── Helpers ──────────────────────────────────────────────────────────────────

async function audit(
  sql: Awaited<ReturnType<typeof getSql>>,
  ctx: { userId: string; email: string },
  action: string,
  entity: string,
  entityId: string | null,
  detail?: Record<string, unknown>,
) {
  await sql.query(
    `insert into admin_audit_log (admin_user_id, admin_email, action, entity, entity_id, detail)
     values ($1, $2, $3, $4, $5, $6)`,
    [
      ctx.userId,
      ctx.email,
      action,
      entity,
      entityId,
      detail ? JSON.stringify(detail) : null,
    ],
  );
}

async function loadSiteSettings(sql: Awaited<ReturnType<typeof getSql>>): Promise<SiteSettings> {
  const rows = await sql.query<{ value: SiteSettings }>(
    `select value from site_settings where key = 'site'`,
  );
  if (!rows[0]?.value) return defaultSiteSettings();
  const base = defaultSiteSettings();
  const value = rows[0].value;
  return {
    ...base,
    ...value,
    social: { ...base.social, ...value.social },
    home: { ...base.home, ...value.home },
  };
}

/** Bump version path: invalidate caches + emit outbox event. */
async function afterMutation(
  sql: Awaited<ReturnType<typeof getSql>>,
  event: {
    kind: string;
    entity: string;
    entityId?: string | null;
    detail?: Record<string, unknown> | null;
    actorEmail?: string | null;
  },
  scope = "public",
) {
  invalidateContentCache(scope);
  await emitContentEvent(sql, event);
}

function asIso(value: unknown): string {
  if (value == null) return "";
  if (value instanceof Date) return value.toISOString();
  return String(value);
}

// ── Public reads (no auth) ───────────────────────────────────────────────────

export const getPublicContent = createServerFn({ method: "GET" }).handler(
  async (): Promise<PublicContentPayload> => {
    const sql = await getSql();
    const meta = await getContentVersion(sql);
    const payload = await cachedRead("public:content", meta.version, async () => {
      const projectRows = await sql.query<ProjectRow>(
        `select id, data, is_published from admin_projects`,
      );
      const blogRows = await sql.query<BlogPostRow>(
        `select slug, data, is_published from admin_blog_posts`,
      );
      const site = await loadSiteSettings(sql);
      const lensRows = await sql.query<{ lens_id: string; data: ResumeLens }>(
        `select lens_id, data from admin_resume_lenses`,
      );
      const lenses = staticLenses.map((l) => {
        const row = lensRows.find((r) => r.lens_id === l.id);
        return row?.data ? { ...l, ...row.data, id: l.id } : l;
      });
      return {
        projects: mergeProjects(projectRows),
        posts: mergeBlogPosts(blogRows),
        site,
        lenses,
      };
    });
    return { ...payload, version: meta.version };
  },
);

export const listPublicProjects = createServerFn({ method: "GET" }).handler(
  async (): Promise<Project[]> => {
    const sql = await getSql();
    const meta = await getContentVersion(sql);
    return cachedRead("public:projects", meta.version, async () => {
      const rows = await sql.query<ProjectRow>(
        `select id, data, is_published from admin_projects`,
      );
      return mergeProjects(rows);
    });
  },
);

export const listPublicPosts = createServerFn({ method: "GET" }).handler(
  async (): Promise<BlogPost[]> => {
    const sql = await getSql();
    const meta = await getContentVersion(sql);
    return cachedRead("public:posts", meta.version, async () => {
      const rows = await sql.query<BlogPostRow>(
        `select slug, data, is_published from admin_blog_posts`,
      );
      return mergeBlogPosts(rows);
    });
  },
);

export const getPublicSiteSettings = createServerFn({ method: "GET" }).handler(
  async (): Promise<SiteSettings> => {
    const sql = await getSql();
    const meta = await getContentVersion(sql);
    return cachedRead("public:site", meta.version, () => loadSiteSettings(sql));
  },
);

/** Cheap content version token for client SWR refresh. */
export const getPublicContentVersion = createServerFn({ method: "GET" }).handler(
  async () => {
    const sql = await getSql();
    return getContentVersion(sql);
  },
);

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    // Soft rate limit: derive a stable key from email+message hash-ish prefix.
    // Full IP-based limiting needs request headers — keep a conservative
    // per-process budget on email so spam bursts still trip.
    const rl = checkRateLimit(
      "contact",
      data.email.toLowerCase(),
      CONTACT_RATE.limit,
      CONTACT_RATE.windowMs,
    );
    if (!rl.ok) {
      throw new Error(
        `Rate limit exceeded — try again in ${rl.retryAfterSec}s.`,
      );
    }

    const sql = await getSql();
    const idempotencyKey =
      data.idempotencyKey?.trim() ||
      `auto:${data.email}:${data.message.slice(0, 80)}`;

    const existing = await sql.query<{ email: string }>(
      `select email from contact_idempotency where key = $1`,
      [idempotencyKey],
    );
    if (existing[0]) {
      return { ok: true as const, duplicate: true as const };
    }

    await sql.query(
      `insert into contact_messages (name, email, subject, message)
       values ($1, $2, $3, $4)`,
      [data.name, data.email, data.subject || null, data.message],
    );
    await sql.query(
      `insert into contact_idempotency (key, email, message) values ($1, $2, $3)
       on conflict (key) do nothing`,
      [idempotencyKey, data.email, data.message],
    );
    invalidateContentCache("public");
    await emitContentEvent(sql, {
      kind: "contact.create",
      entity: "contact_message",
      entityId: data.email,
      detail: { subject: data.subject ?? "" },
      actorEmail: null,
    });
    return { ok: true as const, duplicate: false as const };
  },
);

// ── Admin reads ──────────────────────────────────────────────────────────────

export const adminCheckAccess = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    return { ok: true as const, email: context.email, userId: context.userId };
  });

export const adminListProjects = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<{
      id: string;
      data: Project;
      is_published: boolean;
      created_at: unknown;
      updated_at: unknown;
    }>(`select id, data, is_published, created_at, updated_at from admin_projects order by id`);
    const merged = mergeProjects(
      rows.map((r) => ({ id: r.id, data: r.data, is_published: r.is_published })),
    );
    const dbById = new Map(rows.map((r) => [r.id, r]));
    return merged.map((p) => {
      const db = dbById.get(p.id);
      return {
        id: p.id,
        title: p.title,
        category: p.category as string,
        status: p.status as string,
        featured: Boolean(p.featured),
        is_published: db ? db.is_published : true,
        year: p.year,
        updatedAt: db ? asIso(db.updated_at) : "",
        is_override: Boolean(db),
        data: p,
      };
    });
  });

export const adminListPosts = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<{
      slug: string;
      data: BlogPost;
      is_published: boolean;
      created_at: unknown;
      updated_at: unknown;
    }>(`select slug, data, is_published, created_at, updated_at from admin_blog_posts order by slug`);
    const merged = mergeBlogPosts(
      rows.map((r) => ({ slug: r.slug, data: r.data, is_published: r.is_published })),
    );
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
        data: p,
      };
    });
  });

export const adminGetSiteSettings = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    return loadSiteSettings(sql);
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>(
      `select id, name, email, subject, message, is_read, created_at
       from contact_messages order by created_at desc limit 200`,
    );
    return rows.map((r) => ({
      id: Number(r.id),
      name: String(r.name ?? ""),
      email: String(r.email ?? ""),
      subject: r.subject == null ? null : String(r.subject),
      message: String(r.message ?? ""),
      is_read: Boolean(r.is_read),
      created_at: asIso(r.created_at),
    }));
  });

export const adminListAudit = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>(
      `select id, admin_user_id, admin_email, action, entity, entity_id, detail, created_at
       from admin_audit_log order by created_at desc limit 50`,
    );
    return rows.map((r) => ({
      id: Number(r.id),
      admin_user_id: String(r.admin_user_id ?? ""),
      admin_email: String(r.admin_email ?? ""),
      action: String(r.action ?? ""),
      entity: String(r.entity ?? ""),
      entity_id: r.entity_id == null ? null : String(r.entity_id),
      detail:
        r.detail == null
          ? null
          : typeof r.detail === "string"
            ? r.detail
            : JSON.stringify(r.detail),
      created_at: asIso(r.created_at),
    }));
  });

export const adminListEvents = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const sql = await getSql();
    const rows = await sql.query<Record<string, unknown>>(
      `select id, kind, entity, entity_id, detail, actor_email, created_at
       from content_events order by created_at desc limit 50`,
    );
    return rows.map((r) => {
      let detail: Record<string, string> | null = null;
      if (r.detail != null) {
        try {
          const parsed =
            typeof r.detail === "string" ? JSON.parse(r.detail) : r.detail;
          detail =
            parsed && typeof parsed === "object"
              ? (Object.fromEntries(
                  Object.entries(parsed as Record<string, unknown>).map(
                    ([k, v]) => [k, v == null ? "" : String(v)],
                  ),
                ) as Record<string, string>)
              : null;
        } catch {
          detail = null;
        }
      }
      return {
        id: Number(r.id),
        kind: String(r.kind ?? ""),
        entity: String(r.entity ?? ""),
        entity_id: r.entity_id == null ? null : String(r.entity_id),
        detail,
        actor_email: r.actor_email == null ? null : String(r.actor_email),
        created_at: asIso(r.created_at),
      };
    });
  });

export const adminSystemStatus = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async () => {
    const { getHealthReport } = await import("@/lib/health");
    const { contentCacheStats } = await import("@/lib/content-cache");
    const { dbSource } = await import("@/lib/db");
    const sql = await getSql();
    const version = await getContentVersion(sql);
    const health = await getHealthReport();
    return {
      dbSource,
      contentVersion: version,
      cache: contentCacheStats(),
      health,
      recentEvents: await (async () => {
        const rows = await sql.query<Record<string, unknown>>(
          `select id, kind, entity, entity_id, created_at
           from content_events order by created_at desc limit 8`,
        );
        return rows.map((r) => ({
          id: Number(r.id),
          kind: String(r.kind ?? ""),
          entity: String(r.entity ?? ""),
          entity_id: r.entity_id == null ? null : String(r.entity_id),
          created_at: asIso(r.created_at),
        }));
      })(),
    };
  });

export const adminDashboardStats = createServerFn({ method: "GET" })
  .middleware([adminMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const [
      projects,
      posts,
      messages,
      unread,
      audit,
      events,
      unpublishedProjects,
      unpublishedPosts,
    ] = await Promise.all([
      sql.query<{ count: number }>(`select count(*)::int as count from admin_projects`),
      sql.query<{ count: number }>(`select count(*)::int as count from admin_blog_posts`),
      sql.query<{ count: number }>(`select count(*)::int as count from contact_messages`),
      sql.query<{ count: number }>(`select count(*)::int as count from contact_messages where is_read = false`),
      sql.query<{ count: number }>(`select count(*)::int as count from admin_audit_log`),
      sql.query<{ count: number }>(`select count(*)::int as count from content_events`),
      sql.query<{ count: number }>(`select count(*)::int as count from admin_projects where is_published = false`),
      sql.query<{ count: number }>(`select count(*)::int as count from admin_blog_posts where is_published = false`),
    ]);
    const version = await getContentVersion(sql);
    return {
      projects: projects[0]?.count ?? 0,
      posts: posts[0]?.count ?? 0,
      messages: messages[0]?.count ?? 0,
      unread: unread[0]?.count ?? 0,
      audit: audit[0]?.count ?? 0,
      events: events[0]?.count ?? 0,
      unpublishedProjects: unpublishedProjects[0]?.count ?? 0,
      unpublishedPosts: unpublishedPosts[0]?.count ?? 0,
      contentVersion: version.version,
      adminEmail: context.email,
      staticProjectCount: staticProjects.length,
      staticPostCount: staticPosts.length,
    };
  });

// ── Admin mutations (adminMiddleware on every one) ───────────────────────────

export const adminUpsertProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => projectSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const { is_published: isPublished, id, ...rest } = data;
    const payload: Project = {
      ...rest,
      id,
      category: rest.category as Project["category"],
      status: rest.status as Project["status"],
      github: rest.github || undefined,
      demo: rest.demo || undefined,
      metrics: rest.metrics as Project["metrics"],
    };
    await sql.query(
      `insert into admin_projects (id, data, is_published, updated_at)
       values ($1, $2, $3, now())
       on conflict (id) do update
         set data = excluded.data,
             is_published = excluded.is_published,
             updated_at = now()`,
      [id, JSON.stringify(payload), isPublished],
    );
    await audit(sql, context, "upsert", "project", id, { title: payload.title });
    await afterMutation(sql, {
      kind: "project.upsert",
      entity: "project",
      entityId: id,
      detail: { title: payload.title, is_published: isPublished },
      actorEmail: context.email,
    });
    return { ok: true as const, id };
  });

export const adminDeleteProject = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(`delete from admin_projects where id = $1`, [data.id]);
    await audit(sql, context, "delete", "project", data.id);
    await afterMutation(sql, {
      kind: "project.delete",
      entity: "project",
      entityId: data.id,
      actorEmail: context.email,
    });
    return { ok: true as const };
  });

export const adminUpsertPost = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => blogSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const { is_published: isPublished, slug, ...rest } = data;
    const payload: BlogPost = { ...rest, slug };
    await sql.query(
      `insert into admin_blog_posts (slug, data, is_published, updated_at)
       values ($1, $2, $3, now())
       on conflict (slug) do update
         set data = excluded.data,
             is_published = excluded.is_published,
             updated_at = now()`,
      [slug, JSON.stringify(payload), isPublished],
    );
    await audit(sql, context, "upsert", "blog", slug, { title: payload.title });
    await afterMutation(sql, {
      kind: "blog.upsert",
      entity: "blog",
      entityId: slug,
      detail: { title: payload.title, is_published: isPublished },
      actorEmail: context.email,
    });
    return { ok: true as const, slug };
  });

export const adminDeletePost = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(`delete from admin_blog_posts where slug = $1`, [data.slug]);
    await audit(sql, context, "delete", "blog", data.slug);
    await afterMutation(sql, {
      kind: "blog.delete",
      entity: "blog",
      entityId: data.slug,
      actorEmail: context.email,
    });
    return { ok: true as const };
  });

export const adminSaveSiteSettings = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => siteSettingsSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(
      `insert into site_settings (key, value, updated_at)
       values ('site', $1, now())
       on conflict (key) do update
         set value = excluded.value,
             updated_at = now()`,
      [JSON.stringify(data)],
    );
    await audit(sql, context, "save", "site_settings", "site", { name: data.name });
    await afterMutation(sql, {
      kind: "site.save",
      entity: "site_settings",
      entityId: "site",
      detail: { name: data.name },
      actorEmail: context.email,
    });
    return { ok: true as const };
  });

export const adminMarkMessageRead = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => z.object({ id: z.number().int() }).parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(`update contact_messages set is_read = true where id = $1`, [data.id]);
    await audit(sql, context, "mark_read", "message", String(data.id));
    return { ok: true as const };
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => z.object({ id: z.number().int() }).parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(`delete from contact_messages where id = $1`, [data.id]);
    await audit(sql, context, "delete", "message", String(data.id));
    return { ok: true as const };
  });

export const adminSaveLens = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => lensSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    const { id, ...rest } = data;
    await sql.query(
      `insert into admin_resume_lenses (lens_id, data, updated_at)
       values ($1, $2, now())
       on conflict (lens_id) do update
         set data = excluded.data,
             updated_at = now()`,
      [id, JSON.stringify({ ...rest, id })],
    );
    await audit(sql, context, "save", "resume_lens", id);
    await afterMutation(sql, {
      kind: "lens.save",
      entity: "resume_lens",
      entityId: id,
      actorEmail: context.email,
    });
    return { ok: true as const, id };
  });

export const adminResetLens = createServerFn({ method: "POST" })
  .middleware([adminMiddleware])
  .validator((input: unknown) => z.object({ id: z.string().min(1) }).parse(input))
  .handler(async ({ data, context }) => {
    const sql = await getSql();
    await sql.query(`delete from admin_resume_lenses where lens_id = $1`, [data.id]);
    await audit(sql, context, "reset", "resume_lens", data.id);
    await afterMutation(sql, {
      kind: "lens.reset",
      entity: "resume_lens",
      entityId: data.id,
      actorEmail: context.email,
    });
    return { ok: true as const };
  });
