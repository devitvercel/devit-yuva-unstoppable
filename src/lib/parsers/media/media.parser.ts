import { parseText, parseBool } from "@/lib/parsers/acf.parser";
import type { MediaAsset } from "@/types/global.types";
import type {
  ArticleItem,
  GalleryItem,
  GalleryItemScf,
  MediaCta,
  MediaHero,
  MediaPageData,
  MediaPageScf,
  MediaTab,
  MediaTemplate,
  PartnerItem,
  ReportItem,
} from "@/types/media/media.types";
import type { WPMedia } from "@/types/wordpress.types";

const VALID_TEMPLATES: MediaTemplate[] = [1, 2, 3, 4];

function parseMediaAsset(
  value: WPMedia | string | number | false | undefined,
  fallback: MediaAsset = { src: "", alt: "media" }
): MediaAsset {
  if (typeof value === "number" && value > 0) {
    return { src: String(value), alt: fallback.alt };
  }
  if (typeof value === "string" && value) {
    return { src: value, alt: fallback.alt };
  }
  if (value && typeof value === "object" && value.url) {
    return { src: value.url, alt: value.alt || fallback.alt };
  }
  return fallback;
}

function parseRows<T>(value: T[] | false | undefined): T[] {
  return Array.isArray(value) ? value : [];
}

// SCF file/link fields arrive as { url, alt }, a plain url string, or `false`.
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

function parseTemplate(scf: MediaPageScf, fallback: MediaTemplate): MediaTemplate {
  const rawTemplate = (scf.media_template ?? scf.mediaTemplate)?.template;
  const template = Number(rawTemplate ?? fallback) as MediaTemplate;
  return VALID_TEMPLATES.includes(template) ? template : fallback;
}

function parseHero(scf: MediaPageScf, fallback: MediaHero): MediaHero {
  const hero = scf.hero;
  return {
    eyebrow: parseText(hero?.eyebrow, fallback.eyebrow),
    title: parseText(hero?.title, fallback.title),
    body: parseText(hero?.body, fallback.body),
    img: parseMediaAsset(hero?.img, fallback.img),
  };
}

function parseCategoryKind(raw: unknown): MediaTab["kind"] {
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  if (value === "photo" || value === "video") return value;
  return "both";
}

function parseTabs(rows: MediaPageScf["tabs"], fallback: MediaTab[]): MediaTab[] {
  const tabs = parseRows(rows).map((tab, index) => ({
    id: parseText(tab.id, `tab-${index + 1}`),
    label: parseText(tab.label),
  }));
  return tabs.length > 0 ? tabs : fallback;
}

/** Gallery category filters — includes photo/video/both scope. */
function parseGalleryCategories(
  rows: MediaPageScf["categories"],
  fallback: MediaTab[]
): MediaTab[] {
  const categories = parseRows(rows).map((tab, index) => {
    const id = parseText(tab.id, `category-${index + 1}`);
    return {
      id,
      label: parseText(tab.label),
      // "all" is always shared across Photo and Video tabs
      kind: id === "all" ? ("both" as const) : parseCategoryKind(tab.kind),
    };
  });
  return categories.length > 0 ? categories : fallback;
}

function parsePartners(scf: MediaPageScf, fallback: PartnerItem[]): PartnerItem[] {
  const partners = parseRows(scf.partners).map((partner, index) => ({
    name: parseText(partner.name),
    description: parseText(partner.description) || undefined,
    category: parseText(partner.category, "csr-partners"),
    img: parseMediaAsset(partner.img, fallback[index]?.img),
  }));
  return partners.length > 0 ? partners : fallback;
}

function parseReports(scf: MediaPageScf, fallback: ReportItem[]): ReportItem[] {
  const rows = parseRows(scf.reports);

  const reports = rows
    .filter((report) => parseBool(report.active, true))
    .map((report, index) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      return {
        title: parseText(report.title, fallbackItem?.title ?? "Annual Report"),
        year: parseText(report.year, fallbackItem?.year),
        category: parseText(
          report.category,
          fallbackItem?.category ?? "annual-report"
        ),
        fileUrl: toDownloadHref(
          report.file_url ??
          report.fileUrl ??
          report.download_href ??
          report.downloadHref,
          fallbackItem?.fileUrl ?? "/coming-soon"
        ),
        img: report.img
          ? parseMediaAsset(report.img, fallbackItem?.img)
          : fallbackItem?.img,
      };
    });

  // Fall back to static content only when WordPress returned no reports at all.
  return rows.length > 0 ? reports : fallback;
}

function parseGalleryKind(raw: unknown): "photo" | "video" {
  const value = typeof raw === "string" ? raw.trim().toLowerCase() : "";
  return value === "video" ? "video" : "photo";
}

function parseGalleryHref(item: GalleryItemScf): string | undefined {
  const href =
    parseText(item.href) ||
    parseText(item.video_url) ||
    parseText(item.videoUrl) ||
    parseText(item.link);
  return href || undefined;
}

export function parseGalleryItems(
  rows: GalleryItemScf[] | false | undefined
): GalleryItem[] {
  return parseRows(rows)
    .filter((item) => parseBool(item.active, true))
    .map((item, index) => {
      const title = parseText(item.title);
      return {
        item: {
          title,
          category: parseText(item.category, "all"),
          kind: parseGalleryKind(item.kind),
          date: parseText(item.date) || undefined,
          img: parseMediaAsset(item.img, { src: "", alt: title }),
          href: parseGalleryHref(item),
        },
        index,
      };
    })
    .sort((a, b) => {
      const aTime = a.item.date ? Date.parse(a.item.date) : Number.NaN;
      const bTime = b.item.date ? Date.parse(b.item.date) : Number.NaN;
      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return b.index - a.index;
      if (Number.isNaN(aTime)) return 1;
      if (Number.isNaN(bTime)) return -1;
      return bTime - aTime || b.index - a.index;
    })
    .map(({ item }) => item);
}

function parseGallery(scf: MediaPageScf, fallback: GalleryItem[]): GalleryItem[] {
  const rows = parseRows(scf.gallery);
  return rows.length > 0 ? parseGalleryItems(rows) : fallback;
}

function articleDetailHref(
  article: { href?: string; slug?: string; category?: string },
  listingPath: "/blogs" | "/press-and-media",
  fallback?: ArticleItem
): string {
  const explicit = parseText(article.href);
  if (explicit && !explicit.includes("/coming-soon")) return explicit;

  const slug = parseText(article.slug);
  if (slug) {
    const category = parseText(article.category, "all");
    const base = `${listingPath}/${slug}`;
    const params = new URLSearchParams();
    if (listingPath === "/blogs") params.set("listing", "blogs");
    if (category && category !== "all") params.set("from", category);
    const qs = params.toString();
    return qs ? `${base}?${qs}` : base;
  }

  return fallback?.href ?? listingPath;
}

/** Press cards always link to the external article URL from SCF. */
function pressArticleHref(
  article: { href?: string },
  fallback?: ArticleItem
): string {
  const href = parseText(article.href);
  if (href && !href.includes("/coming-soon")) return href;
  return fallback?.href ?? "#";
}

function parseArticles(
  scf: MediaPageScf,
  fallback: ArticleItem[],
  listingPath: "/blogs" | "/press-and-media"
): ArticleItem[] {
  const rows = parseRows(scf.articles);
  if (rows.length === 0) return fallback;

  return rows
    .filter((article) => parseBool(article.active, true))
    .map((article, index) => {
      const category = parseText(article.category, "all");
      const fb = fallback[index];

      return {
        title: parseText(article.title, fb?.title),
        excerpt: parseText(article.excerpt, fb?.excerpt),
        category,
        tag: parseText(article.tag, fb?.tag),
        source: parseText(article.source, fb?.source),
        sourceLogo: (article.sourceLogo ?? article.source_logo)
          ? parseMediaAsset(article.sourceLogo ?? article.source_logo, fb?.sourceLogo)
          : undefined,
        date: parseText(article.date, fb?.date),
        slug: parseText(article.slug) || fb?.slug,
        href:
          listingPath === "/press-and-media"
            ? pressArticleHref(article, fb)
            : articleDetailHref(article, listingPath, fb),
        img: article.img ? parseMediaAsset(article.img, fb?.img) : undefined,
      };
    });
}

function parseCta(scf: MediaPageScf, fallback: MediaCta): MediaCta {
  const cta = scf.cta;
  return {
    eyebrow: parseText(cta?.eyebrow, fallback.eyebrow),
    title: parseText(cta?.title, fallback.title),
    body: parseText(cta?.body, fallback.body),
    primary: {
      text: parseText(cta?.primary?.text, fallback.primary.text),
      href: parseText(cta?.primary?.href, fallback.primary.href),
    },
    secondary: {
      text: parseText(cta?.secondary?.text, fallback.secondary.text),
      href: parseText(cta?.secondary?.href, fallback.secondary.href),
    },
  };
}

/** Normalizes a Media SCF payload while preserving the route's template fallback. */
export function parseMediaPage(
  scf: MediaPageScf,
  fallback: MediaPageData,
  listingPath: "/blogs" | "/press-and-media" = fallback.articles.some((a) =>
    a.href.startsWith("/press-and-media")
  )
    ? "/press-and-media"
    : "/blogs"
): MediaPageData {
  return {
    template: parseTemplate(scf, fallback.template),
    hero: parseHero(scf, fallback.hero),
    tabs: parseTabs(scf.tabs, fallback.tabs),
    categories: parseGalleryCategories(scf.categories, fallback.categories),
    partners: parsePartners(scf, fallback.partners),
    reports: parseReports(scf, fallback.reports),
    gallery: parseGallery(scf, fallback.gallery),
    articles: parseArticles(scf, fallback.articles, listingPath),
    cta: parseCta(scf, fallback.cta),
  };
}
