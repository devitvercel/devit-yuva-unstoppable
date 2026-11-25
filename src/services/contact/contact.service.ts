import { cache } from "react";
import { fetchWPPage, resolveMediaId, submitContactForm } from "@/lib/wordpress";
import { parseContactPage } from "@/lib/parsers/contact/contact.parser";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { CONTACT_FALLBACK } from "@/data/contact/contact.fallback";
import type {
  ContactPageScf,
  ContactPageData,
  ContactPayload,
  ContactResponse,
} from "@/types/contact/contact.types";
import type { WPApiResponse } from "@/types/wordpress.types";

function hasUsableScf(
  scf: ContactPageScf | undefined | null
): scf is ContactPageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

/**
 * Contact page service for Yuva
 * ---------------------------------------------------------------------------
 * Single entry-point used to retrieve the Contact page content.
 */
export const getContactPageData = cache(async (): Promise<ContactPageData> => {
  const response = await fetchWPPage<ContactPageScf>(PAGE_SLUGS.CONTACT);

  if (!response.data) {
    console.warn(
      `[getContactPageData] Falling back to static content — ${response.error}`
    );
    return CONTACT_FALLBACK;
  }

  const rawScf = response.data.scf ?? response.data.acf;
  if (!hasUsableScf(rawScf)) {
    console.warn(
      `[getContactPageData] Empty SCF for slug "${PAGE_SLUGS.CONTACT}" — using static fallback.`
    );
    return CONTACT_FALLBACK;
  }

  const data = parseContactPage(rawScf);

  if (data.hero?.bgImg?.src) {
    data.hero.bgImg.src = await resolveMediaId(data.hero.bgImg.src);
  }

  if (data.contactContainer.csrCollaboration.img?.src) {
    data.contactContainer.csrCollaboration.img.src = await resolveMediaId(
      data.contactContainer.csrCollaboration.img.src
    );
  }

  return data;
});

/**
 * Submit a contact enquiry (scholarships / volunteering). Wraps the WP helper in
 * the same never-throw envelope contract so callers (the API route) branch on
 * `error`. A mutation — not cached.
 */
export const submitContactEnquiry = async (
  payload: ContactPayload
): Promise<WPApiResponse<ContactResponse>> => {
  try {
    return await submitContactForm(payload);
  } catch (err) {
    console.error("[submitContactEnquiry] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};
