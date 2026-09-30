import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { posts, readingMinutes } from "@/data/blog";
import { site } from "@/data/site";

export const Route = createFileRoute("/blog")({ component: BlogRoute });

function BlogRoute() {
  const matches = useRouterState({ select: (s) => s.matches });
  const isDetail = matches.some(
    (m) => m.routeId === "/blog/$slug" || m.id?.endsWith("/blog/$slug"),
  );
  if (isDetail) return <Outlet />;

  return (
    <SiteShell>
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16">
        <p className="mono text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Blog
        </p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">
          Notes from the lab and the studio.
        </h1>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
          Writing on quantum tooling, RAG systems, physics, and building this site — grounded in
          real projects, not content-farm filler.
        </p>

        <div className="mt-12 space-y-8">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="rounded-xl border border-border bg-card p-6 shadow-[var(--shadow-border)] transition-shadow hover:shadow-[var(--shadow-border-hover)] sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                {post.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
                <span className="mono ml-auto text-xs tabular-nums text-subtle">
                  {readingMinutes(post)} min read
                </span>
                <time dateTime={post.date} className="mono text-xs tabular-nums text-subtle">
                  {post.date}
                </time>
              </div>
              <h2 className="mt-4 font-display text-2xl tracking-tight sm:text-3xl">
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="hover:underline underline-offset-4"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                {post.excerpt}
              </p>
              <Button asChild variant="ghost" className="mt-4 px-0">
                <Link to="/blog/$slug" params={{ slug: post.slug }}>
                  Read post
                  <ArrowUpRight />
                </Link>
              </Button>
            </article>
          ))}
        </div>

        <div className="mt-14 rounded-xl border border-border bg-background-secondary p-6 sm:p-8">
          <h2 className="font-display text-xl tracking-tight">More places to read</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Source code and longer-form experiment notes live on GitHub.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild variant="outline" size="sm">
              <a href={site.social.github} target="_blank" rel="noreferrer">
                GitHub profile
                <ArrowUpRight />
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link to="/projects">Project index</Link>
            </Button>
          </div>
        </div>
      </main>
    </SiteShell>
  );
}
