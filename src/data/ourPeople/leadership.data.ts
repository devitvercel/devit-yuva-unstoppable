import {markFallback} from "@/lib/utils";
import type {OurPeopleLeadershipSectionType} from "@/types/ourPeople/ourPeople.types";

export const leadershipDataFallback: OurPeopleLeadershipSectionType = {
  leaders: [
    {
      role: markFallback("FOUNDER & CEO · YUVA UNSTOPPABLE"),
      name: markFallback("Amitabh  Shah"),
      quote: markFallback("Our vision is simple: every child in India should have access to quality education, proper nutrition, and the dignity to pursue their dreams."),
      body: markFallback("A Yale graduate who chose social impact over a corporate career, he has spent more than two decades working to ensure that every child has access to quality education, nutrition, and opportunities to succeed. Through Yuva Unstoppable, he has helped transform the lives of millions of children across India by reimagining schools as spaces where learning, dignity, and potential can flourish."),
      cta: {
        text: markFallback("amitabhshah.com"),
        href: "https://amitabhshah.com"
      },
      img: {
        src: "/assets/pages/ourTeam/Amitabh-Shah-img.avif",
        alt: "Amitabh Shah img"
      },
      badge: markFallback("Amitabh Shah — 2005 to present")
    },
    {
      role: markFallback("NON-EXECUTIVE CHAIRMAN · YUVA UNSTOPPABLE"),
      name: markFallback("Abhi  Shah"),
      quote: markFallback("True progress is measured not by what we achieve for ourselves, but by the opportunities we create for the next generation."),
      body: markFallback("Abhi Shah is an entrepreneur, philanthropist, and Chairman of Yuva Unstoppable. He is the founder of Clutch Group, an Inc. 5000-ranked global analytics company, and a passionate advocate for expanding access to education and opportunity for underserved children. Through Yuva Unstoppable, he supports initiatives that empower young people to build brighter futures."),
      cta: {
        text: markFallback("abhishah.com"),
        href: "https://abhishah.com"
      },
      img: {
        src: "/assets/pages/ourTeam/Abhi-Shah-img.avif",
        alt: "Abhi Shah img"
      },
      badge: markFallback("Abhi Shah — 2005 to present")
    }
  ]
};