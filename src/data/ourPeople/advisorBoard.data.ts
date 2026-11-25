import {markFallback} from "@/lib/utils";
import type {OurPeopleAdvisorSectionType} from "@/types/ourPeople/ourPeople.types";

const ADVISOR_DESCRIPTION = markFallback(
  "A trusted advisor to Yuva Unstoppable, contributing strategic guidance and philanthropic leadership to advance our mission of transforming education for underserved children across India."
);

export const advisorBoardDataFallback: OurPeopleAdvisorSectionType = {
  heading: markFallback("OUR SUPPORTERS"),
  title: markFallback("Those Who Chose to Stand With Us"),
  advisors: [
    {
      img: {src: "/assets/pages/ourTeam/advisor-1.avif", alt: "Advisor 1"},
      name: markFallback("Carrie Morgridge"),
      role: markFallback("American philanthropist and author"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-2.avif", alt: "Advisor 2"},
      name: markFallback("Dilip Cherian"),
      role: markFallback("co-founder of Perfect Relations"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-3.avif", alt: "Advisor 3"},
      name: markFallback("VVS Laxman"),
      role: markFallback("Former Indian cricketer"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-4.avif", alt: "Advisor 4"},
      name: markFallback("Raj Nooyi"),
      role: markFallback("Yuva Unstoppable Global Ambassador"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-1.avif", alt: "Advisor 1"},
      name: markFallback("Carrie Morgridge"),
      role: markFallback("American philanthropist and author"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-2.avif", alt: "Advisor 2"},
      name: markFallback("Dilip Cherian"),
      role: markFallback("co-founder of Perfect Relations"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-3.avif", alt: "Advisor 3"},
      name: markFallback("VVS Laxman"),
      role: markFallback("Former Indian cricketer"),
      description: ADVISOR_DESCRIPTION,
    },
    {
      img: {src: "/assets/pages/ourTeam/advisor-4.avif", alt: "Advisor 4"},
      name: markFallback("Raj Nooyi"),
      role: markFallback("Yuva Unstoppable Global Ambassador"),
      description: ADVISOR_DESCRIPTION,
    },
  ],
};
