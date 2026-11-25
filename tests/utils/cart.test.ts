import { describe, expect, it } from 'vitest';
import type { Product } from '../../src/types/Product';
import { addToCart } from '../../src/utils/cart';

function createProduct(overrides: Partial<Product> = {}): Product {
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
    ...overrides,
  };
}

describe('addToCart', () => {
  it('should add a product to an empty cart with quantity 1', () => {
    const product = createProduct();

    const result = addToCart([], product);

    expect(result).toEqual([
      {
        ...product,
        quantity: 1,
      },
    ]);
  });

  it('should increase quantity when the product already exists in cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];

    const result = addToCart(cart, product);

    expect(result).toHaveLength(1);
    expect(result[0].quantity).toBe(2);
  });

  it('should add a different product as a new cart item', () => {
    const firstProduct = createProduct();
    const secondProduct = createProduct({
      id: '2',
      name: 'Marisa Kirisame Fumo',
    });

    const cart = [{ ...firstProduct, quantity: 1 }];

    const result = addToCart(cart, secondProduct);

    expect(result).toHaveLength(2);
    expect(result[1].id).toBe('2');
    expect(result[1].quantity).toBe(1);
  });

  it('should not mutate the original cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];
    const originalCart = cart.map((item) => ({ ...item }));

    addToCart(cart, product);

    expect(cart).toEqual(originalCart);
  });
});