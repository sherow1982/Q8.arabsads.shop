"use client";

import { useParams } from "next/navigation";
import ProductDetailClient from "@/components/ProductDetailClient";

export default function ProductPageClient() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : (params.slug ?? "");
  return <ProductDetailClient slug={decodeURIComponent(slug)} />;
}
