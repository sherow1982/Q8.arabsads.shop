"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/types/product";

type Props = {
  product: Product;
  className?: string;
};

export default function AddToCartButton({ product, className = "" }: Props) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className={`rounded bg-[#333] px-8 py-3 text-center text-sm font-bold text-white hover:bg-[#e53935] ${className}`}
    >
      {added ? "✓ تمت الإضافة" : "أضف إلى السلة"}
    </button>
  );
}
