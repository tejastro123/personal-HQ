import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const SystemsPage = lazy(() => import("@/components/systems/systems-page"));

export const Route = createFileRoute("/systems")({ component: SystemsRoute });

function SystemsRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading systems…
        </div>
      }
    >
      <SystemsPage />
    </Suspense>
  );
}
