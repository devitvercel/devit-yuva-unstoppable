import {markFallback} from "@/lib/utils";
import type {PhotoCarouselSectionType} from "@/types/home/home.types";

export const photoCarouselDataFallback: PhotoCarouselSectionType = {
  eyebrow: markFallback(""),
  title: markFallback("The Real Measure of Our Work"),
  body: markFallback(
    "Awards recognise excellence. Partnerships enable scale. But the greatest measure of our work is the change experienced by the people we serve"
  ),
  carouselContent: [
    {
      bgImg: {src: "/assets/pages/home/carousel-img.avif", alt: "carousel background"},
      img: {src: "/assets/pages/home/img-1.avif", alt: "Chhavi's Journey"},
      eyebrow: markFallback("EDUCATION"),
      heading: markFallback("Chhavi, 18"),
      subHeading: markFallback("HARYANA"),
      title: markFallback("Chhavi's Journey with Yuva Unstoppable"),
      body: markFallback("In bustling Haryana, amidst dreams as vast as the horizon, resides 18-year-old Chhavi who is nurturing her dreams with the help of our education program..."),
      cta: {
        text: markFallback("Read Chhavi's story"),
        href: "/blogs/chhavis-journey-with-yuva-unstoppable"
      }
    },
    {
      bgImg: {src: "/assets/pages/home/carousel-bg-img.avif", alt: "carousel background"},
      img: {src: "/assets/pages/home/img-2.avif", alt: "Health Initiative"},
      eyebrow: markFallback("HEALTH"),
      heading: markFallback("Community Health"),
      subHeading: markFallback("GUJARAT"),
      title: markFallback("A Journey Towards Better Health"),
      body: markFallback("Through our latest health initiative, we've touched the lives of thousands by providing access to clean water and better sanitation facilities in rural Gujarat."),
      cta: {
        text: markFallback("Read the full story"),
        href: "/blogs/chhavis-journey-health"
      }
    },
    {
      bgImg: {src: "/assets/pages/home/carousel-img.avif", alt: "carousel background"},
      img: {src: "/assets/pages/home/img-3.avif", alt: "Community Building"},
      eyebrow: markFallback("COMMUNITY"),
      heading: markFallback("Local Leaders"),
      subHeading: markFallback("MAHARASHTRA"),
      title: markFallback("Empowering Local Communities"),
      body: markFallback("Our community outreach program has empowered local leaders to take charge of their village's development, creating a sustainable model for growth."),
      cta: {
        text: markFallback("Discover their impact"),
        href: "/blogs/chhavis-journey-community"
      }
    },
    {
      bgImg: {src: "/assets/pages/home/carousel-bg-img.avif", alt: "carousel background"},
      img: {src: "/assets/pages/home/img-4.avif", alt: "Infrastructure Development"},
      eyebrow: markFallback("INFRASTRUCTURE"),
      heading: markFallback("Smart Schools"),
      subHeading: markFallback("RAJASTHAN"),
      title: markFallback("Building the Future"),
      body: markFallback("By transforming dilapidated buildings into smart schools, we are providing students with the infrastructure they need to succeed in the digital age."),
      cta: {
        text: markFallback("See the transformation"),
        href: "/blogs/chhavis-journey-infrastructure"
      }
    }
  ]
};
