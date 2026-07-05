"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

gsap.registerPlugin(ScrollTrigger);

export function BrandStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || !sectionRef.current || !imageRef.current) return;

    const tween = gsap.fromTo(
      imageRef.current,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.7,
        },
      },
    );

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [prefersReducedMotion]);

  return (
    <section ref={sectionRef} id="about" className="reveal overflow-hidden bg-brown text-cream">
      <div className="mx-auto grid max-w-[1520px] gap-10 px-5 py-20 md:px-9 lg:grid-cols-[0.9fr_1.1fr] lg:py-28">
        <div className="max-w-xl">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
            Why Smoke & Fruit
          </p>
          <h2 className="brand-word mt-4 text-6xl font-black uppercase leading-[0.88] tracking-[-0.065em] md:text-8xl">
            Built slow. Hits fast.
          </h2>
          <p className="mt-8 text-lg leading-8 text-cream/78">
            We make sauces in small batches with fruit, chiles, smoke, and
            enough restraint to let real ingredients speak. No corn syrup. No
            seed oils. No cheap filler dressed up as flavor.
          </p>
          <div className="mt-10 grid gap-5 border-t border-cream/18 pt-7 sm:grid-cols-3">
            {["Real fruit", "Charred heat", "Bottle-by-bottle"].map((item, index) => (
              <div key={item}>
                <p className="text-3xl font-black text-tomato">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-2 text-xs font-black uppercase tracking-[0.14em]">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </div>
        <div
          ref={imageRef}
          className="story-image relative min-h-[28rem] overflow-hidden border border-cream/14"
        >
          <Image
            src="/images/story/small-batch-table.webp"
            alt="Small batch sauce bottle with fresh ingredients on a cream table"
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 55vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brown/55 via-transparent to-transparent" />
          <p className="absolute bottom-5 left-5 max-w-xs text-xs font-black uppercase tracking-[0.14em] text-cream">
            Fresh pineapple, smoked chile, garlic, cherry, and a darker kind of
            dinner logic.
          </p>
        </div>
      </div>
    </section>
  );
}
