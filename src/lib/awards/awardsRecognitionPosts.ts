import { cache } from "react";
import { BLOG_CONTENT_SOURCE } from "@/constants/contentSource.constants";
import { isAwardsRecognitionCategory } from "@/constants/awardsRecognition.constants";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import {
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  fetchContentCategories,
  fetchContentItems,
  type WPContentItem,
} from "@/lib/wordpress/functions/content.methods";
import type { AwardCardType } from "@/types/awards/awards.types";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";

function yearFromIsoDate(iso: string): number {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? new Date().getFullYear() : d.getFullYear();
}

/** Map a blog post in the Awards & Recognition category to an achievement card. */
export function awardCardFromBlogPost(post: WPContentItem): AwardCardType {
  const img = embeddedFeaturedImage(post);
  const title = decodeEntities(post.title?.rendered ?? "");

  return {
    year: yearFromIsoDate(post.date),
    title,
    body: stripHtml(post.excerpt?.rendered ?? ""),
    img: img.src || VOC_CARD_FALLBACK_IMG.src,
  };
}

/** Fetch all blog posts tagged with the Awards & Recognition category. */
export const fetchAwardsRecognitionBlogPosts = cache(
  async (): Promise<WPContentItem[]> => {
    const categories = await fetchContentCategories(BLOG_CONTENT_SOURCE);
    const awardsCategory = categories.find((category) =>
      isAwardsRecognitionCategory(category.slug, category.name)
    );

    if (!awardsCategory) return [];

    const { items } = await fetchContentItems(BLOG_CONTENT_SOURCE, {
      perPage: 100,
      categoryId: awardsCategory.id,
    });

    return items.filter((post) => {
      const primary = embeddedPrimaryCategory(post);
      return isAwardsRecognitionCategory(primary.slug, primary.name);
    });
  }
);

/**
 * Merge SCF achievement cards with blog-post cards.
 * SCF wins on duplicate titles; blog posts fill additional slots.
 */
export function mergeAchievementCards(
  scfCards: AwardCardType[],
  postCards: AwardCardType[]
): AwardCardType[] {
  const seen = new Set(
    scfCards
      .map((card) => card.title.trim().toLowerCase())
      .filter(Boolean)
  );

  const merged = [...scfCards];

  for (const card of postCards) {
    const key = card.title.trim().toLowerCase();
    if (!key || seen.has(key)) continue;
    seen.add(key);
    merged.push(card);
  }

  return merged.sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
}
