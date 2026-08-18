"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, MessageCircle, User, Package, ShoppingCart } from "lucide-react";
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

  function handleSearch() {
    const q = query.trim();
    router.push(q ? `/busca?q=${encodeURIComponent(q)}` : "/busca");
  }

  return (
    <header className="bg-white border-b border-line sticky top-0 z-50">
      <div className="wrap flex items-center gap-7 py-5">
        <Link href="/" className="flex-shrink-0">
          <Logo />
        </Link>

        <div className="flex-1 flex items-stretch border-2 border-line rounded-full overflow-hidden bg-bg focus-within:border-blue-500 focus-within:bg-white transition-colors">
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

        <div className="flex items-center gap-6 flex-shrink-0">
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
      </div>

      <nav className="border-t border-line-soft">
        <div className="wrap flex gap-7 py-3 overflow-x-auto">
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
    </header>
  );
}
