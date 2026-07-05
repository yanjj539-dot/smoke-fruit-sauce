"use client";

import { ArrowRight, SpinnerGap } from "@phosphor-icons/react";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type AnimatedButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: "solid" | "outline" | "ghost";
  loading?: boolean;
  showArrow?: boolean;
};

export function AnimatedButton({
  children,
  variant = "solid",
  loading = false,
  showArrow = true,
  className = "",
  ...props
}: AnimatedButtonProps) {
  const variantClass =
    variant === "solid"
      ? "bg-brown text-cream hover:bg-cream hover:text-brown"
      : variant === "outline"
        ? "border border-brown/45 text-brown hover:bg-brown hover:text-cream"
        : "text-brown hover:text-tomato";

  return (
    <button
      className={`group inline-flex min-h-12 items-center justify-center gap-4 rounded-none px-6 py-3 text-xs font-black uppercase tracking-[0.14em] transition duration-300 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60 ${variantClass} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {loading ? (
        <SpinnerGap className="h-4 w-4 animate-spin" weight="bold" />
      ) : (
        showArrow && (
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            weight="bold"
          />
        )
      )}
    </button>
  );
}
