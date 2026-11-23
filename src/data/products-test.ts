import type { Product } from '../types/Product';

export const products: Product[] = [
  {
    id: '1',
    name: 'Reimu Hakurei Fumo',
    description: 'Classic Reimu Hakurei collectible Fumo plush.',
    price: 35,
    category: 'Fumo Plush',
    character: 'Reimu Hakurei',
    series: 'Touhou Project',
    image: '/images/fumo-reimu.jpg',
    rating: 4.9,
    inStock: true,
  },
  {
    id: '2',
    name: 'Marisa Kirisame Fumo',
    description: 'Adorable Marisa Kirisame collectible Fumo plush.',
    price: 35,
    category: 'Fumo Plush',
    character: 'Marisa Kirisame',
    series: 'Touhou Project',
    image: '/images/fumo-marisa.jpg',
    rating: 4.8,
    inStock: true,
  },
];