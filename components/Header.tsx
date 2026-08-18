"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MessageCircle, User, Package, ShoppingCart, Menu, X } from "lucide-react";
import { useCart } from "@/lib/cart-context";
import { useWhatsApp } from "@/lib/whatsapp-context";
import { Logo } from "@/components/Logo";
import { CAT_NAMES, CATEGORIES, brandsByCategory } from "@/lib/products";

const NAV_LINKS = [
  ...CATEGORIES.map((c) => ({ href: `/categoria?cat=${c.slug}`, label: c.name, cat: c.slug })),
  { href: "/marcas", label: "Marcas" },
  { href: "/ajuda", label: "Não sabe qual peça?" },
  { href: "/conteudo", label: "Conteúdos" },
];

export function Header() {
  const router = useRouter();
  const { totalQty } = useCart();
  const { open: openWhatsApp } = useWhatsApp();
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  function handleSearch() {
    const q = query.trim();
    setMenuOpen(false);
    router.push(q ? `/busca?q=${encodeURIComponent(q)}` : "/busca");
  }

  function handleWhatsAppClick() {
    setMenuOpen(false);
    openWhatsApp();
  }

  return (
    <header className="bg-white border-b border-line sticky top-0 z-50">
      <div className="wrap flex items-center gap-4 py-3.5 md:gap-7 md:py-5">
        <Link href="/" className="flex-shrink-0" onClick={() => setMenuOpen(false)}>
          <Logo />
        </Link>

        {/* Busca — visível inline a partir de md; some no mobile (fica na linha de baixo) */}
        <div className="hidden md:flex flex-1 items-stretch border-2 border-line rounded-full overflow-hidden bg-bg focus-within:border-blue-500 focus-within:bg-white transition-colors">
          <input
            type="text"
            placeholder="Buscar por código, modelo ou nome da peça"
            className="flex-1 border-none bg-transparent px-5.5 py-3.5 text-[15px] outline-none text-ink-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="border-none bg-orange-500 hover:bg-orange-600 text-white px-6 font-bold text-[15px] flex items-center gap-2"
          >
            <Search size={18} strokeWidth={2} /> Buscar
          </button>
        </div>

        {/* Ações — versão completa (ícone + rótulo) a partir de md */}
        <div className="hidden md:flex items-center gap-6 flex-shrink-0">
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="flex flex-col items-center gap-1 text-[12.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[64px] text-center"
          >
            <MessageCircle size={22} strokeWidth={1.8} />WhatsApp
          </button>
          <Link href="/conta" className="flex flex-col items-center gap-1 text-[12.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[64px] text-center">
            <User size={22} strokeWidth={1.8} />Minha conta
          </Link>
          <Link href="/pedidos" className="flex flex-col items-center gap-1 text-[12.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[64px] text-center">
            <Package size={22} strokeWidth={1.8} />Meus pedidos
          </Link>
          <Link href="/carrinho" className="relative flex flex-col items-center gap-1 text-[12.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[64px] text-center">
            <ShoppingCart size={22} strokeWidth={1.8} />Carrinho
            {totalQty > 0 && (
              <span className="absolute -top-1.5 right-3 bg-orange-600 text-white rounded-full text-[10px] w-4.5 h-4.5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </div>

        {/* Ações compactas — só no mobile: carrinho + hambúrguer */}
        <div className="flex md:hidden items-center gap-4 ml-auto flex-shrink-0">
          <Link href="/carrinho" className="relative text-ink-700" onClick={() => setMenuOpen(false)}>
            <ShoppingCart size={24} strokeWidth={1.8} />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-600 text-white rounded-full text-[10px] w-4.5 h-4.5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            className="text-ink-900"
          >
            {menuOpen ? <X size={26} strokeWidth={1.8} /> : <Menu size={26} strokeWidth={1.8} />}
          </button>
        </div>
      </div>

      {/* Busca — linha própria no mobile */}
      <div className="md:hidden wrap pb-3.5">
        <div className="flex items-stretch border-2 border-line rounded-full overflow-hidden bg-bg focus-within:border-blue-500 focus-within:bg-white transition-colors">
          <input
            type="text"
            placeholder="Buscar peça, código ou modelo"
            className="flex-1 min-w-0 border-none bg-transparent px-4 py-2.5 text-sm outline-none text-ink-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            onClick={handleSearch}
            aria-label="Buscar"
            className="border-none bg-orange-500 hover:bg-orange-600 text-white px-4 flex items-center justify-center flex-shrink-0"
          >
            <Search size={17} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Navegação com dropdowns — apenas desktop/tablet (hover não existe em touch) */}
      <nav className="hidden md:block border-t border-line-soft">
        <div className="wrap flex flex-wrap gap-7 py-3">
          {NAV_LINKS.map((link) => (
            <div key={link.href} className="group relative">
              <Link
                href={link.href}
                className="block text-[14.5px] font-semibold text-ink-700 whitespace-nowrap hover:text-orange-600 py-1"
              >
                {link.label}
              </Link>

              {"cat" in link && (
                <div className="absolute left-0 top-full pt-3 opacity-0 invisible translate-y-1 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-150 z-50">
                  <div className="w-56 bg-white border border-line rounded-lg shadow-lg p-3">
                    <div className="text-[11px] font-bold text-ink-300 uppercase tracking-wide px-2 mb-1.5">
                      Marcas em {CAT_NAMES[link.cat]}
                    </div>
                    {brandsByCategory(link.cat).map((brand) => (
                      <Link
                        key={brand}
                        href={`/marca?marca=${encodeURIComponent(brand)}`}
                        className="block px-2 py-1.5 text-[13.5px] font-medium text-ink-700 rounded-md hover:bg-blue-100 hover:text-blue-600"
                      >
                        {brand}
                      </Link>
                    ))}
                    <Link
                      href={link.href}
                      className="block mt-1.5 px-2 py-1.5 text-[13px] font-bold text-blue-600 rounded-md hover:bg-blue-100 border-t border-line-soft pt-2.5"
                    >
                      Ver todos os produtos →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>

      {/* Menu mobile — painel deslizante com todas as ações e categorias */}
      {menuOpen && (
        <div className="md:hidden border-t border-line-soft bg-white max-h-[75vh] overflow-y-auto">
          <div className="wrap py-3 flex flex-col">
            <button
              type="button"
              onClick={handleWhatsAppClick}
              className="flex items-center gap-3 py-3 text-[15px] font-semibold text-ink-700 border-b border-line-soft text-left"
            >
              <MessageCircle size={19} strokeWidth={1.8} /> WhatsApp
            </button>
            <Link href="/conta" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 text-[15px] font-semibold text-ink-700 border-b border-line-soft">
              <User size={19} strokeWidth={1.8} /> Minha conta
            </Link>
            <Link href="/pedidos" onClick={() => setMenuOpen(false)} className="flex items-center gap-3 py-3 text-[15px] font-semibold text-ink-700 border-b border-line-soft">
              <Package size={19} strokeWidth={1.8} /> Meus pedidos
            </Link>

            <div className="text-[11px] font-bold text-ink-300 uppercase tracking-wide pt-4 pb-1">Categorias</div>
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                href={`/categoria?cat=${c.slug}`}
                onClick={() => setMenuOpen(false)}
                className="py-2.5 text-[15px] font-semibold text-ink-700 border-b border-line-soft"
              >
                {c.name}
              </Link>
            ))}

            <Link href="/marcas" onClick={() => setMenuOpen(false)} className="py-3 text-[15px] font-semibold text-ink-700 border-b border-line-soft">
              Marcas
            </Link>
            <Link href="/ajuda" onClick={() => setMenuOpen(false)} className="py-3 text-[15px] font-semibold text-ink-700 border-b border-line-soft">
              Não sabe qual peça?
            </Link>
            <Link href="/conteudo" onClick={() => setMenuOpen(false)} className="py-3 text-[15px] font-semibold text-ink-700">
              Conteúdos
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
