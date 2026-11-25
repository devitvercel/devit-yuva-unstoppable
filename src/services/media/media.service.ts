import {cache} from "react";
import {
  PAGE_SLUGS,
  REVALIDATE_TIME,
  WP_ENDPOINTS,
} from "@/constants/wp.constants";
import {MEDIA_FALLBACKS} from "@/data/media/media.fallbacks";
import {
  parseGalleryItems,
  parseMediaPage,
} from "@/lib/parsers/media/media.parser";
import {getVideoThumbnailUrl} from "@/lib/videoEmbed";
import {fetchWPPage, resolveMediaId} from "@/lib/wordpress";
import {wpFetch} from "@/lib/wordpress/wpFetch";
import {
  getBlogArticlesForMediaPage,
  getBlogCategoryTabsForMediaPage,
  getPressArticlesForMediaPage,
  getPressCategoryTabsForMediaPage,
} from "@/services/media/articlesListing.service";
import { shouldExcludeFromBlogListings } from "@/constants/awardsRecognition.constants";
import type {
  ArticleItem,
  GalleryItem,
  GalleryItemScf,
  MediaPageData,
  MediaPageScf,
  PartnerItem,
  ReportItem,
} from "@/types/media/media.types";

interface MediaRouteConfig {
  wpSlug: string;
  fallback: MediaPageData;
}

/**
 * Media route registry.
 * ---------------------------------------------------------------------------
 * The key is the clean frontend route slug. Each entry owns both the WordPress
 * page slug and the template-specific fallback used when SCF is unavailable.
 *
 * Keeping this mapping explicit prevents unrelated dynamic routes from being
 * treated as media pages and gives us one place to support future WP slug
 * migrations without changing public URLs.
 */
const MEDIA_WP_SLUGS: Record<string, string> = {
  gallery: PAGE_SLUGS.GALLERY,
  blogs: PAGE_SLUGS.BLOGS,
  "press-and-media": PAGE_SLUGS.PRESS_AND_MEDIA,
};

const MEDIA_ROUTES: Record<string, MediaRouteConfig> = Object.fromEntries(
  Object.entries(MEDIA_FALLBACKS).map(([slug, fallback]) => [
    slug,
    {wpSlug: MEDIA_WP_SLUGS[slug] ?? slug, fallback},
  ])
);

export const MEDIA_SLUGS = Object.freeze(Object.keys(MEDIA_ROUTES));

/** Returns true when a clean frontend slug belongs to the media page family. */
export function isMediaSlug(slug: string): boolean {
  return Boolean(MEDIA_ROUTES[slug.toLowerCase()]);
}

/** Resolves a frontend route slug to the WordPress page slug queried by the service. */
export function resolveMediaWpSlug(slug: string): string | null {
  return MEDIA_ROUTES[slug.toLowerCase()]?.wpSlug ?? null;
}

/**
 * WordPress may return `scf: []` when a field group is not registered and `{}`
 * when it exists but has no values. Neither payload contains content worth
 * parsing, so the service must retain the route's complete static fallback.
 */
function hasUsableScf(scf: MediaPageScf | undefined | null): scf is MediaPageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

async function resolvePartnerImage(partner: PartnerItem): Promise<PartnerItem> {
  return {
    ...partner,
    img: {...partner.img, src: await resolveMediaId(partner.img.src)},
  };
}

async function resolveReportImage(report: ReportItem): Promise<ReportItem> {
  if (!report.img?.src) return report;
  return {
    ...report,
    img: {...report.img, src: await resolveMediaId(report.img.src)},
  };
}

async function resolveGalleryImage(item: GalleryItem): Promise<GalleryItem> {
  let src = item.img.src ? await resolveMediaId(item.img.src) : "";

  if (!src && item.kind === "video" && item.href) {
    src = (await getVideoThumbnailUrl(item.href)) ?? "";
  }

  return {
    ...item,
    img: {...item.img, src},
  };
}

async function resolveArticleImage(article: ArticleItem): Promise<ArticleItem> {
  if (!article.img?.src) return article;
  return {
    ...article,
    img: {...article.img, src: await resolveMediaId(article.img.src)},
  };
}

function newestFirstArticles(articles: ArticleItem[]): ArticleItem[] {
  return articles
    .map((article, index) => ({article, index}))
    .sort((a, b) => {
      const aTime = Date.parse(a.article.date);
      const bTime = Date.parse(b.article.date);
      if (Number.isNaN(aTime) && Number.isNaN(bTime)) return a.index - b.index;
      if (Number.isNaN(aTime)) return 1;
      if (Number.isNaN(bTime)) return -1;
      return bTime - aTime || a.index - b.index;
    })
    .map(({article}) => article);
}

/** Merges live article listings for template-4 media pages. */
async function resolveArticleListing(
  wpSlug: string,
  data: MediaPageData,
  scfCategoriesOverride = false,
  search = ""
): Promise<MediaPageData> {
  if (data.template !== 4) return data;

  if (wpSlug === PAGE_SLUGS.BLOGS) {
    const [blogListing, categories] = await Promise.all([
      getBlogArticlesForMediaPage(search),
      getBlogCategoryTabsForMediaPage(
        scfCategoriesOverride,
        data.categories,
        data.categories
      ),
    ]);

    const normalizedSearch = search.trim().toLocaleLowerCase();
    const fallbackMatches = newestFirstArticles(
      normalizedSearch
        ? data.articles.filter((article) =>
            [
              article.title,
              article.excerpt,
              article.category,
              article.tag,
            ].some((value) =>
              value?.toLocaleLowerCase().includes(normalizedSearch)
            )
          )
        : data.articles
    ).filter(
      (article) =>
        !shouldExcludeFromBlogListings(article.category, article.tag)
    );

    return {
      ...data,
      articles: blogListing.available
        ? newestFirstArticles(blogListing.articles)
        : fallbackMatches,
      categories: categories.length > 0 ? categories : data.categories,
    };
  }

  if (wpSlug === PAGE_SLUGS.PRESS_AND_MEDIA) {
    const [pressListing, categories] = await Promise.all([
      getPressArticlesForMediaPage(search),
      getPressCategoryTabsForMediaPage(
        scfCategoriesOverride,
        data.categories,
        data.categories
      ),
    ]);
    const normalizedSearch = search.trim().toLocaleLowerCase();
    const fallbackMatches = newestFirstArticles(normalizedSearch
      ? data.articles.filter((article) =>
          [
            article.title,
            article.excerpt,
            article.category,
            article.tag,
            article.source,
          ].some((value) =>
            value?.toLocaleLowerCase().includes(normalizedSearch)
          )
        )
      : data.articles);

    return {
      ...data,
      articles: pressListing.available
        ? newestFirstArticles(pressListing.articles)
        : fallbackMatches,
      categories: categories.length > 0 ? categories : data.categories,
    };
  }

  return data;
}

async function fetchGallerySearchRows(
  wpSlug: string,
  search: string
): Promise<GalleryItemScf[] | null> {
  const params = new URLSearchParams({slug: wpSlug, search});

  try {
    const response = await wpFetch(
      `${WP_ENDPOINTS.GALLERY_SEARCH}?${params.toString()}`,
      {
        next: {revalidate: REVALIDATE_TIME.PAGES},
        headers: {Accept: "application/json"},
      }
    );
    if (!response.ok) return null;

    const payload = (await response.json()) as {
      items?: GalleryItemScf[];
    };
    return Array.isArray(payload.items) ? payload.items : null;
  } catch (error) {
    console.error("[fetchGallerySearchRows] Gallery search failed", error);
    return null;
  }
}

async function resolveGallerySearch(
  wpSlug: string,
  data: MediaPageData,
  search: string
): Promise<MediaPageData> {
  const normalizedSearch = search.trim();
  if (wpSlug !== PAGE_SLUGS.GALLERY || !normalizedSearch) return data;

  const rows = await fetchGallerySearchRows(wpSlug, normalizedSearch);
  if (rows !== null) {
    return {...data, gallery: parseGalleryItems(rows)};
  }

  const query = normalizedSearch.toLocaleLowerCase();
  const categoryLabels = new Map(
    data.categories.map((category) => [
      category.id,
      category.label.toLocaleLowerCase(),
    ])
  );
  return {
    ...data,
    gallery: data.gallery.filter((item) =>
      [
        item.title,
        item.category,
        categoryLabels.get(item.category) ?? "",
      ].some((value) =>
        value.toLocaleLowerCase().includes(query)
      )
    ),
  };
}

/** Resolves every attachment ID without mutating parser output or static fallbacks. */
async function resolvePageMedia(data: MediaPageData): Promise<MediaPageData> {
  const [heroSrc, partners, reports, gallery, articles] = await Promise.all([
    resolveMediaId(data.hero.img.src),
    Promise.all(data.partners.map(resolvePartnerImage)),
    Promise.all(data.reports.map(resolveReportImage)),
    Promise.all(data.gallery.map(resolveGalleryImage)),
    Promise.all(data.articles.map(resolveArticleImage)),
  ]);

  return {
    ...data,
    hero: {...data.hero, img: {...data.hero.img, src: heroSrc}},
    partners,
    reports,
    gallery,
    articles,
  };
}

/**
 * Media page service for Yuva.
 * ---------------------------------------------------------------------------
 * Fetches one of the registered media pages, parses its SCF content against
 * the correct template fallback, and resolves WordPress attachment IDs.
 */
export const getMediaPageData = cache(
  async (slug: string, search = ""): Promise<MediaPageData | null> => {
    const route = MEDIA_ROUTES[slug.toLowerCase()];
    const normalizedSearch = search.trim();

    // Unknown slugs are left to the dynamic route's not-found handling.
    if (!route) return null;

    const response = await fetchWPPage<MediaPageScf>(route.wpSlug);

    if (!response.data) {
      console.warn(
        `[getMediaPageData] Falling back to static content for slug "${slug}" — ${response.error}`
      );
      const withGallery = await resolveGallerySearch(
        route.wpSlug,
        route.fallback,
        normalizedSearch
      );
      const withArticles = await resolveArticleListing(
        route.wpSlug,
        withGallery,
        false,
        normalizedSearch
      );
      return resolvePageMedia(withArticles);
    }

    const rawScf = response.data.scf ?? response.data.acf;
    if (!hasUsableScf(rawScf)) {
      console.warn(
        `[getMediaPageData] Empty SCF for slug "${slug}" — using its template fallback.`
      );
      const withGallery = await resolveGallerySearch(
        route.wpSlug,
        route.fallback,
        normalizedSearch
      );
      const withArticles = await resolveArticleListing(
        route.wpSlug,
        withGallery,
        false,
        normalizedSearch
      );
      return resolvePageMedia(withArticles);
    }

    const scfCategoriesOverride =
      Array.isArray(rawScf.categories) && rawScf.categories.length > 0;

    const listingPath =
      slug === "press-and-media" ? "/press-and-media" : "/blogs";
    const parsedData = parseMediaPage(rawScf, route.fallback, listingPath);
    const data = await resolveGallerySearch(
      route.wpSlug,
      parsedData,
      normalizedSearch
    );

    const withArticles = await resolveArticleListing(
      route.wpSlug,
      data,
      scfCategoriesOverride,
      normalizedSearch
    );
    return resolvePageMedia(withArticles);
  }
);
