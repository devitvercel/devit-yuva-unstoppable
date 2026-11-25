import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

export async function generateMetadata() {
  return mediaMetadata("gallery");
}

export default async function Page() {
  return <MediaPage slug="gallery" />;
}

export const revalidate = 86400;
