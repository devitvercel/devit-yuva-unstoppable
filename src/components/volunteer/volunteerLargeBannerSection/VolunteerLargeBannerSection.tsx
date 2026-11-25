import React from "react";
import type { LargeBannerSectionType } from "@/types/home/home.types";
import LargeBannerSection from "@/components/common/largeBannerSection/LargeBannerSection";

/** Volunteer closing banner — same Home LargeBanner look. */
function VolunteerLargeBannerSection({
  volunteerLargeBanner,
}: {
  volunteerLargeBanner: LargeBannerSectionType;
}) {
  return <LargeBannerSection largeBanner={volunteerLargeBanner} />;
}

export default VolunteerLargeBannerSection;
