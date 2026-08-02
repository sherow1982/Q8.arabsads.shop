import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { loadCatalog } from "@/lib/products.server";
import { itemListSchema, webPageSchema } from "@/lib/schema";

const PAGE_TITLE = "جميع المنتجات";
const PAGE_DESCRIPTION =
  "تصفّح جميع منتجات Q8 اعلانات العرب - إلكترونيات، ألعاب فيديو، قيمنج وإكسسوارات في الكويت.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: { canonical: "/products/" },
};

export default function ProductsPage() {
  const catalog = loadCatalog();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(PAGE_TITLE, PAGE_DESCRIPTION, "/products/"),
          itemListSchema(catalog.products, PAGE_TITLE),
        ]}
      />
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
    </>
  );
}
