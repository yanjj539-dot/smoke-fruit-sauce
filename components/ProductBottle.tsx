"use client";

import { ImageFallback } from "@/components/ImageFallback";

type ProductBottleProps = {
  src: string;
  alt: string;
  accentColor: string;
  priority?: boolean;
  className?: string;
};

export function ProductBottle({
  src,
  alt,
  accentColor,
  priority = false,
  className = "",
}: ProductBottleProps) {
  return (
    <ImageFallback
      src={src}
      alt={alt}
      priority={priority}
      sizes="(max-width: 768px) 72vw, 390px"
      className={`product-bottle relative mx-auto aspect-[1/2.05] w-full max-w-[18rem] ${className}`}
      imageClassName="object-contain drop-shadow-[0_32px_42px_rgba(16,11,6,0.34)]"
      fallback={
        <div className="fallback-bottle mx-auto h-full w-[54%] rounded-[40%_40%_20%_20%] bg-[#2b160c] shadow-2xl">
          <div className="mx-auto h-[16%] w-[48%] rounded-t-2xl bg-[#15100b]" />
          <div
            className="mx-auto mt-[28%] flex h-[34%] w-[82%] flex-col items-center justify-center border border-cream/45 text-center text-cream"
            style={{ backgroundColor: accentColor }}
          >
            <span className="text-[0.6rem] font-black uppercase tracking-[0.18em]">
              Smoke
            </span>
            <span className="text-[1.3rem] font-black uppercase leading-none">
              Fruit
            </span>
          </div>
        </div>
      }
    />
  );
}
