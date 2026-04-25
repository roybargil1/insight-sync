import { createContext, useContext, useState } from 'react';

const ProductContext = createContext(null);

const STORAGE_KEY = 'insightsync_selected_product';

export function ProductProvider({ children }) {
  const [selectedProductId, setSelectedProductIdState] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) || null; } catch { return null; }
  });

  const setSelectedProductId = (id) => {
    setSelectedProductIdState(id);
    try { if (id) localStorage.setItem(STORAGE_KEY, id); else localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  return (
    <ProductContext.Provider value={{ selectedProductId, setSelectedProductId }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProduct() {
  const ctx = useContext(ProductContext);
  if (!ctx) throw new Error('useProduct must be used inside ProductProvider');
  return ctx;
}