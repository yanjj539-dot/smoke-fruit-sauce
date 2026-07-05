export default function imageLoader({
  src,
  width,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}) {
  // Prepend basePath for GitHub Pages, keep src otherwise untouched (no optimization server)
  const basePath = "/smoke-fruit-sauce";
  if (src.startsWith("/")) {
    return `${basePath}${src}`;
  }
  return src;
}
