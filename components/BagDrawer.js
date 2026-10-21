'use client';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useBag } from './BagProvider';
import BagLines from './BagLines';
import { money } from '../lib/format';
import Checkout from './Checkout';

export default function BagDrawer() {
  const { open, setOpen, items, subtotal } = useBag();
  const panel = useRef(null);
  const lastFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    lastFocus.current = document.activeElement;
    panel.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
      if (e.key === 'Tab' && panel.current) {
        const f = panel.current.querySelectorAll('a[href],button:not([disabled])');
        if (!f.length) return;
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      lastFocus.current?.focus?.();
    };
  }, [open, setOpen]);

  return (
    <div className={'drawer-wrap' + (open ? ' is-open' : '')} aria-hidden={!open}>
      <div className="drawer-scrim" onClick={() => setOpen(false)} />
      <aside className="drawer" role="dialog" aria-modal="true" aria-label="Your bag" ref={panel} tabIndex={-1} inert={!open ? true : undefined}>
        <div className="drawer-head">
          <h2>Your bag</h2>
          <button className="text-btn" onClick={() => setOpen(false)}>Close</button>
        </div>
        {items.length === 0 ? (
          <div className="drawer-empty">
            <p>Nothing here yet. The drop is waiting.</p>
            <Link href="/shop" className="btn" onClick={() => setOpen(false)}>Enter the drop</Link>
          </div>
        ) : (
          <>
            <BagLines onNavigate={() => setOpen(false)} />
            <div className="drawer-foot">
              <div className="row"><span>Subtotal</span><strong>{money(subtotal)}</strong></div>
                            <Checkout />
              <Link className="text-btn center" href="/bag" onClick={() => setOpen(false)}>View bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
