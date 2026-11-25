"use client";

import React from 'react';
import type {WaysToGiveSectionType} from "@/types/donate/donate.types";
import RevealStagger from "@/components/common/animations/RevealStagger";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {PrimaryButton} from "@/components/common/Buttons";
import {ArrowRightIcon} from "lucide-react";

interface WaysToGiveSectionProps {
	waysToGiveSection: WaysToGiveSectionType;
}

function WaysToGiveSection({waysToGiveSection}: WaysToGiveSectionProps) {
	const handleCardClick = (titleText: string) => {
		const amount = Number(titleText.replace(/[^0-9]/g, ''));
		window.dispatchEvent(new CustomEvent('select-donation-amount', { detail: { amount } }));
		const formEl = document.getElementById('donate-form');
		if (formEl) {
			formEl.scrollIntoView({ behavior: 'smooth' });
		}
	};

	return (
		<section className={"py-7.5 xl:py-20 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10"}>
			<RevealStagger>
				<div className="flex flex-col gap-4">
					<p className={"typo-body2 text-primary-red flex flex-row gap-2.5 items-center justify-center font-bold!"}>
						<div className={"bg-[#CE202880] h-0.5 w-10"}/>
						{waysToGiveSection.heading}
						<div className={"bg-[#CE202880] h-0.5 w-10"}/>
					</p>
					<div className="flex flex-col gap-3">
						<h2 className="typo-h2 text-center">
							{waysToGiveSection.title}{" "}
							<span className={"text-primary-red"}>{waysToGiveSection.highlightedTitle}</span>
						</h2>
						<p className={"typo-body3 text-[#6B6761] text-center xl:w-1/2 mx-auto"}>{waysToGiveSection.body}</p>
					</div>
				</div>
			</RevealStagger>
			<RevealStagger className={"grid grid-cols-1 xl:grid-cols-3 gap-10 xl:gap-5"}>
				{waysToGiveSection.cards.map((card, index) => (
					<div
						className={cn("rounded-xl flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2.5", index == 1 ? "bg-primary-red text-white hover:shadow-primary-red/50" : "bg-white text-[#1A1815] border border-[#1A18152E] hover:shadow-[#1A1815]/15")}
						key={index}>
						<div className="relative">
							<Image
								src={card.img.src}
								alt={card.img.alt || card.title || "Ways to give"}
								width={434}
								height={326}
								loading="lazy"
								sizes="(max-width: 1280px) 100vw, 434px"
								className={"w-full h-auto aspect-434/326 object-cover"}
							/>
							<div
								className={cn("absolute top-5 left-5 rounded-md py-2 px-3 typo-body2 text-[14px]! font-bold!", index == 1 ? "bg-primary-red text-white" : "bg-[#FFFFFFF2] text-[#1A1815]")}>{card.tag}</div>
						</div>
						<div className="flex flex-col gap-6 py-8 px-7 justify-between h-full">
							<div className="flex flex-col gap-4">
								<div className="flex flex-col gap-3">
									<p className={"typo-h2 text-[clamp(32px,2.25vw + 1.47rem,56px)]!"}>{card.title}</p>
									<p
										className={cn("typo-body2 uppercase flex flex-row gap-2 items-center font-extrabold!", index == 1 ? "text-white" : "text-primary-red")}>
										<div className={cn("w-4 h-0.5", index == 1 ? "bg-white" : "bg-primary-red")}/>
										{card.heading}
									</p>
								</div>
								<div className="flex flex-col gap-2.5">
									<p className={"typo-h4 text-[18px]"}>{card.subtitle}</p>
									<p className={cn("typo-body3 ", index == 1 ? "text-[#FFFFFFD9]" : "text-[#6B6761]")}>{card.body}</p>
								</div>
							</div>
							<div className="">
								<PrimaryButton label={card.cta.text}
								               onClickAction={() => handleCardClick(card.title)}
								               rightIcon={<ArrowRightIcon size={16} strokeWidth={3}/>}
								               btnClassName={cn("bg-[#F7F5F2] py-3 w-full font-extrabold! rounded-[10px] items-center justify-center flex", index == 1 ? "text-primary-red" : "border border-[#1A18152E] text-[#1A1815]")}/>
							</div>
						</div>
					</div>
				))}
			</RevealStagger>
		</section>
	);
}

export default WaysToGiveSection;