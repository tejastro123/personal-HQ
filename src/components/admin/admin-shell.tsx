import { Link, useLocation } from "@tanstack/react-router";
import { useCallback, useEffect, useState, type ReactNode } from "react";
import {
  Activity,
  Command,
  FolderKanban,
  FileText,
  Globe,
  Home,
  Inbox,
  LayoutDashboard,
  LogOut,
  ScrollText,
  ShieldCheck,
} from "lucide-react";
import { adminCheckAccess, adminDashboardStats } from "@/lib/content";
import { signOut } from "@/lib/auth/client";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";
import { AdminPalette } from "@/components/admin/palette";

const NAV = [
  { to: "/hq", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/hq/home", label: "Home content", icon: Home },
  { to: "/hq/projects", label: "Projects", icon: FolderKanban },
  { to: "/hq/blog", label: "Blog", icon: FileText },
  { to: "/hq/site", label: "Site settings", icon: Globe },
  { to: "/hq/messages", label: "Messages", icon: Inbox },
  { to: "/hq/resume", label: "Resume lenses", icon: ScrollText },
] as const;

type AccessState =
  | { status: "pending" }
  | { status: "denied"; reason: "signed-out" | "forbidden" | "error"; message?: string }
  | { status: "ok"; email: string };

export function AdminShell({ children }: { children: ReactNode }) {
  const { user, isPending } = useCurrentUserState();
  const [access, setAccess] = useState<AccessState>({ status: "pending" });
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    let cancelled = false;
    if (isPending) return;
    if (!user) {
      setAccess({ status: "denied", reason: "signed-out" });
      return;
    }
    adminCheckAccess()
      .then((res) => {
        if (!cancelled) setAccess({ status: "ok", email: res.email });
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : String(err);
        setAccess({
          status: "denied",
          reason: /forbidden/i.test(message) ? "forbidden" : "error",
          message,
        });
      });
    return () => {
      cancelled = true;
    };
  }, [user, isPending]);

  useEffect(() => {
    if (access.status !== "ok") return;
    let cancelled = false;
    adminDashboardStats()
      .then((s) => {
        if (!cancelled) setUnread(s.unread ?? 0);
      })
      .catch(() => {
        /* badge is best-effort */
      });
    return () => {
      cancelled = true;
    };
  }, [access.status]);

  const refreshUnread = useCallback(() => {
    if (access.status !== "ok") return;
    adminDashboardStats()
      .then((s) => setUnread(s.unread ?? 0))
      .catch(() => {});
  }, [access.status]);

  // Expose a tiny bus so child pages can refresh the unread badge after mutations.
  useEffect(() => {
    const handler = () => refreshUnread();
    window.addEventListener("admin:messages-changed", handler);
    return () => window.removeEventListener("admin:messages-changed", handler);
  }, [refreshUnread]);

  if (isPending || access.status === "pending") {
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background">
        <span className="mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
          Verifying operator access…
        </span>
      </div>
    );
  }

  if (access.status === "denied") {
    const currentEmail = user?.primaryEmail ?? null;
    return (
      <div className="flex min-h-dvh items-center justify-center bg-background px-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center">
          <ShieldCheck className="mx-auto size-8 text-accent" />
          <h1 className="mt-4 font-display text-2xl tracking-tight">Access denied</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {access.reason === "signed-out"
              ? "Sign in with an allowlisted admin email to open the console."
              : access.reason === "forbidden"
                ? "This account is signed in but not on the admin allowlist."
                : "Could not verify admin access. Try again or sign in again."}
          </p>
          {access.reason === "forbidden" && currentEmail ? (
            <div className="mt-3 space-y-2 rounded-md border border-border bg-muted/50 px-3 py-2 text-left text-xs text-muted-foreground">
              <p>
                Signed in as{" "}
                <span className="mono text-foreground">{currentEmail}</span>
              </p>
              <p>
                Allowed:{" "}
                <span className="mono text-foreground">tejas.mellimpudi@gmail.com</span>
              </p>
              <p className="text-subtle">
                In the Grok preview, sign-out is a no-op — the session is
                re-created automatically. Add the email above to the allowlist
                (or open the app outside the preview) to use the console.
              </p>
            </div>
          ) : null}
          <div className="mt-6 flex flex-col gap-2">
            {access.reason === "forbidden" ? (
              <button
                type="button"
                onClick={() => void signOut("/login?next=%2Fhq")}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Sign out &amp; switch account
              </button>
            ) : (
              <Link
                to="/login"
                search={{ next: "/hq" }}
                className="inline-flex h-10 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                Go to sign-in
              </Link>
            )}
            <Link
              to="/"
              className="inline-flex h-10 items-center justify-center rounded-md border border-border px-4 text-sm text-foreground hover:bg-muted"
            >
              Back to site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <AdminPalette open={paletteOpen} onOpenChange={setPaletteOpen} />
      <div className="mx-auto flex min-h-dvh max-w-7xl">
        <aside className="hidden w-60 shrink-0 border-r border-border lg:block">
          <div className="sticky top-0 flex h-dvh flex-col">
            <div className="relative overflow-hidden border-b border-border px-5 py-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,color-mix(in_oklab,var(--accent)_18%,transparent),transparent_55%)]" />
              <div className="relative">
                <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <ShieldCheck className="size-3.5 text-accent" />
                  Operator
                </div>
                <p className="mt-2 truncate font-display text-lg tracking-tight">Admin console</p>
                <p className="mt-1 truncate text-xs text-subtle">{access.email}</p>
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="mt-3 flex w-full items-center gap-2 rounded-md border border-border bg-background/60 px-2.5 py-2 text-xs text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  <Command className="size-3.5" />
                  <span className="flex-1 text-left">Commands</span>
                  <kbd className="mono rounded border border-border bg-muted px-1 text-[10px]">⌘K</kbd>
                </button>
              </div>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
              {NAV.map((item) => (
                <AdminNavLink
                  key={item.to}
                  item={item}
                  badge={item.to === "/hq/messages" ? unread : undefined}
                />
              ))}
            </nav>
            <div className="border-t border-border p-3">
              <button
                type="button"
                onClick={() => void signOut("/")}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <LogOut className="size-4" />
                Sign out
              </button>
              <Link
                to="/"
                className="mt-1 flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                <Activity className="size-4" />
                View public site
              </Link>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur lg:hidden">
            <div className="flex items-center justify-between px-4 py-3">
              <p className="font-display text-sm tracking-tight">Admin console</p>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setPaletteOpen(true)}
                  className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                  aria-label="Open command palette"
                >
                  <Command className="size-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => void signOut("/")}
                  className="rounded-md border border-border px-2 py-1 text-xs text-muted-foreground"
                >
                  Sign out
                </button>
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto px-3 pb-3">
              {NAV.map((item) => (
                <AdminNavLink
                  key={item.to}
                  item={item}
                  mobile
                  badge={item.to === "/hq/messages" ? unread : undefined}
                />
              ))}
            </nav>
          </header>

          <main className="flex-1 px-4 py-6 sm:px-6 lg:px-10 lg:py-10">{children}</main>
        </div>
      </div>
    </div>
  );
}

function AdminNavLink({
  item,
  mobile = false,
  badge,
}: {
  item: (typeof NAV)[number];
  mobile?: boolean;
  badge?: number;
}) {
  const location = useLocation();
  const active =
    "end" in item && item.end
      ? location.pathname === item.to
      : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`);
  const Icon = item.icon;
  return (
    <Link
      to={item.to}
      className={cn(
        "admin-nav-link flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors",
        mobile ? "shrink-0 border border-border whitespace-nowrap" : "",
        active
          ? "is-active"
          : "text-muted-foreground hover:bg-muted/60 hover:text-foreground",
      )}
    >
      <Icon className="size-4 shrink-0" />
      {item.label}
      {typeof badge === "number" && badge > 0 ? (
        <span
          className={cn(
            "ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[10px] font-medium tabular-nums",
            "bg-sky-500/20 text-sky-300",
          )}
        >
          {badge > 99 ? "99+" : badge}
        </span>
      ) : null}
    </Link>
  );
}
