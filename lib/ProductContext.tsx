"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface ProductContextValue {
  selectedProductId: string | null;
  setSelectedProductId: (id: string | null) => void;
}

const ProductContext = createContext<ProductContextValue | null>(null);

const STORAGE_KEY = "insightsync_selected_product";

export function ProductProvider({ children }: { children: ReactNode }) {
  const [selectedProductId, setSelectedProductIdState] = useState<string | null>(() => {
    if (typeof window === "undefined") return null;
    try {
      return localStorage.getItem(STORAGE_KEY) || null;
    } catch {
      return null;
    }
  });

  const setSelectedProductId = (id: string | null) => {
    setSelectedProductIdState(id);
    try {
      if (id) localStorage.setItem(STORAGE_KEY, id);
      else localStorage.removeItem(STORAGE_KEY);
    } catch {}
  };

  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error("useProduct must be used inside ProductProvider");
  return ctx;
}
