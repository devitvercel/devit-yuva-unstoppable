"use client";

import {useState} from "react";
import type {LifeAtYuvaFeaturedMemberType, LifeAtYuvaStandWithUsSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";
import {Carousel, CarouselContent, CarouselItem, CarouselTopNav} from "@/components/common/carousel";
import {CompactTeamCard, FeaturedTeamCard} from "./StandWithUsCards";
import StandWithUsModal from "./StandWithUsModal";

function StandWithUsSection({
  standWithUs,
}: {
  standWithUs: LifeAtYuvaStandWithUsSectionType;
}) {
  const [selectedMember, setSelectedMember] = useState<LifeAtYuvaFeaturedMemberType | null>(null);

  const slides = [
    ...standWithUs.featured.map((member) => ({type: "featured" as const, member})),
    ...standWithUs.members.map((member) => ({type: "compact" as const, member})),
  ];

  return (
    <>
      <section className="bg-[#FDFBF7] py-16 xl:py-25 flex flex-col gap-12 overflow-hidden">
        <div className="flex flex-col gap-3 items-center justify-center px-5">
          <div className="items-center flex flex-wrap flex-row gap-2.5">
            <div className="size-1.5 bg-primary-red rounded-[1px]" />
            <p className="shrink-0 typo-body2 text-primary-red uppercase">
              {standWithUs.heading}
            </p>
          </div>
          <h2 className="text-center typo-h2">{standWithUs.title}</h2>
        </div>

        <Carousel options={{align: "start", containScroll: "trimSnaps"}}>
          <CarouselTopNav position="top" type='compact' direction='right' className="mb-6 xl:mb-8" />
          <CarouselContent containerClassName="xl:ms-[5.6%] xl:mr-[5.6%] mr-[4.2%]">
            {slides.map((slide, index) => (
              <CarouselItem
                key={`${slide.type}-${index}`}
                className="min-w-0 shrink-0 grow-0 basis-[calc((100%-10px)/1.2)] sm:basis-[calc((100%-20px)/2.2)] md:basis-[calc((100%-40px)/2.5)] lg:basis-[calc((100%-60px)/3)] xl:basis-[calc((100%-80px)/4)] flex flex-col pl-2.5 md:pl-5"
              >
                {slide.type === "featured" ? (
                  <FeaturedTeamCard
                    member={slide.member}
                    onReadMoreClick={() => setSelectedMember(slide.member)}
                  />
                ) : (
                  <CompactTeamCard member={slide.member} />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </section>
      <StandWithUsModal member={selectedMember} onClose={() => setSelectedMember(null)} />
    </>
  );
}

export default StandWithUsSection;
