
import type { ProductFilters } from '../../types/ProductFilters';
import { renderCatalog } from './Catalog';
import { renderFilterPanel } from '../../components/FilterPanel/FilterPanel';

export function renderCatalogPage(): string {
  const filters: ProductFilters = {
    searchQuery: '',
  };

  return `
    <div class="catalog-page">
      ${renderFilterPanel(filters)}
      <div id="catalog-results">
        ${renderCatalog(filters)}
      </div>
    </div>
  `;
}

export function setupCatalogPage(): void {
  const page = document.querySelector<HTMLElement>('.catalog-page');

  if (!page) return;

  const filters: ProductFilters = {
    searchQuery: '',
  };

  const updateCatalog = (): void => {
    const results = page.querySelector<HTMLElement>('#catalog-results');

    if (!results) return;

    results.innerHTML = renderCatalog(filters);
  };

  page.addEventListener('input', (event: Event) => {
    const target = event.target;

    if (!(target instanceof HTMLInputElement)) return;

    if (target.name === 'searchQuery') {
      filters.searchQuery = target.value;
      updateCatalog();
    }

    if (target.name === 'minPrice') {
      filters.minPrice = target.value === '' ? undefined : Number(target.value);
      updateCatalog();
    }

    if (target.name === 'maxPrice') {
      filters.maxPrice = target.value === '' ? undefined : Number(target.value);
      updateCatalog();
    }
  });

  page.addEventListener('change', (event: Event) => {
    const target = event.target;

    if (target instanceof HTMLSelectElement) {
      if (target.name === 'category') {
        filters.category = target.value || undefined;
      }

      if (target.name === 'sortBy') {
        filters.sortBy = target.value as ProductFilters['sortBy'];
      }

      updateCatalog();
    }

    if (target instanceof HTMLInputElement && target.name === 'inStock') {
      filters.inStock = target.checked ? true : undefined;
      updateCatalog();
    }
  });
}
