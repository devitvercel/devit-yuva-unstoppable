import React from 'react';
import type {ContactHeroSectionType} from "@/types/contact/contact.types";
import Image from "next/image";

interface HeroSectionProps {
  hero: ContactHeroSectionType;
}

const HeroSection: React.FC<HeroSectionProps> = ({hero}) => {
  return (
    <section className="h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] mt-16.25 xl:mt-19.5 flex relative">
      {hero.bgImg?.src && (
        <Image
          src={hero.bgImg.src}
          alt={hero.bgImg.alt || "Contact Hero Image"}
          fill
          className="absolute z-0 top-0 right-0 object-cover"
        />
      )}
      <div
        className="bg-[linear-gradient(0deg,rgba(0,0,0,0.59)_0%,rgba(0,0,0,0.59)_100%)] z-1 absolute top-0 left-0 h-full w-full object-bottom"/>
      <div
        className="relative z-2 h-full w-916/1000 xl:w-888/1000 mx-auto gap-4 xl:gap-0 flex flex-col items-center justify-center">
        <div className="flex flex-row flex-wrap gap-2.5 items-center">
          <div className="bg-primary-red size-1.5 rounded-[1px]"/>
          <p className="typo-body2 text-primary-red uppercase shrink-0">{hero.heading}</p>
        </div>
        <h1 className="typo-h1 text-white text-center">
          {hero.title}{" "}
          <span className="text-primary-red">{hero.highlightedTitle}</span>
        </h1>
        <p className="typo-body4 text-[#FFFFFFD9] xl:w-7/10 text-center">{hero.body}</p>
      </div>
    </section>
  );
};

export default HeroSection;