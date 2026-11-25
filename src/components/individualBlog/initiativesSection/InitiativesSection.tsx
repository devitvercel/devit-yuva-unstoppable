import React from "react";
import Image from "next/image";
import type { InitiativesSectionType } from "@/types/individualBlog/individualBlog.types";

const InitiativesSection = ({ initiatives }: { initiatives: InitiativesSectionType }) => {
  return (
    <section className="mx-auto w-916/1000 xl:w-888/1000 flex flex-col gap-10 xl:gap-16 pb-16 lg:pb-24">
      {/* Section Heading */}
      <div className="flex justify-center text-center">
        <h2 className="typo-h1 font-serif text-[#241E19]">
          <span className="text-primary-red">{initiatives.highlightedTitle}</span>{" "}
          {initiatives.title.replace(initiatives.highlightedTitle, "").trim()}
        </h2>
      </div>

      {/* Responsive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-8">
        {initiatives.cards.map((card, index) => (
          <div
            key={index}
            className="flex flex-col bg-white border border-[#ce20281a] rounded-[6px] overflow-hidden transition-all duration-300 hover:border-primary-red hover:shadow-[0px_4px_8.4px_0px_rgba(206,32,40,0.56)] group cursor-pointer"
          >
            {/* Card Image */}
            <div className="relative w-full h-[248px]">
              <Image
                src={card.img.src}
                alt={card.img.alt || card.title || "Initiative Card Image"}
                fill
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                className="object-cover"
              />
            </div>

            {/* Card Content */}
            <div className="flex flex-col flex-1 p-5 lg:p-6">
              {/* Date */}
              <span className="typo-body5 text-[#6b6761] uppercase mb-2">
                {card.date}
              </span>

              {/* Title with line-clamp-2 */}
              <h3 className="typo-h3 text-[#241e19] font-semibold! line-clamp-2 mb-3">
                {card.title}
              </h3>

              {/* Body with line-clamp-3 */}
              <p className="typo-body3 text-[#6b6761] line-clamp-3 mb-6">
                {card.body}
              </p>

              {/* CTA Link */}
              <a
                href={card.link.href}
                className="text-[#ce2028] typo-body2 font-semibold! mt-auto block text-right uppercase transition-colors duration-200 group-hover:text-primary-red"
              >
                {card.link.text}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InitiativesSection;
