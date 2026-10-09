/**
 * QA for admin upgrades: command palette, filter chips, messages search,
 * dashboard public links. Sequential Playwright against the preview.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const shotDir = "screenshots";
mkdirSync(shotDir, { recursive: true });

const ADMIN_EMAIL = "tejas.mellimpudi@gmail.com";
const ADMIN_PASSWORD = "AdminHQ-2026!";

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

  // Prefer sign-in; if the form is in signup mode, switch.
  if (await page.locator("#name").count()) {
    const toggle = page.getByRole("button", { name: /have an account/i });
    if (await toggle.count()) {
      await toggle.click();
      await page.waitForTimeout(400);
    }
  }
  if (!(await page.locator("#email").count())) {
    // Maybe showing signed-in redirect or denied — reload login
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
    // If still on login, try create-account (fresh PGLite after rebuild)
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
  await page.goto(`${base}/hq`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const dash = (await page.locator("body").innerText()) || "";
  const onDash = /dashboard/i.test(dash) && !/access denied/i.test(dash);
  record("dashboard-upgraded", onDash, {
    hasPaletteHint: /⌘K|Commands/i.test(dash),
    hasPublicLinks: /Open public surfaces/i.test(dash),
    hasAuditFilter: /Recent admin activity/i.test(dash),
  });
  await page.screenshot({ path: `${shotDir}/admin-dashboard-upgraded.png`, fullPage: true });

  // Command palette
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(600);
  const paletteVisible =
    (await page.locator("text=Admin palette").count()) >= 1 ||
    (await page.locator("input[placeholder*='Jump to a page']").count()) >= 1;
  await page.screenshot({ path: `${shotDir}/admin-palette.png`, fullPage: false });
  record("command-palette", paletteVisible, { paletteVisible });
  if (paletteVisible) {
    await page.keyboard.type("messages");
    await page.waitForTimeout(400);
    await page.keyboard.press("Enter");
    await page.waitForTimeout(1500);
    const onMessages = /messages|inbox/i.test((await page.locator("body").innerText()) || "");
    record("palette-jump-messages", onMessages && page.url().includes("/hq/messages"), {
      url: page.url(),
    });
  } else {
    await page.keyboard.press("Escape");
  }

  // Messages search + chips
  await page.goto(`${base}/hq/messages`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const msgBody = (await page.locator("body").innerText()) || "";
  const hasSearch = (await page.locator("input[placeholder*='Search name']").count()) >= 1;
  const hasChips = /Unread/.test(msgBody) && /Read/.test(msgBody);
  record("messages-search-chips", hasSearch && hasChips, { hasSearch, hasChips });
  await page.screenshot({ path: `${shotDir}/admin-messages-upgraded.png`, fullPage: true });

  // Projects filter chips
  await page.goto(`${base}/hq/projects`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const projBody = (await page.locator("body").innerText()) || "";
  const hasProjChips = /Published/.test(projBody) && /Draft/.test(projBody) && /Overrides/.test(projBody);
  const hasProjSearch = (await page.locator("input[placeholder*='Search id']").count()) >= 1;
  record("projects-filter-chips", hasProjChips && hasProjSearch, { hasProjChips, hasProjSearch });
  await page.screenshot({ path: `${shotDir}/admin-projects-upgraded.png`, fullPage: true });

  // Blog filter chips
  await page.goto(`${base}/hq/blog`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const blogBody = (await page.locator("body").innerText()) || "";
  const hasBlogChips = /Published/.test(blogBody) && /Draft/.test(blogBody);
  record("blog-filter-chips", hasBlogChips, { hasBlogChips });

  // Site settings dirty indicator (type then check)
  await page.goto(`${base}/hq/site`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const siteBody = (await page.locator("body").innerText()) || "";
  record("site-settings-page", /Site settings|Identity|Social/i.test(siteBody), {});
  const nameInput = page.locator("input").first();
  if (await nameInput.count()) {
    const before = await nameInput.inputValue();
    await nameInput.fill(before + " ");
    await page.waitForTimeout(400);
    const dirtyShown = (await page.locator("text=Unsaved changes").count()) >= 1;
    record("site-dirty-indicator", dirtyShown, { dirtyShown });
    await page.screenshot({ path: `${shotDir}/admin-site-dirty.png`, fullPage: true });
  } else {
    record("site-dirty-indicator", false, { reason: "no input" });
  }

  // Palette keyboard still works after navigation
  await page.goto(`${base}/hq`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  await page.keyboard.press("Control+k");
  await page.waitForTimeout(500);
  const paletteAgain = (await page.locator("input[placeholder*='Jump to a page']").count()) >= 1;
  record("palette-reopen", paletteAgain, { paletteAgain });
  await page.keyboard.press("Escape");
} catch (err) {
  record("fatal", false, { error: String(err) });
  await page.screenshot({ path: `${shotDir}/admin-upgrades-fatal.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}

console.log("\n=== UPGRADE QA SUMMARY ===");
const failed = results.filter((r) => !r.ok);
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
if (failed.length) {
  console.log("failed:", failed.map((f) => f.name).join(", "));
  process.exitCode = 1;
}
if (consoleErrors.length) {
  console.log("consoleErrors sample:", consoleErrors.slice(0, 8));
}
