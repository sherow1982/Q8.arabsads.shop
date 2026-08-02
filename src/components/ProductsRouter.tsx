"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState, Suspense } from "react";
import ProductCatalog from "./ProductCatalog";
import ProductDetailClient from "./ProductDetailClient";

function RouterInner() {
  const nextPathname = usePathname() ?? "";
  const [currentPath, setCurrentPath] = useState(nextPathname);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentPath(window.location.pathname);
    }
  }, [nextPathname]);

  const path = currentPath || nextPathname;
  const segments = path.split("/").filter(Boolean);
  const slug = segments.length >= 2 ? segments[1] : null;

  if (slug) {
    return <ProductDetailClient slug={slug} />;
  }

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
      <ProductCatalog title="جميع المنتجات" />
    </Suspense>
  );
}

export default function ProductsRouter() {
  return <RouterInner />;
}
