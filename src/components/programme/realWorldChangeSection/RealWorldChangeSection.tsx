import type {RealWorldChangeSectionType} from "@/types/programme/programme.types";
import Image from "next/image";
import React from "react";
import {cn} from "@/lib/utils";

function RealWorldChangeSection({
                                  realWorldChange,
                                  sectionClassName,
                                  containerClassName,
                                  contentClassName,
                                  headingDotClassName,
                                  paragraphClassName,
                                  headingClassName,
                                }: {
  realWorldChange: RealWorldChangeSectionType,
  sectionClassName?: string,
  containerClassName?: string,
  contentClassName?: string
  headingDotClassName?: string,
  paragraphClassName?: string,
  headingClassName?: string
}) {
  return (
    <section className={cn("py-7.5 xl:py-20 bg-primary-red", sectionClassName)}>
      <div
        className={cn("w-916/1000 xl:w-888/1000 mx-auto flex flex-col-reverse gap-7 xl:flex-row xl:gap-18", containerClassName)}>
        <div className="flex-1">
          <Image
            src={realWorldChange.img.src}
            alt={realWorldChange.img.alt || "Real world impact"}
            width={604}
            height={453}
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 604px"
            className={"w-full h-auto rounded-xl object-cover aspect-604/453"}
          />
        </div>
        <div className="flex-1 justify-center flex flex-col gap-2 xl:gap-6">
          <div className={cn("flex flex-col gap-3 xl:gap-4.5 text-white", contentClassName)}>
            <div className="flex flex-wrap flex-row gap-2.5 items-center">
              <div className={cn("size-1.5 rounded-[1px] bg-white", headingDotClassName)}/>
              <p className={cn("typo-body2 shrink-0 uppercase", headingClassName)}>{realWorldChange.heading}</p>
            </div>
            <h2 className={"typo-h2 font-fraunces-italics"}>{realWorldChange.title}</h2>
          </div>
          <div className="flex flex-col gap-7">
            {realWorldChange.body.map((para, index) => (
              <p className={cn("typo-body3 text-[#FFECEC]", paragraphClassName)} key={index}>{para}</p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default RealWorldChangeSection;