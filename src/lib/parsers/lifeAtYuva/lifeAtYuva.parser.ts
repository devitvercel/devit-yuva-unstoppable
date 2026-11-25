import type {
  LifeAtYuvaPageScf,
  LifeAtYuvaPageData,
  LifeAtYuvaHeroSectionScf,
  LifeAtYuvaHeroSectionType,
  LifeAtYuvaTheYuvaWaySectionScf,
  LifeAtYuvaTheYuvaWaySectionType,
  LifeAtYuvaTeamNumbersSectionScf,
  LifeAtYuvaBeginningSectionScf,
  LifeAtYuvaBannerSectionScf,
  LifeAtYuvaBannerSectionType,
  LifeAtYuvaWhoWeAreSectionScf,
  LifeAtYuvaWhoWeAreSectionType,
  LifeAtYuvaLifeMomentsSectionScf,
  LifeAtYuvaMomentsSectionType,
  LifeAtYuvaStandWithUsSectionScf,
  LifeAtYuvaStandWithUsSectionType,
  LifeAtYuvaMomentType,
} from "@/types/lifeAtYuva/lifeAtYuva.types";
import type { CareersThePeopleWhoWorkHereSectionType } from "@/types/careers/careers.types";
import type { OurStoryContentBlockType } from "@/types/ourStory/ourStory.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/lifeAtYuva/hero.data";
import { theYuvaWayDataFallback } from "@/data/lifeAtYuva/theYuvaWay.data";
import { teamNumbersDataFallback } from "@/data/lifeAtYuva/teamNumbers.data";
import { beginningDataFallback } from "@/data/lifeAtYuva/beginning.data";
import { bannerDataFallback } from "@/data/lifeAtYuva/banner.data";
import { whoWeAreDataFallback } from "@/data/lifeAtYuva/whoWeAre.data";
import { lifeMomentsDataFallback } from "@/data/lifeAtYuva/lifeMoments.data";
import { standWithUsDataFallback } from "@/data/lifeAtYuva/standWithUs.data";
import { largeBannerDataFallback } from "@/data/lifeAtYuva/largeBanner.data";

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

function parseHero(group: LifeAtYuvaHeroSectionScf | undefined): LifeAtYuvaHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      heroDataFallback.highlightedTitle
    ),
    title: parseText(group?.title, heroDataFallback.title),
    body: parseText(group?.body, heroDataFallback.body),
    img: toMedia(group?.img, heroDataFallback.img),
  };
}

function parseTheYuvaWay(
  group: LifeAtYuvaTheYuvaWaySectionScf | undefined
): LifeAtYuvaTheYuvaWaySectionType {
  const pillars = parseRepeater(group?.pillars)
    .map((row: any, index: number) => {
      const fallbackPillar =
        theYuvaWayDataFallback.pillars[index] ?? theYuvaWayDataFallback.pillars[0];
      return {
        number: parseText(row?.number, fallbackPillar.number),
        title: parseText(row?.title, fallbackPillar.title),
        body: parseText(row?.body, fallbackPillar.body),
      };
    })
    .filter((pillar) => pillar.title || pillar.body);

  return {
    eyebrow: parseText(group?.eyebrow, theYuvaWayDataFallback.eyebrow),
    label: parseText(group?.label, theYuvaWayDataFallback.label),
    pillars: pillars.length > 0 ? pillars : theYuvaWayDataFallback.pillars,
  };
}

function parseTeamNumbers(
  group: LifeAtYuvaTeamNumbersSectionScf | undefined
): CareersThePeopleWhoWorkHereSectionType {
  const stats = parseRepeater(group?.stats).map((row: any, index: number) => {
    const fallbackItem =
      teamNumbersDataFallback.stats[index] ?? teamNumbersDataFallback.stats[0];
    return {
      number: parseText(row?.number, fallbackItem.number),
      title: parseText(row?.title, fallbackItem.title),
      body: parseText(row?.body, fallbackItem.body),
    };
  });

  return {
    heading: parseText(group?.heading, teamNumbersDataFallback.heading),
    title: parseText(group?.title, teamNumbersDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      teamNumbersDataFallback.highlightedTitle
    ),
    stats: stats.length > 0 ? stats : teamNumbersDataFallback.stats,
  };
}

function parseBeginning(
  group: LifeAtYuvaBeginningSectionScf | undefined
): OurStoryContentBlockType {
  const rawBody = parseText(group?.body, "");
  const paragraphs =
    rawBody.length > 0
      ? rawBody.split("\n\n").map((p) => p.trim()).filter(Boolean)
      : beginningDataFallback.paragraphs;

  return {
    eyebrow: parseText(group?.eyebrow, beginningDataFallback.eyebrow),
    title: parseText(group?.title, beginningDataFallback.title),
    paragraphs,
    badge: {
      label: parseText(
        group?.badge_label ?? group?.badgeLabel,
        beginningDataFallback.badge.label
      ),
      detail: parseText(
        group?.badge_detail ?? group?.badgeDetail,
        beginningDataFallback.badge.detail
      ),
    },
    img: toMedia(group?.img, beginningDataFallback.img),
  };
}

function parseBanner(
  group: LifeAtYuvaBannerSectionScf | undefined
): LifeAtYuvaBannerSectionType {
  return {
    img: toMedia(group?.img, bannerDataFallback.img),
  };
}

function parseWhoWeAre(
  group: LifeAtYuvaWhoWeAreSectionScf | undefined
): LifeAtYuvaWhoWeAreSectionType {
  const pillars = parseRepeater(group?.pillars)
    .map((row: any, index: number) => {
      const fallbackPillar =
        whoWeAreDataFallback.pillars[index] ?? whoWeAreDataFallback.pillars[0];
      return {
        number: parseText(row?.number, fallbackPillar.number),
        title: parseText(row?.title, fallbackPillar.title),
        body: parseText(row?.body, fallbackPillar.body),
      };
    })
    .filter((pillar) => pillar.title || pillar.body);

  return {
    label: parseText(group?.label, whoWeAreDataFallback.label),
    pillars: pillars.length > 0 ? pillars : whoWeAreDataFallback.pillars,
  };
}

function parseLifeMoments(
  group: LifeAtYuvaLifeMomentsSectionScf | undefined
): LifeAtYuvaMomentsSectionType {
  const moments = parseRepeater(group?.moments)
    .map((row: any, index: number) => {
      const fallbackMoment =
        lifeMomentsDataFallback.moments[index] ?? lifeMomentsDataFallback.moments[0];
      const layoutRaw = parseText(row?.layout);
      const layout: LifeAtYuvaMomentType["layout"] =
        layoutRaw === "featured" || layoutRaw === "small"
          ? layoutRaw
          : index === 0
            ? "featured"
            : "small";

      return {
        label: parseText(row?.label, fallbackMoment.label),
        layout,
        img: toMedia(row?.img, fallbackMoment.img),
      };
    })
    .filter((moment) => moment.label || moment.img.src);

  return {
    heading: parseText(group?.heading, lifeMomentsDataFallback.heading),
    title: parseText(group?.title, lifeMomentsDataFallback.title),
    highlightedTitle: parseText(
      group?.highlighted_title ?? group?.highlightedTitle,
      lifeMomentsDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, lifeMomentsDataFallback.body),
    moments: moments.length > 0 ? moments : lifeMomentsDataFallback.moments,
  };
}

function parseStandWithUs(
  group: LifeAtYuvaStandWithUsSectionScf | undefined
): LifeAtYuvaStandWithUsSectionType {
  const featured = parseRepeater(group?.featured)
    .map((row: any, index: number) => {
      const fallbackMember =
        standWithUsDataFallback.featured[index] ?? standWithUsDataFallback.featured[0];
      const linkedinHref =
        parseText(row?.linkedin_href ?? row?.linkedinHref) || fallbackMember.linkedinHref;
      const readMoreHref =
        parseText(row?.read_more_href ?? row?.readMoreHref) || fallbackMember.readMoreHref;

      return {
        name: parseText(row?.name, fallbackMember.name),
        role: parseText(row?.role, fallbackMember.role),
        bio: parseText(row?.bio, fallbackMember.bio),
        img: toMedia(row?.img, fallbackMember.img),
        ...(linkedinHref ? { linkedinHref } : {}),
        ...(readMoreHref ? { readMoreHref } : {}),
      };
    })
    .filter((member) => member.name || member.bio);

  const members = parseRepeater(group?.members)
    .map((row: any, index: number) => {
      const fallbackMember =
        standWithUsDataFallback.members[index] ?? standWithUsDataFallback.members[0];
      return {
        name: parseText(row?.name, fallbackMember?.name ?? ""),
        role: parseText(row?.role, fallbackMember?.role ?? ""),
        since: parseText(row?.since, fallbackMember?.since ?? ""),
        img: toMedia(row?.img, fallbackMember?.img ?? EMPTY_MEDIA),
      };
    })
    .filter((member) => member.name || member.role);

  return {
    heading: parseText(group?.heading, standWithUsDataFallback.heading),
    title: parseText(group?.title, standWithUsDataFallback.title),
    featured: featured.length > 0 ? featured : standWithUsDataFallback.featured,
    members: members.length > 0 ? members : standWithUsDataFallback.members,
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

export function parseLifeAtYuvaPage(scf: LifeAtYuvaPageScf | undefined): LifeAtYuvaPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    theYuvaWay: parseTheYuvaWay(scf?.the_yuva_way_section ?? scf?.theYuvaWaySection),
    teamNumbers: parseTeamNumbers(scf?.team_numbers_section ?? scf?.teamNumbersSection),
    beginning: parseBeginning(scf?.beginning_section ?? scf?.beginningSection),
    banner: parseBanner(scf?.banner_section ?? scf?.bannerSection),
    whoWeAre: parseWhoWeAre(scf?.who_we_are_section ?? scf?.whoWeAreSection),
    lifeMoments: parseLifeMoments(scf?.life_moments_section ?? scf?.lifeMomentsSection),
    standWithUs: parseStandWithUs(scf?.stand_with_us_section ?? scf?.standWithUsSection),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
