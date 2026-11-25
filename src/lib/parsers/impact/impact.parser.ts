import type {
  ImpactPageScf,
  ImpactHeroSectionScf,
  ImpactNumbersSectionScf,
  ImpactReportsSectionScf,
  ImpactPageData,
  ImpactHeroSectionType,
  ImpactNumbersSectionType,
  ImpactReportsSectionType,
} from "@/types/impact/impact.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseRepeater, parseBool } from "@/lib/parsers/acf.parser";
import { impactHeroFallback } from "@/data/impact/impactHero.data";
import { impactNumbersFallback } from "@/data/impact/impactNumbers.data";
import { impactReportsFallback } from "@/data/impact/impactReports.data";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

function toMedia(
  src: WPMedia | string | false | null | undefined,
  fallback: MediaAsset = EMPTY_MEDIA
): MediaAsset {
  if (typeof src === "string") {
    return src.length > 0 ? { src, alt: fallback.alt } : fallback;
  }
  const url = src ? src.url || "" : "";
  if (url.length === 0) return fallback;
  return { src: url, alt: (src && src.alt) || fallback.alt };
}

// SCF link/file fields arrive as { url, alt }, a plain url string, or `false`.
// Reduce them to a plain href string for the UI, falling back when empty.
function toDownloadHref(
  href: WPMedia | string | false | null | undefined,
  fallback: string
): string {
  if (typeof href === "string") {
    return href.length > 0 ? href : fallback;
  }
  const url = href ? href.url || "" : "";
  return url.length > 0 ? url : fallback;
}

function parseImpactHero(group: ImpactHeroSectionScf | undefined): ImpactHeroSectionType {
  const card = group?.validation_card ?? group?.validationCard;
  return {
    title1: parseText(group?.title1, impactHeroFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      impactHeroFallback.highlightedTitle
    ),
    body: parseText(group?.body, impactHeroFallback.body),
    img: toMedia(group?.img, impactHeroFallback.img),
    validationCard: {
      eyebrow: parseText(card?.eyebrow, impactHeroFallback.validationCard.eyebrow),
      title: parseText(card?.title, impactHeroFallback.validationCard.title),
      label: parseText(card?.label, impactHeroFallback.validationCard.label),
    },
  };
}

function parseImpactNumbers(group: ImpactNumbersSectionScf | undefined): ImpactNumbersSectionType {
  const stats = parseRepeater(group?.stats).map((row: any, index: number) => {
    const fallbackItem = impactNumbersFallback.stats[index] ?? impactNumbersFallback.stats[0];
    return {
      icon: parseText(row?.icon, fallbackItem.icon),
      value: parseText(row?.value, fallbackItem.value),
      description: parseText(row?.description, fallbackItem.description),
      category: parseText(row?.category, fallbackItem.category),
    };
  });

  return {
    eyebrow: parseText(group?.eyebrow, impactNumbersFallback.eyebrow),
    title: parseText(group?.title, impactNumbersFallback.title),
    subtitle: parseText(group?.subtitle, impactNumbersFallback.subtitle),
    img: toMedia(group?.img, impactNumbersFallback.img),
    stats: stats.length > 0 ? stats : impactNumbersFallback.stats,
  };
}

function parseImpactReports(group: ImpactReportsSectionScf | undefined): ImpactReportsSectionType {
  const rows = parseRepeater(group?.reports);

  const reports = rows
    // Only published cards reach the UI. `active` defaults to true, so cards
    // created before the toggle existed (and any with the field absent) stay visible.
    .filter((row: any) => parseBool(row?.active, true))
    .map((row: any, index: number) => {
      const fallbackItem = impactReportsFallback.reports[index] ?? impactReportsFallback.reports[0];
      return {
        img: toMedia(row?.img, fallbackItem.img),
        month: parseText(row?.month, fallbackItem.month),
        title: parseText(row?.title, fallbackItem.title),
        // download_href is now an SCF link/file object { url, alt } (or false); pull out the url.
        downloadHref: toDownloadHref(
          row?.download_href ?? row?.downloadHref,
          fallbackItem.downloadHref
        ),
      };
    });

  // Fall back to static content only when WordPress returned NO reports at all.
  // If reports exist but are all unpublished, show an empty grid (not the fallback).
  return {
    reports: rows.length > 0 ? reports : impactReportsFallback.reports,
  };
}

export function parseImpactPage(scf: ImpactPageScf | undefined): ImpactPageData {
  return {
    hero: parseImpactHero(scf?.hero_section ?? scf?.heroSection),
    numbersSection: parseImpactNumbers(scf?.numbers_section ?? scf?.numbersSection),
    reportsSection: parseImpactReports(scf?.reports_section ?? scf?.reportsSection),
  };
}
