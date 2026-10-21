'use client';
import Link from 'next/link';
import { useBag } from '../../components/BagProvider';
import BagLines from '../../components/BagLines';
import { money } from '../../lib/format';
import Checkout from '../../components/Checkout';

export default function BagPage() {
  const { items, subtotal, ready } = useBag();
  return (
    <section className="section page bag-page">
      <h1>Your bag</h1>
      {!ready ? null : items.length === 0 ? (
        <div className="empty">
          <p>Nothing here yet. The drop is waiting.</p>
          <Link href="/shop" className="btn">Enter the drop</Link>
        </div>
      ) : (
        <div className="bag-layout">
          <BagLines />
          <div className="bag-summary">
            <div className="row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
            <Checkout />
          </div>
        </div>
      )}
    </section>
  );
}
