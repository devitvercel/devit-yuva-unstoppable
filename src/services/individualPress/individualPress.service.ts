import { cache } from "react";
import { PRESS_CONTENT_SOURCE, BLOG_CONTENT_SOURCE } from "@/constants/contentSource.constants";
import {
  embeddedFeaturedImage,
  embeddedPrimaryCategory,
  fetchContentBySlug,
  fetchContentItems,
  type WPContentItem,
} from "@/lib/wordpress/functions/content.methods";
import { decodeEntities, stripHtml } from "@/lib/parsers/acf.parser";
import { VOC_CARD_FALLBACK_IMG } from "@/data/voiceOfChange/vocStories.data";
import type { ArticleItem } from "@/types/media/media.types";
import type { IndividualPressPageData } from "@/types/individualPress/individualPress.types";
import { INDIVIDUAL_PRESS_FALLBACK } from "@/data/individualPress/individualPress.fallback";
import { relatedBlogsDataFallback } from "@/data/individualPress/relatedBlogs.data";
import { parseIndividualPressFromPost } from "@/lib/parsers/individualPress/individualPress.parser";

/** "2024-10-12T00:00:00" → "OCT 12, 2024" */
function formatBlogCardDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d
    .toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    .toUpperCase();
}

/** Map a YARPP/WP related blog post into a blog card for the Related Blogs grid. */
function toRelatedArticleCard(post: WPContentItem): ArticleItem {
  const img = embeddedFeaturedImage(post);
  const category = embeddedPrimaryCategory(post);
  const title = decodeEntities(post.title?.rendered ?? "");

  return {
    title,
    excerpt: stripHtml(post.excerpt?.rendered ?? ""),
    category: category.slug || "all",
    tag: category.name?.toUpperCase(),
    date: formatBlogCardDate(post.date),
    img: {
      src: img.src || VOC_CARD_FALLBACK_IMG.src,
      alt: img.alt || title || VOC_CARD_FALLBACK_IMG.alt,
    },
    href: `/blogs/${post.slug}`,
  };
}

/**
 * Individual Press article service.
 * Press articles use the separate press-article post type. Related Blogs shows
 * recent blog posts (same source as Voice of Change).
 */
export const getIndividualPressPageData = cache(
  async (slug: string): Promise<IndividualPressPageData> => {
    const article = await fetchContentBySlug(PRESS_CONTENT_SOURCE, slug);

    if (!article) {
      console.warn(
        `[getIndividualPressPageData] No press article for slug="${slug}" — using static fallback`
      );
      return INDIVIDUAL_PRESS_FALLBACK;
    }

    const category = embeddedPrimaryCategory(article);
    const featuredImage = embeddedFeaturedImage(article);
    const pressTag =
      article.scf?.source?.trim() ||
      decodeEntities(category.name).toUpperCase();

    const relatedPosts = (
      await fetchContentItems(BLOG_CONTENT_SOURCE, { perPage: 3 })
    ).items;
    const relatedArticles = relatedPosts.map(toRelatedArticleCard);

    const relatedBlogs = {
      title: relatedBlogsDataFallback.title,
      highlightedTitle: relatedBlogsDataFallback.highlightedTitle,
      articles:
        relatedArticles.length > 0
          ? relatedArticles
          : relatedBlogsDataFallback.articles,
    };

    return parseIndividualPressFromPost(
      {
        title: article.title,
        excerpt: article.excerpt,
        content: article.content,
        date: article.date,
        category: { name: category.name },
        tag: pressTag,
        featuredImage,
      },
      relatedBlogs
    );
  }
);
