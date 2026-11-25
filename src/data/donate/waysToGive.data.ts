import type { WaysToGiveSectionType } from "@/types/donate/donate.types";
import { markFallback } from "@/lib/utils";

export const waysToGiveDataFallback: WaysToGiveSectionType = {
  heading: markFallback("WAYS TO GIVE"),
  title: markFallback("Your gift,"),
  highlightedTitle: markFallback("made tangible."),
  body: markFallback("Every rupee is traced. Here's exactly what each amount does on the ground."),
  cards: [
    {
      img: { src: "/assets/pages/donate/ways-to-give-card-1.avif", alt: "media" },
      tag: markFallback("NOURISH"),
      title: markFallback("₹500"),
      heading: markFallback("ONE CHILD · ONE MONTH"),
      subtitle: markFallback("22 hot meals. The reason they come back."),
      body: markFallback("Mid-day meals are often the most substantial meal a child eats all day — and the primary reason families keep their children enrolled."),
      cta: {
        text: "Give ₹500",
        href: "#donate-form"
      }
    },
    {
      img: { src: "/assets/pages/donate/ways-to-give-card-2.avif", alt: "media" },
      tag: markFallback("MOST CHOSEN ★"),
      title: markFallback("₹5,000"),
      heading: markFallback("ONE GIRL · ONE MONTH"),
      subtitle: markFallback("A scholarship. A future rewritten."),
      body: markFallback("Covers tuition, books, uniform & a monthly stipend so a first-generation learner continues into secondary school without dropping out."),
      cta: {
        text: "Give ₹5,000",
        href: "#donate-form"
      }
    },
    {
      img: { src: "/assets/pages/donate/ways-to-give-card-3.avif", alt: "media" },
      tag: markFallback("TRANSFORM"),
      title: markFallback("₹50,000"),
      heading: markFallback("ONE CLASSROOM · END TO END"),
      subtitle: markFallback("Where attendance becomes learning."),
      body: markFallback("Smart board, library shelf, sanitation upgrade, teacher training. The infrastructure one school needs — done once and done right."),
      cta: {
        text: "Give ₹50,000",
        href: "#donate-form"
      }
    },
  ]
}