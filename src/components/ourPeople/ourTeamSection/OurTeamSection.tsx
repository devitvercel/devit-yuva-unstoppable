import React from 'react';
import type {OurPeopleTeamSectionType} from "@/types/ourPeople/ourPeople.types";
import OurTeamCarousel from "@/components/ourPeople/ourTeamSection/OurTeamCarousel";

const OurTeamSection = ({ourTeam}: { ourTeam: OurPeopleTeamSectionType }) => {
  return (
    <section className={"py-10 lg:py-12 flex flex-col gap-2 lg:gap-4"}>
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-3 justify-center">
        <div className="flex flex-row flex-wrap gap-2.5 items-center justify-center">
          <div className="size-1.5 rounded-[1px] bg-primary-red"/>
          <p className="shrink-0 typo-body2 text-primary-red">{ourTeam.heading}</p>
        </div>
        <h2 className="typo-h2 text-center">{ourTeam.title}</h2>
      </div>
      <OurTeamCarousel cards={ourTeam.cards}/>
    </section>
  );
};

export default OurTeamSection;
