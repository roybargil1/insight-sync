"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClientInstance } from "./query-client";
import { ProductProvider } from "./ProductContext";
import { AuthProvider } from "./AuthContext";
import { Toaster } from "sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClientInstance}>
      <AuthProvider>
        <ProductProvider>
          {children}
          <Toaster position="top-right" richColors />
        </ProductProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
