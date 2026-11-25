import Image from "next/image";
import type {ImpactPartnerItem} from "@/types/impact/impact.types";

function PartnerCard({
	                     partner,
	                     showTitleOnHover = false,
                     }: {
	partner: ImpactPartnerItem;
	showTitleOnHover?: boolean;
}) {
	return (
		<article className="flex flex-col items-center gap-2 text-center group w-full">
			<div
				className={`relative rounded-[9px] flex items-center justify-center p-3 sm:p-4 md:p-5 lg:p-6 w-full h-[110px] sm:h-[130px] md:h-[150px] xl:h-[165px] transition-all duration-300 bg-white ${
					showTitleOnHover
						? "border border-[#2D2A2614] hover:border-primary-red hover:shadow-md"
						: "border border-transparent hover:border-primary-red hover:shadow-md"
				}`}
			>
				<div className="relative w-full h-full flex items-center justify-center">
					<Image
						src={partner.img.src}
						alt={partner.img.alt || partner.name || "Yuva CSR Partner Logo"}
						width={240}
						height={160}
						loading="lazy"
						className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105"
						sizes="(max-width: 640px) 33vw, (max-width: 1024px) 25vw, 20vw"
					/>
				</div>
			</div>

			{showTitleOnHover && (
				<p
					className="text-[10px] sm:text-[11px] font-bold text-[#2D2A26] uppercase tracking-widest leading-tight mt-1 overflow-hidden opacity-0 group-hover:opacity-100 transition-all duration-300 text-center">
					{partner.description ?? partner.name}
				</p>
			)}
		</article>
	);
}

export default PartnerCard;
