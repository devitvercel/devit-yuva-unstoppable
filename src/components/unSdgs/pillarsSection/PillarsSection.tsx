import type {UnSdgsPillarsSectionType} from "@/types/unSdgs/unSdgs.types";
import PillarBlock from "./PillarBlock";

function PillarsSection({pillars}: {pillars: UnSdgsPillarsSectionType}) {
  return (
    <section className="bg-white px-4 md:px-10 xl:px-20">
      <div className="w-916/1000 xl:w-888/1000 mx-auto pt-12 md:pt-20 xl:pt-25">
        <div className="mx-auto flex max-w-[780px] flex-col items-center gap-6 text-center">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-[1px] bg-primary-red" aria-hidden/>
            <p className="font-dm-sans text-[12px] font-extrabold uppercase tracking-[2.2px] text-primary-red">
              {pillars.heading}
            </p>
          </div>
          <h2 className="font-fraunces-italics text-[clamp(32px,4vw,56px)] leading-[1.15] tracking-[-0.025em] text-[#1a1815]">
            {pillars.titlePlain}
            <span className="text-primary-red">{pillars.titleHighlight}</span>
          </h2>
          <p className="font-sans text-base font-medium leading-[1.7] text-[#6b6761] md:text-[17px]">
            {pillars.body}
          </p>
        </div>

        <div className="mt-12 md:mt-16 lg:mt-24">
          {pillars.pillars.map((pillar, index) => (
            <PillarBlock key={index} pillar={pillar}/>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PillarsSection;
