"use client";

import Image from "next/image";
import { useState } from "react";
import type { ReactNode } from "react";

type ImageFallbackProps = {
  src: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  sizes?: string;
  priority?: boolean;
  fallback: ReactNode;
};

export function ImageFallback({
  src,
  alt,
  className = "",
  imageClassName = "",
  sizes = "100vw",
  priority = false,
  fallback,
}: ImageFallbackProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className={`relative ${className}`}>
      {failed ? (
        fallback
      ) : (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={imageClassName}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}
