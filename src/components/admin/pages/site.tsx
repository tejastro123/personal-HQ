import { useCallback, useEffect, useRef, useState } from "react";
import { Save } from "lucide-react";
import {
  adminGetSiteSettings,
  adminSaveSiteSettings,
  type SiteSettings,
} from "@/lib/content";
import { broadcastContentUpdated } from "@/lib/use-public-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AdminCard, AdminPageHeader, Field, StatusBanner } from "@/components/admin/ui";

export function SiteAdminPage() {
  const [form, setForm] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [dirty, setDirty] = useState(false);
  const baselineRef = useRef<string>("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const next = await adminGetSiteSettings();
      setForm(next);
      baselineRef.current = JSON.stringify(next);
      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load site settings");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function save() {
    if (!form) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await adminSaveSiteSettings({ data: form });
      baselineRef.current = JSON.stringify(form);
      setDirty(false);
      setNotice("Site settings saved. Contact/social surfaces read these values via the content layer.");
      broadcastContentUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  function patch<K extends keyof SiteSettings>(key: K, value: SiteSettings[K]) {
    setForm((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [key]: value };
      setDirty(JSON.stringify(next) !== baselineRef.current);
      return next;
    });
  }

  if (loading && !form) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Site settings" description="Loading…" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Site settings"
        description="Identity, contact, and social links. Values overlay the static site.ts defaults; empty social URLs stay hidden on the public site."
        actions={
          <>
            {dirty ? (
              <span className="text-xs text-accent-warm">Unsaved changes</span>
            ) : null}
            <Button
              type="button"
              onClick={() => void save()}
              disabled={saving || !form || !dirty}
            >
              <Save className="size-4" />
              {saving ? "Saving…" : "Save settings"}
            </Button>
          </>
        }
      />

      {error ? <StatusBanner kind="error">{error}</StatusBanner> : null}
      {notice ? <StatusBanner kind="success">{notice}</StatusBanner> : null}

      {form ? (
        <>
          <AdminCard>
            <h2 className="font-display text-lg tracking-tight">Identity</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Name">
                <Input value={form.name} onChange={(e) => patch("name", e.target.value)} />
              </Field>
              <Field label="Page title">
                <Input value={form.title} onChange={(e) => patch("title", e.target.value)} />
              </Field>
              <Field label="Tagline">
                <Input value={form.tagline} onChange={(e) => patch("tagline", e.target.value)} />
              </Field>
              <Field label="Short bio">
                <Input
                  value={form.shortBio}
                  onChange={(e) => patch("shortBio", e.target.value)}
                />
              </Field>
              <Field label="Footer line">
                <Input value={form.footer} onChange={(e) => patch("footer", e.target.value)} />
              </Field>
              <Field label="Email">
                <Input
                  type="email"
                  value={form.email}
                  onChange={(e) => patch("email", e.target.value)}
                />
              </Field>
              <Field label="Meta description" className="md:col-span-2">
                <Textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => patch("description", e.target.value)}
                />
              </Field>
              <Field label="Bio" className="md:col-span-2">
                <Textarea
                  rows={4}
                  value={form.bio}
                  onChange={(e) => patch("bio", e.target.value)}
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-display text-lg tracking-tight">Contact delivery</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Formspree ID is optional. When empty, the public contact form saves to the admin
              inbox and opens a mailto draft.
            </p>
            <div className="mt-4">
              <Field label="Formspree form ID">
                <Input
                  value={form.formspreeId}
                  onChange={(e) => patch("formspreeId", e.target.value)}
                  placeholder="xyzabcd"
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard>
            <h2 className="font-display text-lg tracking-tight">Social links</h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {(["github", "linkedin", "instagram", "youtube", "x"] as const).map((key) => (
                <Field key={key} label={key}>
                  <Input
                    value={form.social[key]}
                    onChange={(e) =>
                      patch("social", { ...form.social, [key]: e.target.value })
                    }
                    placeholder="https://…"
                  />
                </Field>
              ))}
            </div>
          </AdminCard>
        </>
      ) : (
        <StatusBanner kind="error">Could not load site settings.</StatusBanner>
      )}
    </div>
  );
}
