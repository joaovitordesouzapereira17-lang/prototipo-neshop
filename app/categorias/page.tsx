import Link from "next/link";
import { CATEGORIES } from "@/lib/products";

export default function CategoriasPage() {
  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Categorias</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-extrabold text-navy-950">Encontre por equipamento</h1>
        <p className="text-ink-500 text-sm mt-1.5">Selecione o tipo de aparelho para ver as peças compatíveis.</p>
      </div>

      <section className="py-6.5 pb-15">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/categoria?cat=${c.slug}`}
              className="card px-3.5 py-5.5 text-center hover:border-blue-500 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <span className="w-13 h-13 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl mx-auto mb-3">
                {c.icon}
              </span>
              <span className="font-bold text-[13.5px] text-navy-950">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
