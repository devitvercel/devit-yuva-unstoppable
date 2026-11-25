import { APP_ROUTES } from "@/constants/navigation.constants";

/**
 * WordPress category slugs for "Awards & Recognition" blog posts.
 * Kept as a list so minor slug changes in WP still match.
 */
export const AWARDS_RECOGNITION_CATEGORY_SLUGS = [
  "awards-and-recognition",
  "award-and-recognition",
  "awards-recognition",
] as const;

/** Public awards page — award-category blog posts redirect here. */
export const AWARDS_RECOGNITION_PAGE_PATH = APP_ROUTES.AWARD_RECOGNITION;

/**
 * Returns true when a category slug or display name belongs to Awards & Recognition.
 */
export function isAwardsRecognitionCategory(
  slug?: string | null,
  name?: string | null
): boolean {
  const normalizedSlug = slug?.trim().toLowerCase() ?? "";
  const normalizedName = name?.trim().toLowerCase() ?? "";

  if (
    AWARDS_RECOGNITION_CATEGORY_SLUGS.some(
      (candidate) => candidate === normalizedSlug
    )
  ) {
    return true;
  }

  return (
    normalizedName.includes("award") && normalizedName.includes("recognition")
  );
}

/** Hide awards posts from /blogs and /voice-of-change listings and category tabs. */
export function shouldExcludeFromBlogListings(
  categorySlug?: string | null,
  categoryName?: string | null
): boolean {
  return isAwardsRecognitionCategory(categorySlug, categoryName);
}
