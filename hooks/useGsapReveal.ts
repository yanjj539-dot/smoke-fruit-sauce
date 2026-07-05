"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function useGsapReveal(active = true) {
  useEffect(() => {
    if (!active) return;

    const triggers: ScrollTrigger[] = [];
    const sections = gsap.utils.toArray<HTMLElement>(".reveal");

    sections.forEach((section) => {
      const targets = section.querySelectorAll<HTMLElement>(
        "h2, p, article, .feature-item, .story-image, .bundle-card, .footer-group",
      );
      if (targets.length === 0) return;

      const trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 82%",
        once: true,
        onEnter: () => {
          gsap.fromTo(
            targets,
            { y: 32 },
            {
              y: 0,
              duration: 0.75,
              stagger: 0.075,
              ease: "power3.out",
              overwrite: "auto",
            },
          );
        },
      });

      triggers.push(trigger);
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [active]);
}
