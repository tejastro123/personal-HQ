import { categories } from "@/data/projects";
import { projects } from "@/data/projects";

export type IntegrityIssue = {
  level: "error" | "warn";
  code: string;
  message: string;
};

const KNOWN_VISUALS = new Set([
  "quantum",
  "os",
  "education",
  "sports",
  "quant",
  "solar",
  "gpt",
  "physics",
  "ai",
  "data",
  "creative",
  "software",
  "grid",
]);

const GH_URL = /^https:\/\/github\.com\/tejastro123\/[A-Za-z0-9._-]+$/;

export function runIntegrityChecks(): IntegrityIssue[] {
  const issues: IntegrityIssue[] = [];
  const ids = new Set(projects.map((p) => p.id));
  const cats = new Set<string>(categories);

  for (const p of projects) {
    for (const rid of p.related) {
      if (!ids.has(rid)) {
        issues.push({
          level: "error",
          code: "related-missing",
          message: `${p.id} → related "${rid}" does not resolve`,
        });
      }
    }
    if (!cats.has(p.category)) {
      issues.push({
        level: "error",
        code: "bad-category",
        message: `${p.id} category "${p.category}" is not in categories[]`,
      });
    }
    if (!KNOWN_VISUALS.has(p.visual)) {
      issues.push({
        level: "warn",
        code: "unknown-visual",
        message: `${p.id} visual "${p.visual}" has no ProjectVisual case`,
      });
    }
    if (p.github && !GH_URL.test(p.github)) {
      issues.push({
        level: "warn",
        code: "github-url",
        message: `${p.id} github URL looks malformed: ${p.github}`,
      });
    }
    for (const [k, v] of Object.entries(p.metrics)) {
      if (typeof v !== "number" || v < 0 || v > 100) {
        issues.push({
          level: "warn",
          code: "metric-range",
          message: `${p.id} metric ${k}=${v} outside 0–100`,
        });
      }
    }
  }

  return issues;
}

export function integritySummary(issues: IntegrityIssue[]) {
  return {
    total: issues.length,
    errors: issues.filter((i) => i.level === "error").length,
    warnings: issues.filter((i) => i.level === "warn").length,
    ok: issues.filter((i) => i.level === "error").length === 0,
  };
}
