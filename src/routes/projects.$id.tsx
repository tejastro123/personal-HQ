import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Github, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { ProjectVisual } from "@/components/project-visual";
import { formatPushed, repoForProject } from "@/data/github-snapshot";
import { getProject, projects as staticProjects } from "@/data/projects";
import { caseStudyNotes, isFlagshipProject } from "@/lib/categories";
import { usePublicProjects } from "@/lib/use-public-content";

export const Route = createFileRoute("/projects/$id")({ component: ProjectPage });

function ProjectPage() {
  const { id } = Route.useParams();
  const liveProjects = usePublicProjects();
  const projectSource = liveProjects.length ? liveProjects : staticProjects;
  const project = projectSource.find((p) => p.id === id) ?? getProject(id);

  if (!project) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-24">
          <h1 className="font-display text-3xl">Project not found</h1>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/projects">Back to work</Link>
          </Button>
        </main>
      </SiteShell>
    );
  }

  const related = project.related
    .map((rid) => projectSource.find((p) => p.id === rid) ?? staticProjects.find((p) => p.id === rid))
    .filter(Boolean);
  const notes = caseStudyNotes[project.id];
  const flagship = isFlagshipProject(project.id);
  const pulse = repoForProject(project.github);

  return (
    <SiteShell>
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:flex-row lg:items-start lg:gap-12">
        <article className="min-w-0 flex-1">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" />
            Work
          </Link>
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <Badge category={project.category}>{project.category}</Badge>
            <Badge status={project.status}>{project.status}</Badge>
            {flagship ? <Badge variant="accent">Case study</Badge> : null}
            <span className="mono text-xs tabular-nums text-subtle">{project.year}</span>
            <span className="text-xs text-subtle">{project.country}</span>
          </div>
          <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{project.description}</p>
          <div className="mt-10 overflow-hidden rounded-xl border border-border">
            <ProjectVisual
              visual={project.visual}
              category={project.category}
              className="aspect-[16/8]"
            />
          </div>

          <section className="mt-10">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Stack</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {[...new Set([...(notes?.stackNotes ?? []), ...project.technologies])].map((tech) => (
                <li key={tech}>
                  <a
                    href={`https://www.google.com/search?q=${encodeURIComponent(tech)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="mono inline-flex items-center rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground transition-colors hover:border-border-strong hover:text-foreground"
                  >
                    {tech}
                  </a>
                </li>
              ))}
            </ul>
          </section>

          <dl className="mt-12 grid gap-10">
            <Block title="Overview" body={project.longDescription} />
            <Block title="Problem" body={project.problem} />
            <Block title="Approach" body={project.approach} />
            <Block title="Architecture" body={project.architecture} />
            <Block title="Results" body={project.results} />
            <Block title="Lessons" body={project.lessons} />
          </dl>

          {pulse ? (
            <section className="mt-10 rounded-xl border border-border bg-card p-5">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Repo pulse
              </p>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                <div>
                  <p className="text-xs text-subtle">Name</p>
                  <p className="mono text-sm text-foreground">{pulse.name}</p>
                </div>
                <div>
                  <p className="text-xs text-subtle">Stars</p>
                  <p className="mono text-sm text-foreground tabular-nums">
                    {pulse.stargazersCount}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-subtle">Last pushed</p>
                  <p className="mono text-sm text-foreground tabular-nums">
                    {formatPushed(pulse.pushedAt)}
                  </p>
                </div>
              </div>
              <p className="mt-2 text-xs text-muted-foreground">
                Snapshot source honest: stars stay 0 until{" "}
                <span className="mono">npm run sync:github</span> fills live data.
              </p>
            </section>
          ) : null}

          {notes ? (
            <section className="mt-12 rounded-xl border border-border bg-card p-6 sm:p-8">
              <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                Case study notes
              </p>
              <h2 className="mt-2 font-display text-2xl tracking-tight">What shipped</h2>
              <ul className="mt-4 space-y-2">
                {notes.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-foreground/90">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                    {h}
                  </li>
                ))}
              </ul>

              {notes.diagram?.length ? (
                <div className="mt-8">
                  <h3 className="font-display text-xl tracking-tight">System sketch</h3>
                  <pre className="mono mt-3 overflow-x-auto rounded-lg border border-border bg-background/60 p-4 text-[11px] leading-relaxed text-foreground/85">
                    {notes.diagram.join("\n")}
                  </pre>
                </div>
              ) : null}

              {notes.tradeoffs?.length ? (
                <div className="mt-8">
                  <h3 className="font-display text-xl tracking-tight">Tradeoffs I paid for</h3>
                  <div className="mt-3 overflow-x-auto">
                    <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
                      <thead>
                        <tr className="border-b border-border text-[11px] uppercase tracking-[0.14em] text-muted-foreground">
                          <th className="py-2 pr-4 font-medium">Choice</th>
                          <th className="py-2 pr-4 font-medium">Cost</th>
                          <th className="py-2 font-medium">When it earns it</th>
                        </tr>
                      </thead>
                      <tbody>
                        {notes.tradeoffs.map((t) => (
                          <tr key={t.option} className="border-b border-border/60 align-top">
                            <td className="py-3 pr-4 text-foreground/90">{t.option}</td>
                            <td className="py-3 pr-4 text-muted-foreground">{t.cost}</td>
                            <td className="py-3 text-muted-foreground">{t.when}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : null}

              {notes.cut?.length ? (
                <div className="mt-8">
                  <h3 className="font-display text-xl tracking-tight">What I would cut next</h3>
                  <ul className="mt-3 space-y-2">
                    {notes.cut.map((c) => (
                      <li key={c} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-status-archive" />
                        {c}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}

              <h3 className="mt-8 font-display text-xl tracking-tight">What I'd do next</h3>
              <ul className="mt-3 space-y-2">
                {notes.next.map((h) => (
                  <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent-2" />
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {related.length ? (
            <section className="mt-16 border-t border-border pt-10">
              <h2 className="font-display text-2xl tracking-tight">Related</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {related.map((p) =>
                  p ? (
                    <li key={p.id}>
                      <Link
                        to="/projects/$id"
                        params={{ id: p.id }}
                        className="block rounded-lg border border-border bg-card p-4 hover:border-border-strong"
                      >
                        <p className="text-xs text-muted-foreground">{p.category}</p>
                        <p className="mt-1 font-display text-lg">{p.title}</p>
                      </Link>
                    </li>
                  ) : null,
                )}
              </ul>
            </section>
          ) : null}
        </article>

        <aside className="w-full shrink-0 lg:sticky lg:top-24 lg:w-64">
          <div className="rounded-xl border border-border bg-card p-5 shadow-[var(--shadow-border)]">
            <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Jump</p>
            <div className="mt-4 flex flex-col gap-2">
              {project.demo ? (
                <Button asChild className="w-full">
                  {project.demo === "/playground" ? (
                    <Link to="/playground">
                      Live demo
                      <ArrowUpRight />
                    </Link>
                  ) : (
                    <a href={project.demo} rel="noreferrer">
                      Live demo
                      <ExternalLink />
                    </a>
                  )}
                </Button>
              ) : null}
              {project.github ? (
                <Button asChild variant="outline" className="w-full">
                  <a href={project.github} rel="noreferrer">
                    <Github />
                    GitHub
                    <ArrowUpRight />
                  </a>
                </Button>
              ) : null}
              <Button asChild variant="ghost" className="w-full">
                <Link to="/projects">
                  More work
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>
            <dl className="mono mt-5 space-y-2 border-t border-border pt-4 text-[11px]">
              <div className="flex justify-between gap-2">
                <dt className="text-subtle">Status</dt>
                <dd className="text-foreground">{project.status}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-subtle">Category</dt>
                <dd className="text-foreground">{project.category}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-subtle">Year</dt>
                <dd className="text-foreground tabular-nums">{project.year}</dd>
              </div>
              <div className="flex justify-between gap-2">
                <dt className="text-subtle">Location</dt>
                <dd className="text-foreground">{project.country}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </SiteShell>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <div>
      <dt className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">{title}</dt>
      <dd className="mt-2 text-base leading-relaxed text-foreground/90">{body}</dd>
    </div>
  );
}
