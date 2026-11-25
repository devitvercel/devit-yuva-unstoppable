import type { ImpactAnnualReportItem, ImpactTab } from "@/types/impact/impact.types";

export const annualReportCategories: ImpactTab[] = [
  { id: "all", label: "All" },
  { id: "annual-report", label: "Annual Report" },
  { id: "financial-statement", label: "Financial Statement" },
];

export const annualReports: ImpactAnnualReportItem[] = [
  {
    title: "Annual Report",
    year: "2024-2025",
    category: "annual-report",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
  {
    title: "Annual Report",
    year: "2023-2024",
    category: "annual-report",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
  {
    title: "Financial Statement",
    year: "2022-2023",
    category: "financial-statement",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
  {
    title: "Annual Report",
    year: "2021-2022",
    category: "annual-report",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
  {
    title: "Financial Statement",
    year: "2020-2021",
    category: "financial-statement",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
  {
    title: "Annual Report",
    year: "2019-2020",
    category: "annual-report",
    fileUrl: "/coming-soon",
    img: { src: "/assets/pages/media/reports-image.avif", alt: "Card image" },
  },
];
