"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import {
  MessageCircle, Heart, Share2, ShoppingCart, Tag, ShieldCheck, CheckCircle2, Truck,
  ChevronLeft, ChevronRight, ChevronDown, Search, Ruler, FileText, Info,
} from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { StarRating } from "@/components/StarRating";
import { useCart } from "@/lib/cart-context";
import { useWhatsApp } from "@/lib/whatsapp-context";
import { CAT_NAMES, PRODUCTS, money, typeOf } from "@/lib/products";
import { categoryIcon } from "@/lib/category-icons";

const GALLERY_EXTRA_ICONS = [Search, Ruler, FileText];

const TYPE_LABELS: Record<string, string> = {
  placa: "Placa",
  motor: "Motor / Compressor",
  outros: "Peça",
};

const REVIEWS = [
  { rating: 5, quote: "Peça original, chegou rápido e resolveu o problema do equipamento.", who: "Carlos M.", initial: "C" },
  { rating: 5, quote: "Atendimento tirou minha dúvida sobre o código antes da compra.", who: "Ana F.", initial: "A" },
  { rating: 4, quote: "Produto bom, entrega dentro do prazo informado.", who: "Paulo R.", initial: "P" },
];

export function ProdutoClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { open: openWhatsApp } = useWhatsApp();

  const pid = searchParams.get("id") || "p01";
  const p = PRODUCTS.find((x) => x.id === pid) || PRODUCTS[0];
  const related = PRODUCTS.filter((x) => x.cat === p.cat && x.id !== p.id).slice(0, 4);
  const relatedList = related.length ? related : PRODUCTS.filter((x) => x.id !== p.id).slice(0, 4);
  const CatIcon = categoryIcon(p.cat);
  const gallery = [CatIcon, ...GALLERY_EXTRA_ICONS];

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [favorited, setFavorited] = useState(false);
  const [shared, setShared] = useState(false);
  const [descExpanded, setDescExpanded] = useState(false);
  const GalleryIcon = gallery[galleryIndex];

  function handleBuy() {
    if (!p.stock) {
      openWhatsApp(`Olá! Gostaria de ser avisado quando o produto '${p.name}' estiver disponível.`);
      return;
    }
    addToCart(p.id);
    router.push("/carrinho");
  }

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) {
        await navigator.share({ title: p.name, url });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        setShared(true);
        setTimeout(() => setShared(false), 1800);
      }
    } catch {
      // Usuário cancelou o compartilhamento — nada a fazer.
    }
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

      {/* Ficha split-screen */}
      <div className="wrap py-6">
        <div className="bg-navy-800 rounded-2xl border border-white/10 p-4 md:p-6 grid md:grid-cols-2 gap-6 md:gap-8">
          {/* Lado esquerdo — galeria */}
          <div>
            <div className="relative aspect-square rounded-2xl bg-white/[0.04] flex items-center justify-center overflow-hidden">
              {p.orig && (
                <span className="absolute top-4 left-4 z-10 bg-green-600 text-white text-xs font-semibold px-2.5 py-1.5 rounded-md">
                  Original
                </span>
              )}

              <button
                type="button"
                onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                aria-label="Imagem anterior"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-navy-950/40 border border-white/15 text-white flex items-center justify-center hover:bg-navy-950/60"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
                aria-label="Próxima imagem"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-navy-950/40 border border-white/15 text-white flex items-center justify-center hover:bg-navy-950/60"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>

              <GalleryIcon size={96} strokeWidth={1.1} className="text-white/25" />

              {/* Botão "Buscar peças compatíveis" sobreposto no rodapé */}
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-navy-950/70 to-transparent">
                <Link
                  href={`/categoria?cat=${p.cat}`}
                  className="w-full flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 text-white font-semibold text-[13px] rounded-lg py-2.5 transition-colors"
                >
                  <Search size={15} strokeWidth={2} /> Buscar peças compatíveis
                </Link>
              </div>
            </div>

            {/* Paginação (dots) */}
            <div className="flex justify-center gap-1.5 mt-3.5">
              {gallery.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setGalleryIndex(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === galleryIndex ? "w-5 bg-blue-500" : "w-1.5 bg-white/20"}`}
                />
              ))}
            </div>
          </div>

          {/* Lado direito — informações */}
          <div className="flex flex-col text-white">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[12.5px] font-semibold text-blue-400 uppercase tracking-wide">{p.brand}</span>
                <h1 className="text-2xl font-extrabold mt-1.5 leading-snug">
                  {p.name} <span className="text-white/40 font-mono text-xl tracking-tight">— {p.codigo}</span>
                </h1>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setFavorited((v) => !v)}
                  aria-label={favorited ? "Remover dos favoritos" : "Adicionar aos favoritos"}
                  className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                    favorited ? "bg-red-600 border-red-600 text-white" : "border-white/20 text-white/70 hover:border-white/40 hover:text-white"
                  }`}
                >
                  <Heart size={16} strokeWidth={2} fill={favorited ? "currentColor" : "none"} />
                </button>
                <button
                  type="button"
                  onClick={handleShare}
                  aria-label="Compartilhar"
                  className="relative w-9 h-9 rounded-full border border-white/20 text-white/70 hover:border-white/40 hover:text-white flex items-center justify-center transition-colors"
                >
                  <Share2 size={15} strokeWidth={2} />
                  {shared && (
                    <span className="absolute -bottom-7 right-0 text-[11px] bg-white text-navy-950 font-semibold px-2 py-1 rounded-md whitespace-nowrap">
                      Link copiado!
                    </span>
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-2.5 text-[13.5px]">
              <StarRating rating={p.rating} />
              <span className="text-white/60 font-semibold">{p.rating} ({p.reviews} avaliações)</span>
            </div>

            <div className="flex items-baseline gap-3 mt-4 flex-wrap">
              <span className="text-[30px] font-extrabold">{money(p.price)}</span>
              {p.oldPrice && <span className="text-white/40 text-base line-through">{money(p.oldPrice)}</span>}
              <span className="text-[13px] text-blue-400 font-semibold">ou {p.installment}</span>
            </div>
            <div className={`mt-2 flex items-center gap-2 text-[13px] font-semibold ${p.stock ? "text-green-500" : "text-red-400"}`}>
              <span className={`w-2 h-2 rounded-full ${p.stock ? "bg-green-500" : "bg-red-400"}`} />
              {p.stock ? "Em estoque — envio imediato" : "Fora de estoque — consulte disponibilidade"}
            </div>

            <div className="hidden md:flex gap-2.5 mt-5">
              <button
                type="button"
                onClick={handleBuy}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-navy-950 font-semibold text-sm rounded-lg py-3"
              >
                <ShoppingCart size={16} strokeWidth={2} /> {p.stock ? "Comprar agora" : "Avisar quando disponível"}
              </button>
              <button
                type="button"
                onClick={() => openWhatsApp("Olá! Tenho uma dúvida técnica sobre um produto do site.")}
                className="flex-1 flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold text-sm rounded-lg py-3 transition-colors"
              >
                <MessageCircle size={16} strokeWidth={2} /> Falar com técnico no WhatsApp
              </button>
            </div>

            {/* No mobile o botão de compra some do fluxo — fica fixo na barra inferior */}
            <button
              type="button"
              onClick={() => openWhatsApp("Olá! Tenho uma dúvida técnica sobre um produto do site.")}
              className="md:hidden flex items-center justify-center gap-2 border border-white/25 hover:border-white/50 text-white font-semibold text-sm rounded-lg py-3 mt-5 transition-colors"
            >
              <MessageCircle size={16} strokeWidth={2} /> Falar com técnico no WhatsApp
            </button>

            <div className="flex flex-wrap gap-2 mt-5">
              <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-[11.5px] font-semibold px-3 py-1.5 rounded-full">
                <Tag size={12} strokeWidth={2} /> OEM: <span className="font-mono">{p.codigo}</span>
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-[11.5px] font-semibold px-3 py-1.5 rounded-full">
                <ShieldCheck size={12} strokeWidth={2} /> 90 dias de garantia
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-[11.5px] font-semibold px-3 py-1.5 rounded-full">
                <CheckCircle2 size={12} strokeWidth={2} /> {p.orig ? "Peça original" : "Peça compatível"}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white/[0.06] border border-white/10 text-white/80 text-[11.5px] font-semibold px-3 py-1.5 rounded-full">
                <Truck size={12} strokeWidth={2} /> Envio para todo o Brasil
              </span>
            </div>

            {/* Antes de comprar — previne compra incorreta */}
            <div className="mt-5 bg-white/[0.05] border border-white/10 rounded-xl px-4 py-3.5">
              <div className="flex items-center gap-2 text-[12px] font-extrabold text-white uppercase tracking-wide">
                <Info size={14} strokeWidth={2} /> Antes de comprar
              </div>
              <p className="text-[12.5px] text-white/65 mt-1.5 leading-relaxed">
                Confira o modelo do equipamento e o código da peça antes de finalizar a compra.
              </p>
              <p className="text-[12.5px] text-white/65 mt-1 leading-relaxed">
                Não encontrou seu modelo? Nossa equipe pode ajudar a validar a aplicação.
              </p>
            </div>

            {/* Compatibilidade */}
            <div className="mt-5 border-t border-white/10 pt-4">
              <h2 className="text-[13px] font-extrabold text-white uppercase tracking-wide mb-3">Compatibilidade</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 text-[13px]">
                <div>
                  <div className="text-white/40 text-[11.5px]">Marca</div>
                  <div className="font-semibold text-white mt-0.5">{p.brand}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[11.5px]">Modelo</div>
                  <div className="font-mono text-white mt-0.5 tracking-tight">{p.modelo}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[11.5px]">Código da peça</div>
                  <div className="font-mono text-white mt-0.5 tracking-tight">{p.codigo}</div>
                </div>
                <div>
                  <div className="text-white/40 text-[11.5px]">Tipo</div>
                  <div className="font-semibold text-white mt-0.5">{TYPE_LABELS[typeOf(p)]}</div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setDescExpanded((v) => !v)}
                className="mt-3.5 flex items-center gap-1.5 text-[13px] font-semibold text-blue-400 hover:text-blue-300"
              >
                {descExpanded ? "Ver menos" : "Ver outros modelos compatíveis"}
                <ChevronDown size={15} strokeWidth={2.2} className={`transition-transform ${descExpanded ? "rotate-180" : ""}`} />
              </button>
              {descExpanded && (
                <ul className="grid grid-cols-2 gap-2 mt-2.5">
                  {[p.modelo, `${p.modelo} (variante A)`, `${p.modelo} (variante B)`, "Consulte outros modelos compatíveis"].map((m) => (
                    <li key={m} className="bg-white/[0.06] rounded-md px-3 py-2 text-[12.5px] text-white/85 font-semibold">
                      {m}
                    </li>
                  ))}
                </ul>
              )}

              <div className="mt-3.5 pt-3.5 border-t border-white/10 flex items-center justify-between gap-3 flex-wrap">
                <p className="text-[12.5px] text-white/60">Não encontrou o modelo do seu equipamento?</p>
                <button
                  type="button"
                  onClick={() => openWhatsApp(`Olá! Não encontrei meu modelo para o produto '${p.name}'. Podem me ajudar a validar a aplicação?`)}
                  className="text-[12.5px] font-semibold text-blue-400 hover:text-blue-300 whitespace-nowrap"
                >
                  Falar com especialista →
                </button>
              </div>
            </div>

            {/* Vendedor / autoridade técnica */}
            <div className="mt-5 pt-4 border-t border-white/10 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-blue-500 text-navy-950 flex items-center justify-center font-extrabold text-sm flex-shrink-0">
                NE
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm">Vendido e entregue pela Neshop</div>
                <div className="text-[12px] text-white/50">Mais de 35 anos no mercado de peças e componentes</div>
              </div>
              <Link href={`/marca?marca=${encodeURIComponent(p.brand)}`} className="text-[12.5px] font-semibold text-blue-400 hover:text-blue-300 whitespace-nowrap">
                Ver todos os modelos →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Avaliações */}
      <div className="wrap mt-3">
        <h2 className="text-xl font-extrabold text-navy-950">Avaliações</h2>
        <div className="grid md:grid-cols-3 gap-4.5 mt-4">
          {REVIEWS.map((r) => (
            <div key={r.who} className="card p-5.5">
              <StarRating rating={r.rating} />
              <p className="mt-3 text-sm text-ink-700 leading-relaxed">&quot;{r.quote}&quot;</p>
              <div className="mt-3.5 text-[13px] font-semibold text-navy-950 flex items-center gap-2">
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

      {/* Barra de compra fixa — mobile, logo acima da navegação inferior */}
      <div className="produto-buybar md:hidden fixed inset-x-0 z-40 bg-navy-900/97 backdrop-blur border-t border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <div className="text-[10.5px] text-white/50 font-semibold uppercase tracking-wide leading-none">Total</div>
          <div className="text-lg font-extrabold text-white leading-tight mt-1 truncate">{money(p.price)}</div>
        </div>
        <button
          type="button"
          onClick={handleBuy}
          className="flex-shrink-0 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-navy-950 font-semibold text-sm rounded-lg px-5.5 py-3"
        >
          <ShoppingCart size={16} strokeWidth={2} /> {p.stock ? "Comprar agora" : "Avisar"}
        </button>
      </div>
    </>
  );
}
