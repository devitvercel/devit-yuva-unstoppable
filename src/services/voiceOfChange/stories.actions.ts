"use server";

import { getVocStories, type VocStoriesPage } from "./stories.service";

/**
 * Server Action: fetch a page of stories for the voice-of-change grid.
 * Runs on the server (no client-side WP fetch, no useEffect data loading) and
 * is called by the client island for infinite scroll + category filtering.
 */
export async function loadVocStories(
  page: number,
  categoryId: number | null
): Promise<VocStoriesPage> {
  return getVocStories(page, categoryId ?? undefined);
}
