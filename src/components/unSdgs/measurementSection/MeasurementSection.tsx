import type {UnSdgsMeasurementSectionType} from "@/types/unSdgs/unSdgs.types";

function MeasurementSection({measurement}: {measurement: UnSdgsMeasurementSectionType}) {
  return (
    <section className="bg-white px-4 py-16 md:px-10 md:py-10 xl:px-20 xl:pb-20">
      <div className="w-916/1000 xl:w-888/1000 mx-auto">
        <div className="max-w-[869px] flex flex-col gap-5">
          <div className="flex items-center gap-2.5">
            <span className="size-1.5 rounded-[1px] bg-primary-red" aria-hidden/>
            <p className="font-dm-sans text-[11px] font-extrabold uppercase tracking-[2.2px] text-primary-red">
              {measurement.heading}
            </p>
          </div>
          <h2 className="font-fraunces-italics text-[clamp(32px,4vw,52px)] leading-[1.15] tracking-[-0.025em] text-[#1a1815]">
            {measurement.titlePlain}
            <span className="text-primary-red">{measurement.titleHighlight}</span>
          </h2>
          <p className="max-w-[760px] font-sans text-base font-medium leading-[1.77] text-[#6b6761]">
            {measurement.body}
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {measurement.cards.map((card) => (
            <article
              key={card.number}
              className="group flex flex-col rounded-[10px] border border-[#1A18151A] bg-[#f7f5f2] px-8 py-10 transition-transform duration-300 ease-out hover:scale-[1.03] md:px-10 md:py-12"
            >
              <p
                className="font-fraunces-italics text-[64px] leading-none tracking-[-0.03em] text-transparent transition-all duration-300 [-webkit-text-stroke:1px_rgba(206,32,40,0.25)] group-hover:[-webkit-text-stroke:1.5px_#ce2028]"
                style={{paintOrder: "stroke fill"}}
                aria-hidden
              >
                {card.number}
              </p>
              <h3 className="mt-6 font-fraunces-italics text-2xl leading-tight tracking-tight text-[#1a1815]">
                {card.title}
              </h3>
              <p className="mt-3.5 font-sans text-base leading-[1.56] text-[#6b6761]">
                {card.bodyParts.map((part, index) =>
                  part.bold ? (
                    <strong key={index} className="font-bold text-[#1a1815]">
                      {part.text}
                    </strong>
                  ) : (
                    <span key={index}>{part.text}</span>
                  )
                )}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MeasurementSection;
