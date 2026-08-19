"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Camera } from "lucide-react";

export function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSearch() {
    const q = query.trim();
    router.push(q ? `/busca?q=${encodeURIComponent(q)}` : "/busca");
  }

  return (
    <section className="bg-gradient-to-br from-navy-950 via-navy-800 to-navy-700 text-white py-9 sm:py-13 pb-8 sm:pb-11">
      <div className="wrap flex flex-col items-center text-center sm:items-start sm:text-left">
        <h1 className="text-[26px] sm:text-[34px] font-semibold tracking-tight max-w-xl leading-tight">Encontre a peça que você precisa</h1>
        <p className="text-[#b9cee2] text-sm sm:text-[15.5px] mt-2.5 max-w-lg">
          Busque por código, modelo ou nome da peça.
        </p>

        {/* Busca — só aparece aqui a partir de sm; no mobile a busca já está fixa no topo do header, evitando duplicidade */}
        <div className="hidden sm:flex mt-6 bg-white rounded-2xl shadow-lg overflow-hidden max-w-xl w-full">
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
            className="border-none bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7.5 text-[15px] flex items-center gap-2"
          >
            <Search size={16} strokeWidth={2} /> Buscar
          </button>
        </div>

        <Link
          href="/ajuda"
          className="mt-5 sm:mt-6 inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-5.5 py-3 rounded-full text-[14px] sm:text-[14.5px]"
        >
          <Camera size={17} strokeWidth={2} /> Não sabe qual peça? Envie uma foto
        </Link>
      </div>
    </section>
  );
}
