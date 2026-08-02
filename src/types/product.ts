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
  description: string;
  summary: string;
};

export type Catalog = {
  importedAt: string;
  total: number;
  categories: string[];
  products: Product[];
};

export function formatPrice(product: Product): string {
  const value = product.salePrice ?? product.price;
  if (value == null) return product.saleLabel || product.priceLabel || "";
  return value.toFixed(3);
}

export function hasDiscount(product: Product): boolean {
  return product.salePrice != null && product.price != null && product.salePrice < product.price;
}

export function getProductPath(product: Product): string {
  return `/products/${product.id.replace(/^ProductVariant_/, "")}`;
}
