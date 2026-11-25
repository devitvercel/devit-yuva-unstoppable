import ProgrammePage, {
  generateMetadata as pageMetadata,
} from "@/components/programme/ProgrammePage";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return pageMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProgrammePage slug={slug} />;
}

export const revalidate = 3600;
