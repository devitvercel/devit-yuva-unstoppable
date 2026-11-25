import React from "react";
import Image from "next/image";
import type {OurStoryHeroSectionType} from "@/types/ourStory/ourStory.types";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowDown} from "lucide-react";

interface OurStoryHeroSectionProps {
  hero: OurStoryHeroSectionType;
}

const OurStoryHeroSection: React.FC<OurStoryHeroSectionProps> = ({hero}) => {
  return (
    <section
      className="relative h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] mt-16.25 xl:mt-19.5 flex items-center overflow-hidden">
      <Image
        src={hero.img.src}
        alt={hero.img.alt || "Yuva Unstoppable Our Story Hero Image"}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[76%_center] md:object-top"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.70)_55%,rgba(0,0,0,0.35)_100%)]"/>

      <div
        className="relative z-10 w-full xl:w-888/1000 mx-auto flex flex-col items-center justify-end lg:justify-center pb-14 lg:pb-0 lg:mt-16 text-center">
        <div className="flex flex-col items-center gap-5 lg:gap-7">
          {/* Eyebrow */}
          <div className="flex items-center gap-2.5">
            <span className="inline-block w-2 h-2 rounded-xs bg-white shrink-0"/>
            <p className="font-sans text-[11px] font-bold leading-normal tracking-[2.2px] text-white uppercase">
              {hero.eyebrow}
            </p>

          </div>

          {/* Title */}
          <h1 className="w-916/1000 mx-auto xl:w-full typo-h1 text-primary-red ">
            {hero.title1}{" "}
            <span className="text-white">{hero.highlightedTitle}</span>
          </h1>

          {/* Body — desktop */}
          <p
            className="block typo-body4 text-[#FFFFFFD9] w-916/1000 mx-auto xl:w-7/10">
            {hero.body}
          </p>

          {/* CTAs — desktop */}
          <div className="flex flex-wrap justify-center gap-3 xl:gap-4">
            <PrimaryButton
              href={hero.cta1.href}
              btnClassName="bg-primary-red text-white px-8 py-3 xl:px-9 xl:py-4.5"
              rightIcon={<ArrowDown/>}
              label={hero.cta1.text}
            />
            <PrimaryButton
              href={hero.cta2.href}
              btnClassName="bg-transparent border border-primary-red text-white px-8 py-3 xl:px-9 xl:py-4.5"
              label={hero.cta2.text}
            />
          </div>
        </div>

        {/* Mobile: body + CTAs pinned to bottom */}
        {/*<div className="flex flex-col items-center xl:gap-5 lg:hidden mt-5">*/}
        {/*  <p className="font-work-sans text-[18px] font-medium leading-[28.8px] text-[rgba(255,255,255,0.85)]">*/}
        {/*    {hero.body}*/}
        {/*  </p>*/}
        {/*  <div className="flex flex-wrap justify-center gap-4">*/}
        {/*    <PrimaryButton*/}
        {/*      href={hero.cta1.href}*/}
        {/*      btnClassName="bg-primary-red text-white"*/}
        {/*      label={hero.cta1.text}*/}
        {/*    />*/}
        {/*    <PrimaryButton*/}
        {/*      href={hero.cta2.href}*/}
        {/*      btnClassName="bg-transparent border border-white text-white"*/}
        {/*      label={hero.cta2.text}*/}
        {/*    />*/}
        {/*  </div>*/}
        {/*</div>*/}
      </div>
    </section>
  );
};

export default OurStoryHeroSection;
