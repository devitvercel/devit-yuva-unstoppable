import Image from "next/image";
import type {UnSdgsHeroSectionType} from "@/types/unSdgs/unSdgs.types";

/**
 * Figma 1181:11049 — photo column 569×560px.
 * Absolute coords converted to % of photo box.
 */
const PHOTO_W = 569;
const PHOTO_H = 560;

function SdgsHeroSection({hero}: {hero: UnSdgsHeroSectionType}) {
  return (
    <section className="relative mt-16.25 overflow-visible bg-white pb-16 pt-8 md:pb-20 md:pt-14 xl:mt-19.5 xl:pb-20 xl:pt-18">
      <div className="w-916/1000 xl:w-888/1000 mx-auto px-4 md:px-0">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-[31px]">
          {/* Hero Left — Figma 1181:11053 */}
          <div className="flex flex-col lg:w-[53.125%] lg:shrink-0 lg:pt-8">
            <div className="flex items-center gap-2.5">
              <span className="h-[1.5px] w-8 bg-primary-red" aria-hidden/>
              <p className="font-dm-sans text-[12px] font-bold uppercase tracking-[2.4px] text-primary-red">
                {hero.eyebrow}
              </p>
            </div>
            <h1 className="mt-6 font-fraunces-italics text-[clamp(32px,5vw,72px)] leading-[1.1] tracking-[-0.041em] text-[#1a1815]">
              {hero.titleLine1}
              <br/>
              {hero.titleLine2}
              <span className="text-primary-red">{hero.titleHighlight}</span>
            </h1>
            <p className="mt-8 max-w-[520px] font-sans text-base font-medium leading-[1.7] text-[#6b6761] md:text-[18px] md:leading-[30.6px]">
              <span>{hero.bodyLead}</span>
              <span className="font-bold text-[#1a1815]">{hero.bodyBold}</span>
              <span>{hero.bodyRest}</span>
            </p>
          </div>

          {/* Hero Right visual — Figma 1181:11062 + absolute decorations */}
          <div className="@container relative mx-auto w-full max-w-[569px] shrink-0 overflow-visible lg:mx-0 lg:ml-auto lg:max-w-[569px]">
            {/* Aspect-ratio box (569:560) — all layers scale proportionally */}
            <div className="relative w-full overflow-visible pb-[98.42%]">
              {/* Turmeric circle — 1181:11051 (furthest back) */}
              <div
                className="pointer-events-none absolute z-0 aspect-square rounded-full bg-[#E2A132]/[0.16]"
                style={{
                  left: `${(494 / PHOTO_W) * 100}%`,
                  top: `${(486 / PHOTO_H) * 100}%`,
                  width: `${(180 / PHOTO_W) * 100}%`,
                }}
                aria-hidden
              />

              {/* Red offset block — 1181:11050 */}
              <div
                className="pointer-events-none absolute z-[1] rounded-[6px] bg-primary-red"
                style={{
                  left: `${(12 / PHOTO_W) * 100}%`,
                  top: `${(20 / PHOTO_H) * 100}%`,
                  width: `${(571 / PHOTO_W) * 100}%`,
                  height: `${(553 / PHOTO_H) * 100}%`,
                }}
                aria-hidden
              />

              {/* Hero photo — 1181:11063 */}
              <div className="absolute inset-0 z-10 overflow-visible">
                <Image
                  src={hero.img.src}
                  alt={hero.img.alt || hero.titleLine1 || "UN SDGs Hero Image"}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 569px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20" aria-hidden/>
              </div>

              {/* Terracotta ring — 1181:11065 */}
              <Image
                src="/assets/pages/un-sdgs/decorative-terracotta.avif"
                alt="UN SDGs Terracotta Decorative Element"
                width={137}
                height={137}
                className="pointer-events-none absolute z-20 h-auto"
                style={{
                  left: `${(-69 / PHOTO_W) * 100}%`,
                  top: `${(-48 / PHOTO_H) * 100}%`,
                  width: `${(137 / PHOTO_W) * 100}%`,
                }}
                aria-hidden
              />

              {/* 2030 outline text — 1181:11064 */}
              <p
                className="pointer-events-none absolute z-30 whitespace-nowrap font-fraunces-italics text-[clamp(52px,21.1cqw,120px)] leading-none tracking-[8px] text-transparent"
                style={{
                  left: `${(318 / PHOTO_W) * 100}%`,
                  top: `${(510 / PHOTO_H) * 100}%`,
                  WebkitTextStroke: "1.5px #ce2028",
                  paintOrder: "stroke fill",
                }}
                aria-hidden
              >
                {hero.watermark}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SdgsHeroSection;
