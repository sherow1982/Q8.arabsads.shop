import { SITE_URL } from "@/lib/constants";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/checkout", "/cart"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: ["/checkout"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
