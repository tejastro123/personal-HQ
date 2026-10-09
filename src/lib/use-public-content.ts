import { useCallback, useEffect, useRef, useState } from "react";
import {
  getPublicContent,
  getPublicContentVersion,
  getPublicSiteSettings,
  listPublicPosts,
  listPublicProjects,
  submitContactMessage,
  type SiteSettings,
} from "@/lib/content";
import { posts as staticPosts, type BlogPost } from "@/data/blog";
import { projects as staticProjects, type Project } from "@/data/projects";
import { resumeLenses as staticLenses, type ResumeLens } from "@/data/resume-lenses";
import { site as staticSite } from "@/data/site";
import { aboutBody as staticAboutBody, aboutStatement as staticAboutStatement } from "@/data/content";

export function defaultHomeSettings(): SiteSettings["home"] {
  return {
    heroEyebrow: staticSite.eyebrow,
    heroHeadline: "Building ambitious ideas into real systems.",
    heroCtaPrimaryLabel: "Explore My Work",
    heroCtaPrimaryHref: "#work",
    heroCtaSecondaryLabel: "Let's Connect",
    heroCtaSecondaryHref: "#contact",
    availability: staticSite.availability,
    availabilityDomains: staticSite.availabilityDomains,
    aboutStatement: staticAboutStatement,
    aboutBody: staticAboutBody.join("\n\n"),
    ctaEyebrow: "Next",
    ctaTitle: "Have an ambitious idea?",
    ctaBody: "Let's turn it into something real.",
    ctaPrimaryLabel: "Let's work together",
    ctaPrimaryHref: "#contact",
    ctaSecondaryLabel: "View My Work",
    ctaSecondaryHref: "#work",
    skillsTitle: "A working stack, not a scoreboard.",
    skillsSubtitle: "No fake proficiency bars. These are the languages and ideas in active use.",
    contactTitle: "Start a conversation.",
    contactSubtitle:
      "This form sends straight to my inbox. Prefer email? The address below always works.",
    navCtaLabel: "Let's Work Together",
    navCtaHref: "#contact",
    projectsTitle: "A collection of experiments, systems, research projects and products.",
    projectsSubtitle: "Real GitHub projects and this site's physics playground. Filter without leaving the page.",
  };
}

/**
 * Client SWR-style content hooks.
 *
 * System-design notes:
 * - Static seeds first → never blank if the content service is down.
 * - Version tokens: poll `getPublicContentVersion` and refetch when it changes.
 * - BroadcastChannel: admin saves in the same browser notify open public tabs.
 * - Cross-tab marker in localStorage for cheap wakeups.
 */

const CHANNEL = "hq:content";
const VERSION_KEY = "hq:content-version";
const VERSION_POLL_MS = 20_000;

type Listener = () => void;
const listeners = new Set<Listener>();
let lastSeenVersion = "";

function writeStoredVersion(v: string) {
  try {
    localStorage.setItem(VERSION_KEY, v);
  } catch {
    /* ignore */
  }
}

function notifyContentChanged(version?: string) {
  if (version && version !== lastSeenVersion) {
    lastSeenVersion = version;
    writeStoredVersion(version);
  }
  for (const fn of listeners) fn();
}

if (typeof window !== "undefined" && "BroadcastChannel" in window) {
  const ch = new BroadcastChannel(CHANNEL);
  ch.onmessage = (ev) => {
    const v = (ev.data as { version?: string } | undefined)?.version;
    notifyContentChanged(v);
  };
}

/** Admin pages call this after a successful save. */
export function broadcastContentUpdated(version?: string) {
  const v = version || `t${Date.now()}`;
  notifyContentChanged(v);
  if (typeof window !== "undefined" && "BroadcastChannel" in window) {
    const ch = new BroadcastChannel(CHANNEL);
    ch.postMessage({ version: v });
    ch.close();
  }
}

function useContentRevision(): number {
  const [rev, setRev] = useState(0);
  useEffect(() => {
    const bump = () => setRev((n) => n + 1);
    listeners.add(bump);
    return () => {
      listeners.delete(bump);
    };
  }, []);
  return rev;
}

/** Poll content version; bump local revision when the server version moves. */
export function useContentVersionPoll(active = true) {
  const rev = useContentRevision();
  useEffect(() => {
    if (!active) return;
    let cancelled = false;
    const tick = async () => {
      try {
        const meta = await getPublicContentVersion();
        if (!cancelled && meta.version && meta.version !== lastSeenVersion) {
          lastSeenVersion = meta.version;
          writeStoredVersion(meta.version);
          notifyContentChanged(meta.version);
        }
      } catch {
        /* keep last known version */
      }
    };
    void tick();
    const id = window.setInterval(() => void tick(), VERSION_POLL_MS);
    return () => {
      cancelled = true;
      window.clearInterval(id);
    };
  }, [active, rev]);
}

export function usePublicProjects(): Project[] {
  const [list, setList] = useState<Project[]>(staticProjects);
  const rev = useContentRevision();
  useEffect(() => {
    let cancelled = false;
    listPublicProjects()
      .then((rows) => {
        if (!cancelled && rows.length) setList(rows);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [rev]);
  return list;
}

export function usePublicPosts(): BlogPost[] {
  const [list, setList] = useState<BlogPost[]>(staticPosts);
  const rev = useContentRevision();
  useEffect(() => {
    let cancelled = false;
    listPublicPosts()
      .then((rows) => {
        if (!cancelled && rows.length) setList(rows);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [rev]);
  return list;
}

export function usePublicSiteSettings(): SiteSettings {
  const [settings, setSettings] = useState<SiteSettings>(() => ({
    name: staticSite.name,
    title: staticSite.title,
    description: staticSite.description,
    tagline: staticSite.tagline,
    bio: staticSite.bio,
    shortBio: staticSite.shortBio,
    footer: staticSite.footer,
    email: staticSite.email,
    formspreeId: staticSite.formspreeId,
    social: { ...staticSite.social },
    home: defaultHomeSettings(),
  }));
  const rev = useContentRevision();
  useEffect(() => {
    let cancelled = false;
    getPublicSiteSettings()
      .then((rows) => {
        if (!cancelled) {
          setSettings((prev) => ({
            ...prev,
            ...rows,
            social: { ...prev.social, ...rows.social },
            home: { ...prev.home, ...rows.home },
          }));
        }
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [rev]);
  return settings;
}

export function usePublicResumeLenses(): ResumeLens[] {
  const [lenses, setLenses] = useState<ResumeLens[]>(staticLenses);
  const rev = useContentRevision();
  useEffect(() => {
    let cancelled = false;
    getPublicContent()
      .then((content) => {
        if (!cancelled && content.lenses.length) setLenses(content.lenses);
      })
      .catch(() => undefined);
    return () => {
      cancelled = true;
    };
  }, [rev]);
  return lenses;
}

/** Persist a contact message to the admin inbox (best-effort + idempotent). */
export async function persistContactMessage(input: {
  name: string;
  email: string;
  subject?: string;
  message: string;
  idempotencyKey?: string;
}): Promise<
  | { ok: true; duplicate: boolean }
  | { ok: false; error: string }
> {
  try {
    const key =
      input.idempotencyKey ||
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `client:${Date.now()}:${input.email}`);
    const res = await submitContactMessage({
      data: {
        name: input.name,
        email: input.email,
        subject: input.subject ?? "",
        message: input.message,
        idempotencyKey: key,
      },
    });
    return { ok: true, duplicate: Boolean((res as { duplicate?: boolean }).duplicate) };
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Failed to save message";
    return { ok: false, error: msg };
  }
}

/** Keep a stable idempotency key per form session so double-submit is safe. */
export function useContactIdempotencyKey(email: string): string {
  const keyRef = useRef("");
  if (!keyRef.current && email) {
    keyRef.current =
      typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `client:${Date.now()}:${email}`;
  }
  return keyRef.current;
}

export function useContentRevisionTick() {
  const rev = useContentRevision();
  const tick = useCallback(() => notifyContentChanged(), []);
  return { rev, tick };
}
