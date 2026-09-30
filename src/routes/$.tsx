import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { SiteShell } from "@/components/layout/site-shell";

export const Route = createFileRoute("/$")({ component: NotFound });

function NotFound() {
  return (
    <SiteShell>
      <main className="mx-auto flex min-h-[60dvh] max-w-xl flex-col justify-center px-4 py-24">
        <p className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">404</p>
        <h1 className="mt-3 font-display text-4xl tracking-tight">This page is not in the system.</h1>
        <p className="mt-3 text-muted-foreground">The route does not exist. Head home or browse the work.</p>
        <div className="mt-8 flex gap-3">
          <Button asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/projects">Work</Link>
          </Button>
        </div>
      </main>
    </SiteShell>
  );
}
