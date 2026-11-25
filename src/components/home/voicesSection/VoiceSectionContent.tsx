'use client'

import {VoicesSectionType} from "@/types/home/home.types";
import {
  CarouselContent,
  CarouselItem,
  CarouselNextButton,
  CarouselPrevButton,
  useCarousel
} from "@/components/common/carousel";
import {QuoteMarkIcon, TerracottaBlob, TerracottaDottedBlob} from "../../../../public/SVGs/svg";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";

const VoicesSectionContent = ({voices}: {voices: VoicesSectionType}) => {
  const {selectedIndex, emblaApi} = useCarousel();
  const multiVoice = voices.voices.length > 1;

  return (
    <div className="flex flex-col gap-2 xl:gap-3">
      <div className="flex flex-col gap-5 xl:flex-row xl:flex-wrap xl:gap-10 xl:items-center">
        <div className="xl:flex-1 min-w-0 flex flex-col gap-4 xl:gap-5 order-2 xl:order-1">
          <div className={cn("xl:pe-7.5", multiVoice ? "px-15" : "xl:block")}>
            <QuoteMarkIcon />
          </div>
          <CarouselContent className="w-full">
            {voices.voices.map((voice, idx) => (
              <CarouselItem
                key={idx}
                className={cn(
                  "basis-full min-w-0 shrink-0 grow-0",
                  multiVoice ? "px-5 xl:px-15" : "px-0"
                )}
              >
                <div className="flex flex-col gap-5 xl:gap-6">
                  <div className="flex flex-col gap-4 xl:gap-5">
                    {voice.tag ? (
                      <div className="bg-[#BF5A3C14] w-fit rounded-sm py-1.5 px-3">
                        <span className="typo-body2 text-[#8A3A25] font-bold!">
                          {voice.tag}
                        </span>
                      </div>
                    ) : null}
                    <div>
                      <h3 className="typo-h3">{voice.body}</h3>
                    </div>
                  </div>
                  <div className="flex flex-wrap flex-row gap-5 items-center">
                    <div className="w-10 h-0.5 bg-primary-red" />
                    <div className="flex flex-col gap-0.5">
                      <p className="typo-body5 text-[18px]! font-semibold! italic">
                        {voice.name}
                      </p>
                      <p className="typo-body2 text-[#6B5F54] font-semibold!">
                        {voice.role}
                      </p>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </div>
        <div className="xl:shrink-0 flex justify-center xl:justify-start items-center order-1 xl:order-2">
          <div className="relative p-5 grid grid-cols-1 grid-rows-1">
            <TerracottaDottedBlob className="absolute top-0 left-0 w-full h-full pointer-events-none" />
            <TerracottaBlob className="absolute -top-2.5 -right-7.5 xl:-top-10 xl:-right-15 pointer-events-none" />
            {voices.voices.map((voice, idx) => (
              <div
                key={idx}
                className={cn(
                  "col-start-1 row-start-1 transition-all duration-700 ease-in-out relative",
                  idx === selectedIndex
                    ? "opacity-100 z-2 pointer-events-auto scale-100"
                    : "opacity-0 z-1 pointer-events-none scale-95"
                )}
              >
                {voice.img?.src ? (
                  <Image
                    src={voice.img.src}
                    alt={voice.img.alt || "voice image"}
                    width={420}
                    height={420}
                    loading="lazy"
                    sizes="(max-width: 1280px) 256px, 420px"
                    className="w-[256px] xl:w-105 h-auto aspect-square object-cover rounded-full relative z-2 shadow-[0_24px_60px_0_rgba(36,30,25,0.18)]"
                  />
                ) : (
                  <div className="w-[256px] xl:w-105 aspect-square rounded-full bg-stone-200 relative z-2" />
                )}
                {voice.badge?.title ? (
                  <div className="absolute -left-8 xl:-left-10 bottom-6 bg-[#FBF7EF] flex flex-col gap-0.5 shadow-[0_8px_24px_0_rgba(36,30,25,0.12)] z-3 rounded-sm border border-[#241E191F] py-3 px-4 transition-all duration-700 ease-in-out">
                    <p className="typo-body2 uppercase">{voice.badge.title}</p>
                    {voice.badge.body ? (
                      <p className="typo-body5 font-semibold! font-fraunces-italics! text-primary-red">
                        {voice.badge.body}
                      </p>
                    ) : null}
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
      {multiVoice && (
        <div className="flex flex-wrap justify-center items-center gap-4 pt-1">
          <CarouselPrevButton className="size-10 text-primary-red border border-[#241E191F] rounded-full flex items-center justify-center transition-opacity disabled:opacity-40">
            <ChevronLeftIcon />
          </CarouselPrevButton>
          <div className="flex flex-wrap flex-row gap-2.5 items-center">
            {voices.voices.map((_, idx) => (
              <button
                key={idx}
                onClick={() => emblaApi?.scrollTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={cn(
                  "transition-all duration-300 rounded-full cursor-pointer",
                  idx === selectedIndex
                    ? "w-6 h-2 bg-primary-red"
                    : "size-2 bg-[#241E1926]"
                )}
              />
            ))}
          </div>
          <CarouselNextButton className="size-10 text-primary-red border border-[#241E191F] rounded-full flex items-center justify-center transition-opacity disabled:opacity-40">
            <ChevronRightIcon />
          </CarouselNextButton>
        </div>
      )}
    </div>
  );
};

export default VoicesSectionContent;