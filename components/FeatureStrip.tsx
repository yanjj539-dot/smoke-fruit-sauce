"use client";

import {
  CookingPot,
  Fire,
  Leaf,
  SealCheck,
  Sparkle,
  DropHalf,
} from "@phosphor-icons/react";

const features = [
  { label: "No corn syrup", icon: DropHalf, copy: "Clean sweetness only." },
  { label: "No seed oils", icon: Leaf, copy: "Bright texture, no shortcuts." },
  { label: "No additives", icon: SealCheck, copy: "Nothing hiding in the label." },
  { label: "Small batch", icon: CookingPot, copy: "Made in micro runs." },
  { label: "Real ingredients", icon: Sparkle, copy: "Fruit, spice, smoke." },
  { label: "Bold flavor", icon: Fire, copy: "Heat with a point of view." },
];

export function FeatureStrip() {
  return (
    <section className="reveal border-y border-brown/15 bg-cream px-5 py-10 md:px-9">
      <div className="mx-auto grid max-w-[1520px] grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
        {features.map(({ label, icon: Icon, copy }) => (
          <div
            key={label}
            className="feature-item flex min-h-32 flex-col items-center justify-center border-brown/18 px-4 text-center md:border-r last:border-r-0"
          >
            <Icon className="mb-4 h-9 w-9 text-tomato" weight="duotone" />
            <h3 className="text-xs font-black uppercase tracking-[0.12em]">
              {label}
            </h3>
            <p className="mt-2 max-w-[12rem] text-xs leading-5 text-brown/62">
              {copy}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
