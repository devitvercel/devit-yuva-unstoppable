import { cache } from "react";
import {
  embeddedPrimaryCategory,
  fetchContentBySlug,
  fetchWPPage,
  resolveMediaId,
} from "@/lib/wordpress";
import { parseHomePage } from "@/lib/parsers/home/home.parser";
import { extractBlogSlugFromHref } from "@/lib/parsers/home/photoCarousel.utils";
import { decodeEntities } from "@/lib/parsers/acf.parser";
import { BLOG_CONTENT_SOURCE } from "@/constants/contentSource.constants";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { HOME_FALLBACK } from "@/data/home/home.fallback";
import type { HomeScf, HomePageData } from "@/types/home/home.types";

/**
 * Home page service for Yuva
 * ---------------------------------------------------------------------------
 * The single entry-point any UI code uses to read the Home page payload.
 *
 * Why a service layer?
 *   1. Components stay declarative — they consume a strict type, not a raw REST envelope.
 *   2. Page-level fallback policy lives in one place.
 *   3. React.cache de-duplicates calls within a single request.
 */
export const getHomePageData = cache(async (): Promise<HomePageData> => {
  const response = await fetchWPPage<HomeScf>(PAGE_SLUGS.HOME);

  if (!response.data) {
    console.warn(
      `[getHomePageData] Falling back to static content — ${response.error}`
    );
    return HOME_FALLBACK;
  }

  // Secure Custom Fields serves under `scf`; tolerate a legacy `acf` payload.
  const data = parseHomePage(response.data.scf ?? response.data.acf);

  // Resolve bare attachment IDs to their media URLs
  data.hero.img.src = await resolveMediaId(data.hero.img.src);

  if (data.photoCarousel?.carouselContent) {
    await Promise.all(
      data.photoCarousel.carouselContent.map(async (item) => {
        item.bgImg.src = await resolveMediaId(item.bgImg.src);
        item.img.src = await resolveMediaId(item.img.src);

        if (!item.eyebrow.trim() && item.cta.href) {
          const blogSlug = extractBlogSlugFromHref(item.cta.href);
          if (blogSlug) {
            const post = await fetchContentBySlug(BLOG_CONTENT_SOURCE, blogSlug);
            if (post) {
              const categoryName = embeddedPrimaryCategory(post).name;
              if (categoryName) {
                item.eyebrow = decodeEntities(categoryName);
              }
            }
          }
        }
      })
    );
  }

  if (data.csrPartners?.grids) {
    await Promise.all(
      data.csrPartners.grids.map(async (gridItem) => {
        await Promise.all(
          gridItem.logos.map(async (logo) => {
            logo.src = await resolveMediaId(logo.src);
          })
        );
      })
    );
  }

  if (data.voices?.voices) {
    await Promise.all(
      data.voices.voices.map(async (voice) => {
        voice.img.src = await resolveMediaId(voice.img.src);
      })
    );
  }

  if (data.ourReach?.img) {
    data.ourReach.img.src = await resolveMediaId(data.ourReach.img.src);
  }

  if (data.whatWeDo?.programmes) {
    await Promise.all(
      data.whatWeDo.programmes.map(async (programme) => {
        programme.img.src = await resolveMediaId(programme.img.src);
      })
    );
  }

  if (data.beliefsSection?.beliefs) {
    await Promise.all(
      data.beliefsSection.beliefs.map(async (belief) => {
        belief.img.src = await resolveMediaId(belief.img.src);
      })
    );
  }

  return data;
});

