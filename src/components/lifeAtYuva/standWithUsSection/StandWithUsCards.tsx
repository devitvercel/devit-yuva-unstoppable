import Image from "next/image";
import Link from "next/link";
import {LinkedInIcon} from "../../../../public/SVGs/svg";
import type {
  LifeAtYuvaCompactMemberType,
  LifeAtYuvaFeaturedMemberType,
} from "@/types/lifeAtYuva/lifeAtYuva.types";

/** Image treatment aligned with Our People advisory board cards. */
function StandWithUsCardImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative w-full h-80 overflow-hidden rounded-t-lg bg-[#ebe8e2]">
      <Image
        src={src}
        alt={alt || "Stand With Us Team Member Image"}
        fill
        loading="lazy"
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover"
      />
    </div>
  );
}

export function FeaturedTeamCard({
  member,
  onReadMoreClick,
}: {
  member: LifeAtYuvaFeaturedMemberType;
  onReadMoreClick: () => void;
}) {
  return (
    <article className="flex w-full flex-col gap-3">
      <StandWithUsCardImage src={member.img.src} alt={member.img.alt} />
      <div className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex flex-col gap-2.5">
            <h3 className="font-fraunces-italics text-[26px] md:text-[30px] leading-[1.2] text-[#0a0e14]">
              {member.name}
            </h3>
            <p className="font-dm-sans text-[12px] font-semibold uppercase tracking-[1.2px] text-primary-red">
              {member.role}
            </p>
          </div>
          {member.linkedinHref && (
            <Link
              href={member.linkedinHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex size-[38px] shrink-0 items-center justify-center rounded-full bg-primary-red text-white [&_svg]:size-[18px]"
              aria-label={`${member.name} on LinkedIn`}
            >
              <LinkedInIcon />
            </Link>
          )}
        </div>

        <div className="relative max-h-24 overflow-hidden">
          <p className="font-sans text-[16px] leading-6 text-[#5b403e]">{member.bio}</p>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-[#fff8f7] to-transparent" />
        </div>

        {member.bio && (
          <button
            type="button"
            onClick={onReadMoreClick}
            className="font-dm-sans text-[12px] font-bold uppercase tracking-[1.2px] text-primary-red text-left cursor-pointer hover:underline"
          >
            READ More
          </button>
        )}
      </div>
    </article>
  );
}

export function CompactTeamCard({member}: {member: LifeAtYuvaCompactMemberType}) {
  return (
    <article className="flex w-full flex-col">
      <StandWithUsCardImage src={member.img.src} alt={member.img.alt} />
      <div className="border-t border-[rgba(26,24,21,0.1)] bg-white px-[18px] py-5 flex flex-col gap-1 rounded-b-lg">
        <h3 className="font-fraunces-italics text-[18px] tracking-[-0.18px] text-[#1a1815]">
          {member.name}
        </h3>
        <p className="font-dm-sans text-[11px] font-bold uppercase tracking-[1.76px] text-[#6b6761]">
          {member.role}
        </p>
        <p className="pt-1 font-dm-sans text-[11px] font-semibold text-primary-red">
          {member.since}
        </p>
      </div>
    </article>
  );
}
