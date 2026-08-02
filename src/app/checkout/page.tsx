import type { Metadata } from "next";
import CheckoutPageClient from "./CheckoutPageClient";

export const metadata: Metadata = {
  title: "إتمام الطلب | GStore Q8",
  description: "أكمل طلبك وأرسله عبر واتساب بسهولة.",
};

export default function CheckoutPage() {
  return <CheckoutPageClient />;
}
