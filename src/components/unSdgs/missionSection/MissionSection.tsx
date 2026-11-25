import type {UnSdgsMissionSectionType} from "@/types/unSdgs/unSdgs.types";

function MissionSection({mission}: {mission: UnSdgsMissionSectionType}) {
  return (
    <section
      className="py-16 md:py-24 xl:py-35 px-4"
      style={{
        background:
          "linear-gradient(178.91deg, rgba(232, 227, 228, 0.27) 2.09%, rgba(160, 4, 22, 0.27) 98.25%)",
      }}
    >
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col items-center gap-8 text-center">
        <div className="flex items-center gap-3.5">
          <span className="h-[1.5px] w-10 bg-primary-red" aria-hidden/>
          <p className="font-dm-sans text-[12px] font-extrabold uppercase tracking-[2.64px] text-primary-red">
            {mission.eyebrow}
          </p>
        </div>
        <blockquote className="max-w-[980px] font-fraunces-italics text-[clamp(28px,4vw,52px)] leading-[1.18] tracking-[-0.025em] text-[#1a1815]">
          {mission.quotePlain}
          <span className="text-primary-red">{mission.quoteHighlight}</span>
          {mission.quoteRest}
        </blockquote>
        <div className="flex items-center gap-3.5">
          <span className="h-px w-6 bg-[#1a1815]" aria-hidden/>
          <p className="font-dm-sans text-[13px] font-semibold uppercase tracking-[2.08px] text-[#1a1815]">
            {mission.attribution}
          </p>
        </div>
      </div>
    </section>
  );
}

export default MissionSection;
