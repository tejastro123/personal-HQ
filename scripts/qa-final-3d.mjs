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
  await page.waitForTimeout(4500);
  if (scroll) {
    await page.locator(scroll).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(1800);
  }
  const body = await page.locator("body").innerText();
  const canvas = await page.locator("canvas").count();
  const stages = await page.locator(".section-stage").count();
  const depth = await page.locator(".depth-reveal").count();
  const hud = await page.locator(".hero-hud").count();
  const navActive = await page.locator(".nav-link-active").count();
  const footerLink = await page.locator(".footer-link").count();
  const sheen = await page.locator(".btn-sheen").count();
  const path = `screenshots/final-3d-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const ok = body.length > 200 && errs.length === 0 && canvas >= 1;
  const detail = { name, ok, canvas, stages, depth, hud, navActive, footerLink, sheen, errs: errs.slice(0, 4), path };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await shot("hero", { width: 1440, height: 900 });
await shot("nav-scrolled", { width: 1440, height: 900 }, "#work");
await shot("world", { width: 1440, height: 900 }, "#world");
await shot("footer", { width: 1440, height: 900 }, "footer");
await shot("mobile-hero", { width: 390, height: 844 });

const failed = results.filter((r) => !r.ok);
console.log("\n=== FINAL 3D + POLISH QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
await browser.close();
process.exit(failed.length ? 1 : 0);
