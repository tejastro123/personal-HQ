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
  const failed = [];
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("requestfailed", (req) => failed.push(`${req.method()} ${req.url()}`));
  try {
    const detail = await fn(page);
    results.push({ label, ok: true, consoleErrors, pageErrors, failed, ...detail });
  } catch (err) {
    results.push({ label, ok: false, error: String(err), consoleErrors, pageErrors, failed });
  }
  await page.close();
}

await run("home-scroll-sections", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=Building ambitious ideas", { timeout: 20000 });

  const sectionIds = ["home", "work", "about", "skills", "world", "contact"];
  const seen = [];
  for (const id of sectionIds) {
    await page.evaluate((sid) => {
      document.getElementById(sid)?.scrollIntoView({ behavior: "instant", block: "start" });
    }, id);
    await page.waitForTimeout(700);
    const visible = await page.evaluate((sid) => {
      const el = document.getElementById(sid);
      if (!el) return false;
      const text = (el.innerText || "").trim();
      return text.length > 20;
    }, id);
    seen.push({ id, visible });
    await page.screenshot({ path: `${outDir}\\polish-section-${id}.png` });
  }

  // Scroll entire page to fire all Reveals, then capture full page
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: `${outDir}\\polish-home-full.png`, fullPage: true });

  // Count visible headings after full scroll
  const headings = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("h1,h2,h3"))
      .map((h) => (h.innerText || "").trim())
      .filter(Boolean);
  });

  return { seen, headings: headings.slice(0, 30), headingCount: headings.length };
});

await run("command-palette-socials", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(500);
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(400);
  const body = await page.locator("body").innerText();
  const expects = ["Open GitHub", "Open LinkedIn", "Open Instagram", "Open YouTube"];
  const missing = expects.filter((t) => !body.includes(t));
  await page.screenshot({ path: `${outDir}\\polish-command-palette.png` });
  await page.keyboard.press("Escape");
  return { missing };
});

await run("theme-toggle", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(400);
  const before = await page.evaluate(() => document.documentElement.className);
  await page.locator('[data-theme-toggle="true"]').first().click();
  await page.waitForTimeout(500);
  const after = await page.evaluate(() => document.documentElement.className);
  await page.screenshot({ path: `${outDir}\\polish-theme.png` });
  return { before, after, changed: before !== after };
});

await run("project-filter", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => document.getElementById("work")?.scrollIntoView());
  await page.waitForTimeout(600);
  const filterBtn = page.locator('[data-filter="Quantum"]').first();
  if (await filterBtn.count()) {
    await filterBtn.click();
    await page.waitForTimeout(500);
  }
  const cards = await page.locator("#work article, #work [data-project-id], #work .group").count();
  await page.screenshot({ path: `${outDir}\\polish-project-filter.png` });
  return { quantumCards: cards };
});

await run("mobile-390", async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=Building ambitious ideas", { timeout: 20000 });
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  });
  // open mobile menu
  await page.locator('button[aria-label="Open menu"]').click();
  await page.waitForTimeout(400);
  const menuVisible = await page.locator("nav[aria-label='Mobile']").isVisible().catch(() => false);
  await page.screenshot({ path: `${outDir}\\polish-mobile-menu.png` });
  await page.locator('button[aria-label="Close menu"]').click().catch(() => {});
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
  });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${outDir}\\polish-mobile-home.png`, fullPage: true });
  const overflowAfter = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  });
  return { overflowInitial: overflow, overflowAfterScroll: overflowAfter, menuVisible };
});

await run("links-page-mobile", async (page) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/links`, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector("text=TEJAS", { timeout: 20000 });
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth + 2;
  });
  const body = await page.locator("body").innerText();
  const expects = ["GitHub", "LinkedIn", "Instagram", "YouTube", "tejas.mellimpudi@gmail.com"];
  const missing = expects.filter((t) => !body.includes(t));
  await page.screenshot({ path: `${outDir}\\polish-links-mobile.png`, fullPage: true });
  return { overflow, missing };
});

await browser.close();
console.log(JSON.stringify(results, null, 2));

const bad = results.filter(
  (r) =>
    !r.ok ||
    r.consoleErrors.length ||
    r.pageErrors.length ||
    (r.failed || []).filter((f) => !f.includes("favicon")).length ||
    (r.missing && r.missing.length) ||
    (r.seen && r.seen.some((s) => !s.visible)) ||
    (r.overflowInitial || r.overflowAfterScroll) ||
    (r.changed === false) ||
    (r.headingCount !== undefined && r.headingCount < 8),
);
process.exit(bad.length ? 1 : 0);
