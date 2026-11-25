import { describe, expect, it } from 'vitest';
import type { CartItem } from '../../src/types/CartItem';
import { renderCart } from '../../src/components/Cart/Cart';

function createCartItem(overrides: Partial<CartItem> = {}): CartItem {
  return {
    id: '1',
    name: 'Reimu Hakurei Fumo',
    description: 'Classic Reimu Hakurei collectible Fumo plush.',
    price: 35,
    category: 'Fumo Plush',
    character: 'Reimu Hakurei',
    series: 'Touhou Project',
    image: '/images/fumo-reimu.jpg',
    rating: 4.9,
    inStock: true,
    quantity: 2,
    ...overrides,
  };
}

describe('renderCart', () => {
  it('should display an empty cart message and zero total', () => {
    document.body.innerHTML = renderCart([]);

    expect(document.querySelector('.cart__empty')).not.toBeNull();
    expect(document.querySelector('[data-cart-total]')?.textContent).toContain(
      '$0.00',
    );
  });

  it('should display product information and line total', () => {
    const item = createCartItem();

    document.body.innerHTML = renderCart([item]);

    const cartItem = document.querySelector(
      `[data-product-id="${item.id}"]`,
    );

    expect(cartItem?.textContent).toContain(item.name);
    expect(cartItem?.textContent).toContain('$35.00');
    expect(cartItem?.querySelector('[data-quantity]')?.textContent).toBe('2');
    expect(cartItem?.querySelector('[data-line-total]')?.textContent).toContain(
      '$70.00',
    );
  });

  it('should display quantity controls and remove button', () => {
    const item = createCartItem();

    document.body.innerHTML = renderCart([item]);

    const cartItem = document.querySelector(
      `[data-product-id="${item.id}"]`,
    );

    expect(cartItem?.querySelector('[data-action="increase"]')).not.toBeNull();
    expect(cartItem?.querySelector('[data-action="decrease"]')).not.toBeNull();
    expect(cartItem?.querySelector('[data-action="remove"]')).not.toBeNull();
  });

  it('should display promo code input and apply button', () => {
    document.body.innerHTML = renderCart([]);

    expect(document.querySelector('[name="promoCode"]')).not.toBeNull();
    expect(
      document.querySelector('[data-action="apply-promo"]'),
    ).not.toBeNull();
    expect(document.querySelector('[data-promo-status]')).not.toBeNull();
  });
});