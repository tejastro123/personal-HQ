import { posts as staticPosts, type BlogPost } from "@/data/blog";
import { projects as staticProjects, type Project } from "@/data/projects";

export type ProjectRow = {
  id: string;
  data: Project;
  is_published: boolean;
};

export type BlogPostRow = {
  slug: string;
  data: BlogPost;
  is_published: boolean;
};

/**
 * Overlay admin DB rows onto the static catalog.
 *
 * - Published rows replace a static item of the same id/slug, or append new ones.
 * - Unpublished rows hide a static item of the same id/slug (and drop DB-only rows).
 * - When the DB has no rows, the static catalog is returned unchanged.
 */
export function mergeProjects(rows: ProjectRow[]): Project[] {
  if (!rows.length) return staticProjects;
  const map = new Map<string, Project>(staticProjects.map((p) => [p.id, p]));
  for (const row of rows) {
    if (!row.is_published) {
      map.delete(row.id);
      continue;
    }
    map.set(row.id, { ...row.data, id: row.id });
  }
  return [...map.values()];
}

export function mergeBlogPosts(rows: BlogPostRow[]): BlogPost[] {
  if (!rows.length) return staticPosts;
  const map = new Map<string, BlogPost>(staticPosts.map((p) => [p.slug, p]));
  for (const row of rows) {
    if (!row.is_published) {
      map.delete(row.slug);
      continue;
    }
    map.set(row.slug, { ...row.data, slug: row.slug });
  }
  return [...map.values()];
}

export function mergeProject(row: ProjectRow, fallback?: Project): Project {
  return { ...(fallback ?? row.data), ...row.data, id: row.id };
}

export function mergeBlogPost(row: BlogPostRow, fallback?: BlogPost): BlogPost {
  return { ...(fallback ?? row.data), ...row.data, slug: row.slug };
}

/** Shallow-safe list filter used by public surfaces (category / featured). */
export function filterProjectList(list: Project[], category: string): Project[] {
  if (category === "All") return list;
  return list.filter((p) => p.category === category);
}

export function publishedProjectIds(list: Project[]): string[] {
  return list.map((p) => p.id);
}
