import React from "react";
import type { ImpactSubpageCta } from "@/types/impact/impact.types";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";

export default function ImpactCtaSection({ cta }: { cta: ImpactSubpageCta }) {
  const largeBanner = {
    eyebrow: cta.eyebrow,
    title: cta.title,
    body: cta.body,
    cta1: {
      text: cta.primary?.text || "",
      href: cta.primary?.href || "",
    },
    cta2: {
      text: cta.secondary?.text || cta.primary?.text || "",
      href: cta.secondary?.href || cta.primary?.href || "",
    },
  };

  return (
    <LargeBannerSection largeBanner={largeBanner} />
  );
}
