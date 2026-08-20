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
  const decoded = decodeURIComponent(pathname).replace(/^\/+/, "");
  const candidate = normalize(join(root, decoded));
  if (candidate !== root && !candidate.startsWith(`${root}${sep}`)) return null;
  const targets = [candidate];
  if (pathname.endsWith("/")) targets.unshift(join(candidate, "index.html"));
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

server.listen(port, host, () => console.log(`Serving dist at http://${host}:${port}`));
for (const signal of ["SIGINT", "SIGTERM"]) process.on(signal, () => server.close(() => process.exit(0)));
