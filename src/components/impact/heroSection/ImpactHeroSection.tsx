import React from "react";
import Image from "next/image";
import type { ImpactHeroSectionType } from "@/types/impact/impact.types";

interface ImpactHeroSectionProps {
  hero: ImpactHeroSectionType;
}

const ImpactHeroSection: React.FC<ImpactHeroSectionProps> = ({ hero }) => {
  return (
    <section className="w-full xl:h-screen  bg-white py-16 ">
      <div className="w-916/1000 xl:w-888/1000  mx-auto mt-16 grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-26 items-center">
        {/* Left: text content */}
        <div className="flex flex-col gap-6">
          <h1 className="typo-h1  max-w-xl text-[#241E19]">
            {hero.title1}
            <br />
            <span className="text-primary-red">{hero.highlightedTitle}</span>
          </h1>
          <p className="font-sans text-[17px] font-medium leading-7.25 text-[#6B6761]">
            {hero.body}
          </p>
        </div>

        {/* Right: image with validation card */}
        <div className="relative rounded-2xl overflow-hidde aspect-[4/3] lg:aspect-auto lg:h-[420px] xl:h-[440px]">
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
            <Image
            src={hero.img.src}
            alt={hero.img.alt || hero.title1 || "Impact Hero Image"}
            fill
            className="object-cover object-center"
            priority
          />
        </div>
          {/* Validation card overlay */}
          {/* <div className="absolute -bottom-9  xl:-bottom-7 left-4 xl:-left-7 bg-[#1A1815] rounded-lg shadow-[0_12px_32px_0_rgba(0,0,0,0.24)] px-5 py-5 flex flex-col gap-3 max-w-55  lg:max-w-62.5">
            <p className="font-dm-sans text-[10px] font-semibold leading-normal tracking-[2px] text-[rgba(255,255,255,0.45)] uppercase">
              {hero.validationCard.eyebrow}
            </p>
            <p className="font-fraunces-italics text-[15px] xl:text-[17px]! font-semibold! leading-[1.35]! text-white">
              {hero.validationCard.title}
            </p>
            <div className="border-t border-[rgba(255,255,255,0.15)]" />
            <p className="font-work-sans text-[11px] lg:text-[12px] font-medium leading-normal text-[rgba(255,255,255,0.4)] uppercase tracking-[1.2px]">
              {hero.validationCard.label}
            </p>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default ImpactHeroSection;
