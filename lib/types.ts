export type IngredientAsset = {
  id: string;
  name: string;
  image: string;
  alt: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  flavor: string;
  description: string;
  price: number;
  image: string;
  fallbackColor: string;
  ingredients: string[];
  accentColor: string;
};

export type CartItem = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
};

export type Review = {
  id: string;
  name: string;
  quote: string;
};

export type Bundle = {
  id: string;
  name: string;
  description: string;
  price: number;
  compareAt?: number;
  image: string;
};
