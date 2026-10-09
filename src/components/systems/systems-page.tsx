import { Link } from "@tanstack/react-router";
import { Activity, CheckCircle2, GitBranch, ShieldCheck, TriangleAlert } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { githubSnapshot, formatPushed } from "@/data/github-snapshot";
import { metrics } from "@/data/content";
import { projects } from "@/data/projects";
import { topTechnologies, computeTechRadar } from "@/lib/radar";
import { integritySummary, runIntegrityChecks } from "@/lib/integrity";
import { usePerformanceVitals } from "@/lib/vitals";

const TOKEN_KEYS = [
  "--background",
  "--card",
  "--foreground",
  "--accent",
  "--accent-2",
  "--accent-warm",
  "--border",
  "--subtle",
  "--cat-quantum",
  "--cat-ai",
  "--cat-software",
  "--cat-data",
];

export function SystemsPage() {
  const vitals = usePerformanceVitals();
  const issues = useMemo(() => runIntegrityChecks(), []);
  const summary = useMemo(() => integritySummary(issues), [issues]);
  const radar = useMemo(() => computeTechRadar(), []);
  const techs = useMemo(() => topTechnologies(12), []);
  const [liveTokens, setLiveTokens] = useState<{ key: string; value: string }[]>([]);

  useEffect(() => {
    const style = getComputedStyle(document.documentElement);
    setLiveTokens(
      TOKEN_KEYS.map((key) => ({
        key,
        value: style.getPropertyValue(key).trim() || "—",
      })),
    );
  }, []);

  return (
    <SiteShell>
      <main className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Systems</p>
        <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
          How this studio stays honest
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Live vitals, data integrity, tech radar, design tokens, and repo pulse — the operations
          surface behind the portfolio.
        </p>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <MetricCard label="Projects indexed" value={String(projects.length)} />
          <MetricCard
            label="Integrity"
            value={summary.ok ? "Pass" : `${summary.errors} errors`}
            tone={summary.ok ? "ok" : "warn"}
          />
          <MetricCard label="Warnings" value={String(summary.warnings)} />
          <MetricCard
            label="Repos (snapshot)"
            value={String(githubSnapshot.repos.length || githubSnapshot.user?.publicRepos || "—")}
          />
        </div>

        <section className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-display text-xl tracking-tight">
              <Activity className="size-5 text-accent" />
              Performance vitals
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              PerformanceObserver on this page · not a lab claim
            </p>
            <dl className="mt-4 space-y-2 font-mono text-xs tabular-nums">
              <VitalRow label="LCP" value={vitals.lcpMs !== null ? `${vitals.lcpMs} ms` : "—"} />
              <VitalRow
                label="CLS"
                value={vitals.cls !== null ? vitals.cls.toFixed(4) : "—"}
              />
              <VitalRow
                label="INP (approx)"
                value={vitals.inpApproxMs !== null ? `${vitals.inpApproxMs} ms` : "—"}
              />
              <VitalRow
                label="FCP"
                value={vitals.fcpMs !== null ? `${vitals.fcpMs} ms` : "—"}
              />
              <VitalRow
                label="DOM ready"
                value={
                  vitals.domContentLoadedMs !== null ? `${vitals.domContentLoadedMs} ms` : "—"
                }
              />
              <VitalRow
                label="Transferred"
                value={vitals.transferredKb !== null ? `${vitals.transferredKb} KB` : "—"}
              />
            </dl>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="flex items-center gap-2 font-display text-xl tracking-tight">
              <ShieldCheck className="size-5 text-[var(--status-active)]" />
              Data integrity
            </h2>
            <p className="mt-1 text-xs text-muted-foreground">
              related[] resolve · category validity · visual keys · metric ranges
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {issues.length === 0 ? (
                <li className="flex items-center gap-2 text-[var(--status-active)]">
                  <CheckCircle2 className="size-4" />
                  All checks passed
                </li>
              ) : (
                issues.slice(0, 8).map((issue) => (
                  <li key={`${issue.code}-${issue.message}`} className="flex gap-2">
                    {issue.level === "error" ? (
                      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-status" />
                    ) : (
                      <TriangleAlert className="mt-0.5 size-4 shrink-0 text-accent-warm" />
                    )}
                    <span className="text-muted-foreground">{issue.message}</span>
                  </li>
                ))
              )}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Checks run in-browser from <span className="mono">src/lib/integrity.ts</span>.
            </p>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl tracking-tight">Tech radar</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Project frequency by technology axis · derived from the archive
            </p>
            <ul className="mt-4 space-y-3">
              {radar.map((axis) => (
                <li key={axis.id}>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <span>{axis.label}</span>
                    <span className="mono text-xs tabular-nums text-muted-foreground">
                      {axis.count} proj · {axis.score}%
                    </span>
                  </div>
                  <div className="mt-1 h-2 overflow-hidden rounded-full bg-muted">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.max(4, axis.score)}%` }}
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-display text-xl tracking-tight">Top technologies</h2>
            <ul className="mt-4 flex flex-wrap gap-2">
              {techs.map((t) => (
                <li
                  key={t.tech}
                  className="mono rounded-full border border-border bg-background px-3 py-1 text-xs text-muted-foreground"
                >
                  {t.tech}
                  <span className="ml-1 tabular-nums text-subtle">{t.count}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted-foreground">
              Home metrics:{" "}
              {metrics
                .map((m) => `${m.prefix}${m.value}${m.infinite ? "+" : ""} ${m.label}`)
                .join(" · ")}
            </p>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="flex items-center gap-2 font-display text-xl tracking-tight">
              <GitBranch className="size-5 text-accent-2" />
              Repo pulse
            </h2>
            <p className="mono text-[11px] text-subtle">
              last synced {formatPushed(githubSnapshot.syncedAt)} ·{" "}
              {githubSnapshot.source === "live-api" ? "live API" : "project-derived"}
            </p>
          </div>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Stars and forks stay at 0 until{" "}
            <span className="mono">npm run sync:github</span> writes a real snapshot — no fabricated
            social proof. Matching is by repo name from each project&apos;s GitHub URL.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                  <th className="py-2 pr-4 font-medium">Repo</th>
                  <th className="py-2 pr-4 font-medium">Language</th>
                  <th className="py-2 pr-4 font-medium">Stars</th>
                  <th className="py-2 pr-4 font-medium">Pushed</th>
                  <th className="py-2 font-medium">Source</th>
                </tr>
              </thead>
              <tbody>
                {projects
                  .filter((p) => p.github)
                  .slice(0, 10)
                  .map((p) => {
                    const name = p.github!.split("/").filter(Boolean).pop() ?? p.id;
                    const snap = githubSnapshot.repos.find(
                      (r) => r.name.toLowerCase() === name.toLowerCase(),
                    );
                    return (
                      <tr key={p.id} className="border-b border-border/50">
                        <td className="py-2 pr-4">
                          <Link
                            to="/projects/$id"
                            params={{ id: p.id }}
                            className="text-foreground hover:text-accent"
                          >
                            {name}
                          </Link>
                        </td>
                        <td className="py-2 pr-4 text-muted-foreground">
                          {snap?.language ?? "—"}
                        </td>
                        <td className="py-2 pr-4 tabular-nums text-muted-foreground">
                          {snap ? snap.stargazersCount : 0}
                        </td>
                        <td className="py-2 pr-4 tabular-nums text-muted-foreground">
                          {snap ? formatPushed(snap.pushedAt) : "—"}
                        </td>
                        <td className="py-2 text-subtle">
                          {snap && githubSnapshot.source === "live-api" ? "live" : "derived"}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl tracking-tight">Design tokens</h2>
          <p className="mt-1 text-xs text-muted-foreground">
            Read live from CSS custom properties — what the UI actually paints
          </p>
          <ul className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
            {liveTokens.map((t) => (
              <li
                key={t.key}
                className="flex items-center gap-3 rounded-lg border border-border bg-background/40 p-2"
              >
                <span
                  className="size-8 shrink-0 rounded-md border border-border"
                  style={{ backgroundColor: t.value }}
                  aria-hidden
                />
                <span className="mono text-[11px] text-muted-foreground">{t.key}</span>
                <span className="mono ml-auto truncate text-[11px] text-foreground">{t.value}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-10 rounded-xl border border-border bg-card p-6">
          <h2 className="font-display text-xl tracking-tight">Stack notes</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              Platform contract: TanStack Start + Vite + React 19 + Tailwind 4 + Motion + D3 +
              Three.js. Auth and database stay off — projects are static data.
            </li>
            <li>
              Playground uses Rapier rigid bodies; instruments use pure TS/canvas/Three so they
              stay testable without GPU.
            </li>
            <li>
              GitHub snapshot is build-time only —{" "}
              <span className="mono text-foreground">scripts/sync-github.mjs</span>.
            </li>
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/topology"
              className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
            >
              Open topology
            </Link>
            <Link
              to="/instruments"
              className="inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs hover:border-border-strong"
            >
              Instruments lab
            </Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}

function MetricCard({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "ok" | "warn";
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="text-[11px] uppercase tracking-[0.16em] text-muted-foreground">{label}</p>
      <p
        className={
          tone === "warn"
            ? "mt-2 font-display text-3xl text-accent-warm"
            : tone === "ok"
              ? "mt-2 font-display text-3xl text-[var(--status-active)]"
              : "mt-2 font-display text-3xl"
        }
      >
        {value}
      </p>
    </div>
  );
}

function VitalRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border/40 pb-1.5">
      <dt className="text-subtle">{label}</dt>
      <dd className="text-foreground">{value}</dd>
    </div>
  );
}

export default SystemsPage;
