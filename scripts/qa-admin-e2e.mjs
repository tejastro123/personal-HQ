/**
 * End-to-end admin flow: signup with allowlisted email → dashboard →
 * create project → verify public overlay → create blog post → site settings.
 * Sequential Playwright against the preview server.
 */
import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const shotDir = "screenshots";
mkdirSync(shotDir, { recursive: true });

const ADMIN_EMAIL = "tejas.mellimpudi@gmail.com";
const ADMIN_PASSWORD = "AdminHQ-2026!";
const TS = Date.now();
const TEST_PROJECT_ID = `qa-admin-${TS}`;
const TEST_POST_SLUG = `qa-admin-post-${TS}`;

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

try {
  // 1. Sign up
  await page.goto(`${base}/login`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  const body = (await page.locator("body").innerText()) || "";
  if (/need an account/i.test(body)) {
    await page.getByRole("button", { name: /need an account/i }).click();
    await page.waitForTimeout(400);
  }
  await page.fill("#name", "Tejas Admin");
  await page.fill("#email", ADMIN_EMAIL);
  await page.fill("#password", ADMIN_PASSWORD);
  await page.screenshot({ path: `${shotDir}/admin-signup-filled.png`, fullPage: true });
  await page.getByRole("button", { name: "Create account", exact: true }).click();
  await page.waitForTimeout(3500);
  await page.screenshot({ path: `${shotDir}/admin-after-auth.png`, fullPage: true });
  const afterAuth = (await page.locator("body").innerText()) || "";
  const url = page.url();
  record("auth-signup", /hq|dashboard|operator|admin|access denied|sign in/i.test(afterAuth) || url.includes("/hq"), {
    url,
    snippet: afterAuth.slice(0, 200),
  });

  // If we landed on login again, try sign-in mode
  if (url.includes("/login")) {
    if (/have an account/i.test(afterAuth)) {
      await page.getByRole("button", { name: /have an account/i }).click();
      await page.waitForTimeout(400);
    }
    await page.fill("#email", ADMIN_EMAIL);
    await page.fill("#password", ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Sign in", exact: true }).click();
    await page.waitForTimeout(3500);
  }

  // 2. Dashboard
  await page.goto(`${base}/hq`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(3000);
  await page.screenshot({ path: `${shotDir}/admin-dashboard.png`, fullPage: true });
  const dash = (await page.locator("body").innerText()) || "";
  const onDashboard =
    /dashboard/i.test(dash) &&
    /db projects|audit|messages/i.test(dash) &&
    !/access denied/i.test(dash);
  record("dashboard-access", onDashboard, { snippet: dash.slice(0, 220) });

  // 3. Create project
  await page.goto(`${base}/hq/projects`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: /new project/i }).click();
  await page.waitForTimeout(500);
  // Scope to the editor card — page-level inputs include the search box.
  const idField = page.locator('input[placeholder="my-project"]');
  await idField.fill(TEST_PROJECT_ID);
  // Title is the labeled field next to ID in the editor grid.
  const titleField = page.getByLabel(/title/i).first();
  if (await titleField.count()) {
    await titleField.fill("QA Admin Project");
  } else {
    // Fallback: second input inside the edit card after the id field.
    const cardInputs = page.locator('input:not([placeholder="Search id, title, category…"])');
    await cardInputs.nth(1).fill("QA Admin Project");
  }
  // Description
  const textareas = page.locator("textarea");
  await textareas.nth(0).fill("Created by admin QA to verify CRUD overlay.");
  await textareas.nth(1).fill("Long description for QA admin project overlay test.");
  await page.getByRole("button", { name: /save project/i }).click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${shotDir}/admin-project-saved.png`, fullPage: true });
  const afterSave = (await page.locator("body").innerText()) || "";
  const projectSaved =
    afterSave.includes(TEST_PROJECT_ID) || /saved project/i.test(afterSave);
  record("project-create", projectSaved, { id: TEST_PROJECT_ID, snippet: afterSave.slice(0, 180) });

  // 4. Public overlay
  await page.goto(`${base}/projects`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const projPage = (await page.locator("body").innerText()) || "";
  await page.screenshot({ path: `${shotDir}/public-projects-after-admin.png`, fullPage: true });
  record("project-public-overlay", projPage.includes("QA Admin Project"), {
    found: projPage.includes("QA Admin Project"),
  });

// 5. Blog post
  await page.goto(`${base}/hq/blog`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  await page.getByRole("button", { name: /new post/i }).click();
  await page.waitForTimeout(500);
  await page.locator('input[placeholder="my-post"]').fill(TEST_POST_SLUG);
  // Title via label to avoid the search input
  const blogTitle = page.getByLabel(/title/i).first();
  if (await blogTitle.count()) {
    await blogTitle.fill("QA Admin Blog Post");
  } else {
    const cardInputs = page.locator('input:not([placeholder="Search slug, title, tags…"])');
    await cardInputs.nth(1).fill("QA Admin Blog Post");
  }
  await page.locator("textarea").nth(0).fill("Excerpt written by admin QA.");
  await page.locator("textarea").nth(1).fill(
    "First paragraph from admin console.\n\nSecond paragraph after blank line.",
  );
  await page.getByRole("button", { name: /save post/i }).click();
  await page.waitForTimeout(2500);
  await page.screenshot({ path: `${shotDir}/admin-blog-saved.png`, fullPage: true });
  const blogSaved = ((await page.locator("body").innerText()) || "").includes(TEST_POST_SLUG);
  record("blog-create", blogSaved, { slug: TEST_POST_SLUG });


  // 6. Public blog
  await page.goto(`${base}/blog`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);
  const blogPage = (await page.locator("body").innerText()) || "";
  record("blog-public-overlay", blogPage.includes("QA Admin Blog Post"), {
    found: blogPage.includes("QA Admin Blog Post"),
  });

  // 7. Site settings
  await page.goto(`${base}/hq/site`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const siteBody = (await page.locator("body").innerText()) || "";
  record("site-settings-page", /site settings|identity|social/i.test(siteBody), {
    snippet: siteBody.slice(0, 160),
  });
  await page.screenshot({ path: `${shotDir}/admin-site-settings.png`, fullPage: true });

  // 8. Messages empty state
  await page.goto(`${base}/hq/messages`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const msgBody = (await page.locator("body").innerText()) || "";
  record("messages-page", /messages|inbox|empty/i.test(msgBody), {
    snippet: msgBody.slice(0, 160),
  });

  // 9. Resume lenses
  await page.goto(`${base}/hq/resume`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2000);
  const resumeBody = (await page.locator("body").innerText()) || "";
  record("resume-admin", /resume lenses|engineering|research|founder/i.test(resumeBody), {
    snippet: resumeBody.slice(0, 160),
  });

  // 10. Nav does not leak /hq
  await page.goto(`${base}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(1500);
  const home = (await page.locator("body").innerText()) || "";
  const navHq = await page.locator('nav a[href="/hq"]').count();
  record("hq-not-in-public-nav", navHq === 0 && !/admin console/i.test(home), { navHq });
} catch (err) {
  record("fatal", false, { error: String(err) });
  await page.screenshot({ path: `${shotDir}/admin-e2e-fatal.png`, fullPage: true }).catch(() => {});
} finally {
  await browser.close();
}

console.log("\n=== E2E SUMMARY ===");
const failed = results.filter((r) => !r.ok);
console.log(`passed=${results.length - failed.length} failed=${failed.length}`);
if (failed.length) {
  console.log("failed:", failed.map((f) => f.name).join(", "));
  process.exitCode = 1;
}
if (consoleErrors.length) {
  console.log("consoleErrors sample:", consoleErrors.slice(0, 8));
}
