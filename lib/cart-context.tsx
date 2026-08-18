"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { id: string; qty: number };

type CartContextValue = {
  cart: CartItem[];
  totalQty: number;
  addToCart: (id: string) => void;
  changeQty: (id: string, delta: number) => void;
  removeItem: (id: string) => void;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "neshop_cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setCart(JSON.parse(stored));
    } catch {
      // localStorage indisponível — carrinho fica só em memória nesta sessão.
    }
  }, []);

  const persist = useCallback((next: CartItem[]) => {
    setCart(next);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // localStorage indisponível — segue apenas em memória.
    }
  }, []);

  const addToCart = useCallback(
    (id: string) => {
      const existing = cart.find((i) => i.id === id);
      const next = existing
        ? cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i))
        : [...cart, { id, qty: 1 }];
      persist(next);
    },
    [cart, persist]
  );

  const changeQty = useCallback(
    (id: string, delta: number) => {
      const next = cart
        .map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i))
        .filter((i) => i.qty > 0);
      persist(next);
    },
    [cart, persist]
  );

  const removeItem = useCallback(
    (id: string) => {
      persist(cart.filter((i) => i.id !== id));
    },
    [cart, persist]
  );

  const totalQty = useMemo(() => cart.reduce((s, i) => s + i.qty, 0), [cart]);

  return (
    <CartContext.Provider value={{ cart, totalQty, addToCart, changeQty, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart deve ser usado dentro de <CartProvider>");
  return ctx;
}
