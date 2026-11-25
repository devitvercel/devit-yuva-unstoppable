import {markFallback} from "@/lib/utils";
import type {OurVisionAmbitionSectionType} from "@/types/ourVision/ourVision.types";

export const ambitionDataFallback: OurVisionAmbitionSectionType = {
  heading: markFallback("OUR 2030 AMBITION"),
  title: markFallback("Fifteen million lives. One unstoppable system."),
  body: [
    markFallback("We are committed to achieving deep impact at scale by 2030, with a roadmap focused on expanding our reach to over 15 million beneficiaries. By integrating AI-driven literacy, STEM initiatives, and sustainable ecosystems, we aim to create multi-generational pathways out of poverty for India’s youth. We don't believe in working in silos. Our vision is to serve as the orchestrator for collective action, bringing together government, industry leaders, and communities."),
  ],
  ambitions: [
    {
      title: markFallback("15M+"),
      subTitle: markFallback("Beneficiaries by 2030."),
      body: markFallback("Expanding our reach to 15 million lives touched.")
    },
    {
      title: markFallback("AI"),
      subTitle: markFallback("AI-driven literacy programmes."),
      body: markFallback("Integrating technology for personalised learning outcomes.")
    },
    {
      title: markFallback("28"),
      subTitle: markFallback("States & Union Territories."),
      body: markFallback("Hub-and-spoke model enabling full national coverage.")
    },
  ],
  img: {
    src: "/assets/pages/ourVision/our-vision-ambition-img.avif",
    alt: "Students at a Yuva-transformed school, Rajasthan — 2023"
  },
  imgText: markFallback("Students at a Yuva-transformed school, Rajasthan — 2023"),
  href: "/school-transformation"
};