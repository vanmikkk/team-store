import './ProductCard.css';
import type { Product } from '../../types/Product';

export function createProductCard(product: Product): string {
  return `
    <article class="product-card">
      <div class="product-card__image-wrapper">
        <img
          class="product-card__image"
          src="${product.image}"
          alt="${product.name}"
        />

        <span class="product-card__availability ${product.inStock ? '' : 'product-card__availability--out-of-stock'}">
          ${product.inStock ? 'In stock' : 'Out of stock'}
        </span>
      </div>

      <div class="product-card__content">
        <div class="product-card__rating">
          ★ ${product.rating.toFixed(1)}
        </div>

        <h3 class="product-card__title">${product.name}</h3>

        <p class="product-card__subtitle">
          ${product.series} · ${product.category}
        </p>

        <div class="product-card__footer">
          <span class="product-card__price">
            $${product.price.toFixed(2)}
          </span>

          <button
            class="product-card__button"
            type="button"
            data-product-id="${product.id}"
          >
            View details
          </button>
        </div>
      </div>
    </article>
  `;
}
