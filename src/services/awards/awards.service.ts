import { cache } from "react";
import { fetchWPPage, resolveMediaId } from "@/lib/wordpress";
import { parseAwardsPage } from "@/lib/parsers/awards/awards.parser";
import {
  awardCardFromBlogPost,
  fetchAwardsRecognitionBlogPosts,
  mergeAchievementCards,
} from "@/lib/awards/awardsRecognitionPosts";
import { PAGE_SLUGS } from "@/constants/wp.constants";
import { AWARDS_FALLBACK } from "@/data/awards/awards.fallback";
import type { AwardsPageData, AwardsPageScf } from "@/types/awards/awards.types";

function hasUsableScf(scf: AwardsPageScf | undefined | null): scf is AwardsPageScf {
  if (!scf || typeof scf !== "object" || Array.isArray(scf)) return false;
  return Object.keys(scf).length > 0;
}

async function resolveAwardCardImages(
  cards: AwardsPageData["recognition"]["cards"]
): Promise<void> {
  await Promise.all(
    cards.map(async (card) => {
      if (typeof card.img === "string") {
        card.img = await resolveMediaId(card.img);
      } else if (card.img?.url) {
        card.img.url = await resolveMediaId(card.img.url);
      }
    })
  );
}

export const getAwardsPageData = cache(async (): Promise<AwardsPageData> => {
  const [response, awardsPosts] = await Promise.all([
    fetchWPPage<AwardsPageScf>(PAGE_SLUGS.AWARD_RECOGNITION),
    fetchAwardsRecognitionBlogPosts(),
  ]);

  const postCards = awardsPosts.map(awardCardFromBlogPost);

  if (!response.data) {
    console.warn(
      `[getAwardsPageData] Falling back to static content — ${response.error}`
    );
    const fallback = {
      ...AWARDS_FALLBACK,
      recognition: {
        ...AWARDS_FALLBACK.recognition,
        cards: postCards.length > 0
          ? mergeAchievementCards(AWARDS_FALLBACK.recognition.cards, postCards)
          : AWARDS_FALLBACK.recognition.cards,
      },
    };
    await resolveAwardCardImages(fallback.recognition.cards);
    return fallback;
  }

  const rawScf = response.data.scf ?? response.data.acf;
  if (!hasUsableScf(rawScf)) {
    console.warn(
      `[getAwardsPageData] Empty SCF for slug "${PAGE_SLUGS.AWARD_RECOGNITION}" — using static fallback with live award posts.`
    );
    const fallback = {
      ...AWARDS_FALLBACK,
      recognition: {
        ...AWARDS_FALLBACK.recognition,
        cards: postCards.length > 0
          ? mergeAchievementCards(AWARDS_FALLBACK.recognition.cards, postCards)
          : AWARDS_FALLBACK.recognition.cards,
      },
    };
    await resolveAwardCardImages(fallback.recognition.cards);
    return fallback;
  }

  const data = parseAwardsPage(rawScf);

  if (postCards.length > 0) {
    data.recognition = {
      ...data.recognition,
      cards: mergeAchievementCards(data.recognition.cards, postCards),
    };
  }

  data.hero.img = await resolveMediaId(data.hero.img);
  await resolveAwardCardImages(data.recognition.cards);
  await resolveAwardCardImages(data.ourAchievements.cards);

  return data;
});
