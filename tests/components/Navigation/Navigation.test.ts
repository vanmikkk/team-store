
import { describe, expect, it } from 'vitest';
import { renderNavigation } from '../../../src/components/Navigation/Navigation';

describe('renderNavigation', () => {
  it('should render the MochiMood brand name', () => {
    const html = renderNavigation();

    expect(html).toContain('MochiMood');
  });

  it('should render a link to the home page', () => {
    const html = renderNavigation();

    expect(html).toContain('href="#home"');
    expect(html).toContain('Home');
  });

  it('should render a link to the catalog', () => {
    const html = renderNavigation();

    expect(html).toContain('href="#catalog"');
    expect(html).toContain('Catalog');
  });

  it('should render a link to the cart', () => {
    const html = renderNavigation();

    expect(html).toContain('href="#cart"');
    expect(html).toContain('Cart');
  });

  it('should render navigation links inside a navigation element', () => {
    const html = renderNavigation();

    expect(html).toContain('<nav');
    expect(html).toContain('</nav>');
  });
});
