import React from "react";
import type {OurVisionSectionType} from "@/types/ourVision/ourVision.types";
import Reveal from "@/components/common/animations/Reveal";
import {PillarCard, PillarGrid, PillarLabel} from "@/components/common/pillar";

const OurVisionSection = ({
  ourVision,
}: {
  ourVision: OurVisionSectionType;
}) => {
  return (
    <section
      className={
        "flex flex-col gap-10 xl:gap-18 w-916/1000 xl:w-888/1000 mx-auto py-5 md:py-15 lg:py-22.5 xl:py-30"
      }
    >
      <Reveal>
        <div className="flex flex-col xl:flex-wrap xl:flex-row gap-3 xl:gap-16 xl:pb-16 xl:border-b xl:border-[#1A18152E]">
          <div className="flex-1 flex flex-col gap-3 xl:gap-4.5">
            <div className="flex flex-wrap flex-row gap-2.5 items-center">
              <div className="size-1.5 bg-primary-red rounded-[1px]" />
              <p className="shrink-0 typo-body2 uppercase text-primary-red">
                {ourVision.heading}
              </p>
            </div>
            <h2 className="typo-h2">{ourVision.title}</h2>
          </div>
          <div className="flex-1 flex flex-col justify-end">
            {ourVision.body.map((para, index) => (
              <p
                className="typo-body4 text-[14px]! md:text-[16px]! lg:text-[18px]! text-[#6B6761]"
                key={index}
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </Reveal>

      <div className="flex flex-col gap-5 xl:gap-7">
        <Reveal>
          <PillarLabel>KEY PILLARS OF OUR VISION</PillarLabel>
        </Reveal>

        <PillarGrid>
          {ourVision.pillars.map((pillar) => (
            <PillarCard
              key={pillar.id}
              number={`0${pillar.id}`}
              title={pillar.title}
              body={pillar.body}
              fixedTitleHeight={false}
            />
          ))}
        </PillarGrid>
      </div>
    </section>
  );
};

export default OurVisionSection;
