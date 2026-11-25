"use client";

import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export const PrimaryButton = ({
  leftIcon,
  rightIcon,
  label,
  btnClassName,
  textClassName,
  href,
  target = "_self",
  type = "button",
  onClickAction,
  disabled = false,
  hasHoverEffect = true,
}: {
  onClickAction?: () => void;
  href?: string;
  target?: "_blank" | "_self";
  type?: "button" | "submit" | "reset";
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  label?: string;
  btnClassName?: string;
  textClassName?: string;
  disabled?: boolean;
  hasHoverEffect?: boolean;
}) => {
  const hoverEffectClasses = hasHoverEffect
    ? "transition-all duration-300 ease-in-out  hover:shadow-lg hover:opacity-90 active:translate-y-0 active:scale-95"
    : "";

  if (href?.startsWith("#")) {
    return (
      <a
        href={href}
        className={cn(
          "py-4.5 px-9 bg-primary-red hover:cursor-pointer rounded-full items-center justify-center text-white typo-body3 flex flex-wrap flex-row gap-2 group",
          hoverEffectClasses,
          btnClassName,
        )}
      >
        {leftIcon && <span className={"shrink-0"}>{leftIcon}</span>}
        <span className={cn("shrink-0", textClassName)}>{label}</span>
        {rightIcon && <span className={"shrink-0"}>{rightIcon}</span>}
      </a>
    );
  }

  return href ? (
    <Link
      href={href}
      target={target}
      className={cn(
        "py-4.5 px-9 bg-primary-red hover:cursor-pointer rounded-full items-center justify-center text-white typo-body3 flex flex-wrap flex-row gap-2 group",
        hoverEffectClasses,
        btnClassName,
      )}
    >
      {leftIcon && <span className={"shrink-0"}>{leftIcon}</span>}
      <span className={cn("shrink-0", textClassName)}>{label}</span>
      {rightIcon && <span className={"shrink-0"}>{rightIcon}</span>}
    </Link>
  ) : (
    <button
      type={type}
      onClick={onClickAction}
      disabled={disabled}
      className={cn(
        "py-4.5 px-9 bg-primary-red hover:cursor-pointer rounded-full items-center justify-center text-white typo-body3 flex flex-wrap flex-row gap-2 group",
        hoverEffectClasses,
        btnClassName,
      )}
    >
      {leftIcon && <span className={"shrink-0"}>{leftIcon}</span>}
      <span className={cn("shrink-0", textClassName)}>{label}</span>
      {rightIcon && <span className={"shrink-0"}>{rightIcon}</span>}
    </button>
  );
};
