import { markFallback } from "@/lib/utils";
import type { WhereYouDonationGoesSectionType } from "@/types/donate/donate.types";

export const whereYouDonationGoesDataFallback: WhereYouDonationGoesSectionType = {
  heading: markFallback("EDUCATION · ENVIRONMENT · ECONOMIC OPPORTUNITY"),
  title: markFallback("Where Your Donation Goes"),
  body: markFallback("In 2005, Yuva Unstoppable didn't start with strategy decks or grand theories of change. It began with a simple, quiet realisation: that education is the most powerful tool for change, yet for millions of children, it was being limited by a lack of basic dignity."),
  cards: [
    {
      img: { src: "/assets/pages/donate/where-you-donation-goes-1.avif", alt: "where-you-donation-goes-1" },
      title: markFallback("School Infrastructure"),
      body: markFallback("Create spaces where children feel safe, inspired, and ready to learn.")
    },
    {
      img: { src: "/assets/pages/donate/where-you-donation-goes-2.avif", alt: "where-you-donation-goes-2" },
      title: markFallback("Scholarships for Students"),
      body: markFallback("Give bright minds the opportunity to continue their education without financial barriers.")
    },
    {
      img: { src: "/assets/pages/donate/where-you-donation-goes-3.avif", alt: "where-you-donation-goes-3" },
      title: markFallback("Community Initiatives"),
      body: markFallback("Empower communities through programs that drive long-term change and growth.")
    }
  ]
}