import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { dirname, join, normalize, relative, resolve } from "node:path";

const root = resolve("dist");
if (!existsSync(root)) throw new Error("dist/ is missing. Run npm run build first.");

const htmlFiles = [];
const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk(root);

const failures = [];
const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1];
const localTargetExists = (htmlPath, rawUrl) => {
  const clean = rawUrl.split(/[?#]/)[0];
  if (!clean || clean.startsWith("mailto:") || clean.startsWith("tel:") || clean.startsWith("https:") || clean.startsWith("http:") || clean.startsWith("data:")) return true;
  let decoded = decodeURIComponent(clean);
  if (repositoryName && decoded.startsWith(`/${repositoryName}/`)) decoded = decoded.slice(repositoryName.length + 1);
  const candidate = decoded.startsWith("/") ? join(root, decoded) : resolve(dirname(htmlPath), decoded);
  const paths = [candidate, join(candidate, "index.html")];
  if (decoded.endsWith("/")) paths.push(join(candidate, "index.html"));
  return paths.some((path) => existsSync(normalize(path)));
};

for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, "utf8");
  const label = relative(root, htmlPath);
  if (!/<html lang="de"/.test(html)) failures.push(`${label}: missing German document language`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) failures.push(`${label}: missing meta description`);
  if (!/<meta name="robots" content="noindex,nofollow,noarchive"/.test(html)) failures.push(`${label}: preview robots meta is missing`);
  if (!/<link rel="canonical" href="https:\/\/rybinskyi-bauxpert\.de/.test(html)) failures.push(`${label}: canonical URL is missing`);
  const matches = html.matchAll(/(?:href|src)="([^"]+)"/g);
  for (const [, url] of matches) if (!localTargetExists(htmlPath, url)) failures.push(`${label}: broken local reference ${url}`);
}

const robots = readFileSync(join(root, "robots.txt"), "utf8");
if (!/Disallow: \//.test(robots)) failures.push("robots.txt: preview is not blocked");
if (!existsSync(join(root, "sitemap.xml"))) failures.push("sitemap.xml is missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Checked ${htmlFiles.length} HTML files: metadata and local links are valid.`);
