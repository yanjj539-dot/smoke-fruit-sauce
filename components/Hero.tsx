"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { AnimatedButton } from "@/components/AnimatedButton";
import { IngredientFloat } from "@/components/IngredientFloat";
import { ProductCarousel } from "@/components/ProductCarousel";
import { useHeroParallax } from "@/hooks/useHeroParallax";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { IngredientAsset, Product } from "@/lib/types";

gsap.registerPlugin(useGSAP);

type HeroProps = {
  products: Product[];
  ingredients: IngredientAsset[];
  currentProductIndex: number;
  onProductIndexChange: (index: number) => void;
  onShopNow: () => void;
};

export function Hero({
  products,
  ingredients,
  currentProductIndex,
  onProductIndexChange,
  onShopNow,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const previousProductIndexRef = useRef(currentProductIndex);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [isAnimatingProduct, setIsAnimatingProduct] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const currentProduct = products[currentProductIndex];

  const byId = new Map(ingredients.map((ingredient) => [ingredient.id, ingredient]));
  const heroIngredients = [
    ...(currentProduct.ingredients.map((id) => byId.get(id)).filter(Boolean) as IngredientAsset[]),
    byId.get("cherry"),
    byId.get("onion"),
  ].filter(Boolean) as IngredientAsset[];

  useHeroParallax(heroRef, {
    active: !prefersReducedMotion,
    refreshKey: currentProduct.id,
  });

  const requestProductIndex = (nextIndex: number, nextDirection: 1 | -1) => {
    if (nextIndex === currentProductIndex || isAnimatingProduct) return;

    setDirection(nextDirection);
    onProductIndexChange(nextIndex);

    if (prefersReducedMotion) {
      return;
    }

    setIsAnimatingProduct(true);
    window.setTimeout(() => setIsAnimatingProduct(false), 520);
  };

  const next = () =>
    requestProductIndex((currentProductIndex + 1) % products.length, 1);
  const prev = () =>
    requestProductIndex((currentProductIndex - 1 + products.length) % products.length, -1);

  useGSAP(
    () => {
      if (!heroRef.current) return;
      if (prefersReducedMotion) return;

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from(".hero-kicker", { y: 18, duration: 0.55 })
        .from(".hero-line", { yPercent: 18, duration: 0.72, stagger: 0.08 }, "-=0.2")
        .from(".hero-copy", { y: 20, duration: 0.5 }, "-=0.35")
        .from(".hero-cta", { y: 14, duration: 0.45, stagger: 0.08 }, "-=0.2")
        .from(".hero-bottle-stage", { y: 28, scale: 0.98, duration: 0.75 }, "-=0.55")
        .from(".hero-ingredient", { y: 16, rotate: -5, duration: 0.55, stagger: 0.06 }, "-=0.42");

      gsap.to(".hero-ingredient", {
        y: "random(-14, 16)",
        rotate: "random(-4, 5)",
        duration: "random(3.2, 5.2)",
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        stagger: 0.15,
      });
    },
    { scope: heroRef, dependencies: [prefersReducedMotion] },
  );

  useEffect(() => {
    if (previousProductIndexRef.current === currentProductIndex) {
      return;
    }
    previousProductIndexRef.current = currentProductIndex;

    if (prefersReducedMotion) {
      return;
    }

    const ctx = gsap.context(() => {
      const stage = heroRef.current?.querySelector<HTMLElement>(".hero-bottle-stage") ?? null;
      const ingredientEls = heroRef.current
        ? Array.from(heroRef.current.querySelectorAll<HTMLElement>(".hero-ingredient"))
        : [];
      const animatedTargets = stage ? [stage, ...ingredientEls] : ingredientEls;
      gsap.killTweensOf(animatedTargets);

      gsap
        .timeline({
          defaults: { ease: "power3.out" },
          onComplete: () => {
            if (stage) gsap.set(stage, { y: 0, x: 0, scale: 1 });
            if (ingredientEls.length > 0) {
              gsap.set(ingredientEls, { x: 0, y: 0, rotate: 0 });
              gsap.to(ingredientEls, {
                y: "random(-14, 16)",
                rotate: "random(-4, 5)",
                duration: "random(3.2, 5.2)",
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                stagger: 0.15,
              });
            }
            setIsAnimatingProduct(false);
          },
        })
        .fromTo(
          ".hero-bottle-stage",
          { y: direction === 1 ? -30 : 30, scale: 0.97 },
          { y: 0, scale: 1, duration: 0.42 },
        )
        .fromTo(
          ".hero-ingredient",
          { y: direction === 1 ? -12 : 12, rotate: direction === 1 ? -5 : 5 },
          { y: 0, rotate: 0, duration: 0.36, stagger: 0.045 },
          "<0.08",
        );
    }, heroRef);

    return () => ctx.revert();
  }, [currentProductIndex, direction, prefersReducedMotion]);

  return (
    <section
      ref={heroRef}
      id="top"
      className="hero-section relative overflow-hidden pt-20 text-brown"
    >
      <div className="grid min-h-[calc(100vh-5rem)] grid-cols-1 lg:grid-cols-[44%_1fr]">
        <div className="relative flex min-h-[44rem] flex-col justify-center overflow-hidden bg-brown px-5 py-16 text-cream md:px-10 lg:min-h-[50rem]">
          <div className="grain absolute inset-0 opacity-45" />
          <div className="relative z-10">
            <div className="hero-kicker mb-7 grid grid-cols-[3rem_1fr] gap-6 border-b border-cream/25 pb-5 text-xs font-black uppercase tracking-[0.14em]">
              <span className="text-3xl text-tomato">01</span>
              <span>
                Small batch sauces
                <br />
                made bolder
              </span>
            </div>
            <h1 className="brand-word max-w-[12ch] text-[clamp(4rem,7.3vw,7.4rem)] font-black uppercase leading-[0.84] tracking-[-0.045em]">
              {["Flavor", "that", "refuses", "to", "behave."].map((line) => (
                <span key={line} className="block overflow-hidden">
                  <span className="hero-line block">{line}</span>
                </span>
              ))}
            </h1>
            <div className="mt-8 h-1 w-44 bg-tomato" />
            <p className="hero-copy mt-5 max-w-sm text-base leading-7 text-cream/80">
              We bottle smoke, fire, and fruit in sauces that play by their own
              rules.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <AnimatedButton className="hero-cta" onClick={onShopNow}>
                Shop sauces
              </AnimatedButton>
              <AnimatedButton
                className="hero-cta border-cream/35 text-cream hover:bg-cream hover:text-brown"
                variant="outline"
                onClick={() => document.querySelector("#flavors")?.scrollIntoView({ behavior: "smooth" })}
              >
                Explore flavors
              </AnimatedButton>
            </div>
            <div className="mt-10 flex gap-8 text-sm font-black uppercase tracking-[0.18em]">
              {products.map((product, index) => (
                <button
                  key={product.id}
                  onClick={() =>
                    requestProductIndex(index, index > currentProductIndex ? 1 : -1)
                  }
                  disabled={isAnimatingProduct}
                  className={index === currentProductIndex ? "text-tomato" : "text-cream/45"}
                  aria-label={`Show ${product.name}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="relative isolate min-h-[44rem] overflow-hidden bg-cream px-5 py-10 md:px-10 lg:min-h-[50rem]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(201,74,34,0.18),transparent_32%),linear-gradient(90deg,rgba(16,11,6,0.12),transparent_1px)] bg-[length:auto,80px_80px]" />
          {heroIngredients.slice(0, 5).map((ingredient, index) => {
            const positions = [
              "left-[18%] top-[9%] w-24 md:w-32",
              "right-[7%] top-[6%] w-32 md:w-44",
              "left-[18%] top-[36%] w-28 md:w-40",
              "right-[10%] top-[39%] w-24 md:w-36",
              "left-[34%] top-[18%] w-20 md:w-28",
            ];
            return (
              <IngredientFloat
                key={`${currentProduct.id}-${ingredient.id}-${index}`}
                src={ingredient.image}
                alt={ingredient.alt}
                depth={index + 1}
                className={positions[index]}
              />
            );
          })}
          <div className="absolute right-5 top-24 z-20 hidden w-40 lg:block">
            {["Pineapple", "Chili", "Garlic", "Cherry", "Onion"].map((item, index) => (
              <div key={item} className="border-t border-brown/35 py-4">
                <p className="text-xl font-black text-brown/35">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="text-xs font-black uppercase tracking-[0.12em]">
                  {item}
                </p>
                <p className="text-xs text-brown/60">
                  {index === 0 ? "Charred sweetness" : index === 1 ? "Clean heat" : index === 2 ? "Roasted depth" : index === 3 ? "Dark and tart" : "Smoky bite"}
                </p>
              </div>
            ))}
          </div>
          <ProductCarousel
            products={products}
            currentIndex={currentProductIndex}
            onNext={next}
            onPrev={prev}
            disabled={isAnimatingProduct}
          />
          <div className="absolute bottom-8 right-8 hidden text-center text-xs font-black uppercase tracking-[0.16em] lg:block">
            Scroll
            <br />
            for more
            <span className="mx-auto mt-2 block h-8 w-px bg-brown/45" />
          </div>
        </div>
      </div>
    </section>
  );
}
