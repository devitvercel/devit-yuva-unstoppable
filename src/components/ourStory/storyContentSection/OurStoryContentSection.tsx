import React from "react";
import type {OurStoryContentSectionType} from "@/types/ourStory/ourStory.types";
import StoryContentBlock from "./StoryContentBlock";

interface OurStoryContentSectionProps {
  contentSection: OurStoryContentSectionType;
}

const OurStoryContentSection: React.FC<OurStoryContentSectionProps> = ({contentSection}) => {
  return (
    <section className="bg-white py-12.5 lg:py-25" id="storyline">
      <div className="w-916/1000 xl:w-888/1000 mx-auto flex flex-col gap-20 lg:gap-4.5">
        {contentSection.blocks.map((block, index) => (
          <StoryContentBlock key={index} block={block} index={index} reverse={index % 2 !== 0}/>
        ))}
      </div>
    </section>
  );
};

export default OurStoryContentSection;
