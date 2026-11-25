import type { Product } from '../types/Product';
import type { CartItem } from '../types/CartItem';

export function addToCart(
  cart: CartItem[],
  product: Product,
): CartItem[] {
  const existingItem = cart.find((item) => item.id === product.id);

  if (existingItem) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item,
    );
  }

  return [...cart, { ...product, quantity: 1 }];
}