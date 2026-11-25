import type {DonateHeroSectionType} from "@/types/donate/donate.types";
import DonateForm from "@/components/donate/heroSection/DonateForm";

function HeroSection({hero}: { hero: DonateHeroSectionType }) {
  return (
    <section
      className={"bg-white pb-14 pt-31.5 xl:pt-38.5 xl:pb-16"}>
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col xl:flex-row gap-10 justify-between">
        <div className="xl:w-2/5 flex flex-col gap-6 xl:gap-11">
          <div className="flex flex-col gap-6">
            <div className="flex flex-row gap-3 items-center">
              <div className="w-8 h-px bg-primary-red"/>
              <p className={"shrink-0 typo-body2 text-primary-red uppercase"}>{hero.heading}</p>
            </div>
            <h1 className={"typo-h1"}>
              {hero.title1}{" "}
              <span className={"text-primary-red"}>{hero.highlightedTitle}</span>{" "}
              {hero.title2}
            </h1>
            <p className={"typo-body1 text-[#6B6761]"}>
              {hero.body}{" "}
              <span className={"text-[#1A1815] font-bold!"}>{hero.highlightedBody}</span>
            </p>
          </div>
          <div
            className="pt-7 border-t border-[#1A18151A] w-full max-w-107.5 flex flex-row flex-wrap gap-x-5 gap-y-2.5">
            {hero.perks.map((perk, index) => (
              <div className="flex flex-row gap-2 items-center" key={index}>
                <perk.icon/>
                <p className={"shrink-0 typo-body1 text-[12px]! text-[#6B6761] font-bold!"}>{perk.perk}</p>
              </div>
            ))}
          </div>
        </div>
        <DonateForm/>
      </div>
    </section>
  );
}

export default HeroSection;