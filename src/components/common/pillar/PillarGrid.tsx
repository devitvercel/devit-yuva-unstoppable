import type {ReactNode} from "react";
import RevealStagger from "@/components/common/animations/RevealStagger";
import {cn} from "@/lib/utils";

type PillarGridProps = {
  children: ReactNode;
  className?: string;
  /** When the last item would sit alone in a 2-col row, center it. */
  centerLastWhenOdd?: boolean;
  itemCount?: number;
};

function PillarGrid({
  children,
  className,
  centerLastWhenOdd = false,
  itemCount = 0,
}: PillarGridProps) {
  const isOdd = centerLastWhenOdd && itemCount % 2 !== 0;

  return (
    <RevealStagger
      className={cn("grid grid-cols-1 lg:grid-cols-2 gap-4", className)}
      itemClassName={cn(
        "h-full",
        isOdd &&
          "last:lg:col-span-2 last:lg:w-1/2 last:lg:justify-self-center"
      )}
    >
      {children}
    </RevealStagger>
  );
}

export default PillarGrid;
