import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, MailOpen, RefreshCw, Search, Trash2 } from "lucide-react";
import {
  adminDeleteMessage,
  adminListMessages,
  adminMarkMessageRead,
  type ContactMessage,
} from "@/lib/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
  FilterChips,
  StatusBanner,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

type MsgFilter = "all" | "unread" | "read";

export function MessagesAdminPage() {
  const [rows, setRows] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [openId, setOpenId] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<MsgFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await adminListMessages());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load messages");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const unreadCount = useMemo(() => rows.filter((m) => !m.is_read).length, [rows]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((m) => {
      if (filter === "unread" && m.is_read) return false;
      if (filter === "read" && !m.is_read) return false;
      if (!q) return true;
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.subject ?? "").toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter]);

  async function markRead(id: number) {
    try {
      await adminMarkMessageRead({ data: { id } });
      setRows((prev) => prev.map((m) => (m.id === id ? { ...m, is_read: true } : m)));
      window.dispatchEvent(new CustomEvent("admin:messages-changed"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark read");
    }
  }

  async function markAllRead() {
    const unreadIds = rows.filter((m) => !m.is_read).map((m) => m.id);
    if (unreadIds.length === 0) return;
    try {
      for (const id of unreadIds) {
        await adminMarkMessageRead({ data: { id } });
      }
      setRows((prev) => prev.map((m) => ({ ...m, is_read: true })));
      setNotice(`Marked ${unreadIds.length} message(s) read.`);
      window.dispatchEvent(new CustomEvent("admin:messages-changed"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark all read");
    }
  }

  async function remove(id: number) {
    if (!window.confirm("Delete this message permanently?")) return;
    try {
      await adminDeleteMessage({ data: { id } });
      setNotice("Message deleted.");
      setRows((prev) => prev.filter((m) => m.id !== id));
      window.dispatchEvent(new CustomEvent("admin:messages-changed"));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Messages"
        description="Contact form submissions saved to the database. Search the inbox, filter unread, and reply by email."
        actions={
          <>
            {unreadCount > 0 ? (
              <Button type="button" variant="outline" onClick={() => void markAllRead()}>
                <Check className="size-4" />
                Mark all read ({unreadCount})
              </Button>
            ) : null}
            <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Reload
            </Button>
          </>
        }
      />

      {error ? <StatusBanner kind="error">{error}</StatusBanner> : null}
      {notice ? <StatusBanner kind="success">{notice}</StatusBanner> : null}

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative min-w-[14rem] flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-subtle" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, subject, body…"
            className="pl-9"
            aria-label="Search messages"
          />
        </div>
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All", count: rows.length },
            { value: "unread", label: "Unread", count: unreadCount },
            { value: "read", label: "Read", count: rows.length - unreadCount },
          ]}
        />
      </div>

      {loading && rows.length === 0 ? (
        <EmptyState title="Loading inbox…" body="Fetching contact messages." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title={rows.length === 0 ? "Inbox is empty" : "No matches"}
          body={
            rows.length === 0
              ? "Messages submitted from the public contact form will land here."
              : "Try a different search or filter."
          }
        />
      ) : (
        <div className="space-y-3">
          {filtered.map((msg) => {
            const open = openId === msg.id;
            return (
              <AdminCard
                key={msg.id}
                pad={false}
                className={cn("overflow-hidden", !msg.is_read && "border-sky-500/30")}
              >
                <button
                  type="button"
                  data-message-row={msg.id}
                  onClick={() => setOpenId(open ? null : msg.id)}
                  className="flex w-full flex-wrap items-center gap-3 px-4 py-3 text-left hover:bg-muted/40"
                >
                  <span
                    className={cn(
                      "size-2 shrink-0 rounded-full",
                      msg.is_read ? "bg-border" : "bg-sky-400",
                    )}
                  />
                  <span className="font-medium">{msg.name}</span>
                  <span className="text-sm text-muted-foreground">{msg.email}</span>
                  {msg.subject ? (
                    <span className="truncate text-sm text-subtle">· {msg.subject}</span>
                  ) : null}
                  <span className="mono ml-auto text-xs tabular-nums text-subtle">
                    {new Date(msg.created_at).toLocaleString()}
                  </span>
                </button>
                {open ? (
                  <div className="border-t border-border px-4 py-4">
                    <p className="whitespace-pre-wrap text-sm leading-relaxed text-foreground">
                      {msg.message}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <a
                        href={`mailto:${msg.email}?subject=${encodeURIComponent(
                          msg.subject ? `Re: ${msg.subject}` : "Re: your message",
                        )}&body=${encodeURIComponent(
                          `\n\n---\nReplying to ${msg.name} <${msg.email}>:\n${msg.message}`,
                        )}`}
                        className="inline-flex h-9 items-center gap-2 rounded-md bg-primary px-3 text-sm text-primary-foreground hover:bg-primary/90"
                      >
                        <MailOpen className="size-4" />
                        Reply by email
                      </a>
                      {!msg.is_read ? (
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => void markRead(msg.id)}
                        >
                          <Check className="size-3.5" />
                          Mark read
                        </Button>
                      ) : null}
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => void remove(msg.id)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    </div>
                  </div>
                ) : null}
              </AdminCard>
            );
          })}
        </div>
      )}
    </div>
  );
}
