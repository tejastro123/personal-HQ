import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const results = [];

async function shot(name, viewport, scroll = null) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(m.text());
  });
  await page.goto("http://127.0.0.1:8081/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(4000);
  if (scroll) {
    await page.locator(scroll).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
  }
  const body = await page.locator("body").innerText();
  const canvas = await page.locator("canvas").count();
  const stages = await page.locator(".section-stage").count();
  const grids = await page.locator(".section-grid").count();
  const beams = await page.locator(".section-beam").count();
  const depth = await page.locator(".depth-reveal").count();
  const path = `screenshots/site-cinema-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const minStage = scroll ? 1 : 0;
  const ok = body.length > 200 && errs.length === 0 && stages >= minStage;
  const detail = { name, ok, canvas, stages, grids, beams, depth, errs: errs.slice(0, 5), path };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await shot("hero", { width: 1440, height: 900 });
await shot("work", { width: 1440, height: 900 }, "#work");
await shot("world", { width: 1440, height: 900 }, "#world");
await shot("about", { width: 1440, height: 900 }, "#about");
await shot("skills", { width: 1440, height: 900 }, "#skills");
await shot("timeline", { width: 1440, height: 900 }, "#timeline");
await shot("cta", { width: 1440, height: 900 }, "#cta");
await shot("contact", { width: 1440, height: 900 }, "#contact");
await shot("mobile-hero", { width: 390, height: 844 });
await shot("mobile-work", { width: 390, height: 844 }, "#work");

const failed = results.filter((r) => !r.ok);
console.log("\n=== SITE CINEMA QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
await browser.close();
process.exit(failed.length ? 1 : 0);
