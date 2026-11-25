import type {WhyPartnerSectionType} from "@/types/programme/programme.types";
import React from "react";
import RevealStagger from "@/components/common/animations/RevealStagger";

function WhyPartnerSection({whyPartner}: { whyPartner: WhyPartnerSectionType }) {
  return (
    <section className={"bg-primary-red py-7.5 xl:py-20"}>
      <div className="flex flex-col gap-7 xl:gap-10 w-916/1000 xl:w-888/1000 mx-auto">
        <RevealStagger className="flex flex-col gap-3">
          <div className="flex flex-wrap flex-row gap-2.5 items-center xl:justify-center">
            <div className="size-1.5 rounded-[1px] bg-white"/>
            <p className="typo-body2 shrink-0 uppercase text-white">{whyPartner.heading}</p>
          </div>
          <div className="flex flex-col gap-2 xl:gap-4 xl:w-7/10 mx-auto">
            <h2 className={"typo-h2 text-white xl:text-center"}>{whyPartner.title}</h2>
            <div className="flex flex-col">
              {whyPartner.body.map((item, index) => (
                <p key={index} className={"typo-body3 text-[#FFFFFFD9] xl:text-center"}>{item}</p>))}
            </div>
          </div>
        </RevealStagger>
        <RevealStagger className={"grid grid-cols-1 lg:grid-cols-3 gap-3 xl:gap-5"}>
          {whyPartner.cards.map(card => (
            <div key={card.id}
                 className={"bg-white h-full rounded-xl p-3 lg:px-5 lg:py-8 flex flex-row lg:flex-col gap-4 lg:gap-12 group transition-all duration-300 xl:hover:-translate-y-2 xl:hover:shadow-[4px_5px_4px_0_rgba(255,255,255,0.51)]"}>
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
      </div>
    </section>
  );
}

export default WhyPartnerSection;