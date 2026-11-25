import React from "react";
import type { TrustSectionType } from "@/types/home/home.types";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

/** Strip emoji / pictographs so CMS titles stay clean. */
function stripEmojis(value: string) {
  return value
    .replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}]/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function TrustColumn({
  title,
  intro,
  items,
  footer,
}: {
  title: string;
  intro?: string;
  items: string[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 xl:gap-8 h-full">
      <div className="flex flex-col gap-3">
        <h3 className="typo-h3 text-[#241E19]">{title}</h3>
        {intro ? (
          <p className="typo-body3 text-[#6B6761] max-w-md">{intro}</p>
        ) : null}
      </div>

      <ul className="flex flex-col flex-1">
        {items.map((item, idx) => (
          <li
            key={idx}
            className="flex flex-row items-baseline gap-4 xl:gap-6 py-4 border-b border-[#241E191F] first:border-t"
          >
            <span className="typo-body2 text-primary-red tabular-nums shrink-0 w-6">
              {String(idx + 1).padStart(2, "0")}
            </span>
            <span className="typo-body5 text-[18px]! text-[#241E19] font-medium!">
              {stripEmojis(item)}
            </span>
          </li>
        ))}
      </ul>

      {footer ? <div className="mt-auto pt-2">{footer}</div> : null}
    </div>
  );
}

const TrustSection = ({ trustSection }: { trustSection: TrustSectionType }) => {
  const { eyebrow, title, body, recognition, trust } = trustSection;
  const recognitionTitle = stripEmojis(recognition.title);
  const trustTitle = stripEmojis(trust.title);

  // Soft split for titles like "Recognition Earned. Trust Built."
  const [titleLead, ...titleRest] = title.split(/(?<=\.)\s+/);
  const titleAccent = titleRest.join(" ");

  // Pull the opening sentence forward so it can be styled distinctly.
  const bodyMatch = body.match(/^(.*?[.!?])(?:\s+)?([\s\S]*)$/);
  const bodyLead = bodyMatch?.[1]?.trim() ?? body;
  const bodyRest = bodyMatch?.[2]?.trim() ?? "";

  return (
    <section className="bg-[#FDFBF7] py-12 xl:py-24">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-16">
        {/* Header — title + body in one row on xl (same pattern as Voices) */}
        <div className="flex flex-col gap-3.5 xl:flex-row flex-wrap xl:gap-12 xl:pb-6 xl:border-b xl:border-[#241E191F]">
          <div className="flex-1 flex flex-col gap-4">
            {/* {eyebrow?.trim() ? (
              <p className="typo-body2 uppercase text-primary-red">{eyebrow}</p>
            ) : null} */}
            <h2 className="typo-h2 text-[#241E19]">
              {titleLead}
              {titleAccent ? (
                <>
                  {" "}
                  <span className="text-primary-red">{titleAccent}</span>
                </>
              ) : null}
            </h2>
          </div>
          {body?.trim() ? (
            <div className="flex-1 flex xl:items-end">
              <div className="flex flex-col gap-3">
                <p className="font-fraunces-italics text-[20px] md:text-[22px] xl:text-[24px] leading-snug text-[#241E19]">
                  {bodyLead}
                </p>
                {bodyRest ? (
                  <p className="typo-body3 text-[#3A312A]">{bodyRest}</p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        {/* Two pillars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-24">
          <TrustColumn
            title={recognitionTitle}
            items={recognition.items}
            footer={
              <Link
                href={recognition.ctaLink}
                className="inline-flex items-center gap-2 typo-body3 font-extrabold! text-primary-red group w-fit"
              >
                {recognition.ctaText}
                <ArrowRightIcon
                  size={16}
                  strokeWidth={2.5}
                  className="transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            }
          />

          <TrustColumn
            title={trustTitle}
            intro={trust.subtitle ? stripEmojis(trust.subtitle) : undefined}
            items={trust.items}
            footer={
              trust.description ? (
                <p className="typo-body3 text-[#6B6761] border-l-2 border-primary-red pl-4">
                  {stripEmojis(trust.description)}
                </p>
              ) : null
            }
          />
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
