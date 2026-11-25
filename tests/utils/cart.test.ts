import { describe, expect, it } from 'vitest';
import type { Product } from '../../src/types/Product';
import {
  addToCart,
  changeCartItemQuantity,
  removeFromCart,
  calculateCartTotal,
} from '../../src/utils/cart';


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

describe('changeCartItemQuantity', () => {
  it('should increase product quantity', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];

    const result = changeCartItemQuantity(cart, product.id, 1);

    expect(result[0].quantity).toBe(2);
  });

  it('should decrease product quantity', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 2 }];

    const result = changeCartItemQuantity(cart, product.id, -1);

    expect(result[0].quantity).toBe(1);
  });

  it('should not decrease quantity below 1', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];

    const result = changeCartItemQuantity(cart, product.id, -1);

    expect(result[0].quantity).toBe(1);
  });

  it('should not mutate the original cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 2 }];
    const originalCart = cart.map((item) => ({ ...item }));

    changeCartItemQuantity(cart, product.id, 1);

    expect(cart).toEqual(originalCart);
  });
});

describe('removeFromCart', () => {
  it('should remove a product from the cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];

    const result = removeFromCart(cart, product.id);

    expect(result).toHaveLength(0);
  });

  it('should keep other products in the cart', () => {
    const firstProduct = createProduct();
    const secondProduct = createProduct({
      id: '2',
      name: 'Marisa Kirisame Fumo',
    });

    const cart = [
      { ...firstProduct, quantity: 1 },
      { ...secondProduct, quantity: 2 },
    ];

    const result = removeFromCart(cart, firstProduct.id);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(secondProduct.id);
  });

  it('should not mutate the original cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 1 }];
    const originalCart = cart.map((item) => ({ ...item }));

    removeFromCart(cart, product.id);

    expect(cart).toEqual(originalCart);
  });
});

describe('calculateCartTotal', () => {
  it('should calculate the total price of all cart items', () => {
    const firstProduct = createProduct({ price: 35 });
    const secondProduct = createProduct({
      id: '2',
      name: 'Marisa Kirisame Fumo',
      price: 12,
    });

    const cart = [
      { ...firstProduct, quantity: 2 },
      { ...secondProduct, quantity: 3 },
    ];

    const result = calculateCartTotal(cart);

    expect(result).toBe(106);
  });

  it('should return 0 for an empty cart', () => {
    const result = calculateCartTotal([]);

    expect(result).toBe(0);
  });

  it('should not mutate the original cart', () => {
    const product = createProduct();
    const cart = [{ ...product, quantity: 2 }];
    const originalCart = cart.map((item) => ({ ...item }));

    calculateCartTotal(cart);

    expect(cart).toEqual(originalCart);
  });
});