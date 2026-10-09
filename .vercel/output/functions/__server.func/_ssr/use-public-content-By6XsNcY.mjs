import { o as __toESM } from "../_runtime.mjs";
import { c as projects, d as resumeLenses, s as posts } from "./resume-lenses-DTkYOlQB.mjs";
import { m as site } from "./content-cache-DMv4KU76.mjs";
import { r as require_react } from "../_libs/@hookform/resolvers+[...].mjs";
import { C as submitContactMessage, S as listPublicProjects, b as getPublicSiteSettings, v as getPublicContent, x as listPublicPosts, y as getPublicContentVersion } from "./content-DZvTSqUl.mjs";
import { n as aboutStatement, t as aboutBody } from "./content-CThzlbdn.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/use-public-content-By6XsNcY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
function defaultHomeSettings() {
	return {
		heroEyebrow: site.eyebrow,
		heroHeadline: "Building ambitious ideas into real systems.",
		heroCtaPrimaryLabel: "Explore My Work",
		heroCtaPrimaryHref: "#work",
		heroCtaSecondaryLabel: "Let's Connect",
		heroCtaSecondaryHref: "#contact",
		availability: site.availability,
		availabilityDomains: site.availabilityDomains,
		aboutStatement,
		aboutBody: aboutBody.join("\n\n"),
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
		contactSubtitle: "This form sends straight to my inbox. Prefer email? The address below always works.",
		navCtaLabel: "Let's Work Together",
		navCtaHref: "#contact",
		projectsTitle: "A collection of experiments, systems, research projects and products.",
		projectsSubtitle: "Real GitHub projects and this site's physics playground. Filter without leaving the page."
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
var CHANNEL = "hq:content";
var VERSION_KEY = "hq:content-version";
var VERSION_POLL_MS = 2e4;
var listeners = /* @__PURE__ */ new Set();
var lastSeenVersion = "";
function writeStoredVersion(v) {
	try {
		localStorage.setItem(VERSION_KEY, v);
	} catch {}
}
function notifyContentChanged(version) {
	if (version && version !== lastSeenVersion) {
		lastSeenVersion = version;
		writeStoredVersion(version);
	}
	for (const fn of listeners) fn();
}
if (typeof window !== "undefined" && "BroadcastChannel" in window) {
	const ch = new BroadcastChannel(CHANNEL);
	ch.onmessage = (ev) => {
		const v = ev.data?.version;
		notifyContentChanged(v);
	};
}
/** Admin pages call this after a successful save. */
function broadcastContentUpdated(version) {
	const v = version || `t${Date.now()}`;
	notifyContentChanged(v);
	if (typeof window !== "undefined" && "BroadcastChannel" in window) {
		const ch = new BroadcastChannel(CHANNEL);
		ch.postMessage({ version: v });
		ch.close();
	}
}
function useContentRevision() {
	const [rev, setRev] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const bump = () => setRev((n) => n + 1);
		listeners.add(bump);
		return () => {
			listeners.delete(bump);
		};
	}, []);
	return rev;
}
/** Poll content version; bump local revision when the server version moves. */
function useContentVersionPoll(active = true) {
	const rev = useContentRevision();
	(0, import_react.useEffect)(() => {
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
			} catch {}
		};
		tick();
		const id = window.setInterval(() => void tick(), VERSION_POLL_MS);
		return () => {
			cancelled = true;
			window.clearInterval(id);
		};
	}, [active, rev]);
}
function usePublicProjects() {
	const [list, setList] = (0, import_react.useState)(projects);
	const rev = useContentRevision();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listPublicProjects().then((rows) => {
			if (!cancelled && rows.length) setList(rows);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [rev]);
	return list;
}
function usePublicPosts() {
	const [list, setList] = (0, import_react.useState)(posts);
	const rev = useContentRevision();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		listPublicPosts().then((rows) => {
			if (!cancelled && rows.length) setList(rows);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [rev]);
	return list;
}
function usePublicSiteSettings() {
	const [settings, setSettings] = (0, import_react.useState)(() => ({
		name: site.name,
		title: site.title,
		description: site.description,
		tagline: site.tagline,
		bio: site.bio,
		shortBio: site.shortBio,
		footer: site.footer,
		email: site.email,
		formspreeId: site.formspreeId,
		social: { ...site.social },
		home: defaultHomeSettings()
	}));
	const rev = useContentRevision();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getPublicSiteSettings().then((rows) => {
			if (!cancelled) setSettings((prev) => ({
				...prev,
				...rows,
				social: {
					...prev.social,
					...rows.social
				},
				home: {
					...prev.home,
					...rows.home
				}
			}));
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [rev]);
	return settings;
}
function usePublicResumeLenses() {
	const [lenses, setLenses] = (0, import_react.useState)(resumeLenses);
	const rev = useContentRevision();
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		getPublicContent().then((content) => {
			if (!cancelled && content.lenses.length) setLenses(content.lenses);
		}).catch(() => void 0);
		return () => {
			cancelled = true;
		};
	}, [rev]);
	return lenses;
}
/** Persist a contact message to the admin inbox (best-effort + idempotent). */
async function persistContactMessage(input) {
	try {
		const key = input.idempotencyKey || (typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `client:${Date.now()}:${input.email}`);
		const res = await submitContactMessage({ data: {
			name: input.name,
			email: input.email,
			subject: input.subject ?? "",
			message: input.message,
			idempotencyKey: key
		} });
		return {
			ok: true,
			duplicate: Boolean(res.duplicate)
		};
	} catch (err) {
		return {
			ok: false,
			error: err instanceof Error ? err.message : "Failed to save message"
		};
	}
}
//#endregion
export { usePublicProjects as a, usePublicPosts as i, persistContactMessage as n, usePublicResumeLenses as o, useContentVersionPoll as r, usePublicSiteSettings as s, broadcastContentUpdated as t };
