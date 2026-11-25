import type { Metadata } from "next";
import LegalPage from "@/components/legal/LegalPage";
import { termsContent } from "@/data/legal/terms.data";
import { buildFallbackMetadata } from "@/lib/seo/metadata.builder";
import { APP_ROUTES } from "@/constants/navigation.constants";

export const metadata: Metadata = buildFallbackMetadata(
  {
    title: "Terms and Conditions | Yuva",
    description:
      "Terms and Conditions governing your use of the Yuva Unstoppable website and services.",
  },
  { canonicalPath: APP_ROUTES.TERMS }
);

export default function TermsPage() {
  return <LegalPage content={termsContent} />;
}
