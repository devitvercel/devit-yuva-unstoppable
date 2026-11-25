import type {
  AcfLink,
  AcfPostObject,
  AcfTerm,
} from "@/types/wordpress.types";

export interface UiLink {
  label: string;
  href: string;
  target: "_self" | "_blank" | "_parent" | "_top";
}

export interface UiPostRef {
  id: number;
  title: string;
  slug: string;
  type: string;
}

export interface UiTerm {
  id: number;
  name: string;
  slug: string;
  taxonomy: string;
}

/** Return a trimmed string, falling back to `fallback` when empty. */
export function parseText(value: unknown, fallback = ""): string {
  if (typeof value !== "string") return fallback;
  const trimmed = value.trim();
  return trimmed || fallback;
}

/**
 * Decode the HTML entities WordPress emits in titles, excerpts, and term names
 * (e.g. "Aparna &#038; Her Mother&#8217;s Journey" → "Aparna & Her Mother's Journey").
 * Shared by every WP integration so decoding is consistent everywhere.
 */
export function decodeEntities(value: unknown): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/&#8217;|&#8216;|&rsquo;|&lsquo;/g, "'")
    .replace(/&#8220;|&#8221;|&ldquo;|&rdquo;/g, '"')
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#8230;|&hellip;/g, "…")
    .replace(/&#038;|&amp;/g, "&")
    .replace(/&nbsp;|&#8203;|&zwnj;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

/**
 * Strip HTML tags, decode entities, and collapse whitespace — turns a rendered
 * WP excerpt/content snippet into plain display text (e.g. for card bodies).
 *
 * WordPress wraps its auto-excerpt "read more" marker in brackets (`[…]`). We
 * keep the ellipsis as a truncation indicator but drop the surrounding brackets,
 * so `… [&hellip;]` renders as a clean trailing `…`.
 */
export function stripHtml(value: unknown): string {
  if (typeof value !== "string") return "";
  return decodeEntities(value.replace(/<[^>]*>/g, " "))
    .replace(/\s+/g, " ")
    .replace(/\[\s*…\s*\]/g, "…") // "[…]" read-more marker → bare "…"
    .replace(/\s+…\s*$/, "…") // tidy the space before a trailing ellipsis
    .trim();
}

/** Coerce ACF booleans (true / false / "1" / "0" / null) into a real boolean. */
export function parseBool(value: unknown, fallback = false): boolean {
  if (value === true || value === 1 || value === "1") return true;
  if (value === false || value === 0 || value === "0") return false;
  return fallback;
}

/** Coerce to a finite number; returns `fallback` when the value isn't numeric. */
export function parseNumber(value: unknown, fallback = 0): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const n = Number(value);
    if (Number.isFinite(n)) return n;
  }
  return fallback;
}

/** Normalise an ACF/SCF repeater value to a typed array. */
export function parseRepeater<T = Record<string, unknown>>(
  value: T[] | false | null | undefined
): T[] {
  return Array.isArray(value) ? value : [];
}

/** Parse an ACF link field. */
export function parseAcfLink(
  value: AcfLink | false | null | undefined
): UiLink | null {
  if (!value || typeof value !== "object" || !value.url) return null;

  const rawTarget = value.target?.trim();
  const target: UiLink["target"] =
    rawTarget === "_blank" || rawTarget === "_parent" || rawTarget === "_top"
      ? rawTarget
      : "_self";

  return {
    label: parseText(value.title),
    href: parseText(value.url, "#"),
    target,
  };
}

/** Parse an ACF post_object field. */
export function parseAcfPostObject(
  value: AcfPostObject | false | null | undefined
): UiPostRef | null {
  if (!value || typeof value !== "object") return null;
  return {
    id: value.ID,
    title: parseText(value.post_title),
    slug: parseText(value.post_name),
    type: value.post_type,
  };
}

/** Parse an ACF taxonomy field. */
export function parseAcfTerm(
  value: AcfTerm | false | null | undefined
): UiTerm | null {
  if (!value || typeof value !== "object") return null;
  return {
    id: value.term_id,
    name: parseText(value.name),
    slug: parseText(value.slug),
    taxonomy: value.taxonomy,
  };
}

/** CTA helper — parses a paired (label, url) into a `{ text, href }` struct. */
export function parseCta(
  label: unknown,
  url: unknown,
  fallback: { text: string; href: string }
): { text: string; href: string } {
  return {
    text: parseText(label, fallback.text),
    href: parseText(url, fallback.href),
  };
}
