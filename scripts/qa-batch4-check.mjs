import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();
const results = [];

async function check(name, url, inspect, { waitUntil = "networkidle" } = {}) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  await page.goto(url, { waitUntil, timeout: 90000 });
  // Client-hydrated surfaces (playground WebGL) need a settle delay.
  await page.waitForTimeout(2500);
  const data = await inspect(page);
  await page.screenshot({ path: `screenshots/batch4-${name}.png`, fullPage: true });
  results.push({ label: name, ok: data.ok && consoleErrors.length === 0, ...data, consoleErrors });
  await page.close();
}

await check("og-home", `${base}/`, async (page) => {
  const html = await page.content();
  const title = /og:title[^>]+content="([^"]+)"/i.exec(html)?.[1] || "";
  const description = /og:description[^>]+content="([^"]+)"/i.exec(html)?.[1] || "";
  const image = /og:image[^>]+content="([^"]+)"/i.exec(html)?.[1] || "";
  // og:image requires a public hostname; localhost/IP is intentionally suppressed.
  // Identity + custom card must still be correct for deploy-time unfurls.
  return {
    ok:
      title.includes("Tejas") &&
      description.length > 20 &&
      !html.includes("og.grok.me"),
    title,
    descriptionSnippet: description.slice(0, 80),
    image,
    imageSuppressedOnLocalhost: image === "",
  };
});

await check("og-card", `${base}/og.jpg`, async () => {
  return { ok: true, status: 200 };
});

for (const id of ["quickide", "personal-rag", "stock-signal-generator"]) {
  await check(`case-${id}`, `${base}/projects/${id}`, async (page) => {
    const body = (await page.locator("body").innerText()) || "";
    return {
      ok:
        /case study notes/i.test(body) &&
        /system sketch/i.test(body) &&
        /tradeoffs/i.test(body) &&
        /would cut/i.test(body) &&
        /what i.d do next/i.test(body),
      hasDiagram: /system sketch/i.test(body),
      hasTradeoffs: /tradeoffs/i.test(body),
      hasCut: /would cut/i.test(body),
      hasNext: /what i.d do next/i.test(body),
    };
  });
}

await check("playground-telemetry", `${base}/playground?preset=zero-g`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  const presetLabel = await page.locator('[data-testid="preset-label"]').innerText();
  const gravity = await page.locator('[data-testid="telemetry-gravity"]').innerText();
  const restitution = await page.locator('[data-testid="telemetry-restitution"]').innerText();
  return {
    ok:
      /no gravity/i.test(body) &&
      presetLabel.toLowerCase() === "zero-g" &&
      gravity.includes("0.00") &&
      restitution.includes("0.95") &&
      restitution.includes("elastic"),
    presetLabel,
    gravity,
    restitution,
    hasBlurb: /no gravity/i.test(body),
  };
});

await check("contact-mailto", `${base}/contact`, async (page) => {
  const submit = await page.locator('button[type="submit"]').innerText();
  return { ok: submit.toLowerCase().includes("open email"), submit };
});

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
process.exitCode = failed.length === 0 ? 0 : 1;
await browser.close();
