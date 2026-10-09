/**
 * QA for the secret admin console + login + public content overlay.
 * Sequential Playwright checks against the preview server.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const shotDir = "screenshots";
mkdirSync(shotDir, { recursive: true });

const results = [];

async function check(name, fn) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const consoleErrors = [];
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  try {
    const detail = await fn(page);
    const ok = Boolean(detail?.ok);
    results.push({ name, ok, detail, consoleErrors });
    console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail ?? {}, null, 0));
    if (!ok) console.log("  consoleErrors:", consoleErrors.slice(0, 5));
  } catch (err) {
    results.push({ name, ok: false, error: String(err), consoleErrors });
    console.log(`FAIL ${name}: ${err}`);
  } finally {
    await browser.close();
  }
}

await check("login-renders", async (page) => {
  await page.goto(`${base}/login`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  const body = (await page.locator("body").innerText()) || "";
  await page.screenshot({ path: `${shotDir}/admin-login.png`, fullPage: true });
  return {
    ok:
      /operator console/i.test(body) &&
      /sign in/i.test(body) &&
      (await page.locator("#email").count()) >= 1 &&
      (await page.locator("#password").count()) >= 1,
    detail: { hasEmail: (await page.locator("#email").count()) >= 1 },
  };
});

await check("hq-signed-out", async (page) => {
  await page.goto(`${base}/hq`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const body = (await page.locator("body").innerText()) || "";
  await page.screenshot({ path: `${shotDir}/admin-hq-signed-out.png`, fullPage: true });
  // Should show access denied or redirect toward login — never the dashboard tables.
  const denied =
    /access denied|sign in|verifying operator|operator console/i.test(body);
  const hasDashboard =
    (await page.locator("text=Recent admin activity").count()) >= 1;
  return {
    ok: denied && !hasDashboard,
    detail: { denied, hasDashboard, snippet: body.slice(0, 180) },
  };
});

await check("public-still-renders", async (page) => {
  const paths = ["/", "/blog", "/projects", "/resume", "/instruments"];
  const failed = [];
  for (const path of paths) {
    await page.goto(`${base}${path}`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1200);
    const body = (await page.locator("body").innerText()) || "";
    const rootKids = await page.locator("body *").count();
    if (body.trim().length < 40 || rootKids < 15) failed.push(path);
  }
  await page.goto(`${base}/`, { waitUntil: "load" });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `${shotDir}/public-home-after-auth.png`, fullPage: false });
  return { ok: failed.length === 0, detail: { failed } };
});

await check("blog-projects-overlay-ok", async (page) => {
  await page.goto(`${base}/blog`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1800);
  const blogBody = (await page.locator("body").innerText()) || "";
  await page.goto(`${base}/projects`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1800);
  const projBody = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /blog/i.test(blogBody) &&
      (await page.locator("a[href*='/blog/']").count()) >= 1 &&
      /archive|work|project/i.test(projBody),
    detail: {
      blogLinks: await page.locator("a[href*='/blog/']").count(),
      hasWork: /archive|work/i.test(projBody),
    },
  };
});

await check("contact-form-renders", async (page) => {
  await page.goto(`${base}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  // Contact section is on the home page
  const hasContact =
    (await page.locator("#contact").count()) >= 1 ||
    (await page.locator("text=Start a conversation").count()) >= 1;
  return { ok: hasContact, detail: { hasContact } };
});

console.log("\n=== SUMMARY ===");
const failed = results.filter((r) => !r.ok);
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
if (failed.length) {
  console.log("failed:", failed.map((f) => f.name).join(", "));
  process.exitCode = 1;
}
