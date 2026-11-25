"use client";

import React from "react";
import type { BeliefsSectionType } from "@/types/home/home.types";
import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";
import { DecorativeRing, TerracottaBlob } from "../../../../public/SVGs/svg";

const BeliefsSection = ({ beliefsSection }: { beliefsSection: BeliefsSectionType }) => {
  const { eyebrow, title, body, beliefs } = beliefsSection;

  return (
    <section className="py-12 md:py-16 xl:py-24 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 md:gap-16">
      {/* Header — same pattern as What we do */}
      <div className="flex flex-col lg:flex-wrap lg:flex-row gap-5.5 lg:gap-12 lg:items-end">
        <div className="flex-1 flex flex-col gap-4">
          <p className="typo-body2 uppercase text-primary-red">{eyebrow}</p>
          {title ? <h2 className="typo-h2 text-secondary-brown">{title}</h2> : null}
        </div>
        {body ? (
          <div className="flex-1 max-w-xl">
            <p className="typo-body3 text-[#3A312A] leading-relaxed">{body}</p>
          </div>
        ) : null}
      </div>

      {/* Cards List */}
      <div className="flex flex-col">
        {beliefs.map((belief, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <div
              className="py-12 lg:py-16 first:pt-0 border-b last:border-b-0 border-[#241E191F] group flex flex-col lg:flex-row lg:flex-wrap gap-8 lg:gap-12 xl:gap-16 items-center"
              key={`belief-${idx}`}
            >
              {/* Text Block */}
              <div
                className={`lg:w-55/100 flex flex-col gap-5 order-1 ${
                  isEven ? "lg:order-2" : "lg:order-1"
                }`}
              >
                {belief.eyebrow ? (
                  <p className="typo-body2 uppercase text-primary-red">
                    {belief.eyebrow}
                  </p>
                ) : null}
                {belief.title ? (
                  <h3 className="typo-h2 italic text-secondary-brown">
                    {belief.title}
                  </h3>
                ) : null}
                <p className="typo-body4 text-[#3A312A] leading-relaxed">
                  {belief.body}
                </p>

                {belief.points && belief.points.length > 0 && (
                  <div className="flex flex-col gap-4 mt-2">
                    {belief.points.map((point, ptIdx) => (
                      <div key={ptIdx} className="flex items-start gap-3">
                        <ArrowRightIcon className="text-primary-red w-4 h-4 shrink-0 mt-1" />
                        <p className="flex-1 typo-body3 text-[#3A312A] leading-relaxed">
                          {point}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {belief.highlight && (
                  <p className="typo-body3 font-bold text-primary-red border-l-2 border-primary-red pl-4 py-1.5 mt-2 bg-[#CE202808] rounded-r-md">
                    {belief.highlight}
                  </p>
                )}
              </div>

              {/* Image Block */}
              <div
                className={`flex-1 order-2 ${
                  isEven ? "lg:order-1" : "lg:order-2"
                } w-full`}
              >
                <div className="relative max-w-lg mx-auto lg:max-w-none">
                  <TerracottaBlob
                    className={
                      "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-20 -right-15"
                    }
                  />
                  <DecorativeRing
                    className={
                      "opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -top-11 -left-13"
                    }
                  />
                  {belief.img?.src ? (
                    <Image
                      src={belief.img.src}
                      alt={belief.img.alt || "belief image"}
                      width={560}
                      height={448}
                      loading="lazy"
                      sizes="(max-width: 1024px) 92vw, 45vw"
                      className="w-full h-auto relative z-1 rounded-sm object-cover aspect-5/4"
                    />
                  ) : (
                    <div className="w-full h-[448px] bg-stone-100 rounded-xl relative z-1 flex items-center justify-center text-stone-400">
                      No image available
                    </div>
                  )}

                  <Image
                    src="/assets/pages/home/card-frame.avif"
                    alt="Decorative card border frame"
                    aria-hidden="true"
                    role="presentation"
                    width={560}
                    height={448}
                    loading="lazy"
                    sizes="(max-width: 1024px) 92vw, 45vw"
                    className="min-w-11/10 opacity-100 h-115/100 absolute -top-75/1000 -left-5/100 z-2"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default BeliefsSection;
