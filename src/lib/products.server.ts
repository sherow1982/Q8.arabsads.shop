import "server-only";
import fs from "fs";
import path from "path";
import type { Catalog, Product } from "@/types/product";

let cachedCatalog: Catalog | null = null;

function getCatalogPath() {
  return path.join(process.cwd(), "data", "products.json");
}

export function loadCatalog(): Catalog {
  if (cachedCatalog) return cachedCatalog;
  const raw = fs.readFileSync(getCatalogPath(), "utf8");
  cachedCatalog = JSON.parse(raw) as Catalog;
  return cachedCatalog;
}

function normalizeSlug(value: string): string {
  try {
    return decodeURIComponent(value).normalize("NFC").trim();
  } catch {
    return value.normalize("NFC").trim();
  }
}

function productKey(id: string): string {
  return id.replace(/^ProductVariant_/, "");
}

export function getProductBySlug(slug: string): Product | undefined {
  const normalized = normalizeSlug(slug);
  const catalog = loadCatalog();

  return catalog.products.find((product) => {
    const key = productKey(product.id);
    return (
      key === normalized ||
      product.id === normalized ||
      product.slug === normalized ||
      product.slug === slug
    );
  });
}

export function getFeaturedProducts(limit = 12): Product[] {
  return loadCatalog().products.slice(0, limit);
}

export function searchProducts(options: {
  q?: string;
  category?: string;
  page?: number;
  limit?: number;
}) {
  const { q = "", category = "", page = 1, limit = 24 } = options;
  const catalog = loadCatalog();
  let items = catalog.products;

  if (category) {
    items = items.filter((p) => p.category === category);
  }

  if (q.trim()) {
    const query = q.trim().toLowerCase();
    items = items.filter(
      (p) =>
        p.title.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  const total = items.length;
  const start = (page - 1) * limit;
  const products = items.slice(start, start + limit);

  return {
    products,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    categories: catalog.categories,
  };
}
