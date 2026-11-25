"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import Image from "next/image";
import {Download, Loader2} from "lucide-react";
import {AnimatePresence, motion} from "motion/react";
import type {ImpactReportItem, ImpactReportsSectionType} from "@/types/impact/impact.types";
import {EyeTrackingIcon} from "../../../../public/SVGs/svg";
import {ReportGridSkeleton} from "@/components/common/skeleton/impact/ReportCardSkeleton";

const PAGE_SIZE = 12;

function ReportCard({report, index}: { report: ImpactReportItem; index: number }) {
	const hasPdf = Boolean(report.downloadHref) && report.downloadHref !== "#";
	const [isDownloading, setIsDownloading] = useState(false);

	const handleDownload = async (e: React.MouseEvent<HTMLButtonElement>) => {
		if (!report.downloadHref) return;
		e.preventDefault();
		setIsDownloading(true);
		try {
			const url = `/api/download?url=${typeof window !== 'undefined' ? window.btoa(report.downloadHref) : ''}`;
			const res = await fetch(url);
			if (!res.ok) throw new Error("Failed to download");
			const blob = await res.blob();
			const blobUrl = window.URL.createObjectURL(blob);
			const link = document.createElement("a");
			link.href = blobUrl;
			link.download = report.downloadHref.split('/').pop() || 'report.pdf';
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
			window.URL.revokeObjectURL(blobUrl);
		} catch (err) {
			console.error(err);
			// Fallback
			window.open(report.downloadHref, '_blank');
		} finally {
			setIsDownloading(false);
		}
	};

	return (
		<motion.div
			initial={{opacity: 0, y: 24}}
			animate={{opacity: 1, y: 0}}
			transition={{duration: 0.4, delay: (index % PAGE_SIZE) * 0.05, ease: "easeOut"}}
			className="rounded-b-2xl hover:-translate-y-2.5 hover:shadow-lg shadow-[rgba(26,24,21,0.5)] transition-all duration-300 rounded-t-2xl border border-[rgba(0,0,0,0.19)]  overflow-hidden flex flex-col h-full"
		>
			<div className="relative aspect-[4/3] overflow-hidden">
				<Image
					src={report.img.src}
					alt={report.img.alt || report.title || "Yuva Impact Report Cover"}
					fill
					loading="lazy"
					sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
					className="object-cover rounded-t-xl"
				/>
				<div className="absolute inset-0 bg-[rgba(0,0,0,0.39)]"/>
				<div
					className="absolute top-4 left-4 bg-white border-l-3 border-primary-red text-[16px] font-semibold font-dm-sans px-3 py-1.5 rounded-lg text-primary-red">
					{report.month}
				</div>
				{hasPdf ? (
					<a
						href={`/api/view?q=${typeof window !== 'undefined' ? window.btoa(report.downloadHref) : ''}`}
						target="_blank"
						rel="noopener noreferrer"
						aria-label={`View ${report.title}`}
						className="absolute top-4 right-4 border border-[rgba(184,9,9,0.10)] bg-[#F7F5F2] hover:bg-white rounded-full px-3 py-1.5 flex items-center gap-1 transition-colors cursor-pointer"
					>
						<EyeTrackingIcon/>
					</a>
				) : (
					<div
						className="absolute top-4 right-4 border border-[rgba(184,9,9,0.10)] bg-[#F7F5F2] rounded-full px-3 py-1.5 flex items-center gap-1">
						<EyeTrackingIcon/>
					</div>
				)}
			</div>

			<div className="px-4 py-4 flex flex-col gap-3 flex-1">
				<p className="font-dm-sans text-[24px] font-semibold leading-[110%] text-[#141C25]">
					{report.title}
				</p>
				<div className="flex items-center gap-2 mt-auto">
					<button
						type="button"
						onClick={handleDownload}
						aria-label={`Download ${report.title}`}
						className="flex items-center gap-1.5 bg-primary-red hover:bg-primary-red/90 text-white text-[16px] font-semibold font-sans px-7 py-2 rounded-full transition-colors cursor-pointer"
					>
						{isDownloading ? (
							<Loader2 size={16} className="animate-spin" strokeWidth={2.5}/>
						) : (
							<Download size={16} strokeWidth={2.5}/>
						)}
						{isDownloading ? "Downloading..." : "Download"}
					</button>
				</div>
			</div>
		</motion.div>
	);
}

interface ImpactReportsSectionProps {
	reportsSection: ImpactReportsSectionType;
}

const ImpactReportsSection: React.FC<ImpactReportsSectionProps> = ({reportsSection}) => {
	const allReports = reportsSection.reports;
	const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
	const [isLoading, setIsLoading] = useState(false);
	const sentinelRef = useRef<HTMLDivElement>(null);

	const loadMore = useCallback(() => {
		if (isLoading || visibleCount >= allReports.length) return;
		setIsLoading(true);
		setTimeout(() => {
			setVisibleCount((prev) => Math.min(prev + PAGE_SIZE, allReports.length));
			setIsLoading(false);
		}, 700);
	}, [isLoading, visibleCount, allReports.length]);

	useEffect(() => {
		const sentinel = sentinelRef.current;
		if (!sentinel) return;
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) loadMore();
			},
			{threshold: 0.1}
		);
		observer.observe(sentinel);
		return () => observer.disconnect();
	}, [loadMore]);

	const visibleReports = allReports.slice(0, visibleCount);
	const hasMore = visibleCount < allReports.length;

	return (
		<section className="w-full bg-[#F7F5F2] py-16 xl:py-20">
			<div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-10">
				<div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
					<AnimatePresence>
						{visibleReports.map((report, i) => (
							<ReportCard key={`${report.month}-${i}`} report={report} index={i}/>
						))}
					</AnimatePresence>
					{isLoading && <ReportGridSkeleton count={PAGE_SIZE}/>}
				</div>

				{hasMore && !isLoading && <div ref={sentinelRef} className="h-10"/>}
			</div>
		</section>
	);
};

export default ImpactReportsSection;
