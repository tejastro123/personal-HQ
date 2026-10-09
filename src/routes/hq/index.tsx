import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { DashboardPage } from "@/components/admin/pages/dashboard";

export const Route = createFileRoute("/hq/")({
  component: HqIndexPage,
});

function HqIndexPage() {
  return (
    <AdminShell>
      <DashboardPage />
    </AdminShell>
  );
}
