import {markFallback} from "@/lib/utils";
import type {OurPeopleTeamSectionType} from "@/types/ourPeople/ourPeople.types";

const TEAM_MEMBER_DESCRIPTION = markFallback(
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
);

export const ourTeamDataFallback: OurPeopleTeamSectionType = {
  heading: markFallback("OUR TEAM"),
  title: markFallback("The team that keeps it unstoppable."),
  cards: [
    {
      img: {src: "/assets/pages/ourTeam/Abhi-Shah-card-img.avif", alt: "Abhi-Shah"},
      name: markFallback("Utsav Patel"),
      role: markFallback("Head – Finance & Systems"),
      since: markFallback("Since 2009"),
      description: "Utsav Patel is a finance and systems professional with over a decade of experience in nonprofit governance, compliance, and project accounting. At Yuva Unstoppable, he leads financial management, statutory compliance, and technology-enabled reporting to ensure transparency and accountability across programs. He holds a Master's degree in Computer Applications and a Diploma in Accounting & Business Management, combining technical expertise with strong financial discipline. Since joining Yuva in 2012, he has played a key role in strengthening financial controls and supporting large-scale CSR-funded initiatives.",
    },
    {
      img: {src: "/assets/pages/ourTeam/Hemang-Joshi-img.avif", alt: "Hemang-Joshi"},
      name: markFallback("Parth A. Vasavada"),
      role: markFallback("Founding Member and Chief Philanthropic Officer"),
      since: markFallback("Since 2012"),
      description: "With nearly two decades of association with Yuva Unstoppable, Parth A. Vasavada has been instrumental in the organization's growth and sustainability. Since its early years, he has helped build strong foundations in fundraising, partnerships, and stakeholder engagement, contributing significantly to the scaling of programs and impact across regions. As Chief Philanthropic Officer, Parth focuses on building trusted, long-term collaborations with corporates, foundations, and philanthropists, aligning shared values with measurable outcomes to create lasting change for children and communities.",
    },
    {
      img: {src: "/assets/pages/ourTeam/Hemang-Joshi-img.avif", alt: "Hemang-Joshi"},
      name: markFallback("Hemang Joshi"),
      role: markFallback("Head, School Transformation Programme"),
      since: markFallback("Since 2012"),
      description: "With nearly two decades of commitment to the empowerment of children, Hemang Joshi has been an integral part of Yuva Unstoppable since 2005, beginning as a volunteer. Today, he leads the School Transformation Programme, overseeing infrastructure upgrades and the use of innovative technologies to improve educational facilities. For Hemang, working with Yuva means embracing daily challenges, identifying society's pressing needs, and providing sustainable solutions that improve education and create lasting impact.",
    },
    {
      img: {src: "/assets/pages/ourTeam/Pavan-Jain-img.avif", alt: "Pavan-Jain"},
      name: markFallback("Pavan Jain"),
      role: markFallback("Chief Operating Officer"),
      since: markFallback("Since 2010"),
      description: "Pavan is one of the founding members of Yuva Unstoppable and has been associated with the organization since 2010. He leads the overall management and operations of the organization while also playing a key role in volunteer engagement, awareness campaigns, and partner relations. An MBA in Leadership & Project Management from Auckland University, New Zealand, Pavan chose to pursue social impact work in India and contribute to building Yuva Unstoppable. Prior to Yuva, he served as Senior Programme Manager for Times Foundation Rajasthan.",
    },
    {
      img: {src: "/assets/pages/ourTeam/Pavan-Jain-img.avif", alt: "Pavan-Jain"},
      name: markFallback("Swati Shah"),
      role: markFallback("Head of Human Resources & Project Udaan (Scholarships Programme)"),
      since: markFallback("Since 2010"),
      description: "With over a decade of dedicated service at Yuva Unstoppable, Swati Shah has been a cornerstone of the organization since joining in 2013. Through periods of growth and change, she has consistently demonstrated resilience, adaptability, and a people-centered approach. Today, she leads with empathy and purpose, balancing complex responsibilities while guiding teams and supporting scholarship beneficiaries. Her thoughtful leadership and commitment to meaningful impact continue to shape the organization and its culture.",
    },
  ]
};
