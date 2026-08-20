import type { APIRoute } from "astro";
import { getCollection } from "astro:content";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = async () => {
  const services = await getCollection("services");
  const staticPaths = ["/", "/leistungen/", "/projekte/", "/muenchen/", "/ueber-mich/", "/kontakt/", "/impressum/", "/datenschutz/"];
  const urls = [...staticPaths, ...services.map((item) => `/leistungen/${item.id}/`)];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((path) => `  <url><loc>${new URL(path, siteConfig.productionUrl).href}</loc></url>`).join("\n")}\n</urlset>`;
  return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8" } });
};
