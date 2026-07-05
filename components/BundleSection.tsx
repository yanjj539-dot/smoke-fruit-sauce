"use client";

import Image from "next/image";
import { AnimatedButton } from "@/components/AnimatedButton";
import type { Bundle } from "@/lib/types";

type BundleSectionProps = {
  bundles: Bundle[];
  addingProductId: string | null;
  addedProductId: string | null;
  onAddBundle: (bundle: Bundle) => void;
};

export function BundleSection({
  bundles,
  addingProductId,
  addedProductId,
  onAddBundle,
}: BundleSectionProps) {
  const isBusy = Boolean(addingProductId);

  return (
    <section id="bundles" className="reveal bg-brown px-5 py-16 text-cream md:px-9 md:py-24">
      <div className="mx-auto grid max-w-[1520px] gap-8 lg:grid-cols-[0.42fr_1fr]">
        <div className="flex flex-col justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
              Bundle & save
            </p>
            <h2 className="brand-word mt-4 text-6xl font-black uppercase leading-[0.9] tracking-[-0.065em] md:text-8xl">
              More flavor.
              <br />
              Better together.
            </h2>
            <p className="mt-7 max-w-sm text-base leading-7 text-cream/72">
              Curated sets for every kind of heat seeker, host, and fridge-door
              strategist.
            </p>
          </div>
          <AnimatedButton
            className="mt-9 w-fit border-cream/35 text-cream hover:bg-cream hover:text-brown"
            variant="outline"
          >
            Shop bundles
          </AnimatedButton>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {bundles.map((bundle) => {
            const isAdding = addingProductId === bundle.id;
            const isAdded = addedProductId === bundle.id;
            return (
              <article
                key={bundle.id}
                className="bundle-card group border border-cream/18 bg-cream/[0.04] p-4 transition duration-300 hover:bg-cream/[0.08]"
              >
                <div className="relative aspect-[1.55] overflow-hidden bg-[#23160f]">
                  <Image
                    src={bundle.image}
                    alt={`${bundle.name} sauce bundle`}
                    fill
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 520px"
                    className="object-cover transition duration-500 group-hover:scale-[1.035]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-5">
                  <div>
                    <h3 className="text-2xl font-black uppercase tracking-[-0.04em]">
                      {bundle.name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-cream/68">
                      {bundle.description}
                    </p>
                    <p className="mt-4 text-sm font-black">
                      ${bundle.price.toFixed(2)}{" "}
                      {bundle.compareAt && (
                        <span className="ml-2 text-tomato">
                          Save ${(bundle.compareAt - bundle.price).toFixed(0)}
                        </span>
                      )}
                    </p>
                  </div>
                </div>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <AnimatedButton
                    loading={isAdding}
                    disabled={isBusy}
                    onClick={() => onAddBundle(bundle)}
                    className="bg-cream text-brown hover:bg-tomato hover:text-cream"
                  >
                    {isAdding ? "Adding..." : isAdded ? "Added ✓" : "Add to cart"}
                  </AnimatedButton>
                  <AnimatedButton
                    variant="outline"
                    disabled={isBusy}
                    className="border-cream/35 text-cream hover:bg-cream hover:text-brown"
                    onClick={() => onAddBundle(bundle)}
                  >
                    Buy now
                  </AnimatedButton>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
