import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

export async function generateMetadata() {
  return mediaMetadata("press-and-media");
}

export default async function Page() {
  return <MediaPage slug="press-and-media" />;
}

export const revalidate = 86400;
