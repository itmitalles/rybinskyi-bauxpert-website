import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, normalize, relative, resolve } from "node:path";

const root = resolve("dist");
if (!existsSync(root)) throw new Error("dist/ is missing. Run npm run build first.");

const files = [];
const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
};
walk(root);

const htmlFiles = files.filter((path) => path.endsWith(".html"));
const failures = [];
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const productionOrigin = "https://rybinskyi-bauxpert.de";
const expectedPhone = "+491786930465";
const expectedEmail = "info@rybinskyi-bauxpert.de";

const stripProjectBase = (pathname) => {
  if (repositoryName && pathname.startsWith(`/${repositoryName}/`)) return pathname.slice(repositoryName.length + 1);
  if (repositoryName && pathname === `/${repositoryName}`) return "/";
  return pathname;
};

const htmlPathForUrl = (pathname) => {
  const clean = stripProjectBase(decodeURIComponent(pathname));
  const direct = join(root, clean);
  const candidates = clean === "/"
    ? [join(root, "index.html")]
    : [direct, join(direct, "index.html"), join(root, `${clean.replace(/^\//, "").replace(/\/$/, "")}.html`)];
  return candidates.find((path) => existsSync(normalize(path)) && statSync(normalize(path)).isFile());
};

const attributeValues = (html, attribute) => [...html.matchAll(new RegExp(`${attribute}="([^"]+)"`, "g"))].map((match) => match[1]);
const idsFor = (htmlPath) => new Set(attributeValues(readFileSync(htmlPath, "utf8"), "id"));

const checkLocalReference = (htmlPath, rawUrl) => {
  if (!rawUrl || rawUrl.startsWith("mailto:") || rawUrl.startsWith("tel:") || rawUrl.startsWith("https:") || rawUrl.startsWith("http:") || rawUrl.startsWith("data:")) return;
  if (rawUrl.startsWith("javascript:")) {
    failures.push(`${relative(root, htmlPath)}: javascript URL is not allowed`);
    return;
  }
  const currentUrl = new URL(relative(root, htmlPath).replace(/index\.html$/, ""), "https://local.invalid/");
  const target = new URL(rawUrl, currentUrl);
  const targetPath = htmlPathForUrl(target.pathname);
  if (!targetPath) {
    const clean = stripProjectBase(decodeURIComponent(target.pathname));
    const fileTarget = join(root, clean);
    if (!existsSync(normalize(fileTarget))) failures.push(`${relative(root, htmlPath)}: broken local reference ${rawUrl}`);
    return;
  }
  if (target.hash) {
    const fragment = decodeURIComponent(target.hash.slice(1));
    if (fragment && !idsFor(targetPath).has(fragment)) failures.push(`${relative(root, htmlPath)}: missing fragment target ${rawUrl}`);
  }
};

for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, "utf8");
  const label = relative(root, htmlPath);
  const isRedirect = /<meta http-equiv="refresh"/.test(html);
  if (!/<html lang="de"/.test(html)) failures.push(`${label}: missing German document language`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${label}: missing meta description`);
  if (!/<meta name="robots" content="noindex,nofollow,noarchive"/.test(html) && !isRedirect) failures.push(`${label}: preview robots meta is missing`);
  if (isRedirect && !/<meta name="robots" content="noindex/.test(html)) failures.push(`${label}: redirect is indexable`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  if (!canonical?.startsWith(productionOrigin)) failures.push(`${label}: production canonical URL is missing`);
  if (canonical?.includes(`/${repositoryName}/`)) failures.push(`${label}: canonical contains the GitHub Pages base path`);
  if (/Ukraine|Donbass|Baufirma|mehreren Mitarbeiter/i.test(html)) failures.push(`${label}: unapproved biography is present`);
  if (/googletagmanager|google-analytics|connect\.facebook\.net|hotjar|matomo|segment\.com|plausible\.io|clarity\.ms/i.test(html)) failures.push(`${label}: tracker signature found`);
  if (/<(?:script|img|iframe)[^>]+(?:src|href)="https?:/i.test(html)) failures.push(`${label}: externally loaded resource found`);

  for (const url of [...attributeValues(html, "href"), ...attributeValues(html, "src")]) checkLocalReference(htmlPath, url);
  for (const srcset of attributeValues(html, "srcset")) {
    for (const candidate of srcset.split(",")) checkLocalReference(htmlPath, candidate.trim().split(/\s+/)[0]);
  }

  for (const href of attributeValues(html, "href").filter((value) => value.startsWith("tel:"))) {
    if (href !== `tel:${expectedPhone}`) failures.push(`${label}: unexpected telephone link ${href}`);
  }
  for (const href of attributeValues(html, "href").filter((value) => value.startsWith("mailto:"))) {
    if (!href.startsWith(`mailto:${expectedEmail}`)) failures.push(`${label}: unexpected email link ${href}`);
  }
  for (const href of attributeValues(html, "href").filter((value) => value.startsWith("https://wa.me/"))) {
    if (!href.startsWith(`https://wa.me/${expectedPhone.slice(1)}?text=`)) failures.push(`${label}: unexpected WhatsApp link ${href}`);
  }
}

const indexPath = join(root, "index.html");
const indexHtml = readFileSync(indexPath, "utf8");
if ((indexHtml.match(/data-variant-overview/g) ?? []).length !== 1) failures.push("index.html: variant overview marker is missing");
if ((indexHtml.match(/data-variant-card=/g) ?? []).length !== 3) failures.push("index.html: expected exactly three preview variant cards");
for (const variant of ["standard", "premium", "kleinanzeigen"]) {
  if (!new RegExp(`data-variant-link="${variant}"`).test(indexHtml)) failures.push(`index.html: ${variant} variant link is missing`);
}
if (/data-final-concept|data-change-concept|data-concept-panel/.test(indexHtml)) failures.push("index.html: obsolete concept selector markup is present");
if (!/data-pin-gate/.test(indexHtml)) failures.push("index.html: PIN gate is missing");

for (const variant of ["standard", "premium", "kleinanzeigen"]) {
  const variantPath = htmlPathForUrl(`/${variant}/`);
  if (!variantPath) {
    failures.push(`${variant}: preview route is missing`);
    continue;
  }
  const html = readFileSync(variantPath, "utf8");
  if ((html.match(new RegExp(`data-preview-variant="${variant}"`, "g")) ?? []).length !== 1) failures.push(`${variant}: expected one matching variant marker`);
  if (!/data-variant-back/.test(html) || !/Zurück zur Variantenübersicht/.test(html)) failures.push(`${variant}: prominent overview return link is missing`);
  const heroStart = html.indexOf('data-hero-kind="kitchen"');
  if (heroStart === -1) failures.push(`${variant}: kitchen-led hero is missing`);
  else {
    const heroEnd = html.indexOf("</section>", heroStart);
    const hero = html.slice(heroStart, heroEnd === -1 ? html.length : heroEnd);
    if (!/alt="[^"]*(?:Küchen|Küche)/i.test(hero)) failures.push(`${variant}: hero has no kitchen alternative text`);
    if (/Sauna/i.test(hero)) failures.push(`${variant}: sauna appears in the first hero area`);
  }
  if (!/data-pin-gate/.test(html)) failures.push(`${variant}: PIN gate is missing`);
}

const listingPath = htmlPathForUrl("/kleinanzeigen/");
if (listingPath) {
  const listingHtml = readFileSync(listingPath, "utf8");
  if ((listingHtml.match(/data-generated-visual/g) ?? []).length !== 4) failures.push("kleinanzeigen: expected four generated visual markers");
  if ((listingHtml.match(/Visualisierung · kein Referenzfoto/g) ?? []).length !== 4) failures.push("kleinanzeigen: every generated image needs a visible disclosure label");
  if (!/Anzeigenentwurf · nicht veröffentlicht/.test(listingHtml)) failures.push("kleinanzeigen: draft publication status is missing");
  if (/Sauna|Ukraine|Donbass|Baufirma|mehreren Mitarbeiter/i.test(listingHtml)) failures.push("kleinanzeigen: unrelated or unapproved narrative is present");
}

const imprintPath = htmlPathForUrl("/impressum/");
const privacyPath = htmlPathForUrl("/datenschutz/");
if (!imprintPath) failures.push("impressum: page is missing");
if (!privacyPath) failures.push("datenschutz: page is missing");
if (imprintPath && /wird ergänzt|Noch zu ergänzende Pflichtangaben/i.test(readFileSync(imprintPath, "utf8"))) failures.push("impressum: visible placeholder section remains");
if (!existsSync(join(root, "404.html")) && !htmlPathForUrl("/404/")) failures.push("404: built error page is missing");

const robotsPath = join(root, "robots.txt");
const sitemapPath = join(root, "sitemap.xml");
if (!existsSync(robotsPath)) failures.push("robots.txt is missing");
if (!existsSync(sitemapPath)) failures.push("sitemap.xml is missing");
if (existsSync(robotsPath)) {
  const robots = readFileSync(robotsPath, "utf8");
  if (!/^User-agent: \*\nDisallow: \/\n?$/.test(robots)) failures.push("robots.txt: preview must disallow all crawling");
}
if (existsSync(sitemapPath)) {
  const sitemap = readFileSync(sitemapPath, "utf8");
  const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
  if (!locations.length) failures.push("sitemap.xml: no locations found");
  if (new Set(locations).size !== locations.length) failures.push("sitemap.xml: duplicate locations found");
  if (locations.some((location) => !location.startsWith(`${productionOrigin}/`))) failures.push("sitemap.xml: non-production origin found");
  for (const previewRoute of ["/standard/", "/premium/", "/kleinanzeigen/"]) {
    if (locations.some((location) => location.endsWith(previewRoute))) failures.push(`sitemap.xml: preview-only route found ${previewRoute}`);
  }
  for (const location of locations) {
    const url = new URL(location);
    const pagePath = htmlPathForUrl(url.pathname);
    if (!pagePath) {
      failures.push(`sitemap.xml: target is missing ${location}`);
      continue;
    }
    const canonical = readFileSync(pagePath, "utf8").match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    if (canonical !== location) failures.push(`sitemap.xml: canonical mismatch for ${location}`);
  }
}

for (const file of files.filter((path) => [".css", ".js", ".html"].includes(extname(path)))) {
  const contents = readFileSync(file, "utf8");
  if (/@import\s+(?:url\()?['"]?https?:|url\(['"]?https?:/i.test(contents)) failures.push(`${relative(root, file)}: external stylesheet or asset URL found`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files: routes, links, release metadata, contact links and preview safeguards are valid.`);
