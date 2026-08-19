"use client";

import Link from "next/link";
import { useWhatsApp } from "@/lib/whatsapp-context";

const CONTENT_CARDS = [
  { kicker: "Guia técnico", title: "Como encontrar o código correto da sua peça" },
  { kicker: "Comparativo", title: "Peça original x paralela: qual escolher?" },
  { kicker: "Guia técnico", title: "Como identificar a placa correta do seu equipamento?" },
  { kicker: "Guia técnico", title: "Onde encontro o código OEM na etiqueta do produto?" },
  { kicker: "Manutenção", title: "Sinais de que a placa do seu ar-condicionado precisa de troca" },
  { kicker: "Compra segura", title: "Como validar a compatibilidade antes de comprar" },
];

export default function ConteudoPage() {
  const { open: openWhatsApp } = useWhatsApp();

  return (
    <div className="wrap">
      <div className="text-[13px] text-ink-500 pt-4">
        <Link href="/" className="text-blue-600 font-semibold">Início</Link>
        <span className="mx-1.5 text-ink-300">/</span>
        <span>Conteúdos</span>
      </div>
      <div className="py-5 pb-2.5">
        <h1 className="text-[26px] font-extrabold text-navy-950">Conteúdos para ajudar você</h1>
        <p className="text-ink-500 text-sm mt-1.5">Guias práticos para identificar e escolher a peça certa antes de comprar.</p>
      </div>

      <section className="py-6.5 pb-15">
        <div className="grid md:grid-cols-3 gap-4.5">
          {CONTENT_CARDS.map((c) => (
            <a key={c.title} href="#" className="card p-5.5 hover:border-blue-500 transition-colors">
              <span className="text-[11.5px] font-bold text-blue-600 uppercase tracking-wide">{c.kicker}</span>
              <h3 className="text-[15.5px] font-bold mt-2.5 text-navy-950 leading-snug">{c.title}</h3>
              <span className="block mt-3.5 text-[13px] font-bold text-orange-600">Ler conteúdo →</span>
            </a>
          ))}
        </div>
        <div className="flex justify-center mt-7.5">
          <button
            type="button"
            onClick={() => openWhatsApp("Olá! Tenho uma dúvida técnica sobre uma peça.")}
            className="btn btn-whatsapp btn-lg"
          >
            Ainda com dúvidas? Fale com um especialista
          </button>
        </div>
      </section>
    </div>
  );
}
