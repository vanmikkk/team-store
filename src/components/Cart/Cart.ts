import type { CartItem } from '../../types/CartItem';
import { calculateCartTotal } from '../../utils/cart';

function formatCurrency(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function renderCart(cart: CartItem[]): string {
  const total = calculateCartTotal(cart);

  const itemsContent = cart.length === 0
    ? '<p class="cart__empty">Your cart is empty.</p>'
    : cart.map((item) => `
        <article
          class="cart__item"
          data-product-id="${item.id}"
        >
          <h3>${item.name}</h3>

          <p>
            Unit price: ${formatCurrency(item.price)}
          </p>

          <div class="cart__quantity">
            <button
              type="button"
              data-action="decrease"
            >
              -
            </button>

            <span data-quantity>${item.quantity}</span>

            <button
              type="button"
              data-action="increase"
            >
              +
            </button>
          </div>

          <p>
            Line total:
            <span data-line-total>
              ${formatCurrency(item.price * item.quantity)}
            </span>
          </p>

          <button
            type="button"
            data-action="remove"
          >
            Remove
          </button>
        </article>
      `).join('');

  return `
    <section class="cart">
      <h2>Shopping cart</h2>

      ${itemsContent}

      <div class="cart__promo">
        <label for="promo-code">Promo code</label>

        <input
          id="promo-code"
          type="text"
          name="promoCode"
        />

        <button
          type="button"
          data-action="apply-promo"
        >
          Apply
        </button>

        <p data-promo-status></p>
      </div>

      <div class="cart__summary">
        <p>
          Total:
          <strong data-cart-total>
            ${formatCurrency(total)}
          </strong>
        </p>
      </div>
    </section>
  `;
}