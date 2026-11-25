import * as cheerio from "cheerio";
import { replaceCmsUrlWithFrontend } from "./seoMeta.utils";

export default function SchemaRenderer({
  rawHead,
}: {
  rawHead?: string | string[];
}) {
  if (!rawHead) {
    console.log("[SchemaRenderer] No rawHead provided — skipping");
    return null;
  }

  const rawHeads = Array.isArray(rawHead) ? rawHead : [rawHead];
  const scripts: string[] = [];

  rawHeads.forEach((head) => {
    if (!head || typeof head !== "string") return;
    const $ = cheerio.load(head);
    $('script[type="application/ld+json"]').each((_, el) => {
      const content = $(el).html();
      if (content) scripts.push(replaceCmsUrlWithFrontend(content));
    });
  });

  if (scripts.length === 0) {
    console.log(
      `[SchemaRenderer] raw_head present (${rawHeads.length} item(s)) but no application/ld+json scripts found`
    );
    return null;
  }

  console.log(
    `[SchemaRenderer] Rendering ${scripts.length} JSON-LD script(s) from ${rawHeads.length} raw_head item(s)`
  );

  return (
    <>
      {scripts.map((json, index) => (
        <script
          key={`schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: json }}
        />
      ))}
    </>
  );
}
