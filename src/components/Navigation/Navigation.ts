import './Navigation.css';

export function renderNavigation(): string {
  return `
    <header class="navigation">
      <a class="navigation__brand" href="#home">
        MochiMood
      </a>

      <nav class="navigation__links" aria-label="Main navigation">
        <a href="#home">Home</a>
        <a href="#catalog">Catalog</a>
        <a href="#cart">Cart</a>
      </nav>
    </header>
  `;
}
