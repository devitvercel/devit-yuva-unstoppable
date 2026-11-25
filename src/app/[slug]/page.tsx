import ProgrammePage, {
  generateMetadata as pageMetadata,
} from "@/components/programme/ProgrammePage";
import { PROGRAMME_ROUTE_CONFIG } from "@/constants/programme.routes.constants";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Prerender only the programme pages; every other single-segment URL is a static 404. */
export function generateStaticParams() {
  return PROGRAMME_ROUTE_CONFIG.map((r) => ({ slug: r.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  return pageMetadata(slug);
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  return <ProgrammePage slug={slug} />;
}

export const revalidate = 3600;
