import ProductPageClient from "./client";

// تبني صفحة واحدة فقط كـ shell — المنتج يتحمل client-side
export function generateStaticParams() {
  return [{ slug: "_" }];
}

export default function ProductPage() {
  return <ProductPageClient />;
}
