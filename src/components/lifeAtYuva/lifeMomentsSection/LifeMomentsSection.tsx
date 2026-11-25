import Image from "next/image";
import type {LifeAtYuvaMomentType} from "@/types/lifeAtYuva/lifeAtYuva.types";

function MomentCard({moment}: { moment: LifeAtYuvaMomentType }) {
	return (
		<div className="relative overflow-hidden rounded-lg bg-[#ebe8e2] h-full min-h-45">
			<Image
				src={moment.img.src}
				alt={moment.img.alt || moment.label || "Life at Yuva Moment Image"}
				fill
				loading="lazy"
				sizes="(max-width: 768px) 100vw, 33vw"
				className="object-cover hover:scale-105 transition-all duration-300"
			/>
			<div className="absolute inset-x-0 bottom-0 h-15 bg-linear-to-b from-transparent to-[rgba(26,24,21,0.55)]"/>
			<p
				className="absolute bottom-4 left-4 font-dm-sans text-[11px] font-bold uppercase tracking-[1.54px] text-[rgba(255,255,255,0.8)]">
				{moment.label}
			</p>
		</div>
	);
}

function LifeMomentsSection({
	                            lifeMoments,
                            }: {
	lifeMoments: {
		heading: string;
		title: string;
		highlightedTitle: string;
		body: string;
		moments: LifeAtYuvaMomentType[];
	};
}) {
	const [featured, ...small] = lifeMoments.moments;

	return (
		<section className="bg-[#FDFBF7] px-5 md:px-10 xl:px-20 py-16 xl:py-25">
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-12">
				<div className="flex flex-col gap-8 xl:flex-row xl:items-end xl:justify-between">
					<div className="flex flex-col gap-4 max-w-78.75">
						<div className="flex items-center gap-2.5">
							<span className="size-1.5 rounded-[1px] bg-primary-red" aria-hidden/>
							<p className="font-dm-sans text-[11px] font-bold uppercase tracking-[2.2px] text-primary-red">
								{lifeMoments.heading}
							</p>
						</div>
						<h2
							className="font-fraunces-italics text-[clamp(32px,5vw,48px)] leading-[1.04] tracking-[-1.2px] text-[#1a1815]">
							{lifeMoments.title}
							<br/>
							<span className="text-primary-red">{lifeMoments.highlightedTitle}</span>
						</h2>
					</div>
					<p className="max-w-85 font-sans text-[14.5px] font-medium leading-6 text-[#6b6761]">
						{lifeMoments.body}
					</p>
				</div>

				<div
					className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-[minmax(0,1.98fr)_minmax(0,1fr)_minmax(0,1fr)] xl:grid-rows-[207px_207px_191px] gap-3 auto-rows-[200px]">
					{featured && (
						<div className="md:col-span-2 xl:col-span-1 xl:row-span-3 min-h-80 xl:min-h-0">
							<MomentCard moment={featured}/>
						</div>
					)}
					{small.map((moment, index) => (
						<div key={`${moment.label}-${index}`} className="min-h-45">
							<MomentCard moment={moment}/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

export default LifeMomentsSection;
