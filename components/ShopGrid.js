'use client';
import { useEffect, useMemo, useState } from 'react';
import ProductCard from './ProductCard';

export default function ShopGrid({ products, categories }) {
  const [cat, setCat] = useState('');
  const [q, setQ] = useState('');

  useEffect(() => {
    const c = new URLSearchParams(window.location.search).get('cat');
    if (c && categories.some((x) => x.slug === c)) setCat(c);
  }, [categories]);

  const shown = useMemo(() => {
    const term = q.trim().toLowerCase();
    return products.filter((p) => (!cat || p.category === cat) && (!term || p.name.toLowerCase().includes(term)));
  }, [products, cat, q]);

  const pick = (slug) => {
    setCat(slug);
    const url = new URL(window.location.href);
    slug ? url.searchParams.set('cat', slug) : url.searchParams.delete('cat');
    window.history.replaceState(null, '', url);
  };

  return (
    <>
      <div className="shop-tools">
        <div className="pills" role="group" aria-label="Filter by category">
          <button aria-pressed={!cat} onClick={() => pick('')}>All</button>
          {categories.map((c) => <button key={c.slug} aria-pressed={cat === c.slug} onClick={() => pick(c.slug)}>{c.name}</button>)}
        </div>
        <label className="search">
          <span className="sr-only">Search products</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" />
        </label>
      </div>
      <p className="meta" aria-live="polite">{shown.length} {shown.length === 1 ? 'piece' : 'pieces'}</p>
      {shown.length
        ? <div className="grid">{shown.map((p) => <ProductCard key={p.sku} product={p} />)}</div>
        : <p className="empty">Nothing matches. Clear the search or pick another category.</p>}
    </>
  );
}
