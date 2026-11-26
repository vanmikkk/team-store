
import { describe, expect, it } from 'vitest';
import type { Product } from '../../src/types/Product';
import { products } from '../../src/data/products';
import { renderProductDetails } from '../../src/pages/ProductDetails/ProductDetails';

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

describe('renderProductDetails', () => {
  it('should render product name and description', () => {
    const product = createProduct();

    document.body.innerHTML = renderProductDetails(product);

    expect(document.querySelector('.product-details__title')?.textContent)
      .toContain(product.name);

    expect(document.querySelector('.product-details__description')?.textContent)
      .toContain(product.description);
  });

  it('should render product image with correct source and alt text', () => {
    const product = createProduct();

    document.body.innerHTML = renderProductDetails(product);

    const image = document.querySelector<HTMLImageElement>(
      '.product-details__image',
    );

    expect(image?.getAttribute('src')).toBe(product.image);
    expect(image?.alt).toBe(product.name);
  });

  it('should display product category, series and character', () => {
    const product = createProduct();

    document.body.innerHTML = renderProductDetails(product);

    const details = document.querySelector('.product-details');

    expect(details?.textContent).toContain(product.category);
    expect(details?.textContent).toContain(product.series);
    expect(details?.textContent).toContain(product.character);
  });

  it('should display product price and rating', () => {
    const product = createProduct();

    document.body.innerHTML = renderProductDetails(product);

    expect(
      document.querySelector('.product-details__price')?.textContent,
    ).toContain('$35.00');

    expect(
      document.querySelector('.product-details__rating')?.textContent,
    ).toContain('4.9');
  });

  it('should display in-stock status and enabled add-to-cart button', () => {
    const product = createProduct({ inStock: true });

    document.body.innerHTML = renderProductDetails(product);

    const button = document.querySelector<HTMLButtonElement>(
      '[data-action="add-to-cart"]',
    );

    expect(document.querySelector('.product-details__availability')?.textContent)
      .toContain('In stock');

    expect(button).not.toBeNull();
    expect(button?.disabled).toBe(false);
  });

  it('should disable add-to-cart button when product is out of stock', () => {
    const product = createProduct({ inStock: false });

    document.body.innerHTML = renderProductDetails(product);

    const button = document.querySelector<HTMLButtonElement>(
      '[data-action="add-to-cart"]',
    );

    expect(document.querySelector('.product-details__availability')?.textContent)
      .toContain('Out of stock');

    expect(button?.disabled).toBe(true);
  });

  it('should provide a link back to the catalog', () => {
    const product = createProduct();

    document.body.innerHTML = renderProductDetails(product);

    const backLink = document.querySelector<HTMLAnchorElement>(
      '.product-details__back',
    );

    expect(backLink?.getAttribute('href')).toBe('#catalog');
  });

  it('should display a not-found message when product does not exist', () => {
    document.body.innerHTML = renderProductDetails(undefined);

    expect(document.querySelector('.product-details__not-found')).not.toBeNull();
    expect(document.querySelector('.product-details__back')?.getAttribute('href'))
      .toBe('#catalog');
  });

  it('should show Add to Cart button when product is not in cart', () => {
    const html = renderProductDetails(products[0], 0);

    expect(html).toContain('data-action="add-to-cart"');
    expect(html).not.toContain('data-action="increase"');
    });

    it('should show quantity controls when product is already in cart', () => {
    const html = renderProductDetails(products[0], 2);

    expect(html).toContain('data-action="decrease"');
    expect(html).toContain('<span data-quantity>2</span>');
    expect(html).toContain('data-action="increase"');
    expect(html).not.toContain('data-action="add-to-cart"');
    });
});