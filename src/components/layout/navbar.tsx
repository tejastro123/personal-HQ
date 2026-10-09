import { Link, useLocation, useNavigate, useRouterState } from "@tanstack/react-router";
import { ArrowUpRight, Command, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { navItems, site } from "@/data/site";
import { usePublicSiteSettings } from "@/lib/use-public-content";
import { cn } from "@/lib/utils";

const SECTION_IDS = ["home", "work", "about", "skills", "world", "contact"];
const PATH_NAV = new Set(["/", "/playground", "/blog", "/instruments", "/systems", "/topology"]);

export function Navbar({ onSearch }: { onSearch: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const settings = usePublicSiteSettings();
  const navCtaLabel = settings.home.navCtaLabel || "Let's Work Together";
  const navCtaHref = settings.home.navCtaHref || "#contact";

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      doc.style.setProperty("--scroll-progress", String(ratio));
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (!PATH_NAV.has(pathname)) return;
    if (pathname !== "/") {
      setActive("");
      return;
    }
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
        "sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300",
        scrolled
          ? "border-border/80 bg-background/70 shadow-[0_8px_30px_-20px_color-mix(in_oklab,var(--accent)_40%,transparent)] backdrop-blur-xl"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link
          to="/"
          className="group inline-flex items-center gap-2 font-display text-sm font-semibold tracking-[0.18em] text-foreground"
          onClick={() => {
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <span className="relative size-1.5">
            <span className="absolute inset-0 rounded-full bg-accent shadow-[0_0_10px_var(--accent)] transition-transform duration-300 group-hover:scale-125" />
            <span className="absolute inset-0 animate-ping rounded-full bg-accent opacity-40" />
          </span>
          {(settings.name || site.name).toUpperCase()}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive =
              item.hash === undefined
                ? item.to === pathname ||
                  (item.to === "/instruments" && pathname.startsWith("/instruments")) ||
                  (item.to === "/systems" && pathname.startsWith("/systems"))
                : pathname === "/" && active === item.hash;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => go(item.to, item.hash)}
                className={cn(
                  "nav-link relative rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors duration-150 hover:text-foreground",
                  isActive && "nav-link-active text-foreground",
                )}
              >
                {item.label}
                <span
                  aria-hidden
                  className={cn(
                    "nav-link-underline absolute inset-x-3 -bottom-px h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-transparent transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                    isActive ? "scale-x-100 opacity-100" : "scale-x-0 opacity-0",
                  )}
                />
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
            <Link to="/resume" search={{ lens: "engineering" }}>Resume</Link>
          </Button>
          <Button
            size="sm"
            variant="warm"
            className="btn-sheen hidden pl-4 pr-3.5 sm:inline-flex"
            onClick={() => {
              if (navCtaHref.startsWith("#")) {
                go("/", navCtaHref.slice(1));
              } else {
                void navigate({ to: navCtaHref });
              }
            }}
          >
            {navCtaLabel}
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
      <div className="scroll-progress" aria-hidden />

      <div
        className={cn(
          "lg:hidden overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "max-h-[100dvh] opacity-100" : "max-h-0 opacity-0 border-transparent",
        )}
      >
        <nav className="flex flex-col px-4 py-4" aria-label="Mobile">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              type="button"
              onClick={() => go(item.to, item.hash)}
              className="group flex min-h-12 items-center justify-between border-b border-border text-left text-lg text-foreground transition-colors last:border-0 hover:text-accent"
              style={{ transitionDelay: open ? `${i * 30}ms` : "0ms" }}
            >
              {item.label}
              <ArrowUpRight className="size-4 -translate-x-1 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </button>
          ))}
          <div className="mt-4 flex flex-col gap-2">
            <Button
              variant="warm"
              className="btn-sheen"
              onClick={() => {
                if (navCtaHref.startsWith("#")) {
                  go("/", navCtaHref.slice(1));
                } else {
                  void navigate({ to: navCtaHref });
                }
                setOpen(false);
              }}
            >
              {navCtaLabel}
              <ArrowUpRight />
            </Button>
            <Button asChild variant="outline">
              <Link to="/resume" search={{ lens: "engineering" }}>Resume</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
