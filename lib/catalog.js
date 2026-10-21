// ── DIMENSN catalogue ───────────────────────────────────────────
// One block per product. Prices in rupees. [TBC] = placeholder.
// Photo: public/images/products/<file>.jpg  ·  3D model: public/models/<file>.glb

export const categories = [
  { slug: 'outerwear', name: 'Outerwear', image: '/images/products/ow-01.jpg' },
  { slug: 'streetwear-tops', name: 'Streetwear Tops', image: '/images/products/tp-01.jpg' },
  { slug: 'accessories', name: 'Accessories', image: '/images/site/cat-accessories.jpg' },
  { slug: 'footwear', name: 'Footwear', image: '/images/site/cat-footwear.jpg' }
];

const APPAREL = ['S', 'M', 'L', 'XL'];

export const products = [
  {
    sku: 'DMN-OW-01', slug: 'halo-puffer', name: 'Halo Puffer', category: 'outerwear', file: 'ow-01',
    price: 9999, colours: ['Cyber Sage', 'Black'], sizes: APPAREL,
    short: 'Stacked baffles, stand collar, soft matte shell.',
    description: '[TBC] Materials, fill, fit and care.'
  },
  {
    sku: 'DMN-OW-02', slug: 'vector-bomber', name: 'Vector Bomber', category: 'outerwear', file: 'ow-02',
    price: 7999, colours: ['Black'], sizes: APPAREL,
    short: 'Clean bomber, ribbed trims, silver zip, sleeve pocket.',
    description: '[TBC] Materials, lining, fit and care.'
  },
  {
    sku: 'DMN-TP-01', slug: 'null-hoodie', name: 'Null Hoodie', category: 'streetwear-tops', file: 'tp-01',
    price: 4499, colours: ['Black'], sizes: APPAREL,
    short: 'Heavy loopback hoodie with a relaxed drop shoulder.',
    description: '[TBC] Fabric weight, fit and care.'
  },
  {
    sku: 'DMN-TP-02', slug: 'plane-tee', name: 'Plane Tee', category: 'streetwear-tops', file: 'tp-02',
    price: 2499, colours: ['Silver Grey'], sizes: APPAREL,
    short: 'Boxy tee with a small metal mark on the chest.',
    description: '[TBC] Fabric, fit and care.'
  },
  {
    sku: 'DMN-AC-01', slug: 'orbit-sling', name: 'Orbit Sling', category: 'accessories', file: 'ac-01',
    price: 3499, colours: ['Black'], sizes: [],
    short: 'Compact sling with a quick-release metal buckle.',
    description: '[TBC] Dimensions, materials and care.'
  },
  {
    sku: 'DMN-FW-01', slug: 'rift-runner', name: 'Rift Runner', category: 'footwear', file: 'fw-01',
    price: 8999, colours: ['Black / Sage'], sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    short: 'Chunky runner with a sculpted sage sole and silver lines.',
    description: '[TBC] Upper, sole, fit and care.'
  }
].map((p) => ({
  ...p,
  image: `/images/products/${p.file}.jpg`,
  thumb: `/images/products/${p.file}-sm.jpg`,
  glb: `/models/${p.file}.glb`,
  categoryName: categories.find((c) => c.slug === p.category)?.name || ''
}));

export const heroProduct = products[0];
export const getProduct = (slug) => products.find((p) => p.slug === slug) || null;
