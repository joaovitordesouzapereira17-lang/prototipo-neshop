"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { FilterPill } from "@/components/FilterPill";
import { CAT_NAMES, CATEGORIES, PRODUCTS, matchesQuery, sortProducts, type SortMode } from "@/lib/products";

const BRAND_OPTIONS = ["LG", "Samsung", "Philco"];

export function BuscaClient() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q") || "placa LG";

  const [cats, setCats] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState<SortMode>("relevance");

  const baseList = useMemo(() => {
    const matched = PRODUCTS.filter((p) => matchesQuery(p, q));
    return matched.length ? matched : PRODUCTS.filter((p) => p.cat === "tv" || p.brand === "LG");
  }, [q]);

  const filtered = useMemo(() => {
    const min = parseFloat(priceMin) || 0;
    const max = parseFloat(priceMax) || Infinity;
    return baseList.filter((p) => {
      if (cats.length && !cats.includes(p.cat)) return false;
      if (brands.length && !brands.includes(p.brand)) return false;
      if (p.price < min || p.price > max) return false;
      return true;
    });
  }, [baseList, cats, brands, priceMin, priceMax]);

  const sorted = sort === "relevance" ? filtered : sortProducts(filtered, sort);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }
  function clearFilters() {
    setCats([]);
    setBrands([]);
    setPriceMin("");
    setPriceMax("");
  }

  const chips = [
    ...cats.map((c) => ({ label: CAT_NAMES[c] || c, onRemove: () => toggle(cats, c, setCats) })),
    ...brands.map((b) => ({ label: b, onRemove: () => toggle(brands, b, setBrands) })),
  ];

  return (
    <>
      <div className="wrap">
        <div className="text-[13px] text-ink-500 pt-4">
          <a href="/" className="text-blue-600 font-semibold">Início</a>
          <span className="mx-1.5 text-ink-300">/</span>
          <span>Busca</span>
        </div>
        <div className="py-5 pb-2.5">
          <h1 className="text-[26px] font-extrabold text-navy-950">
            Resultados para &quot;<span className="text-blue-600">{q}</span>&quot;
          </h1>
          <p className="text-ink-500 text-sm mt-1.5">{sorted.length} peças encontradas</p>
        </div>
      </div>

      <div className="wrap grid md:grid-cols-[260px_1fr] gap-7 pb-15 items-start">
        <aside className="hidden md:block card p-5 md:sticky md:top-[142px]">
          <h3 className="text-[14.5px] font-extrabold text-navy-950 mb-3.5">Filtrar resultados</h3>

          <div className="pb-4">
            <div className="text-[13px] font-bold mb-2.5">Categoria</div>
            {CATEGORIES.map((c) => (
              <label key={c.slug} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                <input type="checkbox" checked={cats.includes(c.slug)} onChange={() => toggle(cats, c.slug, setCats)} className="accent-blue-600 w-[15px] h-[15px]" />
                {c.name}
              </label>
            ))}
          </div>

          <div className="border-t border-line-soft py-4">
            <div className="text-[13px] font-bold mb-2.5">Marca</div>
            {BRAND_OPTIONS.map((b) => (
              <label key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} className="accent-blue-600 w-[15px] h-[15px]" />
                {b}
              </label>
            ))}
          </div>

          <div className="border-t border-line-soft py-4">
            <div className="text-[13px] font-bold mb-2.5">Faixa de preço</div>
            <div className="flex gap-2">
              <input type="number" placeholder="Mín." value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
              <input type="number" placeholder="Máx." value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
            </div>
          </div>

          <button type="button" onClick={clearFilters} className="btn btn-secondary btn-block text-[13px] py-2.5">
            Limpar filtros
          </button>
        </aside>

        <div>
          {/* Barra de filtros expansível — só no mobile (estilo Mercado Livre/Shein) */}
          <div className="md:hidden flex flex-wrap gap-2 mb-4">
            <FilterPill label="Categoria" count={cats.length}>
              <div className="text-[13px] font-bold mb-2.5">Categoria</div>
              {CATEGORIES.map((c) => (
                <label key={c.slug} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={cats.includes(c.slug)} onChange={() => toggle(cats, c.slug, setCats)} className="accent-blue-600 w-[15px] h-[15px]" />
                  {c.name}
                </label>
              ))}
            </FilterPill>

            <FilterPill label="Marca" count={brands.length}>
              <div className="text-[13px] font-bold mb-2.5">Marca</div>
              {BRAND_OPTIONS.map((b) => (
                <label key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} className="accent-blue-600 w-[15px] h-[15px]" />
                  {b}
                </label>
              ))}
            </FilterPill>

            <FilterPill label="Filtros" count={priceMin || priceMax ? 1 : 0}>
              <div className="text-[13px] font-bold mb-2.5">Faixa de preço</div>
              <div className="flex gap-2">
                <input type="number" placeholder="Mín." value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
                <input type="number" placeholder="Máx." value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
              </div>
              <button type="button" onClick={clearFilters} className="btn btn-secondary btn-block text-[13px] py-2 mt-3.5">
                Limpar filtros
              </button>
            </FilterPill>
          </div>

          <div className="flex justify-between items-center mb-4.5 flex-wrap gap-3">
            <div className="flex gap-2 flex-wrap">
              {chips.map((c, i) => (
                <span key={i} className="bg-blue-100 text-blue-600 text-[12.5px] font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5">
                  {c.label}
                  <button type="button" onClick={c.onRemove} className="border-none bg-transparent text-blue-600 flex items-center"><X size={13} strokeWidth={2.5} /></button>
                </span>
              ))}
            </div>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortMode)}
              className="border border-line rounded-lg px-3.5 py-2 text-[13.5px] font-semibold bg-white text-ink-900"
            >
              <option value="relevance">Mais relevantes</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="rating">Melhor avaliados</option>
            </select>
          </div>

          {sorted.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4.5">
              {sorted.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          ) : (
            <div className="text-center py-15">
              <p className="font-bold text-navy-950">Não encontramos peças exatas para essa busca.</p>
              <p className="text-ink-500 mt-2">Tente buscar pelo código da peça, modelo do equipamento ou fale com um especialista.</p>
              <div className="flex justify-center mt-7.5">
                <Link href="/ajuda" className="btn btn-primary">Enviar foto ou modelo</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
