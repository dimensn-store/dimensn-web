import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-brand">
        <span className="logo">DIMENSN</span>
        <p>Fashion in Full Dimension.</p>
      </div>
      <nav aria-label="Footer" className="footer-nav">
        <Link href="/shop">Shop</Link>
        <Link href="/about">About</Link>
        <Link href="/contact">Contact</Link>
        <Link href="/returns">Returns</Link>
      </nav>
      <p className="meta">© {new Date().getFullYear()} DIMENSN · Demo store, no real orders yet.</p>
    </footer>
  );
}
