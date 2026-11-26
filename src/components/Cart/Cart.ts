
import type { CartItem } from '../../types/CartItem';
import type { Product } from '../../types/Product';
import {
  addToCart,
  changeCartItemQuantity,
  removeFromCart,
  calculateCartSummary,
} from '../../utils/cart';
import './Cart.css';

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

export function renderCart(
  cart: CartItem[],
  promoCode = '',
): string {
  const summary = calculateCartSummary(cart, promoCode);

  const promoMessage =
    summary.promoCodeStatus === 'applied'
      ? 'Promo code applied successfully!'
      : summary.promoCodeStatus === 'invalid'
        ? 'Invalid promo code.'
        : '';

  const itemsContent =
    cart.length === 0
      ? '<p class="cart__empty">Your cart is empty.</p>'
      : cart
          .map(
            (item) => `
              <article
                class="cart__item"
                data-product-id="${escapeHtml(item.id)}"
              >
                <h3>${escapeHtml(item.name)}</h3>

                <p>
                  Unit price:
                  ${formatCurrency(item.price)}
                </p>

                <div class="cart__quantity">
                  <button
                    type="button"
                    data-action="decrease"
                    aria-label="Decrease quantity of ${escapeHtml(item.name)}"
                  >
                    -
                  </button>

                  <span data-quantity>${item.quantity}</span>

                  <button
                    type="button"
                    data-action="increase"
                    aria-label="Increase quantity of ${escapeHtml(item.name)}"
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
            `,
          )
          .join('');

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
          value="${escapeHtml(promoCode)}"
        />

        <button
          type="button"
          data-action="apply-promo"
        >
          Apply
        </button>

        <p data-promo-status role="status" aria-live="polite">
          ${promoMessage}
        </p>
      </div>

      <div class="cart__summary">
        <p>
          Subtotal:
          <span data-cart-subtotal>
            ${formatCurrency(summary.subtotal)}
          </span>
        </p>

        <p>
          Discount:
          <span data-cart-discount>
            ${formatCurrency(summary.discount)}
          </span>
        </p>

        <p>
          Total:
          <strong data-cart-total>
            ${formatCurrency(summary.total)}
          </strong>
        </p>
      </div>
    </section>
  `;
}

export interface CartController {
  addProduct(product: Product): void;
  getItems(): CartItem[];
  destroy(): void;
}

export function setupCart(
  container: HTMLElement,
  initialCart: CartItem[] = [],
  onCartChange?: (cart: CartItem[]) => void,
): CartController {
  let cart = initialCart.map((item) => ({ ...item }));
  let promoCode = '';

  const render = (): void => {
    container.innerHTML = renderCart(cart, promoCode);
  };

  const notifyCartChange = (): void => {
    onCartChange?.(cart.map((item) => ({ ...item })));
  };

  const handleClick = (event: MouseEvent): void => {
    const target = event.target;

    if (!(target instanceof Element)) {
      return;
    }

    const button = target.closest<HTMLButtonElement>('[data-action]');

    if (!button || !container.contains(button)) {
      return;
    }

    const action = button.dataset.action;

    if (action === 'apply-promo') {
      const input =
        container.querySelector<HTMLInputElement>('[name="promoCode"]');

      promoCode = input?.value.trim().toUpperCase() ?? '';

      render();
      return;
    }

    const cartItem = button.closest<HTMLElement>('[data-product-id]');
    const productId = cartItem?.dataset.productId;

    if (!productId) {
      return;
    }

    if (action === 'increase') {
      cart = changeCartItemQuantity(cart, productId, 1);
    } else if (action === 'decrease') {
      cart = changeCartItemQuantity(cart, productId, -1);
    } else if (action === 'remove') {
      cart = removeFromCart(cart, productId);
    } else {
      return;
    }

    render();
    notifyCartChange();
  };

  container.addEventListener('click', handleClick);

  render();

  return {
    addProduct(product: Product): void {
      cart = addToCart(cart, product);
      render();
      notifyCartChange();
    },

    getItems(): CartItem[] {
      return cart.map((item) => ({ ...item }));
    },

    destroy(): void {
      container.removeEventListener('click', handleClick);
    },
  };
}
