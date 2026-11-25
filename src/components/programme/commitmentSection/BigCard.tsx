// import React from 'react';
// import type {ProgrammeCommitmentSectionType} from "@/types/programme/programme.types";
// import {ArrowRightIcon} from "lucide-react";
// import {cn} from "@/lib/utils";
// import Image from "next/image";

// const BigCard = ({card}: { card: ProgrammeCommitmentSectionType['cards'][0] }) => {
//   return (
//     <>
//       <div className={cn("lg:w-45/100 aspect-167/130 lg:aspect-auto lg:relative lg:overflow-hidden")}>
//         <Image src={card?.img?.src || ""} alt={card?.img?.alt || ""} width={10000} height={10000}
//                className={"w-full h-full object-cover lg:absolute lg:inset-0 aspect-167/130 lg:aspect-auto"}/>
//       </div>
//       <div className="flex-1 flex flex-col gap-5 p-4 xl:py-10 xl:px-15">
//         <div className={cn("flex flex-col gap-5")}>
//           <div className="flex flex-wrap flex-row gap-2.5 items-center">
//             <div className="size-1.5 rounded-[1px] bg-primary-red"/>
//             <p className="typo-body2 shrink-0 uppercase text-primary-red">{card.heading}</p>
//           </div>
//           <div className="flex flex-col gap-3">
//             <h3
//               className={"typo-h3 text-[clamp(1.5rem,1.31vw+1.19rem,2.375rem)]! font-semibold!"}>{card.title}</h3>
//             <p className="typo-body3 text-[14px]! lg:text-[16px]! text-[#6B6761]">{card.body}</p>
//           </div>
//         </div>
//         <div className="flex flex-col gap-7.5">
//           {card.points.map((point, index) => (
//             <div key={index} className={"flex flex-col gap-3"}>
//               <h4
//                 className={"typo-h4 text-primary-red font-fraunces-italics! font-semibold! text-[20px]! lg:text-[24px]!"}>{point.title}</h4>
//               <div className="flex flex-col">
//                 {point.body.map((point, index) => (
//                   <div key={index} className={"flex flex-wrap flex-row gap-2"}>
//                     <ArrowRightIcon className={"text-primary-red size-4 shrink-0 mt-1"}/>
//                     <p className="flex-1 typo-body3 text-[14px]! lg:text-[16px]! text-[#6B6761]">{point}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </>
//   );
// };

// export default BigCard;


import React from 'react';
import type { ProgrammeCommitmentSectionType } from "@/types/programme/programme.types";
import { ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

const BigCard = ({ card }: { card: ProgrammeCommitmentSectionType['cards'][0] }) => {
  return (
    <>
      <div className={cn("lg:w-45/100 aspect-167/130 lg:aspect-auto lg:relative lg:overflow-hidden")}>
        {card?.img?.src ? (
          <Image 
            src={card.img.src} 
            alt={card.img.alt || card.title || "Yuva Unstoppable Programme Card Image"} 
            width={640} 
            height={480}
            loading="lazy"
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={"w-full h-full object-cover lg:absolute lg:inset-0 aspect-167/130 lg:aspect-auto"}
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400">No Image</div>
        )}
      </div>
      <div className="flex-1 flex flex-col gap-5 p-4 xl:py-10 xl:px-15">
        <div className={cn("flex flex-col gap-5")}>
          <div className="flex flex-wrap flex-row gap-2.5 items-center">
            <div className="size-1.5 rounded-[1px] bg-primary-red"/>
            <p className="typo-body2 shrink-0 uppercase text-primary-red">{card?.heading || ""}</p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className={"typo-h3 text-[clamp(1.5rem,1.31vw+1.19rem,2.375rem)]! font-semibold!"}>
              {card?.title || ""}
            </h3>
            <p className="typo-body3 text-[14px]! lg:text-[16px]! text-[#6B6761]">{card?.body || ""}</p>
          </div>
        </div>
        <div className="flex flex-col gap-7.5">
          {(card?.points || []).map((point, index) => (
            <div key={index} className={"flex flex-col gap-3"}>
              <h4 className={"typo-h4 text-primary-red font-fraunces-italics! font-semibold! text-[20px]! lg:text-[24px]!"}>
                {point?.title || ""}
              </h4>
              <div className="flex flex-col">
                {(point?.body || []).map((textPoint, pIdx) => (
                  <div key={pIdx} className={"flex flex-wrap flex-row gap-2"}>
                    <ArrowRightIcon className={"text-primary-red size-4 shrink-0 mt-1"}/>
                    <p className="flex-1 typo-body3 text-[14px]! lg:text-[16px]! text-[#6B6761]">{textPoint}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BigCard;