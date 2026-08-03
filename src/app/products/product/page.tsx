"use client";

import { useEffect, useState } from "react";
import ProductDetailClient from "@/components/ProductDetailClient";

export default function ProductPage() {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const s = params.get("slug") ?? "";
    setSlug(decodeURIComponent(s));
  }, []);

  if (!slug) return (
    <div className="mx-auto max-w-[1400px] px-4 py-20 text-center">
      <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#e53935] border-t-transparent" />
    </div>
  );

  return <ProductDetailClient slug={slug} />;
}
