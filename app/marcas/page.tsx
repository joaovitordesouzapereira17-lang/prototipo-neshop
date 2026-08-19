import Link from "next/link";
import { BRANDS } from "@/lib/products";

export default function MarcasPage() {
  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Marcas</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-semibold tracking-tight text-navy-950">Encontre peças por marca</h1>
        <p className="text-ink-500 text-sm mt-1.5">Trabalhamos com as principais marcas do mercado de eletroeletrônicos.</p>
      </div>

      <section className="py-6.5 pb-15">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {BRANDS.map((b) => (
            <Link
              key={b}
              href={`/marca?marca=${encodeURIComponent(b)}`}
              className="card px-3 py-6 text-center font-extrabold text-navy-900 text-[15px] hover:border-blue-500 hover:-translate-y-0.5 transition-all"
            >
              {b}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
