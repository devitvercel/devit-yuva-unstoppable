import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { privacyContent } from "@/data/legal/privacy.data";
import { buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import { APP_ROUTES } from "@/constants/navigation.constants";

export const metadata: Metadata = buildFallbackMetadata(
  {
    title: "Privacy Policy | Yuva",
    description:
      "Privacy Policy describing how Yuva Unstoppable collects, uses, and safeguards your personal information.",
  },
  { canonicalPath: APP_ROUTES.PRIVACY }
);

export default function PrivacyPolicyPage() {
  return <LegalPage content={privacyContent} />;
}
