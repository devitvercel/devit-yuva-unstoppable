import {markFallback} from "@/lib/utils";
import type {VoicesSectionType} from "@/types/home/home.types";

export const voicesDataFallback: VoicesSectionType = {
  eyebrow: markFallback("VOICES"),
  title: markFallback("Change Happens Together"),
  body: markFallback(
    "Yuva's journey has never been ours alone. Every school transformed, every young person empowered and every community strengthened has been made possible by governments, corporate partners, foundations, volunteers and countless individuals who chose to believe in the same mission. "
  ),
  voices: [
    {
      img: {
        src: "/assets/pages/home/voices/apj-abdul-kalam.avif",
        alt: markFallback("Dr. APJ Abdul Kalam"),
      },
      badge: {
        title: markFallback("11TH PRESIDENT"),
        body: markFallback("2002 — 2007"),
      },
      body: markFallback(
        "Establishing an organisation with kindness as its focus is a beautiful mission. I congratulate all those who are working at and contributing to Yuva Unstoppable."
      ),
      tag: markFallback("DIGNITARY"),
      name: markFallback("Dr. APJ Abdul Kalam"),
      role: markFallback("FORMER PRESIDENT OF INDIA"),
    },
    {
      img: {
        src: "/assets/pages/home/voices/harmeet-sehra.avif",
        alt: markFallback("Harmeet Sehra"),
      },
      badge: {
        title: markFallback(""),
        body: markFallback(""),
      },
      body: markFallback(
        "With Yuva, it has been a fantastic journey. Over the last six years, we have seen a tremendous reduction in dropout rates among girls and boys going to schools in Cairn industrial areas. The new toilets and smart classrooms have not only led to empowerment of children but the entire village. There is so much positive energy when you're working with Yuva. I think this is one of the best NGOs I have been working with and I would like to do so till my last day."
      ),
      tag: markFallback("CORPORATE PARTNER"),
      name: markFallback("Harmeet Sehra"),
      role: markFallback("HEAD CSR — CAIRN OIL & GAS"),
    },
  ],
};
