import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  return mediaMetadata("press-and-media");
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  return <MediaPage slug="press-and-media" searchParams={resolvedSearchParams} />;
}

export const revalidate = 86400;
