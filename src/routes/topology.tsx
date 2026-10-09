import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const TopologyPage = lazy(() => import("@/components/topology/topology-page"));

export const Route = createFileRoute("/topology")({ component: TopologyRoute });

function TopologyRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading topology…
        </div>
      }
    >
      <TopologyPage />
    </Suspense>
  );
}
