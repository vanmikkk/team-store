import './style.css';

import { renderApp, getRouteFromHash, getProductIdFromHash } from './app';
import { renderAboutUs } from './pages/AboutUs/AboutUs';
import {
  renderCatalogPage,
  setupCatalogPage,
} from './pages/Catalog/CatalogPage';
import { setupCart } from './components/Cart/Cart';
import { products } from './data/products';
import { renderProductDetails } from './pages/ProductDetails/ProductDetails';

const app = document.querySelector<HTMLDivElement>('#app');

if (!app) {
  throw new Error('App root element was not found');
}

app.innerHTML = renderApp();

const pageContent = document.querySelector<HTMLElement>('#page-content');
const cartContainer = document.querySelector<HTMLElement>('#cart-container');

if (!pageContent || !cartContainer) {
  throw new Error('App containers were not found');
}

const page = pageContent;
const cart = cartContainer;

const cartController = setupCart(cart);

function renderRoute(): void {
  const route = getRouteFromHash(window.location.hash);

  if (route === 'cart') {
    page.hidden = true;
    cart.hidden = false;
    return;
  }

  cart.hidden = true;
  page.hidden = false;

  if (route === 'product') {
  const productId = getProductIdFromHash(window.location.hash);
  const product = products.find((item) => item.id === productId);

  const cartItem = product
    ? cartController.getItems().find((item) => item.id === product.id)
    : undefined;

  const quantity = cartItem?.quantity ?? 0;

  page.innerHTML = renderProductDetails(product, quantity);

  if (product) {
    const addToCartButton = page.querySelector<HTMLButtonElement>(
      '[data-action="add-to-cart"]',
    );

    addToCartButton?.addEventListener('click', () => {
      cartController.addProduct(product);
      renderRoute();
    });

    const increaseButton = page.querySelector<HTMLButtonElement>(
      '[data-action="increase"]',
    );

    increaseButton?.addEventListener('click', () => {
      cartController.changeQuantity(product.id, 1);
      renderRoute();
    });

    const decreaseButton = page.querySelector<HTMLButtonElement>(
      '[data-action="decrease"]',
    );

    decreaseButton?.addEventListener('click', () => {
      cartController.changeQuantity(product.id, -1);
      renderRoute();
    });
    }

    return;
  }

  if (route === 'catalog') {
    page.innerHTML = renderCatalogPage(cartController);
    setupCatalogPage(cartController);
    return;
  }

  page.innerHTML = renderAboutUs();
}

window.addEventListener('hashchange', renderRoute);

renderRoute();
