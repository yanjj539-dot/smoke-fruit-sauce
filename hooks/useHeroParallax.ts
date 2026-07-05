"use client";

import { useEffect } from "react";
import type { RefObject } from "react";
import gsap from "gsap";

type HeroParallaxOptions = {
  active: boolean;
  refreshKey: string | number;
};

export function useHeroParallax(
  rootRef: RefObject<HTMLElement | null>,
  { active, refreshKey }: HeroParallaxOptions,
) {
  useEffect(() => {
    const root = rootRef.current;
    if (!active || !root) return;

    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine) and (min-width: 1024px)",
    );
    if (!finePointer.matches) return;

    const ingredients = Array.from(root.querySelectorAll<HTMLElement>(".hero-ingredient"));
    const movers = ingredients.map((element) => ({
      element,
      depth: Number(element.dataset.depth || 1),
      x: gsap.quickTo(element, "x", { duration: 0.75, ease: "power3.out" }),
      y: gsap.quickTo(element, "y", { duration: 0.75, ease: "power3.out" }),
    }));

    const handleMove = (event: MouseEvent) => {
      const bounds = root.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;

      movers.forEach((mover) => {
        mover.x(x * mover.depth * 24);
        mover.y(y * mover.depth * 18);
      });
    };

    const handleLeave = () => {
      movers.forEach((mover) => {
        mover.x(0);
        mover.y(0);
      });
    };

    root.addEventListener("mousemove", handleMove);
    root.addEventListener("mouseleave", handleLeave);

    return () => {
      root.removeEventListener("mousemove", handleMove);
      root.removeEventListener("mouseleave", handleLeave);
    };
  }, [active, refreshKey, rootRef]);
}
