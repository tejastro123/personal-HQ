import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  FileText,
  Github,
  Globe,
  Home,
  Instagram,
  Linkedin,
  Mail,
  Play,
  Youtube,
} from "lucide-react";
import type { ReactNode } from "react";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { linkButtons } from "@/data/content";
import { getSocialLinks, site } from "@/data/site";

const icons = {
  home: Home,
  work: Globe,
  play: Play,
  globe: Globe,
  file: FileText,
  mail: Mail,
  github: Github,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
};

const socialIcon = {
  github: "github",
  linkedin: "linkedin",
  instagram: "instagram",
  youtube: "youtube",
  x: "work",
} as const;

export function LinksPage() {
  const socials = getSocialLinks();
  const socialButtons = socials.map((s) => ({
    id: s.id,
    label: s.label,
    href: s.href,
    icon: socialIcon[s.id],
  }));
  const research = {
    id: "research",
    label: "Research",
    href: "/projects",
    icon: "globe",
  };
  const emailButton = site.email
    ? [{ id: "email", label: site.email, href: `mailto:${site.email}`, icon: "mail" as const }]
    : [];
  const allButtons = [
    linkButtons[0],
    linkButtons[1],
    ...socialButtons,
    ...emailButton,
    research,
    ...linkButtons.slice(2),
  ];
  return (
    <main className="relative isolate mx-auto flex min-h-dvh w-full max-w-md flex-col overflow-hidden px-5 py-10">
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-60" />
      <div className="hero-glow pointer-events-none absolute inset-0 opacity-70" />
      <div className="noise absolute inset-0" />
      <div className="relative flex flex-1 flex-col">
        <div className="flex justify-end">
          <ThemeToggle labeled />
        </div>
        <div className="mt-8 flex flex-col items-center text-center">
          <div className="flex size-24 items-center justify-center rounded-full border border-border bg-card font-display text-3xl tracking-tight shadow-[var(--shadow-border)]">
            T
          </div>
          <h1 className="mt-5 font-display text-3xl tracking-[0.18em]">
            {site.name.toUpperCase()}
          </h1>
          <p className="mono mt-2 text-[11px] uppercase tracking-[0.18em] text-subtle">
            Personal HQ · Links
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{site.shortBio}</p>
        </div>
        <ul className="mt-10 flex flex-col gap-3">
          {allButtons.map((b) => {
            const Icon = icons[b.icon as keyof typeof icons] ?? Globe;
            const inner = (
              <>
                <span className="flex size-10 items-center justify-center rounded-md bg-background">
                  <Icon className="size-4" />
                </span>
                <span className="flex-1 text-left font-medium">{b.label}</span>
                <ArrowUpRight className="size-4 text-subtle transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            );
            return (
              <li key={b.id}>
                <LinkButton href={b.href}>{inner}</LinkButton>
              </li>
            );
          })}
        </ul>
        <p className="mt-auto pt-10 text-center text-xs text-subtle">
          © 2026 {site.name}
        </p>
      </div>
    </main>
  );
}

function LinkButton({ href, children }: { href: string; children: ReactNode }) {
  const cls =
    "group flex min-h-14 items-center gap-3 rounded-xl border border-border bg-card/80 px-3 shadow-[var(--shadow-border)] backdrop-blur-sm transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-0.5 hover:border-border-strong hover:shadow-[var(--shadow-border-hover)]";
  if (href === "/")
    return (
      <Link to="/" className={cls}>
        {children}
      </Link>
    );
  if (href === "/projects")
    return (
      <Link to="/projects" className={cls}>
        {children}
      </Link>
    );
  if (href === "/playground")
    return (
      <Link to="/playground" className={cls}>
        {children}
      </Link>
    );
  if (href === "/resume")
    return (
      <Link to="/resume" search={{ lens: "engineering" }} className={cls}>
        {children}
      </Link>
    );
  if (href === "/contact")
    return (
      <Link to="/contact" className={cls}>
        {children}
      </Link>
    );
  return (
    <a href={href} className={cls}>
      {children}
    </a>
  );
}
