import { products, categories } from '../../lib/catalog';
import ShopGrid from '../../components/ShopGrid';

export const metadata = { title: 'Shop' };

export default function Shop() {
  return (
    <section className="section page">
      <h1>Shop</h1>
      <ShopGrid products={products} categories={categories} />
    </section>
  );
}
