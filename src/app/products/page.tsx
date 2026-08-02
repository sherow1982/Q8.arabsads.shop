import ProductCatalog from "@/components/ProductCatalog";
import JsonLd from "@/components/JsonLd";
import type { Metadata } from "next";
import { loadCatalog } from "@/lib/products.server";
import { absoluteUrl, itemListSchema, webPageSchema } from "@/lib/schema";

const PAGE_TITLE = "جميع المنتجات";
const PAGE_DESCRIPTION =
  "تصفّح جميع منتجات GStore Q8 - إلكترونيات، ألعاب فيديو، قيمنج وإكسسوارات في الكويت.";

export const metadata: Metadata = {
  title: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  alternates: {
    canonical: "/products",
  },
};

type Props = {
  searchParams: Promise<{ q?: string; category?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const params = await searchParams;
  const q = params.q ?? "";
  const category = params.category ?? "";
  const catalog = loadCatalog();
  const listName = category || q ? "نتائج البحث" : "جميع المنتجات";

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(listName, PAGE_DESCRIPTION, "/products"),
          itemListSchema(catalog.products, listName),
        ]}
      />
      <ProductCatalog
        initialQuery={q}
        initialCategory={category}
        title={listName}
      />
    </>
  );
}
