import { InitiativesSectionType } from "@/types/individualBlog/individualBlog.types";
import { markFallback } from "@/lib/utils";

export const initiativesDataFallback: InitiativesSectionType = {
  title: markFallback("Other Initiatives"),
  highlightedTitle: markFallback("Other"),
  cards: [
    {
      img: {
        src: "/assets/pages/home/card-1.avif",
        alt: markFallback("Assam Relief Program")
      },
      date: markFallback("July 9, 2022"),
      title: markFallback("Assam Relief Program"),
      body: markFallback("Assam Relief Program Massive floods have hit Assam. Floods have wreaked havoc on people's homes, farms, and livelihoods. We have set up relief camps and are distributing essential supplies to those affected."),
      link: {
        text: markFallback("Read More →"),
        href: "/community-response"
      }
    },
    {
      img: {
        src: "/assets/pages/home/card-2.avif",
        alt: markFallback("Covid-19 Response")
      },
      date: markFallback("March 9, 2020"),
      title: markFallback("Covid-19 Response"),
      body: markFallback("Covid-19 Response Launched to support and encourage appropriate uptake of the COVID-19 vaccines by 1 million people who are eligible while empowering underserved communities with relief kits."),
      link: {
        text: markFallback("Read More →"),
        href: "/community-response"
      }
    },
    {
      img: {
        src: "/assets/pages/home/card-3.avif",
        alt: markFallback("Bridging the Digital Divide")
      },
      date: markFallback("July 9, 2019"),
      title: markFallback("Bridging the Digital Divide"),
      body: markFallback("Bridging the Digital Divide The COVID-19 pandemic has impacted school children directly with Governments announcing immediate school closure. This initiative provides digital devices and internet access to enable remote learning."),
      link: {
        text: markFallback("Read More →"),
        href: "/community-response"
      }
    }
  ]
};
