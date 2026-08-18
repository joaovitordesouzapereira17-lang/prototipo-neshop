"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch() {
    const q = query.trim();
    router.push(q ? `/busca?q=${encodeURIComponent(q)}` : "/busca");
  }

  return (
    <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 text-white py-13 pb-11">
      <div className="wrap">
        <span className="inline-flex items-center gap-2 bg-white/10 border border-white/[.18] rounded-full px-3.5 py-1.5 text-[12.5px] font-semibold text-[#cfe0ee] mb-4.5">
          🔧 Encontrar → Identificar → Validar → Comprar
        </span>
        <h1 className="text-[34px] font-extrabold tracking-tight max-w-xl">Encontre a peça que você precisa</h1>
        <p className="text-[#b9cee2] text-[15.5px] mt-2.5 max-w-lg">
          Busque por código, modelo do equipamento ou nome da peça. Catálogo técnico amplo, com peças originais
          para diversas marcas.
        </p>
        <div className="mt-6 flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-xl">
          <input
            type="text"
            placeholder="Digite código, modelo ou nome da peça"
            className="flex-1 border-none px-5.5 py-4.5 text-[15.5px] outline-none text-ink-900"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            type="button"
            onClick={handleSearch}
            className="border-none bg-orange-500 hover:bg-orange-600 text-white font-bold px-7.5 text-[15px] flex items-center gap-2"
          >
            🔍 Buscar
          </button>
        </div>
        <div className="mt-4.5 flex items-center gap-2.5 text-[#cfe0ee] text-sm">
          <span>Não sabe qual peça é?</span>
          <Link href="/ajuda" className="font-bold text-white border-b-2 border-orange-500 pb-0.5 hover:text-orange-500">
            Envie uma foto ou o modelo →
          </Link>
        </div>
      </div>
    </section>
  );
}
