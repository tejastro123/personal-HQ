import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Activity,
  ExternalLink,
  FileText,
  FolderKanban,
  Inbox,
  Radio,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  adminDashboardStats,
  adminGetSiteSettings,
  adminListAudit,
  adminSystemStatus,
} from "@/lib/content";
import type { AdminAuditEntry, SiteSettings } from "@/lib/content";
import {
  AdminCard,
  AdminPageHeader,
  FilterChips,
  StatusBanner,
} from "@/components/admin/ui";

type Stats = Awaited<ReturnType<typeof adminDashboardStats>>;
type SystemStatus = Awaited<ReturnType<typeof adminSystemStatus>>;
type AuditFilter = "all" | "project" | "post" | "site" | "message" | "lens";

const HOME_FIELDS = [
  "heroEyebrow",
  "heroHeadline",
  "heroCtaPrimaryLabel",
  "heroCtaPrimaryHref",
  "heroCtaSecondaryLabel",
  "heroCtaSecondaryHref",
  "availability",
  "availabilityDomains",
  "aboutStatement",
  "aboutBody",
  "ctaEyebrow",
  "ctaTitle",
  "ctaBody",
  "ctaPrimaryLabel",
  "ctaPrimaryHref",
  "ctaSecondaryLabel",
  "ctaSecondaryHref",
  "skillsTitle",
  "skillsSubtitle",
  "contactTitle",
  "contactSubtitle",
  "navCtaLabel",
  "navCtaHref",
  "projectsTitle",
  "projectsSubtitle",
] as const;

function homeHealth(home: SiteSettings["home"] | undefined) {
  if (!home) return { filled: 0, total: HOME_FIELDS.length, pct: 0 };
  const filled = HOME_FIELDS.filter((key) =>
    String(home[key] ?? "").trim(),
  ).length;
  return {
    filled,
    total: HOME_FIELDS.length,
    pct: Math.round((filled / HOME_FIELDS.length) * 100),
  };
}

export function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [audit, setAudit] = useState<AdminAuditEntry[]>([]);
  const [system, setSystem] = useState<SystemStatus | null>(null);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [auditFilter, setAuditFilter] = useState<AuditFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [s, a, sys, siteSettings] = await Promise.all([
        adminDashboardStats(),
        adminListAudit(),
        adminSystemStatus().catch(() => null),
        adminGetSiteSettings().catch(() => null),
      ]);
      setStats(s);
      setAudit(a);
      setSystem(sys);
      setSettings(siteSettings);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredAudit = useMemo(() => {
    if (auditFilter === "all") return audit;
    return audit.filter((row) => {
      const entity = (row.entity ?? "").toLowerCase();
      if (auditFilter === "project") return entity.includes("project");
      if (auditFilter === "post") return entity.includes("post") || entity.includes("blog");
      if (auditFilter === "site") return entity.includes("site");
      if (auditFilter === "message") return entity.includes("message");
      if (auditFilter === "lens") return entity.includes("lens") || entity.includes("resume");
      return true;
    });
  }, [audit, auditFilter]);

  const health = homeHealth(settings?.home);
  const systemOk = system?.health?.status === "ok";

  const publicLinks = [
    { to: "/", label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/blog", label: "Blog" },
    { to: "/resume", label: "Resume" },
    { to: "/instruments", label: "Instruments" },
  ];

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Dashboard"
        description="Secret operator console for personal-HQ. CRUD projects, blog posts, site settings, resume lenses, and the contact inbox. Mutations are allowlist-gated and audited."
        actions={
          <>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted"
            >
              <ExternalLink className="size-4" />
              Public site
            </a>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted"
            >
              Refresh
            </button>
          </>
        }
      />

      {error ? <StatusBanner kind="error">{error}</StatusBanner> : null}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="DB projects"
          value={stats ? String(stats.projects) : "—"}
          sub={`${stats?.staticProjectCount ?? 0} static · ${stats?.unpublishedProjects ?? 0} draft`}
          icon={<FolderKanban className="size-4 text-sky-300" />}
          to="/hq/projects"
        />
        <StatCard
          label="DB posts"
          value={stats ? String(stats.posts) : "—"}
          sub={`${stats?.staticPostCount ?? 0} static · ${stats?.unpublishedPosts ?? 0} draft`}
          icon={<FileText className="size-4 text-violet-300" />}
          to="/hq/blog"
        />
        <StatCard
          label="Messages"
          value={stats ? String(stats.messages) : "—"}
          sub={stats ? `${stats.unread} unread` : "—"}
          icon={<Inbox className="size-4 text-emerald-300" />}
          to="/hq/messages"
        />
        <StatCard
          label="Audit events"
          value={stats ? String(stats.audit) : "—"}
          sub={stats?.adminEmail ?? "—"}
          icon={<Activity className="size-4 text-amber-300" />}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Zap className="size-3.5 text-accent-warm" />
            Content health
          </div>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Home copy</p>
                <p className="mono text-sm tabular-nums text-foreground">{health.pct}%</p>
              </div>
              <div className="health-bar mt-2">
                <span style={{ width: `${health.pct}%` }} />
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {health.filled}/{health.total} fields filled
              </p>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Drafts</p>
                <p className="mono text-sm tabular-nums text-foreground">
                  {(stats?.unpublishedProjects ?? 0) + (stats?.unpublishedPosts ?? 0)}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {stats?.unpublishedProjects ?? 0} projects · {stats?.unpublishedPosts ?? 0} posts
                unpublished
              </p>
            </div>
            <div>
              <div className="flex items-baseline justify-between gap-2">
                <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Outbox</p>
                <p className="mono text-sm tabular-nums text-foreground">
                  {stats?.events ?? system?.contentVersion?.events ?? 0}
                </p>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                {system?.recentEvents?.[0]?.kind ?? "no events yet"}
              </p>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            <Link
              to="/hq/home"
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-muted"
            >
              Edit home content
            </Link>
            <Link
              to="/hq/projects"
              className="inline-flex h-9 items-center rounded-md border border-border px-3 text-sm hover:bg-muted"
            >
              Review drafts
            </Link>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <Radio className="size-3.5 text-sky-300" />
            System status
          </div>
          <div className="mt-4 space-y-3">
            <StatusPill
              ok={systemOk}
              label="API"
              value={system?.health?.status ?? "unknown"}
            />
            <StatusPill
              ok={system?.dbSource != null}
              label="Database"
              value={system?.dbSource ?? "—"}
            />
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Content version</p>
              <p className="mt-1 font-mono text-sm">
                {system?.contentVersion?.version ?? stats?.contentVersion ?? "—"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                v{system?.contentVersion?.projects ?? 0} projects · v
                {system?.contentVersion?.posts ?? 0} posts · {system?.contentVersion?.events ?? 0}{" "}
                events
              </p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-[0.14em] text-subtle">Cache</p>
              <p className="mt-1 font-display text-xl">{system?.cache?.entries ?? 0}</p>
              <p className="mt-1 text-xs text-muted-foreground">TTL entries (30s)</p>
            </div>
          </div>
          {system?.recentEvents?.length ? (
            <ul className="mt-4 space-y-1 border-t border-border pt-3 text-xs text-muted-foreground">
              {system.recentEvents.slice(0, 4).map((e) => (
                <li key={e.id} className="flex items-center justify-between gap-3">
                  <span className="font-mono">{String(e.kind)}</span>
                  <span>
                    {String(e.entity)}
                    {e.entity_id ? `:${String(e.entity_id)}` : ""} ·{" "}
                    {new Date(String(e.created_at)).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : null}
        </AdminCard>
      </div>

      <AdminCard>
        <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
          <ExternalLink className="size-3.5 text-accent" />
          Open public surfaces
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {publicLinks.map((link) => (
            <a
              key={link.to}
              href={link.to}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted"
            >
              {link.label}
              <ExternalLink className="size-3.5 text-subtle" />
            </a>
          ))}
        </div>
      </AdminCard>

      <div className="grid gap-4 lg:grid-cols-3">
        <AdminCard className="lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Sparkles className="size-3.5 text-accent-2" />
              Recent admin activity
            </div>
            <FilterChips
              value={auditFilter}
              onChange={setAuditFilter}
              options={[
                { value: "all", label: "All", count: audit.length },
                {
                  value: "project",
                  label: "Projects",
                  count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("project"))
                    .length,
                },
                {
                  value: "post",
                  label: "Posts",
                  count: audit.filter(
                    (r) =>
                      (r.entity ?? "").toLowerCase().includes("post") ||
                      (r.entity ?? "").toLowerCase().includes("blog"),
                  ).length,
                },
                {
                  value: "message",
                  label: "Messages",
                  count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("message"))
                    .length,
                },
                {
                  value: "site",
                  label: "Site",
                  count: audit.filter((r) => (r.entity ?? "").toLowerCase().includes("site"))
                    .length,
                },
              ]}
            />
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase tracking-[0.12em] text-subtle">
                <tr>
                  <th className="pb-2 pr-3 font-medium">When</th>
                  <th className="pb-2 pr-3 font-medium">Action</th>
                  <th className="pb-2 pr-3 font-medium">Entity</th>
                  <th className="pb-2 font-medium">By</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {filteredAudit.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="py-6 text-center text-muted-foreground">
                      {loading
                        ? "Loading…"
                        : audit.length === 0
                          ? "No mutations yet. Your first save will show up here."
                          : "No audit rows match this filter."}
                    </td>
                  </tr>
                ) : (
                  filteredAudit.map((row) => (
                    <tr key={row.id} data-audit-row>
                      <td className="py-2 pr-3 tabular-nums text-subtle">
                        {new Date(row.created_at).toLocaleString()}
                      </td>
                      <td className="py-2 pr-3">
                        <span className="mono rounded bg-muted px-1.5 py-0.5 text-xs">{row.action}</span>
                      </td>
                      <td className="py-2 pr-3 text-muted-foreground">
                        {row.entity}
                        {row.entity_id ? ` · ${row.entity_id}` : ""}
                      </td>
                      <td className="py-2 text-subtle">{row.admin_email}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </AdminCard>

        <AdminCard>
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <ShieldCheck className="size-3.5 text-accent" />
            Console notes
          </div>
          <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
            <li>
              Press <span className="mono text-xs text-foreground">⌘K</span> for the admin command
              palette — jump pages, create content, open the public site.
            </li>
            <li>
              This route is <span className="text-foreground">not</span> in the public nav or
              command palette.
            </li>
            <li>
              Admin email allowlist lives in <span className="mono text-xs">src/lib/admin.ts</span>.
            </li>
            <li>
              DB rows overlay the static catalog — unpublished rows hide a seed of the same id.
            </li>
            <li>
              <Link to="/" className="text-foreground underline-offset-4 hover:underline">
                Open the public site
              </Link>{" "}
              to verify what visitors see after a save.
            </li>
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}

function StatusPill({ ok, label, value }: { ok: boolean; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-background/40 px-3 py-2">
      <span className="text-[11px] uppercase tracking-[0.14em] text-subtle">{label}</span>
      <span className="flex items-center gap-2 text-sm">
        <span
          className={
            "size-1.5 rounded-full " + (ok ? "bg-emerald-400 shadow-[0_0_8px_emerald-400]" : "bg-amber-400")
          }
        />
        <span className="font-mono text-foreground">{value}</span>
      </span>
    </div>
  );
}

function StatCard({
  label,
  value,
  sub,
  icon,
  to,
}: {
  label: string;
  value: string;
  sub: string;
  icon: React.ReactNode;
  to?: string;
}) {
  const body = (
    <AdminCard className="stat-tile h-full">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl tracking-tight tabular-nums">{value}</p>
          <p className="mt-1 text-xs text-subtle">{sub}</p>
        </div>
        <div className="rounded-lg border border-border bg-background/60 p-2">{icon}</div>
      </div>
    </AdminCard>
  );
  if (!to) return body;
  return <Link to={to}>{body}</Link>;
}
