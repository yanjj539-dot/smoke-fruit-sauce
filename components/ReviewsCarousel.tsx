"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Star } from "@phosphor-icons/react";
import gsap from "gsap";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import type { Review } from "@/lib/types";

type ReviewsCarouselProps = {
  reviews: Review[];
  currentReviewIndex: number;
  onReviewIndexChange: (index: number) => void;
};

export function ReviewsCarousel({
  reviews,
  currentReviewIndex,
  onReviewIndexChange,
}: ReviewsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(2);
  const prefersReducedMotion = usePrefersReducedMotion();
  const visible = Array.from({ length: visibleCount }, (_, index) => {
    return reviews[(currentReviewIndex + index) % reviews.length];
  });

  const next = () => onReviewIndexChange((currentReviewIndex + 1) % reviews.length);
  const prev = () =>
    onReviewIndexChange((currentReviewIndex - 1 + reviews.length) % reviews.length);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const update = () => setVisibleCount(mediaQuery.matches ? 1 : 2);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion || !trackRef.current) return;

    const cards = trackRef.current.querySelectorAll(".review-card");
    gsap.fromTo(
      cards,
      { x: 22, autoAlpha: 0 },
      {
        x: 0,
        autoAlpha: 1,
        duration: 0.48,
        stagger: 0.07,
        ease: "power3.out",
        overwrite: "auto",
      },
    );
  }, [currentReviewIndex, visibleCount, prefersReducedMotion]);

  return (
    <section id="reviews" className="reveal bg-cream px-5 py-16 text-brown md:px-9 md:py-24">
      <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-[0.34fr_1fr]">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
            Reviews
          </p>
          <h2 className="brand-word mt-3 text-6xl font-black uppercase leading-[0.9] tracking-[-0.065em] md:text-7xl">
            What people are saying
          </h2>
          <div className="mt-8 flex gap-3">
            <button
              onClick={prev}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/30 transition hover:bg-brown hover:text-cream"
              aria-label="Previous reviews"
            >
              <ArrowLeft className="h-4 w-4" weight="bold" />
            </button>
            <button
              onClick={next}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-brown/30 transition hover:bg-brown hover:text-cream"
              aria-label="Next reviews"
            >
              <ArrowRight className="h-4 w-4" weight="bold" />
            </button>
          </div>
        </div>
        <div ref={trackRef} className="grid gap-5 md:grid-cols-2">
          {visible.map((review) => (
            <article
              key={review.id}
              className="review-card border border-brown/12 bg-warm p-6 md:p-8"
            >
              <div className="flex gap-1 text-pineapple" aria-label="Five star review">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-4 w-4" weight="fill" />
                ))}
              </div>
              <blockquote className="mt-5 text-xl font-medium leading-8 tracking-[-0.02em]">
                “{review.quote}”
              </blockquote>
              <p className="mt-8 text-sm font-black uppercase tracking-[0.14em]">
                {review.name}
              </p>
              <p className="mt-1 text-xs text-brown/56">Verified buyer</p>
            </article>
          ))}
          <div className="flex gap-2 md:col-span-2" aria-label="Review position">
            {reviews.map((review, index) => (
              <button
                key={review.id}
                onClick={() => onReviewIndexChange(index)}
                className={`h-2.5 rounded-full transition-all ${
                  index === currentReviewIndex
                    ? "w-9 bg-tomato"
                    : "w-2.5 bg-brown/24 hover:bg-brown/45"
                }`}
                aria-label={`Show review ${index + 1}`}
                aria-current={index === currentReviewIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
