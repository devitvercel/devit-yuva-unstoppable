import type {UnSdgsNarrativeSectionType} from "@/types/unSdgs/unSdgs.types";

function NarrativeSection({narrative}: {narrative: UnSdgsNarrativeSectionType}) {
  return (
    <section className="bg-[#f7f5f2] py-12 md:py-20 xl:py-30">
      <div className="w-916/1000 xl:w-888/1000 mx-auto px-4 md:px-0 flex flex-col gap-8 lg:flex-row lg:gap-14">
        <div className="flex flex-col gap-3 lg:w-[41%] shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-[1px] bg-primary-red" aria-hidden/>
            <p className="font-dm-sans text-[12px] font-extrabold uppercase tracking-[2.2px] text-primary-red">
              {narrative.heading}
            </p>
          </div>
          <h2 className="font-fraunces-italics text-[clamp(32px,4vw,56px)] leading-[1.15] tracking-[-0.025em] text-[#1a1815]">
            {narrative.titlePlain}
            <span className="text-primary-red">{narrative.titleHighlight}</span>
          </h2>
        </div>
        <div className="flex flex-col gap-5 lg:flex-1">
          <p className="font-sans text-sm md:text-[17px] font-medium leading-[1.78] text-[#6b6761]">
            The{" "}
            <strong className="font-extrabold text-primary-red">
              2030 Agenda for Sustainable Development Goals
            </strong>{" "}
            is the global blueprint adopted by all United Nations Member States in 2015. It serves as a
            shared plan of action to end poverty, protect the planet, and ensure that all people enjoy
            peace and prosperity by the year 2030.
          </p>
          <p className="font-sans text-sm md:text-[17px] font-medium leading-[1.78] text-[#6b6761]">
            At Yuva Unstoppable, we believe that systemic change is only possible when local action is
            aligned with a global vision. We do not view the{" "}
            <strong className="font-extrabold text-primary-red">
              17 Sustainable Development Goals (SDGs)
            </strong>{" "}
            as abstract targets; we view them as the essential benchmarks for the dignity and development
            of the communities we serve.
          </p>
          <p className="font-sans text-sm md:text-[17px] font-medium leading-[1.78] text-[#6b6761]">
            {narrative.paragraphs[2]}
          </p>
        </div>
      </div>
    </section>
  );
}

export default NarrativeSection;
