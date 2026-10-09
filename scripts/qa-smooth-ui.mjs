import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const results = [];

async function shot(name, viewport, scrollTo, waitMs = 3500) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(m.text());
  });
  await page.goto("http://127.0.0.1:8081/", { waitUntil: "networkidle", timeout: 45000 });
  await page.waitForTimeout(waitMs);
  if (scrollTo) {
    await page.locator(scrollTo).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
  }
  const body = await page.locator("body").innerText();
  const tilt = await page.locator(".tilt-card").count();
  const canvas = await page.locator("canvas").count();
  const frames = await page.locator(".frame-panel, .frame-soft").count();
  const path = `screenshots/${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const ok = body.length > 200 && errs.length === 0;
  const detail = {
    name,
    ok,
    tilt,
    canvas,
    frames,
    bodyLen: body.length,
    sample: body.slice(0, 120).replace(/\s+/g, " "),
    errs: errs.slice(0, 3),
    path,
  };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await shot("smooth2-hero-desktop", { width: 1440, height: 900 }, null, 4500);
await shot("smooth2-hero-mobile", { width: 390, height: 844 }, null, 4000);
await shot("smooth2-about", { width: 1440, height: 900 }, "#about");
await shot("smooth2-skills", { width: 1440, height: 900 }, "#skills");
await shot("smooth2-timeline", { width: 1440, height: 900 }, "text=Learning in public");
await shot("smooth2-features", { width: 1440, height: 900 }, "text=How the work actually happens");
await shot("smooth2-cta", { width: 1440, height: 900 }, "text=Have an ambitious idea");
await shot("smooth2-contact", { width: 1440, height: 900 }, "#contact");

const failed = results.filter((r) => !r.ok);
console.log("\n=== SMOOTH UI QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
if (failed.length) process.exitCode = 1;
await browser.close();
process.exit(process.exitCode || 0);
