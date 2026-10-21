import { notFound } from 'next/navigation';
import Link from 'next/link';
import { products, getProduct } from '../../../lib/catalog';
import ProductView from '../../../components/ProductView';
import ProductCard from '../../../components/ProductCard';

export const dynamicParams = false;
export function generateStaticParams() { return products.map((p) => ({ slug: p.slug })); }

export async function generateMetadata({ params }) {
  const p = getProduct((await params).slug);
  return p ? { title: p.name, description: p.short, openGraph: { images: [p.image] } } : { title: 'Not found' };
}

export default async function ProductPage({ params }) {
  const product = getProduct((await params).slug);
  if (!product) notFound();
  const related = products.filter((p) => p.sku !== product.sku && p.category === product.category).concat(products.filter((p) => p.category !== product.category)).slice(0, 4);
  return (
    <>
      <nav className="crumbs section" aria-label="Breadcrumb">
        <Link href="/shop">Shop</Link> / <Link href={'/shop?cat=' + product.category}>{product.categoryName}</Link>
      </nav>
      <section className="section">
        <ProductView product={product} />
        <div className="pdp-text prose">
          <h2>Details</h2>
          <p>{product.description}</p>
        </div>
      </section>
      <section className="section">
        <h2>You may also like</h2>
        <div className="grid">{related.map((p) => <ProductCard key={p.sku} product={p} />)}</div>
      </section>
    </>
  );
}
