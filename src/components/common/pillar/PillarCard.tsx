import {cn} from "@/lib/utils";

export type PillarCardProps = {
  number: string;
  title: string;
  body: string;
  className?: string;
  /** Align titles across a 2-col grid (Life @ Yuva). Off for free-height titles. */
  fixedTitleHeight?: boolean;
};

function PillarCard({
  number,
  title,
  body,
  className,
  fixedTitleHeight = true,
}: PillarCardProps) {
  return (
    <article
      className={cn(
        "border border-[#1A18152E] hover:-translate-y-2.5 hover:shadow-lg shadow-[rgba(26,24,21,0.5)] transition-all duration-300 rounded-[10px] bg-white overflow-hidden h-full flex flex-col",
        className
      )}
    >
      <div className="px-7 py-7.25 flex flex-col gap-2 md:gap-3 xl:gap-4">
        <p className="typo-h2 text-primary-red">{number}</p>
        <div className="flex flex-col gap-2 md:gap-2.5 xl:gap-3">
          <h3
            className={cn(
              "typo-h3",
              fixedTitleHeight && "leading-7.5 lg:h-15"
            )}
          >
            {title}
          </h3>
          <p className="text-[#6B6761] typo-body5">{body}</p>
        </div>
      </div>
    </article>
  );
}

export default PillarCard;
