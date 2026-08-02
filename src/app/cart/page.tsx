import type { Metadata } from "next";
import CartPageClient from "./CartPageClient";

export const metadata: Metadata = {
  title: "سلة التسوق | GStore Q8",
  description: "راجع منتجاتك وأكمل طلبك من جي ستور كيو ايت.",
};

export default function CartPage() {
  return <CartPageClient />;
}
