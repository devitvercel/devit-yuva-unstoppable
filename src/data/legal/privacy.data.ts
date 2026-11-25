import type { LegalContent } from "@/components/legal/LegalPage";

export const privacyContent: LegalContent = {
  title: "Privacy policy",
  intro:
    "At Yuva Unstoppable (“we,” “us,” “our,” or “Yuva Unstoppable”), we are committed to protecting the privacy and security of your personal information. This Privacy Policy outlines how we collect, use, and safeguard your information when you visit our website or interact with our services. By using our website, you consent to the practices described in this Privacy Policy.",
  bodyToneClass: "text-[#020202D9]",
  sections: [
    {
      heading: "Information We Collect",
      body: {
        kind: "list",
        lead: "We may collect personal information from you when you visit our website, sign up for our newsletter, make a donation, or participate in our programs or events. The types of information we may collect include, but are not limited to:",
        items: [
          "Name",
          "Contact information, such as email address, phone number, and address",
          "Donation or payment details",
          "Communication preferences",
          "Information you provide to us in surveys or feedback forms",
          "Information about your interests and interactions with our website and services",
        ],
      },
    },
    {
      heading: "How We Use Your Information",
      body: {
        kind: "list",
        lead: "We use the information collected for the following purposes:",
        items: [
          "To process your donations and provide receipts",
          "To respond to your inquiries and provide information about our programs and events",
          "To send periodic newsletters, updates, and marketing communications, if you have opted-in to receive them",
          "To improve our website, services, and user experience",
          "To analyze trends, gather statistics, and conduct research for internal purposes",
          "To comply with legal and regulatory requirements",
        ],
      },
    },
    {
      heading: "Sharing Your Information",
      body: {
        kind: "list",
        lead: "Yuva Unstoppable does not sell, rent, or trade your personal information to third parties. However, we may share your information in the following circumstances:",
        items: [
          "With our trusted service providers and partners who assist us in operating our website, conducting our programs, or providing services on our behalf",
          "To comply with legal obligations, enforce our policies, or protect our rights, property, or safety, or the rights, property, or safety of others",
          "With your consent or as otherwise disclosed at the time of data collection",
        ],
      },
    },
    {
      heading: "Cookies and Tracking Technologies",
      body: {
        kind: "text",
        text: "Our website may use cookies and similar tracking technologies to enhance your browsing experience and collect information about how you use our website. Cookies are small text files that are placed on your device when you visit a website. They help us recognize your browser and remember certain information. You can control or disable cookies through your browser settings, but please note that some features of our website may not function properly if you do so.",
      },
    },
    {
      heading: "Data Security",
      body: {
        kind: "text",
        text: "We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. However, no data transmission over the internet or electronic storage system is entirely secure, so we cannot guarantee the absolute security of your information.",
      },
    },
    {
      heading: "Your Choices and Rights",
      body: {
        kind: "text",
        text: "You have the right to access, correct, update, or delete your personal information at any time. If you wish to do so or if you have any questions or concerns about our Privacy Policy.",
      },
    },
    {
      heading: "Changes to this Privacy Policy",
      body: {
        kind: "text",
        text: "We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. We encourage you to review this page periodically for the latest information on our privacy practices.",
      },
    },
    {
      heading: "Children's Privacy",
      body: {
        kind: "text",
        text: "Our website and services are not intended for children under the age of 13. We do not knowingly collect personal information from children under 13 without parental consent. If you believe that we may have inadvertently collected information from a child under 13, please contact us immediately, and we will take appropriate measures to remove the information from our records.",
      },
    },
    {
      heading: "Third-Party Websites",
      body: {
        kind: "text",
        text: "Our website may contain links to third-party websites. This Privacy Policy does not apply to those websites, and we are not responsible for their privacy practices. We encourage you to review the privacy policies of any third-party websites you visit.",
      },
    },
    {
      heading: "Contact Us",
      body: {
        kind: "text",
        text: "If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at info@yuvaunstoppable.org.",
      },
    },
  ],
  closing: {
    thanks:
      "By using our website or providing your information to Yuva Unstoppable, you signify your consent to the terms of this Privacy Policy. Thank you for supporting our mission and for entrusting us with your personal information.",
    note: "The provided Privacy Policy is a general template and should be reviewed, edited, and customized as per the specific requirements and practices of Yuva Unstoppable. Legal counsel or privacy professionals should be consulted to ensure compliance with applicable laws and regulations.",
  },
};
