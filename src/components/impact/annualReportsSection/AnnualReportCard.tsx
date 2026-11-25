"use client";

import { useState } from "react";
import Image from "next/image";
import { Download, Loader2 } from "lucide-react";
import type { ImpactAnnualReportItem } from "@/types/impact/impact.types";

function formatYearBadge(year: string) {
  return year.replace(/(\d{4})-(\d{4})/, (_, start, end) => `${start}-${end.slice(-2)}`);
}

function AnnualReportCard({ report }: { report: ImpactAnnualReportItem }) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!report.fileUrl) return;
    e.preventDefault();
    setIsDownloading(true);
    try {
        const url = `/api/download?url=${encodeURIComponent(report.fileUrl)}`;
        const res = await fetch(url);
        if (!res.ok) throw new Error("Failed to download");
        const blob = await res.blob();
        const blobUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = report.fileUrl.split('/').pop() || 'report.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(blobUrl);
    } catch (err) {
        console.error(err);
        // Fallback to opening in new tab if blob fetch fails
        window.open(report.fileUrl, '_blank');
    } finally {
        setIsDownloading(false);
    }
  };

  return (
    <a
      href={report.fileUrl || "#"}
      onClick={handleDownload}
      className="group flex flex-col w-full mx-auto overflow-hidden rounded-[13px] bg-white border border-[#00000014] shadow-[0_2px_10px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative h-auto aspect-343/339 xl:aspect-373/339 w-full overflow-hidden rounded-t-[13px] bg-primary-red">
        {report.img?.src && (
          <Image
            src={report.img.src}
            alt={report.img.alt || report.title || "Annual Report Cover Image"}
            fill
            loading="lazy"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        )}

        <div className="absolute top-5 left-5 bg-white rounded-[8px] px-5 sm:px-6 py-2 shadow-sm z-1">
          <span className="text-sm sm:text-base font-semibold text-primary-red leading-none">
            {formatYearBadge(report.year)}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 px-5 sm:px-6 py-5 sm:py-6 min-h-[88px] bg-white rounded-b-[13px]">
        <div className="flex flex-col gap-0.5 text-left">
          <p className="text-base sm:text-lg font-medium text-[#141C25] leading-tight">
            {report.title}
          </p>
          <p className="text-base sm:text-lg font-bold text-[#141C25] leading-tight">
            {report.year}
          </p>
        </div>

        {isDownloading ? (
          <Loader2 
            className="size-8 sm:size-9 text-primary-red shrink-0 animate-spin" 
            strokeWidth={2.2} 
          />
        ) : (
          <Download
            className="size-8 sm:size-9 text-primary-red shrink-0 transition-transform duration-300 group-hover:scale-110"
            strokeWidth={2.2}
          />
        )}
      </div>
    </a>
  );
}

export default AnnualReportCard;
