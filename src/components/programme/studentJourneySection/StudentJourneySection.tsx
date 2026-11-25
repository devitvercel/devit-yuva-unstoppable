import type {StudentJourneySectionType} from "@/types/programme/programme.types";
import React from "react";
import RevealStagger from "@/components/common/animations/RevealStagger";

function StudentJourneySection({studentJourney}: { studentJourney: StudentJourneySectionType }) {
  return (
    <section
      className={"py-7.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col lg:flex-row gap-7 justify-between"}>
      <RevealStagger className={"lg:w-40/100 flex flex-col gap-3 xl:gap-4"}>
        <div className="flex flex-wrap flex-row gap-2.5 items-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="typo-body2 shrink-0 uppercase text-primary-red">{studentJourney.heading}</p>
        </div>
        <div className="flex flex-col gap-2 xl:gap-4">
          <h2 className="typo-h3">{studentJourney.title}</h2>
          <p className="typo-body5 text-[#6B6761]">{studentJourney.body}</p>
        </div>
      </RevealStagger>
      <RevealStagger className={"lg:w-1/2 flex flex-col gap-3 xl:gap-4"}>
        {studentJourney.card.map(card => (
          <div
            className={"p-3 xl:py-4.5 xl:px-5 flex flex-row gap-4 items-center border border-[#1A18152E] rounded-xl"}
            key={card.id}>
            <div className="shrink-0">
              <p className={"font-fraunces-italics text-primary-red text-[28px]"}>{card.id}</p>
            </div>
            <div className="flex-1 flex flex-col gap-1">
              <p className={"typo-body5 font-bold! text-[#1A1815]"}>{card.title}</p>
              <p className={"typo-body5 text-[12px]! text-[#6B6761]"}>{card.body}</p>
            </div>
            <div className="hidden xl:block shrink-0">
              <card.icon/>
            </div>
          </div>
        ))}
      </RevealStagger>
    </section>
  );
}

export default StudentJourneySection;