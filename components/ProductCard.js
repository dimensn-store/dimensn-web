import Link from 'next/link';
import { money } from '../lib/format';

export default function ProductCard({ product }) {
  return (
    <Link href={'/product/' + product.slug} className="card">
      <div className="card-media">
        <img src={product.thumb} alt={product.name} width="600" height="600" loading="lazy" />
        <span className="badge">3D</span>
      </div>
      <div className="card-body">
        <span className="card-name">{product.name}</span>
        <span className="card-price">{money(product.price)}</span>
      </div>
    </Link>
  );
}
