import Image from "next/image"
import type { AwardsOurAchievementsSectionType } from "@/types/awards/awards.types"

const OurAchievementsSection = ({
  ourAchievements,
}: {
  ourAchievements: AwardsOurAchievementsSectionType
}) => {
  const getImgSrc = (img: string | { url: string }) => {
    if (typeof img === "string") return img
    return img?.url ?? ""
  }

  return (
    <section
      id="our-achievements"
      className="w-9/10 mx-auto flex flex-col gap-8 md:gap-10 xl:gap-12.5"
    >
      <div className="flex flex-col gap-2.5 text-center items-center justify-center">
        <div className="flex flex-wrap flex-row gap-2.5 items-center justify-center">
          <div className="bg-primary-red size-1.5 rounded-[1px]" />
          <p className="shrink-0 typo-body2 uppercase text-primary-red">
            {ourAchievements.title}
          </p>
        </div>
        <h2 className="typo-h1 text-[24px] md:text-[36px] xl:text-[48px] text-[#1A1A2E] font-bold">
          {ourAchievements.subTitle.split(" ").slice(0, -2).join(" ")}
          <br />
          {ourAchievements.subTitle.split(" ").slice(-2).join(" ")}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-13 lg:gap-18 xl:gap-22.5">
        {ourAchievements.cards.map((card, index) => {
          const src = getImgSrc(card.img)
          return (
            <div key={index} className="relative flex flex-col gap-4">
              {src ? (
                <div className="relative w-full aspect-[4/3] overflow-hidden rounded-xl bg-[#ebe8e2]">
                  <Image
                    fill
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover"
                    src={src}
                    alt={card.title || card.body || "Yuva Achievement Award"}
                  />
                  <div className="absolute top-6 left-6 bg-white border-l-2 border-primary-red py-2.5 px-5 rounded-md z-10">
                    <p className="typo-body-1 text-primary-red">{card.year}</p>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col gap-1">
                <h4 className="typo-h-4 font-bold text-[#141C25]">
                  {card.title}
                </h4>
                <p className="typo-body-text text-[#595F69]">{card.body}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default OurAchievementsSection
