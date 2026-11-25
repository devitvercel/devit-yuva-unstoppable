import type { BlogTemplatePageData } from "@/types/programme/blogTemplate.types";
import { markFallback } from "@/lib/utils";

export const EMERGENCY_RESPONSE_FALLBACK: BlogTemplatePageData = {
  hero: {
    kicker: markFallback("STRATEGIC COLLABORATION"),
    title: markFallback("Emergency Response"),
    description: markFallback(
      "Yuva Unstoppable gratefully acknowledges the support received from our partners who believe in our efforts, champion our cause and remain UNSTOPPABLE with us."
    ),
    img: {
      src: "/assets/pages/programme/programme-large-banner-img.avif",
      alt: "Emergency Response Hero Image",
    },
  },
  articles: [
    {
      title: markFallback("Assam Relief Program​"),
      date: markFallback("July 9, 2022"),
      body: markFallback(
        "Assam Relief Program Massive floods have hit Assam. Floods have wreaked havoc on people’s homes, farms............"
      ),
      img: {
        src: "/assets/pages/programme/programme-template-1-img.avif",
        alt: "Assam Relief Program",
      },
      href: "/blogs/assam-relief-program",
    },
    {
      title: markFallback("Covid-19 Response"),
      date: markFallback("March 9, 2020"),
      body: markFallback(
        "Covid-19 Response Launched to support and encourage appropriate uptake of the COVID-19 vaccines by 1 million people who are eligible while empowering ,....."
      ),
      img: {
        src: "/assets/pages/programme/programme-template-2-img.avif",
        alt: "Covid-19 Response",
      },
      href: "/blogs/covid-19-response",
    },
    {
      title: markFallback("Bridging the Digital Divide"),
      date: markFallback("July 9, 2019"),
      body: markFallback(
        "Bridging the Digital Divide The COVID-19 pandemic has impacted school children directly with Governments announcing immediate school closure. This......."
      ),
      img: {
        src: "/assets/pages/programme/programme-template-3-img.avif",
        alt: "Bridging the Digital Divide",
      },
      href: "/blogs/bridging-the-digital-divide",
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
