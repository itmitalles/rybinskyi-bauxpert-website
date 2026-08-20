import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
import lighthouse from "lighthouse";
import { chromium } from "@playwright/test";

const previewPort = Number(process.env.LIGHTHOUSE_PREVIEW_PORT ?? 4322);
const debuggingPort = Number(process.env.LIGHTHOUSE_DEBUG_PORT ?? 9223);
const normalizeBasePath = (value) => {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};
const [githubOwner = "", githubRepository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const inferredBasePath =
  process.env.GITHUB_ACTIONS === "true" && githubRepository && githubRepository !== `${githubOwner}.github.io`
    ? `/${githubRepository}`
    : "";
const basePath = normalizeBasePath(process.env.PUBLIC_BASE_PATH ?? inferredBasePath);
const url = `http://127.0.0.1:${previewPort}${basePath}/`;
const profile = mkdtempSync(join(tmpdir(), "rybinskyi-lighthouse-"));
const outputDirectory = resolve("test-results/lighthouse");
mkdirSync(outputDirectory, { recursive: true });

const preview = spawn(process.execPath, ["scripts/serve-dist.mjs", "--host", "127.0.0.1", "--port", String(previewPort)], { stdio: ["ignore", "pipe", "pipe"] });
const chrome = spawn(chromium.executablePath(), [
  "--headless=new",
  "--no-sandbox",
  "--disable-gpu",
  `--remote-debugging-port=${debuggingPort}`,
  `--user-data-dir=${profile}`,
  "about:blank",
], { stdio: "ignore" });

const waitFor = async (target, attempts = 80) => {
  for (let attempt = 0; attempt < attempts; attempt += 1) {
    try {
      const response = await fetch(target);
      if (response.ok) return;
    } catch {}
    await new Promise((resolvePromise) => setTimeout(resolvePromise, 250));
  }
  throw new Error(`Timed out waiting for ${target}`);
};

const budgets = {
  performance: 0.8,
  accessibility: 0.95,
  "best-practices": 0.9,
  // The intentional noindex preview gate lowers Lighthouse SEO to 0.69.
  // Static and browser gates assert that noindex stays active.
  seo: 0.65,
  totalBytes: 1_000_000,
  largestContentfulPaint: 4_000,
  cumulativeLayoutShift: 0.1,
};

try {
  await Promise.all([waitFor(url), waitFor(`http://127.0.0.1:${debuggingPort}/json/version`)]);
  const result = await lighthouse(url, {
    port: debuggingPort,
    output: "json",
    logLevel: "error",
    disableStorageReset: true,
    onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
  });
  if (!result?.lhr) throw new Error("Lighthouse returned no report");
  const { lhr } = result;
  const failures = [];
  for (const category of ["performance", "accessibility", "best-practices", "seo"]) {
    const minimum = budgets[category];
    const score = lhr.categories[category]?.score;
    if (typeof score !== "number" || score < minimum) failures.push(`${category}: ${score ?? "missing"} < ${minimum}`);
  }
  const totalBytes = lhr.audits["total-byte-weight"]?.numericValue;
  const lcp = lhr.audits["largest-contentful-paint"]?.numericValue;
  const cls = lhr.audits["cumulative-layout-shift"]?.numericValue;
  if (typeof totalBytes !== "number" || totalBytes > budgets.totalBytes) failures.push(`total bytes: ${totalBytes ?? "missing"} > ${budgets.totalBytes}`);
  if (typeof lcp !== "number" || lcp > budgets.largestContentfulPaint) failures.push(`LCP: ${lcp ?? "missing"}ms > ${budgets.largestContentfulPaint}ms`);
  if (typeof cls !== "number" || cls > budgets.cumulativeLayoutShift) failures.push(`CLS: ${cls ?? "missing"} > ${budgets.cumulativeLayoutShift}`);

  writeFileSync(join(outputDirectory, "report.json"), JSON.stringify(lhr, null, 2));
  const summary = Object.fromEntries(Object.entries(lhr.categories).map(([name, category]) => [name, category.score]));
  writeFileSync(join(outputDirectory, "summary.json"), JSON.stringify({ ...summary, totalBytes, lcp, cls, budgets }, null, 2));
  if (failures.length) throw new Error(`Lighthouse budgets failed:\n${failures.join("\n")}`);
  console.log(`Lighthouse budgets passed: ${JSON.stringify(summary)}, bytes=${Math.round(totalBytes)}, LCP=${Math.round(lcp)}ms, CLS=${cls}.`);
} finally {
  preview.kill("SIGTERM");
  chrome.kill("SIGTERM");
  rmSync(profile, { recursive: true, force: true });
}
