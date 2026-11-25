import type {UnSdgsGoalType} from "@/types/unSdgs/unSdgs.types";

function SdgDetailCard({goal}: {goal: UnSdgsGoalType}) {
  const numberLabel = goal.number.toString().padStart(2, "0");

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-[0_24px_56px_0_rgba(26,24,21,0.1)]">
      <div className="px-6 py-10 md:px-14 md:py-11" style={{backgroundColor: goal.color}}>
        <div className="flex items-center justify-between border-b border-white/20 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="rounded border border-white/40 px-2 py-0.5 font-dm-sans text-[9px] font-extrabold tracking-[1.62px] text-white">
              SDG
            </span>
            <span className="font-fraunces-italics text-[13px] text-white/85 tracking-wide">
              {numberLabel} of 17
            </span>
          </div>
          {goal.isActive && (
            <span className="flex items-center gap-2 rounded-full border border-white/20 bg-white/15 px-3 py-1">
              <span className="size-1.5 rounded-full bg-white" aria-hidden/>
              <span className="font-dm-sans text-[10px] font-bold tracking-[1.8px] text-white">
                ACTIVE
              </span>
            </span>
          )}
        </div>
        <div className="mt-6 flex items-center gap-6">
          <span className="font-fraunces-italics text-[72px] md:text-[100px] leading-none tracking-[-0.07em] text-white">
            {numberLabel}
          </span>
          <span className="border-l border-white/20 pl-6 font-fraunces-italics text-[24px] md:text-[32px] leading-tight tracking-tight text-white">
            {goal.title}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-7 px-6 py-8 md:px-14 md:py-10">
        <div className="border-b border-[#1A18151A] pb-7">
          <div className="mb-3.5 flex items-center gap-3">
            <span className="h-[1.5px] w-[18px] bg-[#6b6761]" aria-hidden/>
            <p className="font-dm-sans text-[10.5px] font-extrabold tracking-[2.1px] text-[#6b6761]">
              GLOBAL PURPOSE
            </p>
          </div>
          <p className="font-fraunces-italics text-base md:text-[16.5px] leading-relaxed text-[#6b6761]">
            {goal.globalPurpose}
          </p>
        </div>

        <div>
          <div className="mb-3.5 flex items-center gap-3">
            <span className="h-[1.5px] w-[18px] bg-primary-red" aria-hidden/>
            <p className="font-dm-sans text-[10.5px] font-extrabold tracking-[2.1px] text-primary-red">
              YUVA&apos;S ALIGNMENT
            </p>
            <span className="ml-auto rounded bg-primary-red/10 px-2 py-0.5 font-dm-sans text-[9px] font-extrabold tracking-[1.44px] text-primary-red">
              OUR WORK
            </span>
          </div>
          <p className="font-fraunces-italics text-lg md:text-[22px] leading-[1.42] text-[#1a1815]">
            {goal.yuvaAlignmentHighlight && goal.yuvaAlignment.includes(goal.yuvaAlignmentHighlight) ? (
              <>
                {goal.yuvaAlignment.split(goal.yuvaAlignmentHighlight)[0]}
                <strong className="font-bold text-primary-red">{goal.yuvaAlignmentHighlight}</strong>
                {goal.yuvaAlignment.split(goal.yuvaAlignmentHighlight)[1]}
              </>
            ) : (
              goal.yuvaAlignment
            )}
          </p>
        </div>
      </div>
    </div>
  );
}

export default SdgDetailCard;
