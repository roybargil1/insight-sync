"use client";

import { useState, useRef, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Products } from "@/lib/db";
import { useProduct } from "@/lib/ProductContext";
import { Package, ChevronDown, Check, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductSelector() {
  const { selectedProductId, setSelectedProductId } = useProduct();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const { data: products = [] } = useQuery({
    queryKey: ["products"],
    queryFn: () => Products.list(),
  });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = products.find((p) => p.id === selectedProductId);

  return (
    <div className="px-4 py-4 border-b border-white/10" ref={ref}>
      <p className="text-[10px] font-bold uppercase tracking-widest text-white/40 mb-2 px-0.5">
        Active Product
      </p>

      <button
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left transition-all duration-150 ${
          selected
            ? "bg-primary shadow-lg shadow-primary/30 ring-2 ring-primary/60 hover:bg-primary/90"
            : "bg-white/10 border border-dashed border-white/25 hover:bg-white/15"
        }`}
      >
        <div
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${
            selected ? "bg-white/20" : "bg-white/10"
          }`}
        >
          <Package className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          {selected ? (
            <>
              <p className="text-white font-semibold text-sm leading-tight truncate">
                {selected.name}
              </p>
              {!!selected.company && (
                <p className="text-white/70 text-xs truncate">{selected.company}</p>
              )}
            </>
          ) : (
            <p className="text-white/50 text-sm font-medium">Select a product…</p>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-white/70 shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="mt-2 bg-popover border border-border rounded-xl shadow-2xl overflow-hidden z-50">
          {products.length === 0 ? (
            <div className="px-4 py-5 text-center">
              <p className="text-sm text-muted-foreground mb-3">No products yet</p>
              <button
                onClick={() => {
                  setOpen(false);
                  router.push("/products");
                }}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline mx-auto"
              >
                <Plus className="w-3.5 h-3.5" /> Add your first product
              </button>
            </div>
          ) : (
            <ul className="py-1 max-h-56 overflow-y-auto">
              {products.map((p) => {
                const isActive = p.id === selectedProductId;
                return (
                  <li key={p.id}>
                    <button
                      onClick={() => {
                        setSelectedProductId(p.id);
                        setOpen(false);
                      }}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-accent ${
                        isActive ? "bg-primary/[0.08]" : ""
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-md flex items-center justify-center shrink-0 ${
                          isActive ? "bg-primary/15" : "bg-muted"
                        }`}
                      >
                        <Package
                          className={`w-3.5 h-3.5 ${isActive ? "text-primary" : "text-muted-foreground"}`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-sm font-medium truncate ${
                            isActive ? "text-primary" : "text-foreground"
                          }`}
                        >
                          {p.name}
                        </p>
                        {!!p.company && (
                          <p className="text-xs text-muted-foreground truncate">{p.company}</p>
                        )}
                      </div>
                      {isActive && <Check className="w-4 h-4 text-primary shrink-0" />}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}

          <div className="border-t border-border px-3 py-2">
            <button
              onClick={() => {
                setOpen(false);
                router.push("/products");
              }}
              className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors w-full"
            >
              <Plus className="w-3.5 h-3.5" /> Manage products
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
