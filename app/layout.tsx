import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Smoke & Fruit | Small Batch Sauce",
  description:
    "A premium small-batch sauce ecommerce landing page concept with bold flavor, editorial motion, and cart interactions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
