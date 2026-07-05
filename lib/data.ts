import type { Bundle, IngredientAsset, Product, Review } from "@/lib/types";

export const ingredients: IngredientAsset[] = [
  {
    id: "tomato",
    name: "Tomato",
    image: "/images/ingredients/tomato.webp",
    alt: "Fresh tomato ingredient",
  },
  {
    id: "chili",
    name: "Chili",
    image: "/images/ingredients/chili.webp",
    alt: "Charred red chili ingredient",
  },
  {
    id: "pineapple",
    name: "Pineapple",
    image: "/images/ingredients/pineapple.webp",
    alt: "Charred pineapple ingredient",
  },
  {
    id: "garlic",
    name: "Garlic",
    image: "/images/ingredients/garlic.webp",
    alt: "Garlic clove ingredient",
  },
  {
    id: "cherry",
    name: "Cherry",
    image: "/images/ingredients/cherry.webp",
    alt: "Cherry ingredient",
  },
  {
    id: "onion",
    name: "Onion",
    image: "/images/ingredients/onion.webp",
    alt: "Roasted onion ingredient",
  },
  {
    id: "spice",
    name: "Spice",
    image: "/images/ingredients/spice.webp",
    alt: "Floating spice granules",
  },
];

export const products: Product[] = [
  {
    id: "pineapple-heat",
    name: "Crushed Pineapple Heat",
    slug: "crushed-pineapple-heat",
    flavor: "Charred sweet heat",
    description:
      "Bright pineapple, clean chili heat, and a slow smoked finish for grilled everything.",
    price: 12,
    image: "/images/products/pineapple-heat.webp",
    fallbackColor: "#d99925",
    ingredients: ["pineapple", "chili", "garlic"],
    accentColor: "#D99A19",
  },
  {
    id: "habanero-garlic",
    name: "Smoked Habanero Garlic",
    slug: "smoked-habanero-garlic",
    flavor: "Roasted depth",
    description:
      "Habanero fire, roasted garlic, and smoke that lands deep without tasting heavy.",
    price: 12,
    image: "/images/products/habanero-garlic.webp",
    fallbackColor: "#c84a22",
    ingredients: ["chili", "garlic", "onion"],
    accentColor: "#C84A22",
  },
  {
    id: "cherry-chili",
    name: "Cherry Chili Glaze",
    slug: "cherry-chili-glaze",
    flavor: "Dark and tart",
    description:
      "A glossy cherry bite with pepper heat for wings, roasted vegetables, and late-night leftovers.",
    price: 12,
    image: "/images/products/cherry-chili.webp",
    fallbackColor: "#a9222f",
    ingredients: ["cherry", "chili", "spice"],
    accentColor: "#B52734",
  },
];

export const bundles: Bundle[] = [
  {
    id: "three-pack",
    name: "3 Pack",
    description: "The essentials trio for every kind of heat seeker.",
    price: 34,
    compareAt: 36,
    image: "/images/bundles/three-pack.webp",
  },
  {
    id: "six-pack",
    name: "6 Pack",
    description: "Double the bottles for families, hosts, and repeat offenders.",
    price: 64,
    compareAt: 72,
    image: "/images/bundles/six-pack.webp",
  },
];

export const reviews: Review[] = [
  {
    id: "jessica",
    name: "Jessica M.",
    quote:
      "The pineapple heat is ridiculously good. Smoky, bright, and just the right kick.",
  },
  {
    id: "daniel",
    name: "Daniel K.",
    quote:
      "Finally a sauce with real depth of flavor. I put it on everything.",
  },
  {
    id: "megan",
    name: "Megan R.",
    quote:
      "Small batch you can taste. Quality ingredients make all the difference.",
  },
  {
    id: "andre",
    name: "Andre W.",
    quote:
      "The cherry glaze turned a weeknight chicken dinner into a table event.",
  },
];
