import type { GalleryItem, MediaTab } from "@/types/media/media.types";

export const galleryTabs: MediaTab[] = [
  { id: "photo", label: "Photos" },
  { id: "video", label: "Videos" },
];

export const galleryCategories: MediaTab[] = [
  { id: "all", label: "All", kind: "both" },
  { id: "ceo-celebrities", label: "CEO & Celebrities", kind: "both" },
  { id: "brand-events", label: "Brand Events", kind: "photo" },
  { id: "school-transformation", label: "School Transformation", kind: "both" },
  { id: "event-highlights", label: "Event Highlights", kind: "video" },
];

export const galleryItems: GalleryItem[] = [
  {
    title: "Leaders inspiring young minds",
    category: "ceo-celebrities",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning.png", alt: "Leaders inspiring young minds" },
  },
  {
    title: "Celebrating student achievement",
    category: "brand-events",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-1.png", alt: "Celebrating student achievement" },
  },
  {
    title: "A transformed learning space",
    category: "school-transformation",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-2.png", alt: "A transformed learning space" },
  },
  {
    title: "Inspiring children through reading",
    category: "ceo-celebrities",
    kind: "video",
    img: { src: "/assets/pages/voiceofchange/Student learning-3.png", alt: "Inspiring children through reading" },
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Volunteers painting classroom walls",
    category: "event-highlights",
    kind: "video",
    img: { src: "/assets/pages/voiceofchange/Student learning-4.png", alt: "Volunteers painting classroom walls" },
    href: "https://vimeo.com/76979871",
  },
  {
    title: "New smart classrooms setup",
    category: "school-transformation",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning.png", alt: "New smart classrooms setup" },
  },
  {
    title: "Corporate leaders school visit",
    category: "ceo-celebrities",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-1.png", alt: "Corporate leaders school visit" },
  },
  {
    title: "Annual sports day celebration",
    category: "brand-events",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-2.png", alt: "Annual sports day celebration" },
  },
  {
    title: "Clean drinking water facility inauguration",
    category: "school-transformation",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-3.png", alt: "Clean drinking water facility inauguration" },
  },
  {
    title: "President Kalam addressing students",
    category: "ceo-celebrities",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-4.png", alt: "President Kalam addressing students" },
  },
  {
    title: "Interactive learning demo video",
    category: "school-transformation",
    kind: "video",
    img: { src: "/assets/pages/voiceofchange/Student learning.png", alt: "Interactive learning demo video" },
    href: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  },
  {
    title: "Corporate partnership signing event",
    category: "event-highlights",
    kind: "video",
    img: { src: "/assets/pages/voiceofchange/Student learning-1.png", alt: "Corporate partnership signing event" },
    href: "https://vimeo.com/76979871",
  },
  {
    title: "Renovating play areas in municipal schools",
    category: "school-transformation",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-2.png", alt: "Renovating play areas" },
  },
  {
    title: "Prime Minister Modi's encouraging speech",
    category: "ceo-celebrities",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-3.png", alt: "Prime Minister speech" },
  },
  {
    title: "Digital education overview report",
    category: "brand-events",
    kind: "photo",
    img: { src: "/assets/pages/voiceofchange/Student learning-4.png", alt: "Digital education overview" },
  },
];
