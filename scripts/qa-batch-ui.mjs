import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8080";
const outDir = "C:\\Users\\tejas\\OneDrive\\Desktop\\personal-HQ\\screenshots";
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

async function run(label, fn) {
  const consoleErrors = [];
  const pageErrors = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  try {
    const detail = await fn(page);
    results.push({ label, ok: true, consoleErrors, pageErrors, ...detail });
  } catch (err) {
    results.push({ label, ok: false, error: String(err), consoleErrors, pageErrors });
  }
  await page.close();
}

await run("status-badges-home", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=Building ambitious ideas", { timeout: 20000 });
  const body = await page.locator("body").innerText();
  await page.screenshot({ path: `${outDir}\\batch-status-home.png` });
  return {
    hasActive: body.includes("Active"),
    hasResearch: body.includes("Research"),
    hasArchive: /archive/i.test(body),
    hasCaseStudy: /case study/i.test(body),
  };
});

await run("warm-cta", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(600);
  const warm = page.locator('button:has-text("Let\'s Work Together"), a:has-text("Let\'s work together")').first();
  await warm.waitFor({ timeout: 10000 });
  const bg = await warm.evaluate((el) => getComputedStyle(el).backgroundColor);
  await page.locator('a:has-text("Let\'s work together")').first().scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.screenshot({ path: `${outDir}\\batch-warm-cta.png` });
  return { warmBg: bg };
});

await run("playground-presets", async (page) => {
  await page.goto(`${base}/playground`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector('[data-preset="earth"]', { timeout: 20000 });
  await page.waitForTimeout(800);
  const earthUrl = page.url();
  await page.click('[data-preset="zero-g"]');
  await page.waitForTimeout(500);
  const zeroUrl = page.url();
  const presetLabel = await page.locator('[data-testid="preset-label"]').innerText();
  await page.screenshot({ path: `${outDir}\\batch-playground-zero-g.png` });
  await page.click('[data-preset="magnet"]');
  await page.waitForTimeout(400);
  const magnetUrl = page.url();
  return {
    earthUrl,
    zeroUrl,
    magnetUrl,
    presetLabel,
    hasPresetParam: zeroUrl.includes("preset=zero-g"),
  };
});

await run("project-sticky-rail", async (page) => {
  await page.goto(`${base}/projects/physics-playground`, {
    waitUntil: "networkidle",
    timeout: 60000,
  });
  await page.waitForTimeout(600);
  const aside = page.locator("aside").first();
  const asideVisible = await aside.isVisible();
  const asideText = asideVisible ? await aside.innerText() : "";
  const lower = asideText.toLowerCase();
  await page.screenshot({ path: `${outDir}\\batch-project-rail.png` });
  return {
    asideVisible,
    hasJump: lower.includes("jump"),
    hasLiveDemo: lower.includes("live demo"),
    hasGitHub: asideText.includes("GitHub"),
  };
});

await run("footer-index", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(700);
  const footer = await page.locator("footer").innerText();
  const lower = footer.toLowerCase();
  await page.screenshot({ path: `${outDir}\\batch-footer-index.png` });
  return {
    hasIndex: lower.includes("index"),
    hasTotal: lower.includes("total projects"),
    hasLatest: lower.includes("latest post"),
  };
});

await run("links-page", async (page) => {
  await page.goto(`${base}/links`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(500);
  const body = await page.locator("main").innerText();
  const hasGlow = await page.evaluate(() => !!document.querySelector(".hero-glow"));
  const hasGrid = await page.evaluate(() => !!document.querySelector(".hero-grid"));
  await page.screenshot({ path: `${outDir}\\batch-links.png` });
  return {
    hasGlow,
    hasGrid,
    hasMono: await page.evaluate(() => !!document.querySelector(".mono")),
    hasResearch: body.includes("Research"),
  };
});

await run("map-arcs", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => {
    document.getElementById("world")?.scrollIntoView({ behavior: "instant" });
  });
  await page.waitForTimeout(2500);
  const arcCount = await page.locator("path.map-arc").count();
  await page.screenshot({ path: `${outDir}\\batch-map-arcs.png` });
  return { arcCount };
});

await run("archive-status-filter", async (page) => {
  await page.goto(`${base}/projects`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=All work", { timeout: 20000 });
  await page.waitForTimeout(500);
  const body = await page.locator("body").innerText();
  await page.screenshot({ path: `${outDir}\\batch-archive-status.png` });
  return {
    hasActive: body.includes("Active"),
    hasResearch: body.includes("Research"),
    hasPrototype: body.includes("Prototype"),
    hasArchive: body.includes("Archive"),
  };
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
if (failed.length) {
  process.exitCode = 1;
}
await browser.close();
