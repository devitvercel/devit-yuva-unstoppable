import {markFallback} from "@/lib/utils";
import {EngineeringIcon, IdIcon, NetworkingIcon} from "../../../../public/SVGs/svg";
import type {StudentJourneySectionType} from "@/types/programme/programme.types";

export const studentJourneyDataFallback: StudentJourneySectionType = {
  heading: markFallback("The Student Journey"),
  title: markFallback("A Path to Success"),
  body: markFallback("We act as a launchpad for talented young people from underserved backgrounds, helping them bypass the initial hurdles of the job market."),
  card: [
    {
      id: markFallback("01"),
      title: markFallback("Identification"),
      body: markFallback("We source high-potential talent eager to grow."),
      icon: IdIcon
    },
    {
      id: markFallback("02"),
      title: markFallback("Upskilling"),
      body: markFallback("Intensive, cohort-based training that bridges the gap between theory and practice."),
      icon: EngineeringIcon
    },
    {
      id: markFallback("03"),
      title: markFallback("The Launch"),
      body: markFallback("Connecting graduates with roles where they can make an immediate, lasting impact."),
      icon: NetworkingIcon
    }
  ]
}