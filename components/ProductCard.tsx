"use client";

import { useRef } from "react";
import { ArrowRight, Plus } from "@phosphor-icons/react";
import gsap from "gsap";
import { AnimatedButton } from "@/components/AnimatedButton";
import { ProductBottle } from "@/components/ProductBottle";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Product } from "@/lib/types";

type ProductCardProps = {
  product: Product;
  index: number;
  addingProductId: string | null;
  addedProductId: string | null;
  onAdd: (product: Product) => void;
};

export function ProductCard({
  product,
  index,
  addingProductId,
  addedProductId,
  onAdd,
}: ProductCardProps) {
  const cardRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isAdding = addingProductId === product.id;
  const isAdded = addedProductId === product.id;
  const isBusy = Boolean(addingProductId);

  const animateHover = (entering: boolean) => {
    if (prefersReducedMotion || !cardRef.current) return;

    gsap.to(cardRef.current.querySelector(".product-card-bottle"), {
      y: entering ? -14 : 0,
      scale: entering ? 1.035 : 1,
      duration: 0.42,
      ease: "power3.out",
      overwrite: "auto",
    });

    gsap.to(cardRef.current.querySelector(".product-card-dot"), {
      rotate: entering ? 180 : 0,
      scale: entering ? 1.18 : 1,
      duration: 0.38,
      ease: "power3.out",
      overwrite: "auto",
    });
  };

  return (
    <article
      ref={cardRef}
      className="product-card group relative flex min-h-[38rem] flex-col border border-brown/18 bg-cream p-4 transition duration-300 hover:border-brown/35 hover:bg-warm hover:shadow-[0_24px_60px_rgba(16,11,6,0.12)]"
      onMouseEnter={() => animateHover(true)}
      onMouseLeave={() => animateHover(false)}
    >
      <div className="flex items-start justify-between">
        <span className="text-2xl font-black text-tomato">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          className="product-card-dot h-4 w-4 rounded-full"
          style={{ backgroundColor: product.accentColor }}
        />
      </div>
      <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden">
        <div className="absolute inset-x-6 bottom-12 h-14 rounded-full bg-brown/12 blur-xl" />
        <ProductBottle
          src={product.image}
          alt={`${product.name} bottle`}
          accentColor={product.accentColor}
          className="product-card-bottle max-w-[13rem]"
        />
      </div>
      <div className="mt-5">
        <h3 className="text-lg font-black uppercase leading-tight tracking-[-0.03em]">
          {product.name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-brown/68">{product.description}</p>
        <div className="mt-5 flex items-center justify-between">
          <span className="text-sm font-black">${product.price.toFixed(2)}</span>
          <a
            href={`#${product.slug}`}
            className="group/link flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em]"
          >
            View product
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover/link:translate-x-1"
              weight="bold"
            />
          </a>
        </div>
        <AnimatedButton
          className="mt-5 w-full"
          loading={isAdding}
          disabled={isBusy}
          onClick={() => onAdd(product)}
          aria-label={`Add ${product.name} to cart`}
        >
          {isAdding ? "Adding..." : isAdded ? "Added ✓" : "Add to cart"}
        </AnimatedButton>
      </div>
      <button
        className="absolute bottom-4 right-4 hidden h-11 w-11 items-center justify-center rounded-full bg-brown text-cream transition group-hover:flex disabled:pointer-events-none disabled:opacity-50"
        disabled={isBusy}
        onClick={() => onAdd(product)}
        aria-label={`Quick add ${product.name}`}
      >
        <Plus className="h-5 w-5" weight="bold" />
      </button>
    </article>
  );
}
