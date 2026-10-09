import { createFileRoute, Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { skillGroups } from "@/data/content";
import { projects as staticProjects } from "@/data/projects";
import { getLens, type ResumeLensId } from "@/data/resume-lenses";
import { getSocialLinks, site } from "@/data/site";
import {
  usePublicProjects,
  usePublicResumeLenses,
  usePublicSiteSettings,
} from "@/lib/use-public-content";

export const Route = createFileRoute("/resume")({
  component: ResumePage,
  validateSearch: (search: Record<string, unknown>) => {
    const lens = search.lens;
    return {
      lens:
        lens === "engineering" || lens === "research" || lens === "founder"
          ? lens
          : "engineering",
    };
  },
});

function ResumePage() {
  const { lens: lensId } = useSearch({ from: "/resume" }) as { lens: ResumeLensId };
  const lenses = usePublicResumeLenses();
  const projects = usePublicProjects();
  const settings = usePublicSiteSettings();
  const lens = lenses.find((l) => l.id === lensId) ?? getLens(lensId) ?? lenses[0];
  const socialLinks = (() => {
    const links: { id: string; label: string; href: string }[] = [];
    const social = settings.social;
    if (social.github) links.push({ id: "github", label: "GitHub", href: social.github });
    if (social.linkedin)
      links.push({ id: "linkedin", label: "LinkedIn", href: social.linkedin });
    if (social.instagram)
      links.push({ id: "instagram", label: "Instagram", href: social.instagram });
    if (social.x) links.push({ id: "x", label: "X / Twitter", href: social.x });
    if (social.youtube)
      links.push({ id: "youtube", label: "YouTube", href: social.youtube });
    return links.length ? links : getSocialLinks();
  })();
  const projectSource = projects.length ? projects : staticProjects;

  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Resume
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">
              {settings.name || site.name}
            </h1>
            <p className="mt-2 text-muted-foreground">{settings.shortBio || site.shortBio}</p>
            {settings.email ? (
              <a
                href={`mailto:${settings.email}`}
                className="mt-2 inline-block text-sm text-foreground underline-offset-4 hover:underline"
              >
                {settings.email}
              </a>
            ) : null}
          </div>
          <Button onClick={() => window.print()}>Print / Save PDF</Button>
        </div>

        <section className="mt-8" data-testid="resume-lenses">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Lenses
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick how you want to read this resume — same work, different emphasis.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {lenses.map((l) => (
              <Link
                key={l.id}
                to="/resume"
                search={{ lens: l.id }}
                className={
                  l.id === lens.id
                    ? "inline-flex h-9 items-center rounded-full border border-accent bg-accent-soft px-4 text-sm font-medium text-accent"
                    : "inline-flex h-9 items-center rounded-full border border-border bg-card px-4 text-sm text-muted-foreground hover:text-foreground"
                }
              >
                {l.label}
              </Link>
            ))}
          </div>
          <p className="mt-3 rounded-lg border border-border bg-card p-3 text-sm text-muted-foreground">
            <span className="font-medium text-foreground">{lens.label}:</span> {lens.blurb}
          </p>
        </section>

        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">
          {settings.bio || site.bio}
        </p>
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Focus
          </h2>
          <p className="mt-2">{settings.home.availabilityDomains || site.availabilityDomains}</p>
          <p className="mt-1 text-sm text-muted-foreground">{lens.focus}</p>
        </section>
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Selected work
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{lens.headline}</p>
          <ul className="mt-3 space-y-3">
            {projectSource
              .filter((p) => lens.projectIds.includes(p.id) || p.featured)
              .slice(0, 8)
              .map((p) => (
                <li key={p.id}>
                  <p className="font-medium">
                    {p.title} <span className="text-subtle">· {p.year}</span>
                  </p>
                  <p className="text-sm text-muted-foreground">{p.description}</p>
                </li>
              ))}
          </ul>
        </section>
        {socialLinks.length ? (
          <section className="mt-10">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Links
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {socialLinks.map((s) => (
                <li key={s.id}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Skills
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Emphasized for {lens.label.toLowerCase()}:{" "}
            <span className="text-foreground">{lens.skillsEmphasis.join(" · ")}</span>
          </p>
          <div className="mt-3 space-y-2">
            {skillGroups.map((g) => (
              <p key={g.title} className="text-sm">
                <span className="font-medium">{g.title}:</span>{" "}
                <span className="text-muted-foreground">{g.items.join(", ")}</span>
              </p>
            ))}
          </div>
        </section>
        <p className="mt-12 text-xs text-subtle">
          Live site data — print this page or save as PDF from your browser.
        </p>
      </main>
    </SiteShell>
  );
}
