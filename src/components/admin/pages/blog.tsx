import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import { adminDeletePost, adminListPosts, adminUpsertPost } from "@/lib/content";
import { broadcastContentUpdated } from "@/lib/use-public-content";
import type { BlogPost } from "@/data/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADMIN_NEW_POST_EVENT } from "@/components/admin/palette";
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
  Field,
  FilterChips,
  StatusBanner,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

type PostFilter = "all" | "published" | "draft" | "override";

type AdminPost = {
  slug: string;
  title: string;
  date: string;
  tags: string[];
  is_published: boolean;
  is_override?: boolean;
  updatedAt: string;
  data: BlogPost;
};

type Draft = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string;
  body: string;
  is_published: boolean;
};

const emptyDraft = (): Draft => ({
  slug: "",
  title: "",
  date: new Date().toISOString().slice(0, 10),
  excerpt: "",
  tags: "",
  body: "",
  is_published: true,
});

function toDraft(row: AdminPost): Draft {
  return {
    slug: row.slug,
    title: row.data?.title ?? row.title,
    date: row.data?.date ?? row.date,
    excerpt: row.data?.excerpt ?? "",
    tags: (row.data?.tags ?? row.tags ?? []).join(", "),
    body: (row.data?.body ?? []).join("\n\n"),
    is_published: row.is_published,
  };
}

export function BlogAdminPage() {
  const [rows, setRows] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<PostFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await adminListPosts());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load posts");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onNew = () => setEditing(emptyDraft());
    window.addEventListener(ADMIN_NEW_POST_EVENT, onNew);
    return () => window.removeEventListener(ADMIN_NEW_POST_EVENT, onNew);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "published" && !r.is_published) return false;
      if (filter === "draft" && r.is_published) return false;
      if (filter === "override" && !r.is_override) return false;
      if (!q) return true;
      return (
        r.slug.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [rows, query, filter]);

  async function save() {
    if (!editing) return;
    if (!editing.slug.trim() || !editing.title.trim()) {
      setError("slug and title are required");
      return;
    }
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const body = editing.body
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter(Boolean);
      const tags = editing.tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await adminUpsertPost({
        data: {
          slug: editing.slug.trim(),
          title: editing.title.trim(),
          date: editing.date,
          excerpt: editing.excerpt,
          tags,
          body,
          is_published: editing.is_published,
        },
      });
      setNotice(`Saved post “${editing.slug}”. Public blog overlays on next load.`);
      broadcastContentUpdated();
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(slug: string) {
    if (!window.confirm(`Delete admin override for “${slug}”? Static seed remains if present.`)) {
      return;
    }
    setError(null);
    try {
      await adminDeletePost({ data: { slug } });
      setNotice(`Deleted override for “${slug}”.`);
      broadcastContentUpdated();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Blog"
        description="Write posts or override the static lab notes. Blank lines split paragraphs. Published rows appear on /blog; unpublished rows hide the same slug."
        actions={
          <>
            <Button type="button" variant="outline" onClick={() => void load()} disabled={loading}>
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Reload
            </Button>
            <Button type="button" onClick={() => setEditing(emptyDraft())}>
              <Plus className="size-4" />
              New post
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
            placeholder="Search slug, title, tags…"
            className="pl-9"
            aria-label="Search posts"
          />
        </div>
        <FilterChips
          value={filter}
          onChange={setFilter}
          options={[
            { value: "all", label: "All", count: rows.length },
            {
              value: "published",
              label: "Published",
              count: rows.filter((r) => r.is_published).length,
            },
            {
              value: "draft",
              label: "Draft",
              count: rows.filter((r) => !r.is_published).length,
            },
            {
              value: "override",
              label: "Overrides",
              count: rows.filter((r) => r.is_override).length,
            },
          ]}
        />
      </div>

      {editing ? (
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight">
              {editing.slug ? `Edit ${editing.slug}` : "New post"}
            </h2>
            <button
              type="button"
              className="text-sm text-muted-foreground hover:text-foreground"
              onClick={() => setEditing(null)}
            >
              Cancel
            </button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Slug" hint="URL segment — /blog/your-slug">
              <Input
                value={editing.slug}
                disabled={Boolean(editing.slug && rows.some((r) => r.slug === editing.slug))}
                onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                placeholder="my-post"
              />
            </Field>
            <Field label="Title">
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </Field>
            <Field label="Date">
              <Input
                type="date"
                value={editing.date}
                onChange={(e) => setEditing({ ...editing, date: e.target.value })}
              />
            </Field>
            <Field label="Tags" hint="Comma-separated">
              <Input
                value={editing.tags}
                onChange={(e) => setEditing({ ...editing, tags: e.target.value })}
                placeholder="Quantum, Tools"
              />
            </Field>
            <Field label="Excerpt" className="md:col-span-2">
              <Textarea
                rows={2}
                value={editing.excerpt}
                onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              />
            </Field>
            <Field
              label="Body"
              hint="Blank line = new paragraph. Keep it plain text — figures stay on seeded posts."
              className="md:col-span-2"
            >
              <Textarea
                rows={12}
                value={editing.body}
                onChange={(e) => setEditing({ ...editing, body: e.target.value })}
              />
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={editing.is_published}
                onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
              />
              Published (visible on public blog)
            </label>
            <Button type="button" onClick={() => void save()} disabled={saving}>
              {saving ? "Saving…" : "Save post"}
            </Button>
          </div>
        </AdminCard>
      ) : null}

      <div className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by slug, title, tag…"
          className="max-w-md"
          data-filter="blog"
        />
        <span className="text-xs text-subtle">{filtered.length} rows</span>
      </div>

      {loading && rows.length === 0 ? (
        <EmptyState title="Loading posts…" body="Fetching admin blog rows from the database." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No admin blog rows yet"
          body="Static posts still power /blog. New posts and overrides you save here appear once published."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-subtle">
              <tr>
                <th className="px-4 py-3 font-medium">Slug</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Tags</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((row) => (
                <tr key={row.slug} data-blog-row={row.slug} className="hover:bg-muted/40">
                  <td className="mono px-4 py-3 text-xs">{row.slug}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3 tabular-nums text-muted-foreground">{row.date}</td>
                  <td className="px-4 py-3 text-xs text-subtle">{row.tags.join(" · ")}</td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                        row.is_published
                          ? "bg-emerald-500/15 text-emerald-200"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {row.is_published ? "Live" : "Hidden"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
                        row.is_override
                          ? "bg-violet-500/15 text-violet-200"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                      {row.is_override ? "Override" : "Seed"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setEditing(toDraft(row))}
                      >
                        <Pencil className="size-3.5" />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => void remove(row.slug)}
                      >
                        <Trash2 className="size-3.5" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
