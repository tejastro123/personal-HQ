import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { projects, searchProjects } from "@/data/projects";
import { getSocialLinks } from "@/data/site";
import { useTheme } from "@/lib/use-theme";
import { cn } from "@/lib/utils";

export function CommandPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const { toggleTheme } = useTheme();
  const [query, setQuery] = useState("");
  const socials = getSocialLinks();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onOpenChange(!open);
      }
      if (e.key === "Escape") onOpenChange(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onOpenChange]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  const found = useMemo(() => searchProjects(query).slice(0, 6), [query]);

  function run(fn: () => void) {
    fn();
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80]">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close search"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-[min(92vw,40rem)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]">
        <Command label="Command palette" className="text-foreground" shouldFilter={false}>
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Search projects, jump, or run a command…"
            className="h-14 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
          />
          <Command.List className="max-h-[min(60vh,28rem)] overflow-auto p-2">
            <Command.Empty className="px-3 py-6 text-sm text-muted-foreground">
              Nothing matches. Try a technology or country.
            </Command.Empty>
            <Group heading="Navigate">
              <Item onSelect={() => run(() => void navigate({ to: "/" }))}>Go Home</Item>
              <Item onSelect={() => run(() => void navigate({ to: "/", hash: "work" }))}>
                View Projects
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/", hash: "about" }))}>
                About
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/", hash: "skills" }))}>
                Skills
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/", hash: "world" }))}>
                World Map
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/playground" }))}>
                Physics Playground
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/blog" }))}>
                Blog
              </Item>
              <Item onSelect={() => run(() => void navigate({ to: "/", hash: "contact" }))}>
                Contact
              </Item>
            </Group>
            <Group heading="Actions">
              <Item onSelect={() => run(() => toggleTheme())}>Toggle Theme</Item>
              <Item onSelect={() => run(() => void navigate({ to: "/resume" }))}>
                Download Resume
              </Item>
              {socials.map((s) => (
                <Item key={s.id} onSelect={() => run(() => window.open(s.href, "_blank", "noopener"))}>
                  Open {s.label}
                </Item>
              ))}
              <Item onSelect={() => run(() => onOpenChange(false))}>Close</Item>
            </Group>
            {found.length ? (
              <Group heading="Projects">
                {found.map((p) => (
                  <Item
                    key={p.id}
                    onSelect={() =>
                      run(() => void navigate({ to: "/projects/$id", params: { id: p.id } }))
                    }
                  >
                    <span>{p.title}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{p.category}</span>
                  </Item>
                ))}
              </Group>
            ) : null}
            {!query ? (
              <p className="px-3 py-2 text-[11px] uppercase tracking-[0.16em] text-subtle">
                {projects.length} indexed · ⌘K / Ctrl K
              </p>
            ) : null}
          </Command.List>
        </Command>
      </div>
    </div>
  );
}

function Group({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <Command.Group
      heading={heading}
      className="[&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-2 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-muted-foreground"
    >
      {children}
    </Command.Group>
  );
}

function Item({ children, onSelect }: { children: ReactNode; onSelect: () => void }) {
  return (
    <Command.Item
      onSelect={onSelect}
      className={cn(
        "flex min-h-10 cursor-pointer items-center rounded-md px-3 text-sm text-foreground",
        "data-[selected=true]:bg-muted",
      )}
    >
      {children}
    </Command.Item>
  );
}
