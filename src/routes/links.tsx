import { createFileRoute } from "@tanstack/react-router";
import { LinksPage } from "@/components/links/links-page";

export const Route = createFileRoute("/links")({ component: LinksRoute });

function LinksRoute() {
  return <LinksPage />;
}
