import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, posts, readingMinutes, relatedProjectIds, type BlogFigure } from "@/data/blog";
import { getProject } from "@/data/projects";
import { usePublicPosts } from "@/lib/use-public-content";

export const Route = createFileRoute("/blog/$slug")({ component: BlogPostPage });

function BlogFigureView({ figure }: { figure: BlogFigure }) {
  if (figure.kind === "pipeline" && figure.stages?.length) {
    return (
      <figure className="my-8 rounded-xl border border-border bg-card p-5" data-figure={figure.id}>
        <h2 className="font-display text-lg tracking-tight">{figure.title}</h2>
        <ol className="mt-4 flex flex-wrap items-center gap-2">
          {figure.stages.map((stage, i) => (
            <li key={stage} className="flex items-center gap-2">
              <span className="mono inline-flex h-9 items-center rounded-md border border-border bg-background px-3 text-xs text-foreground">
                {stage}
              </span>
              {i < figure.stages!.length - 1 ? (
                <span className="text-subtle" aria-hidden>
                  →
                </span>
              ) : null}
            </li>
          ))}
        </ol>
        <figcaption className="mt-3 text-sm text-muted-foreground">{figure.caption}</figcaption>
      </figure>
    );
  }

  if (figure.kind === "line" && figure.series?.length) {
    const w = 560;
    const h = 200;
    const pad = 28;
    const all = figure.series.flatMap((s) => s.points);
    const xs = all.map((p) => p[0]);
    const ys = all.map((p) => p[1]);
    const minX = Math.min(...xs);
    const maxX = Math.max(...xs);
    const minY = Math.min(...ys);
    const maxY = Math.max(...ys);
    const sx = (x: number) => pad + ((x - minX) / Math.max(1, maxX - minX)) * (w - pad * 2);
    const sy = (y: number) => h - pad - ((y - minY) / Math.max(1, maxY - minY)) * (h - pad * 2);
    return (
      <figure className="my-8 rounded-xl border border-border bg-card p-5" data-figure={figure.id}>
        <h2 className="font-display text-lg tracking-tight">{figure.title}</h2>
        <svg viewBox={`0 0 ${w} ${h}`} className="mt-4 w-full" role="img" aria-label={figure.title}>
          <rect width={w} height={h} className="fill-background-secondary" />
          {figure.series.map((s) => (
            <g key={s.label}>
              <polyline
                fill="none"
                stroke={s.label === "In-sample" ? "#fbbf24" : "#4c8dff"}
                strokeWidth={2}
                points={s.points.map((p) => `${sx(p[0])},${sy(p[1])}`).join(" ")}
              />
              {s.points.map((p, i) => (
                <circle
                  key={i}
                  cx={sx(p[0])}
                  cy={sy(p[1])}
                  r={3}
                  fill={s.label === "In-sample" ? "#fbbf24" : "#4c8dff"}
                />
              ))}
            </g>
          ))}
        </svg>
        <ul className="mt-2 flex flex-wrap gap-4 text-xs text-muted-foreground">
          {figure.series.map((s) => (
            <li key={s.label} className="flex items-center gap-2">
              <span
                className="size-2.5 rounded-full"
                style={{ backgroundColor: s.label === "In-sample" ? "#fbbf24" : "#4c8dff" }}
              />
              {s.label}
            </li>
          ))}
        </ul>
        <figcaption className="mt-2 text-sm text-muted-foreground">{figure.caption}</figcaption>
      </figure>
    );
  }

  return null;
}

function BlogPostPage() {
  const { slug } = Route.useParams();
  const livePosts = usePublicPosts();
  const post = livePosts.find((p) => p.slug === slug) ?? getPost(slug);
  const relatedPool = livePosts.length ? livePosts : posts;

  if (!post) {
    return (
      <SiteShell>
        <main className="mx-auto max-w-3xl px-4 py-24">
          <h1 className="font-display text-3xl">Post not found</h1>
          <Button asChild className="mt-6" variant="outline">
            <Link to="/blog">Back to blog</Link>
          </Button>
        </main>
      </SiteShell>
    );
  }

  const related = relatedPool
    .filter((p) => p.slug !== post.slug && p.tags.some((t) => post.tags.includes(t)))
    .slice(0, 3);
  const relatedProjects = relatedProjectIds(post)
    .map((id) => getProject(id))
    .filter(Boolean);

  return (
    <SiteShell>
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-16">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Blog
        </Link>
        <div className="mt-6 flex flex-wrap gap-2">
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
        <h1 className="mt-4 font-display text-4xl tracking-tight sm:text-5xl">{post.title}</h1>
        <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>

        <div className="mt-10 space-y-5">
          {post.body.map((para, idx) => {
            const isLink = para.startsWith("Repo:") || para.startsWith("Profiles:") || para.startsWith("Source:");
            const figure = post.figures?.[idx];
            if (isLink) {
              const url = para.split(": ").slice(1).join(": ");
              return (
                <p key={para.slice(0, 40)} className="text-sm text-muted-foreground">
                  <a
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="mono inline-flex items-center gap-1 text-foreground underline-offset-4 hover:underline"
                  >
                    {url}
                    <ArrowUpRight className="size-3.5" />
                  </a>
                </p>
              );
            }
            return (
              <div key={para.slice(0, 40)}>
                <p className="leading-relaxed text-foreground/90">{para}</p>
                {figure ? <BlogFigureView figure={figure} /> : null}
              </div>
            );
          })}
          {post.figures && post.figures.length > post.body.length
            ? post.figures.slice(post.body.length).map((figure) => (
                <BlogFigureView key={figure.id} figure={figure} />
              ))
            : null}
        </div>

        {relatedProjects.length ? (
          <div className="mt-12 rounded-xl border border-border bg-card p-6">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Related projects
            </h2>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {relatedProjects.map((p) =>
                p ? (
                  <li key={p.id}>
                    <Link
                      to="/projects/$id"
                      params={{ id: p.id }}
                      className="block rounded-lg border border-border bg-background-secondary p-3 hover:border-border-strong"
                    >
                      <p className="text-[11px] text-muted-foreground">{p.category}</p>
                      <p className="mt-1 font-display text-sm tracking-tight">{p.title}</p>
                    </Link>
                  </li>
                ) : null,
              )}
            </ul>
          </div>
        ) : null}

        {related.length ? (
          <div className="mt-10 border-t border-border pt-8">
            <h2 className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Related posts
            </h2>
            <ul className="mt-4 space-y-3">
              {related.map((p) => (
                <li key={p.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: p.slug }}
                    className="text-sm text-foreground underline-offset-4 hover:underline"
                  >
                    {p.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </article>
    </SiteShell>
  );
}
