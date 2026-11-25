import {markFallback} from "@/lib/utils";
import type {WhatWeDoSectionType} from "@/types/home/home.types";

export const whatWeDoDataFallback: WhatWeDoSectionType = {
  eyebrow: markFallback("WHAT WE DO"),
  title: markFallback("How We Create Lasting Change"),
  body: markFallback("From school infrastructure and scholarships to skills training and climate resilience, our programmes address the interconnected challenges communities face every day.Creating learning environments where children can thrive through improved infrastructure, dignified sanitation, technology, and nutrition."),
  programmes: [
    {
      index: 1,
      eyebrow: markFallback("OUR APPROACH"),
      title: markFallback("How We Create Lasting Change"),
      body: markFallback("Communities don't experience challenges in isolation. A child cannot thrive without quality education. A young person cannot succeed without opportunity. Families cannot prosper without resilient livelihoods and healthy environments. That is why Yuva works across four interconnected areas—creating lasting change from early childhood to employment while strengthening the communities that make it all possible."),
      href: "/school-transformation",
      img: {src: "/assets/pages/home/home_image_card1.avif", alt: "step 1 img"},
    },
    {
      index: 2,
      eyebrow: markFallback("WHAT WE DO"),
      title: markFallback("School Transformation"),
      body: markFallback("Creating learning environments where children can thrive through improved infrastructure, dignified sanitation, technology, and nutrition."),
      href: "/school-transformation",
      img: {src: "/assets/pages/home/school_transformation.avif", alt: "step 1 img"},
    },
    {
      index: 3,
      eyebrow: markFallback("HIGHER EDUCATION ACCESS"),
      title: markFallback("Scholarships Programme"),
      body: markFallback("Empowering high-potential students to overcome financial barriers, access higher education, and emerge as the doctors, engineers, lawyers, and innovators who will lead the next generation."),
      href: "/scholarship",
      img: {src: "/assets/pages/home/carousel-img.avif", alt: "step 2 img"},
    },
    {
      index: 4,
      eyebrow: markFallback("LIVELIHOODS"),
      title: markFallback("Skill & Employability"),
      body: markFallback("Equipping India's youth with industry-relevant skills, digital literacy, and vocational training to succeed in the workforce and build sustainable careers."),
      href: "/skill-and-employability",
      img: {src: "/assets/pages/home/card-3-new-2.avif", alt: "step 3 img"},
    },
    {
      index: 5,
      eyebrow: markFallback("EARLY CHILDHOOD"),
      title: markFallback("Anganwadi Transformation"),
      body: markFallback("Investing in the earliest years of life through nutrition, play-based learning, and maternal wellbeing programmes that strengthen families and communities."),
      href: "/anganwadi-transformation",
      img: {src: "/assets/pages/home/beliefs-beyond.avif", alt: "step 4 img"},
    },
    {
      index: 6,
      eyebrow: markFallback("CLIMATE & COMMUNITY"),
      title: markFallback("Environment & Climate Action"),
      body: markFallback("Restoring ecosystems and strengthening climate resilience through tree plantation drives, water conservation efforts, and renewable energy initiatives."),
      href: "/environment-and-climate-action",
      img: {src: "/assets/pages/home/card-5.avif", alt: "step 5 img"},
    },
  ]
}