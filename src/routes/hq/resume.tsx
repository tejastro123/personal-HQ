import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { ResumeAdminPage } from "@/components/admin/pages/resume";

export const Route = createFileRoute("/hq/resume")({
  component: HqResumePage,
});

function HqResumePage() {
  return (
    <AdminShell>
      <ResumeAdminPage />
    </AdminShell>
  );
}
