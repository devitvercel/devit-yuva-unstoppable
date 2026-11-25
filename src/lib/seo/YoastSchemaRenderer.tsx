import type { YoastHeadJson } from "@/types/wordpress.types";
import { rewriteYoastSchemaGraph } from "@/lib/seo/rewriteYoastSchema";

/**
 * Renders Yoast's JSON-LD `@graph` as a single inline
 * `<script type="application/ld+json">` in the page body.
 * URLs are rewritten to the public frontend origin and routes.
 */
export default function YoastSchemaRenderer({
  schema,
}: {
  schema?: YoastHeadJson["schema"];
}) {
  const graph = rewriteYoastSchemaGraph(schema?.["@graph"]);

  if (!graph || graph.length === 0) {
    return null;
  }

  const jsonLd = {
    "@context": schema?.["@context"] ?? "https://schema.org",
    "@graph": graph,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
      }}
    />
  );
}
