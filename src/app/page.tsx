import { Suspense } from "react";
import Link from "next/link";
import ProductCatalog from "@/components/ProductCatalog";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { getFeaturedProducts, loadCatalog } from "@/lib/products.server";
import { itemListSchema, webPageSchema } from "@/lib/schema";
import { STORE_NAME_AR } from "@/lib/constants";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "Q8 اعلانات العرب — وجهتك للتسوق الذكي في الكويت. آلاف المنتجات من إلكترونيات، ألعاب، منزل وجمال بأفضل الأسعار بالدينار الكويتي.",
  alternates: { canonical: "/" },
};

const banners = [
  {
    title: "أحدث العروض",
    subtitle: "خصومات على آلاف المنتجات",
    href: "/products/",
    color: "from-[#1a1a2e] to-[#16213e]",
  },
  {
    title: "إلكترونيات",
    subtitle: "أجهزة وإكسسوارات بأفضل الأسعار",
    href: "/products/?category=%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA",
    color: "from-[#e53935] to-[#c62828]",
  },
  {
    title: "المنزل والحديقة",
    subtitle: "كل ما تحتاجه لمنزلك",
    href: "/products/?category=%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84+%D9%88%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D9%82%D8%A9",
    color: "from-[#2e7d32] to-[#1b5e20]",
  },
];

export default function Home() {
  const featured = getFeaturedProducts(12);
  const catalog = loadCatalog();

  return (
    <>
      <JsonLd
        data={[
          webPageSchema(
            `الرئيسية | Q8 اعلانات العرب`,
            "منصة التسوق الإلكتروني الأولى في الكويت — آلاف المنتجات بأفضل الأسعار",
            "/"
          ),
          itemListSchema(featured, "منتجات مميزة من Q8 اعلانات العرب", 12),
        ]}
      />
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-3 px-4 py-4 lg:grid-cols-3 lg:px-6">
          {banners.map((banner) => (
            <Link
              key={banner.title}
              href={banner.href}
              className={`rounded-sm bg-gradient-to-l ${banner.color} p-6 text-white transition hover:opacity-95`}
            >
              <h2 className="text-xl font-black">{banner.title}</h2>
              <p className="mt-1 text-sm opacity-90">{banner.subtitle}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-y border-[#eee] bg-[#fafafa] py-8">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#333]">وصل حديثاً</h2>
            <Link href="/products" className="text-sm font-bold text-[#e53935] hover:underline">
              المزيد ←
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
            {featured.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-8">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <h2 className="mb-5 text-xl font-black text-[#333]">تسوق حسب التصنيف</h2>
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {catalog.categories.map((cat) => (
              <Link
                key={cat}
                href={`/products?category=${encodeURIComponent(cat)}`}
                className="rounded-sm border border-[#eee] bg-white p-4 text-center text-sm font-bold text-[#333] transition hover:border-[#e53935] hover:text-[#e53935]"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Suspense fallback={
        <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="h-72 animate-pulse rounded-sm bg-[#f0f0f0]" />
            ))}
          </div>
        </div>
      }>
        <ProductCatalog title="منتجات مميزة" compact />
      </Suspense>
    </>
  );
}
