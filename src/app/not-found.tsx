import React from "react";
import type {Metadata} from "next";
import {PrimaryButton} from "@/components/common/Buttons";

export const metadata: Metadata = {
  title: "404 — Page Not Found | Yuva Unstoppable",
  description:
    "The page you are looking for could not be found. Return to Yuva Unstoppable to continue exploring our work.",
  robots: {index: false, follow: false},
};

export default function NotFound() {
  return (
    <main
      className="bg-[#F7F5F2] h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] mt-16.25 xl:mt-19.5 flex items-center justify-center overflow-x-clip">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col items-center text-center gap-5 xl:gap-6 py-20">
        <div className="flex flex-row flex-wrap gap-2.5 items-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="typo-body2 uppercase text-primary-red shrink-0">Error 404</p>
        </div>
        <h1 className="typo-h1 text-primary-red">404</h1>
        <h2 className="typo-h2 text-[#241E19]">This page wandered off</h2>
        <p className="typo-body4 text-[#5B403E] xl:w-1/2">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved. Let&apos;s get
          you back to where the work is happening.
        </p>
        <PrimaryButton label="Back to Home" href="/" btnClassName="mt-2"/>
      </div>
    </main>
  );
}
