"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { X } from "lucide-react";
import { ProductCard } from "@/components/ProductCard";
import { FilterPill } from "@/components/FilterPill";
import { Pagination } from "@/components/Pagination";
import { CAT_NAMES, PRODUCTS, sortProducts, typeOf, type SortMode } from "@/lib/products";

const BRAND_OPTIONS = ["LG", "Samsung", "Philco", "Brastemp", "Consul"];
const TYPE_OPTIONS: { value: "placa" | "motor" | "outros"; label: string }[] = [
  { value: "placa", label: "Placas" },
  { value: "motor", label: "Motores / Compressores" },
  { value: "outros", label: "Outras peças" },
];

// Tamanho de página reduzido de propósito para demonstrar a paginação com o
// catálogo pequeno do protótipo — ajustar para um valor realista (ex.: 24)
// quando o catálogo real for integrado.
const PAGE_SIZE = 6;

export function CategoriaClient() {
  const searchParams = useSearchParams();
  const cat = searchParams.get("cat") || "tv";
  const catName = CAT_NAMES[cat] || "Categoria";

  const [brands, setBrands] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [onlyStock, setOnlyStock] = useState(false);
  const [priceMin, setPriceMin] = useState("");
  const [priceMax, setPriceMax] = useState("");
  const [sort, setSort] = useState<SortMode>("relevance");

  const baseList = useMemo(() => PRODUCTS.filter((p) => p.cat === cat), [cat]);

  const filtered = useMemo(() => {
    const min = parseFloat(priceMin) || 0;
    const max = parseFloat(priceMax) || Infinity;
    return baseList.filter((p) => {
      if (brands.length && !brands.includes(p.brand)) return false;
      if (types.length && !types.includes(typeOf(p))) return false;
      if (p.price < min || p.price > max) return false;
      if (onlyStock && !p.stock) return false;
      return true;
    });
  }, [baseList, brands, types, onlyStock, priceMin, priceMax]);

  const sorted = sort === "relevance" ? filtered : sortProducts(filtered, sort);

  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const paged = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  useEffect(() => {
    setPage(1);
  }, [cat, brands, types, onlyStock, priceMin, priceMax, sort]);

  function toggle(list: string[], value: string, setList: (v: string[]) => void) {
    setList(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
  }

  function clearFilters() {
    setBrands([]);
    setTypes([]);
    setOnlyStock(false);
    setPriceMin("");
    setPriceMax("");
  }

  const chips = [
    ...brands.map((b) => ({ label: b, onRemove: () => toggle(brands, b, setBrands) })),
    ...types.map((t) => ({
      label: TYPE_OPTIONS.find((o) => o.value === t)?.label || t,
      onRemove: () => toggle(types, t, setTypes),
    })),
    ...(onlyStock ? [{ label: "Em estoque", onRemove: () => setOnlyStock(false) }] : []),
  ];

  return (
    <>
      <div className="wrap">
        <div className="text-[13px] text-ink-500 pt-4">
          <a href="/" className="text-blue-600 font-semibold">Início</a>
          <span className="mx-1.5 text-ink-300">/</span>
          <span>{catName}</span>
        </div>
        <div className="py-5 pb-2.5">
          <h1 className="text-[26px] font-extrabold text-navy-950">{catName}</h1>
          <p className="text-ink-500 text-sm mt-1.5">{sorted.length} produtos encontrados</p>
        </div>
      </div>

      <div className="wrap grid md:grid-cols-[260px_1fr] gap-7 pb-15 items-start">
        <aside className="hidden md:block card p-5 md:sticky md:top-[142px]">
          <h3 className="text-[14.5px] font-extrabold text-navy-950 mb-3.5">Filtrar resultados</h3>

          <div className="pb-4">
            <div className="text-[13px] font-bold mb-2.5">Marca</div>
            {BRAND_OPTIONS.map((b) => (
              <label key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} className="accent-blue-600 w-[15px] h-[15px]" />
                {b}
              </label>
            ))}
          </div>

          <div className="border-t border-line-soft py-4">
            <div className="text-[13px] font-bold mb-2.5">Tipo de peça</div>
            {TYPE_OPTIONS.map((t) => (
              <label key={t.value} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                <input type="checkbox" checked={types.includes(t.value)} onChange={() => toggle(types, t.value, setTypes)} className="accent-blue-600 w-[15px] h-[15px]" />
                {t.label}
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

          <div className="border-t border-line-soft py-4">
            <div className="text-[13px] font-bold mb-2.5">Disponibilidade</div>
            <label className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
              <input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="accent-blue-600 w-[15px] h-[15px]" />
              Somente em estoque
            </label>
          </div>

          <button type="button" onClick={clearFilters} className="btn btn-secondary btn-block text-[13px] py-2.5">
            Limpar filtros
          </button>
        </aside>

        <div>
          {/* Barra de filtros expansível — só no mobile (estilo Mercado Livre/Shein) */}
          <div className="md:hidden flex flex-wrap gap-2 mb-4">
            <FilterPill label="Marca" count={brands.length}>
              <div className="text-[13px] font-bold mb-2.5">Marca</div>
              {BRAND_OPTIONS.map((b) => (
                <label key={b} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={brands.includes(b)} onChange={() => toggle(brands, b, setBrands)} className="accent-blue-600 w-[15px] h-[15px]" />
                  {b}
                </label>
              ))}
            </FilterPill>

            <FilterPill label="Tipo de peça" count={types.length}>
              <div className="text-[13px] font-bold mb-2.5">Tipo de peça</div>
              {TYPE_OPTIONS.map((t) => (
                <label key={t.value} className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={types.includes(t.value)} onChange={() => toggle(types, t.value, setTypes)} className="accent-blue-600 w-[15px] h-[15px]" />
                  {t.label}
                </label>
              ))}
            </FilterPill>

            <FilterPill label="Filtros" count={(priceMin || priceMax ? 1 : 0) + (onlyStock ? 1 : 0)}>
              <div className="text-[13px] font-bold mb-2.5">Faixa de preço</div>
              <div className="flex gap-2">
                <input type="number" placeholder="Mín." value={priceMin} onChange={(e) => setPriceMin(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
                <input type="number" placeholder="Máx." value={priceMax} onChange={(e) => setPriceMax(e.target.value)} className="w-full border border-line rounded-md px-2.5 py-2 text-[13px]" />
              </div>
              <div className="border-t border-line-soft mt-4 pt-3.5">
                <label className="flex items-center gap-2.5 text-[13.5px] text-ink-700 py-1.5 cursor-pointer">
                  <input type="checkbox" checked={onlyStock} onChange={(e) => setOnlyStock(e.target.checked)} className="accent-blue-600 w-[15px] h-[15px]" />
                  Somente em estoque
                </label>
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
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4.5">
            {paged.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
          <Pagination page={page} totalPages={totalPages} onChange={setPage} />
        </div>
      </div>
    </>
  );
}
