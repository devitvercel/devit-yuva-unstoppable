import React from 'react';
import type {ContactContainerSectionType} from "@/types/contact/contact.types";
import {MailIcon, MapPinIcon, PhoneIcon} from "lucide-react";
import Image from "next/image";
import ContactUsForm from "@/components/contact/contactContainerSection/ContactUsForm";
import {CONTACT_DEFAULT_MAP_EMBED} from "@/data/contact/contactContainer.data";

interface ContactContainerSectionProps {
  contactContainer: ContactContainerSectionType;
}

const ContactContainerSection: React.FC<ContactContainerSectionProps> = ({contactContainer}) => {
  const formEmail = contactContainer.offices[0]?.email ?? "";

  return (
    <section className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-14 xl:flex-row xl:gap-26 py-14 xl:py-20">
      <div className="w-full xl:w-2/5 xl:pe-7 xl:border-r xl:border-[#241E1961] flex flex-col gap-14 xl:gap-6">
        {contactContainer.offices.map((office, index) => (
          <React.Fragment key={`${office.title}-${index}`}>
            {index > 0 && (
              <div className="hidden xl:block w-full h-px bg-[#241E1961]"/>
            )}
            <div className="xl:p-5 flex flex-col gap-6 xl:gap-8">
              {(office.mapEmbedUrl || (index === 0 && CONTACT_DEFAULT_MAP_EMBED)) && (
                <div>
                  <iframe
                    src={office.mapEmbedUrl || CONTACT_DEFAULT_MAP_EMBED}
                    width="447"
                    height="206"
                    style={{border: "0"}}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="strict-origin-when-cross-origin"
                    className={"w-full h-auto aspect-343/300 xl:aspect-477/206 rounded-xl"}
                    title={`Map — ${office.title}`}
                  />
                </div>
              )}
              <div className="flex flex-col gap-4 xl:gap-6">
                <h3 className={"typo-h3"}>{office.title || contactContainer.title}</h3>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-row gap-2 text-[#251F1A]">
                    <MapPinIcon strokeWidth={1} size={26}/>
                    <p className={"flex-1 typo-body1"}>{office.address}</p>
                  </div>
                  <div className="flex flex-row gap-2 text-[#251F1A]">
                    <PhoneIcon strokeWidth={1} size={26}/>
                    <p className={"flex-1 typo-body1"}>{office.phone}</p>
                  </div>
                  <div className="flex flex-row gap-2 text-[#251F1A]">
                    <MailIcon strokeWidth={1} size={26}/>
                    <p className={"flex-1 typo-body1"}>{office.email}</p>
                  </div>
                </div>
              </div>
            </div>
          </React.Fragment>
        ))}
        <div className="hidden xl:block w-full h-px bg-[#241E1961]"/>
        <div className="xl:p-5 flex flex-col gap-6 xl:gap-8">
          <Image
            src={contactContainer.csrCollaboration.img.src}
            alt={contactContainer.csrCollaboration.img.alt || "CSR Collaboration"}
            width={477}
            height={206}
            loading="lazy"
            sizes="(max-width: 1280px) 100vw, 477px"
            className={"w-full h-auto aspect-343/300 xl:aspect-477/206 rounded-xl object-cover"}
          />
          <div className="flex flex-col gap-4 xl:gap-6">
            <h3 className="typo-h3">CSR Collaboration</h3>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2 text-[#251F1A]">
                <PhoneIcon strokeWidth={1} size={26}/>
                <p className={"flex-1 typo-body1"}><span
                  className={"font-bold!"}>{contactContainer.csrCollaboration.name}</span> {contactContainer.csrCollaboration.phone}
                </p>
              </div>
              <div className="flex flex-row gap-2 text-[#251F1A]">
                <MailIcon strokeWidth={1} size={26}/>
                <p className={"flex-1 typo-body1"}>{contactContainer.csrCollaboration.email}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex-1 w-full xl:sticky xl:top-32 xl:self-start mt-6 xl:mt-0">
        <ContactUsForm email={formEmail}/>
      </div>
    </section>
  );
};

export default ContactContainerSection;
