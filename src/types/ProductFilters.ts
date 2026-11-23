export interface ProductFilters {
  searchQuery: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';
  inStock?: boolean;
}