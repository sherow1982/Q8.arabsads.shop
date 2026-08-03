export type Product = {
  id: string;
  slug: string;
  title: string;
  price: number | null;
  salePrice: number | null;
  priceLabel: string;
  saleLabel: string;
  image: string;
  url: string;
  category: string;
  brand?: string;
  description: string;
  summary: string;
};

export type Catalog = {
  importedAt: string;
  total: number;
  categories: string[];
  products: Product[];
};

/**
 * تقريب السعر للأعلى لأقرب دينار كامل
 * مثال: 2.450 KD → 3.000 KD
 */
export function ceilPrice(value: number): number {
  return Math.ceil(value);
}

/**
 * تنسيق السعر المعروض — مع تقريب للأعلى
 */
export function formatPrice(product: Product): string {
  const value = product.salePrice ?? product.price;
  if (value == null) return product.saleLabel || product.priceLabel || "";
  return ceilPrice(value).toFixed(3);
}

export function hasDiscount(product: Product): boolean {
  return product.salePrice != null && product.price != null && product.salePrice < product.price;
}

export function getProductPath(product: Product): string {
  const slug = product.slug || product.id.replace(/^ProductVariant_/, "");
  return `/products/product/?slug=${encodeURIComponent(slug)}`;
}
