export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  images: string[];
  categories: string[];
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  stock: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  size: string;
  color: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export type SortOption = 'price-low-to-high' | 'price-high-to-low' | 'newest' | 'popular';