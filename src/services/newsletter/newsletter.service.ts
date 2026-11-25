import { subscribeToNewsletter } from "@/lib/wordpress";
import type { WPApiResponse } from "@/types/wordpress.types";
import type { NewsletterResponse } from "@/types/newsletter/newsletter.types";

/**
 * Service wrapper around the newsletter subscription helper. Keeps the same
 * never-throw envelope contract so callers (the API route) branch on `error`.
 */
export const submitNewsletterSubscription = async (
  email: string
): Promise<WPApiResponse<NewsletterResponse>> => {
  try {
    return await subscribeToNewsletter(email);
  } catch (err) {
    console.error("[submitNewsletterSubscription] Unexpected error", err);
    return {
      data: null,
      error: err instanceof Error ? err.message : "Unknown error",
      status: 500,
    };
  }
};
