import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_SPEC = path.join(ROOT, "scripts/figma-blogs-spec.json");
const OUTPUT_DIR = path.join(ROOT, "public/assets/pages/blogs");

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Missing FIGMA_ACCESS_TOKEN");
  process.exit(1);
}

const FILE = "X6PRHi0e0LCwM1FTL3Re9L";
const NODES = ["1181:15407", "1181:16176"];

async function fetchJson(url) {
  const res = await fetch(url, { headers: { "X-Figma-Token": token } });
  if (!res.ok) throw new Error(`${res.status}: ${await res.text()}`);
  return res.json();
}

function walk(node, out = []) {
  if (!node) return out;
  out.push(node);
  if (node.children) node.children.forEach((c) => walk(c, out));
  return out;
}

function toHex(c) {
  if (!c) return null;
  const r = Math.round(c.r * 255);
  const g = Math.round(c.g * 255);
  const b = Math.round(c.b * 255);
  return `#${[r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("")}`;
}

function textInfo(n) {
  if (n.type !== "TEXT" || !n.characters?.trim()) return null;
  const style = n.style || {};
  return {
    name: n.name,
    text: n.characters.replace(/\s+/g, " ").trim(),
    font: style.fontFamily,
    weight: style.fontWeight,
    size: style.fontSize,
    lineHeight: style.lineHeightPx,
    letterSpacing: style.letterSpacing,
    color: toHex(n.fills?.[0]?.color),
    bbox: n.absoluteBoundingBox,
  };
}

function imageInfo(n) {
  const fills = n.fills || [];
  const img = fills.find((f) => f.type === "IMAGE" && f.visible !== false);
  if (!img) return null;
  return {
    id: n.id,
    name: n.name,
    imageRef: img.imageRef,
    bbox: n.absoluteBoundingBox,
  };
}

function findSection(node, nameIncludes) {
  const all = walk(node);
  return all.find(
    (n) =>
      n.name &&
      nameIncludes.some((s) => n.name.toLowerCase().includes(s.toLowerCase()))
  );
}

const data = await fetchJson(
  `https://api.figma.com/v1/files/${FILE}/nodes?ids=${encodeURIComponent(NODES.join(","))}`
);

const report = {};

for (const [id, wrap] of Object.entries(data.nodes)) {
  const doc = wrap.document;
  const all = walk(doc);
  const texts = all.map(textInfo).filter(Boolean);
  const images = all.map(imageInfo).filter(Boolean);

  const hero = findSection(doc, ["hero", "banner"]);
  const categories = texts.filter((t) =>
    ["all", "education", "health", "environment", "stories", "insights"].some(
      (k) => t.text.toLowerCase() === k
    )
  );
  const cardTitles = texts.filter((t) =>
    t.name?.toLowerCase().includes("title")
  );
  const cardBodies = texts.filter((t) =>
    t.name?.toLowerCase().includes("body") ||
    t.name?.toLowerCase().includes("description") ||
    t.name?.toLowerCase().includes("excerpt")
  );

  report[id] = {
    name: doc.name,
    size: doc.absoluteBoundingBox,
    heroTexts: texts.filter((t) =>
      ["blogs", "stories", "insights", "ideas", "experiences"].some((k) =>
        t.text.toLowerCase().includes(k)
      )
    ),
    categories,
    cardTitles,
    cardBodies,
    allTexts: texts,
    images,
  };
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });
await fs.writeFile(OUTPUT_SPEC, JSON.stringify(report, null, 2));

// Export card/hero images from desktop frame
const desktop = report["1181:16176"];
const imageNodes = desktop.images
  .filter((img) => {
    const h = img.bbox?.height ?? 0;
    const w = img.bbox?.width ?? 0;
    return h > 120 && w > 120 && !img.name.toLowerCase().includes("image 2");
  })
  .slice(0, 12);

if (imageNodes.length) {
  const ids = imageNodes.map((i) => i.id).join(",");
  const imgData = await fetchJson(
    `https://api.figma.com/v1/images/${FILE}?ids=${encodeURIComponent(ids)}&format=png&scale=2`
  );
  let i = 0;
  for (const node of imageNodes) {
    const url = imgData.images?.[node.id];
    if (!url) continue;
    const res = await fetch(url);
    const buf = Buffer.from(await res.arrayBuffer());
    const filename = `blog-${++i}.png`;
    await fs.writeFile(path.join(OUTPUT_DIR, filename), buf);
    node.savedAs = `/assets/pages/blogs/${filename}`;
    console.log("saved", filename, node.name);
  }
}

await fs.writeFile(OUTPUT_SPEC, JSON.stringify(report, null, 2));
console.log("Spec written to", OUTPUT_SPEC);
