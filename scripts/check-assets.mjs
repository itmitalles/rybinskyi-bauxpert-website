import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { extname, join, relative, resolve } from "node:path";

const projectRoot = resolve(".");
const distRoot = resolve("dist");
const manifestPath = join(projectRoot, "config/asset-approvals.json");
if (!existsSync(distRoot)) throw new Error("dist/ is missing. Run npm run build first.");

const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
const approved = new Map(manifest.approvedForBuild.map((asset) => [asset.outputPath, asset]));
const imageExtensions = new Set([".avif", ".gif", ".jpeg", ".jpg", ".png", ".svg", ".webp"]);
const failures = [];
const files = [];

const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else files.push(path);
  }
};
walk(distRoot);

const builtImages = files
  .filter((path) => imageExtensions.has(extname(path).toLowerCase()))
  .map((path) => relative(distRoot, path).replaceAll("\\", "/"));

for (const outputPath of builtImages) {
  if (!approved.has(outputPath)) failures.push(`Unapproved image entered dist: ${outputPath}`);
}
for (const [outputPath, asset] of approved) {
  if (!asset.approved) failures.push(`Manifest entry is not approved: ${asset.sourcePath}`);
  if (!existsSync(join(projectRoot, asset.sourcePath))) failures.push(`Approved source is missing: ${asset.sourcePath}`);
  if (!builtImages.includes(outputPath)) failures.push(`Approved output is missing from dist: ${outputPath}`);
}

for (const outputPath of builtImages.filter((path) => /\.(?:avif|gif|jpe?g|png|webp)$/i.test(path))) {
  const asset = approved.get(outputPath);
  if (!asset) continue;
  if (asset.kind === "generated-preview-visual" && !outputPath.startsWith("preview/kleinanzeigen/")) {
    failures.push(`Generated preview visual is outside its isolated preview path: ${outputPath}`);
  }
  if (!new Set(["generated-preview-visual", "customer-approved-photo"]).has(asset.kind)) {
    failures.push(`Raster image has an invalid approval kind: ${outputPath}`);
  }
}

for (const pendingRoot of manifest.pendingRoots) {
  const absolute = join(projectRoot, pendingRoot);
  if (!existsSync(absolute)) failures.push(`Pending asset root is missing: ${pendingRoot}`);
}

if (builtImages.some((path) => path.includes("premium"))) failures.push("Legacy premium asset found in dist");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Asset gate passed: ${builtImages.length} allowlisted image assets in dist; no unapproved customer raster image was published.`);
