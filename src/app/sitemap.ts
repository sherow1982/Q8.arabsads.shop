import { SITE_URL } from "@/lib/constants";
import { loadCatalog } from "@/lib/products.server";
import { getProductPath } from "@/types/product";

type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority: number;
};

export default function sitemap(): SitemapEntry[] {
  const catalog = loadCatalog();
  const now = new Date();

  // ─── الصفحات الثابتة ────────────────────────────────────────
  const staticPages: SitemapEntry[] = [
    { url: SITE_URL,                          lastModified: now, changeFrequency: "daily",   priority: 1.0 },
    { url: `${SITE_URL}/products`,            lastModified: now, changeFrequency: "daily",   priority: 0.9 },
    { url: `${SITE_URL}/about`,               lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/contact`,             lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/faq`,                 lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/cart`,                lastModified: now, changeFrequency: "never",   priority: 0.2 },
    { url: `${SITE_URL}/sitemap-view`,        lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${SITE_URL}/legal/privacy`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/terms`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/returns`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/shipping`,      lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${SITE_URL}/legal/cookies`,       lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
  ];

  // ─── صفحات التصنيفات ─────────────────────────────────────────
  const categoryPages: SitemapEntry[] = catalog.categories.map((cat) => ({
    url: `${SITE_URL}/products?category=${encodeURIComponent(cat)}`,
    lastModified: new Date(catalog.importedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // ─── صفحات المنتجات ──────────────────────────────────────────
  const productPages: SitemapEntry[] = catalog.products.map((product) => ({
    url: `${SITE_URL}${getProductPath(product)}`,
    lastModified: new Date(catalog.importedAt),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
