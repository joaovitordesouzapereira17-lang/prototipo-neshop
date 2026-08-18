import Link from "next/link";
import { categoryIcon } from "@/lib/category-icons";

const ORDERS = [
  { cat: "tv", name: "Placa Principal para TV LED — LG 55UK6520", meta: "Pedido #NESHOP-58231 · Entregue em 12/07/2026", price: "R$ 389,90" },
  { cat: "ar-condicionado", name: "Compressor para Ar-condicionado Split — Springer", meta: "Pedido #NESHOP-58109 · Em transporte", price: "R$ 749,00" },
];

export default function PedidosPage() {
  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Meus pedidos</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-extrabold text-navy-950">Meus pedidos</h1>
      </div>

      <section className="pb-15">
        <div className="max-w-[720px]">
          <span className="badge-proto">Área simulada</span>
          <div className="mt-4">
            {ORDERS.map((o) => {
              const Icon = categoryIcon(o.cat);
              return (
                <div key={o.meta} className="card flex gap-3.5 p-4 mb-3.5 items-center">
                  <div className="w-18.5 h-18.5 rounded-lg bg-bg flex items-center justify-center text-ink-300 flex-shrink-0">
                    <Icon size={26} strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-sm text-navy-950">{o.name}</div>
                    <div className="text-xs text-ink-500 mt-1">{o.meta}</div>
                  </div>
                  <div className="font-extrabold text-navy-950 text-[15px]">{o.price}</div>
                </div>
              );
            })}
          </div>
          <p className="text-[13.5px] text-ink-500 mt-4">
            Pedidos ilustrativos para fins de protótipo — na versão final, esta área listaria o histórico real de
            compras do cliente.
          </p>
        </div>
      </section>
    </div>
  );
}
