"use client";

import { FacebookLogo, InstagramLogo, TiktokLogo } from "@phosphor-icons/react";

export function Footer() {
  return (
    <footer id="faq" className="reveal bg-cream px-5 py-10 text-brown md:px-9">
      <div className="mx-auto grid max-w-[1520px] gap-8 border-t border-brown/15 pt-8 md:grid-cols-[1fr_1fr_1fr]">
        <div className="footer-group">
          <p className="brand-word text-4xl font-black uppercase tracking-[-0.05em]">
            Smoke & Fruit
          </p>
          <p className="mt-4 text-xs text-brown/55">
            © 2026 Smoke & Fruit. Original ecommerce concept.
          </p>
        </div>
        <nav className="footer-group grid grid-cols-2 gap-2 text-xs font-black uppercase tracking-[0.12em] sm:grid-cols-3">
          {["Shop", "About", "Flavors", "Reviews", "FAQ", "Contact"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-tomato">
              {item}
            </a>
          ))}
        </nav>
        <div className="footer-group flex flex-col items-start gap-5 md:items-end">
          <div className="flex gap-4">
            <a href="#" aria-label="Instagram" className="hover:text-tomato">
              <InstagramLogo className="h-5 w-5" weight="bold" />
            </a>
            <a href="#" aria-label="Facebook" className="hover:text-tomato">
              <FacebookLogo className="h-5 w-5" weight="bold" />
            </a>
            <a href="#" aria-label="TikTok" className="hover:text-tomato">
              <TiktokLogo className="h-5 w-5" weight="bold" />
            </a>
          </div>
          <p className="text-xs font-medium text-brown/55">Website concept by Yan</p>
        </div>
      </div>
    </footer>
  );
}
