"use client";

import Image from "next/image";
import { AnimatedButton } from "@/components/AnimatedButton";

type NewsletterProps = {
  newsletterEmail: string;
  newsletterStatus: "idle" | "subscribing" | "success" | "error";
  newsletterMessage: string;
  onEmailChange: (value: string) => void;
  onSubmit: () => void;
};

export function Newsletter({
  newsletterEmail,
  newsletterStatus,
  newsletterMessage,
  onEmailChange,
  onSubmit,
}: NewsletterProps) {
  const isSubscribing = newsletterStatus === "subscribing";
  const isError = newsletterStatus === "error";
  const isSuccess = newsletterStatus === "success";

  return (
    <section className="reveal relative overflow-hidden bg-brown px-5 py-16 text-cream md:px-9 md:py-20">
      <div className="absolute bottom-0 left-0 h-full w-72 opacity-35">
        <Image
          src="/images/story/small-batch-table.webp"
          alt=""
          fill
          loading="eager"
          sizes="288px"
          className="object-cover object-left"
        />
      </div>
      <div className="absolute inset-y-0 left-0 w-80 bg-gradient-to-r from-brown/20 to-brown" />
      <div className="mx-auto grid max-w-[1520px] gap-10 lg:grid-cols-[1fr_0.9fr]">
        <div className="relative z-10">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-tomato">
            Stay in the loop
          </p>
          <h2 className="brand-word mt-3 text-5xl font-black uppercase leading-[0.9] tracking-[-0.06em] md:text-7xl">
            New flavors.
            <br />
            First dibs.
            <br />
            Exclusive offers.
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-cream/70">
            Be the first to know about seasonal sauces, limited releases, and
            recipe ideas that do not behave.
          </p>
        </div>
        <form
          className="relative z-10 flex flex-col justify-center"
          noValidate
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <div
            className={`flex flex-col border transition duration-300 sm:flex-row ${
              isError
                ? "border-tomato"
                : isSuccess
                  ? "border-pineapple"
                  : "border-cream/28 focus-within:border-cream/70"
            }`}
          >
            <input
              id="newsletter-email"
              value={newsletterEmail}
              onChange={(event) => onEmailChange(event.target.value)}
              type="email"
              placeholder="Enter your email"
              disabled={isSubscribing}
              aria-invalid={isError}
              aria-describedby="newsletter-status"
              suppressHydrationWarning
              className="min-h-14 flex-1 bg-transparent px-5 text-sm text-cream outline-none transition placeholder:text-cream/45 focus:bg-cream/8 disabled:opacity-60"
            />
            <AnimatedButton
              type="submit"
              loading={isSubscribing}
              disabled={isSubscribing}
              className="border-l border-cream/28 bg-transparent text-cream hover:bg-cream hover:text-brown"
            >
              {isSubscribing ? "Subscribing..." : isSuccess ? "Subscribed" : "Subscribe"}
            </AnimatedButton>
          </div>
          <p
            id="newsletter-status"
            className={`mt-4 text-xs ${
              isError ? "text-tomato" : isSuccess ? "text-pineapple" : "text-cream/62"
            }`}
            aria-live="polite"
          >
            {newsletterMessage}
          </p>
        </form>
      </div>
    </section>
  );
}
