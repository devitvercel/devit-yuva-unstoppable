import {markFallback} from "@/lib/utils";
import type {CsrPartnersSectionType} from "@/types/home/home.types";
import { companyLogos } from "./companyLogos";

// We have 40 logos in total.
// We want exactly 12 grid cells (2 rows of 6 columns).
// To make every cell have exactly 9 unique logos, we need 12 * 9 = 108 slots.
// We fill these 108 slots by cycling through the list of logos.
const totalSlots = 108;
const paddedLogos: string[] = [];
for (let i = 0; i < totalSlots; i++) {
  paddedLogos.push(companyLogos[i % companyLogos.length]);
}

// Now group them into 12 grid cells (each cell will get exactly 9 logos)
const constructedGrids = [];
for (let cellIndex = 0; cellIndex < 12; cellIndex++) {
  const cellLogos = [];
  for (let logoIndex = 0; logoIndex < 9; logoIndex++) {
    // Distribute them evenly
    const file = paddedLogos[cellIndex + logoIndex * 12];
    cellLogos.push({
      src: file,
      alt: "Partner logo"
    });
  }
  
  // For seamless loop, we append the first logo at the end (10th item)
  cellLogos.push(cellLogos[0]);

  constructedGrids.push({
    logos: cellLogos
  });
}

export const csrPartnersDataFallback: CsrPartnersSectionType = {
  eyebrow: markFallback("OUR DONORS"),
  title: markFallback("Trusted by Partners"),
  body: markFallback("More than 150 corporate partners, global foundations and government institutions have chosen Yuva as their implementation and transformation partner."),
  grids: constructedGrids,
  cta1: {
    text: markFallback("View all 100+ partners"),
    href: "/donors-and-audit-partners"
  },
  cta2: {
    text: markFallback("Become a partner"),
    href: "/contact-us"
  }
};