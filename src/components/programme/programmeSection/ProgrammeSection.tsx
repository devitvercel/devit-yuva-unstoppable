import React from 'react';
import type { ProgrammeInfoSectionType } from "@/types/programme/programme.types";

const ProgrammeSection = ({ programme }: { programme: ProgrammeInfoSectionType }) => {
  return (
    <section
      className={"py-8 md:py-14 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-7 xl:flex-wrap xl:flex-row"}
    >
      <div className="flex-1 flex flex-col gap-7">
        <div className="flex flex-wrap flex-row gap-2.5 items-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="typo-body2 shrink-0 uppercase text-primary-red">
            {programme?.heading || ""}
          </p>
        </div>
        <h2 className="typo-h2 text-[clamp(32px,23.55px+2.25vw,56px)] not-italic">
          {programme?.title || ""}
        </h2>
      </div>
      <div className="flex-1 flex flex-col gap-4.5 justify-end">
        {(programme?.body || []).map((para, index) => (
          <p className="typo-body4 text-[#5B403E] h-fit" key={index}>
            {para}
          </p>
        ))}
      </div>
    </section>
  );
};

export default ProgrammeSection;