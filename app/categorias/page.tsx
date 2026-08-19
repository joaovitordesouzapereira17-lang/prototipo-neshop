import Link from "next/link";
import { CATEGORIES } from "@/lib/products";
import { CategoryCard } from "@/components/CategoryCard";

export default function CategoriasPage() {
  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Categorias</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-semibold tracking-tight text-navy-950">Encontre por equipamento</h1>
        <p className="text-ink-500 text-sm mt-1.5">Selecione o tipo de aparelho para ver as peças compatíveis.</p>
      </div>

      <section className="py-6.5 pb-15">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3.5 lg:gap-4">
          {CATEGORIES.map((c) => (
            <CategoryCard key={c.slug} slug={c.slug} name={c.name} />
          ))}
        </div>
      </section>
    </div>
  );
}
