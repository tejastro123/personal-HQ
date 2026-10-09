/**
 * Copy PGLite runtime assets next to the bundled server function so the built
 * preview (no DATABASE_URL → PGLite fallback) can open the embedded DB.
 *
 * Nitro/Vercel inlines `@electric-sql/pglite` into
 * `.vercel/output/functions/__server.func/_libs/electric-sql__pglite.mjs`
 * but does not emit the wasm/data files beside it. Without those files the
 * preview process dies on first DB touch.
 *
 * No-op when Neon (`DATABASE_URL`) is the active backend or files are missing.
 */
import { copyFileSync, existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const distDir = join(root, "node_modules", "@electric-sql", "pglite", "dist");
const libsDir = join(root, ".vercel", "output", "functions", "__server.func", "_libs");

const assets = ["pglite.data", "pglite.wasm", "initdb.wasm"];

if (process.env.DATABASE_URL) {
  console.log("[pglite-bundle] DATABASE_URL set — skipping pglite asset copy");
} else if (!existsSync(distDir)) {
  console.warn("[pglite-bundle] dist missing:", distDir);
} else if (!existsSync(libsDir)) {
  console.warn("[pglite-bundle] build output not present yet — run vite build first");
} else {
  mkdirSync(libsDir, { recursive: true });
  for (const name of assets) {
    const src = join(distDir, name);
    const dest = join(libsDir, name);
    if (!existsSync(src)) {
      console.warn("[pglite-bundle] missing source asset:", src);
      continue;
    }
    copyFileSync(src, dest);
    console.log("[pglite-bundle] copied", name, "→", dest);
  }
}
