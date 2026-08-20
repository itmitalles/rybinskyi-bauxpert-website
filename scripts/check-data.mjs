import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import Ajv2020 from "ajv/dist/2020.js";

const root = resolve(".");
const distRoot = resolve("dist");
const ajv = new Ajv2020({ allErrors: true, strict: true });
const failures = [];

const validateFile = (dataFile, schemaFile) => {
  const data = JSON.parse(readFileSync(join(root, dataFile), "utf8"));
  const schema = JSON.parse(readFileSync(join(root, schemaFile), "utf8"));
  const validate = ajv.compile(schema);
  if (!validate(data)) failures.push(`${dataFile}: ${ajv.errorsText(validate.errors, { separator: "; " })}`);
  return data;
};

const release = validateFile("config/release-approvals.json", "config/release-approvals.schema.json");
validateFile("config/asset-approvals.json", "config/asset-approvals.schema.json");

if (!release.previewOnly || release.customDomainApproved) failures.push("Release approvals must keep the site in preview-only mode");
const unexpectedApproved = Object.entries(release.approvals).filter(([, value]) => value.status === "approved");
if (unexpectedApproved.length) failures.push(`Approvals marked complete without release evidence review: ${unexpectedApproved.map(([key]) => key).join(", ")}`);

const htmlFiles = [];
const walk = (directory) => {
  for (const name of readdirSync(directory)) {
    const path = join(directory, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk(distRoot);

let structuredDataBlocks = 0;
for (const htmlPath of htmlFiles) {
  const html = readFileSync(htmlPath, "utf8");
  for (const match of html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    structuredDataBlocks += 1;
    try {
      const value = JSON.parse(match[1]);
      const values = Array.isArray(value) ? value : [value];
      for (const item of values) {
        if (item?.["@context"] !== "https://schema.org") failures.push(`${relative(distRoot, htmlPath)}: JSON-LD context is invalid`);
        if (typeof item?.["@type"] !== "string") failures.push(`${relative(distRoot, htmlPath)}: JSON-LD type is missing`);
      }
    } catch (error) {
      failures.push(`${relative(distRoot, htmlPath)}: invalid JSON-LD (${error.message})`);
    }
  }
}
if (!structuredDataBlocks) failures.push("No JSON-LD blocks found in dist");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Validated approval JSON schemas and ${structuredDataBlocks} JSON-LD blocks.`);
