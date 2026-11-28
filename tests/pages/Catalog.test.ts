
import { describe, expect, it } from 'vitest';
import { products } from '../../src/data/products';
import { renderCatalog } from '../../src/pages/Catalog/Catalog';

describe('renderCatalog', () => {
  it('should render the catalog section and grid', () => {
    const html = renderCatalog({ searchQuery: '' });

    expect(html).toContain('class="catalog"');
    expect(html).toContain('class="catalog__grid"');
  });

  it('should render all products', () => {
    const html = renderCatalog({ searchQuery: '' });

    const renderedCards = html.match(/class="product-card"/g) ?? [];

    expect(renderedCards).toHaveLength(products.length);
  });

  it('should render products matching the search query', () => {
    const product = products[0];
    const searchTerm = product.name.slice(0, 4);

    const html = renderCatalog({ searchQuery: searchTerm });

    expect(html).toContain(product.name);
    expect(html).toContain('class="product-card"');
  });

  it('should show an empty message when no products match', () => {
    const html = renderCatalog({
      searchQuery: 'nonexistent-product-12345',
    });

    expect(html).toContain('No products found');
    expect(html).not.toContain('catalog__grid');
  });

  it('should navigate to product details when View details is clicked', () => {
    // 
  });
});
