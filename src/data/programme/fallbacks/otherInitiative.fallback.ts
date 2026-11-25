import type { BlogTemplatePageData } from "@/types/programme/blogTemplate.types";
import { markFallback } from "@/lib/utils";

export const OTHER_INITIATIVE_FALLBACK: BlogTemplatePageData = {
  hero: {
    kicker: markFallback("STRATEGIC COLLABORATION"),
    title: markFallback("Other Initiative"),
    description: markFallback(
      "Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."
    ),
    img: {
      src: "/assets/pages/programme/programme-large-banner-img.avif",
      alt: "Other Initiative Hero Image",
    },
  },
  articles: [
    {
      title: markFallback("Community Infrastructure Development"),
      date: markFallback("August 12, 2022"),
      body: markFallback(
        "Building strong communities begins with building safe, accessible, and functional local infrastructure to support education and health."
      ),
      img: {
        src: "/assets/pages/programme/programme-template-4-img.avif",
        alt: "Community Infrastructure",
      },
      href: "/blogs/community-infrastructure",
    },
    {
      title: markFallback("Vocational Training Centers"),
      date: markFallback("April 15, 2021"),
      body: markFallback(
        "Empowering youth and women with employment-oriented skills to create sustainable livelihood opportunities in suburban and rural areas."
      ),
      img: {
        src: "/assets/pages/programme/programme-template-5-img.avif",
        alt: "Vocational Training",
      },
      href: "/blogs/vocational-training",
    },
    {
      title: markFallback("Sanitation & Hygiene Campaigns"),
      date: markFallback("October 2, 2020"),
      body: markFallback(
        "Promoting health, well-being, and gender equity through clean water access, toilet construction, and hygiene awareness drives."
      ),
      img: {
        src: "/assets/pages/programme/programme-template-3-img.avif",
        alt: "Sanitation Campaign",
      },
      href: "/blogs/sanitation-hygiene",
    },
  ],
  largeBanner: {
    eyebrow: markFallback("THE MISSION CONTINUES"),
    title: markFallback("Together, We Are Unstoppable"),
    body: markFallback(
      "Twenty one years in. Ten million lives touched. The next twenty one start with you."
    ),
    cta1: {
      text: markFallback("Donate"),
      href: "/donate",
    },
    cta2: {
      text: markFallback("Volunteer"),
      href: "/volunteer",
    },
  },
};
