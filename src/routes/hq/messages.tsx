import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { MessagesAdminPage } from "@/components/admin/pages/messages";

export const Route = createFileRoute("/hq/messages")({
  component: HqMessagesPage,
});

function HqMessagesPage() {
  return (
    <AdminShell>
      <MessagesAdminPage />
    </AdminShell>
  );
}
