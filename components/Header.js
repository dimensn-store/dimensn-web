'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useBag } from './BagProvider';

const NAV = [
  { href: '/shop', label: 'Shop' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' }
];

export default function Header({ announce }) {
  const { count, setOpen, ready } = useBag();
  const path = usePathname();
  const [menu, setMenu] = useState(false);
  useEffect(() => setMenu(false), [path]);

  return (
    <>
      {announce ? <div className="announce">{announce}</div> : null}
      <header className="site-header">
        <Link href="/" className="logo" aria-label="DIMENSN home">
          <span className="logo-mark" aria-hidden="true"><i /><i /><i /></span>
          DIMENSN
        </Link>
        <button className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu((m) => !m)}>
          {menu ? 'Close' : 'Menu'}
        </button>
        <nav id="main-nav" className={'main-nav' + (menu ? ' is-open' : '')} aria-label="Main">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} aria-current={path.startsWith(n.href) ? 'page' : undefined}>{n.label}</Link>
          ))}
        </nav>
        <div className="header-actions">
          <button className="bag-btn" onClick={() => setOpen(true)} aria-label={`Bag, ${ready ? count : 0} items`}>
            Bag <span className="bag-count">{ready ? count : 0}</span>
          </button>
        </div>
      </header>
    </>
  );
}
