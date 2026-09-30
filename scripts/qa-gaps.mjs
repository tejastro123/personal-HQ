import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const results = [];
let consoleErrors = [];

page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push(String(err)));

// Blog index
await page.goto("http://127.0.0.1:8080/blog", { waitUntil: "networkidle" });
await page.waitForTimeout(800);
const blogTitle = await page.locator("h1").first().textContent();
const postCount = await page.locator("article").count();
await page.screenshot({ path: "screenshots/gap-blog-index.png", fullPage: true });
results.push({
  label: "blog-index",
  ok: postCount >= 4 && !!blogTitle?.includes("lab"),
  title: blogTitle,
  postCount,
  consoleErrors: [...consoleErrors],
});

// Blog post
consoleErrors = [];
await page.goto("http://127.0.0.1:8080/blog/quickide-and-the-qucpl-language", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(600);
const postH1 = await page.locator("h1").first().textContent();
const bodyText = await page.locator("article p").count();
await page.screenshot({ path: "screenshots/gap-blog-post.png", fullPage: true });
results.push({
  label: "blog-post",
  ok: !!postH1?.includes("QUICKIDE") && bodyText >= 3,
  title: postH1,
  paragraphs: bodyText,
  consoleErrors: [...consoleErrors],
});

// Project detail with GitHub
consoleErrors = [];
await page.goto("http://127.0.0.1:8080/projects/quickide", {
  waitUntil: "networkidle",
});
await page.waitForTimeout(600);
const ghLinks = page.locator('a[href*="github.com/tejastro123"]');
const ghLinkCount = await ghLinks.count();
const ghHref = ghLinkCount
  ? await ghLinks.first().getAttribute("href")
  : null;
await page.screenshot({ path: "screenshots/gap-project-detail.png", fullPage: true });
results.push({
  label: "project-detail-github",
  ok: ghLinkCount > 0 && ghHref?.includes("QUICKIDE"),
  ghHref,
  consoleErrors: [...consoleErrors],
});

// Contact form copy
consoleErrors = [];
await page.goto("http://127.0.0.1:8080/contact", { waitUntil: "networkidle" });
await page.waitForTimeout(600);
const contactSub = await page
  .locator("section#contact p")
  .first()
  .textContent();
const submitLabel = await page.locator('button[type="submit"]').textContent();
await page.screenshot({ path: "screenshots/gap-contact.png", fullPage: true });
results.push({
  label: "contact-form",
  ok: !!contactSub && !!submitLabel,
  subtitle: contactSub?.trim().slice(0, 120),
  submit: submitLabel?.trim(),
  consoleErrors: [...consoleErrors],
});

// Footer blog link
consoleErrors = [];
await page.goto("http://127.0.0.1:8080/", { waitUntil: "networkidle" });
await page.waitForTimeout(400);
const blogFooter = await page.locator('footer a[href="/blog"]').count();
results.push({
  label: "footer-blog-link",
  ok: blogFooter > 0,
  count: blogFooter,
  consoleErrors: [...consoleErrors],
});

// Navbar blog
const navBlog = await page.locator('nav button, header nav button').filter({ hasText: "Blog" }).count();
results.push({ label: "nav-blog-link", ok: navBlog > 0, count: navBlog });

console.log(JSON.stringify(results, null, 2));
await browser.close();
