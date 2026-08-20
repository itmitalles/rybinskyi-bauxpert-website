import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const phone = "+491786930465";
const whatsappNumber = phone.slice(1);
const email = "info@rybinskyi-bauxpert.de";
const normalizeBasePath = (value: string | undefined) => {
  if (!value || value === "/") return "";
  return `/${value.replace(/^\/+|\/+$/g, "")}`;
};
const [githubOwner = "", githubRepository = ""] = (process.env.GITHUB_REPOSITORY ?? "").split("/");
const inferredBasePath =
  process.env.GITHUB_ACTIONS === "true" && githubRepository && githubRepository !== `${githubOwner}.github.io`
    ? `/${githubRepository}`
    : "";
const basePath = normalizeBasePath(process.env.PUBLIC_BASE_PATH ?? inferredBasePath);
const sitePath = (path: string) => `${basePath}${path}`;
const contentPaths = ["/", "/standard/", "/premium/", "/kleinanzeigen/", "/leistungen/", "/projekte/", "/kontakt/", "/impressum/", "/datenschutz/"];

const unlock = async (page: Page) => {
  await page.addInitScript(() => sessionStorage.setItem("rybinskyi-preview-access", "granted"));
};

test("PIN gate rejects an invalid PIN and opens the three-variant overview", async ({ page }) => {
  await page.goto(sitePath("/"));
  await expect(page.locator("[data-pin-gate]")).toBeVisible();
  await page.locator("#preview-pin").fill("000000");
  await page.locator("[data-pin-form]").press("Enter");
  await expect(page.locator("[data-pin-error]")).toBeVisible();

  const previewPin = process.env.PREVIEW_PIN;
  if (previewPin) {
    await page.locator("#preview-pin").fill(previewPin);
    await page.locator("[data-pin-form]").press("Enter");
    await expect(page.locator("[data-pin-gate]")).toHaveCount(0);
    await expect(page.locator("[data-variant-overview]")).toBeVisible();
    await expect(page.locator("[data-variant-card]")).toHaveCount(3);
  }
});

test("overview exposes exactly three variants and every variant has a prominent return bar", async ({ page }) => {
  await unlock(page);
  await page.goto(sitePath("/"));
  await expect(page.locator("[data-variant-card]")).toHaveCount(3);
  await expect(page.locator("[data-variant-link]")).toHaveCount(3);
  await expect(page.locator("[data-final-concept], [data-change-concept], [data-concept-panel]")).toHaveCount(0);

  for (const variant of ["standard", "premium", "kleinanzeigen"] as const) {
    await page.locator(`[data-variant-link="${variant}"]`).click();
    await expect(page.locator(`[data-preview-variant="${variant}"]`)).toBeVisible();
    const returnBar = page.locator("[data-variant-back]");
    await expect(returnBar).toBeVisible();
    await expect(returnBar).toContainText("Zurück zur Variantenübersicht");
    const box = await returnBar.boundingBox();
    const viewport = page.viewportSize();
    expect(box).not.toBeNull();
    expect(viewport).not.toBeNull();
    expect(box!.y).toBeLessThanOrEqual(1);
    expect(box!.height).toBeGreaterThanOrEqual(60);
    expect(box!.width).toBeGreaterThanOrEqual(viewport!.width - 1);

    const hero = page.locator('[data-hero-kind="kitchen"]');
    await expect(hero).toBeVisible();
    await expect(hero.locator("img").first()).toHaveAttribute("alt", /Küch/i);
    await expect(hero).not.toContainText(/Sauna/i);
    await returnBar.getByRole("link", { name: /Zurück zur Variantenübersicht/ }).click();
    await expect(page.locator("[data-variant-overview]")).toBeVisible();
  }
});

test("Kleinanzeigen package provides copyable text and downloadable customer photos", async ({ page, context }) => {
  await unlock(page);
  const externalRequests: string[] = [];
  context.on("request", (request) => {
    const target = new URL(request.url());
    if (target.origin !== "http://127.0.0.1:4321") externalRequests.push(request.url());
  });
  await page.goto(sitePath("/kleinanzeigen/"), { waitUntil: "networkidle" });
  await expect(page.getByText("Anzeigenentwurf · nicht veröffentlicht", { exact: true })).toBeVisible();
  await expect(page.locator("[data-customer-photo]")).toHaveCount(4);
  await expect(page.locator("[data-customer-photo] a[download]")).toHaveCount(4);
  await expect(page.locator("#ad-title")).toHaveValue(/Küchenmontage, Möbelmontage/);
  await expect(page.locator("#ad-text")).toHaveValue(/\+49 178 693 0465/);
  await expect(page.locator("#ad-text")).toHaveValue(new RegExp(email.replace(/[.]/g, "\\.")));
  await page.getByRole("button", { name: "Titel kopieren" }).click();
  await expect(page.getByRole("button", { name: "Kopiert ✓" })).toBeVisible();
  await page.getByRole("button", { name: "Text kopieren" }).click();
  await expect(page.getByRole("button", { name: "Kopiert ✓" })).toHaveCount(2);
  expect(externalRequests).toEqual([]);
});

for (const path of contentPaths) {
  test(`${path} has no horizontal overflow or serious axe finding`, async ({ page }) => {
    await unlock(page);
    const externalResources: string[] = [];
    page.on("request", (request) => {
      const target = new URL(request.url());
      if (target.origin !== "http://127.0.0.1:4321") externalResources.push(request.url());
    });
    const response = await page.goto(sitePath(path), { waitUntil: "networkidle" });
    expect(response?.ok()).toBeTruthy();
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(1);
    expect(externalResources).toEqual([]);
    const results = await new AxeBuilder({ page }).analyze();
    const serious = results.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
    expect(serious, serious.map((violation) => `${violation.id}: ${violation.help}`).join("\n")).toEqual([]);
  });
}

test("mobile menu opens on a website variant and exposes the shared navigation", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith("mobile"), "Mobile navigation check");
  await unlock(page);
  await page.goto(sitePath("/standard/"));
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
  await page.goto(sitePath("/kontakt/"), { waitUntil: "networkidle" });
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
  await page.goto(sitePath("/"));
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow,noarchive");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://rybinskyi-bauxpert.de/");
  await page.goto(sitePath("/kleinanzeigen/"));
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex,nofollow,noarchive");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://rybinskyi-bauxpert.de/kleinanzeigen/");

  const sitemap = await request.get(sitePath("/sitemap.xml"));
  expect(sitemap.ok()).toBeTruthy();
  const sitemapBody = await sitemap.text();
  expect(sitemapBody).toContain("https://rybinskyi-bauxpert.de/");
  expect(sitemapBody).not.toContain("/standard/");
  expect(sitemapBody).not.toContain("/premium/");
  expect(sitemapBody).not.toContain("/kleinanzeigen/");

  const robots = await request.get(sitePath("/robots.txt"));
  expect(await robots.text()).toBe("User-agent: *\nDisallow: /\n");
  expect((await request.get(sitePath("/impressum/"))).ok()).toBeTruthy();
  expect((await request.get(sitePath("/datenschutz/"))).ok()).toBeTruthy();
  expect((await request.get(sitePath("/standard/"))).ok()).toBeTruthy();
  expect((await request.get(sitePath("/premium/"))).ok()).toBeTruthy();
  expect((await request.get(sitePath("/kleinanzeigen/"))).ok()).toBeTruthy();
  expect((await request.get(sitePath("/release-gate-missing-page/"))).status()).toBe(404);
});

test("visual screenshots cover overview, all variants and contact on desktop and mobile", async ({ page }, testInfo) => {
  await unlock(page);
  for (const [name, path] of [["overview", "/"], ["standard", "/standard/"], ["premium", "/premium/"], ["kleinanzeigen", "/kleinanzeigen/"], ["contact", "/kontakt/"]] as const) {
    await page.goto(sitePath(path), { waitUntil: "networkidle" });
    const screenshotPath = testInfo.outputPath(`${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    await testInfo.attach(`${testInfo.project.name}-${name}`, { path: screenshotPath, contentType: "image/png" });
  }
});
