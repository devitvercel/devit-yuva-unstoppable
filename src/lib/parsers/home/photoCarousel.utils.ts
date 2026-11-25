/**
 * Extract a blog post slug from a carousel CTA href, e.g.
 * `/blogs/my-story?listing=blogs&from=education` → `my-story`
 */
export function extractBlogSlugFromHref(href: string): string | null {
  if (!href?.trim()) return null;

  try {
    const pathname = href.startsWith("http")
      ? new URL(href).pathname
      : href.split("?")[0]?.split("#")[0] ?? "";

    const match = pathname.match(/\/blogs\/([^/]+)/i);
    const slug = match?.[1]?.trim();
    return slug ? decodeURIComponent(slug) : null;
  } catch {
    return null;
  }
}
