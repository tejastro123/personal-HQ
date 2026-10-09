import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { SiteAdminPage } from "@/components/admin/pages/site";

export const Route = createFileRoute("/hq/site")({
  component: HqSitePage,
});

function HqSitePage() {
  return (
    <AdminShell>
      <SiteAdminPage />
    </AdminShell>
  );
}
