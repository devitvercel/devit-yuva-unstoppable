import React from 'react';
import type {WhereYouDonationGoesSectionType} from "@/types/donate/donate.types";
import Image from "next/image";
import {cn} from "@/lib/utils";
import RevealStagger from "@/components/common/animations/RevealStagger";

interface WhereYouDonationGoesSectionProps {
	whereYouDonationGoes: WhereYouDonationGoesSectionType;
}

function WhereYouDonationGoesSection({whereYouDonationGoes}: WhereYouDonationGoesSectionProps) {
	return (
		<section className={"py-7.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-5"}>
			<RevealStagger>
				<div className="flex flex-col gap-6">
					<p className={"text-center typo-body2 text-primary-red font-extrabold!"}>{whereYouDonationGoes.heading}</p>
					<div className="flex flex-col gap-5">
						<h2 className={"typo-h2 text-center"}>{whereYouDonationGoes.title}</h2>
						<p className={"text-[#6B6761] typo-body3 text-center xl:w-2/5 mx-auto"}>{whereYouDonationGoes.body}</p>
					</div>
				</div>
			</RevealStagger>
			<RevealStagger className="grid grid-cols-1 lg:grid-cols-3 gap-10 xl:gap-13">
				{whereYouDonationGoes.cards.map((card, index) => (
					<div className="flex flex-col gap-4" key={index}>
						<div className={cn("w-full rounded-xl h-auto aspect-341/245 overflow-hidden", index == 1 && "lg:mt-30.5")}>
							<Image
								src={card.img.src}
								alt={card.img.alt || card.title || "Where your donation goes"}
								width={341}
								height={245}
								loading="lazy"
								sizes="(max-width: 1024px) 100vw, 341px"
								className={cn("w-full rounded-xl h-auto hover:scale-105 transition-all duration-300 aspect-341/245")}
							/>
						</div>
						<div className="flex flex-col gap-3">
							<h3 className={"typo-h3 text-[24px]"}>{card.title}</h3>
							<p className={"typo-body3 text-[#3A312A]"}>{card.body}</p>
						</div>
					</div>
				))}
			</RevealStagger>
		</section>
	);
}

export default WhereYouDonationGoesSection;