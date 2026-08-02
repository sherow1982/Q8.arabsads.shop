"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ProductCatalog from "./ProductCatalog";
import ProductDetailClient from "./ProductDetailClient";

function RouterInner() {
  const nextPathname = usePathname() ?? "";
  const searchParams = useSearchParams();
  const [currentSearch, setCurrentSearch] = useState("");
  const [currentPath, setCurrentPath] = useState(nextPathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
      setCurrentSearch(window.location.search);
    }
  }, [nextPathname]);

  const querySlug =
    searchParams?.get("slug") ||
    searchParams?.get("id") ||
    (currentSearch ? new URLSearchParams(currentSearch).get("slug") : null) ||
    (currentSearch ? new URLSearchParams(currentSearch).get("id") : null);

  const path = currentPath || nextPathname;
  const segments = path.split("/").filter(Boolean);
  const pathSlug = segments.length >= 2 ? segments[1] : null;

  const slug = querySlug || pathSlug;

  if (slug) {
    return <ProductDetailClient slug={slug} />;
  }

  return <ProductCatalog title="جميع المنتجات" />;
}

export default function ProductsRouter() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-sm bg-[#f0f0f0]" />
            ))}
          </div>
        </div>
      }
    >
      <RouterInner />
    </Suspense>
  );
}
