import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`${base}/`, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
// switch to light if currently dark
const cls = await page.evaluate(() => document.documentElement.className);
if (!cls.includes("light")) {
  await page.locator('[data-theme-toggle="true"]').first().click();
  await page.waitForTimeout(400);
}
await page.screenshot({ path: "screenshots/qa-design-home-light.png", fullPage: false });
const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);

await page.goto(`${base}/blog/quickide-and-the-qucpl-language`, { waitUntil: "networkidle" });
await page.waitForTimeout(500);
  const bodyText = await page.locator("article").innerText();
  await page.screenshot({ path: "screenshots/qa-design-blog-post.png", fullPage: true });
  const hasReadTime = /\d+\s*min read/i.test(bodyText);
  const hasRelatedProjects = /related projects/i.test(bodyText);

  await page.goto(`${base}/projects/quickide`, { waitUntil: "networkidle" });
  await page.waitForTimeout(500);
  const detail = await page.locator("article").innerText();
  await page.screenshot({ path: "screenshots/qa-design-case-study.png", fullPage: true });

  console.log(
    JSON.stringify(
      {
        lightBg,
        hasReadTime,
        hasRelatedProjects,
        hasCaseStudyNotes: /case study notes/i.test(detail),
        hasStack: detail.includes("STACK") || detail.includes("Stack"),
        errors,
      },
      null,
      2,
    ),
  );
await browser.close();
