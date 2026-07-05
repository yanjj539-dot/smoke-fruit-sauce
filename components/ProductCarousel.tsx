"use client";

import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { ProductBottle } from "@/components/ProductBottle";
import type { Product } from "@/lib/types";

type ProductCarouselProps = {
  products: Product[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  disabled?: boolean;
};

export function ProductCarousel({
  products,
  currentIndex,
  onNext,
  onPrev,
  disabled = false,
}: ProductCarouselProps) {
  const product = products[currentIndex];

  return (
    <div className="relative z-10 flex h-full min-h-[34rem] flex-col justify-end lg:min-h-[42rem]">
      <div className="hero-bottle-stage relative mx-auto flex w-full max-w-[33rem] justify-center">
        <div className="absolute bottom-4 h-20 w-72 rounded-full bg-brown/30 blur-2xl" />
        <ProductBottle
          key={product.id}
          src={product.image}
          alt={`${product.name} bottle`}
          accentColor={product.accentColor}
          priority
          className="max-w-[16rem] md:max-w-[20rem]"
        />
      </div>
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={onPrev}
          disabled={disabled}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/35 bg-cream/40 text-brown backdrop-blur transition hover:bg-brown hover:text-cream disabled:pointer-events-none disabled:opacity-45"
          aria-label="Previous product"
        >
          <ArrowLeft className="h-4 w-4" weight="bold" />
        </button>
        <div className="text-center">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brown/55">
            Product No. {String(currentIndex + 1).padStart(2, "0")} /{" "}
            {String(products.length).padStart(2, "0")}
          </p>
          <p className="mt-1 text-sm font-black uppercase text-brown">
            {product.name}
          </p>
        </div>
        <button
          onClick={onNext}
          disabled={disabled}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/35 bg-cream/40 text-brown backdrop-blur transition hover:bg-brown hover:text-cream disabled:pointer-events-none disabled:opacity-45"
          aria-label="Next product"
        >
          <ArrowRight className="h-4 w-4" weight="bold" />
        </button>
      </div>
    </div>
  );
}
