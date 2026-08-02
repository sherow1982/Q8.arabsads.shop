import {
  SITE_URL,
  STORE_ADDRESS,
  STORE_CITY,
  STORE_COUNTRY,
  STORE_EMAIL,
  STORE_LOGO_URL,
  STORE_NAME,
  STORE_NAME_AR,
  STORE_PHONE_FULL,
} from "./constants";
import type { Product } from "@/types/product";
import { formatPrice, getProductPath, hasDiscount } from "@/types/product";

export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// ─── Organization ────────────────────────────────────────────
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: STORE_NAME,
    alternateName: STORE_NAME_AR,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: STORE_LOGO_URL,
      width: 300,
      height: 75,
    },
    email: STORE_EMAIL,
    telephone: STORE_PHONE_FULL,
    address: {
      "@type": "PostalAddress",
      addressLocality: STORE_CITY,
      addressCountry: STORE_COUNTRY,
      addressRegion: "Kuwait",
      streetAddress: STORE_ADDRESS,
    },
    areaServed: [
      { "@type": "Country", name: "Kuwait" },
      { "@type": "Country", name: "الكويت" },
    ],
    sameAs: [
      "https://www.instagram.com/arabsads",
      "https://twitter.com/arabsads",
      "https://www.facebook.com/arabsads",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      telephone: STORE_PHONE_FULL,
      contactType: "customer service",
      areaServed: STORE_COUNTRY,
      availableLanguage: ["Arabic"],
      contactOption: "TollFree",
    },
  };
}

// ─── WebSite ──────────────────────────────────────────────────
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: STORE_NAME,
    alternateName: STORE_NAME_AR,
    url: SITE_URL,
    inLanguage: "ar",
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/products?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── Store (LocalBusiness) ────────────────────────────────────
export function storeSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["Store", "OnlineStore"],
    "@id": `${SITE_URL}/#store`,
    name: STORE_NAME,
    alternateName: STORE_NAME_AR,
    description:
      "Q8 اعلانات العرب — منصة التسوق الإلكتروني الأولى في الكويت. آلاف المنتجات بأفضل الأسعار.",
    url: SITE_URL,
    logo: STORE_LOGO_URL,
    image: STORE_LOGO_URL,
    email: STORE_EMAIL,
    telephone: STORE_PHONE_FULL,
    address: {
      "@type": "PostalAddress",
      addressLocality: STORE_CITY,
      addressCountry: STORE_COUNTRY,
      addressRegion: "Kuwait",
      streetAddress: STORE_ADDRESS,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 29.3375,
      longitude: 48.0758,
    },
    hasMap: "https://maps.google.com/?q=Hawalli,Kuwait",
    areaServed: { "@type": "Country", name: "Kuwait" },
    priceRange: "$$",
    currenciesAccepted: "KWD",
    paymentAccepted: "Cash, Bank Transfer, KNET",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: [
      "https://www.instagram.com/arabsads",
      "https://twitter.com/arabsads",
    ],
  };
}

// ─── ItemList ─────────────────────────────────────────────────
export function itemListSchema(
  products: Product[],
  listName: string,
  maxItems = 20
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: listName,
    numberOfItems: products.length,
    itemListElement: products.slice(0, maxItems).map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: absoluteUrl(getProductPath(product)),
      name: product.title,
    })),
  };
}

// ─── WebPage ──────────────────────────────────────────────────
export function webPageSchema(title: string, description: string, path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "ar",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

// ─── FAQ ──────────────────────────────────────────────────────
export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

// ─── Product ──────────────────────────────────────────────────
export function productSchema(product: Product) {
  const price = product.salePrice ?? product.price;
  const path = getProductPath(product);
  const productUrl = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${productUrl}#product`,
    name: product.title,
    description: product.description || product.summary,
    image: product.image ? [product.image] : undefined,
    sku: product.id,
    mpn: product.id,
    brand: {
      "@type": "Brand",
      name: product.category ?? STORE_NAME,
    },
    seller: { "@id": `${SITE_URL}/#organization` },
    category: product.category,
    url: productUrl,
    offers:
      price != null
        ? {
            "@type": "Offer",
            "@id": `${productUrl}#offer`,
            url: productUrl,
            priceCurrency: "KWD",
            price: price.toFixed(3),
            availability: "https://schema.org/InStock",
            itemCondition: "https://schema.org/NewCondition",
            priceValidUntil: new Date(Date.now() + 30 * 86400000)
              .toISOString()
              .slice(0, 10),
            seller: { "@id": `${SITE_URL}/#organization` },
            shippingDetails: {
              "@type": "OfferShippingDetails",
              shippingRate: {
                "@type": "MonetaryAmount",
                value: 0,
                currency: "KWD",
              },
              shippingDestination: {
                "@type": "DefinedRegion",
                addressCountry: STORE_COUNTRY,
              },
              deliveryTime: {
                "@type": "ShippingDeliveryTime",
                handlingTime: {
                  "@type": "QuantitativeValue",
                  minValue: 0,
                  maxValue: 1,
                  unitCode: "DAY",
                },
                transitTime: {
                  "@type": "QuantitativeValue",
                  minValue: 1,
                  maxValue: 3,
                  unitCode: "DAY",
                },
              },
            },
            hasMerchantReturnPolicy: {
              "@type": "MerchantReturnPolicy",
              applicableCountry: STORE_COUNTRY,
              returnPolicyCategory:
                "https://schema.org/MerchantReturnFiniteReturnWindow",
              merchantReturnDays: 7,
              returnMethod: "https://schema.org/ReturnByMail",
              returnFees: "https://schema.org/FreeReturn",
            },
            ...(hasDiscount(product) && product.price != null
              ? {
                  priceSpecification: {
                    "@type": "UnitPriceSpecification",
                    price: product.price.toFixed(3),
                    priceCurrency: "KWD",
                    priceType: "https://schema.org/ListPrice",
                  },
                }
              : {}),
          }
        : undefined,
  };
}

// ─── Breadcrumb ───────────────────────────────────────────────
export function breadcrumbSchema(items: { name: string; path?: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.path ? absoluteUrl(item.path) : undefined,
    })),
  };
}

// ─── Merchant helpers ─────────────────────────────────────────
export function merchantPrice(product: Product): string | null {
  const value = product.salePrice ?? product.price;
  if (value == null) return null;
  return `${value.toFixed(3)} KWD`;
}

export function merchantDescription(product: Product): string {
  const text = (product.description || product.summary || product.title)
    .replace(/\s+/g, " ")
    .trim();
  return text.slice(0, 5000);
}

export function merchantProductId(product: Product): string {
  return product.id.replace(/^ProductVariant_/, "");
}

export function merchantProductLink(product: Product): string {
  return absoluteUrl(getProductPath(product));
}

export function merchantProductPrice(product: Product): string {
  return formatPrice(product);
}

// ─── Google Merchant Category Map ────────────────────────────
const GOOGLE_CATEGORY_MAP: Record<string, string> = {
  "إلكترونيات": "222",
  "الكترونيات": "222",
  "ألعاب فيديو": "1279",
  "العاب فيديو": "1279",
  "قيمنق": "1270",
  "Gaming": "1270",
  "PlayStation": "1270",
  "Xbox": "1270",
  "Nintendo": "1270",
  "إكسسوارات": "222",
  "اكسسوارات": "222",
  "منزل وحديقة": "536",
  "المنزل والحديقة": "536",
  "أجهزة منزلية": "604",
  "أدوات واجهزة منزلية": "604",
  "هواتف": "267",
  "كمبيوتر": "325",
  "صحة وجمال": "469",
  "ملابس وإكسسوارات": "1604",
  "مستلزمات السيارات": "916",
  "ألعاب وهوايات": "1249",
};

export function merchantGoogleCategory(category: string): string {
  const normalized = category.trim();
  if (GOOGLE_CATEGORY_MAP[normalized]) return GOOGLE_CATEGORY_MAP[normalized];
  for (const [key, id] of Object.entries(GOOGLE_CATEGORY_MAP)) {
    if (normalized.includes(key) || key.includes(normalized)) return id;
  }
  return "222";
}
