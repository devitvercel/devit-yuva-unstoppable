import type {UnSdgsGoalType} from "@/types/unSdgs/unSdgs.types";
import {ChevronRightIcon} from "lucide-react";

function SdgGoalTile({
  goal,
  isSelected,
}: {
  goal: UnSdgsGoalType;
  isSelected: boolean;
}) {
  const numberLabel = goal.number.toString().padStart(2, "0");
  const textColor = goal.isActive ? (isSelected ? "text-primary-red" : "text-[#1a1815]") : "text-[#6b6761]";

  return (
    <>
      {isSelected && (
        <span className="h-[22px] w-[3px] shrink-0 rounded-[2px] bg-primary-red" aria-hidden/>
      )}
      <span
        className="flex size-[30px] shrink-0 items-center justify-center rounded-md font-fraunces-italics text-sm font-semibold text-white"
        style={{
          backgroundColor: goal.color,
          color: goal.textColor ?? "#ffffff",
          boxShadow: isSelected ? "0 0 0 3px white, 0 0 0 4px rgba(26,24,21,0.18)" : undefined,
        }}
      >
        {goal.number}
      </span>
      <span className={`flex-1 font-fraunces-italics text-[15px] font-semibold ${textColor}`}>
        {goal.title}
      </span>
      {isSelected && goal.isActive && (
        <ChevronRightIcon size={14} className="shrink-0 text-primary-red" aria-hidden/>
      )}
      <span className="sr-only">{numberLabel}</span>
    </>
  );
}

export default SdgGoalTile;
