import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://Q8.arabsads.shop"),
  title: "GStore | Q8.arabsads.shop",
  description: "منصة متجر إلكتروني عربية تم تصميمها بشكل احترافي وقابل للنشر على Cloudflare Pages باسم النطاق Q8.arabsads.shop.",
  applicationName: "GStore",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "GStore | Q8.arabsads.shop",
    description: "منصة متجر إلكتروني عربية تم تصميمها لتحقيق تجربة شراء احترافية على النطاق Q8.arabsads.shop.",
    url: "https://Q8.arabsads.shop",
    siteName: "Q8.arabsads.shop",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
