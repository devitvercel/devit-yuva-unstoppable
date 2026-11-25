import { markFallback } from "@/lib/utils";
import type { OurStoryTimelineSectionType } from "@/types/ourStory/ourStory.types";

export const ourStoryTimelineFallback: OurStoryTimelineSectionType = {
  eyebrow: markFallback("OUR JOURNEY"),
  title: markFallback("The journey, year by year."),
  entries: [
    {
      year: markFallback("2005"),
      eyebrow: markFallback("2005"),
      title: markFallback("Foundation & Early Initiatives"),
      body: markFallback(
        "Yuva Unstoppable was founded by Amitabh Shah, a Yale graduate who left a corporate career to improve the lives of underprivileged children. Launched as a youth-led movement, the organisation mobilised volunteers to engage with marginalised communities, laying the foundation for empathy, service, and collective action."
      ),
      tag: markFallback("FIRST YEAR · 3 SCHOOLS · AHMEDABAD, GUJARAT"),
      img: { src: "/assets/pages/ourstory/Image-1.avif", alt: "Students in 2005" },
    },
    {
      year: markFallback("2010"),
      eyebrow: markFallback("2010"),
      title: markFallback("Volunteer-Led Engagement"),
      body: markFallback(
        "The organisation scaled its volunteer movement, formalising Yuva Corps of Volunteers (YCV) — mobilising college students and corporate professionals to fulfil skills-based service. Volunteers led library missions, school makeovers, and awareness campaigns, strengthening connections with public schools."
      ),
      tag: markFallback("50+ VOLUNTEERS · 12 SCHOOLS · GUJARAT"),
      img: { src: "/assets/pages/ourstory/image%207.avif", alt: "Volunteers in 2010" },
    },
    {
      year: markFallback("2013"),
      eyebrow: markFallback("2013"),
      title: markFallback("School Transformation Program"),
      body: markFallback(
        "Yuva developed the School Transformation Model — focusing on WASH infrastructure, libraries, learning corners, and nutrition — creating safe and dignified learning environments across government schools in Gujarat."
      ),
      tag: markFallback("100+ SCHOOLS · GUJARAT"),
      img: { src: "/assets/pages/ourstory/image%209.avif", alt: "School transformation 2013" },
    },
    {
      year: markFallback("2015"),
      eyebrow: markFallback("2015"),
      title: markFallback("Expanding Across States"),
      body: markFallback(
        "Yuva expanded its footprint beyond Gujarat, launching programmes in Rajasthan, Maharashtra, and Madhya Pradesh. The organisation partnered with state governments and CSR partners to scale impactful school infrastructure and community programmes."
      ),
      tag: markFallback("4 STATES · 300+ SCHOOLS"),
      img: { src: "/assets/pages/ourstory/image 12.png", alt: "Expansion 2015" },
    },
    {
      year: markFallback("2017"),
      eyebrow: markFallback("2017"),
      title: markFallback("DigiKlass — Digital Classrooms"),
      body: markFallback(
        "Launched DigiKlass to bring technology-enabled smart learning to government school classrooms. Interactive digital boards, structured curricula, and teacher training enabled a blended learning model for over 200,000 students across multiple states."
      ),
      tag: markFallback("200,000+ STUDENTS · 5 STATES"),
      img: { src: "/assets/pages/ourstory/image 12-1.png", alt: "DigiKlass 2017" },
    },
    {
      year: markFallback("2018"),
      eyebrow: markFallback("2018"),
      title: markFallback("Vidaan Scholarships Launched"),
      body: markFallback(
        "Yuva introduced the Vidaan Scholarship programme — providing direct financial support to first-generation learners, with a focus on keeping girls in Class IX–XII. The programme addressed dropout rates rooted in economic barriers."
      ),
      tag: markFallback("1,000+ SCHOLARS · GUJARAT & RAJASTHAN"),
      img: { src: "/assets/pages/ourstory/image 12-2.png", alt: "Vidaan scholarships 2018" },
    },
    {
      year: markFallback("2020"),
      eyebrow: markFallback("2020"),
      title: markFallback("Resilience Through the Pandemic"),
      body: markFallback(
        "Despite the pandemic, Yuva pivoted rapidly — distributing ration kits, hygiene essentials, and digital devices to ensure continuity of learning. Volunteers delivered support to over 50,000 families across Gujarat and Rajasthan."
      ),
      tag: markFallback("50,000+ FAMILIES SUPPORTED · COVID-19 RESPONSE"),
      img: { src: "/assets/pages/ourstory/image 13.png", alt: "COVID response 2020" },
    },
    {
      year: markFallback("2021"),
      eyebrow: markFallback("2021"),
      title: markFallback("Skill Development & Agri-Forestry"),
      body: markFallback(
        "Yuva launched certified vocational training programmes and agri-forestry initiatives for rural youth and communities. These programmes provided livelihood skills and promoted climate resilience across tribal belts in Gujarat and Rajasthan."
      ),
      tag: markFallback("5,000+ YOUTH TRAINED · RURAL INDIA"),
      img: { src: "/assets/pages/ourstory/image 15.png", alt: "Skill development 2021" },
    },
    {
      year: markFallback("2022"),
      eyebrow: markFallback("2022"),
      title: markFallback("1,700+ Schools Transformed"),
      body: markFallback(
        "Yuva crossed a landmark milestone of transforming over 1,700 government schools with WASH, libraries, classrooms, nutrition programmes, and teaching resources — reaching nearly 500,000 students across 8 states."
      ),
      tag: markFallback("1,700+ SCHOOLS · 500,000+ STUDENTS · 8 STATES"),
      img: { src: "/assets/pages/ourstory/image 16.png", alt: "1700 schools 2022" },
    },
    {
      year: markFallback("2023"),
      eyebrow: markFallback("2023"),
      title: markFallback("10,000+ Schools Reached"),
      body: markFallback(
        "Building on 18 years of impact, Yuva Unstoppable expanded its reach to over 10,000 schools. With a strengthened volunteer corps, deeper CSR partnerships, and new programme verticals, the organisation deepened its impact at scale."
      ),
      tag: markFallback("10,000+ SCHOOLS · 18 YEARS OF IMPACT"),
      img: { src: "/assets/pages/ourstory/image 18.png", alt: "10,000 schools 2023" },
    },
    {
      year: markFallback("2024"),
      eyebrow: markFallback("2024"),
      title: markFallback("Deepening Systemic Change"),
      body: markFallback(
        "Yuva doubled down on quality of impact — embedding outcome-based measurement, strengthening teacher capacity programmes, and forging deeper government partnerships to drive systemic change in public education."
      ),
      tag: markFallback("SYSTEMIC IMPACT · GOVERNMENT PARTNERSHIPS"),
      img: { src: "/assets/pages/ourstory/Image-2.avif", alt: "Systemic change 2024" },
    },
    {
      year: markFallback("2025"),
      eyebrow: markFallback("2025"),
      title: markFallback("Unstoppable — 20 Years & Beyond"),
      body: markFallback(
        "As Yuva Unstoppable marks 20 years of service, the organisation looks ahead with renewed ambition — expanding DigiKlass, scaling Vidaan, and building the next generation of civic leaders who believe every child deserves dignity and opportunity."
      ),
      tag: markFallback("20 YEARS · UNSTOPPABLE"),
      img: { src: "", alt: "media"  },
    },
  ],
};
