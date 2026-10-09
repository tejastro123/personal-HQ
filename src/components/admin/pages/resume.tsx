import { useCallback, useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import {
  adminResetLens,
  adminSaveLens,
  getPublicContent,
} from "@/lib/content";
import { broadcastContentUpdated } from "@/lib/use-public-content";
import type { ResumeLens } from "@/data/resume-lenses";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminCard,
  AdminPageHeader,
  Field,
  StatusBanner,
} from "@/components/admin/ui";
import { cn } from "@/lib/utils";

export function ResumeAdminPage() {
  const [lenses, setLenses] = useState<ResumeLens[]>([]);
  const [activeId, setActiveId] = useState<string>("engineering");
  const [draft, setDraft] = useState<ResumeLens | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const content = await getPublicContent();
      setLenses(content.lenses);
      const active = content.lenses.find((l) => l.id === activeId) ?? content.lenses[0];
      if (active) {
        setActiveId(active.id);
        setDraft({ ...active });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load lenses");
    } finally {
      setLoading(false);
    }
  }, [activeId]);

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function selectLens(id: string) {
    const lens = lenses.find((l) => l.id === id);
    if (!lens) return;
    setActiveId(id);
    setDraft({ ...lens });
    setNotice(null);
    setError(null);
  }

  async function save() {
    if (!draft) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await adminSaveLens({ data: draft });
      setNotice(`Saved resume lens “${draft.label}”. /resume picks this up on next load.`);
      broadcastContentUpdated();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function resetToSeed() {
    if (!draft || !window.confirm(`Reset “${draft.label}” to the static seed?`)) return;
    setError(null);
    try {
      await adminResetLens({ data: { id: draft.id } });
      setNotice(`Reset “${draft.id}” to seed values.`);
      broadcastContentUpdated();
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Reset failed");
    }
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Resume lenses"
        description="Edit the engineering / research / founder narratives on /resume. Saved rows overlay the static seed for that lens id."
        actions={
          <Button type="button" onClick={() => void save()} disabled={saving || !draft}>
            <Save className="size-4" />
            {saving ? "Saving…" : "Save lens"}
          </Button>
        }
      />

      {error ? <StatusBanner kind="error">{error}</StatusBanner> : null}
      {notice ? <StatusBanner kind="success">{notice}</StatusBanner> : null}

      <div className="flex flex-wrap gap-2">
        {lenses.map((lens) => (
          <button
            key={lens.id}
            type="button"
            onClick={() => selectLens(lens.id)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm transition-colors",
              activeId === lens.id
                ? "border-accent bg-accent/10 text-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {lens.label}
          </button>
        ))}
      </div>

      {loading && !draft ? (
        <AdminCard>Loading lenses…</AdminCard>
      ) : draft ? (
        <AdminCard>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-display text-xl tracking-tight">{draft.label}</h2>
            <Button type="button" variant="outline" size="sm" onClick={() => void resetToSeed()}>
              <RotateCcw className="size-3.5" />
              Reset to seed
            </Button>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <Field label="Label">
              <Input
                value={draft.label}
                onChange={(e) => setDraft({ ...draft, label: e.target.value })}
              />
            </Field>
            <Field label="Headline">
              <Input
                value={draft.headline}
                onChange={(e) => setDraft({ ...draft, headline: e.target.value })}
              />
            </Field>
            <Field label="Blurb" className="md:col-span-2">
              <Textarea
                rows={2}
                value={draft.blurb}
                onChange={(e) => setDraft({ ...draft, blurb: e.target.value })}
              />
            </Field>
            <Field label="Focus" className="md:col-span-2">
              <Textarea
                rows={2}
                value={draft.focus}
                onChange={(e) => setDraft({ ...draft, focus: e.target.value })}
              />
            </Field>
            <Field label="Project IDs" hint="Comma-separated">
              <Input
                value={draft.projectIds.join(", ")}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    projectIds: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
            <Field label="Skills emphasis" hint="Comma-separated">
              <Input
                value={draft.skillsEmphasis.join(", ")}
                onChange={(e) =>
                  setDraft({
                    ...draft,
                    skillsEmphasis: e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean),
                  })
                }
              />
            </Field>
          </div>
        </AdminCard>
      ) : (
        <StatusBanner kind="error">Could not load resume lenses.</StatusBanner>
      )}
    </div>
  );
}
