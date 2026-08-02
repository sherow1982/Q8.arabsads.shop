"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

type ApiResult = {
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  categories: string[];
};

type Props = {
  initialQuery?: string;
  initialCategory?: string;
  title?: string;
  compact?: boolean;
};

export default function ProductCatalog({
  initialQuery = "",
  initialCategory = "",
  title = "المنتجات",
  compact = false,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<ApiResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(initialQuery);
    setCategory(initialCategory);
    setPage(1);
  }, [initialQuery, initialCategory]);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);

    const params = new URLSearchParams({
      page: String(page),
      limit: compact ? "8" : "24",
    });
    if (query) params.set("q", query);
    if (category) params.set("category", category);

    fetch(`/api/products?${params}`)
      .then((res) => res.json())
      .then((json: ApiResult) => {
        if (!cancelled) setData(json);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [query, category, page, compact]);

  const categories = data?.categories ?? [];

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#333]">{title}</h2>
          {data ? (
            <p className="mt-1 text-sm text-[#777]">{data.total.toLocaleString("ar-EG")} منتج</p>
          ) : null}
        </div>

        {!compact ? (
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => {
                setCategory("");
                setPage(1);
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                !category ? "bg-[#333] text-white" : "bg-[#f0f0f0] text-[#555]"
              }`}
            >
              الكل
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setCategory(cat);
                  setPage(1);
                }}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  category === cat ? "bg-[#333] text-white" : "bg-[#f0f0f0] text-[#555]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        ) : null}
      </div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: compact ? 8 : 12 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-sm bg-[#f0f0f0]" />
          ))}
        </div>
      ) : data && data.products.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!compact && data.totalPages > 1 ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-[#ddd] px-4 py-2 text-sm font-bold disabled:opacity-40"
              >
                السابق
              </button>
              <span className="px-3 text-sm text-[#666]">
                صفحة {page} من {data.totalPages}
              </span>
              <button
                disabled={page >= data.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border border-[#ddd] px-4 py-2 text-sm font-bold disabled:opacity-40"
              >
                التالي
              </button>
            </div>
          ) : null}

          {compact ? (
            <div className="mt-6 text-center">
              <Link
                href="/products"
                className="inline-block rounded bg-[#333] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#e53935]"
              >
                عرض كل المنتجات
              </Link>
            </div>
          ) : null}
        </>
      ) : (
        <div className="rounded border border-dashed border-[#ddd] p-10 text-center text-[#777]">
          لا توجد منتجات مطابقة للبحث.
        </div>
      )}
    </section>
  );
}
