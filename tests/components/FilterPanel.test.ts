
import { describe, expect, it } from 'vitest';
import { products } from '../../src/data/products';
import { renderFilterPanel } from '../../src/components/FilterPanel/FilterPanel';

describe('renderFilterPanel', () => {
  it('should render the search input', () => {
    const html = renderFilterPanel();

    expect(html).toContain('type="search"');
  });

  it('should render all product categories', () => {
    const html = renderFilterPanel();

    const categories = [...new Set(products.map((product) => product.category))];

    categories.forEach((category) => {
      expect(html).toContain(category);
    });
  });

  it('should render minimum and maximum price inputs', () => {
    const html = renderFilterPanel();

    expect(html).toContain('name="minPrice"');
    expect(html).toContain('name="maxPrice"');
  });

  it('should render sorting options', () => {
    const html = renderFilterPanel();

    expect(html).toContain('price-asc');
    expect(html).toContain('price-desc');
    expect(html).toContain('rating-desc');
    expect(html).toContain('name-asc');
  });

  it('should render the in-stock filter', () => {
    const html = renderFilterPanel();

    expect(html).toContain('name="inStock"');
  });
});
