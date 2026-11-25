/**
 * Downloads partner logos from Figma into public/assets/partners/.
 *
 * Usage:
 *   FIGMA_ACCESS_TOKEN=token node scripts/download-figma-partners.mjs csr
 *   FIGMA_ACCESS_TOKEN=token node scripts/download-figma-partners.mjs audit
 *
 * Get a token: Figma → Settings → Security → Personal access tokens
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const PARTNERS_TS = path.join(ROOT, "src/data/impact/sections/partners.ts");
const OUTPUT_DIR = path.join(ROOT, "public/assets/partners");

const FIGMA_FILE_KEY = "X6PRHi0e0LCwM1FTL3Re9L";

const CONFIG = {
  csr: {
    nodeId: "1181:12946",
    category: "csr-partners",
  },
  audit: {
    // Audit partners grid inside the §5 Leadership frame
    nodeId: "1181:13628",
    category: "audit-partners",
  },
};

const mode = process.argv[2] || "csr";
const config = CONFIG[mode];

if (!config) {
  console.error(`Unknown mode "${mode}". Use: csr | audit`);
  process.exit(1);
}

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Missing FIGMA_ACCESS_TOKEN environment variable.");
  console.error("Create one at: https://www.figma.com/developers/api#access-tokens");
  process.exit(1);
}

async function readPartnerFilenames(category) {
  const source = await fs.readFile(PARTNERS_TS, "utf8");
  const pattern = new RegExp(
    `src:\\s*"/assets/partners/([^"]+)"[^\\n]*category:\\s*"${category}"`,
    "g"
  );
  return [...source.matchAll(pattern)].map((m) => m[1]);
}

async function figmaFetch(url) {
  const res = await fetch(url, {
    headers: { "X-Figma-Token": token },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Figma API ${res.status}: ${body}`);
  }
  return res.json();
}

function findExportNode(node) {
  if (!node) return null;

  const hasImageFill =
    node.type === "RECTANGLE" &&
    Array.isArray(node.fills) &&
    node.fills.some((f) => f.type === "IMAGE" && f.visible !== false);

  if (hasImageFill || node.type === "VECTOR") {
    return node;
  }

  for (const child of node.children || []) {
    const found = findExportNode(child);
    if (found) return found;
  }

  return node;
}

function getOrderedCards(root) {
  return (root.children || []).map((cardFrame) => ({
    cardId: cardFrame.id,
    exportId: findExportNode(cardFrame)?.id,
  }));
}

async function requestExportUrl(cardId, exportId, attempt = 1) {
  const ids = attempt === 1 ? exportId : `${cardId},${exportId}`;
  const data = await figmaFetch(
    `https://api.figma.com/v1/images/${FIGMA_FILE_KEY}?ids=${encodeURIComponent(ids)}&format=png&scale=2`
  );

  const url = data.images?.[exportId] || data.images?.[cardId];
  if (!url && attempt < 3) {
    await new Promise((r) => setTimeout(r, 1500));
    return requestExportUrl(cardId, exportId, attempt + 1);
  }

  return url;
}

async function downloadFile(url, dest) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Download failed ${res.status} for ${url}`);
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await fs.writeFile(dest, buf);
}

async function main() {
  const filenames = await readPartnerFilenames(config.category);
  await fs.mkdir(OUTPUT_DIR, { recursive: true });

  console.log(`[${mode}] Found ${filenames.length} partner filenames in partners.ts`);
  console.log(`[${mode}] Fetching Figma node (${config.nodeId})...`);

  const nodeData = await figmaFetch(
    `https://api.figma.com/v1/files/${FIGMA_FILE_KEY}/nodes?ids=${encodeURIComponent(config.nodeId)}`
  );

  const rootNode = nodeData.nodes?.[config.nodeId]?.document;
  if (!rootNode) {
    throw new Error(`Could not find Figma node ${config.nodeId}`);
  }

  const cards = getOrderedCards(rootNode);
  console.log(`[${mode}] Found ${cards.length} partner cards in Figma frame`);

  if (cards.length !== filenames.length) {
    console.warn(
      `Warning: Figma has ${cards.length} cards but partners.ts has ${filenames.length} ${config.category} entries`
    );
  }

  const count = Math.min(cards.length, filenames.length);
  let downloaded = 0;
  const failed = [];

  for (let i = 0; i < count; i++) {
    const { cardId, exportId } = cards[i];
    const filename = filenames[i];
    const dest = path.join(OUTPUT_DIR, filename);

    try {
      const url = await requestExportUrl(cardId, exportId);
      if (!url) {
        failed.push({ filename, reason: "no export URL after retries" });
        continue;
      }

      await downloadFile(url, dest);
      downloaded++;
      console.log(`  ✓ ${filename}`);
      await new Promise((r) => setTimeout(r, 200));
    } catch (err) {
      failed.push({ filename, reason: err.message });
    }
  }

  console.log(`\n[${mode}] Downloaded ${downloaded}/${filenames.length} images to ${OUTPUT_DIR}`);

  if (failed.length) {
    console.log(`\nFailed (${failed.length}):`);
    failed.forEach(({ filename, reason }) =>
      console.log(`  - ${filename}: ${reason}`)
    );
    process.exitCode = 1;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
