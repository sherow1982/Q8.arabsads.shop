import type { Metadata, Viewport } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/TopBar";
import Header from "@/components/Header";
import CategoryMenu from "@/components/CategoryMenu";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import JsonLd from "@/components/JsonLd";
import { CartProvider } from "@/context/CartContext";
import { WhatsAppProductProvider } from "@/context/WhatsAppProductContext";
import {
  SITE_URL,
  STORE_EMAIL,
  STORE_LOGO_URL,
  STORE_NAME,
  STORE_NAME_AR,
  STORE_NAME_FULL,
  STORE_PHONE_FULL,
  WHATSAPP_URL,
} from "@/lib/constants";
import { organizationSchema, storeSchema, websiteSchema } from "@/lib/schema";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

// ─── Viewport / موبايل أولاً ───────────────────────────────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e53935" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a2e" },
  ],
};

// ─── SEO Metadata ────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: STORE_NAME_FULL,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Q8 اعلانات العرب — منصة التسوق الإلكتروني الأولى في الكويت. آلاف المنتجات من إلكترونيات، ألعاب، منزل وحديقة، صحة وجمال بأفضل الأسعار بالدينار الكويتي. توصيل سريع لجميع مناطق الكويت.",
  keywords: [
    "Q8 اعلانات العرب",
    "ArabsAds Q8",
    "متجر الكويت",
    "إلكترونيات الكويت",
    "تسوق أونلاين الكويت",
    "عروض الكويت",
    "أفضل أسعار الكويت",
    "ألعاب فيديو الكويت",
    "منتجات الكويت",
    "q8.arabsads.shop",
    "arabsads",
    "اعلانات العرب",
    "تسوق ديناركويتي",
    "شراء اون لاين الكويت",
    "توصيل الكويت",
  ],
  applicationName: STORE_NAME,
  authors: [{ name: STORE_NAME_AR, url: SITE_URL }],
  creator: STORE_NAME_AR,
  publisher: STORE_NAME_AR,
  generator: "Next.js",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
      { url: "/logo.webp", type: "image/webp" },
    ],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
    other: [
      { rel: "apple-touch-icon", url: "/favicon.png" },
    ],
  },
  formatDetection: { telephone: true, email: true, address: true },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-KW": SITE_URL,
      "ar": SITE_URL,
    },
  },
  openGraph: {
    title: STORE_NAME_FULL,
    description:
      "Q8 اعلانات العرب — تسوّق إلكترونيات، ألعاب، منزل وجمال بأفضل الأسعار في الكويت. آلاف المنتجات بالدينار الكويتي مع توصيل سريع.",
    siteName: STORE_NAME_AR,
    locale: "ar_KW",
    type: "website",
    url: SITE_URL,
    countryName: "Kuwait",
    emails: [STORE_EMAIL],
    phoneNumbers: [STORE_PHONE_FULL],
    images: [
      {
        url: "/banner.webp",
        width: 1200,
        height: 630,
        alt: `${STORE_NAME_AR} — أفضل متجر أونلاين في الكويت`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: STORE_NAME_FULL,
    description: "Q8 اعلانات العرب — تسوق في الكويت بأفضل الأسعار بالدينار الكويتي",
    images: ["/banner.webp"],
    creator: "@arabsads",
    site: "@arabsads",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // أضف كود التحقق من Google Search Console عند الحاجة
    // google: "XXXXXX",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={`${cairo.variable} h-full`}>
      <head>
        {/* ─── Geo Tags للكويت ────────────────── */}
        <meta name="geo.region" content="KW" />
        <meta name="geo.placename" content="Kuwait" />
        <meta name="geo.position" content="29.3375;48.0758" />
        <meta name="ICBM" content="29.3375, 48.0758" />
        {/* ─── هوية المتجر ────────────────────── */}
        <meta name="author" content={STORE_NAME_AR} />
        <meta name="copyright" content={STORE_NAME_AR} />
        <meta name="language" content="Arabic" />
        <meta name="revisit-after" content="2 days" />
        <meta name="rating" content="general" />
        <meta name="category" content="Shopping, E-commerce, Kuwait" />
        {/* ─── AI / LLM Crawlers ──────────────── */}
        <meta name="ai-content-declaration" content="human-written" />
        <link rel="ai-context" href={`${SITE_URL}/products-index.json`} />
        {/* ─── Contact ─────────────────────────── */}
        <meta name="contact" content={STORE_EMAIL} />
        <meta name="reply-to" content={STORE_EMAIL} />
        {/* ─── Mobile App Tags ────────────────── */}
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content={STORE_NAME_AR} />
        <meta name="application-name" content={STORE_NAME_AR} />
        {/* ─── WhatsApp / Business ────────────── */}
        <link rel="me" href={WHATSAPP_URL} />
        {/* ─── Schema.org ─────────────────────── */}
        <JsonLd data={[organizationSchema(), storeSchema(), websiteSchema()]} />
      </head>
      <body className="flex min-h-full flex-col bg-white font-[family-name:var(--font-cairo)] text-[#333] antialiased">
        <CartProvider>
          <WhatsAppProductProvider>
            <TopBar />
            <Header />
            <CategoryMenu />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppFloat />
          </WhatsAppProductProvider>
        </CartProvider>
      </body>
    </html>
  );
}
