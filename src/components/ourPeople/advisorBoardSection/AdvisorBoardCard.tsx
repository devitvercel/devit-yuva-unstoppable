import React from "react";
import Link from "next/link";
import type {OurPeopleAdvisorCardType} from "@/types/ourPeople/ourPeople.types";
import PersonImage from "@/components/ourPeople/PersonImage";
import {LinkedInIcon} from "../../../../public/SVGs/svg";

const AdvisorBoardCard = ({
  card,
  onClick,
}: {
  card: OurPeopleAdvisorCardType;
  onClick?: () => void;
}) => {
  return (
    <article className="flex h-full w-full flex-col overflow-hidden rounded-lg bg-white">
      <button
        type="button"
        onClick={onClick}
        className="relative w-full h-100 shrink-0 overflow-hidden cursor-pointer transition-opacity hover:opacity-95"
      >
        <PersonImage
          src={card.img.src}
          alt={card.img.alt || `${card.name} - ${card.role}` || "Yuva Advisory Board Member"}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="rounded-t-lg"
        />
      </button>
      <div className="py-5 px-4.5 flex flex-1 items-start justify-between gap-3 border-t border-[rgba(26,24,21,0.1)]">
        <button
          type="button"
          onClick={onClick}
          className="flex min-w-0 flex-1 flex-col gap-1 text-left cursor-pointer"
        >
          <p className="typo-h4">{card.name}</p>
          <p className="typo-body2 text-[#6B6761] font-bold!">{card.role}</p>
        </button>
        {card.linkedinHref ? (
          <Link
            href={card.linkedinHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full bg-primary-red text-white [&_svg]:size-[18px] hover:opacity-90"
            aria-label={`${card.name} on LinkedIn`}
          >
            <LinkedInIcon />
          </Link>
        ) : null}
      </div>
    </article>
  );
};

export default AdvisorBoardCard;
