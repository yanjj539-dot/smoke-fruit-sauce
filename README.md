# Smoke & Fruit Sauce Landing Page

Original premium food ecommerce landing page inspired by the selected dark pantry campaign direction. It uses Next.js App Router, TypeScript, Tailwind CSS, GSAP, local generated assets, mock cart data, product/review carousels, a mobile menu, cart drawer, and newsletter state.

## Run

```bash
npm install
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Open `http://127.0.0.1:3000/`.

## Verify

```bash
npm run lint
npm run build
```

## Structure

- `app/` - Next.js App Router entry, metadata, global CSS.
- `components/` - Header, MobileMenu, CartDrawer, Hero, ProductCarousel, FeatureStrip, ProductGrid, ProductCard, BrandStory, BundleSection, ReviewsCarousel, Newsletter, Footer, AnimatedButton, ProductBottle, IngredientFloat, ImageFallback.
- `lib/` - TypeScript types and mock product/review/bundle data.
- `public/images/` - local generated product, ingredient, bundle, story, and reference images.
- `AI_IMAGE_PROMPTS.md` - reusable bilingual prompts for regenerating assets.
- `design-qa.md` - visual QA and verification record.

## Asset Paths

- Products: `/images/products/pineapple-heat.webp`, `/images/products/habanero-garlic.webp`, `/images/products/cherry-chili.webp`
- Ingredients: `/images/ingredients/tomato.webp`, `/images/ingredients/chili.webp`, `/images/ingredients/pineapple.webp`, `/images/ingredients/garlic.webp`, `/images/ingredients/cherry.webp`, `/images/ingredients/onion.webp`, `/images/ingredients/spice.webp`
- Bundles: `/images/bundles/three-pack.webp`, `/images/bundles/six-pack.webp`
- Story: `/images/story/small-batch-table.webp`

## Fallback

`ImageFallback` keeps the page polished if product images are missing by rendering a styled premium bottle fallback instead of a gray box.
