import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { formatPrice, getProductPath, hasDiscount } from "@/types/product";
import { getProductBySlug, searchProducts } from "@/lib/products.server";
import ProductCard from "@/components/ProductCard";
import AddToCartButton from "@/components/AddToCartButton";
import ProductWhatsAppButton from "@/components/ProductWhatsAppButton";
import ProductWhatsAppContextSetter from "@/components/ProductWhatsAppContextSetter";
import JsonLd from "@/components/JsonLd";
import { absoluteUrl, breadcrumbSchema, productSchema } from "@/lib/schema";
import { STORE_NAME } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "منتج غير موجود" };
  const path = getProductPath(product);
  const description = (product.summary || product.description || product.title).slice(0, 160);
  return {
    title: product.title,
    description,
    openGraph: {
      title: product.title,
      description,
      type: "website",
      url: absoluteUrl(path),
      images: product.image ? [{ url: product.image, alt: product.title }] : undefined,
    },
    alternates: { canonical: absoluteUrl(path) },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  // TypeScript guard: notFound() throws, so product is defined after this
  if (!product) {
    notFound();
  }

  const related = searchProducts({ category: product!.category, limit: 7 }).products
    .filter((item) => item.id !== product!.id)
    .slice(0, 6);

  const discounted = hasDiscount(product!);
  const path = getProductPath(product!);
  const productLink = absoluteUrl(path);
  const productInquiry = {
    title: product!.title,
    price: formatPrice(product!),
    link: productLink,
  };

  return (
    <>
      <ProductWhatsAppContextSetter product={productInquiry} />
      <JsonLd
        data={[
          productSchema(product!),
          breadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المنتجات", path: "/products" },
            { name: product!.title, path },
          ]),
        ]}
      />

      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
        <nav className="mb-4 text-xs text-[#888]" aria-label="مسار التصفح">
          <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/products" className="hover:text-[#e53935]">المنتجات</Link>
          <span className="mx-2">/</span>
          <span className="text-[#555]">{product!.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* صورة المنتج */}
          <div className="overflow-hidden rounded-sm border border-[#eee] bg-[#fafafa]">
            {product!.image ? (
              <img
                src={product!.image}
                alt={product!.title}
                className="mx-auto max-h-[520px] w-full object-contain p-6"
              />
            ) : (
              <div className="flex h-80 items-center justify-center text-[#999]">بدون صورة</div>
            )}
          </div>

          {/* تفاصيل المنتج */}
          <div>
            <span className="text-xs font-bold text-[#e53935]">{product!.category}</span>
            <h1 className="mt-2 text-2xl font-black leading-9 text-[#333] lg:text-3xl">
              {product!.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-[#333]">
                <span className="text-sm font-bold">KD</span> {formatPrice(product!)}
              </span>
              {discounted && product!.price != null ? (
                <span className="text-lg text-[#999] line-through">KD {product!.price.toFixed(3)}</span>
              ) : null}
              {discounted ? (
                <span className="rounded bg-[#e53935] px-2 py-0.5 text-xs font-bold text-white">
                  عرض خاص
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-sm leading-8 text-[#666]">{product!.description}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AddToCartButton product={product!} />
              <ProductWhatsAppButton product={productInquiry} />
              <Link
                href={`/products?category=${encodeURIComponent(product!.category)}`}
                className="rounded border border-[#ddd] px-8 py-3 text-center text-sm font-bold text-[#333] hover:border-[#333]"
              >
                المزيد من {product!.category}
              </Link>
            </div>

            <div className="mt-8 rounded-sm border border-[#eee] bg-[#fafafa] p-4 text-sm text-[#666]">
              <p>✓ توصيل لجميع محافظات الكويت</p>
              <p>✓ منتج أصلي ومضمون من {STORE_NAME}</p>
              <p>✓ خدمة عملاء 24/7 عبر واتساب</p>
            </div>
          </div>
        </div>

        {related.length ? (
          <section className="mt-12">
            <h2 className="mb-5 text-xl font-black text-[#333]">منتجات مشابهة</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
              {related.map((item) => (
                <ProductCard key={item.id} product={item} />
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
