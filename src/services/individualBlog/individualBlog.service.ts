import {cache} from "react";
import {BLOG_CONTENT_SOURCE} from "@/constants/contentSource.constants";
import {
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  fetchContentBySlug,
  fetchRelatedPosts,
  type WPContentItem,
} from "@/lib/wordpress";
import {decodeEntities, stripHtml} from "@/lib/parsers/acf.parser";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";
import { shouldExcludeFromBlogListings } from "@/constants/awardsRecognition.constants";
import type {IndividualBlogPageData, InitiativeCardType,} from "@/types/individualBlog/individualBlog.types";
import {INDIVIDUAL_BLOG_FALLBACK} from "@/data/individualBlog/individualBlog.fallback";
import {initiativesDataFallback} from "@/data/individualBlog/initiatives.data";
import {parseIndividualBlogFromPost} from "@/lib/parsers/individualBlog/individualBlog.parser";

/** "2024-03-21T11:37:47" → "March 21, 2024" (matches the initiatives card date style). */
function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-US", {month: "long", day: "numeric", year: "numeric"});
}

/** Map a YARPP/WP related post into an "Other Initiatives" card. */
function toInitiativeCard(post: WPContentItem): InitiativeCardType {
  const img = embeddedFeaturedImage(post);
  const title = decodeEntities(post.title?.rendered ?? "");
  return {
    img: {
      src: img.src || VOC_CARD_FALLBACK_IMG.src,
      alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
    },
    date: formatDate(post.date),
    title,
    body: stripHtml(post.excerpt?.rendered ?? ""),
    link: {text: "Read More →", href: `/blogs/${post.slug}`},
  };
}

/**
 * Individual Blog page service for Yuva
 * ---------------------------------------------------------------------------
 * Blogs are WordPress *posts*. The /blogs/[slug] detail page fetches the post
 * by slug (rendered via dangerouslySetInnerHTML in ContentSection). The
 * "Other Initiatives" section is the related-stories section — its cards come
 * from YARPP related posts for this post (heading copy stays static). Falls
 * back to the static initiatives cards when YARPP returns none.
 */
export const getIndividualBlogPageData = cache(
  async (slug: string): Promise<IndividualBlogPageData> => {
    const post = await fetchContentBySlug(BLOG_CONTENT_SOURCE, slug);

    if (!post) {
      console.warn(
        `[getIndividualBlogPageData] No post for slug="${slug}" — using static fallback`
      );
      return INDIVIDUAL_BLOG_FALLBACK;
    }

    const category = embeddedPrimaryCategory(post);

    // YARPP related posts → "Other Initiatives" cards (keep the section heading).
    const relatedPosts = await fetchRelatedPosts(post.id, 3);
    const relatedCards = relatedPosts
      .filter((related) => {
        const cat = embeddedPrimaryCategory(related);
        return !shouldExcludeFromBlogListings(cat.slug, cat.name);
      })
      .map(toInitiativeCard);

    const initiatives = {
      title: initiativesDataFallback.title,
      highlightedTitle: initiativesDataFallback.highlightedTitle,
      cards: relatedCards.length > 0 ? relatedCards : initiativesDataFallback.cards,
    };

    return parseIndividualBlogFromPost(
      {
        title: post.title,
        excerpt: post.excerpt,
        content: post.content,
        category: {name: category.name},
      },
      initiatives
    );
  }
);
