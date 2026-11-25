import React from 'react';
import type {HowYouCanHelpSectionType} from "@/types/volunteer/volunteer.types";
import RevealStagger from "@/components/common/animations/RevealStagger";
import Image from "next/image";

interface HowYouCanHelpSectionProps {
	howYouCanHelp: HowYouCanHelpSectionType;
}

function HowYouCanHelpSection({howYouCanHelp}: HowYouCanHelpSectionProps) {
	return (
		<section id="how-to-help" className={"py-7.5 bg-white xl:py-20"}>
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10 xl:gap-16">
				<RevealStagger>
					<div className="flex flex-col gap-4 xl:w-1/2 mx-auto">
						<div className="flex flex-wrap flex-row gap-2.5 items-center justify-center">
							<div className="size-1.5 rounded-[1px] bg-primary-red"/>
							<p className="typo-body2 shrink-0 uppercase text-primary-red">{howYouCanHelp.heading}</p>
						</div>
						<h2 className={"typo-h2 font-fraunces-italics text-center"}>
							{howYouCanHelp.title1}{" "}
							<span className={"text-primary-red"}>{howYouCanHelp.highlightedTitle}</span>{" "}
							{howYouCanHelp.title2}
						</h2>
						<p className={"text-[#6B6761] typo-body3 text-center"}>{howYouCanHelp.body}</p>
					</div>
				</RevealStagger>
				<RevealStagger className="grid grid-cols-1 xl:grid-cols-3 gap-10 xl:gap-5">
					{howYouCanHelp.cards.map(card => (
						<div key={card.id}
						     className={"flex flex-col border border-[#1A18152E] hover:-translate-y-2.5 hover:shadow-lg shadow-[rgba(26,24,21,0.5)] transition-all duration-300 rounded-xl overflow-hidden h-full"}>
								<Image
									src={card.img.src}
									alt={card.img.alt || card.title || "How you can help"}
									width={560}
									height={420}
									loading="lazy"
									sizes="(max-width: 1280px) 100vw, 413px"
									className="w-full h-auto aspect-413/310 object-cover"
								/>
							<div className="p-6 xl:py-8 xl:px-7 flex flex-col gap-4">
								<div className="">
									<p className={"typo-h2 text-primary-red"}>{card.id}</p>
								</div>
								<div className="flex flex-col gap-4 xl:gap-6">
									<div className="flex flex-col gap-2 xl:gap-4">
										<p className={"typo-h3 not-italic"}>{card.title}</p>
										<p className={"text-[#6B6761] typo-body5 leading-6"}>{card.body}</p>
										<div className="flex flex-col gap-2">
											{card.points.map((point, index) => (
												<div className={"flex flex-row gap-2.5 items-center "} key={index}>
													<div className="rounded-full size-1.5 bg-primary-red"/>
													<p className={"typo-body5"}>{point}</p>
												</div>
											))}
										</div>
									</div>
									<div className="pt-4 border-t border-[#1A18151A]">
										<p className={"text-[#6B6761] typo-body2 tracking-[0.88px] font-extrabold!"}>{card.commitment}</p>
									</div>
								</div>
							</div>
						</div>
					))}
				</RevealStagger>
			</div>
		</section>
	);
}

export default HowYouCanHelpSection;