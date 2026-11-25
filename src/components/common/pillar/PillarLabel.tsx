import type {ReactNode} from "react";

/** Uppercase label with a trailing rule — used above pillar grids. */
function PillarLabel({children}: {children: ReactNode}) {
  return (
    <div className="flex flex-wrap flex-row gap-2.5 lg:gap-3 items-center">
      <span className="shrink-0 typo-body2 uppercase text-[#6B6761] font-extrabold!">
        {children}
      </span>
      <div className="bg-[#6B6761] flex-1 w-full h-px" />
    </div>
  );
}

export default PillarLabel;
