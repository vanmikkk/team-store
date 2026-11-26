import { afterEach, describe, expect, it } from 'vitest';
import type { CartItem } from '../../src/types/CartItem';
import { loadCart, saveCart } from '../../src/utils/cartStorage';

const STORAGE_KEY = 'mochimood-cart';

const cart: CartItem[] = [
  {
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
  },
];

afterEach(() => {
  localStorage.clear();
});

describe('cartStorage', () => {
  it('should save cart to localStorage', () => {
    saveCart(cart);

    const savedCart = localStorage.getItem(STORAGE_KEY);

    expect(JSON.parse(savedCart!)).toEqual(cart);
  });

  it('should restore cart from localStorage', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

    const result = loadCart();

    expect(result).toEqual(cart);
  });

  it('should return an empty array when localStorage has no cart', () => {
    const result = loadCart();

    expect(result).toEqual([]);
  });

  it('should return an empty array when stored data contains invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{invalid json');

    const result = loadCart();

    expect(result).toEqual([]);
  });

  it('should return an empty array when stored data has an invalid structure', () => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify([{ id: '1', name: 'Invalid product' }]),
    );

    const result = loadCart();

    expect(result).toEqual([]);
  });
});