"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";

export default function CartIcon() {
  const { count, isLoaded } = useCart();

  return (
    <Link href="/cart" aria-label="سلة التسوق" className="relative text-xl">
      🛒
      {isLoaded && count > 0 ? (
        <span className="absolute -left-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#e53935] px-1 text-[10px] font-bold text-white">
          {count > 99 ? "99+" : count}
        </span>
      ) : (
        <span className="absolute -left-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-[#ccc] text-[10px] text-white">
          0
        </span>
      )}
    </Link>
  );
}
