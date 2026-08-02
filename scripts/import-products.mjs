import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const TSV_PATH = "C:/Users/sherow/Downloads/منتجات matajer-alkuwait.arabsa.tsv";
const OUT_DIR = path.join(__dirname, "../data");
const OUT_FILE = path.join(OUT_DIR, "products.json");

function parseTsv(content) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < content.length; i++) {
    const ch = content[i];
    const next = content[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        field += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        field += ch;
      }
      continue;
    }

    if (ch === '"') {
      inQuotes = true;
    } else if (ch === "\t") {
      row.push(field);
      field = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i++;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
    } else {
      field += ch;
    }
  }

  if (field.length || row.length) {
    row.push(field);
    if (row.some((cell) => cell.trim())) rows.push(row);
  }

  return rows;
}

function slugify(_text, id) {
  return id.replace(/^ProductVariant_/, "");
}

function parsePrice(value) {
  if (!value) return null;
  const match = value.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}

function truncate(text, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trim()}...`;
}

const raw = fs.readFileSync(TSV_PATH, "utf8");
const rows = parseTsv(raw);
const header = rows[0];
console.log("Header columns:", header.length);
console.log("Total rows:", rows.length - 1);

const seenSlugs = new Set();
const products = [];

for (let i = 1; i < rows.length; i++) {
  const cols = rows[i];
  if (cols.length < 14) continue;

  const title = cols[0]?.trim();
  const id = cols[1]?.trim();
  const priceRaw = cols[2]?.trim();
  const saleRaw = cols[3]?.trim();
  const url = cols[10]?.trim();
  const description = cols[12]?.trim() || "";
  const image = cols[13]?.trim();
  const category = cols[15]?.trim() || "عام";

  if (!title || !id) continue;

  let slug = slugify(title, id);
  while (seenSlugs.has(slug)) slug = `${slug}-${seenSlugs.size}`;
  seenSlugs.add(slug);

  const price = parsePrice(priceRaw);
  const salePrice = parsePrice(saleRaw);

  products.push({
    id,
    slug,
    title,
    price,
    salePrice: salePrice && salePrice < (price || Infinity) ? salePrice : null,
    priceLabel: priceRaw || "",
    saleLabel: saleRaw || "",
    image: image || "",
    url: url || "",
    category,
    description: truncate(description, 500),
    summary: truncate(description, 120),
  });
}

const categories = [...new Set(products.map((p) => p.category))].sort((a, b) =>
  a.localeCompare(b, "ar")
);

const catalog = {
  importedAt: new Date().toISOString(),
  total: products.length,
  categories,
  products,
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(catalog));

console.log(`Imported ${products.length} products`);
console.log(`Categories: ${categories.length}`);
console.log(`Output: ${OUT_FILE}`);
console.log(`File size: ${(fs.statSync(OUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);
