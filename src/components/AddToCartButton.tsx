"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className = "" }: Props) {
  const { addItem } = useCart();
  const router = useRouter();

  function handleAdd() {
    addItem(product, 1);
    router.push("/cart");
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`rounded bg-[#333] px-8 py-3 text-center text-sm font-bold text-white hover:bg-[#e53935] ${className}`}
    >
      أضف إلى السلة
    </button>
  );
}
