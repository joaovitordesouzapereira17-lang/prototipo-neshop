"use client";

import Link from "next/link";
import { useCart } from "@/lib/cart-context";
import { useRouter } from "next/navigation";
import { money, starsHtml, type Product } from "@/lib/products";

export function ProductCard({ product: p }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();

  function handleBuy(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p.id);
    router.push("/carrinho");
  }

  return (
    <Link
      href={`/produto?id=${p.id}`}
      className="card overflow-hidden flex flex-col hover:shadow-md hover:border-blue-500 transition-shadow"
    >
      <div className="aspect-square bg-bg flex items-center justify-center text-4xl border-b border-line-soft relative text-ink-300">
        {p.orig && (
          <span className="absolute top-2.5 left-2.5 bg-green-600 text-white text-[10.5px] font-bold px-2 py-1 rounded-md">
            Original
          </span>
        )}
        <span>{p.icon}</span>
      </div>
      <div className="p-3.5 pb-4 flex flex-col gap-1.5 flex-1">
        <span className="text-[11.5px] font-bold text-blue-600 uppercase tracking-wide">{p.brand}</span>
        <span className="text-sm font-bold text-navy-950 leading-tight min-h-[38px]">{p.name}</span>
        <span className="text-xs text-ink-500">
          Modelo {p.modelo} · Cód. {p.codigo}
        </span>
        <span className="text-xs text-star flex items-center gap-1.5">
          {starsHtml(p.rating)} <span className="text-ink-500">{p.rating} ({p.reviews})</span>
        </span>
        <div className="mt-auto pt-1.5">
          <div className="text-[19px] font-extrabold text-navy-950">{money(p.price)}</div>
          <div className="text-xs text-ink-500">{p.installment}</div>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          className="mt-2.5 bg-orange-500 hover:bg-orange-600 text-white border-none rounded-lg py-2.5 font-bold text-[13.5px] text-center w-full"
        >
          Comprar
        </button>
      </div>
    </Link>
  );
}
