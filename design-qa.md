# Smoke & Fruit Design QA

## Source

- Selected visual target: `public/images/reference/dark-pantry-campaign.webp`
- Target concept: dark pantry campaign with cream base, deep brown editorial block, product bottle stage, floating food photography, product lineup, bundles, reviews, and newsletter.

## Screenshots Reviewed

- Desktop viewport: `smoke-fruit-desktop-final.png`
- Full page after fixes: `smoke-fruit-fullpage-final.png`
- Mobile viewport: `smoke-fruit-mobile-final.png`
- Enhanced desktop viewport: `smoke-fruit-desktop-enhanced.png`
- Enhanced full page: `smoke-fruit-fullpage-enhanced.png`
- Enhanced mobile viewport: `smoke-fruit-mobile-enhanced.png`

## Findings And Fixes

1. P1 fixed: Full-page screenshots initially showed blank downstream sections because GSAP reveal used opacity from 0 before ScrollTrigger fired. Core content now stays visible by default; reveal only uses light vertical movement.
2. P1 fixed: Hero display type was too compressed and clipped at desktop and mobile widths. Display font and title line breaks were revised for readable oversized editorial typography.
3. P2 fixed: Below-fold images initially appeared blank in full-page capture due lazy loading. Brand story, bundles, and newsletter imagery now load eagerly.
4. P2 fixed: Newsletter decorative crop brought in unwanted source text. It now uses the generated story image with a dark overlay.

## Interaction Checks

- Add to cart opens cart drawer and displays the selected product.
- Cart quantity controls increment, decrement, and remove line items.
- Product carousel next/previous updates the Hero product state.
- Reviews carousel next/previous updates visible review pair.
- Newsletter form accepts email and shows mock success message.
- Mobile menu opens and closes from the hamburger control.
- Escape closes the cart drawer and mobile menu.
- Reduced-motion mode keeps product switching functional without GSAP dependency.
- Product cards, bundle cards, newsletter, reviews, cart, menu, and scroll reveal now have interaction/motion polish without changing the original layout structure.

## Verification

- `npm run build`: passed.
- `npm run lint`: passed.
- Production server: `http://127.0.0.1:3007/` returned 200.
- Browser smoke test on production build: initial hero visible, desktop product switch, add cart drawer, cart Escape close, reviews switch, newsletter error/success states, mobile menu, mobile review count, reduced-motion product switch, screenshots written.
- Browser console: no runtime errors or warnings in the smoke test.

## Residual Notes

- `npm audit --audit-level=moderate` reports a moderate PostCSS advisory through Next's internal dependency. The suggested forced fix would install `next@9.3.3`, which is a breaking downgrade, so it was not applied.
- Generated bottle images use matching cream surfaces rather than true transparent cutouts; the page includes `ImageFallback` CSS fallback only for missing image failures.

final result: passed
