import { describe, expect, it } from 'vitest';
import { renderApp } from '../src/app';

describe('renderApp', () => {
  it('should render the navigation', () => {
    const html = renderApp();

    expect(html).toContain('MochiMood');
    expect(html).toContain('href="#home"');
    expect(html).toContain('href="#catalog"');
    expect(html).toContain('href="#cart"');
  });

  it('should render a home page container', () => {
    const html = renderApp();

    expect(html).toContain('id="page-content"');
  });

  it('should render a persistent cart container', () => {
    const html = renderApp();

    expect(html).toContain('id="cart-container"');
  });
});
