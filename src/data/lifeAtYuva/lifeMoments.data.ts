import {markFallback} from "@/lib/utils";
import type {LifeAtYuvaMomentsSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

export const lifeMomentsDataFallback: LifeAtYuvaMomentsSectionType = {
  heading: markFallback("LIFE AT YUVA"),
  title: markFallback("Real moments."),
  highlightedTitle: markFallback("Real team."),
  body: markFallback(
    "Field visits, school inaugurations, team celebrations, and the quiet satisfaction of a project done right."
  ),
  moments: [
    {
      label: markFallback("FIELD VISIT · AHMEDABAD"),
      layout: "featured",
      img: {
        src: "/assets/pages/life-at-yuva/hero.avif",
        alt: "Field visit in Ahmedabad",
      },
    },
    {
      label: markFallback("10,000TH SCHOOL INAUGURATION"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/beginning.avif",
        alt: "School inauguration",
      },
    },
    {
      label: markFallback("PARTNER EVENT · MUMBAI"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/team1.avif",
        alt: "Partner event in Mumbai",
      },
    },
    {
      label: markFallback("SCHOLARSHIP CEREMONY"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/team2.avif",
        alt: "Scholarship ceremony",
      },
    },
    {
      label: markFallback("SMART CLASSROOM · POST-HANDOVER"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/team3.avif",
        alt: "Smart classroom handover",
      },
    },
    {
      label: markFallback("SCHOLARSHIP CEREMONY"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/team4.avif",
        alt: "Scholarship ceremony",
      },
    },
    {
      label: markFallback("SCHOLARSHIP CEREMONY"),
      layout: "small",
      img: {
        src: "/assets/pages/life-at-yuva/banner.avif",
        alt: "Scholarship ceremony celebration",
      },
    },
  ],
};
