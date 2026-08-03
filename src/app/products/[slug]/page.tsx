import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "@/components/JsonLd";
import ProductDetailClient from "@/components/ProductDetailClient";
import { loadCatalog, getProductBySlug } from "@/lib/products.server";
import { breadcrumbSchema, productSchema } from "@/lib/schema";
import { formatPrice } from "@/types/product";
import { SITE_URL, STORE_NAME } from "@/lib/constants";
import type { Product } from "@/types/product";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const catalog = loadCatalog();
  return catalog.products.map((p) => ({
    slug: p.slug || p.id.replace(/^ProductVariant_/, ""),
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product: Product | undefined = getProductBySlug(slug);
  if (!product) return { title: "المنتج غير موجود" };

  const price = formatPrice(product);
  const title = `${product.title} — ${price} KD | ${STORE_NAME}`;
  const description =
    (product.description || product.summary || product.title).slice(0, 155) +
    ` — ${price} KD. توصيل لجميع مناطق الكويت.`;
  const url = `${SITE_URL}/products/${encodeURIComponent(slug)}/`;

  return {
    title,
    description,
    alternates: { canonical: `/products/${encodeURIComponent(slug)}/` },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: product.image ? [{ url: product.image, alt: product.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: product.image ? [product.image] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product: Product | undefined = getProductBySlug(slug);

  if (!product) notFound();

  const safeProduct = product as Product;

  return (
    <>
      <JsonLd
        data={[
          productSchema(safeProduct),
          breadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المنتجات", path: "/products/" },
            { name: safeProduct.title },
          ]),
        ]}
      />
      <ProductDetailClient slug={slug} />
    </>
  );
}
