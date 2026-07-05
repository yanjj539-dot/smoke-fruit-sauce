"use client";

import Image from "next/image";

type IngredientFloatProps = {
  src: string;
  alt: string;
  className?: string;
  depth?: number;
};

export function IngredientFloat({
  src,
  alt,
  className = "",
  depth = 1,
}: IngredientFloatProps) {
  return (
    <div
      className={`hero-ingredient pointer-events-none absolute will-change-transform ${className}`}
      data-depth={depth}
    >
      <div className="relative aspect-square w-full">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="180px"
          className="object-contain drop-shadow-[0_22px_30px_rgba(16,11,6,0.32)]"
        />
      </div>
    </div>
  );
}
