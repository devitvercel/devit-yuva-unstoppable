import {markFallback} from "@/lib/utils";
import type {SupportSystemSectionType} from "@/types/programme/programme.types";

export const supportSystemDataFallback: SupportSystemSectionType = {
  heading: markFallback("Support System"),
  title: markFallback("More Than Financial Aid: A Support System"),
  body: [
    markFallback("We know that tuition is only one piece of the puzzle. Success in high-pressure fields like medicine and engineering requires more than just money, it requires a guide."),
    markFallback("Our program goes beyond the chequebook. We provide our scholars with:")
  ],
  cards: [
    {
      title: markFallback("Active Mentorship"),
      body: markFallback("Regular guidance from industry veterans who help our students navigate the complexities of campus life and professional expectations."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
    {
      title: markFallback("Career Pathing"),
      body: markFallback("Regular guidance from industry veterans who help our students navigate the complexities of campus life and professional expectations."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
    {
      title: markFallback("A Community of Peers"),
      body: markFallback("Regular guidance from industry veterans who help our students navigate the complexities of campus life and professional expectations."),
      img: {src: "/assets/pages/programme/support-system-img.avif", alt: "support system"},
    },
  ]
}