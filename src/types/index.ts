
export interface User {
  id: string;
  email: string;
  token?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

export interface FilterOptions {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  minRating?: number;
  searchTerm?: string;
}

export type SortOption = 'name' | 'price-asc' | 'price-desc' | 'rating-desc';

export const CATEGORIES = [
  'Electronics',
  'Clothing',
  'Home & Kitchen',
  'Books',
  'Sports',
  'Toys',
  'Health & Beauty',
  'Automotive',
  'Grocery',
  'Other'
];
