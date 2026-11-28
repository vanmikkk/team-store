import { renderNavigation } from './components/Navigation/Navigation';

export type AppRoute = 'home' | 'catalog' | 'cart' | 'product';

export function getRouteFromHash(hash: string): AppRoute {
  const route = hash.replace(/^#/, '');

  if (route === 'catalog' || route === 'cart') {
    return route;
  }

  if (getProductIdFromHash(hash) !== undefined) {
    return 'product';
  }

  return 'home';
}

export function getProductIdFromHash(
  hash: string,
): string | undefined {
  const route = hash.replace(/^#/, '');
  const match = route.match(/^product\/(.+)$/);

  if (!match) {
    return undefined;
  }

  try {
    return decodeURIComponent(match[1]);
  } catch {
    return undefined;
  }
}

export function renderApp(): string {
  return `
    ${renderNavigation()}
    <main id="page-content"></main>
    <section id="cart-container" hidden></section>
  `;
}