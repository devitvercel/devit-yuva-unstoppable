import {markFallback} from "@/lib/utils";
import type {ProgrammeCommitmentSectionType} from "@/types/programme/programme.types";

export const commitmentDataFallback: ProgrammeCommitmentSectionType = {
  heading: markFallback("The First 1,000 Days"),
  title: markFallback("Our Commitment"),
  body: markFallback("Every child deserves a foundation built on health, opportunity, and care. Our mission is to bridge the gap in early childhood development, ensuring that every mother has the support she needs and every child has the environment required to thrive."),
  cards: [
    {
      heading: markFallback("HEALTH SUPPORT"),
      title: markFallback("Child Nutrition & Lifesaving Vaccination"),
      body: markFallback("We believe in a proactive approach to health. We work to eliminate stunting, underweight conditions, and nutritional deficiencies among children under six."),
      img: {src: "/assets/pages/programme/our-commitment-1-img.avif", alt: "our commitment 1 img"},
      points: [
        {
          title: markFallback("Nutritional Support"),
          body: [
            markFallback("We distribute nutrient-rich kits to provide essential sustenance during the most critical developmental years."),
          ]
        },
        {
          title: markFallback("Health Protection"),
          body: [
            markFallback("Through campaigns like our Jeevan Raksha Abhiyaan, we champion preventive healthcare, ensuring children and adolescents receive vital vaccinations to protect them from preventable diseases and secure their long-term health.")
          ]
        }
      ]
    },
    {
      heading: markFallback("HEALTH  & MENTAL SUPPORT"),
      title: markFallback("Maternal Wellness: A Stronger Start"),
      body: markFallback("A healthy child begins with a healthy mother. We are committed to eradicating maternal anemia and ensuring prenatal wellness through targeted support systems."),
      points: [
        {
          title: markFallback("Suposhit Maa Abhiyan"),
          body: [
            markFallback("Our dedicated initiative focuses on supporting pregnant mothers, particularly those at high nutritional risk, to ensure they receive the care and iron-rich nutrition necessary for a healthy pregnancy and safe delivery."),
          ]
        }
      ]
    },
    {
      heading: markFallback("INFRASTRUCTURE"),
      title: markFallback("Empowering the Backbone: ASHA Training"),
      body: markFallback("Our impact is sustained by the frontline warriors of the community. We prioritize the capacity building and training of ASHA workers and Anganwadi staff."),
      points: [
        {
          title: markFallback("Knowledge Transfer"),
          body: [
            markFallback("By equipping ASHA workers with the latest best practices in early childhood education, hygiene, and nutrition management, we ensure that the quality of care is consistent, compassionate, and effective at the grassroots level"),
          ]
        }
      ]
    },
    {
      heading: markFallback("PHYSICAL HEALTH"),
      title: markFallback("Vibrant Anganwadis: Spaces to Play, Learn, and Grow"),
      body: markFallback("We transform traditional Anganwadi centres into \"future-ready\" learning hubs. A centre should be more than just a room, it should be a stimulating, colourful environment that sparks curiosity."),
      img: {src: "/assets/pages/programme/our-commitment-4-img.avif", alt: "our commitment 4 img"},
      points: [
        {
          title: markFallback("Infrastructure Transformation"),
          body: [
            markFallback("We renovate centres with child-friendly furniture, interactive wall art, and safety upgrades to create a space where children feel safe to explore."),
          ]
        },
        {
          title: markFallback("Play-Based Learning"),
          body: [
            markFallback("We introduce play-learn materials that help children develop cognitive skills, social confidence, and foundational literacy in a joy-filled setting.")
          ]
        }
      ]
    },
  ]
}