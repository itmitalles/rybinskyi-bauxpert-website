import type { APIRoute } from "astro";
import { siteConfig } from "@/config/site";

export const GET: APIRoute = ({ site }) => {
  const body = siteConfig.previewMode
    ? "User-agent: *\nDisallow: /\n"
    : `User-agent: *\nAllow: /\n\nSitemap: ${new URL("sitemap.xml", site)}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
};
