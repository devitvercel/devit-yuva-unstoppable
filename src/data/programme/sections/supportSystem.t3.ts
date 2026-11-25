import {markFallback} from "@/lib/utils";
import type {SupportSystemSectionType} from "@/types/programme/programme.types";

export const supportSystemDataFallback: SupportSystemSectionType = {
  heading: markFallback("Pillars"),
  title: markFallback("Our Curriculum Pillars"),
  body: [
    markFallback("We curate training modules that mirror the reality of the modern industry. Our approach focuses on three core pillars:"),
  ],
  cards: [
    {
      title: markFallback("Digital Fluency"),
      body: markFallback("Mastery of essential tools, AI literacy, and data-driven problem solving."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
    {
      title: markFallback("Professional Communication"),
      body: markFallback("Regular guidance from industry veterans who help our students navigate the complexities of campus life and professional expectations."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
    {
      title: markFallback("Specialized Technical Training"),
      body: markFallback("Mastery of essential tools, AI literacy, and data-driven problem solving."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
  ]
}