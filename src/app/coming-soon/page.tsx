import React from "react";
import type {Metadata} from "next";
import {PrimaryButton} from "@/components/common/Buttons";
import {buildFallbackMetadata} from "@/lib/seo/metadata.builder";
import {APP_ROUTES} from "@/constants/navigation.constants";

export const metadata: Metadata = buildFallbackMetadata(
  {
    title: "Coming Soon | Yuva Unstoppable NGO",
    description:
      "This part of our work is currently under development. Check back soon for exciting updates and new initiatives from Yuva Unstoppable.",
  },
  {canonicalPath: APP_ROUTES.COMING_SOON}
);

export default function ComingSoonPage() {
  return (
    <main
      className="bg-[#F7F5F2] h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] mt-16.25 xl:mt-19.5 flex items-center justify-center overflow-x-clip">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col items-center text-center gap-5 xl:gap-6 py-20">
        <div className="flex flex-row flex-wrap gap-2.5 items-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="typo-body2 uppercase text-primary-red shrink-0">Coming Soon</p>
        </div>
        <h1 className="typo-h1 text-[#241E19]">
          Something good is <span className="text-primary-red">on the way</span>
        </h1>
        <p className="typo-body4 text-[#5B403E] xl:w-1/2">
          This part of our work is still being built. We&apos;re putting it together with the same
          care we bring to the schools we serve — check back with us soon.
        </p>
        <PrimaryButton label="Back to Home" href="/" btnClassName="mt-2"/>
      </div>
    </main>
  );
}
