import { Suspense } from "react";
import ProductCatalog from "@/components/ProductCatalog";
import ProductCard from "@/components/ProductCard";
import JsonLd from "@/components/JsonLd";
import { getFeaturedProducts, loadCatalog } from "@/lib/products.server";
import { itemListSchema, webPageSchema } from "@/lib/schema";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الرئيسية",
  description:
    "Q8 اعلانات العرب — وجهتك للتسوق الذكي في الكويت. آلاف المنتجات من إلكترونيات، ألعاب، منزل وجمال بأفضل الأسعار بالدينار الكويتي.",
  alternates: { canonical: "/" },
};

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
      {/* ─── البانر الرئيسي ─── */}
      <section className="w-full bg-[#1a1a2e]">
        <a href="/products/" className="block">
          <img
            src="/banner.webp"
            alt="Q8 اعلانات العرب — أفضل العروض والخصومات"
            className="h-auto w-full object-cover"
            style={{ maxHeight: "480px", objectPosition: "center" }}
          />
        </a>
      </section>

      {/* ─── كاردات التصنيف السريع ─── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[1400px] gap-3 px-4 py-4 sm:grid-cols-3 lg:px-6">
          <a
            href="/products/?category=%D8%A5%D9%84%D9%83%D8%AA%D8%B1%D9%88%D9%86%D9%8A%D8%A7%D8%AA"
            className="rounded-sm bg-gradient-to-l from-[#e53935] to-[#c62828] p-6 text-white transition hover:opacity-95"
          >
            <h2 className="text-xl font-black">إلكترونيات</h2>
            <p className="mt-1 text-sm opacity-90">أجهزة وإكسسوارات بأفضل الأسعار</p>
          </a>
          <a
            href="/products/?category=%D8%A3%D9%84%D8%B9%D8%A7%D8%A8+%D9%88%D9%87%D9%88%D8%A7%D9%8A%D8%A7%D8%AA"
            className="rounded-sm bg-gradient-to-l from-[#1a237e] to-[#283593] p-6 text-white transition hover:opacity-95"
          >
            <h2 className="text-xl font-black">ألعاب وهوايات</h2>
            <p className="mt-1 text-sm opacity-90">قيمنق، بلايستيشن، إكس بوكس</p>
          </a>
          <a
            href="/products/?category=%D8%A7%D9%84%D9%85%D9%86%D8%B2%D9%84+%D9%88%D8%A7%D9%84%D8%AD%D8%AF%D9%8A%D9%82%D8%A9"
            className="rounded-sm bg-gradient-to-l from-[#2e7d32] to-[#1b5e20] p-6 text-white transition hover:opacity-95"
          >
            <h2 className="text-xl font-black">المنزل والحديقة</h2>
            <p className="mt-1 text-sm opacity-90">كل ما تحتاجه لمنزلك</p>
          </a>
        </div>
      </section>

      <section className="border-y border-[#eee] bg-[#fafafa] py-8">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-black text-[#333]">وصل حديثاً</h2>
            <a href="/products/" className="text-sm font-bold text-[#e53935] hover:underline">
              المزيد ←
            </a>
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
              <a
                key={cat}
                href={`/products/?category=${encodeURIComponent(cat)}`}
                className="rounded-sm border border-[#eee] bg-white p-4 text-center text-sm font-bold text-[#333] transition hover:border-[#e53935] hover:text-[#e53935]"
              >
                {cat}
              </a>
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
