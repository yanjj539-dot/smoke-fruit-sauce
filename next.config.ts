import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/smoke-fruit-sauce",
  images: {
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  devIndicators: false,
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
