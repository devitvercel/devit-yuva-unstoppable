import React from 'react';
import Image from "next/image";
import type { VocHeroSectionType } from "@/types/voiceOfChange/voiceOfChange.types";
import { PrimaryButton } from "@/components/common/Buttons";

interface VocHeroSectionProps {
  hero: VocHeroSectionType;
}

const VocHeroSection: React.FC<VocHeroSectionProps> = ({ hero }) => {
  return (
    <section className="relative h-[calc(100vh)] lg:h-[calc(100vh)] flex items-stretch xl:items-center overflow-hidden">
      <Image
        src={hero.img.src}
        alt={hero.img.alt || hero.title1 || "Voice of Change Hero Image"}
        fill
        className="object-cover object-[76%_center] md:object-center"
        priority
      />

      {/* Gradient overlay: dark on left fading to semi-transparent on right */}
      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.61)_60.99%,rgba(0,0,0,0.00)_100%)]" />

      <div className="relative z-10 w-916/1000 xl:w-888/1000 mx-auto flex flex-col justify-between lg:justify-center pt-22 pb-12 lg:py-0">
        {/* Eyebrow + Title — top on mobile, full block on desktop */}
        <div className="flex flex-col gap-5 lg:gap-7 lg:w-[52%] lg:mt-16">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.75 h-1.75 rounded-xs bg-white shrink-0" />
            <p className="font-sans text-[12px] font-bold leading-normal tracking-[2.2px] text-white uppercase">
              {hero.eyebrow}
            </p>
          </div>
          <h1 className="typo-h1 text-white">
            {hero.title1}{" "}
            <span className="text-primary-red italic">{hero.highlightedTitle}</span>
          </h1>
          {/* Desktop: body + button stay in this block */}
          <p className="hidden lg:block typo-body1 text-[17px]! font-medium! leading-7.25! text-[rgba(255,255,255,0.81)] lg:w-[86%]">
            {hero.body}
          </p>
          <div className="hidden lg:block">
            <PrimaryButton href={hero.cta.href} btnClassName="bg-primary-red hover:bg-primary-red/90 text-white w-fit" label={hero.cta.text} />
          </div>
        </div>

        {/* Mobile only: body + button pinned to bottom */}
        <div className="flex flex-col gap-5 lg:hidden">
          <p className="typo-body1 text-[17px]! font-medium! leading-7.25! text-[rgba(255,255,255,0.81)]">
            {hero.body}
          </p>
          <PrimaryButton href={hero.cta.href} btnClassName="bg-primary-red hover:bg-primary-red/90 text-white w-fit" label={hero.cta.text} />
        </div>
      </div>
    </section>
  );
};

export default VocHeroSection;
