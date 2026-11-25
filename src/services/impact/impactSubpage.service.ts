import { cache } from "react";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { IMPACT_SUBPAGE_FALLBACKS } from "@/data/impact/impactSubpage.fallbacks";
import { parseImpactSubpage } from "@/lib/parsers/impact/impactSubpage.parser";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import type {
  ImpactAnnualReportItem,
  ImpactPartnerItem,
  ImpactSubpageData,
  ImpactSubpageScf,
} from "@/types/impact/impact.types";

interface ImpactSubpageRouteConfig {
  wpSlug: string;
  fallback: ImpactSubpageData;
}

const IMPACT_SUBPAGE_WP_SLUGS: Record<string, string> = {
  "annual-reports": PAGE_SLUGS.ANNUAL_REPORTS,
};

const IMPACT_SUBPAGE_ROUTES: Record<string, ImpactSubpageRouteConfig> =
  Object.fromEntries(
    Object.entries(IMPACT_SUBPAGE_FALLBACKS).map(([routeSlug, fallback]) => [
      routeSlug,
      {
        wpSlug: IMPACT_SUBPAGE_WP_SLUGS[routeSlug] ?? routeSlug,
        fallback,
      },
    ])
  );

export const IMPACT_SUBPAGE_SLUGS = Object.freeze(
  Object.keys(IMPACT_SUBPAGE_ROUTES)
);

export function isImpactSubpageSlug(slug: string): boolean {
  return Boolean(IMPACT_SUBPAGE_ROUTES[slug.toLowerCase()]);
}

export function resolveImpactSubpageWpSlug(slug: string): string | null {
  return IMPACT_SUBPAGE_ROUTES[slug.toLowerCase()]?.wpSlug ?? null;
}

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
    img: report.img?.src
      ? { ...report.img, src: imgSrc }
      : report.img,
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

export const getImpactSubpageData = cache(
  async (slug: string): Promise<ImpactSubpageData | null> => {
    const route = IMPACT_SUBPAGE_ROUTES[slug.toLowerCase()];
    if (!route) return null;

    const response = await fetchWPPage<ImpactSubpageScf>(route.wpSlug);

    if (!response.data) {
      console.warn(
        `[getImpactSubpageData] Falling back to static content for slug "${slug}" — ${response.error}`
      );
      return route.fallback;
    }

    const rawScf = response.data.scf ?? response.data.acf;
    if (!hasUsableScf(rawScf)) {
      console.warn(
        `[getImpactSubpageData] Empty SCF for slug "${slug}" — using its template fallback.`
      );
      return route.fallback;
    }

    const data = parseImpactSubpage(rawScf, route.fallback);
    return resolvePageMedia(data);
  }
);
