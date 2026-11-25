import { markFallback } from "@/lib/utils";
import type { VocStoriesSectionType, VocStoryItemType } from "@/types/voiceOfChange/voiceOfChange.types";

const BASE = "/assets/pages/voiceofchange";

/** Card image shown when a WP post has no featured image set. */
export const VOC_CARD_FALLBACK_IMG = {
  src: `${BASE}/blog-placeholder.avif`,
  alt: "Yuva Unstoppable story",
};

const IMGS = [
  { src: `${BASE}/Student%20learning.png`,   alt: "Graduate student with diploma" },
  { src: `${BASE}/Student%20learning-1.png`, alt: "Community celebration" },
  { src: `${BASE}/Student%20learning-2.png`, alt: "Female doctor" },
  { src: `${BASE}/Student%20learning-3.png`, alt: "Construction workers" },
  { src: `${BASE}/Student%20learning-4.png`, alt: "Male doctor with stethoscope" },
];

const CATS = ["EDUCATION", "COMMUNITY", "HEALTH", "INFRASTRUCTURE", "HEALTH"] as const;

const TITLES = [
  "The First Generation to Graduate.",
  "Building Schools Where Roads Once Ended.",
  "One Nurse, Ten Thousand Patients.",
  "Clean Water Changed Everything.",
  "When Girls Stopped Dropping Out.",
  "A Classroom Under a Mango Tree.",
  "The Doctor Who Came Back.",
  "Bridges That Brought Teachers In.",
  "How a Library Transformed a Village.",
  "From Labourer to Engineer.",
];

const BODIES = [
  "Meet the ten students who broke a century-old cycle of poverty by becoming the first in their village to complete secondary schooling.",
  "In a region where floods washed away paths every monsoon, a new bridge meant children could finally reach school without missing months.",
  "She was the only trained nurse for sixty kilometres. Now her clinic handles over a hundred consultations a week.",
  "A single water purification unit reduced waterborne illness by forty percent in the first year alone.",
  "Attendance among girls tripled after the school added a separate sanitation block and a women-led safety committee.",
  "Without four walls or a roof, a dedicated teacher held class every morning. Twelve of those students passed state board exams.",
  "He left his village at sixteen to study medicine. Ten years later he returned to build the district's first paediatric ward.",
  "A small footbridge cut travel time to school from three hours to twenty minutes for over two hundred children.",
  "The mobile library visits eight villages a week. Literacy rates have climbed steadily every year since it launched.",
  "Starting as a construction labourer at fourteen, Ravi enrolled in our vocational programme and now leads a team of twenty.",
];

const DATES = [
  "JANUARY 08, 2025", "FEBRUARY 14, 2025", "MARCH 22, 2025", "APRIL 12, 2025",
  "MAY 05, 2025", "JUNE 17, 2025", "JULY 30, 2025", "AUGUST 09, 2025",
  "SEPTEMBER 21, 2025", "OCTOBER 03, 2025", "NOVEMBER 11, 2025", "DECEMBER 25, 2025",
];

function makeStory(i: number): VocStoryItemType {
  const idx = i % 5;
  return {
    img: IMGS[idx],
    category: CATS[idx],
    date: markFallback(DATES[i % DATES.length]),
    title: markFallback(TITLES[i % TITLES.length]),
    body: markFallback(BODIES[i % BODIES.length]),
    href: "/voice-of-change",
  };
}

export const vocStoriesFallback: VocStoriesSectionType = {
  stories: Array.from({ length: 50 }, (_, i) => makeStory(i)),
};
