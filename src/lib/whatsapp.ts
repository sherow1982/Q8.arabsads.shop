import { SITE_URL, WHATSAPP_URL } from "./constants";
import type { CartItem, CustomerInfo } from "@/types/cart";
import type { InquiryInfo, ProductInquiryContext } from "@/types/inquiry";
import { formatCartItemPrice, getCartItemPath, getCartTotal, getItemLineTotal } from "@/types/cart";
import { formatKuwaitAddress } from "./kuwait-locations";
import { formatKuwaitPhoneDisplay } from "./phone";

function getSiteOrigin(): string {
  if (typeof window !== "undefined") return window.location.origin;
  return SITE_URL;
}

export function buildOrderMessage(items: CartItem[], customer: CustomerInfo): string {
  const origin = getSiteOrigin();
  const fullAddress = formatKuwaitAddress(customer);

  const lines: string[] = [
    "مرحباً، أريد إتمام طلب جديد 🛒",
    "",
    "📋 *بيانات العميل:*",
    `• الاسم: ${customer.name}`,
    `• الهاتف: ${formatKuwaitPhoneDisplay(customer.phone)}`,
  ];

  if (customer.email.trim()) lines.push(`• البريد: ${customer.email}`);
  lines.push(`• العنوان: ${fullAddress}`);
  if (customer.notes.trim()) lines.push(`• ملاحظات: ${customer.notes}`);

  lines.push("", "🛍️ *المنتجات:*");

  items.forEach((item, index) => {
    const unitPrice = formatCartItemPrice(item);
    const lineTotal = getItemLineTotal(item).toFixed(3);
    const link = `${origin}${getCartItemPath(item)}`;
    lines.push(
      `${index + 1}. ${item.title}`,
      `   الكمية: ${item.quantity} | السعر: KD ${unitPrice} | الإجمالي: KD ${lineTotal}`,
      `   🔗 ${link}`
    );
  });

  lines.push("", `💰 *المجموع الكلي: KD ${getCartTotal(items).toFixed(3)}*`);
  lines.push("", "أرجو تأكيد الطلب وموعد التوصيل. شكراً!");

  return lines.join("\n");
}

export function buildWhatsAppOrderUrl(items: CartItem[], customer: CustomerInfo): string {
  const text = buildOrderMessage(items, customer);
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export function buildWhatsAppInquiryUrl(message?: string): string {
  const text = message ?? "مرحباً، لدي استفسار بخصوص منتجاتكم.";
  return `${WHATSAPP_URL}?text=${encodeURIComponent(text)}`;
}

export function buildInquiryMessage(inquiry: InquiryInfo, product?: ProductInquiryContext): string {
  const lines: string[] = product
    ? ["مرحباً، أريد الاستفسار عن منتج 📦", ""]
    : ["مرحباً، لدي استفسار 💬", ""];

  lines.push(
    "📋 *بيانات العميل:*",
    `• الاسم: ${inquiry.name}`,
    `• الهاتف: ${formatKuwaitPhoneDisplay(inquiry.phone)}`
  );

  if (inquiry.email?.trim()) {
    lines.push(`• البريد: ${inquiry.email.trim()}`);
  }

  if (product) {
    lines.push(
      "",
      "🛍️ *المنتج:*",
      `• ${product.title}`,
      `• السعر: KD ${product.price}`,
      `• 🔗 ${product.link}`
    );
  }

  if (inquiry.notes?.trim()) {
    lines.push("", `📝 *ملاحظات:* ${inquiry.notes.trim()}`);
  }

  lines.push("", "أرجو التواصل معي. شكراً!");
  return lines.join("\n");
}

export function buildWhatsAppInquiryUrlFromForm(
  inquiry: InquiryInfo,
  product?: ProductInquiryContext
): string {
  return `${WHATSAPP_URL}?text=${encodeURIComponent(buildInquiryMessage(inquiry, product))}`;
}
