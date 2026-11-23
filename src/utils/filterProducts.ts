import type { Product } from '../types/Product';
import type { ProductFilters } from '../types/ProductFilters';

export function filterProducts(
  products: Product[],
  filters: ProductFilters,
): Product[] {
  const {
    searchQuery,
    category,
    minPrice,
    maxPrice,
    sortBy = 'default',
    inStock,
  } = filters;

  const normalizedQuery = searchQuery.trim().toLowerCase();

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !normalizedQuery ||
      product.name.toLowerCase().includes(normalizedQuery);

    const matchesCategory =
      !category || product.category === category;

    const matchesMinPrice =
      minPrice === undefined || product.price >= minPrice;

    const matchesMaxPrice =
      maxPrice === undefined || product.price <= maxPrice;

    const matchesAvailability =
      inStock === undefined || product.inStock === inStock;

    return (
      matchesSearch &&
      matchesCategory &&
      matchesMinPrice &&
      matchesMaxPrice &&
      matchesAvailability
    );
  });

  if (sortBy === 'price-asc') {
    return [...filteredProducts].sort((a, b) => a.price - b.price);
  }

  if (sortBy === 'price-desc') {
    return [...filteredProducts].sort((a, b) => b.price - a.price);
  }

  if (sortBy === 'rating-desc') {
    return [...filteredProducts].sort((a, b) => b.rating - a.rating);
  }

  if (sortBy === 'name-asc') {
    return [...filteredProducts].sort((a, b) =>
      a.name.localeCompare(b.name),
    );
  }

  return filteredProducts;
}