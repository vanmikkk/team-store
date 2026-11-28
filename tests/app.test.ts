import { describe, expect, it } from 'vitest';
import {
  getRouteFromHash,
  getProductIdFromHash
} from '../src/app';

describe('getRouteFromHash', () => {
  it('should return home for an empty hash', () => {
    expect(getRouteFromHash('')).toBe('home');
  });

  it('should return home for #home', () => {
    expect(getRouteFromHash('#home')).toBe('home');
  });

  it('should return catalog for #catalog', () => {
    expect(getRouteFromHash('#catalog')).toBe('catalog');
  });

  it('should return cart for #cart', () => {
    expect(getRouteFromHash('#cart')).toBe('cart');
  });

  it('should return home for an unknown route', () => {
    expect(getRouteFromHash('#unknown')).toBe('home');
  });

    it('should return product for a product details route', () => {
    expect(getRouteFromHash('#product/1')).toBe('product');
  });

  it('should return product id from hash', () => {
    expect(getProductIdFromHash('#product/1')).toBe('1');
  });

  it('should decode product id from hash', () => {
    expect(getProductIdFromHash('#product/special%20item')).toBe(
      'special item',
    );
  });

  it('should return undefined when product id is missing', () => {
    expect(getProductIdFromHash('#product/')).toBeUndefined();
  });
});
