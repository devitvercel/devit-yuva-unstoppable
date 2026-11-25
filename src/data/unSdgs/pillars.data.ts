import {markFallback} from "@/lib/utils";
import type {UnSdgsPillarsSectionType} from "@/types/unSdgs/unSdgs.types";

export const pillarsDataFallback: UnSdgsPillarsSectionType = {
  heading: markFallback("The Framework"),
  titlePlain: markFallback("Our work clusters around "),
  titleHighlight: markFallback("five impact pillars."),
  body: markFallback(
    "Rather than treat the SDGs as a checklist of 17 isolated goals, we organise our interventions around five integrated pillars — each one connecting multiple SDGs through a coherent on-ground theory of change."
  ),
  pillars: [
    {
      label: markFallback("Pillar I"),
      numeral: markFallback("I."),
      numeralLabel: markFallback(" Foundations of"),
      titlePlain: markFallback("Foundations of "),
      titleHighlight: markFallback("Learning"),
      body: markFallback(
        "Education is the lever that lifts every other goal. We build smart classrooms, deploy digital learning systems, and create school infrastructure that serves as a model for what rural India can be — keeping students enrolled, engaged, and equipped for the world they will inherit."
      ),
      img: {src: "/assets/pages/un-sdgs/piller-1.avif", alt: "Students in a classroom"},
      imagePosition: "right",
      sdgChips: [
        {number: 4, title: markFallback("Quality Education"), color: "#c5192d"},
        {number: 9, title: markFallback("Industry & Innovation"), color: "#fd6925"},
        {number: 11, title: markFallback("Sustainable Communities"), color: "#fd9d24"},
      ],
    },
    {
      label: markFallback("Pillar II"),
      numeral: markFallback("II."),
      numeralLabel: markFallback(" Health &"),
      titlePlain: markFallback("Health & "),
      titleHighlight: markFallback("Dignity"),
      body: markFallback(
        "Children cannot learn if they are hungry, sick, or denied basic sanitation. Our work in WASH infrastructure, school nutrition, and hygiene awareness removes the foundational barriers that keep millions of children from showing up — and from staying."
      ),
      img: {src: "/assets/pages/un-sdgs/pillar-2.avif", alt: "Hands holding seedlings"},
      imagePosition: "left",
      sdgChips: [
        {number: 2, title: markFallback("Zero Hunger"), color: "#dda63a"},
        {number: 3, title: markFallback("Good Health"), color: "#4c9f38"},
        {number: 6, title: markFallback("Clean Water & Sanitation"), color: "#26bde2"},
      ],
    },
    {
      label: markFallback("Pillar III"),
      numeral: markFallback("III."),
      numeralLabel: markFallback(" Equity &"),
      titlePlain: markFallback("Equity & "),
      titleHighlight: markFallback("Empowerment"),
      body: markFallback(
        "Disadvantage is not random. It tracks lines of geography, gender, and generational poverty. We design specifically against those lines — gender-segregated facilities, scholarships for first-generation girls, skill-building for rural youth, employability pipelines into formal economies."
      ),
      img: {src: "/assets/pages/un-sdgs/pillar-3.avif", alt: "Person holding a sign seeking kindness"},
      imagePosition: "right",
      sdgChips: [
        {number: 1, title: markFallback("No Poverty"), color: "#e5243b"},
        {number: 5, title: markFallback("Gender Equality"), color: "#ff3a21"},
        {number: 8, title: markFallback("Decent Work"), color: "#a21942"},
        {number: 10, title: markFallback("Reduced Inequalities"), color: "#dd1367"},
      ],
    },
    {
      label: markFallback("Pillar IV"),
      numeral: markFallback("IV."),
      numeralLabel: markFallback(" Planet &"),
      titlePlain: markFallback("Planet & "),
      titleHighlight: markFallback("Future"),
      body: markFallback(
        "Every school we touch is also a small, persuasive case for what sustainable infrastructure looks like. Solar arrays, rainwater harvesting, locally-sourced materials, plantation drives — climate action embedded in the very buildings where the next generation learns."
      ),
      img: {src: "/assets/pages/un-sdgs/pillar-4.avif", alt: "Mountain landscape with water"},
      imagePosition: "left",
      sdgChips: [
        {number: 7, title: markFallback("Clean Energy"), color: "#fcc30b", textColor: "#1a1815"},
        {number: 12, title: markFallback("Responsible Consumption"), color: "#bf8b2e"},
        {number: 13, title: markFallback("Climate Action"), color: "#3f7e44"},
        {number: 15, title: markFallback("Life on Land"), color: "#56c02b"},
      ],
    },
    {
      label: markFallback("Pillar V"),
      numeral: markFallback("V."),
      numeralLabel: markFallback(" Strong Institutions &"),
      titlePlain: markFallback("Strong Institutions & "),
      titleHighlight: markFallback("Partnerships"),
      body: markFallback(
        "No single organisation builds 10,000 schools. Our foundation's strength is the network — corporates aligning ESG mandates, government bodies enabling scale, donors trusting a transparent ledger. Partnerships are not a side activity; they are the operating system."
      ),
      img: {src: "/assets/pages/un-sdgs/pillar-5.avif", alt: "Two people shaking hands"},
      imagePosition: "right",
      sdgChips: [
        {number: 16, title: markFallback("Peace & Justice"), color: "#00689d"},
        {number: 17, title: markFallback("Partnerships for the Goals"), color: "#19486a"},
      ],
    },
  ],
};
