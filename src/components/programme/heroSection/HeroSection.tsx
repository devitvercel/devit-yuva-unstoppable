import React from 'react';
import type {ProgrammeHeroSectionType} from "@/types/programme/programme.types";
import Image from "next/image";
import {DecorativeRingFilled, WhiteDottedBlob} from "../../../../public/SVGs/svg";

const HeroSection = ({hero}: { hero: ProgrammeHeroSectionType }) => {
  return (
    <section className={"h-[calc(100vh-65px)] xl:h-[calc(100vh-78px)] mt-16.25 xl:mt-19.5 w-full bg-primary-red"}>
      <div
        className="w-916/1000 mx-auto h-full items-center flex flex-col justify-center xl:justify-start xl:flex-wrap xl:flex-row gap-5 xl:gap-9.5">
        <div className="xl:w-42/100 flex flex-col gap xl:gap-7">
          <h1 className="typo-h1 text-white">{hero.title}</h1>
          {hero.body && (<p className={"typo-body1 text-[#FFFFFFE0]! xl:w-9/10"}>{hero.body}</p>)}
        </div>
        <div className="flex-0 shrink-0 xl:flex-1 h-full flex justify-center items-center">
          <div className="relative">
            <Image
              src={hero.img.src}
              alt={hero.img.alt || hero.title || "Programme banner"}
              width={719}
              height={483}
              priority
              sizes="(max-width: 1280px) 100vw, 719px"
              className="w-full xl:h-auto h-98 object-cover xl:aspect-719/483 rounded-md relative z-2"
            />
            <div className="absolute -top-4.5 -left-4.5 bg-[#F2D8D9] rounded-md xl:block hidden w-full h-full z-1"/>
            <DecorativeRingFilled className={"absolute -bottom-16.25 -right-16.25 xl:block hidden"}/>
            <WhiteDottedBlob className={"absolute -left-20 -top-26 xl:block hidden"}/>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
