"use client";

import { ProductCard } from "@/components/ProductCard";
import type { Product } from "@/lib/types";

type ProductGridProps = {
  products: Product[];
  addingProductId: string | null;
  addedProductId: string | null;
  onAdd: (product: Product) => void;
};

export function ProductGrid({
  products,
  addingProductId,
  addedProductId,
  onAdd,
}: ProductGridProps) {
  return (
    <section id="shop" className="reveal bg-cream px-5 py-16 md:px-9 md:py-24">
      <div className="mx-auto max-w-[1520px]">
        <div className="mb-9 flex flex-col gap-5 border-t border-brown/18 pt-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
              Shop the lineup
            </p>
            <h2 className="brand-word mt-2 text-5xl font-black uppercase leading-none tracking-[-0.06em] md:text-7xl">
              Choose your weapon
            </h2>
          </div>
          <a
            href="#bundles"
            className="flex items-center gap-4 text-xs font-black uppercase tracking-[0.14em]"
          >
            Bundle & save <span className="h-px w-16 bg-brown" />
          </a>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              addingProductId={addingProductId}
              addedProductId={addedProductId}
              onAdd={onAdd}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
