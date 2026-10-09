import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const OrbitLabPage = lazy(() => import("@/components/instruments/orbit-lab"));

export const Route = createFileRoute("/instruments/orbit")({ component: OrbitRoute });

function OrbitRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading orbit lab…
        </div>
      }
    >
      <OrbitLabPage />
    </Suspense>
  );
}
