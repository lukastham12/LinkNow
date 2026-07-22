// Floral Showcase catalogue — owner-uploaded photos, each cut out onto a
// uniform grey studio background for a consistent, professional gallery.
// Labelled by flower type + colour (photos don't carry origin country).

export interface FlowerItem {
  name: string;
  image: string;
}

export interface FlowerCategory {
  category: string;
  items: FlowerItem[];
}

export const FLOWER_CATALOGUE: FlowerCategory[] = [
  {
    category: 'Roses',
    items: [
      { name: 'Pink Roses', image: '/flowers/pink-roses.webp' },
      { name: 'Red Roses', image: '/flowers/red-roses.webp' },
      { name: 'Peach Roses', image: '/flowers/peach-roses.webp' },
      { name: 'Premium Red Roses', image: '/flowers/premium-red-roses.webp' },
      { name: 'Peach Spray Roses', image: '/flowers/peach-spray-roses.webp' },
      { name: 'Blush Pink Roses', image: '/flowers/blush-pink-roses.webp' },
    ],
  },
  {
    category: 'Carnations',
    items: [
      { name: 'Pink Carnations', image: '/flowers/pink-carnations.webp' },
      { name: 'Blush Carnations', image: '/flowers/blush-carnations.webp' },
      { name: 'Yellow Carnations', image: '/flowers/yellow-carnations.webp' },
    ],
  },
  {
    category: 'Orchids',
    items: [
      { name: 'Pink Orchid', image: '/flowers/pink-orchid.webp' },
      { name: 'Cymbidium Orchid', image: '/flowers/cymbidium-orchid.webp' },
      { name: 'Orange Mokara Orchid', image: '/flowers/orange-mokara-orchid.webp' },
      { name: 'Yellow Oncidium Orchid', image: '/flowers/yellow-oncidium-orchid.webp' },
      { name: 'Pink Dendrobium Orchid', image: '/flowers/pink-dendrobium-orchid.webp' },
    ],
  },
  {
    category: 'Hydrangeas',
    items: [
      { name: 'Pink Hydrangea', image: '/flowers/pink-hydrangea.webp' },
      { name: 'Hot Pink Hydrangea', image: '/flowers/hot-pink-hydrangea.webp' },
      { name: 'Blue Hydrangea', image: '/flowers/blue-hydrangea.webp' },
    ],
  },
  {
    category: 'Lilies',
    items: [
      { name: 'White Lily', image: '/flowers/white-lily.webp' },
      { name: 'Pink Lilies', image: '/flowers/pink-lilies.webp' },
      { name: 'White Lilies', image: '/flowers/white-lilies.webp' },
    ],
  },
  {
    category: 'Sunflowers & Gerberas',
    items: [
      { name: 'Sunflowers', image: '/flowers/sunflowers.webp' },
      { name: 'Sunflower Bouquet', image: '/flowers/sunflower-bouquet.webp' },
      { name: 'Peach Gerberas', image: '/flowers/peach-gerberas.webp' },
    ],
  },
  {
    category: 'Chrysanthemums',
    items: [
      { name: 'Green Chrysanthemum', image: '/flowers/green-chrysanthemum.webp' },
      { name: 'Yellow Chrysanthemum', image: '/flowers/yellow-chrysanthemum.webp' },
      { name: 'Yellow Pompom Chrysanthemum', image: '/flowers/yellow-pompom-chrysanthemum.webp' },
      { name: 'Orange Spray Chrysanthemum', image: '/flowers/orange-spray-chrysanthemum.webp' },
    ],
  },
  {
    category: 'Fillers & More',
    items: [
      { name: 'Yellow Tulips', image: '/flowers/yellow-tulips.webp' },
      { name: 'Heliconia', image: '/flowers/heliconia.webp' },
      { name: 'Sweet William', image: '/flowers/sweet-william.webp' },
      { name: 'Baby\'s Breath', image: '/flowers/baby-s-breath.webp' },
      { name: 'Green Eustoma', image: '/flowers/green-eustoma.webp' },
      { name: 'Baby\'s Breath (White)', image: '/flowers/baby-s-breath-white.webp' },
      { name: 'Purple Statice', image: '/flowers/purple-statice.webp' },
      { name: 'Baby\'s Breath Cloud', image: '/flowers/baby-s-breath-cloud.webp' },
    ],
  },
];
