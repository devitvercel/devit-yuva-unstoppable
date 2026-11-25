import VoiceOfChangePage, {
  generateMetadata,
} from "@/components/voiceOfChange/VoiceOfChangePage";

export {generateMetadata};

export default async function Page() {
  return <VoiceOfChangePage />;
}

export const revalidate = 3600;
