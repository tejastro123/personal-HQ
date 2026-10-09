import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const ParticleLabPage = lazy(() => import("@/components/instruments/particle-lab"));

export const Route = createFileRoute("/instruments/particles")({ component: ParticleRoute });

function ParticleRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading particle lab…
        </div>
      }
    >
      <ParticleLabPage />
    </Suspense>
  );
}
