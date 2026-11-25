import React from 'react';
import type {SupportSystemSectionType} from "@/types/programme/programme.types";
import {cn} from "@/lib/utils";
import {FancyArrowRightIcon} from "../../../../public/SVGs/svg";

function SupportSystemCards({cards, selectedCard, setSelectedCard}: {
  cards: SupportSystemSectionType['cards'],
  selectedCard: number,
  setSelectedCard: (index: number) => void
}) {
  return (
    <div className="flex flex-col">
      {cards.map((card, index) => (
        <div key={index}
             onClick={() => setSelectedCard(index)}
             className={cn("flex flex-wrap flex-row gap-4 py-8 items-center px-5 border border-[#E2D9CC]", index === selectedCard && "border-b-primary-red")}>
          <div className="flex-1 flex flex-col gap-1.5">
            <p
              className={cn("typo-h4 text-[clamp(16px,13.89px+0.56vw,22px)] transition-all duration-300", index === selectedCard ? "text-primary-red" : "text-[#020202]")}>{card.title}</p>
            <p
              className={cn("text-[#7A7060] typo-body5 transition-all duration-300", index === selectedCard ? "opacity-100" : "opacity-0")}>{card.body}</p>
          </div>
          <div className="shrink-0">
            <FancyArrowRightIcon className={cn("transition-all duration-300", index === selectedCard ? "w-10" : "w-7")}
                                 fill={index === selectedCard ? "#CE2028" : "#B0A898"}/>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SupportSystemCards;