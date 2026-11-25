import VoiceOfChangePage, {
  generateMetadata,
} from "@/components/voiceOfChange/VoiceOfChangePage";

interface PageProps {
  searchParams: Promise<{[key: string]: string | string[] | undefined}>;
}

export {generateMetadata};

export default async function Page({searchParams}: PageProps) {
  const params = await searchParams;

  return (
    <VoiceOfChangePage
      initialCategorySlug={
        typeof params.category === "string" ? params.category : undefined
      }
      initialQuery={typeof params.q === "string" ? params.q.trim() : ""}
    />
  );
}

export const revalidate = 300;
