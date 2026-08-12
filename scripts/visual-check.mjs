import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4321";
const output = process.env.VISUAL_OUTPUT ?? "/tmp/rybinskyi-bauxpert-screenshots";
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", headless: true });
const cases = [
  { name: "pin-mobile", path: "/", width: 390, height: 844, locked: true },
  { name: "project-wide", path: "/projekte/sauna-ausbau-muenchen/", width: 1920, height: 1080 },
  { name: "home-mobile", path: "/", width: 390, height: 844 },
  { name: "projects-tablet", path: "/projekte/", width: 768, height: 1024 },
  { name: "contact-desktop", path: "/kontakt/", width: 1440, height: 900 },
];

for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height } });
  if (!item.locked) await page.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
  const response = await page.goto(`${baseUrl}${item.path}`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${item.path} returned ${response?.status()}`);
  if (item.locked) {
    if (!(await page.locator("[data-pin-gate]").isVisible())) throw new Error("PIN gate is not visible");
  } else {
    await page.evaluate(() => document.querySelectorAll("img").forEach((item) => item.loading = "eager"));
    await page.waitForFunction(() => [...document.images].every((item) => (!item.src && !item.srcset) || (item.complete && item.naturalWidth > 0)), undefined, { timeout: 10_000 }).catch(async () => {
      const broken = await page.evaluate(() => [...document.images].filter((item) => (item.src || item.srcset) && (!item.complete || !item.naturalWidth)).map((item) => item.currentSrc || item.src));
      throw new Error(`${item.path} has unloaded images: ${broken.join(", ")}`);
    });
    await page.waitForTimeout(250);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`${item.path} has ${overflow}px horizontal overflow at ${item.width}px`);
  await page.screenshot({ path: `${output}/${item.name}.png`, fullPage: true });
  await page.close();
}

const interactionPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await interactionPage.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
await interactionPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
await interactionPage.locator("[data-menu-toggle]").click();
if (!(await interactionPage.locator("[data-mobile-menu]").isVisible())) {
  const state = await interactionPage.locator("[data-menu-toggle]").getAttribute("aria-expanded");
  const hidden = await interactionPage.locator("[data-mobile-menu]").getAttribute("hidden");
  const computed = await interactionPage.locator("[data-mobile-menu]").evaluate((element) => {
    const style = getComputedStyle(element);
    return { display: style.display, visibility: style.visibility, width: style.width, height: style.height, position: style.position };
  });
  throw new Error(`Mobile menu did not open (expanded=${state}, hidden=${hidden}, computed=${JSON.stringify(computed)})`);
}
await interactionPage.close();

const builderPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await builderPage.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
await builderPage.goto(`${baseUrl}/kontakt/`, { waitUntil: "networkidle" });
await builderPage.locator('input[name="name"]').fill("Testname");
await builderPage.locator('select[name="project"]').selectOption({ label: "Renovierung" });
const builderHref = await builderPage.locator("[data-whatsapp]").getAttribute("href");
if (!builderHref?.includes("Testname") || !builderHref.includes("Renovierung")) throw new Error("Inquiry builder did not update WhatsApp URL");
await builderPage.close();

const galleryPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await galleryPage.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
await galleryPage.goto(`${baseUrl}/projekte/sauna-ausbau-muenchen/`, { waitUntil: "networkidle" });
await galleryPage.locator("[data-lightbox-open]").first().click();
if (!(await galleryPage.locator("[data-lightbox]").isVisible())) throw new Error("Project lightbox did not open");
await galleryPage.locator("[data-lightbox-close]").click();
await galleryPage.close();

if (process.env.PREVIEW_PIN) {
  const pinPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pinPage.goto(`${baseUrl}/`, { waitUntil: "networkidle" });
  await pinPage.locator("#preview-pin").fill("000000");
  await pinPage.locator("[data-pin-form]").press("Enter");
  if (!(await pinPage.locator("[data-pin-error]").isVisible())) throw new Error("Incorrect PIN did not show an error");
  await pinPage.locator("#preview-pin").fill(process.env.PREVIEW_PIN);
  await pinPage.locator("[data-pin-form]").press("Enter");
  await pinPage.locator("[data-pin-gate]").waitFor({ state: "detached" });
  await pinPage.close();
}
await browser.close();
console.log(`Responsive screenshots written to ${output}. Layout and interactions passed.`);
