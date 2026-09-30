import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8080";
const outDir = "C:\\Users\\tejas\\OneDrive\\Desktop\\personal-HQ\\screenshots";
mkdirSync(outDir, { recursive: true });

const checks = [
  {
    name: "home-footer",
    path: "/",
    wait: "text=Building ambitious ideas",
    expectTexts: [
      "tejas.mellimpudi@gmail.com",
      "GitHub",
      "LinkedIn",
      "Instagram",
      "YouTube",
    ],
  },
  {
    name: "links",
    path: "/links",
    wait: "text=TEJAS",
    expectTexts: [
      "tejas.mellimpudi@gmail.com",
      "GitHub",
      "LinkedIn",
      "Instagram",
      "YouTube",
    ],
  },
  {
    name: "contact",
    path: "/contact",
    wait: "text=Start a conversation",
    expectTexts: ["tejas.mellimpudi@gmail.com"],
  },
  {
    name: "resume",
    path: "/resume",
    wait: "text=Print / Save PDF",
    expectTexts: [
      "tejas.mellimpudi@gmail.com",
      "GitHub",
      "LinkedIn",
      "Instagram",
      "YouTube",
    ],
  },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const route of checks) {
  const page = await browser.newPage();
  const consoleErrors = [];
  const pageErrors = [];
  page.on("pageerror", (err) => pageErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });

  const url = `${base}${route.path}`;
  const response = await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
  await page.waitForSelector(route.wait, { timeout: 20000 }).catch(() => {});
  await page.waitForTimeout(1000);

  const bodyText = await page.locator("body").innerText().catch(() => "");
  const missing = route.expectTexts.filter((t) => !bodyText.includes(t));
  const shot = `${outDir}\\qa-social-${route.name}.png`;
  await page.screenshot({ path: shot, fullPage: true });

  results.push({
    label: route.name,
    url,
    status: response?.status() ?? null,
    missing,
    consoleErrors,
    pageErrors,
    screenshot: shot,
  });
  await page.close();
}

await browser.close();
console.log(JSON.stringify(results, null, 2));
const failed = results.filter(
  (r) => r.missing.length || r.consoleErrors.length || r.pageErrors.length || r.status !== 200,
);
process.exit(failed.length ? 1 : 0);
