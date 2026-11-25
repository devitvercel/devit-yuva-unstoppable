import React from 'react';
import type {CareersWhyYuvaSectionType} from "@/types/careers/careers.types";
import Image from "next/image";

interface WhyYuvaSectionProps {
  whyYuva: CareersWhyYuvaSectionType;
}

function WhyYuvaSection({whyYuva}: WhyYuvaSectionProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-0 pb-14 xl:pb-0 bg-white">
      <div className="relative w-full h-auto aspect-square xl:aspect-auto xl:h-screen">
        <Image
          src={whyYuva.img.src}
          alt={whyYuva.img.alt || whyYuva.imgText || "Why work at Yuva"}
          width={800}
          height={800}
          loading="lazy"
          sizes="(max-width: 1024px) 100vw, 50vw"
          className={"w-full h-full object-cover"}
        />
        <div className={"absolute bottom-9.5 left-7 flex flex-row items-center gap-3 z-2"}>
          <div className={"w-6 h-0.5 bg-[#FFFFFF66]"}/>
          <p className={"typo-body2 text-[#FFFFFF66] uppercase flex-1"}>{whyYuva.imgText}</p>
        </div>
      </div>
      <div className="w-916/1000 mx-auto xl:w-full xl:px-18 flex flex-col justify-center gap-6">
        <div className="flex flex-row flex-wrap gap-2.5 items-center">
          <div className="bg-primary-red size-1.5 rounded-[1px]"/>
          <p className="typo-body2 text-primary-red uppercase shrink-0">{whyYuva.heading}</p>
        </div>
        <h2 className={"typo-h2"}>
          {whyYuva.title.split(".")[0]}.<br/>
          {whyYuva.title.split(".")[1]}{" "}<span className={"text-primary-red"}>{whyYuva.highlightedTitle}</span>
        </h2>
        <p className={"typo-body1 text-[16px] text-[#6B6761]"}>
          {whyYuva.body1}
          {" "}<strong className={"font-extrabold!"}>{whyYuva.highlightedBody}</strong>{" "}
          {whyYuva.body2}
        </p>
      </div>
    </section>
  );
}

export default WhyYuvaSection;