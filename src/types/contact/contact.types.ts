import type {WPMedia} from "@/types/wordpress.types";
import type {MediaAsset} from "@/types/global.types";
import type {LargeBannerSectionScf, LargeBannerSectionType} from "@/types/home/home.types";

/* ──────────────────── WIRE TYPES (raw from WordPress / SCF) ──────────────────── */

export interface ContactHeroSectionScf {
  heading?: string;
  title?: string;
  highlighted_title?: string;
  highlightedTitle?: string;
  body?: string;
  bg_img?: WPMedia | string | false;
  bgImg?: WPMedia | string | false;
}

export interface ContactOfficeScf {
  title?: string;
  address?: string;
  phone?: string;
  email?: string;
  map_embed_url?: string;
  mapEmbedUrl?: string;
}

export interface ContactCollaboratorScf {
  name?: string;
  phone?: string;
  email?: string;
  img?: WPMedia | string | false;
  image?: WPMedia | string | false;
}

export interface ContactContainerSectionScf {
  title?: string;
  offices?: ContactOfficeScf[];
  /** @deprecated Legacy single-office fields — parsed into offices[] when repeater is empty */
  address?: string;
  phone?: string;
  email?: string;
  csr_collaboration?: ContactCollaboratorScf;
  csrCollaboration?: ContactCollaboratorScf;
}

export interface ContactPageScf {
  hero_section?: ContactHeroSectionScf;
  heroSection?: ContactHeroSectionScf;
  contact_container_section?: ContactContainerSectionScf;
  contactContainerSection?: ContactContainerSectionScf;
  large_banner_section?: LargeBannerSectionScf;
  largeBannerSection?: LargeBannerSectionScf;
}

/* ──────────────────── UI TYPES (consumed by components) ──────────────────── */

export interface ContactHeroSectionType {
  heading: string;
  title: string;
  highlightedTitle: string;
  body: string;
  bgImg: MediaAsset;
}

export interface ContactOfficeType {
  title: string;
  address: string;
  phone: string;
  email: string;
  mapEmbedUrl: string;
}

export interface ContactCollaboratorType {
  img: MediaAsset;
  name: string;
  phone: string;
  email: string;
}

export interface ContactContainerSectionType {
  title: string;
  offices: ContactOfficeType[];
  csrCollaboration: ContactCollaboratorType;
}

export interface ContactPageData {
  hero: ContactHeroSectionType;
  contactContainer: ContactContainerSectionType;
  largeBanner: LargeBannerSectionType;
}

/* ──────────────────── CONTACT FORM SUBMISSION (POST → WP) ──────────────────── */
/**
 * The contact form posts one of two enquiry types — "scholarships" or
 * "volunteering" — with the same fields. The WordPress backend
 * (contact-submit.php) is the authoritative validator; the helper below is a
 * fast client-side gate to avoid obviously bad requests.
 */

/** The two enquiry types the contact form supports. */
export type ContactType = "scholarships" | "volunteering";

/** The payload posted to /api/contact (and forwarded to WP). */
export interface ContactPayload {
  type: ContactType;
  name: string;
  email: string;
  mobile: string;
  message: string;
}

/** The uniform envelope returned by the WP `yuva/v1/contact` route. */
export interface ContactResponse {
  success?: boolean;
  /** Stable machine code: "received" | "invalid_email" | "name_required" | ... */
  code?: string;
  message?: string;
}

export interface ContactValidation {
  valid: boolean;
  /** Cleaned, trimmed payload (always returned, even when invalid). */
  data: ContactPayload;
  message: string;
}

// Pragmatic email check — mirrors the strictness of the WP `is_email()` gate.
const CONTACT_EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Coerce an unknown enquiry type to a valid ContactType (defaults to scholarships). */
export function normalizeContactType(raw: unknown): ContactType {
  return raw === "volunteering" ? "volunteering" : "scholarships";
}

/**
 * Trim + validate a contact submission. Returns the cleaned payload and a
 * displayable message on the first failure. Required: name + valid email.
 */
export function validateContact(raw: unknown): ContactValidation {
  const obj = (raw && typeof raw === "object" ? raw : {}) as Record<string, unknown>;

  const data: ContactPayload = {
    type: normalizeContactType(obj.type),
    name: typeof obj.name === "string" ? obj.name.trim() : "",
    email: typeof obj.email === "string" ? obj.email.trim() : "",
    mobile: typeof obj.mobile === "string" ? obj.mobile.trim() : "",
    message: typeof obj.message === "string" ? obj.message.trim() : "",
  };

  if (data.name.length === 0) {
    return { valid: false, data, message: "Please enter your name." };
  }
  if (data.email.length === 0) {
    return { valid: false, data, message: "Email is required." };
  }
  if (!CONTACT_EMAIL_RE.test(data.email)) {
    return { valid: false, data, message: "Please enter a valid email address." };
  }

  return { valid: true, data, message: "" };
}
