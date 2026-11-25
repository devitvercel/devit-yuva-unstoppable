import type {
  OurPeoplePageScf,
  OurPeopleHeroSectionScf,
  OurPeopleHeroSectionType,
  OurPeopleLeaderScf,
  OurPeopleLeadershipSectionScf,
  OurPeopleLeaderType,
  OurPeopleLeadershipSectionType,
  OurPeopleTeamCardScf,
  OurPeopleTeamSectionScf,
  OurPeopleTeamCardType,
  OurPeopleTeamSectionType,
  OurPeopleAdvisorCardScf,
  OurPeopleAdvisorSectionScf,
  OurPeopleAdvisorCardType,
  OurPeopleAdvisorSectionType,
  OurPeoplePageData,
} from "@/types/ourPeople/ourPeople.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import { parseText, parseRepeater, parseCta } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/ourPeople/hero.data";
import { leadershipDataFallback } from "@/data/ourPeople/leadership.data";
import { ourTeamDataFallback } from "@/data/ourPeople/ourTeam.data";
import { advisorBoardDataFallback } from "@/data/ourPeople/advisorBoard.data";
import { LargeBannerDataFallback } from "@/data/ourPeople/largeBanner.data";
import { PERSON_IMAGE_PLACEHOLDER } from "@/constants/personPlaceholder.constants";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

function toMedia(
  src: WPMedia | string | false | null | undefined,
  fallback: MediaAsset = EMPTY_MEDIA
): MediaAsset {
  if (typeof src === "string") {
    return src.length > 0 ? { src, alt: fallback.alt } : fallback;
  }
  const url = src ? src.url || "" : "";
  if (url.length === 0) return fallback;
  return { src: url, alt: (src && src.alt) || fallback.alt };
}

/** Person photo — never borrow another card's image when missing. */
function toPersonMedia(
  src: WPMedia | string | false | null | undefined,
  name?: string
): MediaAsset {
  const alt = name?.trim() ? `${name} photo` : "Profile photo";
  const parsed = toMedia(src, { src: PERSON_IMAGE_PLACEHOLDER, alt });
  if (!parsed.src || parsed.src === PERSON_IMAGE_PLACEHOLDER) {
    return { src: PERSON_IMAGE_PLACEHOLDER, alt };
  }
  return { src: parsed.src, alt: parsed.alt || alt };
}

function parseHero(group: OurPeopleHeroSectionScf | undefined): OurPeopleHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title: parseText(group?.title, heroDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, heroDataFallback.body),
    img: toMedia(group?.img, heroDataFallback.img),
  };
}

function parseLeaders(value: unknown, fallback: OurPeopleLeaderType[]): OurPeopleLeaderType[] {
  const items = parseRepeater(value as any[]);
  const parsed = items
    .map((row: any, index: number) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      return {
        role: parseText(row?.role, fallbackItem?.role),
        name: parseText(row?.name, fallbackItem?.name),
        quote: parseText(row?.quote, fallbackItem?.quote),
        body: parseText(row?.body, fallbackItem?.body),
        cta: parseCta(row?.cta_text ?? row?.ctaText, row?.href, fallbackItem?.cta),
        img: toPersonMedia(row?.img, parseText(row?.name, fallbackItem?.name)),
        badge: parseText(row?.badge, fallbackItem?.badge),
      };
    })
    .filter((l) => l.name || l.role);

  return parsed.length > 0 ? parsed : fallback;
}

function parseLeadershipSection(group: OurPeopleLeadershipSectionScf | undefined): OurPeopleLeadershipSectionType {
  return {
    leaders: parseLeaders(group?.leaders, leadershipDataFallback.leaders),
  };
}

function parseLinkedinHref(row: {
  linkedin_href?: string;
  linkedinHref?: string;
}): string | undefined {
  const href = parseText(row?.linkedin_href ?? row?.linkedinHref);
  return href || undefined;
}

function parseTeamCards(value: unknown, fallback: OurPeopleTeamCardType[]): OurPeopleTeamCardType[] {
  const items = parseRepeater(value as any[]);
  const parsed = items
    .map((row: any, index: number) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      const linkedinHref = parseLinkedinHref(row) ?? fallbackItem?.linkedinHref;
      return {
        img: toPersonMedia(row?.img, parseText(row?.name, fallbackItem?.name)),
        name: parseText(row?.name, fallbackItem?.name),
        role: parseText(row?.role, fallbackItem?.role),
        since: parseText(row?.since, fallbackItem?.since),
        description: parseText(row?.description ?? row?.body, fallbackItem?.description),
        ...(linkedinHref ? { linkedinHref } : {}),
      };
    })
    .filter((t) => t.name || t.role);

  return parsed.length > 0 ? parsed : fallback;
}

function parseTeamSection(group: OurPeopleTeamSectionScf | undefined): OurPeopleTeamSectionType {
  return {
    heading: parseText(group?.heading, ourTeamDataFallback.heading),
    title: parseText(group?.title, ourTeamDataFallback.title),
    cards: parseTeamCards(group?.cards, ourTeamDataFallback.cards),
  };
}

function parseAdvisorCards(value: unknown, fallback: OurPeopleAdvisorCardType[]): OurPeopleAdvisorCardType[] {
  const items = parseRepeater(value as any[]);
  const parsed = items
    .map((row: any, index: number) => {
      const fallbackItem = fallback[index] ?? fallback[0];
      const linkedinHref = parseLinkedinHref(row) ?? fallbackItem?.linkedinHref;
      return {
        img: toPersonMedia(row?.img, parseText(row?.name, fallbackItem?.name)),
        name: parseText(row?.name, fallbackItem?.name),
        role: parseText(row?.role, fallbackItem?.role),
        description: parseText(row?.description ?? row?.body, fallbackItem?.description),
        ...(linkedinHref ? { linkedinHref } : {}),
      };
    })
    .filter((t) => t.name || t.role);

  return parsed.length > 0 ? parsed : fallback;
}

function parseAdvisorSection(group: OurPeopleAdvisorSectionScf | undefined): OurPeopleAdvisorSectionType {
  return {
    heading: parseText(group?.heading, advisorBoardDataFallback.heading),
    title: parseText(group?.title, advisorBoardDataFallback.title),
    advisors: parseAdvisorCards(group?.advisors, advisorBoardDataFallback.advisors),
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, LargeBannerDataFallback.eyebrow),
    title: parseText(group?.title, LargeBannerDataFallback.title),
    body: parseText(group?.body, LargeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      LargeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      LargeBannerDataFallback.cta2
    ),
  };
}

export function parseOurPeoplePage(scf: OurPeoplePageScf | undefined): OurPeoplePageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    leadership: parseLeadershipSection(scf?.leadership_section ?? scf?.leadershipSection),
    ourTeam: parseTeamSection(scf?.our_team_section ?? scf?.ourTeamSection),
    advisorBoard: parseAdvisorSection(scf?.advisor_board_section ?? scf?.advisorBoardSection),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
