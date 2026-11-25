import React from "react";
import type { VocCtaBannerSectionType } from "@/types/voiceOfChange/voiceOfChange.types";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";

/** Thin wrapper — same look as Home LargeBanner. */
const VocCtaBannerSection: React.FC<{ ctaBanner: VocCtaBannerSectionType }> = ({
  ctaBanner,
}) => {
  return <LargeBannerSection largeBanner={ctaBanner} />;
};

export default VocCtaBannerSection;
