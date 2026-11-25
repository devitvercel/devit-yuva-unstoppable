import React from 'react';
import type {YourJourneySectionType} from "@/types/volunteer/volunteer.types";

interface YourJourneySectionProps {
	yourJourney: YourJourneySectionType;
}

function YourJourneySection({yourJourney}: YourJourneySectionProps) {
	return (
		<section className={"py-14 xl:py-24 w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-16"}>
			<div className="xl:w-1/2 mx-auto flex flex-col gap-3">
				<div className="flex flex-wrap flex-row gap-2.5 items-center justify-center">
					<div className="size-1.5 rounded-[1px] bg-primary-red"/>
					<p className="typo-body2 shrink-0 uppercase text-primary-red">{yourJourney.heading}</p>
				</div>
				<h2 className={"typo-h2 text-center text-[clamp(32px,0.376vw+1.91rem,36px)]! leading-10 font-fraunces-italics"}>
					{yourJourney.title}{" "}
					<span className={"text-primary-red"}>{yourJourney.highlightedTitle}</span>
				</h2>
			</div>
			<div className="grid grid-cols-1 gap-8 lg:gap-0 lg:grid-cols-4 relative">
				<div
					className="hidden lg:block w-4/5 h-px border-t-2 border-primary-red border-dashed absolute top-7.25 left-1/10"/>
				{yourJourney.steps.map((step, index) => (
					<div key={index} className="group flex flex-row lg:flex-col gap-6 lg:gap-7 lg:items-center lg:px-5 relative">
						<div
							className="relative z-1 size-10 min-w-10 lg:size-15.5 border-2 border-[#1A18152E] rounded-full overflow-hidden flex items-center justify-center bg-white transition-colors duration-500 group-hover:border-primary-red">
							{/* Base Layer: White Bg, Black Text */}
							<div className="absolute inset-0 bg-white flex items-center justify-center text-[#1A1815]">
								<span className="font-fraunces-italics text-[20px] lg:text-[22px]! font-semibold!">{index + 1}</span>
							</div>
							{/* Overlay Layer: Red Bg, White Text (reveals bottom-to-top) */}
							<div
								className="absolute inset-0 bg-primary-red flex items-center justify-center text-white transition-all duration-500 ease-out [clip-path:inset(100%_0_0_0)] group-hover:[clip-path:inset(0%_0_0_0)]">
								<span className="font-fraunces-italics text-[20px] lg:text-[22px]! font-semibold!">{index + 1}</span>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<p className={"typo-body3 text-[20px]! font-bold! lg:text-center"}>{step.title}</p>
							<p className={"typo-body5 text-[#6B6761] lg:text-center"}>{step.body}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}

export default YourJourneySection;