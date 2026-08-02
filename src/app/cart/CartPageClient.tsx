"use client";

import Link from "next/link";
import { useCart } from "@/context/CartContext";
import {
  formatCartItemPrice,
  getCartItemPath,
  getItemLineTotal,
} from "@/types/cart";

export default function CartPageClient() {
  const { items, total, removeItem, updateQuantity, isLoaded } = useCart();

  if (!isLoaded) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-12 lg:px-6">
        <div className="h-64 animate-pulse rounded bg-[#f0f0f0]" />
      </div>
    );
  }

  if (!items.length) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-16 text-center lg:px-6">
        <div className="mx-auto max-w-md rounded-sm border border-dashed border-[#ddd] bg-[#fafafa] p-12">
          <span className="text-5xl">🛒</span>
          <h1 className="mt-4 text-2xl font-black text-[#333]">سلة التسوق فارغة</h1>
          <p className="mt-2 text-sm text-[#777]">لم تضف أي منتجات بعد. تصفّح المتجر واختر ما يناسبك.</p>
          <Link
            href="/products"
            className="mt-6 inline-block rounded bg-[#333] px-8 py-3 text-sm font-bold text-white hover:bg-[#e53935]"
          >
            تصفّح المنتجات
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">سلة التسوق</span>
      </nav>

      <h1 className="mb-8 text-2xl font-black text-[#333]">سلة التسوق</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="overflow-hidden rounded-sm border border-[#eee] bg-white">
            <div className="hidden grid-cols-[1fr_120px_120px_40px] gap-4 border-b border-[#eee] bg-[#fafafa] px-4 py-3 text-xs font-bold text-[#666] md:grid">
              <span>المنتج</span>
              <span className="text-center">السعر</span>
              <span className="text-center">الكمية</span>
              <span />
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="grid gap-4 border-b border-[#eee] p-4 last:border-b-0 md:grid-cols-[1fr_120px_120px_40px] md:items-center"
              >
                <div className="flex gap-4">
                  <Link
                    href={getCartItemPath(item)}
                    className="h-20 w-20 shrink-0 overflow-hidden rounded-sm border border-[#eee] bg-[#fafafa]"
                  >
                    {item.image ? (
                      <img src={item.image} alt={item.title} className="h-full w-full object-contain p-1" />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-[#999]">—</div>
                    )}
                  </Link>
                  <div>
                    <Link
                      href={getCartItemPath(item)}
                      className="line-clamp-2 text-sm font-bold text-[#333] hover:text-[#e53935]"
                    >
                      {item.title}
                    </Link>
                    <p className="mt-1 text-xs text-[#888] md:hidden">
                      KD {formatCartItemPrice(item)}
                    </p>
                  </div>
                </div>

                <p className="hidden text-center text-sm font-bold md:block">
                  KD {formatCartItemPrice(item)}
                </p>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                    className="flex h-8 w-8 items-center justify-center rounded border border-[#ddd] text-sm font-bold disabled:opacity-40"
                  >
                    −
                  </button>
                  <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="flex h-8 w-8 items-center justify-center rounded border border-[#ddd] text-sm font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  aria-label="حذف"
                  className="text-lg text-[#999] hover:text-[#e53935]"
                >
                  ×
                </button>

                <p className="text-sm font-black text-[#333] md:hidden">
                  الإجمالي: KD {getItemLineTotal(item).toFixed(3)}
                </p>
              </div>
            ))}
          </div>

          <Link href="/products" className="mt-4 inline-block text-sm font-bold text-[#e53935] hover:underline">
            ← متابعة التسوق
          </Link>
        </div>

        <div>
          <div className="sticky top-24 rounded-sm border border-[#eee] bg-[#fafafa] p-6">
            <h2 className="text-lg font-black text-[#333]">ملخص الطلب</h2>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-[#666]">عدد المنتجات</span>
                <span className="font-bold">{items.reduce((s, i) => s + i.quantity, 0)}</span>
              </div>
              <div className="flex justify-between border-t border-[#eee] pt-3">
                <span className="font-black text-[#333]">المجموع</span>
                <span className="text-xl font-black text-[#333]">KD {total.toFixed(3)}</span>
              </div>
            </div>
            <Link
              href="/checkout"
              className="mt-6 block rounded bg-[#333] py-3 text-center text-sm font-bold text-white hover:bg-[#e53935]"
            >
              إتمام الطلب
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
