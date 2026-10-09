import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ChaosLabPage = lazy(() => import("@/components/instruments/chaos-lab"));

export const Route = createFileRoute("/instruments/chaos")({ component: ChaosRoute });

function ChaosRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading Chaos Lab…
        </div>
      }
    >
      <ChaosLabPage />
    </Suspense>
  );
}
