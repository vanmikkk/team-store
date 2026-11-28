import { vi } from 'vitest';
import type { CartController } from '../../src/components/Cart/Cart';
import { beforeEach, describe, expect, it } from 'vitest';
import { products } from '../../src/data/products';
import {
  renderCatalogPage,
  setupCatalogPage,
} from '../../src/pages/Catalog/CatalogPage';

describe('CatalogPage', () => {
  beforeEach(() => {
    const cartController = {
      addProduct: vi.fn(),
      changeQuantity: vi.fn(),
      getItems: vi.fn(() => []),
      destroy: vi.fn(),
    } satisfies CartController;

    document.body.innerHTML = renderCatalogPage();
    setupCatalogPage(cartController);
  });

  it('should render the filter panel and catalog', () => {
    expect(document.querySelector('.filter-panel')).not.toBeNull();
    expect(document.querySelector('.catalog')).not.toBeNull();
  });

  it('should filter products by search query', () => {
    const searchInput = document.querySelector<HTMLInputElement>(
      '[name="searchQuery"]',
    )!;

    searchInput.value = products[0].name;
    searchInput.dispatchEvent(new Event('input', { bubbles: true }));

    const results = document.querySelector('#catalog-results');

    expect(results?.textContent).toContain(products[0].name);
  });

  it('should filter products by category', () => {
    const categorySelect = document.querySelector<HTMLSelectElement>(
      '[name="category"]',
    )!;

    categorySelect.value = products[0].category;
    categorySelect.dispatchEvent(new Event('change', { bubbles: true }));

    const cards = document.querySelectorAll('.product-card');

    expect(cards.length).toBeGreaterThan(0);
    cards.forEach((card) => {
      expect(card.textContent).toContain(products[0].category);
    });
  });

  it('should filter products by minimum price', () => {
    const minPriceInput = document.querySelector<HTMLInputElement>(
      '[name="minPrice"]',
    )!;

    minPriceInput.value = '100';
    minPriceInput.dispatchEvent(new Event('input', { bubbles: true }));

    const cards = document.querySelectorAll('.product-card');

    cards.forEach((card) => {
      const priceText = card.querySelector('.product-card__price')?.textContent;
      const price = Number(priceText?.replace('$', ''));

      expect(price).toBeGreaterThanOrEqual(100);
    });
  });

  it('should filter products by maximum price', () => {
    const maxPriceInput = document.querySelector<HTMLInputElement>(
      '[name="maxPrice"]',
    )!;

    maxPriceInput.value = '50';
    maxPriceInput.dispatchEvent(new Event('input', { bubbles: true }));

    const cards = document.querySelectorAll('.product-card');

    cards.forEach((card) => {
      const priceText = card.querySelector('.product-card__price')?.textContent;
      const price = Number(priceText?.replace('$', ''));

      expect(price).toBeLessThanOrEqual(50);
    });
  });

  it('should sort products by ascending price', () => {
    const sortSelect = document.querySelector<HTMLSelectElement>(
      '[name="sortBy"]',
    )!;

    sortSelect.value = 'price-asc';
    sortSelect.dispatchEvent(new Event('change', { bubbles: true }));

    const prices = Array.from(
      document.querySelectorAll('.product-card__price'),
    ).map((element) => Number(element.textContent?.replace('$', '')));

    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  it('should show only products in stock', () => {
    const stockCheckbox = document.querySelector<HTMLInputElement>(
      '[name="inStock"]',
    )!;

    stockCheckbox.checked = true;
    stockCheckbox.dispatchEvent(new Event('change', { bubbles: true }));

    const cards = document.querySelectorAll('.product-card');

    cards.forEach((card) => {
      expect(card.textContent).toContain('In stock');
      expect(card.textContent).not.toContain('Out of stock');
    });
  });

  it('should navigate to product details when View details is clicked', () => {
    const button = document.querySelector<HTMLButtonElement>(
      '.product-card__button',
    );

    expect(button).not.toBeNull();

    const productId = button?.dataset.productId;

    expect(productId).toBeTruthy();

    button?.click();

    expect(window.location.hash).toBe(
      `#product/${encodeURIComponent(productId!)}`,
    );
  });

  it('should add product to cart without navigating to details', () => {
    window.location.hash = '';
    const addProduct = vi.fn();

    const cartController = {
      addProduct,
      changeQuantity: vi.fn(),
      getItems: vi.fn(() => []),
      destroy: vi.fn(),
    } satisfies CartController;

    document.body.innerHTML = renderCatalogPage();
    setupCatalogPage(cartController);

    const button = document.querySelector<HTMLButtonElement>(
      '[data-action="add-to-cart"]',
    );

    expect(button).not.toBeNull();

    const productId = button!.dataset.productId;
    const product = products.find((item) => item.id === productId);

    button!.click();

    expect(addProduct).toHaveBeenCalledWith(product);
    expect(window.location.hash).not.toContain('#product/');
  });
});
