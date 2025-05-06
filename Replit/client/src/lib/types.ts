export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  comparePrice?: number;
  category: string;
  images: string[];
  sizes: string[];
  colors: string[];
  rating: number;
  reviews?: number;
  isFeatured: boolean;
  isNew: boolean;
  isSale: boolean;
  isBestSeller: boolean;
  stock: number;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  size: string;
  color: string;
  image: string;
}

export interface FilterOptions {
  priceRange: [number, number];
  categories: string[];
  sizes: string[];
  colors: string[];
}
