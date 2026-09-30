import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";
import { skillGroups } from "@/data/content";
import { projects } from "@/data/projects";
import { getSocialLinks, site } from "@/data/site";

export const Route = createFileRoute("/resume")({ component: ResumePage });

function ResumePage() {
  return (
    <SiteShell>
      <main className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Resume</p>
            <h1 className="mt-2 font-display text-4xl tracking-tight">{site.name}</h1>
            <p className="mt-2 text-muted-foreground">{site.shortBio}</p>
            {site.email ? (
              <a
                href={`mailto:${site.email}`}
                className="mt-2 inline-block text-sm text-foreground underline-offset-4 hover:underline"
              >
                {site.email}
              </a>
            ) : null}
          </div>
          <Button onClick={() => window.print()}>Print / Save PDF</Button>
        </div>
        <p className="mt-8 text-sm leading-relaxed text-muted-foreground">{site.bio}</p>
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Focus</h2>
          <p className="mt-2">{site.availabilityDomains}</p>
        </section>
        <section className="mt-10">
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            Selected work
          </h2>
          <ul className="mt-3 space-y-3">
            {projects.filter((p) => p.featured).slice(0, 8).map((p) => (
              <li key={p.id}>
                <p className="font-medium">
                  {p.title} <span className="text-subtle">· {p.year}</span>
                </p>
                <p className="text-sm text-muted-foreground">{p.description}</p>
              </li>
            ))}
          </ul>
        </section>
        {getSocialLinks().length ? (
          <section className="mt-10">
            <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Links
            </h2>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {getSocialLinks().map((s) => (
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
          <h2 className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Skills</h2>
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
