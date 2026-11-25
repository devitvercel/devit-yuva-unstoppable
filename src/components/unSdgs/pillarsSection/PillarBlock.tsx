import Image from "next/image";
import type {UnSdgsGoalChipType, UnSdgsPillarType} from "@/types/unSdgs/unSdgs.types";

function SdgChip({chip}: {chip: UnSdgsGoalChipType}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#f7f5f2] py-1.5 pl-1.5 pr-3.5">
      <span
        className="flex size-6 items-center justify-center rounded-xl font-dm-sans text-[11px] font-extrabold text-white"
        style={{backgroundColor: chip.color, color: chip.textColor ?? "#ffffff"}}
      >
        {chip.number}
      </span>
      <span className="font-dm-sans text-xs font-semibold text-[#1a1815]">{chip.title}</span>
    </span>
  );
}

function PillarImage({pillar}: {pillar: UnSdgsPillarType}) {
  return (
    <div className="relative h-[383px] w-full overflow-hidden rounded-lg bg-[#ebe8e2] lg:h-[512px]">
      <Image src={pillar.img.src} alt={pillar.img.alt || pillar.numeralLabel || "UN SDGs Pillar Image"} fill loading="lazy" className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw"/>
      <div className="absolute left-6 top-6 rounded bg-white/95 px-4.5 py-2.5 backdrop-blur-sm">
        <p className="text-sm tracking-wide text-[#1a1815]">
          <span className="font-dm-sans font-extrabold text-primary-red">{pillar.numeral}</span>
          <span className="font-fraunces-italics font-semibold">{pillar.numeralLabel}</span>
        </p>
      </div>
    </div>
  );
}

function PillarText({pillar}: {pillar: UnSdgsPillarType}) {
  return (
    <div className="flex w-full flex-col lg:max-w-[560px]">
      <div className="flex items-center gap-3">
        <span className="h-[1.5px] w-6 bg-primary-red" aria-hidden/>
        <p className="font-dm-sans text-[11px] font-bold uppercase tracking-[2.2px] text-primary-red md:text-xs">
          {pillar.label}
        </p>
      </div>
      <h3 className="mt-4 font-fraunces-italics text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.025em] text-[#1a1815]">
        {pillar.titlePlain}
        <span className="text-primary-red">{pillar.titleHighlight}</span>
      </h3>
      <p className="mt-6 font-sans text-sm font-medium leading-[1.72] text-[#6b6761] md:text-[16.5px]">
        {pillar.body}
      </p>
      <div className="mt-7 flex flex-wrap gap-2 border-t border-[#1A18151A] pt-6">
        {pillar.sdgChips.map((chip) => (
          <SdgChip key={chip.number} chip={chip}/>
        ))}
      </div>
    </div>
  );
}

function PillarBlock({pillar}: {pillar: UnSdgsPillarType}) {
  const image = (
    <div className="w-full shrink-0 lg:w-[50%]">
      <PillarImage pillar={pillar}/>
    </div>
  );

  const text = (
    <div className="w-full lg:w-[44%]">
      <PillarText pillar={pillar}/>
    </div>
  );

  return (
    <article className="border-t border-[#1A18151A] py-10 lg:py-20">
      {pillar.imagePosition === "left" ? (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          {/* Mobile: text first, image second */}
          <div className="order-1 w-full lg:order-2 lg:w-[44%]">
            <PillarText pillar={pillar}/>
          </div>
          <div className="order-2 w-full shrink-0 lg:order-1 lg:w-[50%]">
            <PillarImage pillar={pillar}/>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-20">
          {text}
          {image}
        </div>
      )}
    </article>
  );
}

export default PillarBlock;
