import ImpactSubPage, {
  generateMetadata as impactMetadata,
} from "@/components/impact/ImpactSubPage";

export async function generateMetadata() {
  return impactMetadata("annual-reports");
}

export default async function Page() {
  return <ImpactSubPage slug="annual-reports" />;
}

export const revalidate = 3600;
