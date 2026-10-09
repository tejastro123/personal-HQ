export type SnapshotRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  openIssuesCount: number;
  pushedAt: string;
  topics: string[];
  archived: boolean;
  fork: boolean;
  htmlUrl: string;
};

export type GithubSnapshot = {
  syncedAt: string;
  source: "live-api" | "project-derived";
  user: {
    login: string;
    publicRepos: number;
    followers: number;
    htmlUrl: string;
  } | null;
  repos: SnapshotRepo[];
};

// Optional build-time refresh from `npm run sync:github` (scripts/sync-github.mjs).
import { generatedSnapshot } from "./github-snapshot.generated";

/**
 * Build-time / project-derived snapshot. Run `npm run sync:github` to refresh
 * from the live GitHub API; until then this stays honest and derived from
 * the project catalog (no fake stars).
 */
export const githubSnapshot: GithubSnapshot = generatedSnapshot;

export function repoForProject(githubUrl?: string): SnapshotRepo | null {
  if (!githubUrl) return null;
  const name = githubUrl.split("/").filter(Boolean).pop();
  if (!name) return null;
  const fromSnap = githubSnapshot.repos.find(
    (r) => r.name.toLowerCase() === name.toLowerCase(),
  );
  if (fromSnap) return fromSnap;
  // Derived fallback — no fabricated stars.
  return {
    name,
    description: null,
    language: null,
    stargazersCount: 0,
    forksCount: 0,
    openIssuesCount: 0,
    pushedAt: "",
    topics: [],
    archived: false,
    fork: false,
    htmlUrl: githubUrl,
  };
}

export function formatPushed(iso: string): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toISOString().slice(0, 10);
}
