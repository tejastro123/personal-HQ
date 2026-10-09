import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect } from "react";
import { About } from "@/components/home/about";
import { Contact } from "@/components/home/contact";
import { Cta } from "@/components/home/cta";
import { Hero } from "@/components/home/hero";
import { Projects } from "@/components/home/projects";
import { Skills } from "@/components/home/skills";
import { Timeline } from "@/components/home/timeline";
import { SiteShell } from "@/components/layout/site-shell";
import { site } from "@/data/site";
import { useContentVersionPoll } from "@/lib/use-public-content";

const WorldMap = lazy(() => import("@/components/map/world-map"));

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  useContentVersionPoll(true);
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    if (!hash) return;
    requestAnimationFrame(() => {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
    });
  }, []);

  return (
    <SiteShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: site.name,
            description: site.description,
            jobTitle: "Student, researcher, builder",
            url: "/",
          }),
        }}
      />
      <Hero />
      <Projects />
      <Suspense
        fallback={
          <section id="world" className="scroll-mt-24 border-t border-border py-28">
            <div className="mx-auto max-w-6xl px-4 text-sm text-muted-foreground">
              Loading map…
            </div>
          </section>
        }
      >
        <WorldMap />
      </Suspense>
      <About />
      <Skills />
      <Timeline />
      <Cta />
      <Contact />
    </SiteShell>
  );
}
