import { useCallback, useEffect, useRef, useState } from "react";
import { Eye, Home, Save, Sparkles } from "lucide-react";
import {
  adminGetSiteSettings,
  adminSaveSiteSettings,
  type SiteSettings,
} from "@/lib/content";
import { broadcastContentUpdated } from "@/lib/use-public-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  AdminCard,
  AdminPageHeader,
  Field,
  StatusBanner,
} from "@/components/admin/ui";

type HomeDraft = SiteSettings["home"];

export function HomeAdminPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
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
      setSettings(next);
      baselineRef.current = JSON.stringify(next);
      setDirty(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load home content");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  function patchHome<K extends keyof HomeDraft>(key: K, value: HomeDraft[K]) {
    setSettings((prev) => {
      if (!prev) return prev;
      const next = {
        ...prev,
        home: { ...prev.home, [key]: value },
      };
      setDirty(JSON.stringify(next) !== baselineRef.current);
      return next;
    });
  }

  async function save() {
    if (!settings) return;
    setSaving(true);
    setError(null);
    setNotice(null);
    try {
      await adminSaveSiteSettings({ data: settings });
      baselineRef.current = JSON.stringify(settings);
      setDirty(false);
      setNotice("Main-site home content saved. Public pages pick this up on next load.");
      broadcastContentUpdated();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (loading && !settings) {
    return (
      <div className="space-y-6">
        <AdminPageHeader title="Home content" description="Loading main-site controls…" />
      </div>
    );
  }

  const home = settings?.home;

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Home content"
        description="Control the main website hero, about, CTA, skills, contact, and projects section copy. Values overlay static seeds; empty social/CTA fields fall back gracefully."
        actions={
          <>
            {dirty ? (
              <span className="inline-flex items-center gap-1.5 text-xs text-accent-warm">
                <span className="size-1.5 rounded-full bg-accent-warm" />
                Unsaved changes
              </span>
            ) : null}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm text-foreground hover:bg-muted"
            >
              <Eye className="size-4" />
              Preview site
            </a>
            <Button
              type="button"
              onClick={() => void save()}
              disabled={saving || !settings || !dirty}
            >
              <Save className="size-4" />
              {saving ? "Saving…" : "Save home content"}
            </Button>
          </>
        }
      />

      {error ? <StatusBanner kind="error">{error}</StatusBanner> : null}
      {notice ? <StatusBanner kind="success">{notice}</StatusBanner> : null}

      {home && settings ? (
        <>
          <AdminCard>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Home className="size-3.5 text-accent" />
              Hero
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              First screen on <span className="mono text-xs">/</span> — eyebrow, headline, CTAs,
              availability pulse.
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={home.heroEyebrow}
                  onChange={(e) => patchHome("heroEyebrow", e.target.value)}
                />
              </Field>
              <Field label="Availability line">
                <Input
                  value={home.availability}
                  onChange={(e) => patchHome("availability", e.target.value)}
                />
              </Field>
              <Field label="Availability domains" className="md:col-span-2">
                <Input
                  value={home.availabilityDomains}
                  onChange={(e) => patchHome("availabilityDomains", e.target.value)}
                />
              </Field>
              <Field label="Headline" className="md:col-span-2">
                <Textarea
                  rows={2}
                  value={home.heroHeadline}
                  onChange={(e) => patchHome("heroHeadline", e.target.value)}
                />
              </Field>
              <Field label="Primary CTA label">
                <Input
                  value={home.heroCtaPrimaryLabel}
                  onChange={(e) => patchHome("heroCtaPrimaryLabel", e.target.value)}
                />
              </Field>
              <Field label="Primary CTA href">
                <Input
                  value={home.heroCtaPrimaryHref}
                  onChange={(e) => patchHome("heroCtaPrimaryHref", e.target.value)}
                  placeholder="#work or /projects"
                />
              </Field>
              <Field label="Secondary CTA label">
                <Input
                  value={home.heroCtaSecondaryLabel}
                  onChange={(e) => patchHome("heroCtaSecondaryLabel", e.target.value)}
                />
              </Field>
              <Field label="Secondary CTA href">
                <Input
                  value={home.heroCtaSecondaryHref}
                  onChange={(e) => patchHome("heroCtaSecondaryHref", e.target.value)}
                />
              </Field>
            </div>

            <div className="preview-frame mt-5 overflow-hidden rounded-xl border border-border p-4">
              <p className="flex items-center gap-2 text-[11px] uppercase tracking-[0.14em] text-subtle">
                <Sparkles className="size-3.5 text-accent-2" />
                Live hero preview
                <span className="ml-auto rounded-full border border-border bg-background/60 px-2 py-0.5 text-[10px] text-muted-foreground">
                  drafts as you type
                </span>
              </p>
              <div className="mt-3 rounded-lg border border-border bg-background/70 p-4 sm:p-5">
                <p className="mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                  {home.heroEyebrow || "eyebrow"}
                </p>
                <p className="mt-2 font-display text-2xl leading-tight tracking-tight sm:text-3xl">
                  <span className="gradient-text">
                    {home.heroHeadline || "Headline preview"}
                  </span>
                </p>
                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                  {settings.shortBio || settings.bio || "Bio text appears here."}
                </p>
                <div className="mt-3 flex flex-wrap gap-2 text-xs">
                  <span className="rounded-md bg-accent px-2.5 py-1 text-accent-foreground">
                    {home.heroCtaPrimaryLabel || "Primary"}
                  </span>
                  <span className="rounded-md border border-border px-2.5 py-1 text-muted-foreground">
                    {home.heroCtaSecondaryLabel || "Secondary"}
                  </span>
                </div>
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-3 py-1 text-[11px] text-muted-foreground">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status opacity-40" />
                    <span className="relative inline-flex size-2 rounded-full bg-status" />
                  </span>
                  {home.availability || "Availability"}
                </div>
              </div>
            </div>
          </AdminCard>

          <div className="grid gap-4 lg:grid-cols-2">
            <AdminCard>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Home className="size-3.5 text-accent-2" />
                About
              </div>
              <div className="mt-4 space-y-4">
                <Field label="Statement">
                  <Textarea
                    rows={2}
                    value={home.aboutStatement}
                    onChange={(e) => patchHome("aboutStatement", e.target.value)}
                  />
                </Field>
                <Field
                  label="Body"
                  hint="Blank line = new paragraph"
                >
                  <Textarea
                    rows={6}
                    value={home.aboutBody}
                    onChange={(e) => patchHome("aboutBody", e.target.value)}
                  />
                </Field>
              </div>
            </AdminCard>

            <AdminCard>
              <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                <Sparkles className="size-3.5 text-accent-warm" />
                Bottom CTA
              </div>
              <div className="mt-4 grid gap-4">
                <Field label="Eyebrow">
                  <Input
                    value={home.ctaEyebrow}
                    onChange={(e) => patchHome("ctaEyebrow", e.target.value)}
                  />
                </Field>
                <Field label="Title">
                  <Input
                    value={home.ctaTitle}
                    onChange={(e) => patchHome("ctaTitle", e.target.value)}
                  />
                </Field>
                <Field label="Body">
                  <Input
                    value={home.ctaBody}
                    onChange={(e) => patchHome("ctaBody", e.target.value)}
                  />
                </Field>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Primary label">
                    <Input
                      value={home.ctaPrimaryLabel}
                      onChange={(e) => patchHome("ctaPrimaryLabel", e.target.value)}
                    />
                  </Field>
                  <Field label="Primary href">
                    <Input
                      value={home.ctaPrimaryHref}
                      onChange={(e) => patchHome("ctaPrimaryHref", e.target.value)}
                    />
                  </Field>
                  <Field label="Secondary label">
                    <Input
                      value={home.ctaSecondaryLabel}
                      onChange={(e) => patchHome("ctaSecondaryLabel", e.target.value)}
                    />
                  </Field>
                  <Field label="Secondary href">
                    <Input
                      value={home.ctaSecondaryHref}
                      onChange={(e) => patchHome("ctaSecondaryHref", e.target.value)}
                    />
                  </Field>
                </div>
              </div>
            </AdminCard>
          </div>

          <AdminCard>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              <Home className="size-3.5 text-sky-300" />
              Section headings
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <Field label="Skills title">
                <Input
                  value={home.skillsTitle}
                  onChange={(e) => patchHome("skillsTitle", e.target.value)}
                />
              </Field>
              <Field label="Skills subtitle">
                <Input
                  value={home.skillsSubtitle}
                  onChange={(e) => patchHome("skillsSubtitle", e.target.value)}
                />
              </Field>
              <Field label="Projects title">
                <Input
                  value={home.projectsTitle}
                  onChange={(e) => patchHome("projectsTitle", e.target.value)}
                />
              </Field>
              <Field label="Projects subtitle">
                <Input
                  value={home.projectsSubtitle}
                  onChange={(e) => patchHome("projectsSubtitle", e.target.value)}
                />
              </Field>
              <Field label="Contact title">
                <Input
                  value={home.contactTitle}
                  onChange={(e) => patchHome("contactTitle", e.target.value)}
                />
              </Field>
              <Field label="Contact subtitle">
                <Input
                  value={home.contactSubtitle}
                  onChange={(e) => patchHome("contactSubtitle", e.target.value)}
                />
              </Field>
              <Field label="Nav CTA label">
                <Input
                  value={home.navCtaLabel}
                  onChange={(e) => patchHome("navCtaLabel", e.target.value)}
                />
              </Field>
              <Field label="Nav CTA href">
                <Input
                  value={home.navCtaHref}
                  onChange={(e) => patchHome("navCtaHref", e.target.value)}
                />
              </Field>
            </div>
          </AdminCard>

          <AdminCard className="border-accent/30 bg-accent-soft/30">
            <p className="text-sm text-muted-foreground">
              Identity fields (name, tagline, bio, social, email) stay on{" "}
              <a href="/hq/site" className="text-foreground underline-offset-4 hover:underline">
                Site settings
              </a>
              . About body paragraphs split on blank lines. CTAs accept hashes (#work) or paths
              (/projects).
            </p>
          </AdminCard>
        </>
      ) : (
        <StatusBanner kind="error">Could not load home content.</StatusBanner>
      )}
    </div>
  );
}
