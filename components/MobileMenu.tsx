"use client";

import { useEffect, useRef } from "react";
import { X } from "@phosphor-icons/react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

const navItems = ["Shop", "About", "Flavors", "Reviews", "FAQ"];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const overlayRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) return;

    const animatedContent = panel.querySelectorAll<HTMLElement>(".mobile-menu-animate");
    const closeButton = panel.querySelector<HTMLElement>(".mobile-menu-close");
    gsap.killTweensOf([overlay, panel, animatedContent, closeButton]);

    if (prefersReducedMotion) {
      gsap.set(overlay, { autoAlpha: open ? 1 : 0 });
      gsap.set(panel, {
        transform: open ? "translate3d(0, 0, 0)" : "translate3d(100%, 0, 0)",
      });
      gsap.set(animatedContent, { autoAlpha: 1, x: 0 });
      gsap.set(closeButton, { autoAlpha: 1, rotate: 0 });
      return;
    }

    if (open) {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .to(overlay, { autoAlpha: 1, duration: 0.16 })
        .fromTo(
          panel,
          { transform: "translate3d(100%, 0, 0)" },
          { transform: "translate3d(0, 0, 0)", duration: 0.22 },
          0,
        )
        .fromTo(
          closeButton,
          { autoAlpha: 0, rotate: -45 },
          { autoAlpha: 1, rotate: 0, duration: 0.24 },
          0.08,
        )
        .fromTo(
          animatedContent,
          { x: 26, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 0.28, stagger: 0.045 },
          0.1,
        );
      return;
    }

    gsap
      .timeline({ defaults: { ease: "power2.inOut" } })
      .to(overlay, { autoAlpha: 0, duration: 0.14 })
      .to(panel, { transform: "translate3d(100%, 0, 0)", duration: 0.18 }, 0);
  }, [open, prefersReducedMotion]);

  return (
    <div
      className={`fixed inset-0 z-50 md:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`}
      aria-hidden={!open}
    >
      <button
        ref={overlayRef}
        className="absolute inset-0 bg-brown/45 opacity-0"
        onClick={onClose}
        aria-label="Close mobile menu overlay"
      />
      <aside
        ref={panelRef}
        className="mobile-menu-panel absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-brown p-6 text-cream"
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="flex items-start justify-between">
          <span className="mobile-menu-animate brand-word text-3xl font-black uppercase tracking-[-0.04em]">
            Smoke & Fruit
          </span>
          <button
            className="mobile-menu-close flex h-11 w-11 items-center justify-center border border-cream/30"
            onClick={onClose}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" weight="bold" />
          </button>
        </div>
        <nav className="mt-16 grid gap-5" aria-label="Mobile navigation">
          {navItems.map((item, index) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              onClick={onClose}
              className="mobile-menu-animate border-b border-cream/18 pb-4 text-5xl font-black uppercase leading-[0.85] tracking-[-0.06em]"
            >
              <span className="mr-4 text-sm text-tomato">
                {String(index + 1).padStart(2, "0")}
              </span>
              {item}
            </a>
          ))}
        </nav>
        <p className="mobile-menu-animate mt-auto max-w-xs text-sm leading-6 text-cream/68">
          Small batch sauce, charred fruit, clean heat, and enough attitude for
          ordinary dinners.
        </p>
      </aside>
    </div>
  );
}
