import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  return mediaMetadata("gallery");
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  return <MediaPage slug="gallery" searchParams={resolvedSearchParams} />;
}

export const revalidate = 86400;
