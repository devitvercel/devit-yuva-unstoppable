import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { IndividualPressContentSection } from "@/types/individualPress/individualPress.types";

function PressContentSection({
  content,
  backHref,
}: {
  content: IndividualPressContentSection;
  backHref: string;
}) {
  return (
    <section className="flex flex-col gap-10">
      <div
        className="
          w-full text-justify
          [&_p]:font-sans [&_p]:text-base [&_p]:font-semibold [&_p]:leading-[1.6] [&_p]:text-[#1f2a37]/90 [&_p]:mb-5 [&_p:last-child]:mb-0
          [&_h2]:font-sans [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:text-[#1f2a37] [&_h2]:mt-8 [&_h2]:mb-4 [&_h2:first-child]:mt-0
          [&_h3]:font-sans [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#1f2a37] [&_h3]:mt-6 [&_h3]:mb-3
          [&_li]:font-sans [&_li]:text-base [&_li]:font-semibold [&_li]:leading-[1.6] [&_li]:text-[#1f2a37]/90
          [&_ul]:mb-6 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-2
          [&_ol]:mb-6 [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:flex [&_ol]:flex-col [&_ol]:gap-2
          [&_strong]:font-bold [&_strong]:text-[#1f2a37]
          [&_a]:text-primary-red [&_a]:underline
          [&_img]:max-w-full [&_img]:h-auto [&_img]:rounded-xl
          [&_figure]:my-6 [&_figure]:mx-0
          [&_figure_img]:my-0 [&_figure_img]:mx-0
          [&_figcaption]:text-center [&_figcaption]:text-sm [&_figcaption]:text-[#6b6761] [&_figcaption]:mt-3
          [&_.wp-block-image]:my-6 [&_.wp-block-image]:mx-0 [&_.wp-block-image]:block [&_.wp-block-image]:w-full
          [&_.wp-block-image_img]:my-0 [&_.wp-block-image_img]:mx-0 [&_.wp-block-image_img]:block [&_.wp-block-image_img]:w-full [&_.wp-block-image_img]:h-auto [&_.wp-block-image_img]:rounded-xl
          [&_.wp-block-group]:my-6 [&_.wp-block-group]:w-full
          [&_.wp-block-columns]:my-6 [&_.wp-block-columns]:flex [&_.wp-block-columns]:w-full [&_.wp-block-columns]:flex-col [&_.wp-block-columns]:gap-4 md:[&_.wp-block-columns]:flex-row
          [&_.is-layout-flex]:flex [&_.is-layout-flex]:flex-wrap [&_.is-layout-flex]:gap-4
          [&_.wp-block-column]:min-w-0 md:[&_.wp-block-column]:flex-1 md:[&_.wp-block-column]:basis-0
          [&_.wp-block-column_.wp-block-image]:!my-0 [&_.wp-block-column_.wp-block-image]:w-full
          [&_.wp-block-column_img]:!block [&_.wp-block-column_img]:!w-full [&_.wp-block-column_img]:!max-w-full [&_.wp-block-column_img]:h-auto [&_.wp-block-column_img]:rounded-xl
          [&_.wp-block-gallery]:flex [&_.wp-block-gallery]:flex-wrap [&_.wp-block-gallery]:gap-4 [&_.wp-block-gallery]:my-8
          [&_.wp-block-gallery_figure]:my-0 [&_.wp-block-gallery_figure]:mx-0 [&_.wp-block-gallery_figure]:flex-1 [&_.wp-block-gallery_figure]:min-w-[200px]
          [&_.yuva-image-row]:my-6 [&_.yuva-image-row]:flex [&_.yuva-image-row]:w-full [&_.yuva-image-row]:flex-row [&_.yuva-image-row]:flex-wrap [&_.yuva-image-row]:gap-4
          [&_.yuva-image-row_img]:m-0 [&_.yuva-image-row_img]:min-w-0 [&_.yuva-image-row_img]:flex-1 [&_.yuva-image-row_img]:basis-[calc(33.333%-0.75rem)] [&_.yuva-image-row_img]:rounded-xl [&_.yuva-image-row_img]:object-cover
          [&_.yuva-image-row_figure]:m-0 [&_.yuva-image-row_figure]:min-w-0 [&_.yuva-image-row_figure]:flex-1
          [&_.yuva-image-row_figure_img]:!w-full
          [&_.aligncenter]:mx-auto [&_.aligncenter]:block
          [&_.alignleft]:float-left [&_.alignleft]:mr-6 [&_.alignleft]:mb-6
          [&_.alignright]:float-right [&_.alignright]:ml-6 [&_.alignright]:mb-6
          [&_.yuva-video-embed]:relative [&_.yuva-video-embed]:my-8 [&_.yuva-video-embed]:aspect-video [&_.yuva-video-embed]:w-full [&_.yuva-video-embed]:overflow-hidden [&_.yuva-video-embed]:rounded-xl
          [&_.yuva-video-embed_iframe]:absolute [&_.yuva-video-embed_iframe]:inset-0 [&_.yuva-video-embed_iframe]:h-full [&_.yuva-video-embed_iframe]:w-full [&_.yuva-video-embed_iframe]:border-0
        "
        dangerouslySetInnerHTML={{ __html: content.content.rendered }}
      />

      <Link
        href={backHref}
        className="inline-flex items-center gap-2 font-sans text-base font-bold leading-[1.5] text-primary-red transition-opacity hover:opacity-80 w-fit"
      >
        <ArrowLeft className="size-6 shrink-0" strokeWidth={2} />
        Back
      </Link>
    </section>
  );
}

export default PressContentSection;
