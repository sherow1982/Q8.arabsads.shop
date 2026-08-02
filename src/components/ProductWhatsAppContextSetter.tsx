"use client";

import { useEffect } from "react";
import { useWhatsAppProduct } from "@/context/WhatsAppProductContext";
import type { ProductInquiryContext } from "@/types/inquiry";

type Props = {
  product: ProductInquiryContext;
};

export default function ProductWhatsAppContextSetter({ product }: Props) {
  const { setProduct } = useWhatsAppProduct();

  useEffect(() => {
    setProduct(product);
    return () => setProduct(null);
  }, [product, setProduct]);

  return null;
}
