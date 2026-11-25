
import { describe, expect, it } from 'vitest';
import { renderAboutUs } from '../../src/pages/AboutUs/AboutUs';

describe('renderAboutUs', () => {
  it('should render the MochiMood store name', () => {
    const html = renderAboutUs();

    expect(html).toContain('MochiMood');
  });

  it('should render the store description', () => {
    const html = renderAboutUs();

    expect(html).toContain('anime');
    expect(html).toContain('collectibles');
  });

  it('should render both team members', () => {
    const html = renderAboutUs();

    expect(html).toContain('vanmikkk');
    expect(html).toContain('shereoshek');
  });

  it('should render team members roles', () => {
    const html = renderAboutUs();

    expect(html).toContain('UI/UX');
    expect(html).toContain('Product Details');
  });

  it('should render a link to the catalog', () => {
    const html = renderAboutUs();

    expect(html).toContain('Explore catalog');
    expect(html).toContain('href="#catalog"');
  });
});
