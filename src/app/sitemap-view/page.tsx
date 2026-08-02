import Link from "next/link";
import type { Metadata } from "next";
import { loadCatalog } from "@/lib/products.server";
import { getProductPath } from "@/types/product";

export const metadata: Metadata = {
  title: "خريطة الموقع",
  description: "خريطة موقع GStore Q8 - جميع الصفحات والأقسام والمنتجات.",
};

export default function SitemapViewPage() {
  const catalog = loadCatalog();
  const categories = [...new Set(catalog.products.map((p) => p.category))].sort((a, b) =>
    a.localeCompare(b, "ar")
  );

  return (
    <div className="mx-auto max-w-[900px] px-4 py-12 lg:px-6">
      <nav className="mb-4 text-xs text-[#888]">
        <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
        <span className="mx-2">/</span>
        <span className="text-[#555]">خريطة الموقع</span>
      </nav>

      <h1 className="text-3xl font-black text-[#333]">خريطة الموقع</h1>
      <p className="mt-2 text-sm text-[#777]">
        تصفّح جميع صفحات المتجر. لخريطة XML لمحركات البحث:{" "}
        <a href="/sitemap.xml" className="font-bold text-[#e53935] hover:underline">
          sitemap.xml
        </a>
        {" · "}
        <a href="/feed/google-merchant" className="font-bold text-[#e53935] hover:underline">
          Google Merchant Feed
        </a>
      </p>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black text-[#333]">الصفحات الرئيسية</h2>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li><Link href="/" className="text-[#e53935] hover:underline">الرئيسية</Link></li>
          <li><Link href="/products" className="text-[#e53935] hover:underline">جميع المنتجات</Link></li>
          <li><Link href="/about" className="text-[#e53935] hover:underline">عن المتجر</Link></li>
          <li><Link href="/contact" className="text-[#e53935] hover:underline">اتصل بنا</Link></li>
          <li><Link href="/faq" className="text-[#e53935] hover:underline">الأسئلة الشائعة</Link></li>
          <li><Link href="/cart" className="text-[#e53935] hover:underline">سلة التسوق</Link></li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black text-[#333]">الصفحات القانونية</h2>
        <ul className="grid gap-2 text-sm sm:grid-cols-2">
          <li><Link href="/legal/privacy" className="text-[#e53935] hover:underline">سياسة الخصوصية</Link></li>
          <li><Link href="/legal/terms" className="text-[#e53935] hover:underline">الشروط والأحكام</Link></li>
          <li><Link href="/legal/returns" className="text-[#e53935] hover:underline">الإرجاع والاستبدال</Link></li>
          <li><Link href="/legal/shipping" className="text-[#e53935] hover:underline">الشحن والتوصيل</Link></li>
          <li><Link href="/legal/cookies" className="text-[#e53935] hover:underline">سياسة ملفات تعريف الارتباط</Link></li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black text-[#333]">أقسام المنتجات ({categories.length})</h2>
        <ul className="grid gap-2 text-sm sm:grid-cols-2 md:grid-cols-3">
          {categories.map((category) => (
            <li key={category}>
              <Link
                href={`/products?category=${encodeURIComponent(category)}`}
                className="text-[#e53935] hover:underline"
              >
                {category}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-black text-[#333]">المنتجات ({catalog.products.length})</h2>
        <p className="mb-4 text-xs text-[#888]">
          عرض أحدث 100 منتج. للقائمة الكاملة تصفّح{" "}
          <Link href="/products" className="text-[#e53935] hover:underline">صفحة المنتجات</Link>.
        </p>
        <ul className="max-h-96 space-y-1 overflow-y-auto text-sm">
          {catalog.products.slice(0, 100).map((product) => (
            <li key={product.id}>
              <Link href={getProductPath(product)} className="text-[#555] hover:text-[#e53935]">
                {product.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
