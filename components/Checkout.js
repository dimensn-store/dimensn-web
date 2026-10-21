'use client';
import { useState } from 'react';
import { site } from '../lib/site';

// Demo checkout. Swap for Razorpay at launch.
export default function Checkout() {
  const [shown, setShown] = useState(false);
  return (
    <>
      <button className="btn btn-block" onClick={() => setShown(true)}>Checkout</button>
      <p className="meta" role="status">{shown ? site.checkoutNote : ''}</p>
    </>
  );
}
