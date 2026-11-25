import type {
  AwardsPageScf,
  AwardsPageData,
  AwardsHeroSectionScf,
  AwardsHeroSectionType,
  AwardsRecognitionSectionScf,
  AwardsRecognitionSectionType,
  AwardsOurAchievementsSectionScf,
  AwardsOurAchievementsSectionType,
  AwardCardType,
  AwardCardScf,
} from "@/types/awards/awards.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import type { WPMedia } from "@/types/wordpress.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { HeroSectionData } from "@/data/awards/heroSection";
import { RecognitionSectionData } from "@/data/awards/recognitionSection";
import { OurAchievementsSectionData } from "@/data/awards/ourAchievementsSection";
import { largeBannerDataFallback } from "@/data/awards/largeBanner.data";

function toImgSrc(
  src: WPMedia | string | false | null | undefined,
  fallback: string
): string {
  if (typeof src === "string") {
    return src.length > 0 ? src : fallback;
  }
  const url = src ? src.url || "" : "";
  return url.length > 0 ? url : fallback;
}

function parseYear(value: string | number | undefined, fallback: number): number {
  if (typeof value === "number" && !Number.isNaN(value)) return value;
  if (typeof value === "string" && value.trim().length > 0) {
    const parsed = parseInt(value.replace(/,/g, ""), 10);
    if (!Number.isNaN(parsed)) return parsed;
  }
  return fallback;
}

function parseAwardCard(
  row: AwardCardScf,
  index: number,
  fallbackCards: AwardCardType[]
): AwardCardType {
  const fallback = fallbackCards[index] ?? fallbackCards[0];
  const fallbackImg =
    typeof fallback.img === "string" ? fallback.img : fallback.img.url;

  return {
    year: parseYear(row?.year, fallback.year),
    title: parseText(row?.title, fallback.title),
    body: parseText(row?.body, fallback.body),
    img: toImgSrc(row?.img, fallbackImg),
  };
}

function parseHero(group: AwardsHeroSectionScf | undefined): AwardsHeroSectionType {
  return {
    img: toImgSrc(group?.img, HeroSectionData.img),
    title: parseText(group?.title, HeroSectionData.title),
    subTitle: parseText(group?.sub_title ?? group?.subTitle, HeroSectionData.subTitle),
    body: parseText(group?.body, HeroSectionData.body),
  };
}

function parseRecognitionSection(
  group: AwardsRecognitionSectionScf | undefined
): AwardsRecognitionSectionType {
  const cards = parseRepeater(group?.cards)
    .map((row: AwardCardScf, index: number) =>
      parseAwardCard(row, index, RecognitionSectionData.cards)
    )
    .filter((card) => card.title || card.body);

  return {
    title: parseText(group?.title, RecognitionSectionData.title),
    subTitle: parseText(
      group?.sub_title ?? group?.subTitle,
      RecognitionSectionData.subTitle
    ),
    cards: cards.length > 0 ? cards : RecognitionSectionData.cards,
  };
}

function parseOurAchievementsSection(
  group: AwardsOurAchievementsSectionScf | undefined
): AwardsOurAchievementsSectionType {
  const cards = parseRepeater(group?.cards)
    .map((row: AwardCardScf, index: number) =>
      parseAwardCard(row, index, OurAchievementsSectionData.cards)
    )
    .filter((card) => card.title || card.body);

  return {
    title: parseText(group?.title, OurAchievementsSectionData.title),
    subTitle: parseText(
      group?.sub_title ?? group?.subTitle,
      OurAchievementsSectionData.subTitle
    ),
    cards: cards.length > 0 ? cards : OurAchievementsSectionData.cards,
  };
}

function parseLargeBanner(
  group: LargeBannerSectionScf | undefined
): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, largeBannerDataFallback.eyebrow),
    title: parseText(group?.title, largeBannerDataFallback.title),
    body: parseText(group?.body, largeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      largeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      largeBannerDataFallback.cta2
    ),
  };
}

export function parseAwardsPage(scf: AwardsPageScf | undefined): AwardsPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    recognition: parseRecognitionSection(
      scf?.recognition_section ?? scf?.recognitionSection
    ),
    ourAchievements: parseOurAchievementsSection(
      scf?.our_achievements_section ?? scf?.ourAchievementsSection
    ),
    largeBanner: parseLargeBanner(
      scf?.large_banner_section ?? scf?.largeBannerSection
    ),
  };
}
