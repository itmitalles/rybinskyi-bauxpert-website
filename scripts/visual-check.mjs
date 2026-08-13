import { mkdirSync } from "node:fs";
import { chromium } from "@playwright/test";

const baseUrl = process.env.VISUAL_BASE_URL ?? "http://127.0.0.1:4321";
const output = process.env.VISUAL_OUTPUT ?? "/tmp/rybinskyi-bauxpert-screenshots";
mkdirSync(output, { recursive: true });

const browser = await chromium.launch({ executablePath: "/usr/bin/google-chrome", headless: true });
const cases = [
  { name: "pin-mobile", path: "/", width: 390, height: 844, locked: true },
  { name: "pin-desktop", path: "/", width: 1440, height: 900, locked: true },
  { name: "concepts-mobile", path: "/", width: 390, height: 844, selector: true },
  { name: "home-mobile", path: "/", width: 390, height: 844 },
  { name: "home-desktop", path: "/", width: 1440, height: 900 },
  { name: "premium-mobile", path: "/premium/", width: 390, height: 844, concept: "premium" },
  { name: "premium-desktop", path: "/premium/", width: 1440, height: 900, concept: "premium" },
  { name: "projects-mobile", path: "/projekte/", width: 390, height: 844 },
  { name: "projects-desktop", path: "/projekte/", width: 1440, height: 900 },
  { name: "kitchen-project-mobile", path: "/projekte/kuechenmontage-u-form-muenchen/", width: 390, height: 844 },
  { name: "kitchen-project-desktop", path: "/projekte/kuechenmontage-u-form-muenchen/", width: 1440, height: 900 },
  { name: "contact-desktop", path: "/kontakt/", width: 1440, height: 900 },
];

for (const item of cases) {
  const page = await browser.newPage({ viewport: { width: item.width, height: item.height } });
  if (item.selector) await page.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
  else if (!item.locked) await page.addInitScript((concept) => {
    sessionStorage.setItem("rybinskyi-preview-access", "granted");
    sessionStorage.setItem("rybinskyi-preview-concept", concept);
  }, item.concept ?? "workshop");
  const response = await page.goto(`${baseUrl}${item.path}`, { waitUntil: "networkidle" });
  if (!response?.ok()) throw new Error(`${item.path} returned ${response?.status()}`);
  if (item.selector) {
    if (!(await page.locator("[data-concept-panel]").isVisible())) throw new Error("Concept selection is not visible");
  } else if (item.locked) {
    if (!(await page.locator("[data-pin-gate]").isVisible())) throw new Error("PIN gate is not visible");
  } else {
    await page.evaluate(() => document.querySelectorAll("img").forEach((item) => item.loading = "eager"));
    await page.waitForFunction(() => [...document.images].every((item) => (!item.src && !item.srcset) || (item.complete && item.naturalWidth > 0)), undefined, { timeout: 10_000 }).catch(async () => {
      const broken = await page.evaluate(() => [...document.images].filter((item) => (item.src || item.srcset) && (!item.complete || !item.naturalWidth)).map((item) => item.currentSrc || item.src));
      throw new Error(`${item.path} has unloaded images: ${broken.join(", ")}`);
    });
    const pageImages = page.locator("img[src], img[srcset]");
    for (let index = 0; index < await pageImages.count(); index += 1) {
      await pageImages.nth(index).evaluate((element) => element.scrollIntoView({ block: "center" }));
      await page.waitForTimeout(40);
    }
    await page.waitForFunction(() => [...document.images].every((item) => (!item.src && !item.srcset) || (item.complete && item.naturalWidth > 0)), undefined, { timeout: 20_000 }).catch(async () => {
      const broken = await page.evaluate(() => [...document.images].filter((item) => (item.src || item.srcset) && (!item.complete || !item.naturalWidth)).map((item) => item.currentSrc || item.src));
      throw new Error(`${item.path} has unloaded images after scrolling: ${broken.join(", ")}`);
    });
    await page.evaluate(() => scrollTo(0, 0));
    await page.waitForTimeout(250);
  }
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  if (overflow > 1) throw new Error(`${item.path} has ${overflow}px horizontal overflow at ${item.width}px`);
  await page.screenshot({ path: `${output}/${item.name}.png`, fullPage: !item.locked });
  await page.close();
}

const interactionPage = await browser.newPage({ viewport: { width: 390, height: 844 } });
await interactionPage.addInitScript(() => {
  sessionStorage.setItem("rybinskyi-preview-access", "granted");
  sessionStorage.setItem("rybinskyi-preview-concept", "workshop");
});
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
await builderPage.addInitScript(() => {
  sessionStorage.setItem("rybinskyi-preview-access", "granted");
  sessionStorage.setItem("rybinskyi-preview-concept", "workshop");
});
await builderPage.goto(`${baseUrl}/kontakt/`, { waitUntil: "networkidle" });
await builderPage.locator('input[name="name"]').fill("Testname");
await builderPage.locator('select[name="project"]').selectOption({ label: "Renovierung" });
const builderHref = await builderPage.locator("[data-whatsapp]").getAttribute("href");
if (!builderHref?.includes("Testname") || !builderHref.includes("Renovierung")) throw new Error("Inquiry builder did not update WhatsApp URL");
await builderPage.close();

const galleryPage = await browser.newPage({ viewport: { width: 1280, height: 800 } });
await galleryPage.addInitScript(() => {
  sessionStorage.setItem("rybinskyi-preview-access", "granted");
  sessionStorage.setItem("rybinskyi-preview-concept", "workshop");
});
await galleryPage.goto(`${baseUrl}/projekte/kuechenmontage-u-form-muenchen/`, { waitUntil: "networkidle" });
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
  if (!(await pinPage.locator("[data-concept-panel]").isVisible())) throw new Error("Concept selection did not open after entering the PIN");
  if ((await pinPage.locator("[data-concept-link]").count()) !== 2) throw new Error("Concept selection does not offer two variants");
  await pinPage.locator('[data-concept-link="premium"]').click();
  await pinPage.waitForURL(/\/premium\/$/);
  if (!(await pinPage.locator(".premium-page").isVisible())) throw new Error("Premium concept did not open from the concept selection");
  await pinPage.close();
}
await browser.close();
console.log(`Responsive screenshots written to ${output}. Layout and interactions passed.`);
