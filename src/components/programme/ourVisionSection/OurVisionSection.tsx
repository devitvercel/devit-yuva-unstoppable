import React from 'react';
import type {OurVisionSectionType} from "@/types/programme/programme.types";
import RevealStagger from "@/components/common/animations/RevealStagger";

function OurVisionSection({ourVision}: { ourVision: OurVisionSectionType }) {
  return (
    <section className={"py-7.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-7 xl:gap-10.5"}>
      <RevealStagger className="flex flex-col gap-3 xl:gap-4.5 pb-6 border-b border-[#1A18152E]">
        <div className="flex flex-wrap flex-row gap-2.5 items-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="typo-body2 shrink-0 uppercase text-primary-red">{ourVision.heading}</p>
        </div>
        <div className="flex flex-col xl:flex-row gap-2 xl:gap-16 justify-between">
          <div className="xl:w-48/100">
            <h2 className="typo-h2">{ourVision.title}</h2>
          </div>
          <div className="xl:w-48/100">
            <p className="typo-body1 text-[#6B6761]">{ourVision.body}</p>
          </div>
        </div>
      </RevealStagger>
      <RevealStagger className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:gap-4">
        {ourVision.cards.map(card => (
          <div key={card.id}
               className={"bg-white rounded-xl border border-[#1A18152E] h-full hover:border-primary-red hover:shadow-[0_3px_7.8px_0_rgba(0,0,0,0.21)] transition-all duration-300 p-3.5 lg:px-7 lg:py-8 flex flex-row lg:flex-col gap-4 group"}>
            <div className="shrink-0">
              <p
                className={"typo-h2 xl:group-hover:text-primary-red text-primary-red xl:text-transparent xl:[-webkit-text-stroke:1.5px_#CE2028] transition-colors duration-300"}>{card.id}</p>
            </div>
            <div className="flex-1 flex flex-col gap-1 lg:gap-3">
              <p className={"typo-h4 text-[clamp(16px,0.868rem+0.56vw,22px)]"}>{card.title}</p>
              <p className={"typo-body5 text-[#6B6761]"}>{card.body}</p>
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

export default OurVisionSection;