import React from 'react';
import type {OurPeopleLeadershipSectionType} from "@/types/ourPeople/ourPeople.types";
import PersonImage from "@/components/ourPeople/PersonImage";
import Link from "next/link";
import {ArrowRightIcon} from "lucide-react";

const LeadershipSection = ({leadership}: { leadership: OurPeopleLeadershipSectionType }) => {
	return (
		<section className={"py-16 xl:py-25 bg-white"}>
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-8 xl:gap-25">
				{leadership.leaders.map((leader, index) => {
					const isEven = index % 2 === 0;
					return (
						<div key={index}
						     className="rounded-xl shadow-[0_14px_40px_0_rgba(26,24,21,0.06)] border border-[#1A18152E] flex flex-col lg:flex-row overflow-hidden bg-[#F7F5F2]">
							{/* Text Column: Rendered at order-2 on mobile/tablet, and alternates starting from screen size lg */}
							<div
								className={`flex-1 relative py-6 px-4 md:py-10 md:px-8.5 lg:py-15 lg:px-14 flex flex-col gap-4 lg:gap-19.5 order-2 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                <span
	                className={"absolute bottom-7.75 right-7.75 leading-60 font-fraunces-italics text-[300px] text-[#CE20280B] hidden lg:block"}>{leader.name[0]}</span>
								<div className="flex flex-col gap-4 xl:gap-6">
									<div className="flex flex-col gap-4">
										<p className="typo-body2 text-[#6B6761] uppercase">{leader.role}</p>
										<h2 className={"typo-h2"}>{leader.name}</h2>
									</div>
									<div className="flex flex-col gap-4 xl:gap-5">
										<p
											className="ps-4.5 border-l-3 typo-h4 text-[18px]! text-[#6B6761] lg:text-[20px]! border-primary-red">&quot;{leader.quote}&quot;</p>
										<p className="typo-body5 text-[#6B6761]">{leader.body}</p>
									</div>
								</div>
								<div className="">
									<Link href={leader.cta.href}
									      className={"items-center gap-1 typo-body5 flex flex-row flex-wrap font-semibold! text-primary-red"}>
										<span className={"shrink-0 underline-hover-effect"}>{leader.cta.text}</span>
										<ArrowRightIcon size={18}/>
									</Link>
								</div>
							</div>

							{/* Image Column: Rendered at order-1 on mobile/tablet, and alternates starting from screen size lg */}
							<div
								className={`aspect-343/260 lg:aspect-auto w-full lg:w-auto lg:h-auto flex-1 relative overflow-hidden order-1 bg-[#ebe8e2] ${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
							<PersonImage
								src={leader.img.src}
								alt={leader.img.alt || `${leader.name} - ${leader.role}` || "Yuva Leadership Member"}
								fill
								sizes="(max-width: 1024px) 100vw, 50vw"
							/>
								<div
									className="absolute bg-[#FFFFFFF0] bottom-7.5 right-7.5 backdrop-blur-xs rounded-md border border-[#1A18151A] shadow-[0_4px_10px_0_rgba(26,24,21,0.09)] px-4 py-2">
									<p className="typo-body5 text-[12px]! font-fraunces-italics text-primary-red">{leader.badge}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>
		</section>
	);
};

export default LeadershipSection;
