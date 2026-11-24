import './Catalog.css';
import { products } from '../../data/products';
import { filterProducts } from '../../utils/filterProducts';
import { createProductCard } from '../../components/ProductCard/ProductCard';
import type { ProductFilters } from '../../types/ProductFilters';

export function renderCatalog(filters: ProductFilters): string {
  const filteredProducts = filterProducts(products, filters);

  if (filteredProducts.length === 0) {
    return `
      <section class="catalog">
        <p class="catalog__empty">
          No products found. Try changing your filters.
        </p>
      </section>
    `;
  }

  return `
    <section class="catalog">
      <div class="catalog__grid">
        ${filteredProducts.map(createProductCard).join('')}
      </div>
    </section>
  `;
}
