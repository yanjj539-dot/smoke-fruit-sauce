"use client";

import { List, ShoppingBag } from "@phosphor-icons/react";

type HeaderProps = {
  cartCount: number;
  onMenuOpen: () => void;
  onCartOpen: () => void;
};

const navItems = ["Shop", "About", "Flavors", "Reviews", "FAQ"];

export function Header({ cartCount, onMenuOpen, onCartOpen }: HeaderProps) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-40 border-b border-brown/15 bg-cream/88 backdrop-blur-xl">
      <div className="mx-auto grid h-20 max-w-[1520px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-9">
        <a
          href="#top"
          className="brand-word text-2xl font-black uppercase leading-none tracking-[-0.04em] text-brown md:text-4xl"
          aria-label="Smoke and Fruit home"
        >
          Smoke & Fruit
        </a>
        <nav
          className="hidden items-center justify-center gap-10 text-[0.68rem] font-black uppercase tracking-[0.16em] md:flex"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <a key={item} className="nav-link" href={`#${item.toLowerCase()}`}>
              {item}
            </a>
          ))}
        </nav>
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={onCartOpen}
            className="cart-button hidden items-center gap-3 text-[0.72rem] font-black uppercase tracking-[0.14em] text-brown md:flex"
            aria-label={`Open cart with ${cartCount} items`}
          >
            <span>Cart ({cartCount})</span>
            <ShoppingBag className="h-5 w-5" weight="bold" />
          </button>
          <button
            onClick={onMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center border border-brown/25 text-brown md:hidden"
            aria-label="Open menu"
          >
            <List className="h-6 w-6" weight="bold" />
          </button>
        </div>
      </div>
    </header>
  );
}
