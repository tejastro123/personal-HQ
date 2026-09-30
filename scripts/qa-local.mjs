import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8080";
const outDir = "C:\\Users\\tejas\\OneDrive\\Desktop\\personal-HQ\\screenshots";
mkdirSync(outDir, { recursive: true });

const routes = [
  { name: "home", path: "/", wait: "text=Building ambitious ideas" },
  { name: "projects", path: "/projects", wait: "text=All work" },
  { name: "project-detail", path: "/projects/tejasos", wait: "text=TejasOS" },
  { name: "links", path: "/links", wait: "text=TEJAS" },
  { name: "contact", path: "/contact", wait: "text=Start a conversation" },
  { name: "resume", path: "/resume", wait: "text=Print / Save PDF" },
  { name: "playground", path: "/playground", wait: "text=Physics Playground" },
];

const browser = await chromium.launch({ headless: true });
const results = [];

async function checkPage(page, route, label) {
  const consoleErrors = [];
  const pageErrors = [];
  const failed = [];
  const onPageError = (err) => pageErrors.push(String(err));
  const onConsole = (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  };
  const onRequestFailed = (req) => failed.push(`${req.method()} ${req.url()}`);
  page.on("pageerror", onPageError);
  page.on("console", onConsole);
  page.on("requestfailed", onRequestFailed);

  const url = `${base}${route.path}`;
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  if (route.wait) {
    await page.waitForSelector(route.wait, { timeout: 20000 }).catch(() => {});
  }
  await page.waitForTimeout(800);

  const bodyText = (await page.locator("body").innerText().catch(() => "")).slice(0, 400);
  const hasContent = bodyText.trim().length > 40;
  const shot = `${outDir}\\qa-${label}.png`;
  await page.screenshot({ path: shot, fullPage: label === "home" || label === "links" });

  results.push({
    label,
    url,
    status: response?.status() ?? null,
    hasContent,
    bodyPreview: bodyText.replace(/\s+/g, " ").slice(0, 180),
    consoleErrors,
    pageErrors,
    failedRequests: failed.filter((f) => !f.includes("favicon")),
    screenshot: shot,
  });

  page.off("pageerror", onPageError);
  page.off("console", onConsole);
  page.off("requestfailed", onRequestFailed);
}

const desktop = await browser.newPage({ viewport: { width: 1280, height: 800 } });
for (const route of routes) {
  await checkPage(desktop, route, route.name);
}

// Interaction checks on home
await desktop.goto(`${base}/`, { waitUntil: "networkidle" });
await desktop.waitForSelector("text=Building ambitious ideas", { timeout: 20000 });

// Theme toggle
const before = await desktop.evaluate(() => document.documentElement.className);
await desktop.getByRole("button", { name: /theme/i }).first().click().catch(() => {});
await desktop.waitForTimeout(400);
const after = await desktop.evaluate(() => document.documentElement.className);
results.push({
  label: "theme-toggle",
  before,
  after,
  toggled: before !== after,
});

// Project filter
await desktop.goto(`${base}/#work`, { waitUntil: "networkidle" });
await desktop.waitForTimeout(500);
const quantum = desktop.getByRole("button", { name: "Quantum", exact: true }).first();
if (await quantum.count()) {
  await quantum.click();
  await desktop.waitForTimeout(500);
  const activeText = await desktop.locator("body").innerText();
  results.push({
    label: "project-filter-quantum",
    clicked: true,
    mentionsQuantumSim: activeText.includes("Quantum Circuit Simulator"),
  });
}

// Command palette
await desktop.keyboard.press("Control+k");
await desktop.waitForTimeout(400);
const paletteVisible = await desktop.locator("text=Search projects").count();
results.push({ label: "command-palette", opened: paletteVisible > 0 });
await desktop.keyboard.press("Escape");

// World map section
await desktop.goto(`${base}/#world`, { waitUntil: "networkidle" });
await desktop.waitForTimeout(1500);
const mapText = await desktop.locator("body").innerText();
results.push({
  label: "world-map",
  hasTitle: mapText.includes("Projects Around the World"),
  hasDemoLabel: mapText.includes("Demo / Sample Data"),
  hasMetrics: mapText.includes("Project Count"),
});

// Mobile viewport
const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
await checkPage(mobile, routes[0], "home-mobile");
await mobile.goto(`${base}/links`, { waitUntil: "networkidle" });
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: `${outDir}\\qa-links-mobile.png`, fullPage: true });

await browser.close();

const summary = {
  ok: results.every((r) => {
    if (r.label.startsWith("qa") || r.label === "theme-toggle" || r.label.startsWith("project") || r.label === "command-palette" || r.label === "world-map") return true;
    return (r.status === 200 || r.status === null) && r.hasContent !== false && (r.pageErrors || []).length === 0;
  }),
  results,
};

console.log(JSON.stringify(summary, null, 2));
const hardFail = results.some(
  (r) =>
    (r.label.includes("home") ||
      r.label.includes("projects") ||
      r.label.includes("links") ||
      r.label.includes("contact") ||
      r.label.includes("playground") ||
      r.label.includes("resume")) &&
    (r.hasContent === false || (r.pageErrors && r.pageErrors.length > 0)),
);
process.exit(hardFail ? 1 : 0);
