import Link from 'next/link';
import { products, categories, heroProduct } from '../lib/catalog';
import { site } from '../lib/site';
import Hero3D from '../components/Hero3D';
import ProductCard from '../components/ProductCard';

export default function Home() {
  return (
    <>
      <section className="hero">
        <Hero3D model={heroProduct.glb} alt={heroProduct.name + ', turning slowly in 3D'} />
        <div className="hero-copy">
          <h1>{site.heroTitle}</h1>
          <p>{site.heroText}</p>
          <Link href="/shop" className="btn">{site.heroCta}</Link>
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>{site.dropTitle}</h2>
          <Link href="/shop" className="text-btn">See all</Link>
        </div>
        <div className="rail" tabIndex={0} aria-label="Featured products, scroll sideways">
          {products.map((p) => <ProductCard key={p.sku} product={p} />)}
        </div>
      </section>

      <section className="section">
        <h2>Shop by category</h2>
        <div className="cats">
          {categories.map((c) => (
            <Link key={c.slug} href={'/shop?cat=' + c.slug} className="cat">
              <img src={c.image} alt="" loading="lazy" />
              <span>{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section craft">
        <div className="craft-img"><img src="/images/site/materials.jpg" alt="Close-up of woven technical fabric" loading="lazy" /></div>
        <div>
          <h2>{site.craftTitle}</h2>
          <p className="prose">{site.craftText}</p>
        </div>
      </section>
    </>
  );
}
