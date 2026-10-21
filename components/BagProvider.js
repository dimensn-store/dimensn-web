'use client';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const BagContext = createContext(null);
const KEY = 'dimensn-bag-v1';
const MAX_QTY = 10;

export function BagProvider({ children }) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || '[]');
      if (Array.isArray(saved)) setItems(saved.filter((i) => i && typeof i.id === 'string' && Number.isInteger(i.qty) && i.qty > 0));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch {}
  }, [items, ready]);

  const add = useCallback((item, qty = 1) => {
    setItems((list) => {
      const found = list.find((i) => i.id === item.id);
      if (found) return list.map((i) => (i.id === item.id ? { ...i, qty: Math.min(MAX_QTY, i.qty + qty) } : i));
      return [...list, { ...item, qty: Math.min(MAX_QTY, qty) }];
    });
    setOpen(true);
  }, []);

  const setQty = useCallback((id, qty) => {
    setItems((list) => (qty < 1 ? list.filter((i) => i.id !== id) : list.map((i) => (i.id === id ? { ...i, qty: Math.min(MAX_QTY, qty) } : i))));
  }, []);

  const remove = useCallback((id) => setItems((list) => list.filter((i) => i.id !== id)), []);

  const value = useMemo(() => {
    const count = items.reduce((n, i) => n + i.qty, 0);
    const subtotal = items.reduce((n, i) => n + i.qty * (Number(i.price) || 0), 0);
    return { items, count, subtotal, open, setOpen, add, setQty, remove, ready };
  }, [items, open, add, setQty, remove, ready]);

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}

export function useBag() {
  const ctx = useContext(BagContext);
  if (!ctx) throw new Error('useBag must be used inside BagProvider');
  return ctx;
}
