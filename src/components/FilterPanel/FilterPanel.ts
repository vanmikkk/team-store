
import { products } from '../../data/products';
import type { ProductFilters } from '../../types/ProductFilters';
import './FilterPanel.css';

export function renderFilterPanel(
  filters: ProductFilters = { searchQuery: '' },
): string {
  const categories = [...new Set(products.map((product) => product.category))];

  return `
    <section class="filter-panel">
      <div class="filter-panel__search">
        <label for="catalog-search">Search products</label>
        <input
          id="catalog-search"
          type="search"
          name="searchQuery"
          placeholder="Search by product name..."
          value="${filters.searchQuery}"
        />
      </div>

      <div class="filter-panel__group">
        <label for="category-filter">Category</label>
        <select id="category-filter" name="category">
          <option value="">All categories</option>
          ${categories
            .map(
              (category) => `
                <option
                  value="${category}"
                  ${filters.category === category ? 'selected' : ''}
                >
                  ${category}
                </option>
              `,
            )
            .join('')}
        </select>
      </div>

      <div class="filter-panel__group">
        <label>Price range ($)</label>
        <div class="filter-panel__price">
          <input
            type="number"
            name="minPrice"
            placeholder="Min"
            min="0"
            value="${filters.minPrice ?? ''}"
          />
          <input
            type="number"
            name="maxPrice"
            placeholder="Max"
            min="0"
            value="${filters.maxPrice ?? ''}"
          />
        </div>
      </div>

      <div class="filter-panel__group">
        <label for="sort-filter">Sort by</label>
        <select id="sort-filter" name="sortBy">
          <option value="default">Default</option>
          <option value="price-asc" ${filters.sortBy === 'price-asc' ? 'selected' : ''}>
            Price: low to high
          </option>
          <option value="price-desc" ${filters.sortBy === 'price-desc' ? 'selected' : ''}>
            Price: high to low
          </option>
          <option value="rating-desc" ${filters.sortBy === 'rating-desc' ? 'selected' : ''}>
            Highest rating
          </option>
          <option value="name-asc" ${filters.sortBy === 'name-asc' ? 'selected' : ''}>
            Name: A–Z
          </option>
        </select>
      </div>

      <label class="filter-panel__stock">
        <input
          type="checkbox"
          name="inStock"
          ${filters.inStock === true ? 'checked' : ''}
        />
        Only in stock
      </label>
    </section>
  `;
}
