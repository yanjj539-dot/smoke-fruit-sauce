"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { Minus, Plus, ShoppingBag, Trash, X } from "@phosphor-icons/react";
import gsap from "gsap";
import { AnimatedButton } from "@/components/AnimatedButton";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { CartItem } from "@/lib/types";

type CartDrawerProps = {
  open: boolean;
  items: CartItem[];
  onClose: () => void;
  onIncrement: (id: string) => void;
  onDecrement: (id: string) => void;
  onRemove: (id: string) => void;
};

export function CartDrawer({
  open,
  items,
  onClose,
  onIncrement,
  onDecrement,
  onRemove,
}: CartDrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return;

    const animatedContent = panel.querySelectorAll<HTMLElement>(".cart-animate");
    gsap.killTweensOf(animatedContent);

    if (prefersReducedMotion || !open) {
      gsap.set(animatedContent, { autoAlpha: 1, x: 0 });
      return;
    }

    gsap.fromTo(
      animatedContent,
      { x: 24, autoAlpha: 0 },
      { x: 0, autoAlpha: 1, duration: 0.28, stagger: 0.035, ease: "power3.out" },
    );
  }, [open, items.length, prefersReducedMotion]);

  return (
    <div
      className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        className={`absolute inset-0 bg-brown/45 transition-opacity duration-300 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Close cart overlay"
      />
      <aside
        ref={panelRef}
        className="absolute right-0 top-0 flex h-full w-full max-w-[30rem] flex-col bg-cream text-brown shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.19,1,0.22,1)]"
        style={{ transform: open ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)" }}
        role="dialog"
        aria-modal="true"
        aria-label="Shopping cart"
      >
        <div className="cart-animate flex items-center justify-between border-b border-brown/15 p-6">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
              Your cart
            </p>
            <h2 className="brand-word mt-1 text-4xl font-black uppercase tracking-[-0.05em]">
              Sauce haul
            </h2>
          </div>
          <button
            className="flex h-11 w-11 items-center justify-center border border-brown/25"
            onClick={onClose}
            aria-label="Close cart"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>
        {items.length === 0 ? (
          <div className="cart-animate flex flex-1 flex-col items-center justify-center px-8 text-center">
            <div className="mb-8 flex h-32 w-32 items-center justify-center rounded-full border border-brown/15 bg-brown text-cream">
              <ShoppingBag className="h-14 w-14" weight="thin" />
            </div>
            <h3 className="brand-word text-5xl font-black uppercase leading-none tracking-[-0.06em]">
              Your bottle is empty.
            </h3>
            <p className="mt-5 max-w-xs text-sm leading-6 text-brown/68">
              Add a small batch sauce and we will keep the flavor count honest.
            </p>
            <AnimatedButton className="mt-8" onClick={onClose}>
              Continue shopping
            </AnimatedButton>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-auto px-6 py-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cart-animate grid grid-cols-[5rem_1fr] gap-4 border-b border-brown/12 py-5"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-warm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="80px"
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="text-sm font-black uppercase leading-tight">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-xs text-brown/60">
                          ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => onRemove(item.id)}
                        className="text-brown/50 transition hover:text-tomato"
                        aria-label={`Remove ${item.name}`}
                      >
                        <Trash className="h-4 w-4" weight="bold" />
                      </button>
                    </div>
                    <div className="mt-5 flex items-center justify-between">
                      <div className="flex items-center border border-brown/18">
                        <button
                          className="flex h-9 w-9 items-center justify-center"
                          onClick={() => onDecrement(item.id)}
                          aria-label={`Decrease ${item.name} quantity`}
                        >
                          <Minus className="h-3.5 w-3.5" weight="bold" />
                        </button>
                        <span className="w-8 text-center text-xs font-black">
                          {item.quantity}
                        </span>
                        <button
                          className="flex h-9 w-9 items-center justify-center"
                          onClick={() => onIncrement(item.id)}
                          aria-label={`Increase ${item.name} quantity`}
                        >
                          <Plus className="h-3.5 w-3.5" weight="bold" />
                        </button>
                      </div>
                      <p className="text-sm font-black">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-animate border-t border-brown/15 p-6">
              <div className="flex items-center justify-between text-sm font-black uppercase tracking-[0.12em]">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <p className="mt-3 text-xs leading-5 text-brown/60">
                Taxes and shipping are mocked for this concept. Checkout stays
                local.
              </p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <AnimatedButton
                  variant="outline"
                  className="border-brown/35 text-brown hover:bg-brown hover:text-cream"
                  onClick={onClose}
                >
                  Continue shopping
                </AnimatedButton>
                <AnimatedButton>Proceed to checkout</AnimatedButton>
              </div>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
