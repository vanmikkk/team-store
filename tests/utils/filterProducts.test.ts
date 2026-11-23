import { describe, expect, it } from 'vitest';
import type { Product } from '../../src/types/Product';
import { filterProducts } from '../../src/utils/filterProducts';

describe('filterProducts', () => {
  const products: Product[] = [
    {
      id: '1',
      name: 'Rem Fumo Plush',
      description: 'Cute plush toy',
      price: 35,
      category: 'Plushies',
      character: 'Rem',
      series: 'Re:Zero',
      image: '/images/rem.jpg',
      rating: 4.9,
      inStock: true,
    },
    {
      id: '2',
      name: 'Miku Keychain',
      description: 'Acrylic keychain',
      price: 12,
      category: 'Keychains',
      character: 'Hatsune Miku',
      series: 'Vocaloid',
      image: '/images/miku.jpg',
      rating: 4.7,
      inStock: true,
    },
  ];

  it('should find products by name without case sensitivity', () => {
    const result = filterProducts(products, { searchQuery: 'rem' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rem Fumo Plush');
  });

  it('should find products by partial name', () => {
    const result = filterProducts(products, { searchQuery: 'fumo' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rem Fumo Plush');
  });

  it('should return all products when search query is empty', () => {
    const result = filterProducts(products, { searchQuery: '' });

    expect(result).toHaveLength(2);
    expect(result).toEqual(products);
  });

  it('should ignore leading and trailing spaces in search query', () => {
    const result = filterProducts(products, { searchQuery: '  rem  ' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rem Fumo Plush');
  });

  it('should filter products by category', () => {
    const result = filterProducts(products, { searchQuery: '', category: 'Plushies' });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rem Fumo Plush');
  });

  it('should combine search and category filters', () => {
    const result = filterProducts(products, { searchQuery: 'miku', category: 'Plushies' });

    expect(result).toHaveLength(0);
  });

  it('should filter products by minimum price', () => {
    const result = filterProducts(products, { searchQuery: '', minPrice: 20 });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Rem Fumo Plush');
  });

  it('should filter products by maximum price', () => {
    const result = filterProducts(products, { searchQuery: '', maxPrice: 20 });

    expect(result).toHaveLength(1);
    expect(result[0].name).toBe('Miku Keychain');
  });

  it('should include products at the price boundaries', () => {
    const result = filterProducts(products, { searchQuery: '', minPrice: 12, maxPrice: 35 });

    expect(result).toHaveLength(2);
  });

  it('should sort products by price in ascending order', () => {
    const result = filterProducts(products, {
      searchQuery: '',
      sortBy: 'price-asc',
    });

    expect(result[0].name).toBe('Miku Keychain');
    expect(result[1].name).toBe('Rem Fumo Plush');
  });

  it('should sort products by price in descending order', () => {
    const result = filterProducts(products, {
      searchQuery: '',
      sortBy: 'price-desc',
    });

    expect(result[0].name).toBe('Rem Fumo Plush');
    expect(result[1].name).toBe('Miku Keychain');
  });

  it('should preserve original product order by default', () => {
    const result = filterProducts(products, {
      searchQuery: '',
    });

    expect(result).toEqual(products);
  });

  it('should not modify the original products array when sorting', () => {
    const originalProducts = [...products];

    filterProducts(products, {
      searchQuery: '',
      sortBy: 'price-asc',
    });

    expect(products).toEqual(originalProducts);
  });
});