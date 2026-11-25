import type { Metadata } from "next";
import * as cheerio from "cheerio";
import type { WPSeo, WPRobots, YoastHeadJson } from "@/types/wordpress.types";
import { applyCanonical } from "@/lib/seo/canonical";
import {
  normalizeSeoDescription,
  normalizeSeoTitle,
  replaceCmsUrlWithFrontend,
} from "@/lib/seo/seoMeta.utils";

export interface MetadataBuildOptions {
  /** Public Next.js route path, e.g. `/our-story` or `/blogs/my-post`. */
  canonicalPath: string;
}

/**
 * Parses raw HTML head content to extract SEO metadata using Cheerio.
 */
function parseRawHead(rawHead: string): Partial<WPSeo> {
  const $ = cheerio.load(rawHead);

  const title = $("title").text().trim();
  const description = $('meta[name="description"]').attr("content")?.trim();
  // const canonical = $('link[rel="canonical"]').attr("href")?.trim();
const rawCanonical = $('link[rel="canonical"]').attr("href")?.trim();
  const canonical = rawCanonical ? replaceCmsUrlWithFrontend(rawCanonical) : undefined;

  const ogTitle = $('meta[property="og:title"]').attr("content")?.trim();
  const ogDescription = $('meta[property="og:description"]')
    .attr("content")
    ?.trim();
  const ogType = $('meta[property="og:type"]').attr("content")?.trim();

  const ogImages: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }> = [];
  $('meta[property="og:image"]').each((_, el) => {
    const url = $(el).attr("content")?.trim();
    if (url) {
      const width = $('meta[property="og:image:width"]').attr("content")
        ? parseInt($('meta[property="og:image:width"]').attr("content")!)
        : undefined;
      const height = $('meta[property="og:image:height"]').attr("content")
        ? parseInt($('meta[property="og:image:height"]').attr("content")!)
        : undefined;
      const alt = $('meta[property="og:image:alt"]').attr("content")?.trim();
      ogImages.push({ url, width, height, alt });
    }
  });

  const twitterCard = $('meta[name="twitter:card"]').attr("content")?.trim();
  const twitterTitle = $('meta[name="twitter:title"]').attr("content")?.trim();
  const twitterImage = $('meta[name="twitter:image"]').attr("content")?.trim();

  const robots = $('meta[name="robots"]').attr("content")?.trim();

  return {
    title,
    description,
    canonical,
    og_title: ogTitle,
    og_description: ogDescription,
    og_type: ogType,
    og_image: ogImages,
    twitter_card: twitterCard,
    twitter_title: twitterTitle,
    twitter_image: twitterImage,
    robots,
  };
}

const DEFAULT_OG_IMAGE = [
  {
    url: "/assets/logos/logo-dark.png",
    width: 1200,
    height: 630,
    alt: "Yuva Unstoppable — Transforming Government Schools Across India",
  },
];

/**
 * Builds Next.js Metadata object from SEO data.
 */
export function buildFallbackMetadata(
  fallback: { title: string; description: string },
  options: MetadataBuildOptions
): Metadata {
  const baseTitle = normalizeSeoTitle(fallback.title);
  const title = disambiguateQueryTitle(baseTitle, options.canonicalPath);
  const description = normalizeSeoDescription(fallback.description);

  return applyCanonical(
    {
      title: { absolute: title },
      description,
      openGraph: {
        title,
        description,
        siteName: "Yuva Unstoppable",
        locale: "en_US",
        type: "website",
        images: DEFAULT_OG_IMAGE,
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [DEFAULT_OG_IMAGE[0].url],
      },
    },
    options.canonicalPath
  );
}

export function buildMetadata(
  seo: WPSeo | null | undefined,
  fallbackTitle: string,
  options: MetadataBuildOptions
): Metadata {
  let parsedSeo: Partial<WPSeo> = seo ?? {};

  if (seo?.raw_head) {
    parsedSeo = parseRawHead(seo.raw_head);
    parsedSeo = { ...parsedSeo, ...seo };
    console.log(
      `[buildMetadata] Parsed from raw_head | title="${parsedSeo.title}" | description="${parsedSeo.description?.slice(0, 60)}..." | canonical="${parsedSeo.canonical}" | og_images: ${parsedSeo.og_image?.length ?? 0}`
    );
  } else {
    console.log(
      `[buildMetadata] No raw_head — using seo object directly | fallbackTitle="${fallbackTitle}"`
    );
  }

  const baseTitle = normalizeSeoTitle(parsedSeo?.title ?? fallbackTitle);
  const title = disambiguateQueryTitle(baseTitle, options.canonicalPath);
  const description = normalizeSeoDescription(
    parsedSeo?.description ?? "",
    fallbackTitle
  );

  const images =
    parsedSeo?.og_image && parsedSeo.og_image.length > 0
      ? parsedSeo.og_image.map((img) => ({
          url: img.url,
          width: img.width ?? 1200,
          height: img.height ?? 630,
          alt: img.alt ?? title,
        }))
      : DEFAULT_OG_IMAGE;

  const robots = parsedSeo?.robots ? parseRobots(parsedSeo.robots) : undefined;

  return applyCanonical(
    {
      title: { absolute: title },
      description,
      openGraph: {
        title: normalizeSeoTitle(parsedSeo?.og_title ?? title),
        description: normalizeSeoDescription(
          parsedSeo?.og_description ?? description
        ),
        siteName: "Yuva Unstoppable",
        locale: "en_US",
        type: [
          "article",
          "website",
          "book",
          "profile",
          "music.song",
          "music.album",
          "music.playlist",
          "music.radio_station",
          "video.movie",
          "video.episode",
          "video.tv_show",
          "video.other",
        ].includes(parsedSeo?.og_type ?? "")
          ? (parsedSeo?.og_type as
              | "article"
              | "website"
              | "book"
              | "profile"
              | "music.song"
              | "music.album"
              | "music.playlist"
              | "music.radio_station"
              | "video.movie"
              | "video.episode"
              | "video.tv_show"
              | "video.other")
          : "website",
        images,
      },
      twitter: {
        card: ["summary", "summary_large_image", "player", "app"].includes(
          parsedSeo?.twitter_card ?? ""
        )
          ? (parsedSeo?.twitter_card as
              | "summary"
              | "summary_large_image"
              | "player"
              | "app")
          : "summary_large_image",
        title: normalizeSeoTitle(parsedSeo?.twitter_title ?? title),
        description,
        images: images.map((img) => img.url),
      },
      ...(robots && { robots }),
    },
    options.canonicalPath
  );
}

function parseRobots(robots: string): WPRobots {
  const directives = robots.split(",").map((d) => d.trim().toLowerCase());
  return {
    index: !directives.includes("noindex"),
    follow: !directives.includes("nofollow"),
    noarchive: directives.includes("noarchive"),
    nosnippet: directives.includes("nosnippet"),
    noimageindex: directives.includes("noimageindex"),
  };
}

/* ─────────────────────────── Yoast (yoast_head_json) ─────────────────────────── */

const OG_TYPES = [
  "article",
  "website",
  "book",
  "profile",
  "music.song",
  "music.album",
  "music.playlist",
  "music.radio_station",
  "video.movie",
  "video.episode",
  "video.tv_show",
  "video.other",
] as const;
type OgType = (typeof OG_TYPES)[number];

const TWITTER_CARDS = ["summary", "summary_large_image", "player", "app"] as const;
type TwitterCard = (typeof TWITTER_CARDS)[number];

function parseYoastRobots(
  robots: YoastHeadJson["robots"]
): WPRobots | undefined {
  if (!robots) return undefined;

  const maxSnippet = robots["max-snippet"]?.toLowerCase() ?? "";
  const maxImagePreview = robots["max-image-preview"]?.toLowerCase() ?? "";

  return {
    index: robots.index ? robots.index.toLowerCase() !== "noindex" : true,
    follow: robots.follow ? robots.follow.toLowerCase() !== "nofollow" : true,
    noarchive: false,
    nosnippet: maxSnippet.includes("max-snippet:0"),
    noimageindex: maxImagePreview.includes("max-image-preview:none"),
  };
}

function disambiguateQueryTitle(title: string, path: string): string {
  if (!path.includes("?")) return title;
  const queryString = path.split("?")[1] || "";
  const params = new URLSearchParams(queryString);
  const category = params.get("category") || params.get("listing") || params.get("from");
  if (category) {
    const formattedCat = category.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
    return `${title} — ${formattedCat}`;
  }
  return title;
}

export function buildMetadataFromYoast(
  yoast: YoastHeadJson | null | undefined,
  fallback: { title: string; description: string },
  options: MetadataBuildOptions
): Metadata {
  if (!yoast || Object.keys(yoast).length === 0) {
    console.log(
      `[buildMetadataFromYoast] No yoast_head_json — static fallback | title="${fallback.title}"`
    );
    return buildFallbackMetadata(fallback, options);
  }

  const rawTitle = (yoast.title ?? "").trim();

  // Dedup safeguard: If Yoast returns a bare site name (e.g. "Yuva Unstoppable"
  // or "Yuva Unstoppable –") without page-specific context, it will produce
  // duplicate <title> tags across the site. Fall back to the page-specific title.
  const isGenericTitle =
    !rawTitle ||
    /^yuva\s*unstoppable\s*[-–—|]?\s*$/i.test(rawTitle) ||
    rawTitle.toLowerCase() === "yuva unstoppable";

  const baseTitle = normalizeSeoTitle(isGenericTitle ? fallback.title : rawTitle);
  const title = disambiguateQueryTitle(baseTitle, options.canonicalPath);
  const description = normalizeSeoDescription(
    yoast.description ?? "",
    fallback.description
  );

  const images =
    yoast.og_image && yoast.og_image.length > 0
      ? yoast.og_image.map((img) => ({
          url: img.url,
          width: img.width ?? 1200,
          height: img.height ?? 630,
          alt: title,
        }))
      : DEFAULT_OG_IMAGE;

  const ogType: OgType = OG_TYPES.includes(yoast.og_type as OgType)
    ? (yoast.og_type as OgType)
    : "website";

  const twitterCard: TwitterCard = TWITTER_CARDS.includes(
    yoast.twitter_card as TwitterCard
  )
    ? (yoast.twitter_card as TwitterCard)
    : "summary_large_image";

  const robots = parseYoastRobots(yoast.robots);

  console.log(
    `[buildMetadataFromYoast] Built from yoast_head_json | title="${title}" | canonicalPath="${options.canonicalPath}" | og_images: ${images.length} | schema nodes: ${yoast.schema?.["@graph"]?.length ?? 0}`
  );

  return applyCanonical(
    {
      title: { absolute: title },
      description,
      openGraph: {
        title: normalizeSeoTitle(yoast.og_title ?? title),
        description: normalizeSeoDescription(
          yoast.og_description ?? description
        ),
        siteName: yoast.og_site_name || "Yuva Unstoppable",
        locale: yoast.og_locale || "en_US",
        type: ogType,
        ...(yoast.article_modified_time && {
          modifiedTime: yoast.article_modified_time,
        }),
        images,
      },
      twitter: {
        card: twitterCard,
        title: normalizeSeoTitle(yoast.twitter_title ?? title),
        description: normalizeSeoDescription(
          yoast.twitter_description ?? description
        ),
        images: yoast.twitter_image
          ? [yoast.twitter_image]
          : images.map((i) => i.url),
      },
      ...(robots && { robots }),
    },
    options.canonicalPath
  );
}
