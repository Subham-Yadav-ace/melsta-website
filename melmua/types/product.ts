export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating?: {
    rate: number;
    count: number;
  };
}

export interface ProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filteredProducts: Product[];
}

export interface SearchFilters {
  searchTerm: string;
  selectedCategory: string;
  priceRange: {
    min: number;
    max: number;
  };
}

export const PRODUCT_CATEGORIES = [
  "electronics",
  "jewelery",
  "men's clothing",
  "women's clothing",
] as const;

export type ProductCategory = (typeof PRODUCT_CATEGORIES)[number];
