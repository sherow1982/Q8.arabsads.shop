import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR   = path.join(__dirname, "../data");
const OUT_FILE  = path.join(OUT_DIR,   "products.json");
const PUBLIC_DIR = path.join(__dirname, "../public");
const INDEX_FILE = path.join(PUBLIC_DIR, "products-index.json");

// ─── دوال مساعدة ─────────────────────────────────────────────
function ceilPrice(v) { return Math.ceil(v); }

function escapeXml(v) {
  return String(v)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

const GOOGLE_CATEGORY_MAP = {
  "إلكترونيات": "222", "الكترونيات": "222",
  "ألعاب فيديو": "1279", "العاب فيديو": "1279",
  "قيمنق": "1270", "Gaming": "1270",
  "PlayStation": "1270", "Xbox": "1270", "Nintendo": "1270",
  "إكسسوارات": "222", "اكسسوارات": "222",
  "منزل وحديقة": "536", "أجهزة منزلية": "604",
  "هواتف": "267", "كمبيوتر": "325",
};

function googleCategory(cat) {
  if (GOOGLE_CATEGORY_MAP[cat]) return GOOGLE_CATEGORY_MAP[cat];
  for (const [key, id] of Object.entries(GOOGLE_CATEGORY_MAP)) {
    if (cat.includes(key) || key.includes(cat)) return id;
  }
  return "222";
}

// ─── توليد الملفات الثابتة ────────────────────────────────────
function generateStaticFiles() {
  if (!fs.existsSync(OUT_FILE)) {
    console.error("❌ products.json not found");
    return;
  }
  const catalog = JSON.parse(fs.readFileSync(OUT_FILE, "utf8"));
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://q8.arabsads.shop";
  const STORE_NAME = "Q8 اعلانات العرب";

  // تجميع الـ Slugs العربية النقية
  const seenSlugs = new Set();
  catalog.products.forEach((p) => {
    let s = slugify(p.title, p.id);
    while (seenSlugs.has(s)) {
      s = `${s}-${seenSlugs.size}`;
    }
    seenSlugs.add(s);
    p.slug = s;
  });
  fs.writeFileSync(OUT_FILE, JSON.stringify(catalog));

  fs.mkdirSync(PUBLIC_DIR, { recursive: true });

  // 1. products-index.json — خفيف للفلترة Client-Side
  const index = {
    categories: catalog.categories,
    total: catalog.total,
    products: catalog.products.map((p) => ({
      id: p.id, slug: p.slug, title: p.title,
      price: p.price, salePrice: p.salePrice,
      priceLabel: p.priceLabel, saleLabel: p.saleLabel,
      image: p.image, url: p.url, category: p.category,
      description: p.summary || "", summary: p.summary || "",
    })),
  };
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index), "utf8");
  const idxKB = (fs.statSync(INDEX_FILE).size / 1024).toFixed(0);
  console.log(`✓ products-index.json → ${idxKB} KB`);

  // 2. Google Merchant Center XML feed
  const feedDir = path.join(PUBLIC_DIR, "feed");
  fs.mkdirSync(feedDir, { recursive: true });
  const feedFile = path.join(feedDir, "google-merchant.xml");

  const items = catalog.products
    .filter((p) => (p.salePrice ?? p.price) != null && p.image)
    .map((p) => {
      const hasSale = p.salePrice != null && p.price != null && p.salePrice < p.price;
      const basePrice = hasSale ? p.price : (p.salePrice ?? p.price);
      const priceStr = `${ceilPrice(basePrice).toFixed(3)} KWD`;
      const salePriceStr = hasSale ? `${ceilPrice(p.salePrice).toFixed(3)} KWD` : "";
      const slug = p.id.replace(/^ProductVariant_/, "");
      const link = `${SITE_URL}/products/?slug=${encodeURIComponent(slug)}`;
      const desc = (p.description || p.summary || p.title)
        .replace(/\s+/g, " ").trim().slice(0, 5000);
      return `<item>
  <g:id>${escapeXml(slug)}</g:id>
  <g:title>${escapeXml(p.title.slice(0, 150))}</g:title>
  <g:description>${escapeXml(desc)}</g:description>
  <g:link>${escapeXml(link)}</g:link>
  <g:image_link>${escapeXml(p.image)}</g:image_link>
  <g:availability>in_stock</g:availability>
  <g:price>${escapeXml(priceStr)}</g:price>
  ${hasSale ? `<g:sale_price>${escapeXml(salePriceStr)}</g:sale_price>` : ""}
  <g:brand>${escapeXml(STORE_NAME)}</g:brand>
  <g:condition>new</g:condition>
  <g:identifier_exists>false</g:identifier_exists>
  <g:target_country>KW</g:target_country>
  <g:content_language>ar</g:content_language>
  <g:google_product_category>${escapeXml(googleCategory(p.category))}</g:google_product_category>
  <g:product_type>${escapeXml(p.category)}</g:product_type>
  <g:shipping><g:country>KW</g:country><g:service>Standard</g:service><g:price>0 KWD</g:price></g:shipping>
  <g:tax><g:country>KW</g:country><g:rate>0</g:rate><g:tax_ship>no</g:tax_ship></g:tax>
</item>`;
    }).join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(STORE_NAME)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Google Merchant Center feed — ${escapeXml(STORE_NAME)}</description>
    <language>ar</language>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(feedFile, xml, "utf8");
  const feedKB = (fs.statSync(feedFile).size / 1024).toFixed(0);
  console.log(`✓ google-merchant.xml → ${feedKB} KB`);
  console.log(`  Feed URL: ${SITE_URL}/feed/google-merchant.xml`);
}

// ─── تخطي الاستيراد إذا products.json موجود ──────────────────
if (!process.argv[2] && fs.existsSync(OUT_FILE)) {
  const stat = fs.statSync(OUT_FILE);
  console.log(`✓ products.json exists (${(stat.size / 1024 / 1024).toFixed(2)} MB), skipping import.`);
  generateStaticFiles();
  process.exit(0);
}

// ─── دوال الاستيراد ──────────────────────────────────────────
function parseTsv(content) {
  const rows = [];
  let row = [], field = "", inQuotes = false;
  for (let i = 0; i < content.length; i++) {
    const ch = content[i], next = content[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') { field += '"'; i++; }
      else if (ch === '"') { inQuotes = false; }
      else { field += ch; }
      continue;
    }
    if (ch === '"') { inQuotes = true; }
    else if (ch === "\t") { row.push(field); field = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && next === "\n") i++;
      row.push(field); field = "";
      if (row.some((c) => c.trim())) rows.push(row);
      row = [];
    } else { field += ch; }
  }
  if (field.length || row.length) {
    row.push(field);
    if (row.some((c) => c.trim())) rows.push(row);
  }
  return rows;
}

function slugify(title, id) {
  if (!title) return id.replace(/^ProductVariant_/, "");
  const clean = title
    .trim()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/[\s_]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-+|-+$/g, "");
  return clean || id.replace(/^ProductVariant_/, "");
}
function parsePrice(value) {
  if (!value) return null;
  const match = value.match(/([\d.]+)/);
  return match ? parseFloat(match[1]) : null;
}
function truncate(text, max = 180) {
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length <= max ? clean : `${clean.slice(0, max).trim()}...`;
}

// ─── استيراد من TSV ──────────────────────────────────────────
const TSV_PATH = process.argv[2];
if (!TSV_PATH) {
  console.error("❌ No TSV file specified and products.json not found.");
  console.error("Usage: node scripts/import-products.mjs path/to/products.tsv");
  process.exit(1);
}
if (!fs.existsSync(TSV_PATH)) {
  console.error(`❌ File not found: ${TSV_PATH}`);
  process.exit(1);
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
  const title    = cols[0]?.trim();
  const id       = cols[1]?.trim();
  const priceRaw = cols[2]?.trim();
  const saleRaw  = cols[3]?.trim();
  const url      = cols[10]?.trim();
  const description = cols[12]?.trim() || "";
  const image    = cols[13]?.trim();
  const category = cols[15]?.trim() || "عام";
  if (!title || !id) continue;
  let slug = slugify(title, id);
  while (seenSlugs.has(slug)) slug = `${slug}-${seenSlugs.size}`;
  seenSlugs.add(slug);
  const price = parsePrice(priceRaw);
  const salePrice = parsePrice(saleRaw);
  products.push({
    id, slug, title, price,
    salePrice: salePrice && salePrice < (price || Infinity) ? salePrice : null,
    priceLabel: priceRaw || "", saleLabel: saleRaw || "",
    image: image || "", url: url || "", category,
    description: truncate(description, 500),
    summary: truncate(description, 120),
  });
}

const categories = [...new Set(products.map((p) => p.category))].sort((a, b) =>
  a.localeCompare(b, "ar")
);
const catalog = { importedAt: new Date().toISOString(), total: products.length, categories, products };

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(OUT_FILE, JSON.stringify(catalog));
console.log(`Imported ${products.length} products | ${categories.length} categories`);
console.log(`Output: ${(fs.statSync(OUT_FILE).size / 1024 / 1024).toFixed(2)} MB`);

generateStaticFiles();
