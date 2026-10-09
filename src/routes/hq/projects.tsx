import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { ProjectsAdminPage } from "@/components/admin/pages/projects";

export const Route = createFileRoute("/hq/projects")({
  component: HqProjectsPage,
});

function HqProjectsPage() {
  return (
    <AdminShell>
      <ProjectsAdminPage />
    </AdminShell>
  );
}
