import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { posts } from "@/data/blog";
import { projects } from "@/data/projects";
import { getSocialLinks, site } from "@/data/site";

const explore = [
  { label: "Work", to: "/", hash: "work" },
  { label: "About", to: "/", hash: "about" },
  { label: "Skills", to: "/", hash: "skills" },
  { label: "World", to: "/", hash: "world" },
  { label: "Playground", to: "/playground" },
];

const resources = [
  { label: "Resume", to: "/resume" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Links", to: "/links" },
  { label: "Contact", to: "/contact" },
];

const categoryIndex = (() => {
  const counts = new Map<string, number>();
  for (const p of projects) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([category, count]) => ({ category, count }));
})();

const latestPost = posts[0];

export function Footer() {
  const socials = getSocialLinks();
  return (
    <footer className="border-t border-border bg-background-secondary">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <p className="font-display text-sm font-semibold tracking-[0.18em]">
            {site.name.toUpperCase()}
          </p>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            {site.footer}
          </p>
          <div className="mt-6 rounded-xl border border-border bg-card/60 p-4">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Index
            </p>
            <ul className="mono mt-3 space-y-1.5 text-xs">
              <li className="flex justify-between gap-3 text-muted-foreground">
                <span>Total projects</span>
                <span className="tabular-nums text-foreground">{projects.length}</span>
              </li>
              {categoryIndex.map((c) => (
                <li key={c.category} className="flex justify-between gap-3 text-muted-foreground">
                  <span>{c.category}</span>
                  <span className="tabular-nums text-foreground">
                    {String(c.count).padStart(2, "0")}
                  </span>
                </li>
              ))}
              {latestPost ? (
                <li className="border-t border-border pt-2">
                  <p className="text-[10px] uppercase tracking-[0.16em] text-subtle">Latest post</p>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: latestPost.slug }}
                    className="mt-1 line-clamp-2 text-foreground hover:text-accent"
                  >
                    {latestPost.title}
                  </Link>
                </li>
              ) : null}
            </ul>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-7">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Explore
            </p>
            <ul className="mt-4 space-y-2">
              {explore.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    hash={"hash" in item ? item.hash : undefined}
                    className="text-sm text-foreground/90 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Connect
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              {site.email ? (
                <li>
                  <a
                    href={`mailto:${site.email}`}
                    className="text-foreground/90 hover:text-foreground"
                  >
                    Email
                  </a>
                </li>
              ) : null}
              {socials.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground/90 hover:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
              <li>
                <Link to="/contact" className="text-foreground hover:underline">
                  Contact form
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Resources
            </p>
            <ul className="mt-4 space-y-2">
              {resources.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-foreground/90 hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-3 px-4 py-5 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-muted-foreground">
            © 2026 {site.name}. Built with curiosity + code.
          </p>
          <div className="flex items-center gap-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
            >
              Start a conversation
              <ArrowUpRight className="size-3.5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
