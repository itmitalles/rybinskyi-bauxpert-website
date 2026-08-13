import { siteConfig } from "@/config/site";

const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(text)}`;
}
