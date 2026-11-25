import React from 'react';
import type {ProgrammeLargeBannerSectionType} from "@/types/programme/programme.types";
import Image from "next/image";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowRightIcon} from "lucide-react";

const ProgrammeLargeBannerSection = ({programmeLargeBanner}: {
  programmeLargeBanner: ProgrammeLargeBannerSectionType
}) => {
  return (
    <section className={"h-fit py-7.5 xl:py-28 relative w-full"}>
      <Image
        src={programmeLargeBanner.img.src}
        alt={programmeLargeBanner.img.alt || programmeLargeBanner.title || "Programme Large Banner Image"}
        fill
        loading="lazy"
        sizes="100vw"
        className={"object-cover"}
      />
      <div
        className="bg-[linear-gradient(180deg,rgba(206,32,40,0.00)_0%,rgba(206,32,40,0.48)_57.99%)] absolute z-1 top-0 left-0 h-full w-full"/>
      <div
        className="relative z-2 flex flex-col gap-4 xl:gap-2.5 h-full justify-center w-916/1000 xl:w-888/1000 mx-auto">
        <div className="flex flex-col gap-3 xl:gap-5.5">
          <div className="flex flex-wrap flex-row gap-2.5 items-center">
            <div className="size-1.5 rounded-[1px] bg-white"/>
            <p className="typo-body2 shrink-0 uppercase text-white">{programmeLargeBanner.heading}</p>
          </div>
          <h2 className="typo-h1 xl:text-[92px] text-white xl:w-7/10">{programmeLargeBanner.title}</h2>
          <p className="typo-body1 font-semibold! text-[#FFFFFFD9]">{programmeLargeBanner.body}</p>
        </div>
        <div className="flex flex-row flex-wrap gap-3.5">
          <PrimaryButton href="/volunteer" label={programmeLargeBanner.cta2.title}
                         rightIcon={<ArrowRightIcon/>}
                         btnClassName={"bg-white text-primary-red"}
          />
          {/* <PrimaryButton href="/volunteer" label={programmeLargeBanner.cta2.title}
                         btnClassName={"bg-transparent border border-[#FFFFFF80]"}
          /> */}
        </div>
      </div>
    </section>
  );
};

export default ProgrammeLargeBannerSection;
