import type { BlogTemplatePageData } from "@/types/programme/blogTemplate.types";
import { parseText, parseRepeater } from "@/lib/parsers/acf.parser";
import type { WPMedia } from "@/types/wordpress.types";
import type { MediaAsset } from "@/types/global.types";

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

export function parseBlogTemplatePage(
  scf: any,
  fallback: BlogTemplatePageData
): BlogTemplatePageData {
  const heroGroup = scf?.hero_section ?? scf?.heroSection;
  const parsedHero = {
    kicker: parseText(heroGroup?.kicker ?? heroGroup?.heading, fallback.hero.kicker),
    title: parseText(heroGroup?.title, fallback.hero.title),
    description: parseText(heroGroup?.description ?? heroGroup?.body, fallback.hero.description),
    img: toMedia(heroGroup?.img ?? heroGroup?.bg_img ?? heroGroup?.bgImg, fallback.hero.img),
  };

  const articleGroup = parseRepeater(scf?.articles ?? scf?.article_section);
  const parsedArticles = articleGroup.map((row: any, idx: number) => {
    const fallbackItem = fallback.articles[idx] || fallback.articles[0];
    return {
      title: parseText(row?.title, fallbackItem.title),
      date: parseText(row?.date, fallbackItem.date),
      body: parseText(row?.body ?? row?.excerpt ?? row?.description, fallbackItem.body),
      img: toMedia(row?.img ?? row?.image, fallbackItem.img),
      href: parseText(row?.href ?? row?.link, fallbackItem.href),
    };
  });

  const ctaGroup = scf?.cta_band ?? scf?.ctaBand ?? scf?.large_banner_section ?? scf?.largeBannerSection;
  const parsedLargeBanner = {
    eyebrow: parseText(ctaGroup?.eyebrow ?? ctaGroup?.kicker ?? ctaGroup?.heading, fallback.largeBanner.eyebrow),
    title: parseText(ctaGroup?.title, fallback.largeBanner.title),
    body: parseText(ctaGroup?.body, fallback.largeBanner.body),
    cta1: {
      text: parseText(ctaGroup?.cta1_text ?? ctaGroup?.cta1Text ?? ctaGroup?.cta1?.text, fallback.largeBanner.cta1.text),
      href: parseText(ctaGroup?.cta1_link ?? ctaGroup?.cta1Link ?? ctaGroup?.cta1?.href, fallback.largeBanner.cta1.href),
    },
    cta2: {
      text: parseText(ctaGroup?.cta2_text ?? ctaGroup?.cta2Text ?? ctaGroup?.cta2?.text, fallback.largeBanner.cta2.text),
      href: parseText(ctaGroup?.cta2_link ?? ctaGroup?.cta2Link ?? ctaGroup?.cta2?.href, fallback.largeBanner.cta2.href),
    },
  };

  return {
    hero: parsedHero,
    articles: parsedArticles.length > 0 ? parsedArticles : fallback.articles,
    largeBanner: parsedLargeBanner,
  };
}
