"use client";

import React, {useState} from 'react';
import type {OurPeopleAdvisorCardType, OurPeopleAdvisorSectionType} from "@/types/ourPeople/ourPeople.types";
import {Carousel, CarouselContent, CarouselItem, CarouselTopNav} from "@/components/common/carousel";
import AdvisorBoardCard from "@/components/ourPeople/advisorBoardSection/AdvisorBoardCard";
import OurTeamModal from "@/components/ourPeople/ourTeamSection/OurTeamModal";

const AdvisorBoardCarousel = ({advisors}: { advisors: OurPeopleAdvisorSectionType['advisors'] }) => {
  const [selectedAdvisor, setSelectedAdvisor] = useState<OurPeopleAdvisorCardType | null>(null);

  return (
    <>
      <Carousel options={{align: 'start', containScroll: 'trimSnaps'}} className="">
        <CarouselTopNav position="top" type='compact' direction='right' className="mb-6 xl:mb-8" />
        <CarouselContent containerClassName="xl:ms-[5.6%] xl:mr-[5.6%] mr-[4.2%]">
          {advisors.map((card, index) => (
            <CarouselItem
              key={index}
              className="min-w-0 shrink-0 grow-0 basis-[calc((100%-10px)/1.2)] sm:basis-[calc((100%-20px)/2.2)] md:basis-[calc((100%-40px)/2.5)] lg:basis-[calc((100%-60px)/3)] xl:basis-[calc((100%-80px)/4)] flex flex-col pl-2.5 md:pl-5"
            >
              <AdvisorBoardCard card={card} onClick={() => setSelectedAdvisor(card)}/>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <OurTeamModal member={selectedAdvisor} onClose={() => setSelectedAdvisor(null)}/>
    </>
  );
};

export default AdvisorBoardCarousel;
