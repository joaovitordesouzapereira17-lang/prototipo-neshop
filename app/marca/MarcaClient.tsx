"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { CAT_NAMES, PRODUCTS } from "@/lib/products";

export function MarcaClient() {
  const searchParams = useSearchParams();
  const marca = searchParams.get("marca") || "LG";
  const marcaProducts = PRODUCTS.filter((p) => p.brand === marca);
  const cats = Array.from(new Set(marcaProducts.map((p) => p.cat)));

  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <Link href="/marcas" className="text-blue-600 font-semibold">Marcas</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>{marca}</span>
      </div>

      <div className="card p-9 flex flex-col md:flex-row items-center gap-6.5 mt-5.5">
        <div className="w-24 h-24 rounded-[18px] bg-navy-950 text-white flex items-center justify-center font-extrabold text-[22px] flex-shrink-0">
          {marca.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-extrabold text-navy-950">{marca}</h1>
          <p className="mt-2 text-ink-500 text-sm max-w-xl">
            Peças e componentes originais {marca} para equipamentos de TV, ar-condicionado, refrigeração e mais,
            com o conhecimento técnico da Neshop.
          </p>
          <div className="flex gap-2.5 mt-3.5 flex-wrap">
            {cats.length ? (
              cats.map((c) => (
                <Link key={c} href={`/categoria?cat=${c}`} className="bg-blue-100 text-blue-600 font-bold text-[12.5px] px-3.5 py-1.5 rounded-full">
                  {CAT_NAMES[c]}
                </Link>
              ))
            ) : (
              <Link href="/categorias" className="bg-blue-100 text-blue-600 font-bold text-[12.5px] px-3.5 py-1.5 rounded-full">
                Ver categorias
              </Link>
            )}
          </div>
        </div>
      </div>

      <section className="py-13">
        <div className="mb-6.5">
          <h2 className="text-2xl font-extrabold text-navy-950 tracking-tight">Produtos desta marca</h2>
          <p className="text-ink-500 text-[14.5px] mt-1.5">Peças disponíveis para os equipamentos da marca selecionada.</p>
        </div>
        {marcaProducts.length ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4.5">
            {marcaProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-9 text-ink-500">
            Ainda não há peças cadastradas para esta marca no protótipo.{" "}
            <Link href="/ajuda" className="text-blue-600 font-bold">Fale com um especialista</Link>.
          </div>
        )}
      </section>
    </div>
  );
}
