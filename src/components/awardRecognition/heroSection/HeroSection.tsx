import React from "react"
import Image from "next/image"
import type { AwardsHeroSectionType } from "@/types/awards/awards.types"

const HeroSection = ({ hero }: { hero: AwardsHeroSectionType }) => {
  const unstoppableParts = hero.subTitle.split("Unstoppable")

  return (
    <section className="relative h-[calc(100vh)] flex items-stretch xl:items-center overflow-hidden">
      <Image
        src={hero.img}
        alt="Awards and recognition at Yuva Unstoppable"
        fill
        className="object-cover object-center"
        priority
      />

      <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(0,0,0,0.61)_60.99%,rgba(0,0,0,0.00)_100%)]" />

      <div className="relative z-10 w-916/1000 xl:w-888/1000 mx-auto flex flex-col justify-end lg:justify-center pt-22 pb-12 lg:py-0">
        <div className="flex flex-col gap-5 lg:gap-7 lg:w-[62%] lg:mt-16">
          <div className="flex items-center gap-2">
            <span className="inline-block w-1.75 h-1.75 rounded-xs bg-white shrink-0" />
            <p className="font-sans text-[12px] font-bold leading-normal tracking-[2.2px] text-white uppercase">
              {hero.title}
            </p>
          </div>
          <h1 className="typo-h1 text-white">
            {unstoppableParts[0]}
            <span className="text-primary-red italic">Unstoppable</span>
            {unstoppableParts[1] ?? ""}
          </h1>
          <p className="typo-body1 text-[17px]! font-medium! leading-7.25! text-[rgba(255,255,255,0.81)] lg:w-[90%]">
            {hero.body}
          </p>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
