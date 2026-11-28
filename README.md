# MochiMood — Anime & Kawaii Goods Store

**A little joy in every package!**

MochiMood is a team-developed online store for anime collectibles, kawaii accessories, and cute merchandise. The project combines a soft visual design with product browsing and shopping cart functionality.

## Features

- **Home page** — introduces the MochiMood store and its concept.
- **Product catalog** — browse anime and kawaii products.
- **Product search** — find products by name.
- **Filtering** — filter products by category, price range, and availability.
- **Sorting** — sort products by price, rating, and name.
- **Product details** — view product descriptions, ratings, prices, and availability.
- **Shopping cart** — add products, change quantities, and remove items.
- **Promo codes** — apply promotional discounts in the cart.
- **Responsive design** — optimized for different screen sizes.

## Tech Stack

- TypeScript
- HTML5
- CSS3
- Vite
- Vitest
- jsdom
- Git and GitHub

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/vanmikkk/team-store.git
cd team-store
```

Install dependencies:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Open the local URL displayed in your terminal.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm test` | Run the test suite |
| `npm run build` | Type-check TypeScript and build the project |
| `npm run preview` | Preview the production build |

## Project Structure

```text
src/
├── components/
│   ├── Cart/
│   ├── FilterPanel/
│   ├── Navigation/
│   └── ProductCard/
├── data/
├── pages/
│   ├── AboutUs/
│   ├── Catalog/
│   └── ProductDetails/
├── types/
├── utils/
├── app.ts
├── main.ts
└── style.css

tests/
├── components/
├── pages/
└── utils/
```

## Team

**vanmikkk**
- UI/UX and visual design
- Navigation and application layout
- About Us page
- Product catalog, filters, and product cards
- Catalog and shopping cart integration

**shereoshek**
- Product Details page
- Shopping cart functionality
- Product quantity management
- Promo codes and cart persistence
- Shopping cart tests

## Development

The project is developed collaboratively using Git and GitHub. Team members work on separate branches and integrate their changes into the shared project branch.

---

*MochiMood — A little piece of anime magic.*