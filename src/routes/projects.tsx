import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { Projects } from "@/components/home/projects";
import { SiteShell } from "@/components/layout/site-shell";

export const Route = createFileRoute("/projects")({ component: ProjectsArchive });

function ProjectsArchive() {
  const matches = useRouterState({ select: (s) => s.matches });
  const isDetail = matches.some(
    (m) => m.routeId === "/projects/$id" || m.id?.endsWith("/projects/$id"),
  );
  if (isDetail) return <Outlet />;
  return (
    <SiteShell>
      <div className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">Archive</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight sm:text-5xl">All work</h1>
      </div>
      <Projects archive />
    </SiteShell>
  );
}
