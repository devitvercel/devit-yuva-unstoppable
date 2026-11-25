import type {VoicesSectionType} from "@/types/home/home.types";
import {Carousel} from "@/components/common/carousel";
import VoicesSectionContent from "@/components/home/voicesSection/VoiceSectionContent";

const VoicesSection = ({voices}: {voices: VoicesSectionType}) => {
  const hasHeader = Boolean(
    voices.eyebrow?.trim() || voices.title?.trim() || voices.body?.trim()
  );
  const multiVoice = voices.voices.length > 1;

  return (
    <section className="py-8.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-6 xl:gap-5">
      {hasHeader && (
        <div className="flex flex-col gap-3.5 xl:flex-row flex-wrap xl:gap-12 xl:pb-6 xl:border-b xl:border-[#241E191F]">
          <div className="flex-1 flex flex-col gap-4">
            {voices.eyebrow?.trim() ? (
              <p className="typo-body2 text-primary-red uppercase">
                {voices.eyebrow}
              </p>
            ) : null}
            {voices.title?.trim() ? (
              <h2 className="typo-h2">{voices.title}</h2>
            ) : null}
          </div>
          {voices.body?.trim() ? (
            <div className="flex-1 flex xl:items-end">
              <p className="typo-body3 text-[#3A312A]">
                {voices.body}
              </p>
            </div>
          ) : null}
        </div>
      )}
      <Carousel
        options={{loop: multiVoice, watchDrag: multiVoice}}
        autoplay={
          multiVoice
            ? {
                delay: 3000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }
            : false
        }
      >
        <VoicesSectionContent voices={voices} />
      </Carousel>
    </section>
  );
};

export default VoicesSection;