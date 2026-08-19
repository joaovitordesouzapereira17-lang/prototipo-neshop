"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingCart, X, CheckCircle2 } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { PRODUCTS, money } from "@/lib/products";
import { categoryIcon } from "@/lib/category-icons";

export default function CarrinhoPage() {
  const { cart, changeQty, removeItem } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const items = cart
    .map((item) => ({ item, product: PRODUCTS.find((p) => p.id === item.id) }))
    .filter((x) => x.product);
  const subtotal = items.reduce((s, { item, product }) => s + (product!.price * item.qty), 0);

  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Carrinho</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-semibold tracking-tight text-navy-950">Seu carrinho</h1>
        <p className="mt-2">
          <span className="badge-proto">Simulação — nenhum pagamento é processado neste protótipo</span>
        </p>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-7 pb-15 items-start">
        <div>
          {items.length === 0 ? (
            <div className="text-center py-17.5 text-ink-500">
              <ShoppingCart size={48} strokeWidth={1.4} className="mx-auto mb-4" />
              <p className="font-bold text-navy-950">Seu carrinho está vazio</p>
              <p className="mt-1.5">Explore nosso catálogo e encontre a peça certa para o seu equipamento.</p>
              <div className="flex justify-center mt-7.5">
                <Link href="/categorias" className="btn btn-primary">Ver categorias</Link>
              </div>
            </div>
          ) : (
            items.map(({ item, product: p }) => {
              const Icon = categoryIcon(p!.cat);
              return (
              <div key={item.id} className="card flex flex-wrap gap-3.5 p-4 mb-3.5 items-center">
                <div className="w-18.5 h-18.5 rounded-lg bg-bg flex items-center justify-center text-ink-300 flex-shrink-0">
                  <Icon size={26} strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-[140px]">
                  <div className="font-bold text-sm text-navy-950">{p!.name}</div>
                  <div className="text-xs text-ink-500 mt-1">
                    {p!.brand} · Modelo {p!.modelo} · Cód. {p!.codigo}
                  </div>
                </div>
                <div className="w-full sm:w-auto flex items-center justify-between sm:justify-end gap-3">
                  <div className="flex items-center border border-line rounded-lg overflow-hidden flex-shrink-0">
                    <button type="button" onClick={() => changeQty(item.id, -1)} className="w-7 h-7 border-none bg-bg font-extrabold text-sm">−</button>
                    <span className="w-8 text-center text-[13.5px] font-bold">{item.qty}</span>
                    <button type="button" onClick={() => changeQty(item.id, 1)} className="w-7 h-7 border-none bg-bg font-extrabold text-sm">+</button>
                  </div>
                  <div className="font-extrabold text-navy-950 text-[15px] flex-shrink-0">{money(p!.price * item.qty)}</div>
                  <button type="button" onClick={() => removeItem(item.id)} className="btn btn-secondary flex-shrink-0">Remover</button>
                </div>
              </div>
              );
            })
          )}
        </div>

        {items.length > 0 && (
          <aside className="card p-5.5 md:sticky md:top-[142px]">
            <h3 className="text-[15.5px] font-extrabold text-navy-950 mb-4">Resumo do pedido</h3>
            <div className="flex justify-between text-sm text-ink-700 mb-2.5">
              <span>Subtotal</span><span>{money(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-ink-700 mb-2.5">
              <span>Frete</span><span>Calculado a seguir</span>
            </div>
            <div className="flex justify-between text-[17px] font-extrabold text-navy-950 border-t border-line-soft pt-3.5 mt-1.5">
              <span>Total</span><span>{money(subtotal)}</span>
            </div>
            <button type="button" onClick={() => setCheckoutOpen(true)} className="btn btn-primary btn-lg btn-block mt-4">
              Finalizar compra (simulado)
            </button>
            <Link href="/categorias" className="btn btn-secondary btn-block mt-2.5">Continuar comprando</Link>
          </aside>
        )}
      </div>

      {checkoutOpen && (
        <div
          className="fixed inset-0 bg-[rgba(11,31,51,.55)] flex items-center justify-center z-[100] p-5"
          onClick={(e) => e.target === e.currentTarget && setCheckoutOpen(false)}
        >
          <div className="bg-white rounded-lg max-w-[420px] w-full p-7 shadow-lg relative">
            <button
              type="button"
              onClick={() => setCheckoutOpen(false)}
              className="absolute top-3.5 right-3.5 border-none bg-line-soft w-[30px] h-[30px] rounded-full text-ink-700 flex items-center justify-center"
            >
              <X size={16} strokeWidth={2} />
            </button>
            <h3 className="text-lg font-extrabold text-navy-950 flex items-center gap-2.5">
              <CheckCircle2 size={20} strokeWidth={1.8} className="text-green-600" /> Pedido simulado com sucesso
            </h3>
            <p className="mt-2.5 text-sm text-ink-700 leading-relaxed">
              Este é um protótipo de UX/UI — nenhuma compra real foi realizada. Em uma implementação final, aqui
              entraria o fluxo de pagamento.
            </p>
            <Link href="/" className="btn btn-primary btn-block mt-5" onClick={() => setCheckoutOpen(false)}>
              Voltar para a Home
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
