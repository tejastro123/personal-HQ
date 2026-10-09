import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const results = [];

async function shot(name, viewport, scrollTo, waitMs = 4500) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(m.text());
  });
  await page.goto("http://127.0.0.1:8081/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(waitMs);
  if (scrollTo) {
    await page.locator(scrollTo).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  }
  const body = await page.locator("body").innerText();
  const canvas = await page.locator("canvas").count();
  const tilt = await page.locator(".tilt-card").count();
  const depth = await page.locator(".depth-reveal").count();
  const orbs = await page.locator(".section-orb, .hero-orb").count();
  const path = `screenshots/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const ok = body.length > 200 && errs.length === 0;
  const detail = { name, ok, canvas, tilt, depth, orbs, errs: errs.slice(0, 4), path };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await shot("js-hero-desktop", { width: 1440, height: 900 }, null, 5500);
await shot("js-hero-mobile", { width: 390, height: 844 }, null, 4500);
await shot("js-skills", { width: 1440, height: 900 }, "#skills");
await shot("js-timeline", { width: 1440, height: 900 }, "text=Learning in public");
await shot("js-about", { width: 1440, height: 900 }, "#about");
await shot("js-cta", { width: 1440, height: 900 }, "text=Have an ambitious idea");
await shot("js-contact", { width: 1440, height: 900 }, "#contact");
await shot("js-projects", { width: 1440, height: 900 }, "#work");

const failed = results.filter((r) => !r.ok);
console.log("\n=== 3D UPGRADE QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
await browser.close();
process.exit(failed.length ? 1 : 0);
