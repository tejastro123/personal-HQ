import { createFileRoute } from "@tanstack/react-router";
import { getHealthReport } from "@/lib/health";

/**
 * Public health/readiness endpoint.
 * No auth, no secrets — deploy/preview probes and the admin dashboard use it.
 */
export const Route = createFileRoute("/api/health")({
  server: {
    handlers: {
      GET: async () => {
        const report = await getHealthReport();
        const status = report.status === "down" ? 503 : 200;
        return new Response(JSON.stringify(report, null, 2), {
          status,
          headers: {
            "content-type": "application/json; charset=utf-8",
            "cache-control": "no-store",
          },
        });
      },
    },
  },
});
