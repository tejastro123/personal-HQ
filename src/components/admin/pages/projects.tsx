import { useCallback, useEffect, useMemo, useState } from "react";
import { Pencil, Plus, RefreshCw, Search, Trash2 } from "lucide-react";
import {
  adminDeleteProject,
  adminListProjects,
  adminUpsertProject,
} from "@/lib/content";
import { broadcastContentUpdated } from "@/lib/use-public-content";
import type { Project } from "@/data/projects";
import { categories, type ProjectCategory } from "@/data/projects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ADMIN_NEW_PROJECT_EVENT } from "@/components/admin/palette";
import {
  AdminCard,
  AdminPageHeader,
  EmptyState,
  Field,
  FilterChips,
  StatusBanner,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

type ProjectFilter = "all" | "published" | "draft" | "override" | "featured";

type AdminProject = {
  id: string;
  title: string;
  category: string;
  status: string;
  featured: boolean;
  is_published: boolean;
  is_override?: boolean;
  year: number;
  updatedAt: string;
  data: Project;
};

type Draft = {
  id: string;
  title: string;
  category: string;
  status: string;
  year: string;
  description: string;
  longDescription: string;
  technologies: string;
  github: string;
  demo: string;
  featured: boolean;
  is_published: boolean;
};

const emptyDraft = (): Draft => ({
  id: "",
  title: "",
  category: "Software",
  status: "Active",
  year: String(new Date().getFullYear()),
  description: "",
  longDescription: "",
  technologies: "",
  github: "",
  demo: "",
  featured: false,
  is_published: true,
});

function toDraft(row: AdminProject): Draft {
  const p = row.data;
  return {
    id: row.id,
    title: p.title ?? row.title,
    category: (p.category ?? "Software") as string,
    status: p.status ?? "Active",
    year: String(p.year ?? new Date().getFullYear()),
    description: p.description ?? "",
    longDescription: p.longDescription ?? "",
    technologies: (p.technologies ?? []).join(", "),
    github: p.github ?? "",
    demo: p.demo ?? "",
    featured: Boolean(p.featured),
    is_published: row.is_published,
  };
}

export function ProjectsAdminPage() {
  const [rows, setRows] = useState<AdminProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<ProjectFilter>("all");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setRows(await adminListProjects());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load projects");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  useEffect(() => {
    const onNew = () => setEditing(emptyDraft());
    window.addEventListener(ADMIN_NEW_PROJECT_EVENT, onNew);
    return () => window.removeEventListener(ADMIN_NEW_PROJECT_EVENT, onNew);
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((r) => {
      if (filter === "published" && !r.is_published) return false;
      if (filter === "draft" && r.is_published) return false;
      if (filter === "override" && !r.is_override) return false;
      if (filter === "featured" && !r.data?.featured && !r.featured) return false;
      if (!q) return true;
      return (
        r.id.toLowerCase().includes(q) ||
        r.title.toLowerCase().includes(q) ||
        r.category.toLowerCase().includes(q)
      );
    });
  }, [rows, query, filter]);

  async function save() {
    if (!editing) return;
    if (!editing.id.trim() || !editing.title.trim()) {
      setError("id and title are required");
      return;
    }
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      const technologies = editing.technologies
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean);
      await adminUpsertProject({
        data: {
          id: editing.id.trim(),
          title: editing.title.trim(),
          category: editing.category as ProjectCategory,
          description: editing.description,
          longDescription: editing.longDescription,
          problem: "",
          approach: "",
          architecture: "",
          results: "",
          lessons: "",
          technologies,
          year: Number(editing.year) || new Date().getFullYear(),
          status: editing.status as Project["status"],
          github: editing.github || undefined,
          demo: editing.demo || undefined,
          country: "Remote",
          countryId: "remote",
          visual: "grid",
          featured: editing.featured,
          related: [],
          metrics: {},
          is_published: editing.is_published,
        },
      });
      setNotice(`Saved project “${editing.id}”. Public catalog overlays on next load.`);
      broadcastContentUpdated();
      setEditing(null);
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function remove(id: string) {
    if (!window.confirm(`Delete admin override for “${id}”? Static seed remains if present.`)) {
      return;
    }
    setError(null);
    try {
      await adminDeleteProject({ data: { id } });
      setNotice(`Deleted override for “${id}”.`);
      broadcastContentUpdated();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Delete failed");
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Projects"
        description="Create new projects or override static seeds. Published rows appear on /work; unpublished rows hide the same id from the public catalog."
        actions={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => void load()}
              disabled={loading}
            >
              <RefreshCw className={cn("size-4", loading && "animate-spin")} />
              Reload
            </Button>
            <Button type="button" onClick={() => setEditing(emptyDraft())}>
              <Plus className="size-4" />
              New project
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
            placeholder="Search id, title, category…"
            className="pl-9"
            aria-label="Search projects"
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
            {
              value: "featured",
              label: "Featured",
              count: rows.filter((r) => r.data?.featured || r.featured).length,
            },
          ]}
        />
      </div>

      {editing ? (
        <AdminCard>
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight">
              {editing.id ? `Edit ${editing.id}` : "New project"}
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
            <Field label="ID (slug)" hint="Stable id — changes here create a new catalog entry">
              <Input
                value={editing.id}
                disabled={Boolean(editing.id && rows.some((r) => r.id === editing.id))}
                onChange={(e) => setEditing({ ...editing, id: e.target.value })}
                placeholder="my-project"
              />
            </Field>
            <Field label="Title">
              <Input
                value={editing.title}
                onChange={(e) => setEditing({ ...editing, title: e.target.value })}
              />
            </Field>
            <Field label="Category">
              <select
                className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"
                value={editing.category}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
              >
                {categories
                  .filter((c) => c !== "All")
                  .map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
              </select>
            </Field>
            <Field label="Status">
              <select
                className="h-11 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground"
                value={editing.status}
                onChange={(e) => setEditing({ ...editing, status: e.target.value })}
              >
                {["Active", "Research", "Prototype", "Lab", "Archive"].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>
            <Field label="Year">
              <Input
                type="number"
                value={editing.year}
                onChange={(e) => setEditing({ ...editing, year: e.target.value })}
              />
            </Field>
            <Field label="Technologies" hint="Comma-separated">
              <Input
                value={editing.technologies}
                onChange={(e) => setEditing({ ...editing, technologies: e.target.value })}
                placeholder="React, TypeScript, Python"
              />
            </Field>
            <Field label="GitHub URL">
              <Input
                value={editing.github}
                onChange={(e) => setEditing({ ...editing, github: e.target.value })}
              />
            </Field>
            <Field label="Demo URL">
              <Input
                value={editing.demo}
                onChange={(e) => setEditing({ ...editing, demo: e.target.value })}
              />
            </Field>
            <Field label="Short description" className="md:col-span-2">
              <Textarea
                rows={3}
                value={editing.description}
                onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              />
            </Field>
            <Field label="Long description" className="md:col-span-2">
              <Textarea
                rows={6}
                value={editing.longDescription}
                onChange={(e) => setEditing({ ...editing, longDescription: e.target.value })}
              />
            </Field>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={editing.featured}
                onChange={(e) => setEditing({ ...editing, featured: e.target.checked })}
              />
              Featured
            </label>
            <label className="flex items-center gap-2 text-sm text-muted-foreground">
              <input
                type="checkbox"
                checked={editing.is_published}
                onChange={(e) => setEditing({ ...editing, is_published: e.target.checked })}
              />
              Published (visible on public site)
            </label>
            <Button type="button" onClick={() => void save()} disabled={saving}>
              {saving ? "Saving…" : "Save project"}
            </Button>
          </div>
        </AdminCard>
      ) : null}

      <div className="flex items-center gap-2">
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by id, title, category…"
          className="max-w-md"
          data-filter="projects"
        />
        <span className="text-xs text-subtle">{filtered.length} rows</span>
      </div>

      {loading && rows.length === 0 ? (
        <EmptyState title="Loading projects…" body="Fetching admin project rows from the database." />
      ) : filtered.length === 0 ? (
        <EmptyState
          title="No admin project rows yet"
          body="Static seeds still power the public site. Use New project to add or override entries — those rows win the catalog."
        />
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-[0.12em] text-subtle">
              <tr>
                <th className="px-4 py-3 font-medium">ID</th>
                <th className="px-4 py-3 font-medium">Title</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Published</th>
                <th className="px-4 py-3 font-medium">Featured</th>
                <th className="px-4 py-3 font-medium">Source</th>
                <th className="px-4 py-3 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filtered.map((row) => (
                <tr key={row.id} data-project-row={row.id} className="hover:bg-muted/40">
                  <td className="mono px-4 py-3 text-xs">{row.id}</td>
                  <td className="px-4 py-3">{row.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.category}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.status}</td>
                  <td className="px-4 py-3">
                    <Badge on={row.is_published}>{row.is_published ? "Live" : "Hidden"}</Badge>
                  </td>
                  <td className="px-4 py-3">
                    <Badge on={row.featured}>{row.featured ? "Featured" : "—"}</Badge>
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
                        onClick={() => void remove(row.id)}
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

function Badge({ on, children }: { on: boolean; children: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[11px] font-medium",
        on ? "bg-emerald-500/15 text-emerald-200" : "bg-muted text-muted-foreground",
      )}
    >
      {children}
    </span>
  );
}
