import Image from "next/image";
import type {LifeAtYuvaBannerSectionType} from "@/types/lifeAtYuva/lifeAtYuva.types";

function LifeAtYuvaBannerSection({banner}: {banner: LifeAtYuvaBannerSectionType}) {
  return (
    <section className="w-full bg-[#FDFBF7]">
      {/* Figma 1570:452 — aspect 1440/620, full image visible (no bottom crop) */}
      <div className="relative mx-auto w-full">
        <Image
          src={banner.img.src}
          alt={banner.img.alt || "Life at Yuva Banner Image"}
          width={1440}
          height={620}
          loading="lazy"
          sizes="100vw"
          className="block h-auto w-full"
        />
      </div>
    </section>
  );
}

export default LifeAtYuvaBannerSection;
