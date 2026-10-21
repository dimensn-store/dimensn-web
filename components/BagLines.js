'use client';
import Link from 'next/link';
import { useBag } from './BagProvider';
import { money } from '../lib/format';

export default function BagLines({ onNavigate }) {
  const { items, setQty, remove } = useBag();
  return (
    <ul className="bag-lines">
      {items.map((i) => (
        <li key={i.id} className="bag-line">
          <Link href={'/product/' + i.slug} onClick={onNavigate} className="bag-thumb">
            {i.image ? <img src={i.image} alt="" loading="lazy" /> : null}
          </Link>
          <div className="bag-info">
            <Link href={'/product/' + i.slug} onClick={onNavigate} className="bag-name">{i.name}</Link>
            {i.options ? <span className="meta">{i.options}</span> : null}
            <span className="bag-price">{money(i.price)}</span>
            <div className="qty" role="group" aria-label={'Quantity for ' + i.name}>
              <button onClick={() => setQty(i.id, i.qty - 1)} aria-label="One less">−</button>
              <span aria-live="polite">{i.qty}</span>
              <button onClick={() => setQty(i.id, i.qty + 1)} aria-label="One more" disabled={i.qty >= 10}>+</button>
              <button className="text-btn" onClick={() => remove(i.id)}>Remove</button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
