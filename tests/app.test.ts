import { describe, expect, it } from 'vitest';
import { getRouteFromHash } from '../src/app';

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
});
