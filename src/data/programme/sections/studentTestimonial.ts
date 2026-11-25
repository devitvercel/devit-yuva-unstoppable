import {markFallback} from "@/lib/utils";
import {PERSON_IMAGE_PLACEHOLDER, hasPersonImage} from "@/constants/personPlaceholder.constants";
import type {VoicesSectionType} from "@/types/home/home.types";
import type {StudentTestimonialSectionType} from "@/types/programme/programme.types";

export const studentTestimonialDataFallback: StudentTestimonialSectionType = {
  eyebrow: "",
  title: "",
  body: "",
  testimonials: [
    {
      img: {
        src: PERSON_IMAGE_PLACEHOLDER,
        alt: "Student portrait placeholder",
      },
      badge: {title: "", body: ""},
      body: markFallback(
        "I went from having a degree with no clear path to landing a role at a top-tier firm. Yuva didn't just help me find a job; they taught me how to walk into a boardroom with confidence."
      ),
      tag: "",
      name: markFallback("Jane Doe"),
      role: markFallback("Mumbai, Maharashtra"),
    },
  ],
};

/** Adapt programme SCF testimonials into the shared home Voices section shape. */
export function toVoicesSection(
  studentTestimonial: StudentTestimonialSectionType
): VoicesSectionType {
  return {
    eyebrow: studentTestimonial.eyebrow,
    title: studentTestimonial.title,
    body: studentTestimonial.body,
    voices: studentTestimonial.testimonials.map((testimonial) => {
      const alt =
        testimonial.img.alt?.trim() ||
        testimonial.name ||
        "Student portrait";

      return {
        img: {
          src: hasPersonImage(testimonial.img.src)
            ? testimonial.img.src
            : PERSON_IMAGE_PLACEHOLDER,
          alt,
        },
        badge: testimonial.badge,
        body: testimonial.body,
        tag: testimonial.tag,
        name: testimonial.name,
        role: testimonial.role,
      };
    }),
  };
}
