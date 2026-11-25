import { SITE_BASE_URL, WP_BASE_URL } from "@/constants/wp.constants";
import { APP_ROUTES } from "@/constants/navigation.constants";
import { PROGRAMME_ROUTE_CONFIG } from "@/constants/programme.routes.constants";

/**
 * Maps WordPress page permalink path segments (often `*-new`) to public
 * Next.js routes so Yoast JSON-LD @id/url values match the frontend.
 */
const WP_PATH_TO_PUBLIC: Record<string, string> = {
  "home-new": APP_ROUTES.HOME,
  "our-story-new": APP_ROUTES.OUR_STORY,
  "our-vision-new": APP_ROUTES.OUR_VISION,
  "our-people-new": APP_ROUTES.OUR_PEOPLE,
  "life-at-yuva": APP_ROUTES.LIFE_AT_YUVA,
  "award-recognition-new": APP_ROUTES.AWARD_RECOGNITION,
  "community-response": APP_ROUTES.COMMUNITY_RESPONSE,
  "alignment-with-un-sdgs-new": APP_ROUTES.ALIGNMENT_WITH_UN_SDGS,
  "impact-new": APP_ROUTES.IMPACT,
  "annual-reports-new": APP_ROUTES.ANNUAL_REPORTS,
  "csr-partners": APP_ROUTES.DONORS_AND_AUDIT_PARTNERS,
  "audit-partners-new": APP_ROUTES.DONORS_AND_AUDIT_PARTNERS,
  "gallery-new": APP_ROUTES.GALLERY,
  "press-and-media-new": APP_ROUTES.PRESS_AND_MEDIA,
  "blogs-new": APP_ROUTES.BLOGS,
  "voice-of-change": APP_ROUTES.VOICE_OF_CHANGE,
  "contact-us-new": APP_ROUTES.CONTACT,
  "donate-new": APP_ROUTES.DONATE,
  "volunteer-new": APP_ROUTES.VOLUNTEER,
  "careers-new": APP_ROUTES.CAREERS,
  careers: APP_ROUTES.CAREERS,
  ...Object.fromEntries(
    PROGRAMME_ROUTE_CONFIG.map((p) => [p.wpSlug, `/${p.slug}`])
  ),
};

function stripTrailingSlash(url: string): string {
  if (url.length <= 1) return url;
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function rewriteUrlString(value: string, siteBase: string, wpBase: string): string {
  let next = value;

  if (wpBase && next.includes(wpBase)) {
    next = next.split(wpBase).join(siteBase);
  }
  // Fallback for CMS domain without /cms path prefix
  next = next.replace(/https?:\/\/cms\.yuvaunstoppable\.org/g, siteBase);

  try {
    const parsed = new URL(next);
    const site = new URL(siteBase);
    if (parsed.origin === site.origin) {
      const segments = parsed.pathname.split("/").filter(Boolean);
      if (segments.length === 1) {
        const mapped = WP_PATH_TO_PUBLIC[segments[0]];
        if (mapped !== undefined) {
          parsed.pathname = mapped === "/" ? "/" : mapped;
          next = stripTrailingSlash(parsed.toString());
          if (mapped === "/") {
            next = siteBase.replace(/\/$/, "");
          }
        }
      }
    }
  } catch {
    // Non-URL strings (e.g. schema types) stay unchanged.
  }

  return next;
}

function rewriteValue(value: unknown, siteBase: string, wpBase: string): unknown {
  if (typeof value === "string") {
    return rewriteUrlString(value, siteBase, wpBase);
  }
  if (Array.isArray(value)) {
    return value.map((item) => rewriteValue(item, siteBase, wpBase));
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, child] of Object.entries(value as Record<string, unknown>)) {
      out[key] = rewriteValue(child, siteBase, wpBase);
    }
    return out;
  }
  return value;
}

/**
 * Rewrites Yoast JSON-LD graph URLs from the WordPress host / CMS slugs
 * to the public frontend origin and routes.
 * Organization / WebSite nodes are dropped — those ship once from SiteJsonLd
 * in the root layout to avoid duplicate structured data.
 */
export function rewriteYoastSchemaGraph(
  graph: unknown[] | undefined
): unknown[] | undefined {
  if (!graph || graph.length === 0) return graph;

  const siteBase = SITE_BASE_URL.replace(/\/$/, "");
  const wpBase = WP_BASE_URL.replace(/\/$/, "");

  const rewritten = graph.map((node) =>
    rewriteValue(node, siteBase, wpBase)
  ) as unknown[];

  return rewritten.filter((node) => {
    if (!node || typeof node !== "object") return true;
    const type = (node as { "@type"?: string | string[] })["@type"];
    const types = Array.isArray(type) ? type : type ? [type] : [];
    // Keep nodes that are more than just Organization/WebSite (e.g. ["Organization","LocalBusiness"]).
    if (types.length === 1 && (types[0] === "Organization" || types[0] === "WebSite")) {
      return false;
    }
    return true;
  });
}
