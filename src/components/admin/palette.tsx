import { Command } from "cmdk";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  FileText,
  FolderKanban,
  Globe,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  Plus,
  ScrollText,
  ExternalLink,
} from "lucide-react";
import { signOut } from "@/lib/auth/client";

type AdminAction = {
  id: string;
  label: string;
  hint?: string;
  icon: React.ReactNode;
  group: string;
  run: () => void;
};

export const ADMIN_NEW_PROJECT_EVENT = "admin:new-project";
export const ADMIN_NEW_POST_EVENT = "admin:new-post";

export function AdminPalette({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

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

  const actions: AdminAction[] = [
    {
      id: "nav-dashboard",
      label: "Dashboard",
      icon: <LayoutDashboard className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq" }),
    },
    {
      id: "nav-home",
      label: "Home content",
      hint: "Hero, about, CTA, section copy",
      icon: <Home className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/home" }),
    },
    {
      id: "nav-projects",
      label: "Projects",
      icon: <FolderKanban className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/projects" }),
    },
    {
      id: "nav-blog",
      label: "Blog",
      icon: <FileText className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/blog" }),
    },
    {
      id: "nav-site",
      label: "Site settings",
      icon: <Globe className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/site" }),
    },
    {
      id: "nav-messages",
      label: "Messages",
      icon: <Inbox className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/messages" }),
    },
    {
      id: "nav-resume",
      label: "Resume lenses",
      icon: <ScrollText className="size-4" />,
      group: "Navigate",
      run: () => void navigate({ to: "/hq/resume" }),
    },
    {
      id: "new-project",
      label: "New project",
      hint: "Open the project editor",
      icon: <Plus className="size-4" />,
      group: "Create",
      run: () => {
        void navigate({ to: "/hq/projects" });
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent(ADMIN_NEW_PROJECT_EVENT));
        }, 50);
      },
    },
    {
      id: "new-post",
      label: "New blog post",
      hint: "Open the post editor",
      icon: <Plus className="size-4" />,
      group: "Create",
      run: () => {
        void navigate({ to: "/hq/blog" });
        window.setTimeout(() => {
          window.dispatchEvent(new CustomEvent(ADMIN_NEW_POST_EVENT));
        }, 50);
      },
    },
    {
      id: "public-home",
      label: "Open public site",
      icon: <ExternalLink className="size-4" />,
      group: "Public",
      run: () => window.open("/", "_blank", "noopener,noreferrer"),
    },
    {
      id: "public-projects",
      label: "Public projects",
      icon: <ExternalLink className="size-4" />,
      group: "Public",
      run: () => window.open("/projects", "_blank", "noopener,noreferrer"),
    },
    {
      id: "public-blog",
      label: "Public blog",
      icon: <ExternalLink className="size-4" />,
      group: "Public",
      run: () => window.open("/blog", "_blank", "noopener,noreferrer"),
    },
    {
      id: "sign-out",
      label: "Sign out",
      icon: <LogOut className="size-4" />,
      group: "Session",
      run: () => void signOut("/login"),
    },
  ];

  const q = query.trim().toLowerCase();
  const filtered = q
    ? actions.filter(
        (a) =>
          a.label.toLowerCase().includes(q) ||
          a.group.toLowerCase().includes(q) ||
          (a.hint ?? "").toLowerCase().includes(q),
      )
    : actions;

  const groups = [...new Set(filtered.map((a) => a.group))];

  function run(fn: () => void) {
    fn();
    onOpenChange(false);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[90]">
      <button
        type="button"
        className="absolute inset-0 bg-background/70 backdrop-blur-sm"
        aria-label="Close admin palette"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative mx-auto mt-[12vh] w-[min(92vw,36rem)] overflow-hidden rounded-xl border border-border bg-card shadow-[var(--shadow-lift)]">
        <Command label="Admin palette" className="text-foreground" shouldFilter>
          <Command.Input
            autoFocus
            value={query}
            onValueChange={setQuery}
            placeholder="Jump to a page, create content, open public site…"
            className="h-14 w-full border-b border-border bg-transparent px-4 text-sm outline-none placeholder:text-subtle"
          />
          <Command.List className="max-h-[min(60vh,26rem)] overflow-auto p-2">
            <Command.Empty className="px-3 py-6 text-sm text-muted-foreground">
              No admin action matches that.
            </Command.Empty>
            {groups.map((group) => (
              <Command.Group key={group} heading={group}>
                {filtered
                  .filter((a) => a.group === group)
                  .map((action) => (
                    <Command.Item
                      key={action.id}
                      value={`${action.group} ${action.label}`}
                      data-admin-action={action.id}
                      onSelect={() => run(action.run)}
                      className="flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-left text-sm text-foreground aria-selected:bg-muted"
                    >
                      <span className="text-muted-foreground">{action.icon}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate">{action.label}</span>
                        {action.hint ? (
                          <span className="block truncate text-xs text-subtle">{action.hint}</span>
                        ) : null}
                      </span>
                    </Command.Item>
                  ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
        <div className="flex items-center justify-between border-t border-border px-4 py-2 text-[11px] text-subtle">
          <span>
            <kbd className="mono rounded border border-border bg-muted px-1">⌘K</kbd> toggle ·{" "}
            <kbd className="mono rounded border border-border bg-muted px-1">↑↓</kbd> move ·{" "}
            <kbd className="mono rounded border border-border bg-muted px-1">↵</kbd> run
          </span>
          <span>Operator console</span>
        </div>
      </div>
    </div>
  );
}
