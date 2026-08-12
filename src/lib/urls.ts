const base = import.meta.env.BASE_URL.replace(/\/$/, "");

export function withBase(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalizedPath}`;
}

export function whatsappUrl(text: string): string {
  return `https://wa.me/491786930465?text=${encodeURIComponent(text)}`;
}
