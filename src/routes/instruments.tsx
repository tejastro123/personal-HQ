import { createFileRoute, Outlet, useRouterState } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

const InstrumentsPage = lazy(() => import("@/components/instruments/instruments-page"));

const CHILD_ROUTE_IDS = [
  "/instruments/qucpl",
  "/instruments/orbit",
  "/instruments/particles",
  "/instruments/chaos",
];

export const Route = createFileRoute("/instruments")({ component: InstrumentsRoute });

function InstrumentsRoute() {
  const matches = useRouterState({ select: (s) => s.matches });
  const isChild = matches.some(
    (m) => CHILD_ROUTE_IDS.includes(m.routeId) || CHILD_ROUTE_IDS.includes(m.id),
  );
  if (isChild) return <Outlet />;

  return (
    <Suspense
      fallback={
        <div className="flex h-dvh items-center justify-center bg-background text-sm text-muted-foreground">
          Loading instruments…
        </div>
      }
    >
      <InstrumentsPage />
    </Suspense>
  );
}
