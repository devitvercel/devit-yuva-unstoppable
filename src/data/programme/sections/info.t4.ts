import {markFallback} from "@/lib/utils";
import type {ProgrammeInfoSectionType} from "@/types/programme/programme.types";

export const programmeDataFallback: ProgrammeInfoSectionType = {
  heading: markFallback("About Agroforestry Initiative"),
  title: markFallback("Rooted in Resilience"),
  body: [
    markFallback("At YUVA Unstoppable, we are committed to restoring ecosystems, enhancing rural livelihoods, and tackling climate change through large-scale agroforestry initiatives. Our projects focus on integrating trees with agricultural systems, promoting biodiversity, and enabling farmers to participate in carbon markets."),
    markFallback("We believe that true resilience begins in the soil. For the communities we serve, the land is more than a landscape, it is the primary engine of economic stability. When a family’s livelihood depends on a single harvest, a bad season isn't just a financial hit; it is an existential threat to their long-term growth."),
    markFallback("That is why our agroforestry initiative is fundamentally about securing the foundation.")
  ],
}