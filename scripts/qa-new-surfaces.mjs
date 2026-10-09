import { chromium } from "playwright";

const base = process.env.QA_URL || "http://127.0.0.1:8081";
const browser = await chromium.launch();
const results = [];

async function ensureServer() {
  try {
    const r = await fetch(`${base}/`, { method: "GET", redirect: "manual" });
    if (r.status > 0 && r.status < 500) return true;
  } catch {
    /* restart below */
  }
  return false;
}

async function check(name, url, inspect, { viewport = { width: 1280, height: 900 }, waitUntil = "load", settle = 1200 } = {}) {
  if (!(await ensureServer())) {
    results.push({ label: name, ok: false, error: "server-down" });
    console.error(`SERVER DOWN before ${name}`);
    process.exitCode = 1;
    await browser.close();
    process.exit(process.exitCode);
  }
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") consoleErrors.push(msg.text());
  });
  page.on("pageerror", (err) => consoleErrors.push(String(err)));
  try {
    await page.goto(url, { waitUntil, timeout: 90000 });
  } catch (err) {
    results.push({ label: name, ok: false, error: String(err) });
    await page.close().catch(() => {});
    console.error(`GOTO FAIL ${name}: ${err}`);
    // keep going if server still up
    const alive = await ensureServer();
    if (!alive) {
      process.exitCode = 1;
      await browser.close();
      process.exit(process.exitCode);
    }
    return;
  }
  await page.waitForTimeout(settle);
  const data = await inspect(page);
  const body = (await page.locator("body").innerText()) || "";
  const hOverflow = await page.evaluate(() => {
    const d = document.documentElement;
    return d.scrollWidth > d.clientWidth + 1;
  });
  const visible = body.trim().length > 80;
  await page.screenshot({ path: `screenshots/${name}.png`, fullPage: true });
  results.push({
    label: name,
    ok: data.ok && consoleErrors.length === 0 && visible && !hOverflow,
    visible,
    hOverflow,
    ...data,
    consoleErrors,
  });
  await page.close();
}

// Instruments hub
await check("new-instruments", `${base}/instruments`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /qucpl/i.test(body) &&
      /orbit/i.test(body) &&
      /particle/i.test(body) &&
      /chaos/i.test(body) &&
      (await page.locator('a[href*="instruments/qucpl"]').count()) >= 1 &&
      (await page.locator('a[href*="instruments/orbit"]').count()) >= 1 &&
      (await page.locator('a[href*="instruments/particles"]').count()) >= 1 &&
      (await page.locator('a[href*="instruments/chaos"]').count()) >= 1,
  };
});

// QuCPL Lite + Bloch sphere
await check("new-qucpl", `${base}/instruments/qucpl`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /qucpl lite/i.test(body) &&
      /measure/i.test(body) &&
      /bloch/i.test(body) &&
      (await page.locator("button").count()) >= 3 &&
      (await page.locator('[data-testid="bloch-sphere"]').count()) >= 1 &&
      /QUICKIDE/i.test(body),
  };
});

// Chaos Lab — tabbed views: default bifurcation canvas, Lorenz presets after tab click
await check("new-chaos", `${base}/instruments/chaos`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  const bif = (await page.locator('[data-testid="chaos-bifurcation"]').count()) >= 1;
  const views =
    (await page.locator('[data-view="bifurcation"]').count()) >= 1 &&
    (await page.locator('[data-view="logistic"]').count()) >= 1 &&
    (await page.locator('[data-view="lorenz"]').count()) >= 1;
  if (!bif || !views) return { ok: false, bif, views };
  await page.locator('[data-view="lorenz"]').click();
  await page.waitForTimeout(600);
  const lorenzCanvas = (await page.locator('[data-testid="chaos-lorenz"]').count()) >= 1;
  const classic = (await page.locator('button:has-text("Classic")').count()) >= 1;
  return {
    ok: bif && views && lorenzCanvas && classic && /chaos lab/i.test(body),
    bif,
    views,
    lorenzCanvas,
    classic,
  };
}, { settle: 2500 });

// Orbit lab
await check("new-orbit", `${base}/instruments/orbit`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /orbit/i.test(body) &&
      /circular/i.test(body) &&
      /eccentric/i.test(body) &&
      (await page.locator('[data-preset="circular"]').count()) >= 1 &&
      (await page.locator("aside").count()) >= 1,
  };
});

// Particle lab — presets are orbit-swarm / cluster / drift (mode is central|pairwise)
await check("new-particles", `${base}/instruments/particles`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /particle lab/i.test(body) &&
      /webgpu|cpu/i.test(body) &&
      (await page.locator("canvas").count()) >= 1 &&
      (await page.locator('[data-preset="orbit-swarm"]').count()) >= 1 &&
      (await page.locator('[data-preset="cluster"]').count()) >= 1,
  };
}, { settle: 4000 });

// Systems
await check("new-systems", `${base}/systems`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /vitals|integrity|radar|repo pulse|systems/i.test(body) &&
      (await page.locator("svg").count()) >= 1,
  };
});

// Topology — category colors + pan/zoom + legend
await check("new-topology", `${base}/topology`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  const legendCount = await page.locator("span.rounded-full.border").count();
  return {
    ok:
      /topology|graph|related/i.test(body) &&
      (await page.locator("svg").count()) >= 1 &&
      (await page.locator("text").count()) >= 1 &&
      legendCount >= 2 &&
      /reset view/i.test(body) &&
      /accessible list/i.test(body),
    legendCount,
  };
}, { settle: 2500 });

// Resume lenses
for (const lens of ["engineering", "research", "founder"]) {
  await check(`new-resume-${lens}`, `${base}/resume?lens=${lens}`, async (page) => {
    const body = (await page.locator("body").innerText()) || "";
    return {
      ok:
        /lenses/i.test(body) &&
        /engineering/i.test(body) &&
        /research/i.test(body) &&
        /founder/i.test(body) &&
        (await page.locator('[data-testid="resume-lenses"]').count()) === 1,
    };
  });
}

// Blog figures
await check("new-blog-quickide-fig", `${base}/blog/quickide-and-the-qucpl-language`, async (page) => {
  const figs = await page.locator("[data-figure]").count();
  const body = (await page.locator("body").innerText()) || "";
  return { ok: figs >= 1 && /QuCPL mental model/i.test(body), figs };
});

await check("new-blog-rag-figs", `${base}/blog/rag-from-tutorials-to-production-shaped-systems`, async (page) => {
  const figs = await page.locator("[data-figure]").count();
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok: figs >= 2 && /Hybrid retrieval/i.test(body) && /walk-forward/i.test(body),
    figs,
  };
});

await check("new-blog-hq-fig", `${base}/blog/building-personal-hq`, async (page) => {
  const figs = await page.locator("[data-figure]").count();
  const body = await page.locator("body").innerText();
  return { ok: figs >= 1 && /personal-HQ surface map/i.test(body), figs };
});

// Repo pulse on project detail
await check("new-repo-pulse", `${base}/projects/quickide`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return { ok: /repo pulse|last pushed|stars/i.test(body) };
});

// Experiment journal on playground (heavy lazy chunk — needs a longer settle)
await check("new-journal", `${base}/playground?preset=zero-g`, async (page) => {
  const toggle = page.locator('[data-testid="journal-toggle"]');
  // Wait for lazy physics playground to finish mounting
  try {
    await toggle.waitFor({ state: "visible", timeout: 15000 });
  } catch {
    return { ok: false, hasToggle: false, reason: "toggle-timeout" };
  }
  await toggle.click();
  await page.waitForTimeout(600);
  const journal = page.locator('[data-testid="experiment-journal"]');
  const save = page.locator('[data-testid="journal-save"]');
  const open = (await journal.count()) >= 1 && (await save.count()) >= 1;
  if (open) {
    await save.click();
    await page.waitForTimeout(400);
  }
  return { ok: open, hasToggle: true, journalOpen: open };
}, { settle: 4000 });

// Nav contains new destinations
await check("new-nav", `${base}/`, async (page) => {
  const body = (await page.locator("body").innerText()) || "";
  return {
    ok:
      /instruments/i.test(body) &&
      /systems/i.test(body) &&
      (await page.locator('a[href="/instruments"], button:has-text("Instruments")').count()) >= 1 &&
      (await page.locator('a[href="/systems"], button:has-text("Systems")').count()) >= 1,
  };
});

// Mobile overflow sweep on key new routes
for (const [name, path] of [
  ["mobile-instruments", "/instruments"],
  ["mobile-systems", "/systems"],
  ["mobile-topology", "/topology"],
  ["mobile-resume", "/resume"],
  ["mobile-qucpl", "/instruments/qucpl"],
  ["mobile-chaos", "/instruments/chaos"],
  ["mobile-particles", "/instruments/particles"],
  ["mobile-orbit", "/instruments/orbit"],
]) {
  await check(name, `${base}${path}`, async () => ({ ok: true }), {
    viewport: { width: 390, height: 844 },
    settle: path.includes("particles") ? 4000 : 1500,
  });
}

console.log(JSON.stringify(results, null, 2));
const failed = results.filter((r) => !r.ok);
console.error(`FAILED ${failed.length}/${results.length}: ${failed.map((f) => f.label).join(", ") || "none"}`);
process.exitCode = failed.length === 0 ? 0 : 1;
await browser.close();
