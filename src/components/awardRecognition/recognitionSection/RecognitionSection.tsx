"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import type { AwardsRecognitionSectionType, AwardCardType } from "@/types/awards/awards.types";
import RecognitionModal from "./RecognitionModal";

const BODY_LINE_LIMIT = 5;

function RecognitionCard({
  card,
  onReadMore,
}: {
  card: AwardCardType;
  onReadMore: () => void;
}) {
  const src = typeof card.img === "string" ? card.img : card.img?.url ?? "";
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const [isClamped, setIsClamped] = useState(false);

  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    setIsClamped(el.scrollHeight > el.clientHeight);
  }, [card.body]);

  return (
    <div className="relative flex flex-col gap-4">
      {src ? (
        <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-[#ebe8e2]">
          <Image
            fill
            loading="lazy"
            sizes="(max-width: 768px) 100vw, 33vw"
            className="object-cover"
            src={src}
            alt={card.title || card.body || "Yuva Award Recognition"}
          />
          <div className="absolute top-6 left-6 bg-white border-l-2 border-primary-red py-2.5 px-5 rounded-md z-10">
            <p className="typo-body-1 text-primary-red">{card.year}</p>
          </div>
        </div>
      ) : null}
      <div className="flex flex-col gap-1">
        <h3 className="typo-h-4 font-bold text-[#141C25]">{card.title}</h3>
        <p
          ref={bodyRef}
          className="typo-body-text text-[#595F69]"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: BODY_LINE_LIMIT,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {card.body}
        </p>
        {isClamped ? (
          <button
            type="button"
            onClick={onReadMore}
            className="mt-1 text-primary-red typo-body2 font-semibold w-fit hover:underline cursor-pointer"
          >
            Read More
          </button>
        ) : null}
      </div>
    </div>
  );
}

const RecognitionSection = ({
  recognition,
}: {
  recognition: AwardsRecognitionSectionType;
}) => {
  const [selectedCard, setSelectedCard] = useState<AwardCardType | null>(null);

  return (
    <section className="w-9/10 mx-auto flex flex-col gap-8 md:gap-10 xl:gap-12.5">
      <div className="flex flex-col gap-2.5 text-center items-center justify-center">
        <div className="flex flex-wrap flex-row gap-2.5 items-center justify-center">
          <div className="bg-primary-red size-1.5 rounded-[1px]" />
          <p className="shrink-0 typo-body2 uppercase text-primary-red">
            {recognition.title}
          </p>
        </div>
        <h2 className="typo-h1 text-[24px] md:text-[36px] xl:text-[48px] text-[#1A1A2E] font-bold">
          {recognition.subTitle.split(" ").slice(0, -1).join(" ")}
          <br />
          {recognition.subTitle.split(" ").slice(-1).join(" ")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-13 lg:gap-18 xl:gap-22.5">
        {recognition.cards.map((card, index) => (
          <RecognitionCard
            key={index}
            card={card}
            onReadMore={() => setSelectedCard(card)}
          />
        ))}
      </div>

      <RecognitionModal
        card={selectedCard}
        onClose={() => setSelectedCard(null)}
      />
    </section>
  );
};

export default RecognitionSection;
