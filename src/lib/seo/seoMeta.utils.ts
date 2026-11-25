/**
 * Shared SEO string normalisation — keeps titles/descriptions in healthy
 * SERP ranges without inventing marketing copy.
 */
import { SITE_BASE_URL } from "@/constants/wp.constants";
const BRAND = "Yuva Unstoppable";

/** Soft max for <title> (Google ~600px ≈ 50–60 chars). */
const TITLE_MAX = 60;
/** Minimum target length for <title> tags. */
const TITLE_MIN = 50;
/** Soft max for meta description. */
const DESC_MAX = 155;
/** Minimum target length for meta description tags. */
const DESC_MIN = 120;

const DEFAULT_DESC_SUFFIX =
  "Yuva Unstoppable empowers resilient communities and government schools across India through digital literacy, sanitation, scholarships, and climate action.";

function collapseWs(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function truncateAtWord(value: string, max: number): string {
  if (value.length <= max) return value;
  const sliced = value.slice(0, max - 1);
  const trimmed = sliced.replace(/\s+\S*$/, "").replace(/[|,.\-–—:;\s]+$/u, "");
  return `${trimmed || sliced.trim()}…`;
}

/**
 * Clamp long titles; if a title is short (<50 chars), expand it cleanly
 * so static and dynamic pages hit the optimal 50–60 character SERP window.
 */
export function normalizeSeoTitle(title: string): string {
  let next = collapseWs(title);
  if (!next) next = `${BRAND} | Transforming Government Schools in India`;

  if (next.length < TITLE_MIN) {
    if (!new RegExp(BRAND, "i").test(next)) {
      next = `${next} | ${BRAND} NGO India`;
    } else if (!/Empowering|Transforming|Official|Education|Youth/i.test(next)) {
      next = `${next} | Empowering Youth & Education`;
    } else {
      next = `${next} | NGO India`;
    }
  }

  return truncateAtWord(next, TITLE_MAX);
}

/**
 * Clamp long meta descriptions and expand short ones (<120 chars)
 * to ensure all pages meet the 120–155 character range required by SEO audits.
 */
export function normalizeSeoDescription(
  description: string,
  fallback?: string
): string {
  let next = collapseWs(description || fallback || "");
  if (!next) {
    next = DEFAULT_DESC_SUFFIX;
  }

  if (next.length < DESC_MIN) {
    if (!/[.!?]$/.test(next)) next += ".";
    next = `${next} ${DEFAULT_DESC_SUFFIX}`;
  }

  return truncateAtWord(next, DESC_MAX);
}

/**
 * Replaces WordPress CMS backend domain/path (with or without /cms) with the frontend base URL.
 */
export function replaceCmsUrlWithFrontend(urlOrText: string): string {
  if (!urlOrText) return urlOrText;
  const siteBase = SITE_BASE_URL.replace(/\/$/, "");
  return urlOrText
    .replace(new RegExp("https?://cms\\.yuvaunstoppable\\.org/cms", "g"), siteBase)
    .replace(new RegExp("https?://cms\\.yuvaunstoppable\\.org", "g"), siteBase);
}