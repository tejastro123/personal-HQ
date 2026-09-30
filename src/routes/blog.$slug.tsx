import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { SiteShell } from "@/components/layout/site-shell";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getPost, posts, readingMinutes, relatedProjectIds } from "@/data/blog";
import { getProject } from "@/data/projects";

export const Route = createFileRoute("/blog/$slug")({ component: BlogPostPage });

function BlogPostPage() {
  const { slug } = Route.useParams();
  const post = getPost(slug);

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

  const related = posts
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
          {post.body.map((para) => {
            const isLink = para.startsWith("Repo:") || para.startsWith("Profiles:") || para.startsWith("Source:");
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
              <p key={para.slice(0, 40)} className="leading-relaxed text-foreground/90">
                {para}
              </p>
            );
          })}
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
