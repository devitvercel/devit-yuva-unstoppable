import {markFallback} from "@/lib/utils";
import type {CareersHeroSectionType} from "@/types/careers/careers.types";

export const heroDataFallback: CareersHeroSectionType = {
  heading: markFallback("STRATEGIC COLLABORATION"),
  title: markFallback("Careers"),
  body: markFallback("Join a team that has spent twenty one years proving that purpose and performance can coexist. Every role here contributes to changing the trajectory of millions of lives."),
  img: {
    src: markFallback("/assets/pages/contact/contact-hero-img.avif"),
    alt: markFallback("Hero Image"),
  }
}