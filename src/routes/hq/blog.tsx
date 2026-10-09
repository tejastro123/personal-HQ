import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/admin-shell";
import { BlogAdminPage } from "@/components/admin/pages/blog";

export const Route = createFileRoute("/hq/blog")({
  component: HqBlogPage,
});

function HqBlogPage() {
  return (
    <AdminShell>
      <BlogAdminPage />
    </AdminShell>
  );
}
