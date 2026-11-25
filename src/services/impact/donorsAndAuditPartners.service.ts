import { cache } from "react";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { CSR_PARTNERS_FALLBACK } from "@/data/impact/fallbacks/csrPartners.fallback";
import { DONORS_AND_AUDIT_PARTNERS_FALLBACK } from "@/data/impact/fallbacks/donorsAndAuditPartners.fallback";
import { parseImpactSubpage } from "@/lib/parsers/impact/impactSubpage.parser";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import type {
  ImpactAnnualReportItem,
  ImpactPartnerItem,
  ImpactSubpageData,
  ImpactSubpageScf,
} from "@/types/impact/impact.types";

/** Existing WP pages — frontend merges them into one route; no new WP page needed. */
const WP_SOURCE_SLUGS = [
  PAGE_SLUGS.DONORS_AUDIT_PARTNERS,
  PAGE_SLUGS.CSR_PARTNERS,
  PAGE_SLUGS.AUDIT_PARTNERS,
] as const;

function hasUsableScf(
  scf: ImpactSubpageScf | undefined | null
): scf is ImpactSubpageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

async function resolvePartnerImage(
  partner: ImpactPartnerItem
): Promise<ImpactPartnerItem> {
  return {
    ...partner,
    img: { ...partner.img, src: await resolveMediaId(partner.img.src) },
  };
}

async function resolveReportFile(
  report: ImpactAnnualReportItem
): Promise<ImpactAnnualReportItem> {
  const [fileUrl, imgSrc] = await Promise.all([
    resolveMediaId(report.fileUrl),
    report.img?.src ? resolveMediaId(report.img.src) : Promise.resolve(""),
  ]);

  return {
    ...report,
    fileUrl,
    img: report.img?.src ? { ...report.img, src: imgSrc } : report.img,
  };
}

async function resolvePageMedia(
  data: ImpactSubpageData
): Promise<ImpactSubpageData> {
  const [heroSrc, partners, reports] = await Promise.all([
    resolveMediaId(data.hero.img.src),
    Promise.all(data.partners.map(resolvePartnerImage)),
    Promise.all(data.reports.map(resolveReportFile)),
  ]);

  return {
    ...data,
    hero: { ...data.hero, img: { ...data.hero.img, src: heroSrc } },
    partners,
    reports,
  };
}

const TRANSPARENT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='240' height='160'%3E%3C/svg%3E";

function mergeAndOrderPartnerLists(
  parsedPages: ImpactPartnerItem[][],
  fallbackPartners: ImpactPartnerItem[]
): ImpactPartnerItem[] {
  const allParsed = parsedPages.flat();

  // Extract backend CSR partners
  const backendCsr = allParsed.filter((p) => p.category === "csr-partners");

  let finalCsrPartners: ImpactPartnerItem[] = [];

  if (backendCsr.length > 0) {
    // Backend returned CSR partners -> NO fallback partners or fallback images!
    const formattedBackend = backendCsr.map((partner) => ({
      ...partner,
      img: {
        ...partner.img,
        src: partner.img?.src ? partner.img.src : TRANSPARENT_PLACEHOLDER,
      },
    }));

    const top25 = formattedBackend.slice(0, 25);
    const remainingBackend = formattedBackend.slice(25);

    // Sort remaining backend CSR partners alphabetically by name
    remainingBackend.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        sensitivity: "base",
        numeric: true,
      })
    );

    finalCsrPartners = [...top25, ...remainingBackend];
  } else {
    // Backend CSR partners field is completely empty -> show fallback CSR partners
    const fallbackCsr = fallbackPartners.filter(
      (p) => p.category === "csr-partners" && Boolean(p.img?.src)
    );

    const top25 = fallbackCsr.slice(0, 25);
    const remainingFallback = fallbackCsr.slice(25);

    remainingFallback.sort((a, b) =>
      a.name.localeCompare(b.name, undefined, {
        sensitivity: "base",
        numeric: true,
      })
    );

    finalCsrPartners = [...top25, ...remainingFallback];
  }

  // Extract Audit partners
  const backendAudit = allParsed.filter((p) => p.category === "audit-partners");
  let finalAuditPartners: ImpactPartnerItem[] = [];

  if (backendAudit.length > 0) {
    finalAuditPartners = backendAudit.map((partner) => ({
      ...partner,
      img: {
        ...partner.img,
        src: partner.img?.src ? partner.img.src : TRANSPARENT_PLACEHOLDER,
      },
    }));
  } else {
    finalAuditPartners = fallbackPartners.filter(
      (p) => p.category === "audit-partners" && Boolean(p.img?.src)
    );
  }

  return [...finalCsrPartners, ...finalAuditPartners];
}

/**
 * Merged Donors & Audit Partners — reads existing CSR + Audit WP pages,
 * presents them as one frontend page with in-page tabs.
 */
export const getDonorsAndAuditPartnersPageData = cache(
  async (): Promise<ImpactSubpageData> => {
    const responses = await Promise.all(
      WP_SOURCE_SLUGS.map((slug) => fetchWPPage<ImpactSubpageScf>(slug))
    );

    const parsedPages = responses
      .map((response, index) => {
        const slug = WP_SOURCE_SLUGS[index];
        if (!response.data) {
          console.warn(
            `[getDonorsAndAuditPartnersPageData] No WP data for "${slug}" — ${response.error}`
          );
          return null;
        }

        const rawScf = response.data.scf ?? response.data.acf;
        if (!hasUsableScf(rawScf)) {
          console.warn(
            `[getDonorsAndAuditPartnersPageData] Empty SCF for "${slug}" — skipping.`
          );
          return null;
        }

        return parseImpactSubpage(rawScf, CSR_PARTNERS_FALLBACK);
      })
      .filter((page): page is ImpactSubpageData => page !== null);

    if (parsedPages.length === 0) {
      return DONORS_AND_AUDIT_PARTNERS_FALLBACK;
    }

    const primary = parsedPages[0];
    const merged: ImpactSubpageData = {
      ...DONORS_AND_AUDIT_PARTNERS_FALLBACK,
      ...primary,
      hero: {
        ...DONORS_AND_AUDIT_PARTNERS_FALLBACK.hero,
        ...primary.hero,
        title:
          primary.hero.title || DONORS_AND_AUDIT_PARTNERS_FALLBACK.hero.title,
      },
      tabs:
        primary.tabs.length > 0
          ? primary.tabs
          : DONORS_AND_AUDIT_PARTNERS_FALLBACK.tabs,
      partners: mergeAndOrderPartnerLists(
        parsedPages.map((page) => page.partners),
        DONORS_AND_AUDIT_PARTNERS_FALLBACK.partners
      ),
      cta: primary.cta ?? DONORS_AND_AUDIT_PARTNERS_FALLBACK.cta,
    };

    return resolvePageMedia(merged);
  }
);

/** Primary WP slug for Yoast metadata on the merged partners route. */
export const DONORS_AND_AUDIT_PARTNERS_META_SLUG =
  PAGE_SLUGS.DONORS_AUDIT_PARTNERS;

