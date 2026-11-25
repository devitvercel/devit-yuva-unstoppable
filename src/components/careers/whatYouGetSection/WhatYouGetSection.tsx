import React from 'react';
import type {CareersWhatYouGetSectionType} from "@/types/careers/careers.types";
import RevealStagger from "@/components/common/animations/RevealStagger";

function WhatYouGetSection({whatYouGet}: { whatYouGet: CareersWhatYouGetSectionType }) {
	return (
		<section className={"py-14 xl:py-25 bg-white"}>
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-14">
				<RevealStagger>
					<div className="flex flex-col gap-4">
						<div className="flex flex-row flex-wrap gap-2.5 items-center">
							<div className="bg-primary-red size-1.5 rounded-[1px]"/>
							<p className="typo-body2 text-primary-red uppercase shrink-0">{whatYouGet.heading}</p>
						</div>
						<div className="flex flex-col xl:flex-row gap-6 xl:gap-16">
							<div className="flex-1">
								<h2 className={"typo-h2"}>
									{whatYouGet.title}{" "}
									<span className={"text-primary-red"}>{whatYouGet.highlightedTitle}</span>
								</h2>
							</div>
							<div className="xl:w-1/2">
								<p className={"typo-body3 text-[#6B6761]"}>{whatYouGet.body}</p>
							</div>
						</div>
					</div>
				</RevealStagger>
				<RevealStagger
					className={"grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-5 lg:gap-4"}>
					{whatYouGet.cards.map((card, index) => (
						<div key={index}
						     className={"border border-[#1A18151A] bg-[#F7F5F2] h-full rounded-xl p-4 xl:py-7 xl:px-6 flex flex-row xl:flex-col gap-4.5 xl:gap-11 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-[#1A1815]/25 transition-all duration-300"}>
							<div
								className="size-10 min-w-10 bg-white border border-[#1A18152E] rounded-lg flex items-center justify-center">
								<card.icon/>
							</div>
							<div className="flex flex-col gap-2">
								<p className={"typo-h4 text-[20px]"}>{card.title}</p>
								<p className="typo-body5 text-[#6B6761]">{card.body}</p>
							</div>
						</div>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}

export default WhatYouGetSection;