import React from 'react';
import type {LargeBannerSectionType} from "@/types/home/home.types";
import {PrimaryButton} from "@/components/common/Buttons";
import {cn} from "@/lib/utils";

/**
 * Shared closing CTA banner — visual source of truth is the Home page.
 * Keep page-level overrides minimal so typography stays consistent site-wide.
 */
const LargeBannerSection = ({
  largeBanner,
  sectionClassName,
  headingClassName,
  eyebrowClassName,
  bodyClassName,
}: {
  largeBanner: LargeBannerSectionType;
  sectionClassName?: string;
  headingClassName?: string;
  eyebrowClassName?: string;
  bodyClassName?: string;
}) => {
  const hasEyebrow = Boolean(largeBanner.eyebrow?.trim());
  const hasBody = Boolean(largeBanner.body?.trim());
  const hasCta1 = Boolean(largeBanner.cta1?.text?.trim() && largeBanner.cta1?.href?.trim());
  const hasCta2 = Boolean(largeBanner.cta2?.text?.trim() && largeBanner.cta2?.href?.trim());

  return (
    <section
      className={cn(
        "h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] bg-primary-red w-full flex flex-col gap-12 items-center justify-center text-center",
        sectionClassName
      )}
    >
      <div className="flex flex-col gap-8 items-center justify-center w-916/1000 xl:w-888/1000 mx-auto">
        {hasEyebrow && (
          <p className={cn("typo-body2 text-[#FFFFFF9E] uppercase", eyebrowClassName)}>
            {largeBanner.eyebrow}
          </p>
        )}
        <h2
          className={cn(
            "typo-h1 text-[clamp(32px,9.375vw,90px)]! text-[#F4EDE0]!",
            headingClassName
          )}
        >
          {largeBanner.title}
        </h2>
        {hasBody && (
          <p
            className={cn(
              "font-fraunces-italics lg:w-48/100 text-[16px] md:text-[20px] lg:text-[22px] font-semibold! leading-8.25 text-[#F4EDE0E5] whitespace-pre-line",
              bodyClassName
            )}
          >
            {largeBanner.body}
          </p>
        )}
      </div>
      {(hasCta1 || hasCta2) && (
        <div className="flex flex-wrap flex-row gap-4 w-916/1000 xl:w-888/1000 mx-auto justify-center">
          {hasCta2 && (
            <PrimaryButton
              href={largeBanner.cta2.href}
              label={largeBanner.cta2.text}
              btnClassName="bg-[#F4EDE0] text-[#241E19]"
            />
          )}
          {/* Primary CTA kept for CMS parity; design currently shows cta2 only (same as Home). */}
          {/* {hasCta1 && (
            <PrimaryButton
              href={largeBanner.cta1.href}
              label={largeBanner.cta1.text}
              btnClassName="border border-[#F4EDE0] bg-primary-red text-[#F4EDE0]"
            />
          )} */}
        </div>
      )}
    </section>
  );
};

export default LargeBannerSection;
