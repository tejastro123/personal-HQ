import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

await page.goto(`${base}/playground?preset=zero-g`, {
  waitUntil: "networkidle",
  timeout: 90000,
});
await page.waitForTimeout(3000);

const body = await page.locator("body").innerText();
const presetLabel = await page.locator('[data-testid="preset-label"]').innerText();
const gravity = await page.locator('[data-testid="telemetry-gravity"]').innerText();
const restitution = await page.locator('[data-testid="telemetry-restitution"]').innerText();
const presetButtons = await page.locator("[data-preset]").count();
const blurbCount = await page
  .locator("p")
  .filter({ hasText: /gravity|drift|elastic|settle|rest/i })
  .count();
const toolbarText = await page
  .locator("div")
  .filter({ hasText: /^Presets/ })
  .first()
  .innerText()
  .catch(() => "");

await page.screenshot({ path: "screenshots/batch4-playground-debug.png", fullPage: true });

console.log(
  JSON.stringify(
    {
      presetLabel,
      gravity,
      restitution,
      presetButtons,
      blurbCount,
      bodyHasNoGravity: /no gravity/i.test(body),
      bodySnippet: body.slice(0, 800),
      toolbarText: toolbarText.slice(0, 600),
      consoleErrors,
    },
    null,
    2,
  ),
);
await browser.close();
