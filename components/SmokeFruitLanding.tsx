"use client";

import { useEffect, useMemo, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { BrandStory } from "@/components/BrandStory";
import { BundleSection } from "@/components/BundleSection";
import { CartDrawer } from "@/components/CartDrawer";
import { FeatureStrip } from "@/components/FeatureStrip";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { MobileMenu } from "@/components/MobileMenu";
import { Newsletter } from "@/components/Newsletter";
import { ProductGrid } from "@/components/ProductGrid";
import { ReviewsCarousel } from "@/components/ReviewsCarousel";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useGsapReveal } from "@/hooks/useGsapReveal";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { bundles, ingredients, products, reviews } from "@/lib/data";
import type { Bundle, CartItem, Product } from "@/lib/types";

gsap.registerPlugin(useGSAP);

type NewsletterStatus = "idle" | "subscribing" | "success" | "error";

export function SmokeFruitLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [addingProductId, setAddingProductId] = useState<string | null>(null);
  const [addedProductId, setAddedProductId] = useState<string | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<NewsletterStatus>("idle");
  const [newsletterMessage, setNewsletterMessage] = useState("No spam. Just the good stuff.");
  const prefersReducedMotion = usePrefersReducedMotion();

  const cartCount = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems],
  );

  useLockBodyScroll(mobileMenuOpen || cartOpen);
  useEscapeKey(mobileMenuOpen, () => setMobileMenuOpen(false));
  useEscapeKey(cartOpen, () => setCartOpen(false));
  useGsapReveal(!prefersReducedMotion);

  useEffect(() => {
    if (cartCount === 0) return;
    if (prefersReducedMotion) return;
    gsap.fromTo(
      ".cart-button",
      { scale: 1 },
      { scale: 1.08, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.out" },
    );
  }, [cartCount, prefersReducedMotion]);

  useGSAP(() => {
    if (prefersReducedMotion) return;

    gsap.from(".site-header", {
      y: -18,
      duration: 0.65,
      ease: "power3.out",
    });
  }, [prefersReducedMotion]);

  const addLineItem = (item: CartItem) => {
    setCartItems((current) => {
      const existing = current.find((cartItem) => cartItem.id === item.id);
      if (existing) {
        return current.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem,
        );
      }
      return [...current, item];
    });
  };

  const runAddFeedback = (id: string, callback: () => void) => {
    if (addingProductId) return;
    setAddingProductId(id);
    setAddedProductId(null);
    window.setTimeout(() => {
      callback();
      setAddingProductId(null);
      setAddedProductId(id);
      setCartOpen(true);
      window.setTimeout(() => setAddedProductId(null), 1200);
    }, 800);
  };

  const handleAddProduct = (product: Product) => {
    runAddFeedback(product.id, () => {
      addLineItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
      });
    });
  };

  const handleAddBundle = (bundle: Bundle) => {
    runAddFeedback(bundle.id, () => {
      addLineItem({
        id: bundle.id,
        name: bundle.name,
        price: bundle.price,
        image: bundle.image,
        quantity: 1,
      });
    });
  };

  const incrementCartItem = (id: string) => {
    setCartItems((current) =>
      current.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decrementCartItem = (id: string) => {
    setCartItems((current) =>
      current
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity - 1) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeCartItem = (id: string) => {
    setCartItems((current) => current.filter((item) => item.id !== id));
  };

  const handleNewsletterSubmit = () => {
    const email = newsletterEmail.trim();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    if (!email) {
      setNewsletterStatus("error");
      setNewsletterMessage("Enter an email before we bottle the news.");
      return;
    }

    if (!isValidEmail) {
      setNewsletterStatus("error");
      setNewsletterMessage("That email needs a little more structure.");
      return;
    }

    setNewsletterStatus("subscribing");
    setNewsletterMessage("Subscribing...");

    window.setTimeout(() => {
      setNewsletterStatus("success");
      setNewsletterMessage("You are in. First flavor drop goes to this inbox.");
      setNewsletterEmail("");
    }, 750);
  };

  const handleNewsletterEmailChange = (value: string) => {
    setNewsletterEmail(value);
    if (newsletterStatus === "error" || newsletterStatus === "success") {
      setNewsletterStatus("idle");
      setNewsletterMessage("No spam. Just the good stuff.");
    }
  };

  return (
    <main className="min-h-screen bg-cream text-brown selection:bg-tomato selection:text-cream">
      <Header
        cartCount={cartCount}
        onMenuOpen={() => setMobileMenuOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />
      <MobileMenu open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <CartDrawer
        open={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onIncrement={incrementCartItem}
        onDecrement={decrementCartItem}
        onRemove={removeCartItem}
      />
      <Hero
        products={products}
        ingredients={ingredients}
        currentProductIndex={currentProductIndex}
        onProductIndexChange={setCurrentProductIndex}
        onShopNow={() => document.querySelector("#shop")?.scrollIntoView({ behavior: "smooth" })}
      />
      <FeatureStrip />
      <ProductGrid
        products={products}
        addingProductId={addingProductId}
        addedProductId={addedProductId}
        onAdd={handleAddProduct}
      />
      <BrandStory />
      <BundleSection
        bundles={bundles}
        addingProductId={addingProductId}
        addedProductId={addedProductId}
        onAddBundle={handleAddBundle}
      />
      <ReviewsCarousel
        reviews={reviews}
        currentReviewIndex={currentReviewIndex}
        onReviewIndexChange={setCurrentReviewIndex}
      />
      <Newsletter
        newsletterEmail={newsletterEmail}
        newsletterStatus={newsletterStatus}
        newsletterMessage={newsletterMessage}
        onEmailChange={handleNewsletterEmailChange}
        onSubmit={handleNewsletterSubmit}
      />
      <Footer />
    </main>
  );
}
