"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";

type Catalog = {
  products: Product[];
  categories: string[];
  total: number;
};

const PAGE_SIZE = 24;
const COMPACT_SIZE = 8;

type Props = {
  initialQuery?: string;
  initialCategory?: string;
  title?: string;
  compact?: boolean;
  catalog?: Catalog; // passed from server component at build time
};

export default function ProductCatalog({
  initialQuery = "",
  initialCategory = "",
  title = "المنتجات",
  compact = false,
  catalog: catalogProp,
}: Props) {
  const [catalog, setCatalog] = useState<Catalog | null>(catalogProp ?? null);
  const [loading, setLoading] = useState(!catalogProp);
  const searchParams = useSearchParams();

  const query = searchParams?.get("q") ?? initialQuery;
  const category = searchParams?.get("category") ?? initialCategory;
  const [page, setPage] = useState(1);

  // إعادة تعيين الصفحة عند تغيير البحث
  useEffect(() => {
    setPage(1);
  }, [query, category]);

  // جلب الكاتالوج من ملف JSON ثابت (مرة واحدة)
  useEffect(() => {
    if (catalogProp) return;
    setLoading(true);
    fetch("/products-index.json")
      .then((r) => r.json())
      .then((data: Catalog) => setCatalog(data))
      .finally(() => setLoading(false));
  }, [catalogProp]);

  // فلترة المنتجات محلياً
  const filtered = useMemo(() => {
    if (!catalog) return [];
    let items = catalog.products;
    if (category) items = items.filter((p) => p.category === category);
    if (query.trim()) {
      const q = query.trim().toLowerCase();
      items = items.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }
    return items;
  }, [catalog, query, category]);

  const limit = compact ? COMPACT_SIZE : PAGE_SIZE;
  const totalPages = Math.ceil(filtered.length / limit);
  const paged = filtered.slice((page - 1) * limit, page * limit);
  const categories = catalog?.categories ?? [];

  if (loading) {
    return (
      <section className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: compact ? 8 : 12 }).map((_, i) => (
            <div key={i} className="h-72 animate-pulse rounded-sm bg-[#f0f0f0]" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-black text-[#333]">{title}</h2>
          <p className="mt-1 text-sm text-[#777]">
            {filtered.length.toLocaleString("ar-EG")} منتج
          </p>
        </div>

        {!compact ? (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/products/"
              className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                !category ? "bg-[#333] text-white" : "bg-[#f0f0f0] text-[#555]"
              }`}
            >
              الكل
            </Link>
            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/products/?category=${encodeURIComponent(cat)}`}
                className={`rounded-full px-3 py-1.5 text-xs font-bold ${
                  category === cat ? "bg-[#333] text-white" : "bg-[#f0f0f0] text-[#555]"
                }`}
              >
                {cat}
              </Link>
            ))}
          </div>
        ) : null}
      </div>

      {paged.length ? (
        <>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {paged.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {!compact && totalPages > 1 ? (
            <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
              <button
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded border border-[#ddd] px-4 py-2 text-sm font-bold disabled:opacity-40"
              >
                السابق
              </button>
              <span className="px-3 text-sm text-[#666]">
                صفحة {page} من {totalPages}
              </span>
              <button
                disabled={page >= totalPages}
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
                href="/products/"
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
