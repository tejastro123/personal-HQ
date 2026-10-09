import { chromium } from "playwright";

const browser = await chromium.launch({ headless: true });
const results = [];

async function run(name, viewport, fn) {
  const ctx = await browser.newContext({ viewport });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e)));
  page.on("console", (m) => {
    if (m.type() === "error") errs.push(m.text());
  });
  await page.goto("http://127.0.0.1:8081/", { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForTimeout(2500);
  const metrics = await fn(page);
  const path = `screenshots/worldmap-${name}.png`;
  await page.screenshot({ path, fullPage: false });
  const ok = errs.length === 0 && (metrics?.ok ?? true);
  const detail = { name, ok, ...metrics, errs: errs.slice(0, 5), path };
  results.push(detail);
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
  await ctx.close();
}

await run("desktop", { width: 1440, height: 1100 }, async (page) => {
  await page.locator("#world").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  const markers = await page.locator("svg g[transform] circle").count();
  const listItems = await page.locator("aside button").count();
  const search = await page.locator('input[placeholder*="Search projects"]').count();
  const countryPaths = await page.locator('#world path[fill^="rgb"]').count();
  const text = await page.locator("#world").innerText();
  const hasCountries = /countries/i.test(text);
  const hasGithub = /github/i.test(text);
  return {
    ok: markers >= 20 && listItems >= 3 && search === 1 && countryPaths > 20 && hasCountries && hasGithub,
    markers,
    listItems,
    search,
    countryPaths,
    hasCountries,
    hasGithub,
  };
});

await run("filter", { width: 1440, height: 1100 }, async (page) => {
  await page.locator("#world").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.locator('#world button:has-text("Quantum")').first().click();
  await page.waitForTimeout(800);
  await page.locator("#world").screenshot({ path: "screenshots/worldmap-filter-quantum.png" });
  const text = await page.locator("#world").innerText();
  return { ok: /Projects shown|projects/i.test(text), textSnippet: text.slice(0, 200) };
});

await run("search", { width: 1440, height: 1100 }, async (page) => {
  await page.locator("#world").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1500);
  await page.locator('input[placeholder*="Search projects"]').fill("QUICKIDE");
  await page.waitForTimeout(800);
  const text = await page.locator("#world").innerText();
  return { ok: /QUICKIDE/i.test(text) };
});

await run("click-india", { width: 1440, height: 1100 }, async (page) => {
  await page.locator("#world").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  // Click a project in the side list (India-heavy catalog)
  const first = page.locator("aside button").first();
  await first.click();
  await page.waitForTimeout(600);
  const text = await page.locator("#world").innerText();
  await page.locator("#world").screenshot({ path: "screenshots/worldmap-selected.png" });
  return {
    ok: /View Project|GitHub repo/i.test(text),
    selected: /QUICKIDE|PersonalRAG|Artemis|IPL|F1|Stock|Python|CPP/i.test(text),
  };
});

await run("mobile", { width: 390, height: 844 }, async (page) => {
  await page.locator("#world").scrollIntoViewIfNeeded();
  await page.waitForTimeout(2000);
  const markers = await page.locator("svg g[transform] circle").count();
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 4);
  return { ok: markers >= 5 && !overflow, markers, overflow };
});

const failed = results.filter((r) => !r.ok);
console.log("\n=== WORLD MAP QA ===");
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
await browser.close();
process.exit(failed.length ? 1 : 0);
