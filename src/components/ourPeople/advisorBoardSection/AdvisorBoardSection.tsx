import React from 'react';
import type {OurPeopleAdvisorSectionType} from "@/types/ourPeople/ourPeople.types";
import AdvisorBoardCarousel from "@/components/ourPeople/advisorBoardSection/AdvisorBoardCarousel";

const AdvisorBoardSection = ({advisorBoard}: { advisorBoard: OurPeopleAdvisorSectionType }) => {
  return (
    <section className={"py-16 xl:py-25 flex flex-col gap-12"}>
      <div className="flex flex-col gap-3 items-center justify-center">
        <div className="items-center flex flex-wrap flex-row gap-2.5">
          <div className="size-1.5 bg-primary-red rounded-[1px]"/>
          <p className={"shrink-0 typo-body2 text-primary-red uppercase"}>{advisorBoard.heading}</p>
        </div>
        <h2 className={"text-center typo-h2"}>{advisorBoard.title}</h2>
      </div>
      <AdvisorBoardCarousel advisors={advisorBoard.advisors}/>
    </section>
  );
};

export default AdvisorBoardSection;
