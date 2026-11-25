import React from 'react';
import type {VolunteerHeroSectionType} from "@/types/volunteer/volunteer.types";
import Image from "next/image";
import {PrimaryButton} from "@/components/common/Buttons";

interface HeroSectionProps {
	hero: VolunteerHeroSectionType;
}

function HeroSection({hero}: HeroSectionProps) {
	return (
		<section
			className={"flex bg-white flex-col xl:flex-row gap-8 xl:gap-0 pb-14 xl:pb-0 xl:w-full"}>
			<div
				className="w-916/1000 mx-auto xl:mx-0 xl:min-w-1/2 xl:px-20 xl:py-18 pt-8 justify-end flex flex-col gap-6 xl:gap-10">
				<div className="flex flex-col gap-6 xl:gap-7">
					<p
						className={"typo-body2 text-primary-red w-9/10 items-center uppercase font-extrabold! flex flex-row gap-3"}>
						<div className="bg-primary-red w-11 h-0.5"/>
						{hero.heading}
					</p>
					<h1 className="typo-h1">
						{hero.title1}{" "}
						<span className="text-primary-red">{hero.highlightedTitle}{" "}</span>
						{hero.title2}
					</h1>
					<p className={"text-[#6B6761] typo-body3 xl:w-83/100"}>
						{hero.body1}{" "}
						<span className="font-extrabold! text-[#1A1815]">{hero.highlightedBody}</span>{" "}
						{hero.body2}
					</p>
				</div>
				<div className="flex flex-row gap-2 md:gap-3 xl:gap-4">
					<PrimaryButton btnClassName={"py-4 px-7"} label={hero.cta1.text} href={hero.cta1.href}/>
					<PrimaryButton btnClassName={"py-4 px-7 bg-transparent border border-primary-red text-[#1A1815]"}
					               label={hero.cta2.text}
					               href={hero.cta2.href}/>
				</div>
			</div>
			<div className="w-916/1000 mx-auto xl:mx-0 xl:min-w-1/2">
				<div className="relative h-full">
					<Image
						src={hero.img.src}
						alt={hero.img.alt || "Volunteer with Yuva Unstoppable"}
						width={640}
						height={640}
						priority
						sizes="(max-width: 1280px) 100vw, 50vw"
						className={"w-full h-auto xl:h-full aspect-square xl:aspect-auto object-cover"}
					/>
					<div
						className="max-w-57 xl:max-w-60 absolute bottom-2 right-2 lg:bottom-9 lg:right-9 bg-[#FFFFFFF2] rounded-xl p-4 xl:py-5 xl:px-6 flex flex-col gap-1">
						<p className={"typo-h2 text-primary-red"}>{hero.badge.title}</p>
						<p className={"typo-body2 text-[#6B6761] font-extrabold! uppercase"}>{hero.badge.body}</p>
					</div>
				</div>
			</div>
		</section>
	);
}

export default HeroSection;