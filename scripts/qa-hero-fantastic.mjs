import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const results = [];

async function shot(name, viewport, opts = {}) {
  const { scroll = null, wait = 5500 } = opts;
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(m.text());
  });
  await page.goto("http://127.0.0.1:8081/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(wait);
  if (scroll) {
    await page.locator(scroll).first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(2000);
  }
  const body = await page.locator("body").innerText();
  const canvas = await page.locator("canvas").count();
  const tilt = await page.locator(".tilt-card").count();
  const hud = await page.locator(".hero-hud").count();
  const orb = await page.locator(".hero-orb").count();
  const beam = await page.locator(".hero-beam").count();
  const path = `screenshots/hero-fantastic-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const ok = body.length > 200 && errs.length === 0 && canvas >= 1;
  const detail = { name, ok, canvas, tilt, hud, orb, beam, errs: errs.slice(0, 5), path };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await shot("desktop", { width: 1440, height: 900 });
await shot("mobile", { width: 390, height: 844 }, { wait: 4500 });

const failed = results.filter((r) => !r.ok);
console.log("\n=== HERO FANTASTIC QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
await browser.close();
process.exit(failed.length ? 1 : 0);
