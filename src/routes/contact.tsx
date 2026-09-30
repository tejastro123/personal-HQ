import { createFileRoute } from "@tanstack/react-router";
import { Contact } from "@/components/home/contact";
import { SiteShell } from "@/components/layout/site-shell";

export const Route = createFileRoute("/contact")({ component: ContactPage });

function ContactPage() {
  return (
    <SiteShell>
      <div className="pt-8">
        <Contact standalone />
      </div>
    </SiteShell>
  );
}
