"use client";

import React, {useState} from 'react';
import type {OurPeopleTeamCardType, OurPeopleTeamSectionType} from "@/types/ourPeople/ourPeople.types";
import {Carousel, CarouselContent, CarouselItem, CarouselTopNav} from "@/components/common/carousel";
import OurTeamCard from "@/components/ourPeople/ourTeamSection/OurTeamCard";
import OurTeamModal from "@/components/ourPeople/ourTeamSection/OurTeamModal";

const OurTeamCarousel = ({cards}: { cards: OurPeopleTeamSectionType['cards'] }) => {
  const [selectedMember, setSelectedMember] = useState<OurPeopleTeamCardType | null>(null);

  return (
    <>
      <div className="w-916/1000 xl:w-888/1000 mx-auto">
        <Carousel options={{align: 'start', containScroll: 'trimSnaps'}}>
          <CarouselTopNav position="top" type='compact' direction='right' className="mb-6 xl:mb-8 px-0" />
          <CarouselContent>
            {cards.map((card, index) => (
              <CarouselItem
                key={index}
                className="min-w-0 shrink-0 grow-0 basis-[calc((100%-10px)/1.2)] sm:basis-[calc((100%-20px)/2.2)] lg:basis-[calc((100%-40px)/3)] flex flex-col pl-2.5 sm:pl-5 first:pl-0"
              >
                <OurTeamCard card={card} onClick={() => setSelectedMember(card)}/>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <OurTeamModal member={selectedMember} onClose={() => setSelectedMember(null)}/>
    </>
  );
};

export default OurTeamCarousel;
