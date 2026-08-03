import { SITE_URL } from "@/lib/constants";
import { loadCatalog } from "@/lib/products.server";

export const dynamic = "force-static";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export default function sitemap(): SitemapEntry[] {
  const catalog = loadCatalog();
  const now = new Date();
  const importedAt = new Date(catalog.importedAt);

  // ─── الصفحات الثابتة الأساسية ───────────────────────────────
  const staticPages: SitemapEntry[] = [
    { url: SITE_URL,                          lastModified: now,        changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/products`,            lastModified: now,        changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/about`,               lastModified: now,        changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/contact`,             lastModified: now,        changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/faq`,                 lastModified: now,        changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/sitemap-view`,        lastModified: now,        changeFrequency: "monthly", priority: 0.4 },
    { url: `${SITE_URL}/legal/privacy`,       lastModified: now,        changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`,         lastModified: now,        changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/returns`,       lastModified: now,        changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/shipping`,      lastModified: now,        changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies`,       lastModified: now,        changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ─── صفحات التصنيفات ─────────────────────────────────────────
  const categoryPages: SitemapEntry[] = catalog.categories.map((cat) => ({
    url: `${SITE_URL}/products/?category=${encodeURIComponent(cat)}`,
    lastModified: importedAt,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── صفحات المنتجات (clean URL format) ────────────────────
  const productPages: SitemapEntry[] = catalog.products.map((product) => {
    const slug = product.slug || product.id.replace(/^ProductVariant_/, "");
    return {
      url: `${SITE_URL}/products/product/?slug=${encodeURIComponent(slug)}`,
      lastModified: importedAt,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    };
  });

  return [...staticPages, ...categoryPages, ...productPages];
}
