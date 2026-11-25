import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const OUTPUT_SPEC = path.join(ROOT, "scripts/figma-press-spec.json");
const OUTPUT_DIR = path.join(ROOT, "public/assets/pages/press-and-media");

const token = process.env.FIGMA_ACCESS_TOKEN;
if (!token) {
  console.error("Missing FIGMA_ACCESS_TOKEN");
  process.exit(1);
}

const FILE = "X6PRHi0e0LCwM1FTL3Re9L";
const NODES = ["1181:15627", "1181:16382"];

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

const data = await fetchJson(
  `https://api.figma.com/v1/files/${FILE}/nodes?ids=${encodeURIComponent(NODES.join(","))}`
);

const report = {};

for (const [id, wrap] of Object.entries(data.nodes)) {
  const doc = wrap.document;
  const all = walk(doc);
  report[id] = {
    name: doc.name,
    size: doc.absoluteBoundingBox,
    texts: all.map(textInfo).filter(Boolean),
    images: all.map(imageInfo).filter(Boolean),
  };
}

await fs.mkdir(OUTPUT_DIR, { recursive: true });

const desktop = report["1181:15627"] || report["1181:16382"];
const imageNodes = (desktop?.images || [])
  .filter((img) => {
    const h = img.bbox?.height ?? 0;
    const w = img.bbox?.width ?? 0;
    return h > 120 && w > 120 && !String(img.name).toLowerCase().includes("image 2");
  })
  .slice(0, 10);

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
    const filename = `press-${++i}.png`;
    await fs.writeFile(path.join(OUTPUT_DIR, filename), buf);
    node.savedAs = `/assets/pages/press-and-media/${filename}`;
    console.log("saved", filename);
  }
}

await fs.writeFile(OUTPUT_SPEC, JSON.stringify(report, null, 2));
console.log("Spec written");
