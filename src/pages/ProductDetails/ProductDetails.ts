
import type { Product } from '../../types/Product';
import './ProductDetails.css';

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

function escapeHtml(value: string): string {
  const entities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };

  return value.replace(/[&<>"']/g, (character) => entities[character]);
}

export function renderProductDetails(
  product: Product | undefined,
): string {
  if (!product) {
    return `
      <section class="product-details__not-found">
        <h2>Product not found</h2>
        <p>Sorry, this product does not exist.</p>

        <a
          class="product-details__back"
          href="#catalog"
        >
          Back to catalog
        </a>
      </section>
    `;
  }

  return `
    <section class="product-details">
      <a
        class="product-details__back"
        href="#catalog"
      >
        ← Back to catalog
      </a>

      <div class="product-details__layout">
        <div class="product-details__image-wrapper">
          <img
            class="product-details__image"
            src="${escapeHtml(product.image)}"
            alt="${escapeHtml(product.name)}"
          />
        </div>

        <div class="product-details__content">
          <span class="product-details__category">
            ${escapeHtml(product.category)}
          </span>

          <h1 class="product-details__title">
            ${escapeHtml(product.name)}
          </h1>

          <p class="product-details__series">
            ${escapeHtml(product.series)}
          </p>

          <div class="product-details__rating">
            ★ ${product.rating.toFixed(1)}
          </div>

          <p class="product-details__character">
            Character: ${escapeHtml(product.character)}
          </p>

          <p class="product-details__description">
            ${escapeHtml(product.description)}
          </p>

          <p class="product-details__availability">
            ${product.inStock ? 'In stock' : 'Out of stock'}
          </p>

          <div class="product-details__purchase">
            <span class="product-details__price">
              ${formatCurrency(product.price)}
            </span>

            <button
              class="product-details__button"
              type="button"
              data-action="add-to-cart"
              ${product.inStock ? '' : 'disabled'}
            >
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </section>
  `;
}