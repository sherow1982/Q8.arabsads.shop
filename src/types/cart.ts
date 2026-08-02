import type { Product } from "./product";
import { formatPrice, getProductPath } from "./product";

export type CartItem = {
  id: string;
  slug: string;
  title: string;
  price: number | null;
  salePrice: number | null;
  image: string;
  quantity: number;
};

export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
  governorate: string;
  city: string;
  block: string;
  street: string;
  building: string;
  floor: string;
  apartment: string;
  notes: string;
};

export function productToCartItem(product: Product, quantity = 1): CartItem {
  return {
    id: product.id,
    slug: product.slug,
    title: product.title,
    price: product.price,
    salePrice: product.salePrice,
    image: product.image,
    quantity,
  };
}

export function getItemPrice(item: CartItem): number {
  return item.salePrice ?? item.price ?? 0;
}

export function getItemLineTotal(item: CartItem): number {
  return getItemPrice(item) * item.quantity;
}

export function getCartTotal(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + getItemLineTotal(item), 0);
}

export function getCartCount(items: CartItem[]): number {
  return items.reduce((sum, item) => sum + item.quantity, 0);
}

export function formatCartItemPrice(item: CartItem): string {
  return formatPrice({
    price: item.price,
    salePrice: item.salePrice,
    priceLabel: "",
    saleLabel: "",
  } as Product);
}

export function getCartItemPath(item: CartItem): string {
  return getProductPath({ id: item.id } as Product);
}
