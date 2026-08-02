import type { Metadata } from "next";
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
  STORE_LOGO_URL,
  STORE_NAME,
  STORE_NAME_AR,
  STORE_NAME_FULL,
} from "@/lib/constants";
import { organizationSchema, storeSchema, websiteSchema } from "@/lib/schema";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-cairo",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: STORE_NAME_FULL,
    template: `%s | ${STORE_NAME}`,
  },
  description:
    "Q8 اعلانات العرب — منصة التسوق الإلكتروني الأولى في الكويت. آلاف المنتجات من إلكترونيات، ألعاب، منزل وحديقة، صحة وجمال بأفضل الأسعار بالدينار الكويتي.",
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
  ],
  applicationName: STORE_NAME,
  authors: [{ name: STORE_NAME_AR, url: SITE_URL }],
  creator: STORE_NAME,
  publisher: STORE_NAME,
  formatDetection: { telephone: true, email: true },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ar-KW": SITE_URL,
    },
  },
  openGraph: {
    title: STORE_NAME_FULL,
    description:
      "Q8 اعلانات العرب — تسوّق إلكترونيات، ألعاب، منزل وجمال بأفضل الأسعار في الكويت",
    siteName: STORE_NAME,
    locale: "ar_KW",
    type: "website",
    url: SITE_URL,
    images: [
      {
        url: STORE_LOGO_URL,
        width: 1200,
        height: 630,
        alt: STORE_NAME_AR,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: STORE_NAME_FULL,
    description: "Q8 اعلانات العرب — تسوق في الكويت بأفضل الأسعار",
    images: [STORE_LOGO_URL],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
        {/* Geo Tags للكويت */}
        <meta name="geo.region" content="KW" />
        <meta name="geo.placename" content="Kuwait" />
        <meta name="geo.position" content="29.3375;48.0758" />
        <meta name="ICBM" content="29.3375, 48.0758" />
        {/* هوية المتجر */}
        <meta name="author" content={STORE_NAME_AR} />
        <meta name="copyright" content={STORE_NAME_AR} />
        <meta name="language" content="Arabic" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        {/* Schema.org */}
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
