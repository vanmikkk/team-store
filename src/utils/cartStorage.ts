
import type { CartItem } from '../types/CartItem';

const STORAGE_KEY = 'mochimood-cart';

function isCartItem(value: unknown): value is CartItem {
  if (typeof value !== 'object' || value === null) {
    return false;
  }

  const item = value as Record<string, unknown>;

  return (
    typeof item.id === 'string' &&
    typeof item.name === 'string' &&
    typeof item.description === 'string' &&
    typeof item.price === 'number' &&
    Number.isFinite(item.price) &&
    typeof item.category === 'string' &&
    typeof item.character === 'string' &&
    typeof item.series === 'string' &&
    typeof item.image === 'string' &&
    typeof item.rating === 'number' &&
    Number.isFinite(item.rating) &&
    typeof item.inStock === 'boolean' &&
    typeof item.quantity === 'number' &&
    Number.isInteger(item.quantity) &&
    item.quantity >= 1
  );
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function loadCart(): CartItem[] {
  const savedCart = localStorage.getItem(STORAGE_KEY);

  if (savedCart === null) {
    return [];
  }

  try {
    const parsedCart: unknown = JSON.parse(savedCart);

    if (!Array.isArray(parsedCart) || !parsedCart.every(isCartItem)) {
      return [];
    }

    return parsedCart;
  } catch {
    return [];
  }
}