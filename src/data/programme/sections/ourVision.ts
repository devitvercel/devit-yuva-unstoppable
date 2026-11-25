import {markFallback} from "@/lib/utils";
import type {OurVisionSectionType} from "@/types/programme/programme.types";

export const ourVisionDataFallback: OurVisionSectionType = {
  heading: markFallback("OUR VISION"),
  title: markFallback("Data-Backed Accountability"),
  body: markFallback("To ensure that every sapling actually thrives and that our impact is real, we combine high-tech oversight with consistent human care. Here is how we make sure our promises on paper translate to results in the field:"),
  cards: [
    {
      id: markFallback("01"),
      title: markFallback("Real-Time Tracking"),
      body: markFallback("We use a dedicated digital dashboard that tracks the life cycle of every plantation. This isn't just about counting numbers; it’s about monitoring survival rates and growth milestones so we can step in the moment a tree needs extra support.")
    },
    {
      id: markFallback("02"),
      title: markFallback("Hands-On Nurturing"),
      body: markFallback("Tech can only go so far. Our on-ground teams are in the field regularly, physically inspecting plantations to ensure the saplings are growing strong and healthy. It’s the human touch that ensures survival, not just algorithms.")
    },
    {
      id: markFallback("03"),
      title: markFallback("The Big Picture"),
      body: markFallback("We use high-resolution satellite imagery to keep a watchful eye over our projects. This bird’s-eye view allows us to monitor canopy density and land health across vast areas, acting as an early warning system to protect against any risks to the forest.")
    },
    {
      id: markFallback("04"),
      title: markFallback("Verified by Hand and Eye"),
      body: markFallback("We pair AI-powered tree counting with rigorous ground-level checks. By verifying our digital data against what we see with our own eyes, we ensure that the numbers we report are completely accurate and earned.")
    },
  ]
}