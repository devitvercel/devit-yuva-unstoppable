'use client';

import React, {useState} from "react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {AccordionContext} from "@/components/common/accordion/AccordionContext";
import type {MediaAsset} from "@/types/global.types";
import {DecorativeRingFilled, WhiteDottedBlob} from "../../../../public/SVGs/svg";

interface AccordionProps {
  children: React.ReactNode;
  images?: MediaAsset[];
  className?: string;
  itemsClassName?: string;
}

export default function Accordion({children, images, className, itemsClassName}: AccordionProps) {
  const [selected, setSelected] = useState(0);

  return (
    <AccordionContext.Provider value={{selected, setSelected}}>
      <div className={cn("flex flex-col gap-7 xl:flex-row xl:gap-12.5", className)}>
        <div className={cn("flex flex-col", itemsClassName)}>
          {children}
        </div>
        {images && (
          <div className="flex-1 relative min-h-64 xl:min-h-0">
            <DecorativeRingFilled fill={"#E2A132"}
                                  className={"absolute -bottom-16.25 -right-16.25 xl:block hidden"}/>
            <WhiteDottedBlob stroke={"#CE2028"} className={"absolute -left-12 -top-17 xl:block hidden"}/>
            <div className="w-full h-full bg-primary-red rounded-[10px] absolute -top-6 -right-6 hidden xl:block"/>
            {images.map((img, i) => (
              <div
                key={i}
                className={cn(
                  "absolute inset-0 transition-opacity duration-500",
                  selected === i ? "opacity-100" : "opacity-0"
                )}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover rounded-[10px]"/>
              </div>
            ))}
          </div>
        )}
      </div>
    </AccordionContext.Provider>
  );
}
