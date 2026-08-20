import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import { extname, join, normalize, resolve, sep } from "node:path";

const argument = (name, fallback) => {
  const index = process.argv.indexOf(name);
  return index === -1 ? fallback : process.argv[index + 1];
};
const host = argument("--host", "127.0.0.1");
const port = Number(argument("--port", "4321"));
const root = resolve("dist");
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
const mime = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml; charset=utf-8",
};

const resolveTarget = (pathname) => {
  const pathWithoutBase = !basePath
    ? pathname
    : pathname === basePath
      ? "/"
      : pathname.startsWith(`${basePath}/`)
        ? pathname.slice(basePath.length)
        : null;
  if (pathWithoutBase === null) return null;
  const decoded = decodeURIComponent(pathWithoutBase).replace(/^\/+/, "");
  const candidate = normalize(join(root, decoded));
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;
  const targets = [candidate];
  if (pathWithoutBase.endsWith("/")) targets.unshift(join(candidate, "index.html"));
  if (!extname(candidate)) targets.push(`${candidate}.html`, join(candidate, "index.html"));
  return targets.find((target) => existsSync(target) && statSync(target).isFile()) ?? null;
};

const server = createServer((request, response) => {
  const requestUrl = new URL(request.url ?? "/", `http://${request.headers.host ?? `${host}:${port}`}`);
  const target = resolveTarget(requestUrl.pathname);
  const status = target ? 200 : 404;
  const file = target ?? join(root, "404.html");
  response.writeHead(status, {
    "Content-Type": mime[extname(file)] ?? "application/octet-stream",
    "Cache-Control": "no-store",
  });
  if (request.method === "HEAD") response.end();
  else createReadStream(file).pipe(response);
});

server.listen(port, host, () => console.log(`Serving dist at http://${host}:${port}${basePath}/`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
