import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

export async function generateMetadata() {
  return mediaMetadata("blogs");
}

export default async function Page() {
  return <MediaPage slug="blogs" />;
}

export const revalidate = 3600;
