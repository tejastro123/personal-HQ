import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { HomeAdminPage } from "@/components/admin/pages/home";

export const Route = createFileRoute("/hq/home")({
  component: HqHomePage,
});

function HqHomePage() {
  return (
    <AdminShell>
      <HomeAdminPage />
    </AdminShell>
  );
}
