import './Catalog.css';
import { products } from '../../data/products';
import { filterProducts } from '../../utils/filterProducts';
import { createProductCard } from '../../components/ProductCard/ProductCard';
import type { ProductFilters } from '../../types/ProductFilters';
import type { CartController } from '../../components/Cart/Cart';

export function renderCatalog(
  filters: ProductFilters,
  cartController?: CartController,
): string {
  const filteredProducts = filterProducts(products, filters);
  const cartItems = cartController?.getItems() ?? [];

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
        ${filteredProducts.map((product) => {
          const isInCart = cartItems.some(
            (item) => item.id === product.id,
          );

          return createProductCard(product, isInCart);
        }).join('')}
      </div>
    </section>
  `;
}
