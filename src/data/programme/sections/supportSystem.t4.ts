import {markFallback} from "@/lib/utils";
import type {SupportSystemSectionType} from "@/types/programme/programme.types";

export const supportSystemDataFallback: SupportSystemSectionType = {
  heading: markFallback("vision"),
  title: markFallback("How We Turn Vision into Growth"),
  body: [
    markFallback("Our approach is designed to ensure that every plantation becomes a permanent, productive asset for the farming families we partner with."),
  ],
  cards: [
    {
      title: markFallback("Knowledge Partnership"),
      body: markFallback("We start with conversations, not manuals. We collaborate with farmers to share agroforestry best practices, tailoring our approach to their local expertise. It’s about equipping them with the knowledge to make their land more productive, year after year."),
      img: {src: "/assets/pages/programme/programme-template-4-img.avif", alt: "support system"},
    },
    {
      title: markFallback("The Right Tree for the Right Land"),
      body: markFallback("We match species to soil, climate, and the family's goals — choosing trees that restore the land while delivering fruit, fodder, timber, or income that lasts for decades."),
      img: {src: "/assets/pages/programme/programme-template-4-img.avif", alt: "support system"},
    },
    {
      title: markFallback("Agronomy as an Ally"),
      body: markFallback("Hands-on agronomic support — soil health, water management, and intercropping guidance — so every plantation grows into a thriving, productive ecosystem."),
      img: {src: "/assets/pages/programme/programme-template-4-img.avif", alt: "support system"},
    },
    {
      title: markFallback("A Long-term Commitment"),
      body: markFallback("We start with conversations, not manuals. We collaborate with farmers to share agroforestry best practices, tailoring our approach to their local expertise. It’s about equipping them with the knowledge to make their land more productive, year after year."),
      img: {src: "/assets/pages/programme/programme-template-4-img.avif", alt: "support system"},
    },
  ]
}