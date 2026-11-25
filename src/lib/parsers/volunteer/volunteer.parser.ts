import type {
  VolunteerPageScf,
  VolunteerHeroSectionScf,
  VolunteerHeroSectionType,
  VolunteerPageData,
  HowYouCanHelpSectionScf,
  HowYouCanHelpSectionType,
  HowYouCanHelpCardScf,
  YourJourneySectionScf,
  YourJourneySectionType,
  VolunteerStepScf,
  VolunteerApplicationSectionScf,
  VolunteerApplicationSectionType,
} from "@/types/volunteer/volunteer.types";
import type { StatsSectionScf, StatsSectionType, LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import { volunteerLargeBannerDataFallback } from "@/data/volunteer/volunteerLargeBanner.data";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/volunteer/hero.data";
import { statsDataFallback } from "@/data/volunteer/stats.data";
import { howYouCanHelpDataFallback } from "@/data/volunteer/howYouCanHelp.data";
import { yourJourneyDataFallback } from "@/data/volunteer/yourJourney.data";
import { volunteerApplicationDataFallback } from "@/data/volunteer/volunteerApplication.data";


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

function parseHero(group: VolunteerHeroSectionScf | undefined): VolunteerHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title1: parseText(group?.title1, heroDataFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    title2: parseText(group?.title2, heroDataFallback.title2),
    body1: parseText(group?.body1, heroDataFallback.body1),
    highlightedBody: parseText(
      group?.highlighted_body ?? group?.highlightedBody,
      heroDataFallback.highlightedBody
    ),
    body2: parseText(group?.body2, heroDataFallback.body2),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      heroDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      heroDataFallback.cta2
    ),
    img: toMedia(group?.img, heroDataFallback.img),
    badge: {
      title: parseText(group?.badge_title ?? group?.badgeTitle, heroDataFallback.badge.title),
      body: parseText(group?.badge_body ?? group?.badgeBody, heroDataFallback.badge.body),
    },
  };
}

function parseStats(group: StatsSectionScf | undefined): StatsSectionType {
  const fallbackRows = statsDataFallback.rows ?? [];

  const rows = parseRepeater(group?.rows)
    .map((row: any, rowIndex: number) => {
      const fallbackRow = fallbackRows[rowIndex] ?? fallbackRows[0];
      const stats = parseRepeater(row?.stats)
        .map((stat: any, index: number) => {
          const fallbackStat = fallbackRow?.stats?.[index];
          return {
            number: parseText(stat?.number, fallbackStat?.number ?? ""),
            title: parseText(stat?.title, fallbackStat?.title ?? ""),
          };
        })
        .filter((stat) => stat.number || stat.title);

      return {
        heading: parseText(row?.heading, fallbackRow?.heading ?? ""),
        stats: stats.length > 0 ? stats : (fallbackRow?.stats ?? []),
      };
    })
    .filter((row) => row.stats.length > 0);

  const legacyStats = parseRepeater(group?.stats)
    .map((row: any) => ({
      number: parseText(row?.number),
      title: parseText(row?.title),
    }))
    .filter((stat) => stat.number || stat.title);

  return {
    heading: parseText(group?.heading, statsDataFallback.heading),
    rows: rows.length > 0 ? rows : fallbackRows,
    stats: legacyStats.length > 0 ? legacyStats : undefined,
  };
}

function parseHowYouCanHelp(
  group: HowYouCanHelpSectionScf | undefined
): HowYouCanHelpSectionType {
  const cards = parseRepeater<HowYouCanHelpCardScf>(group?.cards).map((row, index) => {
    const fallbackCard =
      howYouCanHelpDataFallback.cards[index] ??
      howYouCanHelpDataFallback.cards[0];

    const points = parseRepeater<any>(row?.points)
      .map((p) => parseText(typeof p === "string" ? p : p?.point))
      .filter(Boolean);

    return {
      img: toMedia(row?.img, fallbackCard.img),
      id: parseText(row?.id, fallbackCard.id),
      title: parseText(row?.title, fallbackCard.title),
      body: parseText(row?.body, fallbackCard.body),
      points: points.length > 0 ? points : fallbackCard.points,
      commitment: parseText(row?.commitment, fallbackCard.commitment),
    };
  });

  return {
    heading: parseText(group?.heading, howYouCanHelpDataFallback.heading),
    title1: parseText(group?.title1, howYouCanHelpDataFallback.title1),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      howYouCanHelpDataFallback.highlightedTitle
    ),
    title2: parseText(group?.title2, howYouCanHelpDataFallback.title2),
    body: parseText(group?.body, howYouCanHelpDataFallback.body),
    cards: cards.length > 0 ? cards : howYouCanHelpDataFallback.cards,
  };
}

function parseYourJourney(
  group: YourJourneySectionScf | undefined
): YourJourneySectionType {
  const steps = parseRepeater<VolunteerStepScf>(group?.steps).map((row, index) => {
    const fallbackStep =
      yourJourneyDataFallback.steps[index] ??
      yourJourneyDataFallback.steps[0];

    return {
      title: parseText(row?.title, fallbackStep.title),
      body: parseText(row?.body, fallbackStep.body),
    };
  });

  return {
    heading: parseText(group?.heading, yourJourneyDataFallback.heading),
    title: parseText(group?.title, yourJourneyDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      yourJourneyDataFallback.highlightedTitle
    ),
    steps: steps.length > 0 ? steps : yourJourneyDataFallback.steps,
  };
}

function parseVolunteerApplication(
  group: VolunteerApplicationSectionScf | undefined
): VolunteerApplicationSectionType {
  const points = parseRepeater<any>(group?.points)
    .map((p) => parseText(typeof p === "string" ? p : p?.point))
    .filter(Boolean);

  return {
    heading: parseText(group?.heading, volunteerApplicationDataFallback.heading),
    title: parseText(group?.title, volunteerApplicationDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      volunteerApplicationDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, volunteerApplicationDataFallback.body),
    quote: {
      quote: parseText(group?.quote?.quote, volunteerApplicationDataFallback.quote.quote),
      role: parseText(group?.quote?.role, volunteerApplicationDataFallback.quote.role),
      service: parseText(group?.quote?.service, volunteerApplicationDataFallback.quote.service),
    },
    points: points.length > 0 ? points : volunteerApplicationDataFallback.points,
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
  return {
    eyebrow: parseText(group?.eyebrow, volunteerLargeBannerDataFallback.eyebrow),
    title: parseText(group?.title, volunteerLargeBannerDataFallback.title),
    body: parseText(group?.body, volunteerLargeBannerDataFallback.body),
    cta1: parseCta(
      group?.cta1_text ?? group?.cta1Text,
      group?.cta1_link ?? group?.cta1Link,
      volunteerLargeBannerDataFallback.cta1
    ),
    cta2: parseCta(
      group?.cta2_text ?? group?.cta2Text,
      group?.cta2_link ?? group?.cta2Link,
      volunteerLargeBannerDataFallback.cta2
    ),
  };
}

export function parseVolunteerPage(scf: VolunteerPageScf | undefined): VolunteerPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    stats: parseStats(scf?.stats_section ?? scf?.statsSection),
    howYouCanHelp: parseHowYouCanHelp(
      scf?.how_you_can_help_section ?? scf?.howYouCanHelpSection
    ),
    yourJourney: parseYourJourney(
      scf?.your_journey_section ?? scf?.yourJourneySection
    ),
    volunteerApplication: parseVolunteerApplication(
      scf?.volunteer_application_section ?? scf?.volunteerApplicationSection
    ),
    volunteerLargeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
