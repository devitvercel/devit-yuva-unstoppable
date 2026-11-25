import React from 'react';
import type {WhatWeDoSectionType} from "@/types/home/home.types";
import ProgramCard from "@/components/common/program/ProgramCard";

const WhatWeDoSection = ({whatWeDo}: { whatWeDo: WhatWeDoSectionType }) => {
  return (
    <section className={"py-10 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-8"}>
      <div className="flex flex-col lg:flex-wrap lg:flex-row gap-5.5 lg:gap-12 lg:items-end">
        <div className="flex-1 flex flex-col gap-4">
          <p className={"typo-body2 uppercase text-primary-red"}>{whatWeDo.eyebrow}</p>
          {/* <h2 className="typo-h2">{whatWeDo.title.split(".")[0]}.<br/>{whatWeDo.title.split(".")[1]}
          </h2> */}
        </div>
        {/* <div className="flex-1">
          <p className={"typo-body3 text-[#3A312A]"}>{whatWeDo.body}</p>
        </div> */}
      </div>
      <ProgramCard programmes={whatWeDo.programmes}/>
    </section>
  );
};

export default WhatWeDoSection;
