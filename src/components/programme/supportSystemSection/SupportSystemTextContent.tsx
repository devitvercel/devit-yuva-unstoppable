import React from 'react';
import type {SupportSystemSectionType} from "@/types/programme/programme.types";

function SupportSystemTextContent({content}: { content: SupportSystemSectionType }) {
  return (
    <div className="flex flex-col gap-3 relative mb-7 xl:mb-7.5">
      <div className="flex flex-wrap flex-row gap-2.5 items-center">
        <div className="size-1.5 rounded-[1px] bg-primary-red"/>
        <p className="typo-body2 shrink-0 uppercase text-primary-red">{content.heading}</p>
      </div>
      <h2
        className="font-fraunces-italics text-[38px] leading-[110%] tracking-[-0.76px]">{content.title}</h2>
      <div className="flex flex-col">
        {content.body.map((para, index) => (
          <p key={index} className="typo-body4 text-[#5B403E]">{para}</p>
        ))}
      </div>
    </div>
  );
}

export default SupportSystemTextContent;