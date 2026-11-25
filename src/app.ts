import { renderNavigation } from './components/Navigation/Navigation';

export type AppRoute = 'home' | 'catalog' | 'cart';

export function getRouteFromHash(hash: string): AppRoute {
  const route = hash.replace(/^#/, '');

  if (route === 'catalog' || route === 'cart') {
    return route;
  }

  return 'home';
}

export function renderApp(): string {
  return `
    ${renderNavigation()}
    <main id="page-content"></main>
    <section id="cart-container" hidden></section>
  `;
}