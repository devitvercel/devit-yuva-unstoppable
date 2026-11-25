import MediaPage, { generateMetadata as mediaMetadata } from "@/components/media/MediaPage";

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata() {
  return mediaMetadata("blogs");
}

export default async function Page({ searchParams }: PageProps) {
  const resolvedSearchParams = await searchParams;
  return <MediaPage slug="blogs" searchParams={resolvedSearchParams} />;
}

export const revalidate = 900;
