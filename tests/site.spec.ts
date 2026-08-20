import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const phone = "+491786930465";
const whatsappNumber = phone.slice(1);
const email = "info@rybinskyi-bauxpert.de";
const contentPaths = ["/", "/leistungen/", "/projekte/", "/kontakt/", "/impressum/", "/datenschutz/"];

const unlock = async (page: Page) => {
  await page.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
};

test("PIN gate rejects an invalid PIN and opens only the final concept", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("[data-pin-gate]")).toBeVisible();
  await page.locator("#preview-pin").fill("000000");
  await page.locator("[data-pin-form]").press("Enter");
  await expect(page.locator("[data-pin-error]")).toBeVisible();

  const previewPin = process.env.PREVIEW_PIN;
  if (previewPin) {
    await page.locator("#preview-pin").fill(previewPin);
    await page.locator("[data-pin-form]").press("Enter");
    await expect(page.locator("[data-pin-gate]")).toHaveCount(0);
    await expect(page.locator('[data-final-concept="premium-grounded"]')).toBeVisible();
    await expect(page.locator("[data-concept-panel], [data-change-concept]")).toHaveCount(0);
  }
});

test("home shows one kitchen-led concept and keeps sauna below the main area", async ({ page }) => {
  await unlock(page);
  await page.goto("/");
  await expect(page.locator("[data-final-concept]")).toHaveCount(1);
  const hero = page.locator('[data-hero-kind="kitchen"]');
  await expect(hero).toBeVisible();
  await expect(hero.locator("img")).toHaveAttribute("alt", /Küchen/i);
  await expect(hero).not.toContainText(/Sauna/i);
  await expect(page.locator('a[href*="/premium/"]')).toHaveCount(0);
  await expect(page.locator("[data-change-concept], [data-concept-panel]")).toHaveCount(0);
  const heroBox = await hero.boundingBox();
  const saunaBox = await page.getByRole("heading", { name: "Sauna-Ausbau" }).boundingBox();
  expect(heroBox).not.toBeNull();
  expect(saunaBox).not.toBeNull();
  expect(saunaBox!.y).toBeGreaterThan(heroBox!.y + heroBox!.height);
});

for (const path of contentPaths) {
  test(`${path} has no horizontal overflow or serious axe finding`, async ({ page }) => {
    await unlock(page);
    const externalResources: string[] = [];
    page.on("request", (request) => {
      const target = new URL(request.url());
      if (target.origin !== "http://127.0.0.1:4321") externalResources.push(request.url());
    });
    const response = await page.goto(path, { waitUntil: "networkidle" });
    expect(response?.ok()).toBeTruthy();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(externalResources).toEqual([]);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  });
}

test("mobile menu opens and exposes the final navigation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile navigation check");
  await unlock(page);
  await page.goto("/");
  await page.locator("[data-menu-toggle]").click();
  await expect(page.locator("[data-menu-toggle]")).toHaveAttribute("aria-expanded", "true");
  await expect(page.locator("[data-mobile-menu]")).toBeVisible();
  await expect(page.locator("[data-mobile-menu]")).toContainText("Referenzen");
});

test("contact links are exact and the builder sends nothing before a conscious action", async ({ page, context }) => {
  await unlock(page);
  const externalRequests: string[] = [];
  context.on("request", (request) => {
    const target = new URL(request.url());
    if (target.origin !== "http://127.0.0.1:4321") externalRequests.push(request.url());
  });
  await page.goto("/kontakt/", { waitUntil: "networkidle" });
  await page.locator('input[name="name"]').fill("Testname");
  await page.locator('select[name="project"]').selectOption({ label: "Küchenmontage" });
  await page.locator('textarea[name="description"]').fill("Montageanfrage");
  expect(externalRequests).toEqual([]);

  await expect(page.locator(`.contact-options a[href="tel:${phone}"]`)).toBeVisible();
  await expect(page.locator(`.contact-options a[href="mailto:${email}"]`)).toBeVisible();
  const whatsapp = page.locator("[data-whatsapp]");
  const whatsappHref = await whatsapp.getAttribute("href");
  expect(whatsappHref).toMatch(new RegExp(`^https://wa\\.me/${whatsappNumber}\\?text=`));
  expect(decodeURIComponent(whatsappHref!)).toContain("Testname");
  expect(decodeURIComponent(whatsappHref!)).toContain("Küchenmontage");
  const emailHref = await page.locator("[data-email]").getAttribute("href");
  expect(emailHref).toMatch(new RegExp(`^mailto:${email}\\?subject=`));

  await context.route("https://wa.me/**", (route) => route.fulfill({ status: 200, contentType: "text/html", body: "WhatsApp fallback target" }));
  const [popup] = await Promise.all([page.waitForEvent("popup"), whatsapp.click()]);
  await popup.waitForLoadState();
  expect(popup.url()).toMatch(new RegExp(`^https://wa\\.me/${whatsappNumber}`));
  expect(externalRequests).toHaveLength(1);
});

test("preview metadata, legal routes, sitemap, robots and 404 stay coherent", async ({ page, request }) => {
  await unlock(page);
  await page.goto("/");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow,noarchive");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://rybinskyi-bauxpert.de/");

  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("https://rybinskyi-bauxpert.de/");
  expect(sitemapBody).not.toContain("/premium/");

  const robots = await request.get("/robots.txt");
  expect(await robots.text()).toBe("User-agent: *\nDisallow: /\n");
  expect((await request.get("/impressum/")).ok()).toBeTruthy();
  expect((await request.get("/datenschutz/")).ok()).toBeTruthy();
  expect((await request.get("/premium/")).status()).toBe(404);
  expect((await request.get("/release-gate-missing-page/")).status()).toBe(404);
});

test("visual screenshots cover final desktop and mobile layouts", async ({ page }, testInfo) => {
  await unlock(page);
  for (const [name, path] of [["home", "/"], ["services", "/leistungen/"], ["contact", "/kontakt/"]] as const) {
    await page.goto(path, { waitUntil: "networkidle" });
    const screenshotPath = testInfo.outputPath(`${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`${testInfo.project.name}-${name}`, { path: screenshotPath, contentType: "image/png" });
  }
});
