/**
 * QA for main-site home content controls in /hq/home.
 * Edits hero copy, saves, verifies public home reflects it.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const shotDir = "screenshots";
mkdirSync(shotDir, { recursive: true });

const ADMIN_EMAIL = "tejas.mellimpudi@gmail.com";
const ADMIN_PASSWORD = "AdminHQ-2026!";
const HEADLINE_MARKER = `QA Home Copy ${Date.now()}`;

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({ viewport: { width: 1400, height: 900 } });
const page = await context.newPage();
const consoleErrors = [];
page.on("pageerror", (err) => consoleErrors.push(String(err)));
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});

const results = [];
function record(name, ok, detail = {}) {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"} ${name}`, JSON.stringify(detail));
}

async function ensureAuth() {
  await page.goto(`${base}/login`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);

  if (await page.locator("#name").count()) {
    const toggle = page.getByRole("button", { name: /have an account/i });
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(400);
    }
  }
  if (!(await page.locator("#email").count())) {
    await page.goto(`${base}/login`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1200);
    if (await page.locator("#name").count()) {
      const toggle = page.getByRole("button", { name: /have an account/i });
      if (await toggle.count()) {
        await toggle.click();
        await page.waitForTimeout(400);
      }
    }
  }

  if (await page.locator("#email").count()) {
    await page.fill("#email", ADMIN_EMAIL);
    await page.fill("#password", ADMIN_PASSWORD);
    const submit = page.getByRole("button", { name: "Sign in", exact: true });
    if (await submit.count()) {
      await submit.click();
      await page.waitForTimeout(3000);
    }
    if (page.url().includes("/login")) {
      await page.goto(`${base}/login`, { waitUntil: "load", timeout: 60000 });
      await page.waitForTimeout(1000);
      if (!(await page.locator("#name").count())) {
        const need = page.getByRole("button", { name: /need an account/i });
        if (await need.count()) {
          await need.click();
          await page.waitForTimeout(400);
        }
      }
      if (await page.locator("#name").count()) {
        await page.fill("#name", "Tejas Admin");
      }
      await page.fill("#email", ADMIN_EMAIL);
      await page.fill("#password", ADMIN_PASSWORD);
      const create = page.getByRole("button", { name: "Create account", exact: true });
      if (await create.count()) {
        await create.click();
        await page.waitForTimeout(3500);
      }
    }
  }
}

try {
  await ensureAuth();

  // Nav / shell has Home content entry
  await page.goto(`${base}/hq`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const dashBody = (await page.locator("body").innerText()) || "";
  record(
    "nav-home-content-link",
    /Home content/i.test(dashBody) && !/access denied/i.test(dashBody),
    { hasNav: /Home content/i.test(dashBody) },
  );

  // Palette can jump to Home content
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(500);
  if (await page.locator("input[placeholder*='Jump to a page']").count()) {
    await page.keyboard.type("Home content");
    await page.waitForTimeout(400);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1500);
    record("palette-jump-home", page.url().includes("/hq/home"), { url: page.url() });
  } else {
    record("palette-jump-home", false, { reason: "palette not open" });
  }

  // Direct nav to home admin
  await page.goto(`${base}/hq/home`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const homeBody = (await page.locator("body").innerText()) || "";
  const pageReady =
    /Home content/i.test(homeBody) &&
    /Hero/i.test(homeBody) &&
    /Headline/i.test(homeBody) &&
    /Nav CTA/i.test(homeBody);
  record("home-admin-page", pageReady && !/access denied/i.test(homeBody), {
    hasHero: /Hero/i.test(homeBody),
    hasHeadline: /Headline/i.test(homeBody),
    hasNavCta: /Nav CTA/i.test(homeBody),
  });
  await page.screenshot({ path: `${shotDir}/admin-home-content.png`, fullPage: true });

  // Edit headline via labeled field
  const headline = page.getByLabel("Headline", { exact: true });
  const headlineCount = await headline.count();
  if (headlineCount) {
    await headline.fill(HEADLINE_MARKER);
    await page.waitForTimeout(500);
    const dirty = (await page.locator("text=Unsaved changes").count()) >= 1;
    record("home-dirty-indicator", dirty, { dirty });
    await page.screenshot({ path: `${shotDir}/admin-home-dirty.png`, fullPage: true });

    const saveBtn = page.getByRole("button", { name: /save/i }).first();
    if (await saveBtn.count()) {
      await saveBtn.click();
      await page.waitForTimeout(3000);
      const saved = /saved/i.test((await page.locator("body").innerText()) || "");
      record("home-save-success", saved, { saved });
    } else {
      record("home-save-success", false, { reason: "no save button" });
    }
  } else {
    record("home-dirty-indicator", false, { reason: "no headline field", headlineCount });
  }

  // Public home reflects the new headline
  await page.goto(`${base}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3500);
  const publicBody = (await page.locator("body").innerText()) || "";
  const reflected = publicBody.includes(HEADLINE_MARKER);
  record("public-home-reflects-headline", reflected, {
    marker: HEADLINE_MARKER,
    sample: publicBody.slice(0, 120),
  });
  await page.screenshot({ path: `${shotDir}/public-home-after-home-admin.png`, fullPage: false });

  // Public sections still render (skills/about/contact fallbacks + settings)
  record("public-home-sections", /capabilities|start a conversation|ambitious idea|selected work/i.test(publicBody), {
    hasSkills: /A working stack|Capabilities/i.test(publicBody),
    hasContact: /Start a conversation/i.test(publicBody),
    hasCta: /Have an ambitious idea|Let's work together/i.test(publicBody),
  });

  // Restore a clean headline so the preview isn't left with the QA marker
  await page.goto(`${base}/hq/home`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const headline2 = page.getByLabel("Headline", { exact: true });
  if (await headline2.count()) {
    await headline2.fill("Building ambitious ideas into real systems.");
    await page.waitForTimeout(400);
    const saveBtn = page.getByRole("button", { name: /save/i }).first();
    if (await saveBtn.count()) await saveBtn.click();
    await page.waitForTimeout(2000);
  }
} catch (err) {
  record("fatal", false, { error: String(err) });
  await page.screenshot({ path: `${shotDir}/admin-home-content-fatal.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}

console.log("\n=== HOME CONTENT QA SUMMARY ===");
const failed = results.filter((r) => !r.ok);
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
if (failed.length) {
  console.log("failed:", failed.map((f) => f.name).join(", "));
  process.exitCode = 1;
}
if (consoleErrors.length) {
  console.log("consoleErrors sample:", consoleErrors.slice(0, 8));
}
