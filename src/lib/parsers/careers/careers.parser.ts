import type {
  CareersPageScf,
  CareersCategoryScf,
  CareersJobScf,
  CareersHeroSectionScf,
  CareersHeroSectionType,
  CareersPageData,
  CareersThePeopleWhoWorkHereSectionScf,
  CareersThePeopleWhoWorkHereSectionType,
  CareersWhyYuvaSectionScf,
  CareersWhyYuvaSectionType,
  CareersOurValuesSectionScf,
  CareersOurValuesSectionType,
  CareersWhatYouGetSectionScf,
  CareersWhatYouGetSectionType,
  CareersOpenRolesSectionScf,
  CareersOpenRolesSectionType,
  CareersOpenRoleType,
} from "@/types/careers/careers.types";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";
import type { LargeBannerSectionScf, LargeBannerSectionType } from "@/types/home/home.types";
import { parseText, parseCta, parseRepeater } from "@/lib/parsers/acf.parser";
import { heroDataFallback } from "@/data/careers/hero.data";
import { thePeopleWhoWorkHereDataFallback } from "@/data/careers/thePeopleWhoWorkHere.data";
import { whyYuvaDataFallback } from "@/data/careers/whyYuva.data";
import { ourValuesDataFallback } from "@/data/careers/ourValues.data";
import { whatYouGetDataFallback } from "@/data/careers/whatYouGet.data";
import { openRolesDataFallback } from "@/data/careers/openRoles.data";
import { largeBannerDataFallback } from "@/data/careers/largeBanner.data";
import {
  BadgeIcon18,
  BookIcon18,
  BriefcaseIcon18,
  ClockIcon18,
  HeartIcon18,
  HomeIcon18,
  ShieldIcon18,
  UsersIcon18
} from "../../../../public/SVGs/svg";

const EMPTY_MEDIA: MediaAsset = { src: "", alt: "media" };

const ICON_MAP: Record<string, React.ComponentType<{ className?: string; stroke?: string; fill?: string }>> = {
  heart: HeartIcon18,
  clock: ClockIcon18,
  book: BookIcon18,
  users: UsersIcon18,
  briefcase: BriefcaseIcon18,
  home: HomeIcon18,
  shield: ShieldIcon18,
  badge: BadgeIcon18,
};

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

function parseHero(group: CareersHeroSectionScf | undefined): CareersHeroSectionType {
  return {
    heading: parseText(group?.heading, heroDataFallback.heading),
    title: parseText(group?.title, heroDataFallback.title),
    body: parseText(group?.body, heroDataFallback.body),
    img: toMedia(group?.img ?? group?.bg_img ?? group?.bgImg, heroDataFallback.img),
  };
}

function parseThePeopleWhoWorkHere(
  group: CareersThePeopleWhoWorkHereSectionScf | undefined
): CareersThePeopleWhoWorkHereSectionType {
  const stats = parseRepeater(group?.stats).map((row, index) => {
    const fallbackItem =
      thePeopleWhoWorkHereDataFallback.stats[index] ??
      thePeopleWhoWorkHereDataFallback.stats[0];
    return {
      number: parseText(row?.number, fallbackItem.number),
      title: parseText(row?.title, fallbackItem.title),
      body: parseText(row?.body, fallbackItem.body),
    };
  });

  return {
    heading: parseText(group?.heading, thePeopleWhoWorkHereDataFallback.heading),
    title: parseText(group?.title, thePeopleWhoWorkHereDataFallback.title),
    highlightedTitle: parseText(
      group?.highlightedTitle ?? group?.highlighted_title,
      thePeopleWhoWorkHereDataFallback.highlightedTitle
    ),
    stats: stats.length > 0 ? stats : thePeopleWhoWorkHereDataFallback.stats,
  };
}

function parseWhyYuva(group: CareersWhyYuvaSectionScf | undefined): CareersWhyYuvaSectionType {
  return {
    heading: parseText(group?.heading, whyYuvaDataFallback.heading),
    title: parseText(group?.title, whyYuvaDataFallback.title),
    highlightedTitle: parseText(
      group?.highlightedTitle ?? group?.highlighted_title,
      whyYuvaDataFallback.highlightedTitle
    ),
    body1: parseText(group?.body1, whyYuvaDataFallback.body1),
    highlightedBody: parseText(
      group?.highlightedBody ?? group?.highlighted_body,
      whyYuvaDataFallback.highlightedBody
    ),
    body2: parseText(group?.body2, whyYuvaDataFallback.body2),
    img: toMedia(group?.img ?? group?.bg_img ?? group?.bgImg, whyYuvaDataFallback.img),
    imgText: parseText(group?.imgText ?? group?.img_text, whyYuvaDataFallback.imgText),
  };
}

function parseOurValues(group: CareersOurValuesSectionScf | undefined): CareersOurValuesSectionType {
  const values = parseRepeater(group?.values).map((row, index) => {
    const fallbackItem =
      ourValuesDataFallback.values[index] ??
      ourValuesDataFallback.values[0];
    return {
      title: parseText(row?.title, fallbackItem.title),
      body: parseText(row?.body, fallbackItem.body),
    };
  });

  return {
    heading: parseText(group?.heading, ourValuesDataFallback.heading),
    title: parseText(group?.title, ourValuesDataFallback.title),
    highlightedTitle: parseText(
      group?.highlightedTitle ?? group?.highlighted_title,
      ourValuesDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, ourValuesDataFallback.body),
    values: values.length > 0 ? values : ourValuesDataFallback.values,
  };
}

function parseWhatYouGet(group: CareersWhatYouGetSectionScf | undefined): CareersWhatYouGetSectionType {
  const cards = parseRepeater(group?.cards).map((row, index) => {
    const fallbackItem =
      whatYouGetDataFallback.cards[index] ??
      whatYouGetDataFallback.cards[0];
    const iconName = parseText(row?.icon).toLowerCase();
    const icon = ICON_MAP[iconName] ?? fallbackItem.icon;
    return {
      icon,
      title: parseText(row?.title, fallbackItem.title),
      body: parseText(row?.body, fallbackItem.body),
    };
  });

  return {
    heading: parseText(group?.heading, whatYouGetDataFallback.heading),
    title: parseText(group?.title, whatYouGetDataFallback.title),
    highlightedTitle: parseText(
      group?.highlightedTitle ?? group?.highlighted_title,
      whatYouGetDataFallback.highlightedTitle
    ),
    body: parseText(group?.body, whatYouGetDataFallback.body),
    cards: cards.length > 0 ? cards : whatYouGetDataFallback.cards,
  };
}

function parseOpenRoles(
  group: CareersOpenRolesSectionScf | undefined,
  topCategories?: CareersCategoryScf[],
  topJobs?: CareersJobScf[]
): CareersOpenRolesSectionType {
  const catMap = new Map<string, string>();
  if (Array.isArray(topCategories)) {
    topCategories.forEach((cat) => {
      if (cat.id !== undefined && cat.label) {
        catMap.set(String(cat.id), parseText(cat.label));
      }
    });
  }

  // 1. Parse departments / categories (excluding 'All Departments' since DepartmentFilters component renders it fixed)
  let departments: string[] = [];
  if (Array.isArray(topCategories) && topCategories.length > 0) {
    departments = topCategories
      .map((c) => (c.label ? parseText(c.label) : ""))
      .filter((label) => Boolean(label) && label.toLowerCase() !== "all departments");
  } else if (group?.departments) {
    departments = parseRepeater(group.departments)
      .map((row: any) => {
        if (typeof row === "string") return parseText(row);
        if (row && typeof row === "object") {
          return parseText(row.item ?? row.name ?? row.value ?? row.label ?? "");
        }
        return "";
      })
      .filter((label) => Boolean(label) && label.toLowerCase() !== "all departments");
  }

  if (departments.length === 0) {
    departments = openRolesDataFallback.departments;
  }

  // 2. Parse roles / jobs
  let roles: CareersOpenRoleType[] = [];

  if (Array.isArray(topJobs) && topJobs.length > 0) {
    roles = topJobs
      .filter((job) => job.active !== false && job.active !== "false" && job.active !== 0)
      .map((job, index) => {
        const fallbackItem =
          openRolesDataFallback.roles[index] ?? openRolesDataFallback.roles[0];

        const deptLabel =
          job.category_id !== undefined && catMap.has(String(job.category_id))
            ? catMap.get(String(job.category_id))!
            : fallbackItem.department;

        let parsedWhatYouWillDo: string[] = [];
        const rawWhat = job.job_details?.what_we_do;

        if (Array.isArray(rawWhat)) {
          parsedWhatYouWillDo = rawWhat
            .map((item: any) => {
              if (typeof item === "string") return parseText(item);
              if (item && typeof item === "object") {
                return parseText(item.point ?? item.item ?? item.text ?? "");
              }
              return "";
            })
            .filter(Boolean);
        } else if (typeof rawWhat === "string") {
          parsedWhatYouWillDo = parseText(rawWhat)
            .split("\n")
            .map((line) => line.trim())
            .filter(Boolean);
        }

        if (parsedWhatYouWillDo.length === 0) {
          parsedWhatYouWillDo = fallbackItem.whatYouWillDo;
        }

        return {
          title: parseText(job.title, fallbackItem.title),
          location: parseText(job.location, fallbackItem.location),
          type: parseText(job.job_type, fallbackItem.type),
          where: parseText(job.job_env, fallbackItem.where),
          department: deptLabel,
          aboutTheRole: parseText(job.job_details?.description, fallbackItem.aboutTheRole),
          whatYouWillDo: parsedWhatYouWillDo,
          ctaHref: parseText(
            job.job_details?.apply_link,
            fallbackItem.ctaHref || "mailto:careers@yuvaunstoppable.org"
          ),
        };
      });
  } else if (group?.roles) {
    roles = parseRepeater(group.roles).map((row, index) => {
      const fallbackItem =
        openRolesDataFallback.roles[index] ?? openRolesDataFallback.roles[0];

      let parsedWhatYouWillDo: string[] = [];
      if (Array.isArray(row?.whatYouWillDo)) {
        parsedWhatYouWillDo = row.whatYouWillDo.map((item: any) =>
          typeof item === "string" ? parseText(item) : parseText(item?.item ?? item?.text ?? item?.point ?? "")
        );
      } else if (Array.isArray(row?.what_you_will_do)) {
        parsedWhatYouWillDo = row.what_you_will_do.map((item: any) =>
          typeof item === "string" ? parseText(item) : parseText(item?.item ?? item?.text ?? item?.point ?? "")
        );
      } else if (typeof (row?.whatYouWillDo ?? row?.what_you_will_do) === "string") {
        const rawText = parseText(row?.whatYouWillDo ?? row?.what_you_will_do);
        parsedWhatYouWillDo = rawText.split("\n").map((line) => line.trim()).filter(Boolean);
      }

      if (parsedWhatYouWillDo.length === 0) {
        parsedWhatYouWillDo = fallbackItem.whatYouWillDo;
      }

      return {
        title: parseText(row?.title, fallbackItem.title),
        location: parseText(row?.location, fallbackItem.location),
        type: parseText(row?.type, fallbackItem.type),
        where: parseText(row?.where, fallbackItem.where),
        department: parseText(row?.department, fallbackItem.department),
        aboutTheRole: parseText(
          row?.aboutTheRole ?? row?.about_the_role,
          fallbackItem.aboutTheRole
        ),
        whatYouWillDo: parsedWhatYouWillDo,
        ctaHref: parseText(row?.ctaHref ?? row?.cta_href, fallbackItem.ctaHref),
      };
    });
  }

  if (roles.length === 0) {
    roles = openRolesDataFallback.roles;
  }

  return {
    heading: parseText(group?.heading, openRolesDataFallback.heading),
    title: parseText(group?.title, openRolesDataFallback.title),
    highlightedTitle: parseText(
      group?.highlightedTitle ?? group?.highlighted_title,
      openRolesDataFallback.highlightedTitle
    ),
    departments,
    roles,
  };
}

function parseLargeBanner(group: LargeBannerSectionScf | undefined): LargeBannerSectionType {
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

export function parseCareersPage(scf: CareersPageScf | undefined): CareersPageData {
  return {
    hero: parseHero(scf?.hero_section ?? scf?.heroSection),
    thePeopleWhoWorkHere: parseThePeopleWhoWorkHere(
      scf?.the_people_who_work_here_section ?? scf?.thePeopleWhoWorkHereSection
    ),
    whyYuva: parseWhyYuva(scf?.why_yuva_section ?? scf?.whyYuvaSection),
    ourValues: parseOurValues(scf?.our_values_section ?? scf?.ourValuesSection),
    whatYouGet: parseWhatYouGet(scf?.what_you_get_section ?? scf?.whatYouGetSection),
    openRoles: parseOpenRoles(
      scf?.open_roles_section ?? scf?.openRolesSection,
      scf?.categories,
      scf?.jobs
    ),
    largeBanner: parseLargeBanner(scf?.large_banner_section ?? scf?.largeBannerSection),
  };
}
