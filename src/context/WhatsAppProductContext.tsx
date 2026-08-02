"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { ProductInquiryContext } from "@/types/inquiry";

type WhatsAppProductContextValue = {
  product: ProductInquiryContext | null;
  setProduct: (product: ProductInquiryContext | null) => void;
};

const WhatsAppProductContext = createContext<WhatsAppProductContextValue>({
  product: null,
  setProduct: () => {},
});

export function WhatsAppProductProvider({ children }: { children: ReactNode }) {
  const [product, setProduct] = useState<ProductInquiryContext | null>(null);
  return (
    <WhatsAppProductContext.Provider value={{ product, setProduct }}>
      {children}
    </WhatsAppProductContext.Provider>
  );
}

export function useWhatsAppProduct() {
  return useContext(WhatsAppProductContext);
}
