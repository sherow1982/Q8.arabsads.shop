"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AddToCartButton from "./AddToCartButton";
import ProductWhatsAppButton from "./ProductWhatsAppButton";
import ProductWhatsAppContextSetter from "./ProductWhatsAppContextSetter";
import ProductCard from "./ProductCard";
import type { Product } from "@/types/product";
import { ceilPrice, formatPrice, hasDiscount } from "@/types/product";
import { STORE_NAME } from "@/lib/constants";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://q8.arabsads.shop";

type Catalog = { products: Product[]; categories: string[]; total: number };

export default function ProductDetailClient({ slug }: { slug: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    fetch("/products-index.json")
      .then((r) => r.json())
      .then((catalog: Catalog) => {
        const target = decodeURIComponent(slug).replace(/\/+$/, "");
        const found = catalog.products.find(
          (p) =>
            p.slug === target ||
            p.id.replace(/^ProductVariant_/, "") === target ||
            p.id === target
        );
        if (found) {
          setProduct(found);
          // ─── SEO: title + meta description + canonical ───
          const price = Math.ceil(found.salePrice ?? found.price ?? 0).toFixed(3);
          document.title = `${found.title} — ${price} KD | Q8 اعلانات العرب`;
          const desc = (found.description || found.summary || found.title).slice(0, 155) + ` — ${price} KD. توصيل لجميع مناطق الكويت.`;
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) { metaDesc = document.createElement("meta"); (metaDesc as HTMLMetaElement).name = "description"; document.head.appendChild(metaDesc); }
          (metaDesc as HTMLMetaElement).content = desc;
          // ─── Schema.org Product ───
          const existingSchema = document.getElementById("product-schema");
          if (existingSchema) existingSchema.remove();
          const script = document.createElement("script");
          script.id = "product-schema";
          script.type = "application/ld+json";
          script.text = JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: found.title,
            description: found.description || found.summary,
            image: found.image ? [found.image] : undefined,
            sku: found.id,
            brand: { "@type": "Brand", name: found.category },
            offers: {
              "@type": "Offer",
              priceCurrency: "KWD",
              price: price,
              availability: "https://schema.org/InStock",
              itemCondition: "https://schema.org/NewCondition",
              url: `${SITE_URL}/products/product/?slug=${encodeURIComponent(found.slug)}/`,
              shippingDetails: {
                "@type": "OfferShippingDetails",
                shippingRate: { "@type": "MonetaryAmount", value: 0, currency: "KWD" },
                shippingDestination: { "@type": "DefinedRegion", addressCountry: "KW" },
              },
            },
          });
          document.head.appendChild(script);
          const rel = catalog.products
            .filter((p) => p.category === found.category && p.slug !== found.slug)
            .slice(0, 6);
          setRelated(rel);
        } else {
          setNotFound(true);
        }
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-20 text-center">
        <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-[#e53935] border-t-transparent" />
        <p className="mt-4 text-sm text-[#888]">جاري تحميل المنتج...</p>
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div className="mx-auto max-w-[1400px] px-4 py-20 text-center">
        <h1 className="text-2xl font-black text-[#333]">المنتج غير موجود</h1>
        <p className="mt-2 text-sm text-[#777]">قد يكون المنتج غير متوفر أو انتهى المخزون.</p>
        <Link
          href="/products/"
          className="mt-6 inline-block rounded bg-[#333] px-6 py-3 text-sm font-bold text-white hover:bg-[#e53935]"
        >
          ← تصفّح جميع المنتجات
        </Link>
      </div>
    );
  }

  const discounted = hasDiscount(product);
  const productLink = `${SITE_URL}/products/product/?slug=${encodeURIComponent(slug)}/`;
  const productInquiry = { title: product.title, price: formatPrice(product), link: productLink };

  return (
    <>
      <ProductWhatsAppContextSetter product={productInquiry} />
      <div className="mx-auto max-w-[1400px] px-4 py-8 lg:px-6">
        <nav className="mb-4 text-xs text-[#888]" aria-label="مسار التصفح">
          <Link href="/" className="hover:text-[#e53935]">الرئيسية</Link>
          <span className="mx-2">/</span>
          <Link href="/products/" className="hover:text-[#e53935]">المنتجات</Link>
          <span className="mx-2">/</span>
          <span className="text-[#555]">{product.title}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* الصورة */}
          <div className="overflow-hidden rounded-sm border border-[#eee] bg-[#fafafa]">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="mx-auto max-h-[520px] w-full object-contain p-6"
              />
            ) : (
              <div className="flex h-80 items-center justify-center text-[#999]">بدون صورة</div>
            )}
          </div>

          {/* التفاصيل */}
          <div>
            <span className="text-xs font-bold text-[#e53935]">{product.category}</span>
            <h1 className="mt-2 text-2xl font-black leading-9 text-[#333] lg:text-3xl">
              {product.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-3xl font-black text-[#333]">
                <span className="text-sm font-bold">KD</span> {formatPrice(product)}
              </span>
              {discounted && product.price != null ? (
                <span className="text-lg text-[#999] line-through">
                  KD {ceilPrice(product.price).toFixed(3)}
                </span>
              ) : null}
              {discounted ? (
                <span className="rounded bg-[#e53935] px-2 py-0.5 text-xs font-bold text-white">
                  عرض خاص
                </span>
              ) : null}
            </div>

            <p className="mt-5 text-sm leading-8 text-[#666]">{product.description}</p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <AddToCartButton product={product} />
              <ProductWhatsAppButton product={productInquiry} />
              <Link
                href={`/products/?category=${encodeURIComponent(product.category)}`}
                className="rounded border border-[#ddd] px-8 py-3 text-center text-sm font-bold text-[#333] hover:border-[#333]"
              >
                المزيد من {product.category}
              </Link>
            </div>

            <div className="mt-8 rounded-sm border border-[#eee] bg-[#fafafa] p-4 text-sm text-[#666]">
              <p>✓ توصيل لجميع محافظات الكويت</p>
              <p>✓ منتج أصلي ومضمون من {STORE_NAME}</p>
              <p>✓ خدمة عملاء 24/7 عبر واتساب</p>
            </div>
          </div>
        </div>

        {related.length > 0 ? (
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
