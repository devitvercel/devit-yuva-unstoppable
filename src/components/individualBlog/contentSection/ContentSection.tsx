import React from "react";
import BackLink from "@/components/individualBlog/contentSection/BackLink";
import type {IndividualBlogContentSection} from "@/types/individualBlog/individualBlog.types";
import {ArrowLeftIcon} from "lucide-react";

/** Shared Tailwind for WordPress Gutenberg HTML (columns, images, prose). */
const blogContentClassName = `
  w-full text-left
  [&_h2]:not-italic [&_h2]:typo-h2 [&_h2]:text-[#241E19] [&_h2]:mt-10 [&_h2]:mb-5 [&_h2:first-child]:mt-0
  [&_h3]:not-italic [&_h3]:typo-h3 [&_h3]:text-[#241E19] [&_h3]:mt-8 [&_h3]:mb-4
  [&_p]:typo-body3 [&_p]:text-[#3A312A] [&_p]:mb-5 [&_p]:leading-relaxed
  [&_li]:typo-body3 [&_li]:text-[#3A312A] [&_li]:leading-relaxed
  [&_ul]:mb-6 [&_ul]:flex [&_ul]:list-disc [&_ul]:flex-col [&_ul]:gap-2 [&_ul]:pl-6
  [&_ol]:mb-6 [&_ol]:flex [&_ol]:list-decimal [&_ol]:flex-col [&_ol]:gap-2 [&_ol]:pl-6
  [&_strong]:font-bold [&_strong]:text-[#241E19]
  [&_blockquote]:relative [&_blockquote]:my-8 [&_blockquote]:pl-6 [&_blockquote]:border-l-4 [&_blockquote]:border-primary-red
  [&_blockquote_p]:font-serif [&_blockquote_p]:italic [&_blockquote_p]:text-[#241E19] [&_blockquote_p]:text-lg [&_blockquote_p]:leading-relaxed [&_blockquote_p]:mb-1
  [&_blockquote_cite]:block [&_blockquote_cite]:typo-body5 [&_blockquote_cite]:text-[#6b6761] [&_blockquote_cite]:not-italic [&_blockquote_cite]:mt-2

  [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl
  [&_figure]:my-6 [&_figure]:mx-0
  [&_figure_img]:my-0 [&_figure_img]:mx-0
  [&_figcaption]:text-center [&_figcaption]:typo-body5 [&_figcaption]:text-[#6b6761] [&_figcaption]:mt-3

  [&_.wp-block-image]:my-6 [&_.wp-block-image]:mx-0 [&_.wp-block-image]:block [&_.wp-block-image]:w-full
  [&_.wp-block-image_img]:my-0 [&_.wp-block-image_img]:mx-0 [&_.wp-block-image_img]:block [&_.wp-block-image_img]:w-full [&_.wp-block-image_img]:h-auto [&_.wp-block-image_img]:rounded-xl
  [&_.wp-block-image.size-large]:w-full
  [&_.wp-block-image.size-full]:w-full

  [&_.wp-block-group]:my-6 [&_.wp-block-group]:w-full
  [&_.is-layout-constrained]:w-full

  [&_.wp-block-columns]:my-6 [&_.wp-block-columns]:flex [&_.wp-block-columns]:w-full [&_.wp-block-columns]:flex-col [&_.wp-block-columns]:gap-4 md:[&_.wp-block-columns]:flex-row md:[&_.wp-block-columns]:items-stretch
  [&_.is-layout-flex]:flex [&_.is-layout-flex]:flex-wrap [&_.is-layout-flex]:gap-4
  [&_.wp-block-column]:min-w-0 md:[&_.wp-block-column]:flex-1 md:[&_.wp-block-column]:basis-0
  [&_.wp-block-column_.wp-block-image]:!my-0 [&_.wp-block-column_.wp-block-image]:w-full
  [&_.wp-block-column_img]:!block [&_.wp-block-column_img]:!w-full [&_.wp-block-column_img]:!max-w-full [&_.wp-block-column_img]:h-auto [&_.wp-block-column_img]:rounded-xl

  [&_.wp-block-gallery]:flex [&_.wp-block-gallery]:flex-row [&_.wp-block-gallery]:flex-wrap [&_.wp-block-gallery]:gap-4 [&_.wp-block-gallery]:my-8
  [&_.wp-block-gallery_figure]:my-0 [&_.wp-block-gallery_figure]:mx-0 [&_.wp-block-gallery_figure]:flex-1 [&_.wp-block-gallery_figure]:min-w-[200px]
  [&_.wp-block-gallery_img]:!w-full

  [&_.yuva-image-row]:my-6 [&_.yuva-image-row]:flex [&_.yuva-image-row]:w-full [&_.yuva-image-row]:flex-row [&_.yuva-image-row]:flex-wrap [&_.yuva-image-row]:gap-4
  [&_.yuva-image-row_img]:m-0 [&_.yuva-image-row_img]:h-auto [&_.yuva-image-row_img]:min-w-0 [&_.yuva-image-row_img]:flex-1 [&_.yuva-image-row_img]:basis-[calc(33.333%-0.75rem)] [&_.yuva-image-row_img]:rounded-xl [&_.yuva-image-row_img]:object-cover
  [&_.yuva-image-row_figure]:m-0 [&_.yuva-image-row_figure]:min-w-0 [&_.yuva-image-row_figure]:flex-1 [&_.yuva-image-row_figure]:basis-[calc(33.333%-0.75rem)]
  [&_.yuva-image-row_figure_img]:!w-full [&_.yuva-image-row_a]:contents

  [&_.aligncenter]:mx-auto [&_.aligncenter]:block
  [&_.alignleft]:float-left [&_.alignleft]:mr-6 [&_.alignleft]:mb-6
  [&_.alignright]:float-right [&_.alignright]:ml-6 [&_.alignright]:mb-6
  [&_.yuva-video-embed]:relative [&_.yuva-video-embed]:my-8 [&_.yuva-video-embed]:aspect-video [&_.yuva-video-embed]:w-full [&_.yuva-video-embed]:overflow-hidden [&_.yuva-video-embed]:rounded-xl
  [&_.yuva-video-embed_iframe]:absolute [&_.yuva-video-embed_iframe]:inset-0 [&_.yuva-video-embed_iframe]:h-full [&_.yuva-video-embed_iframe]:w-full [&_.yuva-video-embed_iframe]:border-0
`.replace(/\s+/g, " ").trim();

const ContentSection = ({
  content,
}: {
  content: IndividualBlogContentSection;
}) => {
  return (
    <section className="mx-auto flex w-916/1000 max-w-5xl flex-col gap-12 xl:w-888/1000 xl:gap-10">
      <div
        className={blogContentClassName}
        dangerouslySetInnerHTML={{__html: content?.content?.rendered || ""}}
      />
      <BackLink
        className="flex flex-wrap flex-row gap-2.5 text-primary-red hover:cursor-pointer"
      >
        <ArrowLeftIcon />
        Go Back
      </BackLink>
    </section>
  );
};

export default ContentSection;
