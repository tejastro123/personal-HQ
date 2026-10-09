import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();

async function probe(name, path, actions) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  const pageErrors = [];
  page.on("console", (m) => {
    if (m.type() === "error") consoleErrors.push(m.text());
  });
  page.on("pageerror", (e) => pageErrors.push(String(e)));
  await page.goto(`${base}${path}`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const body = (await page.locator("body").innerText()) || "";
  const canvasCount = await page.locator("canvas").count();
  const testIds = await page.evaluate(() =>
    [...document.querySelectorAll("[data-testid]")].map((el) => el.getAttribute("data-testid")),
  );
  const buttons = await page.evaluate(() =>
    [...document.querySelectorAll("button")].map((b) => b.textContent?.trim()).filter(Boolean),
  );
  const h1 = await page.locator("h1").first().innerText().catch(() => "");
  await page.screenshot({ path: `screenshots/debug-${name}.png`, fullPage: true });
  const extra = actions ? await actions(page) : {};
  console.log(
    JSON.stringify(
      {
        name,
        h1,
        canvasCount,
        testIds,
        buttons: buttons.slice(0, 30),
        bodySnippet: body.slice(0, 400),
        consoleErrors,
        pageErrors,
        ...extra,
      },
      null,
      2,
    ),
  );
  await page.close();
}

await probe("chaos", "/instruments/chaos");
await probe("particles", "/instruments/particles");
await probe("journal", "/playground?preset=zero-g", async (page) => {
  const toggle = page.locator('[data-testid="journal-toggle"]');
  const hasToggle = (await toggle.count()) >= 1;
  if (hasToggle) {
    await toggle.click();
    await page.waitForTimeout(600);
  }
  return {
    hasToggle,
    journal: await page.locator('[data-testid="experiment-journal"]').count(),
    save: await page.locator('[data-testid="journal-save"]').count(),
  };
});

await browser.close();
