"use client";

import type {HTMLAttributes} from "react";
import {ChevronLeftIcon, ChevronRightIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {CarouselNextButton, CarouselPrevButton} from "./CarouselNavButtons";

/** Shared circular arrow control used across carousel navigation. */
export const carouselNavButtonClass =
  "size-10 xl:size-11 text-primary-red border border-[#241E191F] rounded-full flex items-center justify-center bg-[#FBF7EF]/95 backdrop-blur-sm transition-all duration-200 hover:bg-white hover:border-primary-red/35 hover:shadow-[0_4px_16px_0_rgba(36,30,25,0.08)] disabled:opacity-40 disabled:pointer-events-none";

export type CarouselNavPosition = "top" | "center" | "bottom";
export type CarouselNavType = "spread" | "compact";
export type CarouselNavDirection = "left" | "center" | "right";

interface CarouselTopNavProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Vertical placement of the arrow controls.
   * - `top` — above the slides
   * - `center` — vertically centered on the carousel
   * - `bottom` — below the slides (`compact`) or overlaid at the bottom edge (`spread`)
   */
  position?: CarouselNavPosition;
  /**
   * Layout of the prev/next controls.
   * - `spread` — pinned to the left and right edges (default)
   * - `compact` — grouped together on one horizontal line
   */
  type?: CarouselNavType;
  /**
   * Horizontal alignment of the controls.
   * - `spread` — always left edge + right edge (`direction` is ignored)
   * - `compact` — aligns the grouped pair: `left`, `center` (default), or `right`
   */
  direction?: CarouselNavDirection;
}

const compactDirectionClass: Record<CarouselNavDirection, string> = {
  left: "justify-start",
  center: "justify-center",
  right: "justify-end",
};

function resolveLayoutClass(
  position: CarouselNavPosition,
  type: CarouselNavType,
  direction: CarouselNavDirection
): {className: string; overlay: boolean} {
  const edgePadding = "px-[4.2%] xl:px-[5.6%]";
  const compactAlign = compactDirectionClass[direction];

  if (type === "compact") {
    switch (position) {
      case "top":
        return {
          overlay: false,
          className: cn(
            "relative flex w-full items-center gap-4",
            compactAlign,
            edgePadding
          ),
        };
      case "center":
        return {
          overlay: true,
          className: cn(
            "pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center gap-4",
            compactAlign,
            edgePadding
          ),
        };
      case "bottom":
        return {
          overlay: false,
          className: cn(
            "relative order-last flex w-full items-center gap-4",
            compactAlign,
            edgePadding,
            "mt-6 xl:mt-8"
          ),
        };
    }
  }

  switch (position) {
    case "top":
      return {
        overlay: false,
        className: cn(
          "relative flex w-full items-center justify-between",
          edgePadding
        ),
      };
    case "center":
      return {
        overlay: true,
        className: cn(
          "pointer-events-none absolute inset-x-0 top-1/2 z-10 flex -translate-y-1/2 items-center justify-between",
          edgePadding
        ),
      };
    case "bottom":
      return {
        overlay: true,
        className: cn(
          "pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-center justify-between",
          edgePadding
        ),
      };
  }
}

function NavButton({
  action,
  overlay,
}: {
  action: "prev" | "next";
  overlay: boolean;
}) {
  const Button = action === "prev" ? CarouselPrevButton : CarouselNextButton;
  const label = action === "prev" ? "Previous slide" : "Next slide";
  const Icon = action === "prev" ? ChevronLeftIcon : ChevronRightIcon;

  return (
    <Button
      className={cn(carouselNavButtonClass, overlay && "pointer-events-auto")}
      aria-label={label}
    >
      <Icon className="size-5" strokeWidth={2} />
    </Button>
  );
}

/**
 * Prev / next controls for a carousel.
 * Must be rendered inside `<Carousel>` (which is `position: relative`).
 *
 * For `position="bottom"` + `type="compact"`, place before or after `CarouselContent`
 * — `order-last` keeps it below the slides when placed before.
 */
export function CarouselTopNav({
  className,
  position = "top",
  type = "spread",
  direction = "center",
  ...rest
}: CarouselTopNavProps) {
  const {className: layoutClass, overlay} = resolveLayoutClass(
    position,
    type,
    direction
  );

  return (
    <div className={cn(layoutClass, className)} {...rest}>
      <NavButton action="prev" overlay={overlay} />
      <NavButton action="next" overlay={overlay} />
    </div>
  );
}
