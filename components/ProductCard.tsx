"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { money, type Product } from "@/lib/products";
import { categoryIcon } from "@/lib/category-icons";
import { StarRating } from "@/components/StarRating";

export function ProductCard({ product: p }: { product: Product }) {
  const { addToCart } = useCart();
  const router = useRouter();
  const [favorited, setFavorited] = useState(false);
  const Icon = categoryIcon(p.cat);

  const discountPct = p.oldPrice ? Math.round((1 - p.price / p.oldPrice) * 100) : null;

  function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addToCart(p.id);
    router.push("/carrinho");
  }

  function handleToggleFavorite(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setFavorited((v) => !v);
  }

  return (
    <Link
      href={`/produto?id=${p.id}`}
      className="group relative flex flex-col bg-navy-800 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10"
    >
      {/* Área da imagem */}
      <div className="relative aspect-square bg-white/[0.04] flex items-center justify-center overflow-hidden">
        {discountPct !== null && (
          <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10.5px] font-bold px-2.5 py-1 rounded-full">
            {discountPct}% OFF
          </span>
        )}

        <button
          type="button"
          onClick={handleToggleFavorite}
          aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
          className={`absolute top-3 right-3 z-10 w-8 h-8 rounded-full border flex items-center justify-center backdrop-blur transition-colors ${
            favorited ? "bg-red-600 border-red-600 text-white" : "bg-navy-950/30 border-white/20 text-white hover:border-white/40"
          }`}
        >
          <Heart size={14} strokeWidth={2} fill={favorited ? "currentColor" : "none"} />
        </button>

        <Icon size={64} strokeWidth={1.2} className="text-white/25 transition-transform duration-300 ease-in-out group-hover:scale-105" />

        {/* Overlay de ações rápidas — sempre visível em telas pequenas (sem hover), revelado no hover em telas grandes */}
        <div
          className="absolute inset-0 bg-navy-800/95 backdrop-blur-sm flex flex-col justify-center gap-3 p-4
                     opacity-100 translate-y-0
                     lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0
                     transition-all duration-300 ease-in-out"
        >
          <ul className="space-y-1.5 text-[11.5px] text-white/75 leading-snug">
            <li className="flex gap-1.5">
              <span className="text-blue-500">•</span>Código OEM: {p.codigo}
            </li>
            <li className="flex gap-1.5">
              <span className="text-blue-500">•</span>Compatível com: {p.modelo}
            </li>
            <li className="flex gap-1.5">
              <span className="text-blue-500">•</span>{p.orig ? "Peça original" : "Peça compatível"}
            </li>
          </ul>
          <button
            type="button"
            onClick={handleAddToCart}
            className="w-full bg-blue-500 hover:bg-blue-600 text-navy-950 font-bold text-[13px] rounded-lg py-2.5 flex items-center justify-center gap-2"
          >
            <ShoppingBag size={15} strokeWidth={2} /> Adicionar ao carrinho
          </button>
          <span className="text-center text-[12px] font-semibold text-white/70 group-hover:text-white transition-colors">
            Ver especificações completas
          </span>
        </div>
      </div>

      {/* Informações do produto */}
      <div className="p-3.5 pb-4 flex flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs">
          <StarRating rating={p.rating} />
          <span className="text-white/50">{p.rating} ({p.reviews} avaliações)</span>
        </div>
        <span className="text-[11.5px] font-bold text-blue-400 uppercase tracking-wide">{p.brand}</span>
        <h3 className="text-sm font-bold text-white leading-tight min-h-[38px]">{p.name}</h3>
        <div className="flex items-baseline gap-2 mt-0.5">
          <span className="text-[19px] font-extrabold text-white">{money(p.price)}</span>
          {p.oldPrice && <span className="text-white/40 text-xs line-through">{money(p.oldPrice)}</span>}
        </div>
        <div className="text-white/40 text-xs">{p.installment}</div>
      </div>
    </Link>
  );
}
