import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const QuCplLitePage = lazy(() => import("@/components/instruments/qucpl-lite"));

export const Route = createFileRoute("/instruments/qucpl")({ component: QuCplRoute });

function QuCplRoute() {
  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading QuCPL Lite…
        </div>
      }
    >
      <QuCplLitePage />
    </Suspense>
  );
}
