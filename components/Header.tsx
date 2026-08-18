"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCart } from "@/lib/cart-context";
import { useWhatsApp } from "@/lib/whatsapp-context";

const NAV_LINKS = [
  { href: "/categoria?cat=tv", label: "TV" },
  { href: "/categoria?cat=ar-condicionado", label: "Ar-condicionado" },
  { href: "/categoria?cat=lava-e-seca", label: "Lava e seca" },
  { href: "/categoria?cat=refrigerador", label: "Refrigerador" },
  { href: "/categoria?cat=radio-e-som", label: "Rádio e som" },
  { href: "/categoria?cat=ferramentas", label: "Ferramentas" },
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
      <div className="wrap flex items-center gap-6 py-3.5">
        <Link href="/" className="flex items-center gap-2.5 font-extrabold text-xl text-navy-900 flex-shrink-0">
          <span className="w-[38px] h-[38px] rounded-[9px] bg-gradient-to-br from-orange-500 to-orange-600 text-white font-extrabold text-base flex items-center justify-center">
            NE
          </span>
          <span>
            Neshop
            <span className="block -mt-0.5 text-[10.5px] font-semibold text-ink-500 tracking-wide uppercase">
              Peças &amp; Componentes
            </span>
          </span>
        </Link>

        <div className="flex-1 flex items-stretch border-[1.5px] border-line rounded-full overflow-hidden bg-bg focus-within:border-blue-500 focus-within:bg-white transition-colors">
          <input
            type="text"
            placeholder="Buscar por código, modelo ou nome da peça"
            className="flex-1 border-none bg-transparent px-4.5 py-2.5 text-sm outline-none text-ink-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="border-none bg-orange-500 hover:bg-orange-600 text-white px-5 font-bold text-sm flex items-center gap-1.5"
          >
            🔍 Buscar
          </button>
        </div>

        <div className="flex items-center gap-5 flex-shrink-0">
          <button
            type="button"
            onClick={() => openWhatsApp()}
            className="flex flex-col items-center gap-0.5 text-[11.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[56px] text-center"
          >
            <span className="text-lg leading-none">💬</span>WhatsApp
          </button>
          <Link href="/conta" className="flex flex-col items-center gap-0.5 text-[11.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[56px] text-center">
            <span className="text-lg leading-none">👤</span>Minha conta
          </Link>
          <Link href="/pedidos" className="flex flex-col items-center gap-0.5 text-[11.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[56px] text-center">
            <span className="text-lg leading-none">📦</span>Meus pedidos
          </Link>
          <Link href="/carrinho" className="relative flex flex-col items-center gap-0.5 text-[11.5px] font-semibold text-ink-700 hover:text-blue-600 min-w-[56px] text-center">
            <span className="text-lg leading-none">🛒</span>Carrinho
            {totalQty > 0 && (
              <span className="absolute -top-1.5 right-2 bg-orange-600 text-white rounded-full text-[10px] w-4 h-4 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>
        </div>
      </div>

      <nav className="border-t border-line-soft">
        <div className="wrap flex gap-6 py-2 overflow-x-auto">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13.5px] font-semibold text-ink-700 whitespace-nowrap hover:text-orange-600"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  );
}
