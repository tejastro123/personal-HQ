import { Link, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navItems, site } from "@/data/site";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["home", "work", "about", "skills", "world", "contact"];

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (pathname !== "/") return;
    const els = SECTION_IDS.map((id) => document.getElementById(id)).filter(
      (el): el is HTMLElement => !!el,
    );
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: [0.1, 0.25, 0.5] },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [pathname]);

  function go(to: string, hash?: string) {
    setOpen(false);
    if (to !== "/") {
      void navigate({ to });
      return;
    }
    if (pathname === "/" && hash) {
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      window.history.replaceState(null, "", `/#${hash}`);
      setActive(hash);
      return;
    }
    void navigate({ to: "/", hash });
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border/80 bg-background/70 backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="font-display text-sm font-semibold tracking-[0.18em] text-foreground"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          {site.name.toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.to === "/playground" || item.to === "/blog"
                ? pathname === item.to
                : pathname === "/" && active === item.hash;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.to, item.hash)}
                className={cn(
                  "relative rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground",
                  isActive && "text-foreground",
                )}
              >
                {item.label}
                {isActive ? (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-foreground" />
                ) : null}
              </button>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="hidden sm:inline-flex"
            onClick={onSearch}
            aria-label="Open command palette"
          >
            <Command />
          </Button>
          <ThemeToggle />
          <Button asChild variant="ghost" size="sm" className="hidden md:inline-flex">
            <Link to="/resume">Resume</Link>
          </Button>
          <Button
            size="sm"
            variant="warm"
            className="hidden sm:inline-flex pl-4 pr-3.5"
            onClick={() => go("/", "contact")}
          >
            Let's Work Together
            <ArrowUpRight />
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.to, item.hash)}
              className="flex min-h-12 items-center justify-between border-b border-border text-left text-lg text-foreground last:border-0"
            >
              {item.label}
            </button>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button variant="warm" onClick={() => go("/", "contact")}>
              Let's Work Together
              <ArrowUpRight />
            </Button>
            <Button asChild variant="outline">
              <Link to="/resume">Resume</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
