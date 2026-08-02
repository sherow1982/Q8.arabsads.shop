import { NextResponse } from "next/server";
import { SITE_URL, STORE_NAME, STORE_NAME_AR } from "@/lib/constants";
import { loadCatalog } from "@/lib/products.server";
import {
  merchantDescription,
  merchantGoogleCategory,
  merchantPrice,
  merchantProductId,
  merchantProductLink,
} from "@/lib/schema";

export const dynamic = "force-dynamic";
export const revalidate = 3600;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export async function GET() {
  const catalog = loadCatalog();
  const items = catalog.products
    .filter((p) => merchantPrice(p) != null && p.image)
    .map((product) => {
      const hasSale =
        product.salePrice != null &&
        product.price != null &&
        product.salePrice < product.price;

      const price = hasSale
        ? `${product.price!.toFixed(3)} KWD`
        : merchantPrice(product)!;

      const saleTag = hasSale
        ? `<g:sale_price>${escapeXml(`${product.salePrice!.toFixed(3)} KWD`)}</g:sale_price>`
        : "";

      return `<item>
  <g:id>${escapeXml(merchantProductId(product))}</g:id>
  <g:title>${escapeXml(product.title.slice(0, 150))}</g:title>
  <g:description>${escapeXml(merchantDescription(product))}</g:description>
  <g:link>${escapeXml(merchantProductLink(product))}</g:link>
  <g:image_link>${escapeXml(product.image)}</g:image_link>
  <g:availability>in_stock</g:availability>
  <g:price>${escapeXml(price)}</g:price>
  ${saleTag}
  <g:brand>${escapeXml(STORE_NAME)}</g:brand>
  <g:seller_name>${escapeXml(STORE_NAME_AR)}</g:seller_name>
  <g:condition>new</g:condition>
  <g:identifier_exists>false</g:identifier_exists>
  <g:target_country>KW</g:target_country>
  <g:content_language>ar</g:content_language>
  <g:google_product_category>${escapeXml(merchantGoogleCategory(product.category))}</g:google_product_category>
  <g:product_type>${escapeXml(product.category)}</g:product_type>
  <g:ads_grouping>${escapeXml(product.category)}</g:ads_grouping>
  <g:shipping>
    <g:country>KW</g:country>
    <g:service>Standard</g:service>
    <g:price>0 KWD</g:price>
  </g:shipping>
  <g:tax>
    <g:country>KW</g:country>
    <g:rate>0</g:rate>
    <g:tax_ship>no</g:tax_ship>
  </g:tax>
  <g:return_policy_label>free-returns</g:return_policy_label>
</item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:g="http://base.google.com/ns/1.0">
  <channel>
    <title>${escapeXml(STORE_NAME_AR)}</title>
    <link>${escapeXml(SITE_URL)}</link>
    <description>Google Merchant Center feed — ${escapeXml(STORE_NAME_AR)} | ${escapeXml(STORE_NAME)} | ${escapeXml(SITE_URL)}</description>
    <language>ar</language>
${items}
  </channel>
</rss>`;

  return new NextResponse(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
