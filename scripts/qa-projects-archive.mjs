import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

const results = [];

const visibleProjectCards = async (scope) => {
  const root = scope || page;
  return root
    .locator('a[href^="/projects/"]')
    .evaluateAll((els) =>
      els.filter((el) => {
        const r = el.getBoundingClientRect();
        return r.width > 0 && r.height > 0 && getComputedStyle(el).display !== "none";
      }).length,
    );
};

await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const cards = await visibleProjectCards();
const h1 = await page.locator("h1").first().textContent();
const filters = await page.locator("[data-filter]").count();
await page.screenshot({ path: "screenshots/qa-projects-archive.png", fullPage: true });
results.push({
  label: "projects-archive",
  ok: cards >= 40 && filters >= 9,
  h1,
  cards,
  filters,
  errors: [...errors],
});

// Category filter: Education
errors.length = 0;
const eduBtn = page.locator("[data-filter]").filter({ hasText: "Education" });
if (await eduBtn.count()) {
  await eduBtn.click();
  // Staggered exit animations for ~50 cards can run for >2s.
  await page.waitForTimeout(2500);
  const eduCards = await page
    .locator('#work a[href^="/projects/"]')
    .evaluateAll((els) =>
      els.filter((el) => {
        const r = el.getBoundingClientRect();
        const style = getComputedStyle(el);
        return (
          r.width > 0 &&
          r.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden" &&
          style.opacity !== "0"
        );
      }).length,
    );
  const eduBadges = await page.locator("#work").getByText("Education", { exact: true }).count();
  await page.screenshot({ path: "screenshots/qa-projects-education.png", fullPage: true });
  results.push({
    label: "filter-education",
    ok: eduCards >= 5 && eduCards <= 15 && eduBadges >= 5,
    cards: eduCards,
    educationBadges: eduBadges,
    errors: [...errors],
  });
}

// Detail page: related links resolve
errors.length = 0;
await page.goto(`${base}/projects/personal-rag`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const title = await page.locator("h1").first().textContent();
const relatedLinks = await page.locator('a[href^="/projects/"]').count();
await page.screenshot({ path: "screenshots/qa-project-detail-personal-rag.png", fullPage: true });
results.push({
  label: "detail-related",
  ok: !!title?.toLowerCase().includes("rag") && relatedLinks > 0,
  title,
  relatedLinks,
  errors: [...errors],
});

// Home featured grid should show more than 6
errors.length = 0;
await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const workSection = page.locator("#work");
const homeCards = await workSection.locator('a[href^="/projects/"]').count();
await page.screenshot({ path: "screenshots/qa-home-projects.png", fullPage: true });
results.push({
  label: "home-featured-grid",
  ok: homeCards >= 9,
  cards: homeCards,
  errors: [...errors],
});

// Mobile archive
errors.length = 0;
await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/projects`, { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const mobileCards = await page.locator('a[href^="/projects/"]').count();
const overflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
await page.screenshot({ path: "screenshots/qa-projects-mobile.png", fullPage: true });
results.push({
  label: "projects-mobile",
  ok: mobileCards >= 40 && !overflow,
  cards: mobileCards,
  horizontalOverflow: overflow,
  errors: [...errors],
});

console.log(JSON.stringify(results, null, 2));
await browser.close();
