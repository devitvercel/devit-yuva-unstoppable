import React from 'react';
import type {CareersOurValuesSectionType} from "@/types/careers/careers.types";
import RevealStagger from "@/components/common/animations/RevealStagger";
import {cn} from "@/lib/utils";

function OurValuesSection({ourValues}: { ourValues: CareersOurValuesSectionType }) {
  return (
    <section className={"py-14 xl:py-25 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-16"}>
      <RevealStagger>
        <div className="flex flex-col gap-4">
          <div className="flex flex-row flex-wrap gap-2.5 items-center">
            <div className="bg-primary-red size-1.5 rounded-[1px]"/>
            <p className="typo-body2 text-primary-red uppercase shrink-0">{ourValues.heading}</p>
          </div>
          <div className="flex flex-col xl:flex-row gap-6 xl:gap-16">
            <div className="flex-1">
              <h2 className={"typo-h2 xl:not-italic"}>
                {ourValues.title}{" "}
                <span className={"text-primary-red"}>{ourValues.highlightedTitle}</span>
              </h2>
            </div>
            <div className="xl:w-51/100">
              <p className={"typo-body3 text-[#6B6761]"}>{ourValues.body}</p>
            </div>
          </div>
        </div>
      </RevealStagger>
      <RevealStagger className={"flex flex-col"}>
        {ourValues.values.map((value, index) => (
          <div
            className={cn("flex flex-col xl:flex-row py-6 gap-2 xl:items-center xl:gap-10 border-b border-[#E8DDD0]", index == 0 && "border-t")}
            key={index}>
            <p className={"xl:w-1/40 text-primary-red typo-h3 text-[clamp(32px,0.56vw+1.76rem,36px)]"}>{index + 1}</p>
            <p className={"flex-1 text-[24px]! typo-h3"}>{value.title}</p>
            <p className={"xl:w-65/100 text-[#6B6761] typo-body3"}>{value.body}</p>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

export default OurValuesSection;