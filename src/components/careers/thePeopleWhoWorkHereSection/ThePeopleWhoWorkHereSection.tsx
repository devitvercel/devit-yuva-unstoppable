import React from 'react';
import type {CareersThePeopleWhoWorkHereSectionType} from "@/types/careers/careers.types";
import {parseStatNumber} from "@/lib/utils";
import CountUp from "@/components/common/CountUp";

interface ThePeopleWhoWorkHereSectionProps {
  thePeopleWhoWorkHere: CareersThePeopleWhoWorkHereSectionType;
}

function ThePeopleWhoWorkHereSection({thePeopleWhoWorkHere}: ThePeopleWhoWorkHereSectionProps) {
  return (
    <section
      className="py-14 xl:py-20 bg-[linear-gradient(178deg,rgba(232,227,228,0.27)_2.09%,rgba(160,4,22,0.27)_98.25%)]">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-4 xl:gap-12">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row flex-wrap gap-2.5 items-center justify-center">
            <div className="bg-primary-red size-1.5 rounded-[1px]"/>
            <p className="typo-body2 text-primary-red uppercase shrink-0">{thePeopleWhoWorkHere.heading}</p>
          </div>
          <h2 className={"typo-h2 font-fraunces-italics text-center"}>
            {thePeopleWhoWorkHere.title}{" "}
            <span className={"text-primary-red"}>{thePeopleWhoWorkHere.highlightedTitle}</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 xl:grid-cols-3">
          {thePeopleWhoWorkHere.stats.map((stat, index) => {
            const {prefix, value, suffix, hasSeparator} = parseStatNumber(stat.number);
            return (
              <div key={index}
                   className={"flex flex-col border-b last:border-0 xl:border-b-0 xl:border-r border-white xl:border-[#E8DDD0] py-8 xl:py-0 xl:px-10 w-[calc(100%-80px)] xl:w-full items-center justify-center gap-3.5 mx-auto"}>
                <p className="typo-h1 text-primary-red text-[clamp(32px,4.51vw+0.94rem,80px)] text-center">
                  {prefix ? <span>{prefix}</span> : null}
                  <CountUp to={value} separator={hasSeparator ? "," : ""} />
                  <span className="text-[clamp(32px,0.56vw+1.87rem,38px)]">{suffix}</span>
                </p>
                <p className={"typo-body3 text-primary-red font-semibold! text-center"}>{stat.title}</p>
                <p className="typo-body5 text-[#6B6761] text-center">{stat.body}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  );
}

export default ThePeopleWhoWorkHereSection;