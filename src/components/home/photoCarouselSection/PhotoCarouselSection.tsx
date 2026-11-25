import React from "react";
import type { PhotoCarouselSectionType } from "@/types/home/home.types";
import { PrimaryButton } from "@/components/common/Buttons";
import { ArrowRightIcon } from "lucide-react";
import Image from "next/image";
import PhotoCarouselClient from "./PhotoCarouselClient";

// The 4 size classes for the image strip (largest → smallest, left to right)
const imageClasses = [
  "w-[68px] h-[71px] xl:w-42.75 xl:h-41.5", // active / most recent: largest
  "w-[54px] h-[56px] xl:w-[113px] xl:h-[110px]",
  "w-[50px] h-[48px] xl:w-[73px] xl:h-[71px]",
  "w-[48px] h-[42px] xl:w-[60px] xl:h-[59px]", // oldest: smallest
];

const PhotoCarouselSection = ({
  photoCarousel,
}: {
  photoCarousel: PhotoCarouselSectionType;
}) => {
  const items = photoCarousel.carouselContent;

  const backgrounds = items.map((item, idx) =>
    item.bgImg?.src ? (
      <Image
        key={idx}
        src={item.bgImg.src}
        alt={item.bgImg.alt || item.title || "Photo Carousel Slide Background"}
        fill
        sizes="100vw"
        className="w-full h-full object-cover"
        priority={idx === 0}
        loading={idx === 0 ? "eager" : "lazy"}
      />
    ) : (
      <div key={idx} className="w-full h-full bg-stone-800" />
    ),
  );

  const textBlocks = items.map((item, idx) => (
    <div key={idx} className="flex flex-col gap-4">
      {item.eyebrow ? (
        <p className="typo-body2 text-[#E2A132] uppercase">{item.eyebrow}</p>
      ) : null}
      {item.heading ? (
        <p className="typo-h4 text-[#E2A132] font-fraunces-italics text-[20px]! lg:text-[22px]!">
          {item.heading}
        </p>
      ) : null}
      {item.subHeading ? (
        <p className="typo-body2 text-[#E2A132B2] uppercase">
          {item.subHeading}
        </p>
      ) : null}
      <h3 className="typo-h2 text-[#F4EDE0] xl:line-clamp-3">{item.title}</h3>
      <p className="typo-body4 text-[#F4EDE0E5] xl:line-clamp-5">{item.body}</p>
      <div className="flex gap-4">
        <PrimaryButton
          // href={item.cta.href}
          // label={item.cta.text}
          href="/voice-of-change"
          label="More such stories"
          btnClassName="bg-transparent font-semibold! border border-[#F4EDE0] text-[#F4EDE0] w-fit"
          rightIcon={
            <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          }
        />
        <PrimaryButton
          href={item.cta.href}
          label={item.cta.text}
          btnClassName="bg-transparent font-semibold! border border-[#F4EDE0] text-[#F4EDE0] w-fit"
          rightIcon={
            <ArrowRightIcon className="size-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          }
        />
      </div>
    </div>
  ));

  const thumbnails = items.map((item, idx) =>
    item.img?.src ? (
      <Image
        key={idx}
        src={item.img.src}
        alt={item.img.alt || item.title || "Photo Carousel Slide Thumbnail"}
        width={171}
        height={166}
        loading="lazy"
        sizes="(max-width: 1280px) 68px, 171px"
        className="w-full h-full object-cover"
      />
    ) : (
      <div key={idx} className="w-full h-full bg-stone-700" />
    ),
  );

  return (
    <section className="flex flex-col">
      {photoCarousel.title || photoCarousel.body || photoCarousel.eyebrow ? (
        <div className="w-916/1000 xl:w-888/1000 mx-auto pt-10 xl:pt-20 pb-8 xl:pb-12">
          <div className="flex flex-col gap-3.5 xl:flex-row xl:gap-12 xl:items-end">
            <div className="flex-1 flex flex-col gap-3">
              {photoCarousel.eyebrow ? (
                <p className="typo-body2 text-primary-red uppercase">
                  {photoCarousel.eyebrow}
                </p>
              ) : null}
              {photoCarousel.title ? (
                <h2 className="typo-h2 text-[#241E19]">
                  {photoCarousel.title}
                </h2>
              ) : null}
            </div>
            {photoCarousel.body ? (
              <div className="flex-1 flex xl:items-end">
                <p className="typo-body3 text-[#3A312A] xl:w-85/100">
                  {photoCarousel.body}
                </p>
              </div>
            ) : null}
          </div>
        </div>
      ) : null}

      <PhotoCarouselClient
        count={items.length}
        backgrounds={backgrounds}
        textBlocks={textBlocks}
        thumbnails={thumbnails}
        imageClasses={imageClasses}
      />
    </section>
  );
};

export default PhotoCarouselSection;
