import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/ui/tilt";
import { DepthReveal } from "@/components/ui/depth";
import { ProjectVisual } from "@/components/project-visual";
import { SectionHeading } from "@/components/reveal";
import { SectionStage } from "@/components/ui/section-stage";
import {
  categories,
  type Category,
  type Project,
} from "@/data/projects";
import {
  categoryActiveStyle,
  categoryChipClass,
  isFlagshipProject,
  statusDotClass,
  statusTextClass,
} from "@/lib/categories";
import { usePublicProjects, usePublicSiteSettings } from "@/lib/use-public-content";
import { cn } from "@/lib/utils";

const CASE_STUDY_IDS = ["quickide", "personal-rag", "stock-signal-generator"];

export function Projects({ archive = false }: { archive?: boolean }) {
  const [cat, setCat] = useState<Category>("All");
  const reduce = useReducedMotion();
  const allProjects = usePublicProjects();
  const settings = usePublicSiteSettings();
  const home = settings.home;
  const list = useMemo(() => {
    const filtered =
      cat === "All" ? allProjects : allProjects.filter((p) => p.category === cat);
    return archive ? filtered : filtered.filter((p) => p.featured).slice(0, 9);
  }, [cat, archive, allProjects]);

  const caseStudies = useMemo(
    () =>
      CASE_STUDY_IDS.map((id) => allProjects.find((p) => p.id === id)).filter(
        (p): p is Project => Boolean(p),
      ),
    [allProjects],
  );

  return (
    <SectionStage id="work">
      <DepthReveal rotate={5}>
        <div className="section-heading-hud">
          <SectionHeading
            eyebrow={archive ? "Archive" : "Selected Work"}
            title={
              archive
                ? "A collection of experiments, systems, research projects and products."
                : home.projectsTitle ||
                  "A collection of experiments, systems, research projects and products."
            }
            subtitle={
              home.projectsSubtitle ||
              "Real GitHub projects and this site's physics playground. Filter without leaving the page."
            }
          />
        </div>
      </DepthReveal>

        {!archive ? (
          <DepthReveal delay={0.08}>
            <div className="mt-10">
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="size-3.5 text-accent-2" />
                Case studies
              </div>
              <div className="mt-4 grid gap-4 lg:grid-cols-3">
                {caseStudies.map((project) => (
                  <CaseStudyCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </DepthReveal>
        ) : null}

        <div className="mt-10 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              data-filter={c}
              onClick={() => setCat(c)}
              style={cat === c ? categoryActiveStyle(c) : undefined}
              className={categoryChipClass(c, cat === c)}
            >
              {c}
            </button>
          ))}
        </div>
        <motion.div
          layout
          className={cn(
            "mt-8 grid gap-3",
            archive ? "sm:grid-cols-2 lg:grid-cols-3" : "sm:grid-cols-2 lg:grid-cols-3",
          )}
        >
          <AnimatePresence mode="popLayout">
            {list.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, delay: reduce ? 0 : Math.min(i * 0.03, 0.3) }}
              >
                <ProjectCard project={project} dense={archive} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        {!archive ? (
          <div className="mt-10">
            <Button asChild variant="outline">
              <Link to="/projects">
                View the full archive
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        ) : null}
    </SectionStage>
  );
}

function CaseStudyCard({ project }: { project: Project }) {
  return (
    <TiltCard intensity={6} className="h-full">
      <Link
        to="/projects/$id"
        params={{ id: project.id }}
        className="group card-featured frame-panel flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-transform duration-300"
      >
      <div className="relative overflow-hidden">
        <ProjectVisual
          visual={project.visual}
          category={project.category}
          className="aspect-[16/10] transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex flex-wrap gap-1.5">
          <Badge category={project.category}>{project.category}</Badge>
          <Badge status={project.status}>{project.status}</Badge>
          <Badge variant="accent">Case study</Badge>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center gap-2 text-xs text-subtle">
          <span className="mono">{project.year}</span>
          <span>·</span>
          <span className={cn("inline-flex items-center gap-1.5", statusTextClass(project.status))}>
            <span className={cn("size-1.5 rounded-full", statusDotClass(project.status))} />
            {project.status}
          </span>
        </div>
        <h3 className="mt-2 font-display text-xl tracking-tight">{project.title}</h3>
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {project.description}
        </p>
        <p className="mono mt-4 text-[11px] text-subtle">
          {project.technologies.slice(0, 5).join(" · ")}
        </p>
        <span className="mt-auto inline-flex items-center gap-1 pt-4 text-sm text-foreground">
          Read the case study
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </span>
      </div>
      </Link>
    </TiltCard>
  );
}

export function ProjectCard({
  project,
  dense = false,
}: {
  project: Project;
  dense?: boolean;
}) {
  const flagship = isFlagshipProject(project.id);
  return (
    <TiltCard intensity={8} className="h-full">
      <Link
        to="/projects/$id"
        params={{ id: project.id }}
        className={cn(
          "group frame-panel relative flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-[transform,box-shadow,border-color] duration-300 ease-out",
          flagship
            ? "card-featured"
            : "shadow-[var(--shadow-border)] hover:shadow-[var(--shadow-border-hover)]",
        )}
      >
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 z-10 h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        <div className="relative overflow-hidden">
          <ProjectVisual
            visual={project.visual}
            category={project.category}
            className={cn(
              "transition-transform duration-500 group-hover:scale-[1.04]",
              dense ? "aspect-[16/9]" : "aspect-[16/10]",
            )}
          />
          <div className="absolute left-2.5 top-2.5 flex flex-wrap gap-1.5">
            <Badge category={project.category}>{project.category}</Badge>
            <Badge status={project.status}>{project.status}</Badge>
            {flagship ? <Badge variant="accent">Featured</Badge> : null}
          </div>
        </div>
        <div className="relative z-10 flex flex-1 flex-col px-3.5 pb-3.5 pt-3.5">
          <div className="flex items-center gap-2 text-[11px] text-subtle">
            <span className="mono">{project.year}</span>
            <span>·</span>
            <span className={cn("inline-flex items-center gap-1.5", statusTextClass(project.status))}>
              <span className={cn("size-1.5 rounded-full", statusDotClass(project.status))} />
              {project.status}
            </span>
          </div>
          <h3
            className={cn(
              "mt-1.5 font-display tracking-tight",
              dense ? "text-base" : "text-lg",
            )}
          >
            {project.title}
          </h3>
          <p
            className={cn(
              "mt-1.5 overflow-hidden text-sm leading-relaxed text-muted-foreground transition-[max-height,opacity,margin] duration-300",
              dense
                ? "line-clamp-2"
                : "max-h-0 opacity-0 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100 max-md:mt-2 max-md:max-h-20 max-md:opacity-100",
            )}
          >
            {project.description}
          </p>
          <div className="mt-auto flex flex-wrap gap-1 pt-2.5">
            {project.technologies.slice(0, dense ? 3 : 4).map((tech) => (
              <span
                key={tech}
                className="mono rounded-full border border-border bg-background px-2 py-0.5 text-[10px] uppercase tracking-wide text-subtle"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </TiltCard>
  );
}

