import Link from 'next/link';
export default function NotFound() {
  return (
    <section className="section page narrow">
      <h1>Page not found</h1>
      <p>This page doesn’t exist or the piece has sold out.</p>
      <Link href="/shop" className="btn">Back to the shop</Link>
    </section>
  );
}
