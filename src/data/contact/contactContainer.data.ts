import { markFallback } from "@/lib/utils";
import type { ContactContainerSectionType } from "@/types/contact/contact.types";

const DEFAULT_MAP_EMBED =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3671.672771623244!2d72.5700073!3d23.0357841!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395e84f3bf3d61b1%3A0xfbc3ca1755a0e52e!2sYuva%20unstoppable!5e0!3m2!1sen!2sin!4v1782450154387!5m2!1sen!2sin";

export const contactContainerDataFallback: ContactContainerSectionType = {
  title: markFallback("Yuva Unstoppable"),
  offices: [
    {
      title: markFallback("Yuva Unstoppable"),
      address: markFallback(
        "304-305, HK House, Ashram Road, Opp. Bata Showroom, Ahmedabad - 380009 (Gujarat, India)."
      ),
      phone: markFallback("7600801762"),
      email: markFallback("info@yuvaunstoppable.org"),
      mapEmbedUrl: DEFAULT_MAP_EMBED,
    },
  ],
  csrCollaboration: {
    img: { src: "/assets/pages/contact/contact-us-img.avif", alt: "contact us img" },
    name: markFallback("Parth Vasavada"),
    phone: markFallback("9978931500"),
    email: markFallback("parth@yuvaunstoppable.org"),
  },
};

export const CONTACT_DEFAULT_MAP_EMBED = DEFAULT_MAP_EMBED;
