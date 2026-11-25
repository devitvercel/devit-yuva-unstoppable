import type { HowYouCanHelpSectionType } from "@/types/volunteer/volunteer.types";
import { markFallback } from "@/lib/utils";

export const howYouCanHelpDataFallback: HowYouCanHelpSectionType = {
  heading: markFallback("HOW YOU CAN HELP"),
  title1: markFallback("Three ways to"),
  highlightedTitle: markFallback("volunteer"),
  title2: markFallback("with Yuva"),
  body: markFallback("We've structured three distinct pathways so you can contribute in the way that fits your skills, availability and passion."),
  cards: [
    {
      img: { src: "/assets/pages/volunteer/how-you-can-help-card-img-1.avif", alt: "media" },
      id: markFallback("01"),
      title: markFallback("Work with Students"),
      body: markFallback("The most direct form of volunteering. Spend time with children in Yuva-supported schools — mentoring, tutoring, or simply being the adult who showed up."),
      points: [
        markFallback("One-on-one and group academic mentoring"),
        markFallback("Career guidance and life skills workshops"),
        markFallback("Janta Mentorship — virtual sessions for scholars")
      ],
      commitment: markFallback("COMMITMENT: 4–8 HRS/MONTH · ON-SITE OR VIRTUAL")
    },
    {
      img: { src: "/assets/pages/volunteer/how-you-can-help-card-img-2.avif", alt: "media" },
      id: markFallback("02"),
      title: markFallback("Community Initiatives"),
      body: markFallback("Join Yuva on the ground — in schools, Anganwadis and communities. Help build the infrastructure that changes lives permanently."),
      points: [
        markFallback("School construction and renovation drives"),
        markFallback("Tree plantation and agroforestry programmes"),
        markFallback("Health, hygiene and nutrition camps")
      ],
      commitment: markFallback("COMMITMENT: FLEXIBLE · EVENT-BASED OR ONGOING")
    },
    {
      img: { src: "/assets/pages/volunteer/how-you-can-help-card-img-3.avif", alt: "media" },
      id: markFallback("03"),
      title: markFallback("Operational Support"),
      body: markFallback("Use your professional skills behind the scenes. Design, write, code, document, photograph — every skill has a place here."),
      points: [
        markFallback("Content creation and communications"),
        markFallback("Photography and videography at field sites"),
        markFallback("Data analysis and M&E support")
      ],
      commitment: markFallback("COMMITMENT: PROJECT-BASED · REMOTE-FRIENDLY")
    },
  ]
}