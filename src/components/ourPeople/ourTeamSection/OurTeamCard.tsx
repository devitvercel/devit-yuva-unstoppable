import React from "react";
import Link from "next/link";
import type {OurPeopleTeamCardType} from "@/types/ourPeople/ourPeople.types";
import PersonImage from "@/components/ourPeople/PersonImage";
import {LinkedInIcon} from "../../../../public/SVGs/svg";

const OurTeamCard = ({
  card,
  onClick,
}: {
  card: OurPeopleTeamCardType;
  onClick?: () => void;
}) => {
  return (
    <article className="flex w-full flex-col overflow-hidden rounded-[10px] bg-[#ebe8e2]">
      <button
        type="button"
        onClick={onClick}
        className="relative h-[407px] w-full overflow-hidden bg-[#ebe8e2] cursor-pointer transition-opacity hover:opacity-95"
      >
        <PersonImage
          src={card.img.src}
          alt={card.img.alt || `${card.name} - ${card.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </button>
      <div className="flex items-start justify-between gap-3 border-t border-[rgba(26,24,21,0.1)] bg-white px-[18px] pt-5 pb-[18px]">
        <button
          type="button"
          onClick={onClick}
          className="flex min-w-0 flex-1 flex-col gap-1 text-left cursor-pointer"
        >
          <p className="typo-h4">{card.name}</p>
          <p className="typo-body2 text-[#6B6761] font-bold! uppercase tracking-[1.76px] h-8">
            {card.role}
          </p>
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

export default OurTeamCard;
