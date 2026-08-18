"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { useCart } from "@/lib/cart-context";
import { useWhatsApp } from "@/lib/whatsapp-context";
import { CAT_NAMES, PRODUCTS, money, starsHtml } from "@/lib/products";

type Tab = "desc" | "compat" | "reviews";

const REVIEWS = [
  { stars: "★★★★★", quote: "Peça original, chegou rápido e resolveu o problema do equipamento.", who: "Carlos M.", initial: "C" },
  { stars: "★★★★★", quote: "Atendimento tirou minha dúvida sobre o código antes da compra.", who: "Ana F.", initial: "A" },
  { stars: "★★★★☆", quote: "Produto bom, entrega dentro do prazo informado.", who: "Paulo R.", initial: "P" },
];

export function ProdutoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { open: openWhatsApp } = useWhatsApp();
  const [tab, setTab] = useState<Tab>("desc");

  const pid = searchParams.get("id") || "p01";
  const p = PRODUCTS.find((x) => x.id === pid) || PRODUCTS[0];
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const relatedList = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);

  function handleBuy() {
    if (!p.stock) {
      openWhatsApp(`Olá! Gostaria de ser avisado quando o produto '${p.name}' estiver disponível.`);
      return;
    }
    addToCart(p.id);
    router.push("/carrinho");
  }

  return (
    <>
      <div className="wrap">
        <div className="text-[13px] text-ink-500 pt-4">
          <Link href="/" className="text-blue-600 font-semibold">Início</Link>
          <span className="mx-1.5 text-ink-300">/</span>
          <Link href={`/categoria?cat=${p.cat}`} className="text-blue-600 font-semibold">{CAT_NAMES[p.cat]}</Link>
          <span className="mx-1.5 text-ink-300">/</span>
          <span>{p.name}</span>
        </div>
      </div>

      <div className="wrap grid md:grid-cols-[1fr_1.15fr] gap-11 py-7 pb-5">
        <div>
          <div className="aspect-square card flex items-center justify-center text-[80px] text-ink-300 mb-3 relative">
            {p.orig && (
              <span className="absolute top-4 left-4 bg-green-600 text-white text-xs font-bold px-2.5 py-1.5 rounded-md">
                Original
              </span>
            )}
            {p.icon}
          </div>
          <div className="flex gap-2.5">
            <div className="w-16 h-16 rounded-lg bg-white border-[1.5px] border-blue-500 flex items-center justify-center text-[22px] text-ink-300">
              {p.icon}
            </div>
            {["🔎", "📐", "📄"].map((ic) => (
              <div key={ic} className="w-16 h-16 rounded-lg bg-white border-[1.5px] border-line flex items-center justify-center text-[22px] text-ink-300">
                {ic}
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="text-[12.5px] font-bold text-blue-600 uppercase tracking-wide">{p.brand}</span>
          <h1 className="text-2xl font-extrabold text-navy-950 mt-2 leading-snug">{p.name}</h1>
          <div className="flex gap-4.5 mt-2.5 text-[13px] text-ink-500 flex-wrap">
            <span>Modelo: <b className="text-ink-900">{p.modelo}</b></span>
            <span>Código/OEM: <b className="text-ink-900">{p.codigo}</b></span>
          </div>
          <div className="flex items-center gap-2 mt-2.5 text-[13.5px] text-star">
            <span>{starsHtml(p.rating)}</span>
            <span className="text-blue-600 font-bold">{p.rating} ({p.reviews} avaliações)</span>
          </div>

          <div className="mt-5 card p-5.5">
            <div className="text-[30px] font-extrabold text-navy-950">{money(p.price)}</div>
            <div className="text-[13.5px] text-ink-500 mt-1">ou {p.installment}</div>
            <div className={`mt-3 flex items-center gap-2 text-[13.5px] font-bold ${p.stock ? "text-green-600" : "text-[#c94b2b]"}`}>
              <span className={`w-2 h-2 rounded-full ${p.stock ? "bg-green-600" : "bg-[#c94b2b]"}`} />
              {p.stock ? "Em estoque — envio imediato" : "Fora de estoque — consulte disponibilidade"}
            </div>
            <div className="mt-4.5 flex flex-col gap-2.5">
              <button type="button" onClick={handleBuy} className="btn btn-primary btn-lg btn-block">
                {p.stock ? "Comprar" : "Avisar quando disponível"}
              </button>
              <button
                type="button"
                onClick={() => openWhatsApp("Olá! Tenho uma dúvida sobre um produto do site.")}
                className="btn btn-whatsapp btn-lg btn-block"
              >
                💬 Falar no WhatsApp sobre esta peça
              </button>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-3">
              {[
                { ic: "✅", title: "Peça original", desc: "Garantia de procedência" },
                { ic: "🛡️", title: "Garantia", desc: "90 dias contra defeitos" },
                { ic: "🚚", title: "Envio", desc: "Para todo o Brasil" },
                { ic: "🎧", title: "Suporte técnico", desc: "Antes e depois da compra" },
              ].map((item) => (
                <div key={item.title} className="flex gap-2.5 items-start text-[12.5px] text-ink-700 bg-bg rounded-lg p-2.5">
                  <span className="text-lg">{item.ic}</span>
                  <div>
                    <b className="block text-ink-900 text-[12.5px]">{item.title}</b>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap mt-9">
        <div className="flex gap-1.5 border-b-[1.5px] border-line">
          {([
            ["desc", "Descrição"],
            ["compat", "Compatibilidade"],
            ["reviews", "Avaliações"],
          ] as [Tab, string][]).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setTab(value)}
              className={`border-none bg-transparent px-4.5 py-3.5 font-bold text-sm -mb-[1.5px] border-b-[2.5px] ${
                tab === value ? "text-navy-950 border-orange-500" : "text-ink-500 border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {tab === "desc" && (
          <div className="py-6 text-sm text-ink-700 leading-relaxed">
            Peça de reposição indicada para o modelo informado. Componente testado e revisado, seguindo os padrões
            técnicos do fabricante para garantir o funcionamento correto do equipamento.
          </div>
        )}
        {tab === "compat" && (
          <div className="py-6 text-sm text-ink-700 leading-relaxed">
            <p>Esta peça é compatível com os seguintes modelos:</p>
            <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-1.5">
              {[p.modelo, `${p.modelo} (variante A)`, `${p.modelo} (variante B)`, "Consulte outros modelos compatíveis"].map((m) => (
                <li key={m} className="bg-bg rounded-md px-3 py-2.5 text-[13px] text-ink-900 font-semibold">
                  {m}
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === "reviews" && (
          <div className="py-6">
            <div className="grid md:grid-cols-3 gap-4.5">
              {REVIEWS.map((r) => (
                <div key={r.who} className="card p-5.5">
                  <div className="text-star text-sm">{r.stars}</div>
                  <p className="mt-3 text-sm text-ink-700 leading-relaxed">&quot;{r.quote}&quot;</p>
                  <div className="mt-3.5 text-[13px] font-bold text-navy-950 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-extrabold text-xs">
                      {r.initial}
                    </span>
                    {r.who}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-xs text-ink-300 mt-4.5 text-center">Textos ilustrativos para fins de protótipo.</p>
          </div>
        )}
      </div>

      <section className="py-13 bg-white border-t border-line-soft mt-9">
        <div className="wrap">
          <div className="mb-6.5">
            <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Produtos relacionados</h2>
            <p className="text-ink-500 text-[14.5px] mt-1.5">Outras peças da mesma categoria que podem te interessar.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
            {relatedList.map((rp) => (
              <ProductCard key={rp.id} product={rp} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
