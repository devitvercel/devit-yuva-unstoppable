import Image from "next/image";
import {UserRound} from "lucide-react";
import {cn} from "@/lib/utils";
import {hasPersonImage} from "@/constants/personPlaceholder.constants";

interface PersonImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  fill?: boolean;
  width?: number;
  height?: number;
  sizes?: string;
}

/**
 * Person portrait helper.
 * Use `fill` whenever the parent is `relative` and sized (hero cards, modals,
 * leadership columns). Fixed width/height alone will not cover those boxes.
 */
const PersonImage = ({
  src,
  alt,
  className,
  imageClassName,
  fill = false,
  width = 600,
  height = 600,
  sizes,
}: PersonImageProps) => {
  if (!hasPersonImage(src)) {
    return (
      <div
        className={cn(
          "flex items-center justify-center bg-[#ebe8e2]",
          fill ? "absolute inset-0" : "h-full w-full",
          className
        )}
        role="img"
        aria-label={alt}
      >
        <UserRound className="size-[28%] min-h-12 min-w-12 text-[#6B6761]/30" strokeWidth={1.25} />
      </div>
    );
  }

  const safeAlt = alt?.trim() || "Yuva Unstoppable Team Member";

  if (fill) {
    return (
      <Image
        src={src!}
        alt={safeAlt}
        fill
        sizes={sizes ?? "(max-width: 768px) 100vw, 50vw"}
        className={cn("object-cover", imageClassName, className)}
      />
    );
  }

  return (
    <Image
      src={src!}
      alt={safeAlt}
      width={width}
      height={height}
      sizes={sizes}
      className={cn("w-full h-full object-cover", imageClassName, className)}
    />
  );
};

export default PersonImage;
